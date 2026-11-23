import { createServer } from 'node:http';
import { createReadStream, existsSync } from 'node:fs';
import { mkdir, readFile, stat, unlink, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { randomBytes, timingSafeEqual } from 'node:crypto';
import mysql from 'mysql2/promise';
import { createServer as createViteServer } from 'vite';

const rootDir = path.dirname(fileURLToPath(import.meta.url));
if (existsSync(path.join(rootDir, '.env'))) process.loadEnvFile(path.join(rootDir, '.env'));

const isProduction = process.argv.includes('--production');
const host = process.env.HOST || '127.0.0.1';
const port = Number(process.env.PORT || 5173);
const distDir = path.join(rootDir, 'dist');
const uploadDir = path.join(rootDir, 'uploads', 'projects');
const maxRequestBytes = 32 * 1024;
const maxImageBytes = 6 * 1024 * 1024;
const sessionLifetime = 8 * 60 * 60 * 1000;
const adminSessions = new Map();
const loginAttempts = new Map();

const requiredEnv = ['DB_HOST', 'DB_NAME', 'DB_USER', 'DB_PASSWORD', 'ADMIN_PASSWORD'];
const missingEnv = requiredEnv.filter((key) => !process.env[key]);
const pool = missingEnv.length ? null : mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 3306),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  waitForConnections: true,
  connectionLimit: 8,
  queueLimit: 0,
  charset: 'utf8mb4',
});

const sendJson = (response, status, payload) => {
  response.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' });
  response.end(JSON.stringify(payload));
  return true;
};

const readJson = async (request) => {
  const chunks = [];
  let length = 0;
  for await (const chunk of request) {
    length += chunk.length;
    if (length > maxRequestBytes) throw Object.assign(new Error('Request body is too large.'), { statusCode: 413 });
    chunks.push(chunk);
  }
  try { return JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}'); }
  catch { throw Object.assign(new Error('Request body must be valid JSON.'), { statusCode: 400 }); }
};

const readImage = async (request) => {
  const chunks = [];
  let length = 0;
  for await (const chunk of request) {
    length += chunk.length;
    if (length > maxImageBytes) throw Object.assign(new Error('Cover images must be 6 MB or smaller.'), { statusCode: 413 });
    chunks.push(chunk);
  }
  if (!length) throw Object.assign(new Error('Choose an image file first.'), { statusCode: 400 });
  return Buffer.concat(chunks);
};

const removeStoredCover = async (publicPath) => {
  const filename = path.basename(String(publicPath || ''));
  if (!/^\d+-[a-f0-9]{12}\.(jpg|png|webp)$/.test(filename)) return;
  await unlink(path.join(uploadDir, filename)).catch(() => {});
};

const serveUploadedFile = async (request, response) => {
  const pathname = new URL(request.url, 'http://localhost').pathname;
  const match = pathname.match(/^\/uploads\/projects\/(\d+-[a-f0-9]{12}\.(?:jpg|png|webp))$/);
  if (!match) {
    response.writeHead(404).end('Image not found');
    return;
  }
  const filePath = path.join(uploadDir, match[1]);
  try {
    await stat(filePath);
    const extension = path.extname(filePath);
    const contentType = extension === '.jpg' ? 'image/jpeg' : extension === '.png' ? 'image/png' : 'image/webp';
    response.writeHead(200, { 'Content-Type': contentType, 'Cache-Control': 'public, max-age=31536000, immutable', 'X-Content-Type-Options': 'nosniff' });
    createReadStream(filePath).pipe(response);
  } catch {
    response.writeHead(404).end('Image not found');
  }
};

const ensureDatabase = () => {
  if (!pool) throw Object.assign(new Error(`MySQL is not configured. Add ${missingEnv.join(', ')} to .env.`), { statusCode: 503 });
};

const validateProject = (body) => {
  const fields = ['title', 'category', 'year', 'summary', 'outcome', 'visual'];
  const project = Object.fromEntries(fields.map((field) => [field, String(body[field] ?? '').trim()]));
  const limits = { title: 100, category: 60, year: 12, summary: 260, outcome: 100, visual: 12 };
  for (const [field, limit] of Object.entries(limits)) {
    if (project[field].length > limit) throw Object.assign(new Error(`${field} must be ${limit} characters or fewer.`), { statusCode: 400 });
  }
  for (const field of ['title', 'category', 'summary', 'outcome']) {
    if (!project[field]) throw Object.assign(new Error(`${field} is required.`), { statusCode: 400 });
  }
  if (!['mint', 'lilac', 'peach'].includes(project.visual)) project.visual = 'mint';
  if (!project.year) project.year = String(new Date().getFullYear());
  return project;
};

const authorized = (request) => {
  const token = (request.headers.authorization || '').replace(/^Bearer\s+/i, '');
  const expiresAt = adminSessions.get(token);
  if (!token || !expiresAt || expiresAt < Date.now()) {
    if (token) adminSessions.delete(token);
    return false;
  }
  return true;
};

const loginIsLimited = (request) => {
  const address = request.socket.remoteAddress || 'unknown';
  const entry = loginAttempts.get(address);
  const now = Date.now();
  if (!entry || now - entry.startedAt > 10 * 60 * 1000) {
    loginAttempts.set(address, { startedAt: now, count: 0 });
    return false;
  }
  return entry.count >= 8;
};

const countLoginAttempt = (request) => {
  const address = request.socket.remoteAddress || 'unknown';
  const entry = loginAttempts.get(address) || { startedAt: Date.now(), count: 0 };
  entry.count += 1;
  loginAttempts.set(address, entry);
};

const passwordsMatch = (submitted) => {
  const expected = Buffer.from(process.env.ADMIN_PASSWORD || '');
  const received = Buffer.from(String(submitted || ''));
  return expected.length > 0 && expected.length === received.length && timingSafeEqual(expected, received);
};

const handleApi = async (request, response) => {
  const url = new URL(request.url, `http://${request.headers.host || 'localhost'}`);
  if (!url.pathname.startsWith('/api/')) return false;

  let pendingUpload = '';
  try {
    if (url.pathname === '/api/config' && request.method === 'GET') {
      const configuredNumber = String(process.env.WHATSAPP_NUMBER || '').replace(/\D/g, '');
      const whatsappNumber = /^62\d{8,13}$/.test(configuredNumber) ? configuredNumber : '';
      return sendJson(response, 200, { whatsappNumber });
    }

    if (url.pathname === '/api/admin/session' && request.method === 'POST') {
      if (!process.env.ADMIN_PASSWORD) return sendJson(response, 503, { error: 'Admin access is not configured. Add ADMIN_PASSWORD to .env.' });
      if (loginIsLimited(request)) return sendJson(response, 429, { error: 'Too many attempts. Try again in a few minutes.' });
      const body = await readJson(request);
      countLoginAttempt(request);
      if (!passwordsMatch(body.password)) return sendJson(response, 401, { error: 'That password did not match.' });
      const token = randomBytes(32).toString('base64url');
      adminSessions.set(token, Date.now() + sessionLifetime);
      return sendJson(response, 200, { token, expiresIn: sessionLifetime });
    }

    if (url.pathname === '/api/projects' && request.method === 'GET') {
      ensureDatabase();
      const [rows] = await pool.execute('SELECT id, title, category, year, summary, outcome, visual, cover_image FROM projects ORDER BY sort_order ASC, id DESC');
      return sendJson(response, 200, rows);
    }

    if (url.pathname === '/api/projects' && request.method === 'POST') {
      if (!authorized(request)) return sendJson(response, 401, { error: 'Sign in to manage projects.' });
      ensureDatabase();
      const project = validateProject(await readJson(request));
      const slug = `${project.title.toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 90) || 'project'}-${randomBytes(3).toString('hex')}`;
      const [result] = await pool.execute(
        'INSERT INTO projects (slug, title, category, year, summary, outcome, visual) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [slug, project.title, project.category, project.year, project.summary, project.outcome, project.visual],
      );
      return sendJson(response, 201, { id: result.insertId, cover_image: null, ...project });
    }

    const coverMatch = url.pathname.match(/^\/api\/projects\/(\d+)\/cover$/);
    if (coverMatch && request.method === 'PUT') {
      if (!authorized(request)) return sendJson(response, 401, { error: 'Sign in to manage projects.' });
      ensureDatabase();
      const [existingRows] = await pool.execute('SELECT cover_image FROM projects WHERE id = ?', [coverMatch[1]]);
      if (!existingRows.length) return sendJson(response, 404, { error: 'Project not found.' });

      const contentType = String(request.headers['content-type'] || '').split(';')[0].toLowerCase();
      const extensionByType = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp' };
      const extension = extensionByType[contentType];
      if (!extension) return sendJson(response, 415, { error: 'Use a JPG, PNG, or WebP cover image.' });
      const image = await readImage(request);
      const isJpeg = image[0] === 0xff && image[1] === 0xd8 && image[2] === 0xff;
      const isPng = image.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]));
      const isWebp = image.subarray(0, 4).toString() === 'RIFF' && image.subarray(8, 12).toString() === 'WEBP';
      if ((extension === 'jpg' && !isJpeg) || (extension === 'png' && !isPng) || (extension === 'webp' && !isWebp)) {
        return sendJson(response, 415, { error: 'The selected file does not match its image format.' });
      }

      await mkdir(uploadDir, { recursive: true });
      const filename = `${coverMatch[1]}-${randomBytes(6).toString('hex')}.${extension}`;
      pendingUpload = path.join(uploadDir, filename);
      await writeFile(pendingUpload, image, { flag: 'wx' });
      const publicPath = `/uploads/projects/${filename}`;
      await pool.execute('UPDATE projects SET cover_image = ? WHERE id = ?', [publicPath, coverMatch[1]]);
      pendingUpload = '';
      await removeStoredCover(existingRows[0].cover_image);
      return sendJson(response, 200, { id: Number(coverMatch[1]), cover_image: publicPath });
    }

    const projectMatch = url.pathname.match(/^\/api\/projects\/(\d+)$/);
    if (projectMatch && request.method === 'PUT') {
      if (!authorized(request)) return sendJson(response, 401, { error: 'Sign in to manage projects.' });
      ensureDatabase();
      const project = validateProject(await readJson(request));
      const [result] = await pool.execute(
        'UPDATE projects SET title = ?, category = ?, year = ?, summary = ?, outcome = ?, visual = ? WHERE id = ?',
        [project.title, project.category, project.year, project.summary, project.outcome, project.visual, projectMatch[1]],
      );
      if (!result.affectedRows) return sendJson(response, 404, { error: 'Project not found.' });
      return sendJson(response, 200, { id: Number(projectMatch[1]), ...project });
    }

    if (projectMatch && request.method === 'DELETE') {
      if (!authorized(request)) return sendJson(response, 401, { error: 'Sign in to manage projects.' });
      ensureDatabase();
      const [existingRows] = await pool.execute('SELECT cover_image FROM projects WHERE id = ?', [projectMatch[1]]);
      const [result] = await pool.execute('DELETE FROM projects WHERE id = ?', [projectMatch[1]]);
      if (!result.affectedRows) return sendJson(response, 404, { error: 'Project not found.' });
      await removeStoredCover(existingRows[0]?.cover_image);
      response.writeHead(204);
      response.end();
      return true;
    }

    sendJson(response, 404, { error: 'API route not found.' });
    return true;
  } catch (error) {
    if (pendingUpload) await unlink(pendingUpload).catch(() => {});
    const status = error.statusCode || (error.code === 'ER_NO_SUCH_TABLE' || error.code === 'ECONNREFUSED' ? 503 : 500);
    const message = status === 500 ? 'The request could not be completed.' : error.message;
    if (status === 500) console.error('API request failed:', error.message);
    sendJson(response, status, { error: message });
    return true;
  }
};

const contentTypes = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp',
  '.ico': 'image/x-icon', '.woff2': 'font/woff2', '.json': 'application/json; charset=utf-8',
};

const serveBuiltFile = async (request, response) => {
  const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
  const requestedPath = pathname === '/' ? '/index.html' : pathname;
  let filePath = path.resolve(distDir, `.${requestedPath}`);
  if (!filePath.startsWith(`${distDir}${path.sep}`)) {
    response.writeHead(403).end('Forbidden');
    return;
  }
  try {
    const details = await stat(filePath);
    if (details.isDirectory()) filePath = path.join(filePath, 'index.html');
    const contentType = contentTypes[path.extname(filePath)] || 'application/octet-stream';
    response.writeHead(200, { 'Content-Type': contentType, 'Cache-Control': filePath.endsWith('index.html') ? 'no-cache' : 'public, max-age=3600' });
    createReadStream(filePath).pipe(response);
  } catch {
    const html = await readFile(path.join(distDir, 'index.html'));
    response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-cache' });
    response.end(html);
  }
};

let vite;
const httpServer = createServer(async (request, response) => {
  try {
    if (request.method === 'GET' && request.url.startsWith('/uploads/')) return await serveUploadedFile(request, response);
    if (await handleApi(request, response)) return;
    if (isProduction) return await serveBuiltFile(request, response);
    vite.middlewares(request, response, (error) => {
      if (error) {
        console.error('Development request failed:', error.message);
        if (!response.headersSent) response.writeHead(500);
        response.end('Internal server error');
      } else if (!response.writableEnded) {
        response.writeHead(404).end('Not found');
      }
    });
  } catch (error) {
    if (!response.headersSent) response.writeHead(500);
    response.end('Internal server error');
  }
});

if (!isProduction) {
  vite = await createViteServer({
    configFile: false,
    root: rootDir,
    server: { middlewareMode: true, hmr: { server: httpServer } },
    appType: 'spa',
  });
} else if (!existsSync(path.join(distDir, 'index.html'))) {
  console.error('Production files are missing. Run `npm run build` first.');
  process.exit(1);
}

httpServer.listen(port, host, () => {
  console.log(`Alphanity ${isProduction ? 'site' : 'dev server'} running at http://${host}:${port}`);
  if (missingEnv.length) console.log(`MySQL and admin setup needed: add ${missingEnv.join(', ')} to .env`);
});

const shutdown = async () => {
  if (vite) await vite.close();
  if (pool) await pool.end();
  httpServer.close(() => process.exit(0));
};
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

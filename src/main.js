import './style.css';
import * as THREE from 'three';
import { supabase } from './lib/supabaseClient.js';

const SETTINGS_TABLE = 'site_settings';
const SETTINGS_ID = 1;
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || '';
const PROJECTS_TABLE = 'projects';
const SETTINGS_FIELDS = [
  'brand',
  'nav_cta',
  'cv_url',
  'eyebrow',
  'hero_title',
  'hero_subtitle',
  'focus_value',
  'stack_value',
  'highlight_title',
  'highlight_body',
  'stat_projects',
  'stat_years',
  'stat_score',
  'contact_title',
  'contact_subtitle',
];

const defaultContent = {
  brand: 'MHAIK',
  nav_cta: 'Download CV',
  cv_url: '',
  eyebrow: '3D Portfolio Showcase',
  hero_title: 'Crafting immersive web experiences with clean engineering.',
  hero_subtitle:
    'I build fast, aesthetic products. This portfolio is a lightweight 3D canvas that stays accessible and quick to load.',
  focus_value: 'Frontend + 3D',
  stack_value: 'Vite ? Three.js ? Supabase',
  highlight_title: 'Latest Highlight',
  highlight_body: 'Interactive product preview with realtime analytics and micro-interactions.',
  stat_projects: '12',
  stat_years: '4',
  stat_score: '98%',
  contact_title: "Let's build something sleek.",
  contact_subtitle: "Send me your brief and we'll make it real.",
};

const app = document.querySelector('#app');

app.innerHTML = `
  <canvas id="bg-canvas" aria-hidden="true"></canvas>
  <div class="shell">
    <header class="nav">
      <div class="brand" data-field="brand">${defaultContent.brand}</div>
      <nav class="nav-links">
        <a href="#home">Home</a>
        <a href="#projects">Projects</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
        <a href="#admin">Admin</a>
      </nav>
      <a class="nav-cta" id="cv-link" data-field="nav_cta" href="#contact">${defaultContent.nav_cta}</a>
    </header>

    <main>
      <section id="home" class="page is-active">
      <section class="hero">
        <div class="hero-copy">
          <p class="eyebrow" data-field="eyebrow">${defaultContent.eyebrow}</p>
          <h1 data-field="hero_title">${defaultContent.hero_title}</h1>
          <p class="lede" data-field="hero_subtitle">${defaultContent.hero_subtitle}</p>
          <div class="hero-actions">
            <button class="primary">Explore Projects</button>
            <button class="ghost">Let's Collaborate</button>
          </div>
          <div class="hero-meta">
            <div>
              <span class="meta-label">Focus</span>
              <span class="meta-value" data-field="focus_value">${defaultContent.focus_value}</span>
            </div>
            <div>
              <span class="meta-label">Stack</span>
              <span class="meta-value" data-field="stack_value">${defaultContent.stack_value}</span>
            </div>
          </div>
        </div>
        <div class="hero-card">
          <h2 data-field="highlight_title">${defaultContent.highlight_title}</h2>
          <p data-field="highlight_body">${defaultContent.highlight_body}</p>
          <div class="stat-grid">
            <div>
              <span class="stat" data-field="stat_projects">${defaultContent.stat_projects}</span>
              <span class="stat-label">Projects</span>
            </div>
            <div>
              <span class="stat" data-field="stat_years">${defaultContent.stat_years}</span>
              <span class="stat-label">Years</span>
            </div>
            <div>
              <span class="stat" data-field="stat_score">${defaultContent.stat_score}</span>
              <span class="stat-label">Lighthouse</span>
            </div>
          </div>
        </div>
      </section>

      <section id="projects" class="projects">
        <div class="section-title">
          <h2>Selected Projects</h2>
          <p>Concise project highlights. Full 3D assets are managed in the admin panel.</p>
        </div>
        <div id="project-grid" class="project-grid"></div>
      </section>

      <section id="about" class="about">
        <div>
          <h2>About</h2>
          <p>
            I am an IT Project Manager with a strong background in Information Systems and hands-on experience delivering
            digital solutions across web, mobile, and enterprise platforms. Currently working in an industrial environment,
            I focus on translating business and operational needs into scalable, secure, and high-impact technology initiatives.
          </p>
          <p>
            My professional experience spans project delivery, cross-functional coordination, vendor management, and system
            implementation, with a strong emphasis on reliability, governance, and long-term value creation. I am particularly
            interested in digital transformation, IoT-driven solutions, and how technology can improve operational efficiency
            in complex organizations.
          </p>
          <p>
            Known for a structured, results-oriented approach, I enjoy working at the intersection of technology, people, and
            business strategy. I am continuously developing my leadership and management capabilities to prepare for broader
            responsibilities in technology leadership roles.
          </p>
        </div>
        <div class="about-panel">
          <h3>Now Open For</h3>
          <ul>
            <li>IT consulting</li>
            <li>Software development</li>
            <li>Full-stack product builds</li>
            <li>Project management with technical delivery</li>
          </ul>
        </div>
      </section>

      <section id="contact" class="contact">
        <div>
          <h2 data-field="contact_title">${defaultContent.contact_title}</h2>
          <p data-field="contact_subtitle">${defaultContent.contact_subtitle}</p>
          <p class="contact-email">Email: <a href="mailto:mhaikalas@gmail.com">mhaikalas@gmail.com</a></p>
        </div>
        <div class="contact-actions">
          <a class="primary" href="mailto:mhaikalas@gmail.com">Email Me</a>
          <a class="ghost" href="https://wa.me/6282318979805" target="_blank" rel="noopener">WhatsApp</a>
        </div>
      </section>
      </section>

      <section id="admin" class="page admin">
        <div class="admin-header">
          <div>
            <h2>Admin Access</h2>
            <p>Login with the password to manage your content.</p>
          </div>
          <span id="admin-status" class="admin-status">Idle</span>
        </div>
        <div id="admin-lock" class="admin-lock">
          <p>Enter the admin password to unlock editing.</p>
          <form id="admin-auth" class="admin-auth">
            <input name="password" type="password" placeholder="Admin password" required />
            <button class="primary" type="submit">Unlock</button>
          </form>
        </div>
      </section>

      <section id="crud" class="page crud">
        <div class="admin-header">
          <div>
            <h2>Content Manager</h2>
            <p>Update hero content without touching the code.</p>
          </div>
          <span id="upload-status" class="admin-status">Idle</span>
        </div>
        <form id="admin-form" class="admin-form">
          <div class="form-grid">
            <label>
              Brand Name
              <input name="brand" type="text" required />
            </label>
            <label>
              Header CTA
              <input name="nav_cta" type="text" required />
            </label>
            <label>
              CV URL (auto)
              <input name="cv_url" type="url" placeholder="Upload a CV to generate URL" readonly />
            </label>
            <label class="file-row">
              Upload CV (PDF)
              <input id="cv-file" name="cv_file" type="file" accept=".pdf,application/pdf" />
              <button id="cv-upload" class="ghost" type="button">Upload CV</button>
            </label>
            <label>
              Eyebrow
              <input name="eyebrow" type="text" required />
            </label>
            <label>
              Hero Title
              <textarea name="hero_title" rows="2" required></textarea>
            </label>
            <label>
              Hero Subtitle
              <textarea name="hero_subtitle" rows="3" required></textarea>
            </label>
            <label>
              Focus
              <input name="focus_value" type="text" required />
            </label>
            <label>
              Stack
              <input name="stack_value" type="text" required />
            </label>
            <label>
              Highlight Title
              <input name="highlight_title" type="text" required />
            </label>
            <label>
              Highlight Body
              <textarea name="highlight_body" rows="2" required></textarea>
            </label>
            <label>
              Projects Count
              <input name="stat_projects" type="text" required />
            </label>
            <label>
              Years Count
              <input name="stat_years" type="text" required />
            </label>
            <label>
              Score
              <input name="stat_score" type="text" required />
            </label>
            <label>
              Contact Title
              <textarea name="contact_title" rows="2" required></textarea>
            </label>
            <label>
              Contact Subtitle
              <textarea name="contact_subtitle" rows="2" required></textarea>
            </label>
          </div>
          <button class="primary" type="submit">Save Changes</button>
        </form>

        <div class="divider"></div>

        <div class="admin-header">
          <div>
            <h2>Projects CRUD</h2>
            <p>Add, edit, and delete project cards.</p>
          </div>
          <span id="project-status" class="admin-status">Idle</span>
        </div>

        <form id="project-form" class="admin-form">
          <input type="hidden" name="id" />
          <div class="form-grid">
            <label>
              Project Title
              <input name="title" type="text" required />
            </label>
            <label>
              Tag
              <input name="tag" type="text" required />
            </label>
            <label>
              Description
              <textarea name="description" rows="3" required></textarea>
            </label>
            <label>
              Image URL (auto)
              <input name="image_url" type="url" placeholder="Upload image to generate URL" readonly />
            </label>
            <label class="file-row">
              Upload Image (JPG/PNG/WebP)
              <input id="project-image-file" type="file" accept="image/*" />
              <button id="project-image-upload" class="ghost" type="button">Upload Image</button>
            </label>
            <label>
              Sort Order
              <input name="sort_order" type="number" value="0" />
            </label>
          </div>
          <div class="form-actions">
            <button class="primary" type="submit">Save Project</button>
            <button id="project-reset" class="ghost" type="button">Reset</button>
          </div>
        </form>

        <div id="project-list" class="project-list"></div>
      </section>
    </main>
  </div>
  <div id="image-modal" class="image-modal" aria-hidden="true">
    <button class="image-modal-close" type="button" aria-label="Close image">Close</button>
    <img id="image-modal-img" alt="Project preview" />
  </div>
`;

const mergeContent = (data = {}) => {
  const merged = { ...defaultContent };
  Object.keys(defaultContent).forEach((key) => {
    const value = data[key];
    if (typeof value === 'string' && value.trim().length > 0) {
      merged[key] = value.trim();
    }
  });
  return merged;
};

const applyContent = (content) => {
  const fields = document.querySelectorAll('[data-field]');
  fields.forEach((node) => {
    const key = node.dataset.field;
    if (content[key] !== undefined) {
      node.textContent = content[key];
    }
  });
  const cvLink = document.querySelector('#cv-link');
  if (cvLink) {
    const url = content.cv_url && content.cv_url.trim().length > 0 ? content.cv_url.trim() : '#contact';
    cvLink.setAttribute('href', url);
    if (url.startsWith('http')) {
      cvLink.setAttribute('target', '_blank');
      cvLink.setAttribute('rel', 'noopener');
    } else {
      cvLink.removeAttribute('target');
      cvLink.removeAttribute('rel');
    }
  }
};

const fillForm = (content) => {
  const form = document.querySelector('#admin-form');
  if (!form) return;
  const elements = form.elements;
  Object.keys(content).forEach((key) => {
    if (elements[key]) {
      elements[key].value = content[key];
    }
  });
};

const setStatus = (message, tone = 'neutral') => {
  const statusEl = document.querySelector('#admin-status');
  if (!statusEl) return;
  statusEl.textContent = message;
  statusEl.dataset.tone = tone;
};

const setUploadStatus = (message, tone = 'neutral') => {
  const statusEl = document.querySelector('#upload-status');
  if (!statusEl) return;
  statusEl.textContent = message;
  statusEl.dataset.tone = tone;
};

const setProjectStatus = (message, tone = 'neutral') => {
  const statusEl = document.querySelector('#project-status');
  if (!statusEl) return;
  statusEl.textContent = message;
  statusEl.dataset.tone = tone;
};

let adminUnlocked = false;

const setAdminUnlocked = (unlocked) => {
  adminUnlocked = unlocked;
  const lock = document.querySelector('#admin-lock');
  if (!lock) return;
  lock.classList.toggle('is-hidden', unlocked);
  setStatus(unlocked ? 'Access granted' : 'Locked', unlocked ? 'good' : 'warn');
};

const loadSettings = async () => {
  setStatus('Loading...', 'neutral');
  const { data, error } = await supabase
    .from(SETTINGS_TABLE)
    .select('*')
    .eq('id', SETTINGS_ID)
    .maybeSingle();

  if (error) {
    console.error('Supabase load error', error);
    setStatus('Using defaults', 'warn');
    applyContent(defaultContent);
    fillForm(defaultContent);
    return;
  }

  const merged = mergeContent(data || {});
  applyContent(merged);
  fillForm(merged);
  setStatus(data ? 'Synced' : 'Defaults', 'good');
};

const saveSettings = async (payload) => {
  setStatus('Saving...', 'neutral');
  const { error } = await supabase
    .from(SETTINGS_TABLE)
    .upsert({ id: SETTINGS_ID, ...payload }, { onConflict: 'id' });

  if (error) {
    console.error('Supabase save error', error);
    setStatus('Save failed', 'warn');
    return false;
  }

  setStatus('Saved', 'good');
  return true;
};

const adminForm = document.querySelector('#admin-form');
if (adminForm) {
  adminForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(adminForm);
    const payload = {};
    formData.forEach((value, key) => {
      if (!SETTINGS_FIELDS.includes(key)) return;
      const trimmed = String(value).trim();
      payload[key] = trimmed.length > 0 ? trimmed : null;
    });

    const ok = await saveSettings(payload);
    if (ok) applyContent(payload);
  });
}

const projectGrid = document.querySelector('#project-grid');
const imageModal = document.querySelector('#image-modal');
const imageModalImg = document.querySelector('#image-modal-img');
const imageModalClose = document.querySelector('.image-modal-close');

const renderProjects = (projects = []) => {
  if (!projectGrid) return;
  if (!projects.length) {
    projectGrid.innerHTML = '<p class="empty-state">No projects yet.</p>';
    return;
  }
  projectGrid.innerHTML = projects
    .map((project) => {
      const image = project.image_url
        ? `<div class="project-image" data-image-url="${project.image_url}" style="background-image:url('${project.image_url}')"></div>`
        : '';
      return `
        <article class="project-card">
          ${image}
          <h3>${project.title}</h3>
          <p>${project.description}</p>
          <span class="tag">${project.tag}</span>
        </article>
      `;
    })
    .join('');
};

const openImageModal = (url) => {
  if (!imageModal || !imageModalImg || !url) return;
  imageModalImg.src = url;
  imageModal.classList.add('is-active');
  imageModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
};

const closeImageModal = () => {
  if (!imageModal || !imageModalImg) return;
  imageModalImg.src = '';
  imageModal.classList.remove('is-active');
  imageModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
};

if (projectGrid) {
  projectGrid.addEventListener('click', (event) => {
    const image = event.target.closest('.project-image');
    if (!image) return;
    const url = image.dataset.imageUrl || '';
    openImageModal(url);
  });
}

if (imageModal) {
  imageModal.addEventListener('click', (event) => {
    if (event.target === imageModal) closeImageModal();
  });
}

if (imageModalClose) {
  imageModalClose.addEventListener('click', () => closeImageModal());
}

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeImageModal();
});

let cachedProjects = [];

const fetchProjects = async () => {
  const { data, error } = await supabase
    .from(PROJECTS_TABLE)
    .select('*')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Project fetch error', error);
    setProjectStatus('Load failed', 'warn');
    return;
  }
  cachedProjects = data || [];
  renderProjects(cachedProjects);
  renderProjectList(cachedProjects);
  setProjectStatus('Loaded', 'good');
};

const projectList = document.querySelector('#project-list');
const projectForm = document.querySelector('#project-form');
const projectReset = document.querySelector('#project-reset');

const renderProjectList = (projects = []) => {
  if (!projectList) return;
  if (!projects.length) {
    projectList.innerHTML = '<p class="empty-state">No projects stored yet.</p>';
    return;
  }
  projectList.innerHTML = projects
    .map(
      (project) => `
        <div class="project-row">
          <div>
            <strong>${project.title}</strong>
            <span>${project.tag}</span>
          </div>
          <div class="project-row-actions">
            <button class="ghost" data-action="edit" data-id="${project.id}">Edit</button>
            <button class="ghost" data-action="delete" data-id="${project.id}">Delete</button>
          </div>
        </div>
      `
    )
    .join('');
};

const resetProjectForm = () => {
  if (!projectForm) return;
  projectForm.reset();
  projectForm.elements.id.value = '';
  projectForm.elements.sort_order.value = 0;
};

const fillProjectForm = (project) => {
  if (!projectForm || !project) return;
  projectForm.elements.id.value = project.id || '';
  projectForm.elements.title.value = project.title || '';
  projectForm.elements.tag.value = project.tag || '';
  projectForm.elements.description.value = project.description || '';
  projectForm.elements.image_url.value = project.image_url || '';
  projectForm.elements.sort_order.value = project.sort_order ?? 0;
};

if (projectForm) {
  projectForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const payload = {
      title: projectForm.elements.title.value.trim(),
      tag: projectForm.elements.tag.value.trim(),
      description: projectForm.elements.description.value.trim(),
      image_url: projectForm.elements.image_url.value.trim(),
      sort_order: Number(projectForm.elements.sort_order.value || 0),
    };
    if (!payload.title || !payload.tag || !payload.description) {
      setProjectStatus('Fill required fields', 'warn');
      return;
    }
    setProjectStatus('Saving...', 'neutral');
    const id = projectForm.elements.id.value || undefined;
    const { error } = await supabase
      .from(PROJECTS_TABLE)
      .upsert({ id, ...payload }, { onConflict: 'id' });

    if (error) {
      console.error('Project save error', error);
      setProjectStatus('Save failed', 'warn');
      return;
    }
    setProjectStatus('Saved', 'good');
    await fetchProjects();
    resetProjectForm();
  });
}

if (projectReset) {
  projectReset.addEventListener('click', () => resetProjectForm());
}

if (projectList) {
  projectList.addEventListener('click', async (event) => {
    const button = event.target.closest('button[data-action]');
    if (!button) return;
    const { action, id } = button.dataset;
    const target = cachedProjects.find((item) => String(item.id) === String(id));
    if (action === 'edit' && target) {
      fillProjectForm(target);
      return;
    }
    if (action === 'delete' && id) {
      setProjectStatus('Deleting...', 'neutral');
      const { error } = await supabase.from(PROJECTS_TABLE).delete().eq('id', id);
      if (error) {
        console.error('Project delete error', error);
        setProjectStatus('Delete failed', 'warn');
        return;
      }
      setProjectStatus('Deleted', 'good');
      await fetchProjects();
      resetProjectForm();
    }
  });
}

const cvUploadButton = document.querySelector('#cv-upload');
if (cvUploadButton) {
  cvUploadButton.addEventListener('click', async () => {
    const fileInput = document.querySelector('#cv-file');
    if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
      setUploadStatus('Select a PDF first', 'warn');
      return;
    }
    const file = fileInput.files[0];
    if (file.type !== 'application/pdf') {
      setUploadStatus('PDF only', 'warn');
      return;
    }

    setUploadStatus('Uploading...', 'neutral');
    const ext = file.name.split('.').pop() || 'pdf';
    const path = `cv/cv-${Date.now()}.${ext}`;

    const { error } = await supabase.storage
      .from('assets')
      .upload(path, file, { upsert: true });

    if (error) {
      console.error('Upload error', error);
      setUploadStatus('Upload failed', 'warn');
      return;
    }

    const { data } = supabase.storage.from('assets').getPublicUrl(path);
    const url = data?.publicUrl || '';
    if (!url) {
      setUploadStatus('URL missing', 'warn');
      return;
    }

    const urlInput = adminForm ? adminForm.elements.cv_url : null;
    if (urlInput) urlInput.value = url;
    const ok = await saveSettings({ cv_url: url });
    if (ok) applyContent({ ...defaultContent, cv_url: url });
    setUploadStatus('Uploaded', 'good');
  });
}

const projectImageUpload = document.querySelector('#project-image-upload');
if (projectImageUpload) {
  projectImageUpload.addEventListener('click', async () => {
    const fileInput = document.querySelector('#project-image-file');
    if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
      setProjectStatus('Select an image', 'warn');
      return;
    }
    const file = fileInput.files[0];
    if (!file.type.startsWith('image/')) {
      setProjectStatus('Image only', 'warn');
      return;
    }

    setProjectStatus('Uploading...', 'neutral');
    const ext = file.name.split('.').pop() || 'png';
    const path = `projects/project-${Date.now()}.${ext}`;

    const { error } = await supabase.storage
      .from('assets')
      .upload(path, file, { upsert: true });

    if (error) {
      console.error('Project image upload error', error);
      setProjectStatus('Upload failed', 'warn');
      return;
    }

    const { data } = supabase.storage.from('assets').getPublicUrl(path);
    const url = data?.publicUrl || '';
    if (!url) {
      setProjectStatus('URL missing', 'warn');
      return;
    }

    if (projectForm) {
      projectForm.elements.image_url.value = url;
    }
    setProjectStatus('Uploaded', 'good');
  });
}

const authForm = document.querySelector('#admin-auth');
if (authForm) {
  authForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const passwordInput = authForm.querySelector('input[name="password"]');
    const entered = passwordInput ? passwordInput.value.trim() : '';
    if (!ADMIN_PASSWORD) {
      setStatus('Set VITE_ADMIN_PASSWORD', 'warn');
      return;
    }
    if (entered === ADMIN_PASSWORD) {
      setAdminUnlocked(true);
      passwordInput.value = '';
      showPage('#crud');
      window.location.hash = '#crud';
    } else {
      setStatus('Wrong password', 'warn');
    }
  });
}

setAdminUnlocked(false);
loadSettings();
fetchProjects();

const HOME_SECTIONS = new Set(['home', 'projects', 'about', 'contact']);

const showPage = (hash) => {
  const pages = document.querySelectorAll('.page');
  const raw = hash && hash !== '#' ? hash.replace('#', '') : 'home';
  const isHomeSection = HOME_SECTIONS.has(raw);
  if (raw === 'crud' && !adminUnlocked) {
    pages.forEach((page) => {
      page.classList.toggle('is-active', page.id === 'admin');
    });
    return;
  }

  const targetPage = isHomeSection ? 'home' : raw;

  pages.forEach((page) => {
    page.classList.toggle('is-active', page.id === targetPage);
  });

  if (isHomeSection && raw !== 'home') {
    const section = document.getElementById(raw);
    if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    return;
  }
};

showPage(window.location.hash);
window.addEventListener('hashchange', () => showPage(window.location.hash));

const canvas = document.getElementById('bg-canvas');
const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
  alpha: true,
  powerPreference: 'high-performance',
});

renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
renderer.setSize(window.innerWidth, window.innerHeight);

const scene = new THREE.Scene();
scene.fog = new THREE.Fog(0x0b0d12, 6, 16);

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.set(0, 1.2, 7);

const ambient = new THREE.AmbientLight(0xcad4ff, 0.6);
scene.add(ambient);

const keyLight = new THREE.DirectionalLight(0xffc89a, 1.1);
keyLight.position.set(4, 6, 3);
scene.add(keyLight);

const rimLight = new THREE.DirectionalLight(0x7ee1ff, 0.8);
rimLight.position.set(-5, 2, -4);
scene.add(rimLight);

const coreGroup = new THREE.Group();
scene.add(coreGroup);

const rocketGroup = new THREE.Group();
coreGroup.add(rocketGroup);

const rocketBodyGeometry = new THREE.CylinderGeometry(0.55, 0.55, 2.4, 16, 1, false);
const rocketBodyMaterial = new THREE.MeshStandardMaterial({
  color: 0x8cc8ff,
  metalness: 0.35,
  roughness: 0.25,
  emissive: 0x1c2a44,
  emissiveIntensity: 0.6,
});
const rocketBody = new THREE.Mesh(rocketBodyGeometry, rocketBodyMaterial);
rocketGroup.add(rocketBody);

const noseGeometry = new THREE.ConeGeometry(0.58, 0.9, 18);
const noseMaterial = new THREE.MeshStandardMaterial({
  color: 0xffc59e,
  metalness: 0.3,
  roughness: 0.35,
  emissive: 0x2c1b12,
  emissiveIntensity: 0.45,
});
const nose = new THREE.Mesh(noseGeometry, noseMaterial);
nose.position.y = 1.65;
rocketGroup.add(nose);

const windowGeometry = new THREE.CircleGeometry(0.18, 32);
const windowMaterial = new THREE.MeshStandardMaterial({
  color: 0x6df0ff,
  metalness: 0.2,
  roughness: 0.1,
  emissive: 0x1b6b7a,
  emissiveIntensity: 0.8,
});
const windowPane = new THREE.Mesh(windowGeometry, windowMaterial);
windowPane.position.set(0, 0.35, 0.56);
rocketGroup.add(windowPane);

const finGroup = new THREE.Group();
rocketGroup.add(finGroup);
const finGeometry = new THREE.BoxGeometry(0.08, 0.7, 0.5);
const finMaterial = new THREE.MeshStandardMaterial({
  color: 0xffb49a,
  metalness: 0.35,
  roughness: 0.3,
  emissive: 0x2c1b12,
  emissiveIntensity: 0.4,
});
for (let i = 0; i < 4; i += 1) {
  const fin = new THREE.Mesh(finGeometry, finMaterial);
  const angle = (i / 4) * Math.PI * 2;
  fin.position.set(Math.cos(angle) * 0.6, -0.9, Math.sin(angle) * 0.6);
  fin.rotation.y = angle;
  finGroup.add(fin);
}

const engineGeometry = new THREE.CylinderGeometry(0.26, 0.32, 0.35, 16);
const engineMaterial = new THREE.MeshStandardMaterial({
  color: 0x2a3148,
  metalness: 0.5,
  roughness: 0.35,
  emissive: 0x0b0f1a,
  emissiveIntensity: 0.4,
});
const engine = new THREE.Mesh(engineGeometry, engineMaterial);
engine.position.y = -1.35;
rocketGroup.add(engine);

const flameGeometry = new THREE.ConeGeometry(0.28, 0.7, 16);
const flameMaterial = new THREE.MeshStandardMaterial({
  color: 0x7ee1ff,
  metalness: 0.1,
  roughness: 0.2,
  emissive: 0x2aa6c8,
  emissiveIntensity: 1.2,
  transparent: true,
  opacity: 0.75,
});
const flame = new THREE.Mesh(flameGeometry, flameMaterial);
flame.position.y = -1.85;
flame.rotation.x = Math.PI;
rocketGroup.add(flame);

const nodeGeometry = new THREE.SphereGeometry(0.12, 18, 18);
const nodeMaterial = new THREE.MeshStandardMaterial({
  color: 0xffc59e,
  metalness: 0.25,
  roughness: 0.4,
  emissive: 0x2c1b12,
  emissiveIntensity: 0.5,
});

const nodePositions = [
  [1.6, 0.1, 0.6],
  [-1.5, 0.4, -0.5],
  [0.4, -1.1, 0.9],
  [-0.2, 1.1, 1.0],
  [0.9, 0.8, -1.1],
];

nodePositions.forEach((pos) => {
  const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
  node.position.set(pos[0], pos[1], pos[2]);
  coreGroup.add(node);
});

const circuitGroup = new THREE.Group();
scene.add(circuitGroup);


const circuitLines = new THREE.BufferGeometry();
const circuitPoints = new Float32Array([
  -3.2, -1.2, -0.6,  -1.2, -1.2, -0.6,  -1.2, 0.6, -0.6,  1.4, 0.6, -0.6,
  1.4, 0.6, -0.6,   1.4, 1.6, -0.6,   3.0, 1.6, -0.6,
  -2.8, 1.4, 0.8,   -0.6, 1.4, 0.8,   -0.6, -0.4, 0.8,   1.2, -0.4, 0.8,
  -1.8, 0.0, 1.6,   -1.8, -1.4, 1.6,   0.2, -1.4, 1.6,   0.2, 0.2, 1.6,
]);
const circuitPointsAttr = new THREE.BufferAttribute(circuitPoints, 3);
circuitLines.setAttribute('position', circuitPointsAttr);
const circuitMaterial = new THREE.LineBasicMaterial({
  color: 0x6df0ff,
  transparent: true,
  opacity: 0.55,
});
const circuits = new THREE.LineSegments(circuitLines, circuitMaterial);
circuits.rotation.y = -0.4;
circuitGroup.add(circuits);

const gridGeometry = new THREE.PlaneGeometry(12, 8, 12, 8);
const gridMaterial = new THREE.MeshBasicMaterial({
  color: 0x1a2744,
  wireframe: true,
  transparent: true,
  opacity: 0.4,
});
const grid = new THREE.Mesh(gridGeometry, gridMaterial);
grid.rotation.x = -Math.PI / 2.7;
grid.position.y = -2.2;
grid.position.z = -1.2;
scene.add(grid);

const starCount = 180;
const starGeometry = new THREE.BufferGeometry();
const starPositions = new Float32Array(starCount * 3);

for (let i = 0; i < starCount * 3; i += 3) {
  starPositions[i] = (Math.random() - 0.5) * 14;
  starPositions[i + 1] = (Math.random() - 0.5) * 8;
  starPositions[i + 2] = (Math.random() - 0.5) * 12;
}

starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
const starMaterial = new THREE.PointsMaterial({
  color: 0xa2b4ff,
  size: 0.03,
  opacity: 0.75,
  transparent: true,
});
const stars = new THREE.Points(starGeometry, starMaterial);
scene.add(stars);

let scrollTarget = 0;
window.addEventListener('scroll', () => {
  scrollTarget = window.scrollY * 0.0015;
});

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let frameId;
const clock = new THREE.Clock();
const pointerTarget = new THREE.Vector2(0, 0);
const pointerCurrent = new THREE.Vector2(0, 0);

window.addEventListener('mousemove', (event) => {
  pointerTarget.x = (event.clientX / window.innerWidth) * 2 - 1;
  pointerTarget.y = -(event.clientY / window.innerHeight) * 2 + 1;
});

window.addEventListener('mouseleave', () => {
  pointerTarget.set(0, 0);
});

const animate = () => {
  frameId = requestAnimationFrame(animate);
  const elapsed = clock.getElapsedTime();

  pointerCurrent.lerp(pointerTarget, 0.08);
  const cursorTiltX = pointerCurrent.y * 0.25;
  const cursorTiltY = pointerCurrent.x * 0.35;

  coreGroup.rotation.y = elapsed * 0.25 + scrollTarget * 0.4;
  coreGroup.rotation.x = elapsed * 0.12 + cursorTiltX;
  coreGroup.rotation.y += cursorTiltY;
  rocketGroup.rotation.y = elapsed * 0.18 + cursorTiltY * 0.5;
  rocketGroup.rotation.x = cursorTiltX * 0.6;
  finGroup.rotation.y = -elapsed * 0.22;
  flame.scale.y = 0.85 + Math.sin(elapsed * 3.2) * 0.12;
  flame.scale.x = 0.9 + Math.cos(elapsed * 2.8) * 0.08;
  circuitGroup.rotation.y = -elapsed * 0.08 - cursorTiltY * 0.6;
  stars.rotation.y = elapsed * 0.02;

  camera.position.y = 1.2 - scrollTarget;
  camera.lookAt(0, 0, 0);

  renderer.render(scene, camera);
};

if (!prefersReducedMotion) {
  animate();
} else {
  renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
  const width = window.innerWidth;
  const height = window.innerHeight;

  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
});

window.addEventListener('beforeunload', () => {
  if (frameId) cancelAnimationFrame(frameId);
  renderer.dispose();
  rocketBodyGeometry.dispose();
  rocketBodyMaterial.dispose();
  noseGeometry.dispose();
  noseMaterial.dispose();
  windowGeometry.dispose();
  windowMaterial.dispose();
  finGeometry.dispose();
  finMaterial.dispose();
  engineGeometry.dispose();
  engineMaterial.dispose();
  flameGeometry.dispose();
  flameMaterial.dispose();
  nodeGeometry.dispose();
  nodeMaterial.dispose();
  circuitLines.dispose();
  circuitMaterial.dispose();
  gridGeometry.dispose();
  gridMaterial.dispose();
  starGeometry.dispose();
  starMaterial.dispose();
});

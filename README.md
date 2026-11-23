# Alphanity Studio

Alphanity's portfolio site uses Vite for the frontend, a small Node.js API, and MySQL for the project library. The browser never receives MySQL credentials. Admin passwords are checked by the server and project updates use expiring in-memory sessions.

Each project can have one JPG, PNG, or WebP cover image up to 6 MB. Image files live under the ignored `uploads/` directory; MySQL stores each project's cover path. Back up `uploads/` alongside the database.

## Requirements

- Node.js 22 or newer (`.nvmrc` selects the current Node 22 release)
- MySQL 8.0+

## Run locally

1. Install and select the project Node version:

   ```sh
   nvm install
   nvm use
   ```

2. Install dependencies. If you do not already have a `.env`, copy the example; otherwise keep your existing file and add the settings shown in `.env.example`:

   ```sh
   npm install
   cp .env.example .env  # only when .env does not already exist
   ```

3. Set your MySQL connection values and a strong `ADMIN_PASSWORD` in `.env`, then create the database table:

   ```sh
   mysql -u root -p < database/schema.sql
   ```

   Set `WHATSAPP_NUMBER` to the public contact number using digits only and the `62` country prefix (for example, `6281234567890`). The site uses it for the contact links.

4. Start the site and API together:

   ```sh
   npm run dev
   ```

Open `http://localhost:5173`. If MySQL is not connected yet, the page displays clearly marked preview project examples. Once the database is configured, add real projects from **Team access** in the footer.

For a database created before cover images were added, apply the one-time migration:

```sh
mysql -u root -p alphanity < database/migrations/001_add_project_cover.sql
```

## Production

```sh
npm run build
npm start
```

Set the same environment variables in the production environment. Serve the site over HTTPS and keep `.env` out of source control. Starter project examples in the frontend are illustrative; replace them with approved Alphanity work before publishing.

# Deployment on Windows (XAMPP + MySQL + Node.js)

This guide deploys:
- Apache (XAMPP) serves the static frontend from `frontend/`
- Node.js runs the API server from `backend/`
- MySQL (XAMPP) stores users, flashcards, scenarios, favorites, audit logs

## 1) Install prerequisites
- Install **XAMPP** (Apache + MySQL)
- Install **Node.js LTS** on the server PC (includes `node` and `npm`)

## 2) Create the database
1. Start **MySQL** in XAMPP Control Panel.
2. Open phpMyAdmin.
3. Create DB (example): `nbu_nurse_assistant`
4. Import schema:
   - Import `db/schema.sql`
5. Optional seed data:
   - Import `db/seed.sql`

## 3) Configure and run the backend API
1. Copy env template:
   - Copy `backend/.env.example` → `backend/.env`
2. Edit `backend/.env`:
   - Set `DB_USER`, `DB_PASSWORD`, `DB_NAME`
   - Set a strong `JWT_SECRET`
   - Set `FRONTEND_ORIGIN` (comma-separated allowed), e.g. `http://localhost,http://<server-ip>`
   - Set `ADMIN_BOOTSTRAP_PASSWORD` (minimum 10 chars)
3. Install dependencies:
   - Open PowerShell in `backend/`
   - Run `npm install`
4. Start server:
   - `npm start`
5. Verify:
   - Visit `http://localhost:4000/api/health` should return `{ "ok": true }`

### Notes (admin bootstrap)
On each backend start, the default admin user is created/repaired:
- username: `ADMIN_BOOTSTRAP_USERNAME` (default `admin`)
- password: `ADMIN_BOOTSTRAP_PASSWORD`

Change the bootstrap password after initial setup (or lock access to backend `.env`).

## 4) Serve the frontend via Apache (XAMPP)

### Option A (simple): copy static files into htdocs
1. Ensure XAMPP Apache is running.
2. Place this project under: `XAMPP/htdocs/hospital/`
3. Open `frontend/assets/js/config.js` and set:
   - `API_BASE` to `http://<server-ip>:4000/api`
   - `UPLOADS_BASE` to `http://<server-ip>:4000`
4. Browse:
   - `http://<server-ip>/hospital/frontend/`

### Option B (recommended): Apache reverse proxy `/api` to Node
This avoids CORS and allows a single origin (best for hospital LAN).
1. Enable Apache modules:
   - `proxy`, `proxy_http`, and optionally `ssl`
2. Add a vhost (example):
   - Serve `frontend/` as the document root
   - Proxy `/api` to `http://127.0.0.1:4000/api`
   - Proxy `/socket.io` to `http://127.0.0.1:4000/socket.io`
3. Then set `frontend/assets/js/config.js`:
   - `API_BASE: '/api'`
   - `UPLOADS_BASE: ''`

## 5) Hospital LAN hardening checklist
- Use **HTTPS** (internal CA if possible).
- Restrict admin access by role + network policy.
- Backups (nightly):
  - MySQL dump + `backend/uploads/` directory copy
- Set Windows firewall to allow only required ports (80/443 and API port if exposed).
- Keep a change log: admin edits are captured in `audit_log`.

## 6) Display mode (TV)
- Open: `#/display` in the SPA.
- Uses `GET /api/public/flashcards` (read-only). Restrict access at the network level if needed.


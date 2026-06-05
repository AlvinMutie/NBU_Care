# NBU Nurse Assistant – Full System

Full-stack, multi-user web app for Newborn Unit (NBU) nurses:
- Flashcards (routine/clinical/critical) with images, warnings, tips
- Favorites per user
- Calculators (dose, volume, IV fluid rate, saline/fluid scenarios, dilution)
- Scenario-based learning cases
- Hospital-network deployable (XAMPP + MySQL) with optional Display Mode

This repo is designed to be deployed on a hospital LAN. It prioritizes safety: validation, warnings, and audit logging.

## Tech stack
- **Frontend**: plain **HTML/CSS/JS** (no build tools) served by Apache (XAMPP)
- **Backend**: **Node.js + Express** REST API + Socket.IO realtime updates
- **DB**: **MySQL** (XAMPP)
- **Images**: uploaded to server disk, metadata stored in DB

## Folder layout
- `frontend/`: static site (served by Apache)
- `backend/`: Node.js API server
- `db/`: schema, migrations, seed
- `docs/`: deployment + operations guides

## Prerequisites
- XAMPP (Apache + MySQL)
- Node.js LTS (includes npm) installed on the server machine

## Quick start (dev / local LAN)
1. Create MySQL database and tables
   - Import `db/schema.sql` into MySQL
   - (Optional) Import `db/seed.sql` for starter flashcards/scenarios
2. Backend
   - Copy `backend/.env.example` to `backend/.env` and set values
   - Install deps and run:
     - `cd backend`
     - `npm install`
     - `npm run dev`
3. Frontend
   - Configure API base URL in `frontend/assets/js/config.js`
   - Serve `frontend/` via Apache (XAMPP) or open `frontend/index.html` (API calls require CORS if opened as `file://`)

## Default roles
- **ADMIN**: manage flashcards, scenarios, clinical reference configuration, user accounts
- **NURSE**: view/search, use calculators, favorite items, track progress

## Security notes
- Use HTTPS on the LAN if possible (internal CA or self-signed cert)
- Change default admin password immediately
- Restrict admin routes to authenticated admin users

See `docs/deployment_xampp_windows.md` for a full hospital-network deployment walkthrough.


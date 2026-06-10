# NeoDesk: Neonatal Clinical Intelligence Portal

NeoDesk is a professional-grade clinical operating system designed to standardize neonatal care through precision engineering and editorial design. It transitions neonatal wards from manual, error-prone documentation to a high-integrity, data-driven ecosystem.

## Core Pillars

- **Precision Medication:** Weight-indexed clinical math for zero-error dosing.
- **Institutional Governance:** Immutable audit trails and forensic-level credentialing.
- **Continuity of Care:** Standardized SBAR handover protocols for seamless shift transitions.
- **Clinical Academy:** Integrated learning pathways for specialized nursing staff and students.

## Technology Stack

### Backend: Laravel Unified
A robust PHP/Laravel backend providing a secure API, institutional governance, and clinical ledger.
- **Location:** `/nbu-laravel-unified`
- **Framework:** Laravel 11+
- **Database:** SQLite (default) / PostgreSQL (production)
- **Features:** Eloquent Models, API Authentication, Migrations, Seeders.

### Frontend: Nurse Assistant Portal
A high-performance React application optimized for bedside clinical orchestration.
- **Location:** `/nbu-nurse-assistant`
- **Framework:** React 18 (Vite, TypeScript)
- **Styling:** TailwindCSS 4, Framer Motion
- **Icons:** Lucide React
- **Features:** Responsive Dashboards, Interactive Calculators, Real-time Vital Monitoring.

## Directory Structure

```text
E:\Projects\NBU_Care-main\
├───nbu-laravel-unified\    # Laravel Backend
│   ├───app\                # Business Logic (Controllers, Models)
│   ├───database\           # Migrations and Seeders
│   ├───routes\             # API and Web routes
│   └───...
└───nbu-nurse-assistant\    # React Frontend
    ├───src\
    │   ├───components\     # Reusable UI Components
    │   ├───pages\          # Main Application Views
    │   ├───services\       # API and Global State
    │   └───...
    └───...
```

## Getting Started

### Prerequisites
- PHP 8.2+ & Composer
- Node.js 20+ & npm

### Installation

### Backend Setup:
The backend is Dockerized for consistency and ease of deployment.
```bash
cd nbu-laravel-unified
# Ensure you have Docker installed
docker build -t neodesk-backend .
docker run -p 8000:10000 neodesk-backend
```

2. **Frontend Setup:**
   ```bash
   cd nbu-nurse-assistant
   npm install
   npm run dev
   ```

## Hosting on Render

This project is pre-configured for deployment on [Render](https://render.com).

1. **Connect your GitHub repository** to Render.
2. Render will automatically detect the `render.yaml` file.
3. **Deploy the Services:**
   - `nbu-laravel-unified`: The PHP backend will deploy first.
   - `nbu-nurse-assistant`: The static frontend will deploy.
4. **Configuration:**
   - After the backend is deployed, copy its URL (e.g., `https://nbu-laravel-unified.onrender.com`).
   - In the Render dashboard for the `nbu-nurse-assistant` service, update the `VITE_API_BASE_URL` environment variable to `YOUR_BACKEND_URL/api`.
   - Re-deploy the frontend to apply the change.

## Clinical Safety Disclaimer

NeoDesk is a decision-support tool designed to enhance clinical precision. It is not a substitute for professional clinical judgment. All software-generated calculations must be verified by a secondary clinician in accordance with standard neonatal ward protocols and institutional guidelines.

## License and Attribution

Copyright 2026 NeoDesk Clinical Systems. All rights reserved.

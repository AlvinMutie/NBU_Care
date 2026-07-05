
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
- **Framework:** Laravel 11+ ( this is what was stable)
- **Database:** SQLite (default) / PostgreSQL (production) (Mongo Db could be a good db to use, dont limit yourself to this)
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

## Testing & Login Credentials

Use the following pre-seeded credentials to access the platform during review. The default password for all accounts is **`password`**. (They are all test accounts and dont have real user data, only test data)

| Role | Email Address | Access Level |
| :--- | :--- | :--- |
| **System Admin** | `admin@neodesk.org` | Full Institutional Oversight |
| **Consultant** | `angela.omwansa@hospital.go.ke` | Clinical Advisory & Case Review |
| **Nursing In-Charge** | `teresa.njoroge@hospital.go.ke` | Ward Management & Rota Allocation |
| **Staff Nurse** | `patrick.kamau@hospital.go.ke` | Bedside Documentation & Vitals |
| **Medical Officer** | `cynthia.wekesa@hospital.go.ke` | Clinical Interventions & Orders |

## Hosting on Render

This project is pre-configured for deployment on [Render](https://render.com).

1. **Connect your GitHub repository** to Render.
2. Render will automatically detect the `render.yaml` file.
3. **Deploy the Services:**
   - `neodesk-back-v301`: The Dockerized PHP backend.
   - `neodesk-front-v301`: The static frontend.
4. **Configuration:**
   - Copy the live URL of your backend (e.g., `https://neodesk-back-v301.onrender.com`).
   - In the Render dashboard for the `neodesk-front-v301` service, ensure the `VITE_API_BASE_URL` environment variable is set to `YOUR_BACKEND_URL/api`.
   - Re-deploy the frontend to apply the change. (Incase of any problem contact the admin, which is me)

## Clinical Safety Disclaimer

NeoDesk is a decision-support tool designed to enhance clinical precision. It is not a substitute for professional clinical judgment. All software-generated calculations must be verified by a secondary clinician in accordance with standard neonatal ward protocols and institutional guidelines.

## License

Copyright 2026 NeoDesk Clinical Systems. All rights reserved.

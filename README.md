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

1. **Backend Setup:**
   ```bash
   cd nbu-laravel-unified
   composer install
   cp .env.example .env
   php artisan key:generate
   php artisan migrate --seed
   php artisan serve
   ```

2. **Frontend Setup:**
   ```bash
   cd nbu-nurse-assistant
   npm install
   npm run dev
   ```

## Clinical Safety Disclaimer

NeoDesk is a decision-support tool designed to enhance clinical precision. It is not a substitute for professional clinical judgment. All software-generated calculations must be verified by a secondary clinician in accordance with standard neonatal ward protocols and institutional guidelines.

## License and Attribution

Copyright 2026 NeoDesk Clinical Systems. All rights reserved.

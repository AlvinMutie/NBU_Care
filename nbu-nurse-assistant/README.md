# NeoDesk: Neonatal Clinical Intelligence Portal

NeoDesk is a professional-grade clinical operating system designed to standardize neonatal care through precision engineering and editorial design. It transitions neonatal wards from manual, high-risk workflows to a unified, safety-validated digital environment.

## Vision

In the high-stakes environment of a Neonatal Building Unit (NBU), variables are the enemy of safety. NeoDesk eliminates these variables by providing a high-fidelity interface that enforces clinical protocols, automates high-precision calculations, and orchestrates team communication with surgical accuracy.

## Core Pillars

### Precision Safety Engine
The heart of NeoDesk is a real-time validation layer that monitors every clinical input. Whether calculating weight-based drug dosages or maintenance fluid rates, the system cross-references data against physiological neonatal boundaries to prevent medication errors before they reach the bedside.

### Editorial Design System
Designed with a "Warm Emerald & Professional Slate" aesthetic, the interface utilizes Material 3 principles and sophisticated glassmorphism. This high-contrast, low-cognitive-load design ensures that clinicians can access critical data instantly, even in high-pressure emergency scenarios.

### Clinical Orchestration
NeoDesk bridges the gap between shifts and roles. Through structured Shift Handovers and a unified Knowledge Hub, the platform ensures that every newborn receives a consistent high standard of care, regardless of the provider or the time of day.

## Functional Architecture

### Clinical Modules
- Shift Handover: Structured care transitions with vital trend visualization and task-based validation.
- Knowledge Hub: An editorial-grade library of standardized clinical procedures and diagnostic pathways.
- Precision Calculators: Intelligent engines for Drug Dosing, IV Fluid Rates, Dilution Logic, and Emergency Bolus interventions.
- Patient Scenarios: High-fidelity simulation environments for student training and clinical competency verification.

### Governance and Security
- Role-Based Access Control (RBAC): Customized hubs for Nurses, Consultants, Students, and Hospital Management.
- Audit Ledger: Immutable tracking of clinical actions and calculation derivations for forensic shift reviews.
- Data Integrity: Persistent session management and secure clinical context preservation.

## Technical Specification

### Frontend Stack
- Framework: React 18+ with Vite for ultra-fast HMR and build performance.
- Styling: Tailwind CSS v4 for a utility-first, high-performance design system.
- Animation: GSAP for smooth, non-distracting clinical transitions and workflow visualizations.
- Icons: Lucide-React for a standardized, medical-grade iconography set.

### Backend and Integration
- Service Layer: Modular API service for real-time synchronization with the NeoDesk backend.
- State Management: Context-driven architecture for robust theme and user session integrity.

## Installation and Deployment

### Development Environment
1. Clone the repository to your local clinical workstation.
2. Execute `npm install` to synchronize the professional dependency tree.
3. Launch the development engine using `npm run dev`.

### Production Build
1. Perform a full clinical validation of all calculation logic.
2. Execute `npm run build` to generate the optimized production bundle.
3. Deploy to the hospital's secure internal network or staging environment.

## Project Structure

```text
hospital/
├── render.yaml             # Render Blueprint configuration
├── vercel.json             # Vercel deployment configuration
├── nbu-backend/            # Node.js Express API
│   ├── src/
│   │   ├── server.js       # Entry point
│   │   ├── routes/         # API endpoints
│   │   ├── models/         # Database schemas
│   │   └── middleware/     # Auth and security
│   └── package.json
└── nbu-nurse-assistant/    # React + Vite Frontend
    ├── src/
    │   ├── components/     # UI elements
    │   ├── pages/          # Main views
    │   ├── services/       # API communication layer
    │   └── context/        # State management
    ├── public/             # Static assets
    └── package.json
```

## Deployment

### Deploying to Render

This project is configured for one-click deployment using Render Blueprints.

1.  **Database**: Create a free MongoDB cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2.  **Connect Repo**: Push this project to GitHub and connect the repository to your Render account.
3.  **Blueprints**: Render will automatically detect the `render.yaml` file. Click **Apply** to create the services.
4.  **Environment Variables**:
    -   In the `nbu-backend` service, add `MONGODB_URI` with your Atlas connection string.
    -   The `JWT_SECRET` will be automatically generated, but you can override it if needed.
    -   The `VITE_API_BASE_URL` for the frontend is automatically linked to the backend service.

## Clinical Safety Mandate

NeoDesk is a decision-support tool designed to enhance clinical precision. It is not a substitute for professional clinical judgment. All software-generated calculations must be verified by a secondary clinician in accordance with standard neonatal ward protocols and institutional guidelines.

## License and Attribution

Copyright 2026 NeoDesk Clinical Systems. All rights reserved. Developed by the Advanced Agentic Coding team for the modernization of neonatal care units globally.

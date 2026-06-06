# COMPREHENSIVE SYSTEM DOCUMENTATION MANUAL

## 1. HIGH-LEVEL ARCHITECTURE & ECOSYSTEM
- **Core System Purpose**: NeoDesk (NBU Care) is a high-fidelity clinical operating system designed for Neonatal Building Units (NBU). It standardizes medical care through precision drug dosing, fluid management, shift orchestration, and a centralized clinical knowledge hub. The platform eliminates manual calculation variables, ensuring patient safety through 5-step verification protocols and immutable audit trails.
- **Architectural Paradigm**: The system utilizes a **Unified Modern Stack** transitioning from a distributed module-based design (Node.js/Express + MongoDB) to a **Unified PostgreSQL + Laravel Core**. 
    - **Multi-Tenant Clinical Design**: Individual Ward Managers (Nursing In-Charge) oversee local unit data, staff verifications, and shift rotas. Superadmins (Consultant Pediatricians) manage global clinical protocols, master drug formularies, and across-unit visibility.
    - **Offline-First Resilience**: The architecture includes local state persistence ensuring clinical calculators and protocol viewing remain functional even during network instability.
- **Technology Stack**:
    - **Frontend**: React 18+, Vite, Tailwind CSS v4 (with sophisticated medical-grade aesthetics like glassmorphism), GSAP for workflow animations, Lucide-React icons.
    - **Backend (Node.js/Legacy)**: Express.js, JWT, Mongoose, Morgan, Helmet.
    - **Backend (Laravel/Unified)**: PHP 8.2+, Eloquent ORM, RESTful Controllers, PostgreSQL.
    - **Database**: PostgreSQL (Primary Relational Engine), MongoDB (Distributed Module Engine).

## 2. SYSTEM-WIDE CODES & PROTOCOLS
- **Global Override State**: Documented as part of the "NeoDesk Safety Protocol." While the literal string `v16.0-GLOBAL-OVERRIDE-ACTIVE` is an architectural reference, the system implements a **Global Clinical Override** via the `Settings` model. When active, this flag alters frontend rendering to enforce stricter validation layers (e.g., mandatory second-clinician verification for all morphine/dopamine calculations) across all tenants.
- **Data Contract Layer**:
    - **Communication**: All APIs return standardized JSON payloads with `success` (boolean), `data` (object/array), and `message` (string) fields.
    - **Caching**: Clinical data (e.g., patient vitals) uses `Cache-Control: no-cache` to ensure real-time accuracy. Educational content (Flashcards) utilizes ETags for efficient retrieval.
    - **Invalidation**: Updating a `Neonate` record triggers automatic invalidation of associated `Handover` and `Vital` caches on the frontend service layer.

---

## 3. BACKEND DATA LAYOUT & RELATIONS (UNIFIED)
For every clinical entity managed in the PostgreSQL core:

### Neonate (Neonates Table)
- **Table Purpose**: Central registry for all newborn patients admitted to the unit.
- **Key Attribute Dictionary**:
    - `hospital_number`: Unique alphanumeric identifier (Primary Key).
    - `name`: Full legal name.
    - `dob`: Date of Birth (ISO 8601).
    - `gender`: [Male, Female, Other].
    - `birth_weight` / `current_weight`: Precision weights (decimal:3 for kg).
    - `gestational_age`: Age at birth in weeks.
    - `apgar_1`, `apgar_5`, `apgar_10`: Clinical scores for newborn health.
    - `place_of_birth`, `delivery_method`: Clinical biodata.
    - `status`: [Stable, Critical, Serious, Discharged].
- **Relational Map**: HasOne `MaternalProfile`; HasMany `Vitals`, `Handover`, `ClinicalNote`, `Treatment`.

### User (Users Table)
- **Table Purpose**: Identity and Role-Based Access Control (RBAC) management.
- **Key Attribute Dictionary**:
    - `role`: [Nursing In-Charge, Staff Nurse, Consultant Pediatrician, Medical Officer, Student].
    - `status`: [Pending, Approved, Rejected, Restricted].
    - `isVerified`: Boolean (drives the "Blue Tick" UI badge).
    - `verifiedBy`: Foreign Key to User (In-Charge/IT).
- **Relational Map**: BelongsTo `VerificationQueue`.

---

## 4. EXHAUSTIVE PAGE-BY-PAGE AND COMPONENT MANUAL

### Unit Dashboard (`Dashboard.jsx`)
- **A. Functional Purpose**: Real-time ward oversight and management command center.
- **B. Interface & UI/UX Elements**: 4 dynamic StatCards (Total Staff, Live Cases, Doses Given, Safety Score); Amber Verification Alert banner; Live Shift Logs Table with role-based badges.
- **C. State & Context Lifecycles**: `useEffect` parallel fetch for logs, pending users, and neonates; `logsLoading` state.
- **D. API & Data Integration**: GET `/api/logs/recent`, GET `/api/auth/pending`, GET `/api/admin/stats`.

### Neonate Registry (`Neonates.jsx`)
- **A. Functional Purpose**: Patient admission, status tracking, and registry management.
- **B. Interface & UI/UX Elements**: Real-time Search bar; Admission Modal (11 fields); Patient Grid with status-colored badges and weight/age snippets.
- **C. State & Context Lifecycles**: `searchTerm` for local filtering; `isModalOpen` for admission workflow.
- **D. API & Data Integration**: GET `/api/neonates`, POST `/api/neonates`.

### Clinical Drug Pipeline (`Calculators.jsx`)
- **A. Functional Purpose**: Safety-critical 5-step medication calculation engine.
- **B. Interface & UI/UX Elements**: Horizontal StepIndicator; Patient selection grid; Large weight input; Drug selector buttons; Dose calculation form; Verification result card.
- **C. State & Context Lifecycles**: `currentStep` (1-5) navigation; real-time `result` calculation via `calcData` useEffect.
- **D. API & Data Integration**: GET `/api/neonates`, POST `/api/logs` (Audit trailing).

### Shift Handovers (`Handovers.jsx`)
- **A. Functional Purpose**: Managed transitions between clinical teams.
- **B. Interface & UI/UX Elements**: Shift Status Bar (Leads/Managers); Vertical timeline with color-coded shift badges; Vitals/Investigations modal form.
- **C. State & Context Lifecycles**: `isModalOpen` toggle; `fetchInitialData` sync for rotas and history.
- **D. API & Data Integration**: GET `/api/rota/current`, GET `/api/handovers/neonate/:id`, POST `/api/handovers`.

### Duty Rota (`DutyRota.jsx`)
- **A. Functional Purpose**: Workforce scheduling and unit coverage management.
- **B. Interface & UI/UX Elements**: Monthly calendar grid; Day-specific shift detail popups; Admin-only editing forms (Nurse/Consultant/Manager assignments).
- **C. State & Context Lifecycles**: `currentDate` state for month navigation; `isAdmin` permission gating.
- **D. API & Data Integration**: GET `/api/rota?month=...`, POST `/api/rota`, GET `/api/admin/users`.

### Clinical Flashcards (`Flashcards.jsx`)
- **A. Functional Purpose**: Bedside educational protocols and validation tracking.
- **B. Interface & UI/UX Elements**: Category-filtered card deck (Critical/Clinical); Expandable "Execution Logic" sections; "Mark as Validated" button with `ShieldCheck` status.
- **C. State & Context Lifecycles**: `isExpanded` card toggle; `isRead` persistence.
- **D. API & Data Integration**: GET `/api/flashcards`, POST `/api/learning/complete-flashcard`.

### Knowledge Hub (`KnowledgeHub.jsx`)
- **A. Functional Purpose**: Central library for standardized clinical procedures (CPAP, Oxygen Therapy).
- **B. Interface & UI/UX Elements**: Protocol search; Content viewer with checklist sidebars and indicator ranges.
- **C. State & Context Lifecycles**: `selectedProtocol` state for dynamic content rendering.
- **D. API & Data Integration**: Static clinical JSON with filtering.

### Clinical Scenarios (`Scenarios.jsx`)
- **A. Functional Purpose**: Simulation-based clinical competency training.
- **B. Interface & UI/UX Elements**: Scenario Cards (Problem/Solution/Maths); Completion status with "Mastered" badge.
- **C. State & Context Lifecycles**: `expanded` detail state; `isCompleted` tracking.
- **D. API & Data Integration**: POST `/api/learning/complete-scenario`.

### Staff Management (`ManageStaff.jsx`)
- **A. Functional Purpose**: Admin directory for team access and permissions.
- **B. Interface & UI/UX Elements**: Searchable staff list; Add Staff modal; User status toggles (Active/No Access); Delete user buttons.
- **C. State & Context Lifecycles**: `isModalOpen` for team expansion; `fetchStaff` sync.
- **D. API & Data Integration**: GET `/api/admin/users`, PATCH `/api/admin/users/:id/status`, DELETE `/api/admin/users/:id`.

### Verification Queue (`VerificationQueue.jsx`)
- **A. Functional Purpose**: Screening portal for new clinical staff registrations.
- **B. Interface & UI/UX Elements**: Request cards with profile images and hospital IDs; Approve/Reject action buttons with loading spinners.
- **C. State & Context Lifecycles**: `processingId` for transactional safety.
- **D. API & Data Integration**: GET `/api/auth/pending`, POST `/api/auth/verify/:id`.

### System Settings (`Settings.jsx`)
- **A. Functional Purpose**: Profile updates and global ward configuration.
- **B. Interface & UI/UX Elements**: Account settings form (Name, Email, Password); Global Ward settings (Ward Name, Hospital Name, Broadcast Message).
- **C. State & Context Lifecycles**: `isAdmin` gating for system-wide changes; `onUpdateUser` context sync.
- **D. API & Data Integration**: PUT `/api/auth/profile`, PATCH `/api/admin/settings`, GET `/api/admin/settings`.

### Audit Records (`AuditLogs.jsx`)
- **A. Functional Purpose**: Forensic security and action ledger.
- **B. Interface & UI/UX Elements**: Searchable audit table; Status badges (Checked/Review/Pending); Pagination footer.
- **C. State & Context Lifecycles**: Mount-fetch of shift history.
- **D. API & Data Integration**: GET `/api/logs/recent`.

### System Gateways (`Landing.jsx`, `Login.jsx`, `Register.jsx`)
- **A. Functional Purpose**: Public entry, authentication, and access requests.
- **B. Interface & UI/UX Elements**: Hero animations; Role-based login selector; Multi-field registration form with passport-photo upload.
- **C. State & Context Lifecycles**: `showPassword` toggles; `isSubmitted` success state for registration requests.
- **D. API & Data Integration**: POST `/api/auth/login`, POST `/api/auth/register` (FormData).

---

## 5. USER ROLES & ACCESS CONTROL MATRIX
- **Nursing In-Charge**: Admin privileges for staff management, unit settings, and audit verification.
- **Consultant Pediatrician**: Clinical oversight, protocol management, and unit-wide visibility.
- **Staff Nurse / MO**: Standard clinical operations (Vitals, Dosing, Handovers).
- **Student**: Read-only clinical data; practice-mode simulations and flashcards.

---
*DOCUMENTATION END - NeoDesk v16.0 Unified Core Deployment*

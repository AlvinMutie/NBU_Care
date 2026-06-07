Act as an expert frontend engineer specializing in dense, high-fidelity medical interfaces. I need you to completely build and implement a highly data-dense public Landing Page for the NBU Care (NeoDesk) platform. It must serve as a comprehensive operational command center and look ultra-professional.

### 🏛️ Target File & Routing:
- Create or fully overwrite `src/pages/LandingPage.jsx`.
- Ensure it imports and integrates perfectly into our existing `MainLayout` or responsive structure.
- It must natively support our "Professional Slate & Warm Emerald" full dark mode theme out of the box.

### 📐 UI Layout Architecture:
1. HERO OVERVIEW (Top Row):
   - A clean 4-column row of dense StatCards using Tailwind `grid-cols-1 md:grid-cols-2 lg:grid-cols-4`.
   - Card 1: Active Unit Occupancy (e.g., "42 / 50 Cots Occupied" with an active capacity bar tracker).
   - Card 2: Acuity Status Summary ("12 Critical | 18 High-Dep | 12 Stable").
   - Card 3: Active Unit Leadership (Displays "Consultant on Call" and "Nurse In-Charge").
   - Card 4: Global Safety Override Status Indicator (Flashing high-visibility green/emerald alert showing v16.2 safety protocol initialized).

2. CORE COMMAND SPLIT-GRID (Main Body):
   - Use a responsive layout: `grid grid-cols-1 lg:grid-cols-3 gap-6`.
   - LEFT COLUMNS (Span 2):
     * A highly dense, structured Data Table displaying Patient Demographics categorized by Birth Weight Bands (ELBW <1000g, VLBW 1000g-1500g, LBW 1500g-2500g) tracking survival indices and rolling 30-day nosocomial infection rates.
     * A grid breaking down Respiratory Support Census numbers (Mechanical Ventilation, Bubble CPAP, and Oxygen Therapy counts).
   - RIGHT COLUMN (Span 1):
     * A clean Biomedical Engineering Equipment Registry listing device availability (Radiant Warmers, Phototherapy Lamps, Pipeline Oxygen pressures at 4.2 Bar).
     * An Academic Hub Registry card highlighting active clinician/student simulation training module progress and duty rota snapshots.
     * A high-fidelity "Secure Gateway Login Portal" shortcut card to redirect authorized system users to the login route.

### 🎨 Visual Identity & Technical Constraints:
- Use strict mobile-first Tailwind utilities to ensure complex grids and text don't overflow or clip on mobile screens (`overflow-x-auto` for tables).
- Style using the professional slate palette (deep rich slate/zinc backgrounds, sharp border treatments) with warm emerald accents for status indicators.
- Use `lucide-react` icons (e.g., Activity, ShieldAlert, Thermometer, UserCheck) to anchor data labels visually.
- Provide mockup or static state data matrices directly inside the component so it renders data cleanly immediately upon loading. Do not include any visual infographic charts or progress graphics—keep it text, badge, and pure tabular data-centric as ordered.

Ensure the final code contains no syntax errors, missing brackets, or loose imports, making it entirely production-ready for an instant npm run build execution.
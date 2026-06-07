Act as an expert frontend engineer. I need you to create a clean, elegant, and professional public Landing Page for the NBU Care platform. This is the public-facing front door of the application, so it should feel welcoming, trustworthy, and minimal—not cluttered with raw hospital telemetry.

### 🏛️ Target File & Routing:
- Overwrite or create `src/pages/LandingPage.jsx`.
- It must integrate smoothly with our responsive layouts and natively support the "Professional Slate & Warm Emerald" dark mode theme.

### 📐 Component Structure:
1. HERO SECTION:
   - Centered or split-grid layout with a bold heading: "Advanced Neonatal Care & Clinical Excellence".
   - A welcoming sub-heading describing the platform as a high-fidelity management and training hub for Newborn Units.
   - A sharp, prominent Primary CTA button labeled "Access Staff Portal" that routes users to the secure login page.

2. INSTITUTIONAL IMPACT STATS (The Data Row):
   - A clean 4-column row (`grid-cols-2 lg:grid-cols-4`) showing static, high-level trust metrics:
     * "50+ Specialized Cots"
     * "24/7 Active Monitoring"
     * "100% Certified Clinicians"
     * "Integrated Training Hub"
   - Style these purely with text, clean labels, and subtle borders. No graphic charts or progress bars.

3. CORE PILLARS SECTION:
   - A 3-card grid highlighting the platform's focus:
     * Card 1: Intensive Care (Advanced respiratory and incubator management).
     * Card 2: Clinical Education (High-fidelity simulation and student tracking).
     * Card 3: Safety Protocols (Global validation architectures ensuring patient safety).

4. PUBLIC FOOTER:
   - Clean, dim text containing copyright, version notes, and quick layout links (About, User Guide).

### 🎨 Styling Constraints:
- Use deep slate/zinc backgrounds, crisp borders, and warm emerald accents for links, badges, and buttons.
- Use `lucide-react` icons (like Shield, GraduationCap, Activity, ArrowRight) to visually anchor headings.
- Ensure 100% mobile responsiveness with no layout clipping or overlapping text
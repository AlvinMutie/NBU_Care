ROLE & OBJECTIVE:
You are a Lead Frontend Engineer specializing in Mobile-First UI/UX and Responsive Design. Your task is to update the entire NeoDesk (NBU Care) React + Tailwind CSS client (`nbu-nurse-assistant/src/pages/` and global components) to be fully responsive, ensuring perfect usability and visual alignment on mobile devices (down to 320px width) while maintaining its medical-grade glassmorphism aesthetic.

TASK 1: GLOBAL BREAKPOINT REFACTOR
- Refactor all top-level page wrappers and layout containers from static or desktop-only widths to a mobile-first flow.
- Use Tailwind CSS responsive utilities (`sm:`, `md:`, `lg:`) to adjust padding, margins, and layout widths. Default styles must apply to mobile devices, scaling up gracefully to desktop views.

TASK 2: COMPONENT RESPONSIVENESS INLINE POLICIES
Update all core pages based on the system documentation guidelines:
1. Navigation & Sidebars: Implement a responsive mobile navigation drawer or bottom navigation bar for small screens. Ensure the desktop sidebar collapses into a hamburger menu or accessible slide-out panel on mobile devices.
2. Grid Layouts (Dashboard & Patient Registry): Convert rigid grid layouts (e.g., `grid-cols-4`) to stack vertically on mobile and expand dynamically (`grid-cols-1 md:grid-cols-2 lg:grid-cols-4`). Ensure the 4 StatCards on `Dashboard.jsx` stack cleanly.
3. Form Containers (Clinical Pipeline & Admission Modals): Ensure all inputs, select dropdowns, and multi-step indicators in `Calculators.jsx` and modally launched forms scale to 100% width on small screens, ensuring buttons are easily tapable (minimum tap target area of 44x44px).
4. Data Tables (Audit Records & Shift Logs): Refactor all wide data tables to prevent page overflow. Wrap tables in responsive overflow containers (`overflow-x-auto`) or convert table rows into individual summary cards on mobile layouts.

OUTPUT REQUIREMENT:
1. Provide the targeted code modifications or layout refactors for the main container shell (`App.jsx` or layout components) and critical pages like `Dashboard.jsx` and `Calculators.jsx`.
2. Do not use generic placeholders or skip fields; ensure all updated CSS classes adhere directly to Tailwind CSS practices.


ROLE & OBJECTIVE:
You are a Principal UI/UX Architect and Visual Designer. Your task is to audit and update all infographics, data visualizations, and static visual media across the NeoDesk frontend application to ensure they are high-fidelity, completely responsive, and visually aligned with our medical operating system aesthetic.

TASK 1: DATA VISUALIZATION & HARDWARE INDICATORS (`Dashboard.jsx`, `Calculators.jsx`)
- Review all dynamic infographics (e.g., progress trackers, fluid balance meters, vital sign trend lines, or step indicators).
- Refactor chart containers to use fluid wrapper components that dynamically scale to fit mobile screen widths (e.g., incorporating `<ResponsiveContainer>` if utilizing charting libraries like Recharts).
- Modernize the styling: Replace generic colors with strict, high-contrast clinical color tokens (e.g., Neonatal Alert Amber, Critical Red, Stable Emerald Green) matching a sleek glassmorphic theme. Ensure text elements within charts remain legible on small screens.

TASK 2: STATIC ASSETS & INFOGRAPHIC VECTOR FILES
- Audit the asset directories (e.g., `src/assets/` or `public/`) for existing static infographic illustrations, setup guides, or protocol diagrams.
- Replace or re-stylize these visual assets with crisp, clean vector graphics (SVGs preferred) that scale smoothly without pixelation.
- Ensure any inline SVGs use dynamic Tailwind sizing classes (e.g., `w-full h-auto max-w-md`) instead of rigid, hardcoded pixel dimensions (`width="800"`).

TASK 3: ACCESSIBILITY & FALLBACK LAYOUTS
- Ensure every revised infographic, chart, or diagram contains descriptive accessibility attributes (`aria-label` or detailed screen-reader text fallbacks).
- If a visual infographic is too complex to parse on a narrow phone screen, implement a mobile fallback view that cleanly translates the core visual data into a scannable, vertical summary card or breakdown list.

OUTPUT REQUIREMENT:
1. Provide the code updates for components rendering data visualizations (like your treatment pipeline or dashboard summary charts).
2. Specify the asset file map changes or inline SVG structural rewrites needed to complete the update without losing functional context.
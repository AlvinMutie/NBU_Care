# NBU Care Assistant

## Overview
The NBU Care Assistant is a specialized, high-fidelity clinical toolkit engineered for Neonatal Building Units (NBU). It provides precise computational frameworks for dosing, fluid logic, and critical emergency interventions, ensuring optimal patient safety through structured protocols.

## Architecture
The application is built upon a modern, responsive architecture tailored for clinical environments:
- Frontend: React and Vite, presenting a role-based glassmorphism aesthetic.
- State Management: Context API for theme and session integrity.
- Component Design: Tailored for high-contrast, professional interactions using Tailwind CSS and GSAP.

## Key Features
- Roles and Governance: Strict role-gated access mapping (Admin, Clinician, Student, IT).
- Diagnostic Calculators: Dose Metrics, IV Hydration Rates, Dilution Logic, and Emergency Bolus calculations.
- Audit Ledger: Comprehensive, immutable logs referencing exact metric derivations.
- Knowledge Base: Validated clinical pathway flashcards and diagnostic scenarios.

## Development Setup

1. Install Dependencies
   Ensure Node.js is installed. Run `npm install` to gather necessary packages.

2. Start Development Server
   Run `npm run dev` to launch the application locally.

3. Testing and Deployment
   Strict testing must be observed for any calculation logic modifications before entering a production setting. Build using `npm run build`.

## Clinical Safety Notice
The calculations and methodologies presented in this software are bedside aids. Standard ward procedures, clinical judgment, and the official WHO Pharmacopoeia always take precedence over software-generated outcomes.

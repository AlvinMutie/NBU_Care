# NeoDesk Institutional System Admin - Structured Plan

This document outlines the architectural roadmap and feature requirements for the System Admin portal of NeoDesk Institutional (v16.0).

## 1. Dashboard & Core Orchestration
**Goal:** Provide a high-fidelity, real-time overview of the ward and system health.
- [x] **Live Personnel Counter:** Ensure `User::count()` reflects all verified and approved staff in real-time.
- [x] **Institutional Health Metrics:** Calculation accuracy, training compliance, and protocol adherence tracking.
- [x] **Active Ward Alerts:** High-alert medication flags and critical admission trends.
- [ ] **Real-time Event Stream:** Web-socket integration for live audit logs (Currently polling).

## 2. Workforce Management (Duty Rota)
**Goal:** Dynamic allocation of personnel across shifts and wards.
- [x] **Shift Assignment Engine:** API-driven allocation of personnel to Morning/Afternoon/Night shifts.
- [x] **Personnel Directory Integration:** Pulling active clinicians from the verified database.
- [ ] **Conflict Detection:** Prevent double-booking or over-shifting of personnel.
- [ ] **Shift Swap Protocol:** Allow admins to approve staff-initiated shift swaps.

## 3. Personnel Vetting & Lifecycle
**Goal:** Secure authentication and credential validation for all clinical staff.
- [x] **Institutional Vetting Queue:** Real-time list of pending registrations.
- [x] **Credential Audit:** SHA-256 validation of uploaded credentials and IDs.
- [x] **Role-Based Access Control (RBAC):** Automated permission granting upon approval.
- [ ] **Automatic Suspension:** Suspension of access for expired credentials or compliance failures.

## 4. Clinical Academy (Knowledge Core)
**Goal:** Continuous medical education and simulation-based validation.
- [x] **Simulation Engine:** Mapping bedside simulations and clinical quizzes from the database.
- [ ] **Credential Scoring:** Automatically update staff "Safety Score" based on Academy completion.
- [ ] **Protocol Library Versioning:** Dynamic versioning and deployment of clinical manuals (v16.42).

## 5. UI/UX & System Integrity
**Goal:** Professional, distraction-free interface for critical clinical environments.
- [x] **Scrollbar Conflict Resolution:** Removal of nested scrollbars in favor of a clean browser-level scroll with custom styling.
- [x] **Header Transparency & Blur:** Implementation of `backdrop-blur-xl` to prevent content disappearance behind solid blocks.
- [x] **Forensic Auditing:** Every admin action (approval, shift change, setting update) must be logged with a unique hash.

## 6. System Configurations
- [x] **Profile Synchronization:** One-click sync of institutional profiles to the cloud core.
- [ ] **Global Overrides:** Allow admins to toggle "Emergency Mode" (Global Override) to bypass standard protocols in crisis.
- [ ] **Dark/Light Orchestration:** Automatic theme switching based on shift time (Day/Night).

---
*Status: Active Development*  
*Target Release: v16.1.0*

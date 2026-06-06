ROLE & OBJECTIVE:
You are a Principal Full-Stack Engineer and Clinical Workstation Designer. Your task is to expand the NeoDesk (NBU Care) platform by engineering a high-visibility Emergency Dashboard component and structuring the data contracts for a comprehensive, 12-section Neonatal Profile.

TASK 1: UPGRADE THE DASHBOARD (`Dashboard.jsx`)
Modify the main dashboard into a high-visibility "Emergency Dashboard." It must dynamically aggregate and surface critical ward data immediately upon mounting. Implement or stub the following frontend sections:
1. Staff On Duty Panel: Fetch and display the active shift schedule from the Duty Rota system, showing the assigned Consultant, Nurse In-Charge, and Nurses on duty along with their contact profiles.
2. High-Acuity Patient Triage: Create dedicated, color-coded filter lists that instantly pull and display neonates matching these specific operational conditions:
   - Critical Babies (Status flag == 'Critical')
   - Oxygen Patients (Active treatment == 'Oxygen Therapy')
   - CPAP Patients (Active treatment == 'CPAP Therapy')
3. Actionable Investigation Queue: Create an alert panel displaying "Unreviewed Investigations." This panel must list incoming lab results (e.g., Bilirubin, Blood Cultures) or imaging diagnostics that have been logged into the system but do not yet possess a Consultant review timestamp or approval signature.

TASK 2: SCHEMA DESIGN FOR THE COMPLETE NEONATAL PROFILE
Design the complete relational data layout and component property models required to support the exhaustive 12-section Neonatal Profile. You must define the JSON data contracts, validation rules, and schema migrations (targeting our Laravel/PostgreSQL unified architecture) for the following sections:
1. Neonate BioData & Location (including exact Room/Cubicle/Bed allocations and active status tracking).
2. Maternal History (Obstetric records, chronic illnesses, and Antenatal steroid mapping).
3. Presenting Problem & Assessment (Checkbox matrices for symptoms like RDS, Jaundice, Asphyxia, and clinical scoring like 1/5/10-minute APGAR checks).
4. Clinical Assessment Grids (Structured tracking fields for neurological tone, respiratory grunting/retractions, and cardiovascular perfusion).
5. Investigations Log (Lab values for FBC, CRP, Bilirubin, LFTs, KFTs, alongside Imaging states for Chest X-Rays and Cranial Ultrasounds).
6. High-Frequency Monitoring & Balance (Vital signs, weight trends, and strict Intake/Output charting for feeds vs. urine/stool).
7. Treatment & Protocols (Medication calculator outputs, maintenance fluid rates, oxygen/CPAP settings, and protocol tags like KMC or Sepsis Protocol).
8. Clinical Progression (Timestamped tracking for Nurse Notes, MO Notes, Consultant Reviews, and Ward In-Charge instructions).
9. Discharge Planning (Outcome classification, discharge weights, feeding status, and parental instruction validation).

OUTPUT REQUIREMENT:
1. Provide the updated React code structure or component modifications for `Dashboard.jsx`.
2. Provide the complete backend database migration fields or JSON schemas for the new profile attributes. Ensure all fields use robust typing and fallback nullability states matching a production clinical environment.
-- Seed data: minimal starter set (can be edited by ADMIN in-app)
-- IMPORTANT: adjust to local policy and formulary.

SET NAMES utf8mb4;
SET time_zone = '+00:00';

-- Users are bootstrapped by the backend on first start:
-- - it creates/repairs a default `admin` account
-- - password is taken from `ADMIN_BOOTSTRAP_PASSWORD` in `backend/.env`
-- This avoids hard-coding any password hashes into SQL files.

-- Flashcards (routine/clinical/critical)
INSERT INTO flashcards (title, category, icon, when_to_perform, steps_json, critical_warnings, tips)
VALUES
(
  'Admission: Initial Assessment (NBU)',
  'ROUTINE',
  'clipboard-heart',
  'On admission of any neonate to NBU (from labour ward, theatre, ER, referral).',
  JSON_ARRAY(
    'Confirm identity: baby name/ID, DOB/time, mother details.',
    'Record weight (kg), temperature, RR, HR, SpO2, capillary refill, glucose.',
    'Assess airway/breathing: work of breathing, grunting, nasal flaring.',
    'Assess circulation: color, pulses, perfusion; check for shock signs.',
    'Document and escalate abnormalities immediately per unit protocol.'
  ),
  'If apnoea, severe respiratory distress, cyanosis, shock, seizures, or glucose critically low: call senior/doctor immediately and start emergency support.',
  'Warm chain: keep baby warm during transfers. Recheck glucose if symptomatic or risk factors.'
),
(
  'IV Fluids: Maintenance (baseline calculation)',
  'CLINICAL',
  'droplet',
  'When starting or adjusting maintenance IV fluids.',
  JSON_ARRAY(
    'Confirm current weight (kg) and day of life.',
    'Calculate daily fluid requirement (ml/kg/day) per unit chart.',
    'Convert to ml/hr: (ml/kg/day × weight) ÷ 24.',
    'Set pump rate and label fluids clearly.',
    'Reassess urine output, electrolytes, glucose, and weight daily.'
  ),
  'Fluid management must follow local policy; incorrect rates can cause hypo/hypernatremia, PDA worsening, or fluid overload.',
  'Use infusion pump for accuracy. Double-check calculations with a colleague.'
),
(
  'Emergency: Neonatal Hypoglycaemia (first actions)',
  'CRITICAL',
  'alert-triangle',
  'If blood glucose is low or baby is symptomatic (jittery, lethargic, seizures).',
  JSON_ARRAY(
    'Confirm glucose reading; treat immediately if symptomatic—do not delay for repeat.',
    'Maintain airway/breathing; keep baby warm.',
    'Prepare IV access and follow unit hypoglycaemia protocol.',
    'Monitor glucose after treatment at protocol intervals.',
    'Document time, dose, and response; escalate to clinician.'
  ),
  'Seizures or severe symptoms are emergencies. Follow local protocol for dextrose concentration and administration. Avoid extravasation injury.',
  'Ensure accurate weight for dosing. Check for infection or metabolic causes if recurrent.'
);

-- Scenario example
INSERT INTO scenarios (title, category, problem_text, solution_steps_json, formulas_text, critical_warnings)
VALUES
(
  'Scenario: IV Fluid Rate Conversion',
  'CALCULATIONS',
  'A 1.8 kg neonate is prescribed 120 ml/kg/day. What is the pump rate in ml/hr?',
  JSON_ARRAY(
    'Daily volume = 120 ml/kg/day × 1.8 kg = 216 ml/day.',
    'Hourly rate = 216 ÷ 24 = 9 ml/hr.',
    'Set pump to 9 ml/hr and monitor I/O and weight.'
  ),
  'ml/hr = (ml/kg/day × weight_kg) / 24',
  'Always double-check the prescription and infusion concentration. Monitor for fluid overload.'
);


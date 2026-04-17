const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Flashcard = require('./models/Flashcard');
const Scenario = require('./models/Scenario');
const User = require('./models/User');
require('dotenv').config();

// ─── USERS ───────────────────────────────────────────────────────────────────
const users = [
  {
    name: 'Victoria Muthoni',
    email: 'incharge@nbu.hospital.ke',
    password: 'Admin@1234',
    role: 'Nursing In-Charge'
  },
  {
    name: 'Grace Akinyi',
    email: 'nurse@nbu.hospital.ke',
    password: 'Nurse@1234',
    role: 'Nurse'
  },
  {
    name: 'Dr. James Otieno',
    email: 'consultant@nbu.hospital.ke',
    password: 'Doctor@1234',
    role: 'Consultant Pediatrician'
  },
  {
    name: 'Dr. Fatuma Wanjiku',
    email: 'mo@nbu.hospital.ke',
    password: 'Mo@12345',
    role: 'CO Pediatrics / MO'
  },
  {
    name: 'Kevin Ochieng',
    email: 'student@nbu.hospital.ke',
    password: 'Student@1234',
    role: 'Student'
  }
];

// ─── FLASHCARDS ───────────────────────────────────────────────────────────────
const flashcards = [
  // ROUTINE
  {
    title: 'Neonatal Admission',
    category: 'Routine',
    whenToPerform: 'Immediately upon baby arrival in the Neonatal Unit.',
    steps: [
      'Place on pre-heated radiant warmer immediately.',
      'Clear airway if necessary and assess breathing effort.',
      'Obtain birth weight (in grams) and verify ID bands match maternal records.',
      'Record vital signs: Heart Rate, Respiratory Rate, Temp, SpO2.',
      'Establish IV access if indicated.',
      'Initiate cord care as per unit protocol.',
      'Document time of admission and attending nurse/doctor.'
    ],
    warning: 'Hypothermia is a leading cause of neonatal mortality. Ensure the radiant warmer is functional and pre-heated before delivery.',
    tips: 'Always wear sterile gloves when handling the umbilical cord. Communicate immediately if birth weight is under 1000g.'
  },
  {
    title: 'Kangaroo Mother Care (KMC)',
    category: 'Routine',
    whenToPerform: 'For stable preterm or low-birth-weight babies (≥1000g, no major complications, no IV lines or oxygen therapy needed).',
    steps: [
      'Explain the procedure to the mother and obtain verbal consent.',
      'Ensure the room is warm (≥25°C) and draft-free.',
      'Mother should wear a front-opening top or KMC wrap.',
      'Place the baby upright, skin-to-skin on the mother\'s chest between her breasts.',
      'Baby\'s head should be turned to one side in the "sniffing" position.',
      'Secure with KMC wrap. Baby\'s legs should be flexed (frog position).',
      'Monitor temperature every 30 minutes for the first 2 hours.',
      'Encourage exclusive breastfeeding during KMC sessions.'
    ],
    warning: 'Stop KMC immediately if the baby shows signs of respiratory distress, hypothermia (Temp <36.5°C), or bradycardia.',
    tips: 'Start with short sessions (30–60 min) and gradually increase to 24 hours/day for best outcomes in preterm infants.'
  },
  {
    title: 'Nasogastric (NG) Tube Insertion',
    category: 'Routine',
    whenToPerform: 'For preterm neonates <34 weeks unable to coordinate suck-swallow-breathe cycle, or any neonate requiring gavage feeding.',
    steps: [
      'Gather equipment: appropriate NG tube (5–8 Fr), syringe, tape, stethoscope.',
      'Wash hands and wear gloves.',
      'Measure from nose tip → earlobe → mid-sternum to determine insertion length.',
      'Mark the tube at the measured length.',
      'Gently insert the tube through one nostril, directing it posteriorly and downward.',
      'Confirm placement: aspirate gastric content (should be green/yellow) or auscultate with air bolus (5–10ml).',
      'Secure with hypoallergenic tape on the cheek.',
      'Document tube size, insertion length, and confirmation method.'
    ],
    warning: 'NEVER feed if tube placement cannot be confirmed. If baby coughs or turns blue during insertion, STOP and remove the tube immediately.',
    tips: 'Use the right nostril first (physiologically preferred). pH testing of aspirate (pH < 5.5) is the gold standard for confirmation.'
  },
  {
    title: 'Vital Signs Monitoring',
    category: 'Routine',
    whenToPerform: 'Every 4 hours for stable babies; every 1–2 hours for unstable or post-procedure neonates.',
    steps: [
      'Wash hands thoroughly before contact.',
      'Record Temperature (axillary, normal: 36.5–37.5°C).',
      'Count Respiratory Rate for a full 60 seconds (normal: 40–60 breaths/min).',
      'Measure Heart Rate via pulse oximeter or cardiac monitor (normal: 120–160 bpm).',
      'Assess SpO2 (target: 91–95% for preterm; 95–100% for term).',
      'Check blood pressure if indicated.',
      'Document all findings and flag any deviations immediately to the nurse in charge.'
    ],
    warning: 'SpO2 target in preterm babies <32 weeks is 91–95%. Hyperoxia (SpO2 >95%) increases the risk of Retinopathy of Prematurity (ROP).',
    tips: 'For temperature, always use the axillary method. Rectal temperatures are not recommended in neonates due to mucosal injury risk.'
  },

  // CLINICAL
  {
    title: 'Phototherapy Setup',
    category: 'Clinical',
    whenToPerform: 'When Total Serum Bilirubin (TSB) exceeds unit phototherapy threshold charts based on age in hours and birth weight.',
    steps: [
      'Confirm indication by checking TSB against the unit\'s Bhutani nomogram.',
      'Ensure phototherapy unit lights are functional and wavelength is 430–490nm (blue-green spectrum).',
      'Place baby supine in a bassinet or incubator directly under the light.',
      'Secure opaque eye patches firmly — must cover both eyes, not press on the nose.',
      'Expose maximum skin surface (diaper only — remove all clothing).',
      'Maintain distance of 25–50cm from skin (as per unit\'s device specification).',
      'Monitor temperature every 2 hours (phototherapy causes insensible water loss and overheating).',
      'Increase daily fluid intake by 10–20% to compensate for water loss.',
      'Turn baby every 2–4 hours to expose all skin surfaces.',
      'Repeat TSB every 12–24 hours to monitor response.'
    ],
    warning: 'Risk of dehydration, hyperthermia, loose green stools, and bronze baby syndrome (if conjugated bilirubin is elevated). Remove eye patches during feeding and skin-to-skin time.',
    tips: 'Fibre-optic phototherapy blankets allow KMC during treatment. Avoid direct sunlight as a phototherapy substitute — UV exposure is harmful and uncontrolled.'
  },
  {
    title: 'IV Cannula Insertion (Neonatal)',
    category: 'Clinical',
    whenToPerform: 'When IV fluids, medications, or parenteral nutrition is required.',
    steps: [
      'Gather: 24G or 26G cannula, transparent dressing, flush syringe (0.9% NaCl), tourniquet (optional), splint for stabilisation.',
      'Wash hands and wear gloves. Use aseptic non-touch technique (ANTT).',
      'Identify vein: dorsum of hand, foot dorsum, or scalp veins (last resort).',
      'Apply light pressure proximal to the site (tourniquet in older neonates).',
      'Clean skin with 70% chlorhexidine or isopropyl alcohol; allow 30 seconds to dry.',
      'Insert cannula at 10–15° angle, bevel up. Watch for flashback.',
      'Advance the cannula; withdraw the stylet while advancing the plastic sheath.',
      'Flush with 0.5–1ml normal saline to confirm patency.',
      'Secure with transparent dressing and splint the limb to prevent dislodgement.',
      'Document: date, site, gauge, person who inserted it, and flush confirmation.'
    ],
    warning: 'Scalp vein IVs should NEVER be used for vesicant medications (e.g., dopamine, calcium, bicarbonate) due to risk of severe necrosis.',
    tips: 'Warm the site with a warm cloth for 1–2 mins to dilate veins. Light transillumination in darkened room helps identify scalp veins.'
  },
  {
    title: 'Incubator Care & Thermoregulation',
    category: 'Clinical',
    whenToPerform: 'For all preterm neonates <34 weeks or low birth weight babies <1800g unable to maintain temperature in an open cot.',
    steps: [
      'Clean and disinfect the incubator before use as per infection control policy.',
      'Set incubator temperature based on birth weight and postnatal age (servo-control or air-control mode).',
      'Attach skin temperature probe (servo-control mode) to the baby\'s abdomen — avoid bony prominences.',
      'Target skin temperature: 36.5–37.0°C (servo mode).',
      'Check incubator temperature display and alarm settings every 4 hours.',
      'Minimize door openings — use porthole access whenever possible.',
      'Maintain humidity at 60–80% for ELBW infants <28 weeks in the first 2 weeks.',
      'Change incubator water in the humidity chamber every 24 hours (infection control).',
      'Wean to an open cot when baby is stable and ≥1800g with consistent temperature.'
    ],
    warning: 'Hyperthermia (Temp >38°C) increases metabolic demand, apnoea risk, and dehydration. Hypothermia (<36.5°C) causes acidosis, hypoglycaemia, and coagulopathy.',
    tips: 'Double-walled incubators reduce radiant heat loss significantly in VLBW infants. Consider a plastic wrap (cling film) immediately after birth for ELBW < 28 weeks.'
  },
  {
    title: 'Blood Glucose Monitoring',
    category: 'Clinical',
    whenToPerform: 'At 30 min, 1h, 2h, 3h and 6h after birth for at-risk neonates (preterm, LGA, SGA, IDM, symptomatic infants).',
    steps: [
      'Wash hands and wear gloves.',
      'Warm the heel for 3–5 minutes with a warm cloth to increase blood flow.',
      'Clean heel with 70% alcohol; allow 30 seconds to dry.',
      'Use an automated lancet device on the lateral aspect of the heel (avoid the central heel).',
      'Wipe away the first drop of blood.',
      'Apply the second drop to the glucometer strip.',
      'Read result within 1 minute.',
      'Apply gentle pressure with gauze to stop bleeding.',
      'Document result and time. Correlate with clinical signs.'
    ],
    warning: 'Normal blood glucose in term neonates: ≥2.6 mmol/L (after 1 hour of age). For symptomatic hypoglycaemia (jitteriness, seizures, apnoea), treat IV dextrose IMMEDIATELY; do NOT wait for feed.',
    tips: 'Central heel puncture risks calcaneal (bone) damage and osteomyelitis. Always use the lateral or medial aspect of the heel.'
  },

  // CRITICAL
  {
    title: 'Neonatal Resuscitation (NRP)',
    category: 'Critical',
    whenToPerform: 'At birth when the baby is not breathing, not crying, has poor muscle tone, or heart rate <100 bpm.',
    steps: [
      'CALL FOR HELP immediately.',
      'Place baby on warm, dry surface under radiant warmer.',
      'Dry, stimulate and position (sniffing position).',
      'Assess: breathing effort, heart rate, colour/tone in first 30 seconds.',
      'If HR <100 or apnoea: Begin Positive Pressure Ventilation (PPV) with room air (21%) at 40–60 breaths/min.',
      'If HR <60 bpm after 30 seconds of PPV: Start chest compressions at 3:1 ratio (compressions:ventilation).',
      'Consider adrenaline (0.01–0.03 mg/kg IV/IO) if HR <60 despite CPR.',
      'Reassess every 30 seconds.',
      'Document every intervention and time with clock visible.'
    ],
    warning: '100% oxygen should be avoided in term infants during initial resuscitation (causes oxidative injury). Start with 21% and titrate SpO2 to target. In preterm <32 weeks, start at 21–30%.',
    tips: 'The most important step in neonatal resuscitation is effective ventilation. Chest compressions are rarely needed if ventilation is done correctly early on.'
  },
  {
    title: 'Neonatal Seizure Management',
    category: 'Critical',
    whenToPerform: 'When baby displays abnormal repetitive movements: eye deviation, limb jerking, cycling, mouthing, apnoea, or stiffening.',
    steps: [
      'Ensure airway is clear and position baby safely.',
      'Place on cardiorespiratory monitor; apply pulse oximeter.',
      'Obtain IV access immediately.',
      'Check blood glucose STAT — treat hypoglycaemia with 10% Dextrose 2ml/kg IV if BGL <2.6 mmol/L.',
      'First-line anticonvulsant: Phenobarbitone 20mg/kg IV slow push over 15–20 minutes.',
      'If seizures persist after 20 minutes: Repeat Phenobarbitone 10mg/kg IV (max total 40mg/kg).',
      'Second-line: Phenytoin 15–20mg/kg IV (infuse at max 1mg/kg/min, cardiac monitoring required).',
      'Maintain SpO2 ≥95% with oxygen support as needed.',
      'Notify Consultant Pediatrician immediately.',
      'Draw blood for full metabolic workup: electrolytes, Ca2+, Mg2+, ABG, LFTs, septic screen.'
    ],
    warning: 'Phenytoin MUST be given in 0.9% NaCl — precipitates in dextrose solutions. Infuse slowly with continuous cardiac monitoring for arrhythmias.',
    tips: 'Document exact time of seizure onset, duration, and characteristics in the notes. EEG (if available) is the gold standard for diagnosis.'
  },
  {
    title: 'Management of Respiratory Distress (RDS)',
    category: 'Critical',
    whenToPerform: 'Preterm neonate presenting with: grunting, nasal flaring, subcostal/intercostal retractions, tachypnoea (RR>60), or cyanosis within 4–6 hours of birth.',
    steps: [
      'Place under radiant warmer, maintain neutral thermal environment.',
      'Apply continuous SpO2 monitoring; target 91–95% in preterm.',
      'Initiate CPAP (Continuous Positive Airway Pressure): start at 5–6 cmH2O.',
      'Obtain CXR (ground-glass appearance, air bronchograms confirm RDS).',
      'Insert IV/UAC if not done. Send ABG, FBC, CRP, blood culture.',
      'Administer Surfactant (Poractant alfa/Beractant) per unit protocol via ET tube — INSURE technique if on CPAP.',
      'Commence IV fluids: start at 60–80ml/kg/day D10W for preterm.',
      'If CPAP fails (FiO2 >0.4): proceed to Intubation and mechanical ventilation.',
      'Administer IV antibiotics (Ampicillin + Gentamicin) pending culture results.',
      'Reassess clinical response and repeat CXR at 6–12 hours.'
    ],
    warning: 'Avoid hyperoxia (SpO2 >95% in preterm). High FiO2 causes bronchopulmonary dysplasia (BPD) and retinopathy of prematurity (ROP).',
    tips: 'Antenatal steroids (betamethasone) to mothers <34 weeks reduce RDS severity by 50%. Confirm documentation in the maternal notes.'
  },

  // CALCULATIONS
  {
    title: 'Drug Dose Calculation (mg/kg)',
    category: 'Calculations',
    whenToPerform: 'Before administering ANY weight-based medication to a neonate.',
    steps: [
      'Confirm baby\'s CURRENT weight in kilograms (use today\'s weight).',
      'Identify dose from drug chart: Dose = X mg/kg/dose.',
      'Calculate: Required Dose (mg) = Weight (kg) × Prescribed Dose (mg/kg).',
      'Identify concentration of available solution: Y mg/mL.',
      'Calculate Volume to draw: Volume (mL) = Required Dose (mg) ÷ Concentration (mg/mL).',
      'Double-check with a second nurse before administration.',
      'Document: drug name, dose calculated, volume given, time, route, and witness.'
    ],
    warning: 'ALWAYS use the baby\'s CURRENT weight — weight changes daily in neonates. Using birth weight for a term baby on day 7 could lead to a 10–15% dosing error.',
    tips: 'Use an electronic calculator or the NeoDesk Calculator module. The "10-fold error" (miscalculating decimal points) is the most common fatal medication error in neonates.'
  },
  {
    title: 'IV Fluid Rate Calculation (ml/kg/day)',
    category: 'Calculations',
    whenToPerform: 'When commencing or adjusting IV fluids for a neonate.',
    steps: [
      'Confirm prescribed fluid requirement: e.g., 80 ml/kg/day.',
      'Note baby\'s weight in kg.',
      'Calculate total daily volume: Daily Volume (mL) = 80 mL/kg × Weight (kg).',
      'Calculate infusion rate: Rate (mL/hr) = Daily Volume (mL) ÷ 24.',
      'Set infusion pump to the calculated rate.',
      'Reassess fluid requirement every 12–24 hours (adjusts as baby grows or clinical status changes).',
      'Document rate, fluid type (D10W, N/2 saline, etc.), start time, and prescriber.'
    ],
    warning: 'Fluid overload in VLBW infants causes PDA (Patent Ductus Arteriosus), pulmonary oedema, and IVH. Stay within prescribed limits strictly.',
    tips: 'Standard starting volumes: preterm <1500g = 60–80ml/kg/day; term = 60ml/kg/day. Increase by 10–20ml/kg/day daily based on urine output and electrolytes.'
  },
  {
    title: 'Maintenance Fluid Calculation (Holliday-Segar)',
    category: 'Calculations',
    whenToPerform: 'For infants transitioning from TPN to enteral feeds or requiring calculated maintenance IV fluids.',
    steps: [
      'Use Holliday-Segar formula: For weight ≤10kg: 100ml/kg/day.',
      'Calculate total volume: Volume = Weight (kg) × 100 mL.',
      'Divide by 24 to get hourly rate.',
      'Standard fluid for term neonates: 10% Dextrose (D10W) initially.',
      'Add electrolytes after 24–48 hours once renal function established: NaCl 2–3 mmol/kg/day; KCl 1–2 mmol/kg/day.',
      'Monitor electrolytes every 12–24 hours.',
      'Adjust based on urine output (target: 1–3 mL/kg/hr) and serum sodium trend.'
    ],
    warning: 'Do not add potassium to IV fluids until confirmed urine output is established. Hyperkalaemia in oliguric neonates causes potentially fatal arrhythmias.',
    tips: 'In the first 24 hours of life, healthy term neonates may not need IV fluids if breastfeeding well. Avoid unnecessary IVs to reduce infection risk.'
  }
];

// ─── SCENARIOS ────────────────────────────────────────────────────────────────
const scenarios = [
  {
    title: 'Preterm Infant — Low Blood Sugar',
    problemStatement: `Baby Joy, a 30-week preterm infant (birth weight 1.2kg), is 3 hours old. On routine blood glucose monitoring, her BGL reads 1.8 mmol/L. She appears jittery with occasional mouthing movements. What do you do?`,
    solutionSteps: [
      'Confirm reading with a second glucometer strip or send a lab glucose (capillary blood glucose can have a ±0.5 margin).',
      'Call the medical officer/consultant immediately — this is symptomatic hypoglycaemia.',
      'Secure IV access (if not already in place).',
      'Give 10% Dextrose (D10W) bolus: 2 mL/kg IV over 5 minutes = 2 × 1.2 = 2.4 mL.',
      'Start D10W infusion at 80 mL/kg/day (maintenance glucose infusion rate ≈5.5 mg/kg/min).',
      'Recheck blood glucose at 30 minutes after treatment.',
      'If BGL normalises (≥2.6 mmol/L) and clinical signs resolve, continue monitoring 1-hourly for 4 hours.',
      'If BGL remains low, escalate glucose infusion to 10 mg/kg/min and reassess.'
    ],
    formulasUsed: 'D10W Bolus Volume = 2 mL/kg × Weight (kg)\nGlucose Infusion Rate (mg/kg/min) = [Volume (mL/hr) × Concentration (g/dL) × 1000] ÷ [Weight (kg) × 60]',
    warning: 'Symptomatic hypoglycaemia (jitteriness, seizures, apnoea) requires IMMEDIATE IV treatment. Do NOT delay to wait for oral feeding to work. Prolonged neonatal hypoglycaemia causes permanent brain injury.'
  },
  {
    title: 'Term Neonate — Respiratory Distress at Birth',
    problemStatement: `Baby Michael is born at 38 weeks gestation via emergency C-section for foetal distress. At 5 minutes of age, his APGAR score is 5. He has grunting respirations, subcostal retractions, and SpO2 of 78% on room air. What are your immediate actions?`,
    solutionSteps: [
      'CALL FOR HELP (Paediatric team to attend immediately).',
      'Ensure the baby is warm under the radiant warmer.',
      'Reposition to the sniffing position and suction oropharynx if excessive secretions.',
      'Apply pulse oximeter to the right hand (pre-ductal) and initiate continuous monitoring.',
      'Begin PPV with 21% oxygen at 40–60 breaths/min if apnoea or HR <100.',
      'If breathing is present but SpO2 remains <91%, apply CPAP at 5–6 cmH2O.',
      'Titrate FiO2 to achieve SpO2 91–95%. Avoid >95% (hyperoxia risk).',
      'Obtain IV access (umbilical venous catheter/peripheral IV).',
      'Send ABG, FBC, CRP, Blood Culture, blood glucose.',
      'CXR to assess lung fields (rule out pneumothorax, RDS, TTN).',
      'Commence IV antibiotics pending culture results.',
      'Document all interventions with timestamps.'
    ],
    formulasUsed: 'APGAR Score: Activity + Pulse + Grimace + Appearance + Respiration (0–2 each, max 10)\nTarget SpO2 at 1min: 60–65%, 5min: 80–85%, 10min: 85–95%',
    warning: 'A pneumothorax can present exactly like RDS. If baby deteriorates suddenly — muffled breath sounds on one side, shift of trachea, hypotension — suspect tension pneumothorax and prepare for emergency needle decompression (2nd intercostal space, midclavicular line).'
  },
  {
    title: 'Jaundiced Neonate — Phototherapy Decision',
    problemStatement: `Baby Amina is 30 hours old, born at 38 weeks via SVD, birthweight 3.2kg. She is visibly jaundiced to the chest. Her TSB returns at 210 μmol/L. The ward phototherapy chart threshold for her age and gestation is 205 μmol/L. Her mother is distressed and insisting on taking her home. What do you do?`,
    solutionSteps: [
      'The TSB exceeds the phototherapy threshold — PHOTOTHERAPY IS INDICATED.',
      'Explain to the mother calmly in layman\'s terms: "The yellow colour in Baby Amina\'s skin is bilirubin. If it gets too high, it can damage the brain. The special blue light will break it down safely."',
      'Obtain oral consent; document the explanation and consent in the notes.',
      'Set up phototherapy unit — confirm light bulbs functional, measure distance 25–50cm.',
      'Undress baby fully (nappy only), secure eye patches.',
      'Check temperature within 1 hour of starting phototherapy.',
      'Increase fluid intake by 10–20% (encourage frequent breastfeeding or add IV supplement).',
      'Repeat TSB at 6–12 hours after initiating phototherapy.',
      'If TSB > exchange transfusion level (270+ μmol/L), escalate immediately to consultant.',
      'Document phototherapy start time, light intensity (if measurable), and baby\'s position.'
    ],
    formulasUsed: 'Phototherapy Threshold: Use local Bhutani nomogram or WHO chart based on gestational age and postnatal hours.\nExchange Transfusion threshold: typically TSB > 420 μmol/L in term infants or as per unit policy.',
    warning: 'Do not delay phototherapy for a baby above the treatment threshold to accommodate parental preference. Hyperbilirubinaemia causing kernicterus results in permanent deafness, cerebral palsy, and intellectual disability. Escalate parental refusal immediately to the MO and nursing in-charge.'
  },
  {
    title: 'Drug Calculation — Phenobarbitone for Neonatal Seizure',
    problemStatement: `Baby Lydia, 2 days old, 2.8kg term baby, starts having rhythmic jerking of both arms lasting 2 minutes. She is not responding to stimulation. The MO prescribes Phenobarbitone 20 mg/kg IV stat. The ward stock is Phenobarbitone 200mg/mL ampoule. How much do you draw up?`,
    solutionSteps: [
      'Identify the prescription: 20 mg/kg loading dose.',
      'Calculate required dose: 20 mg/kg × 2.8 kg = 56 mg.',
      'Identify concentration of stock: 200 mg/mL.',
      'Calculate volume: Volume = 56 mg ÷ 200 mg/mL = 0.28 mL.',
      'Dilute before administration: draw 0.28 mL Phenobarbitone into syringe, add 0.9% NaCl to make a 1mg/mL or 2mg/mL dilution for accurate delivery.',
      'Administer IV slowly over 15–20 minutes via syringe driver.',
      'Monitor: heart rate, respiratory rate, SpO2 throughout infusion.',
      'If seizure continues 20 minutes post-loading dose, repeat Phenobarbitone 10 mg/kg (check with MO first).',
      'Document: drug, dose, volume, diluent, rate of infusion, response, and witness nurse.'
    ],
    formulasUsed: 'Required Dose (mg) = Prescribed Dose (mg/kg) × Weight (kg)\nVolume to draw (mL) = Required Dose (mg) ÷ Concentration (mg/mL)',
    warning: 'Phenobarbitone can cause respiratory depression and apnoea, especially in preterm infants. Have bag-mask ventilation ready BEFORE commencing infusion. Do NOT give as an IV push — always infuse slowly.'
  },
  {
    title: 'VLBW Infant — Total Parenteral Nutrition (TPN) Setup',
    problemStatement: `Baby Patience, 26 weeks gestation, 780g (ELBW), is 12 hours old. She is on mechanical ventilation and cannot tolerate enteral feeds. The consultant has prescribed TPN. The pharmacy provides a bag of Vaminolact 10% (amino acids), Intralipid 20%, and Glucose 10%. How do you set up and manage her IV nutrition?`,
    solutionSteps: [
      'Confirm UVC (umbilical venous catheter) placement via CXR — TPN must run through a central line.',
      'Check the TPN bag from pharmacy: name, date, composition, expiry. Do NOT use if turbid or precipitate visible.',
      'Set up dedicated TPN line (never use for blood draws, drugs, or other infusions).',
      'Programme syringe driver rates per pharmacy prescription (usually split: amino acids + glucose together; lipids separate line).',
      'Start glucose infusion rate (GIR): target ≈6–8 mg/kg/min initially.',
      'Start lipids at 1g/kg/day on Day 1, increase to 3g/kg/day over 3–4 days.',
      'Amino acids: start at 1.5–2g/kg/day, increase to 3.5–4g/kg/day.',
      'Monitor blood glucose 4-hourly for the first 24 hours.',
      'Monitor triglycerides every 48–72 hours while on lipid infusion.',
      'Weigh daily (same conditions, same scale) to guide fluid and nutrition adjustments.',
      'Change TPN bag and giving sets every 24 hours (infection control).'
    ],
    formulasUsed: 'GIR (mg/kg/min) = [Glucose Infusion Rate (mL/hr) × Glucose Concentration (g/dL) × 1000] ÷ [Weight (kg) × 60]\nTarget: 6–8 mg/kg/min to maintain normoglycaemia in VLBW',
    warning: 'TPN-associated bloodstream infections (CLABSI) are a leading cause of mortality in ELBW infants. Use strict aseptic technique at ALL times when handling central lines. Any fever in a baby on TPN = sepsis until proven otherwise — blood culture and antibiotics immediately.'
  }
];

// ─── SEED FUNCTION ─────────────────────────────────────────────────────────────
const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB...');

    // Clear all collections
    await User.deleteMany({});
    await Flashcard.deleteMany({});
    await Scenario.deleteMany({});
    console.log('🗑️  Cleared existing data.');

    // Seed users (password hashing is handled by the pre-save hook)
    const createdUsers = [];
    for (const u of users) {
      const user = new User(u);
      await user.save();
      createdUsers.push(user);
    }
    console.log(`👥 Seeded ${createdUsers.length} users.`);

    // Seed flashcards
    const insertedFlashcards = await Flashcard.insertMany(flashcards);
    console.log(`📋 Seeded ${insertedFlashcards.length} flashcards.`);

    // Seed scenarios
    const insertedScenarios = await Scenario.insertMany(scenarios);
    console.log(`🧠 Seeded ${insertedScenarios.length} scenarios.`);

    console.log('\n═══════════════════════════════════════');
    console.log('✅ DATABASE SEEDED SUCCESSFULLY');
    console.log('═══════════════════════════════════════');
    console.log('\nTest Accounts:');
    console.log('  In-Charge : incharge@nbu.hospital.ke  | Admin@1234');
    console.log('  Nurse     : nurse@nbu.hospital.ke     | Nurse@1234');
    console.log('  Doctor    : consultant@nbu.hospital.ke| Doctor@1234');
    console.log('  MO        : mo@nbu.hospital.ke        | Mo@12345');
    console.log('  Student   : student@nbu.hospital.ke   | Student@1234');
    console.log('═══════════════════════════════════════\n');

    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding failed:', err);
    process.exit(1);
  }
};

seedDB();

<?php

namespace Database\Seeders;

use App\Models\Flashcard;
use App\Models\Scenario;
use Illuminate\Database\Seeder;

class AcademySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Flashcard::truncate();
        Scenario::truncate();

        $flashcards = [
            [
                'title' => 'APGAR Score Evaluation', 
                'category' => 'Routine', 
                'content' => 'The APGAR score is a quick way for doctors to evaluate the health of all newborns at 1 and 5 minutes after birth. It stands for: Appearance (skin color), Pulse (heart rate), Grimace (reflex irritability), Activity (muscle tone), and Respiration (breathing effort and rate). A score of 7-10 is normal, 4-6 is moderately low, and 0-3 is critically low.'
            ],
            [
                'title' => 'Neonatal CPAP Fundamentals', 
                'category' => 'Clinical', 
                'content' => 'Continuous Positive Airway Pressure (CPAP) is a form of non-invasive respiratory support. It helps maintain functional residual capacity (FRC) by keeping the alveoli open during expiration. Starting pressures are typically 5-8 cmH2O. Monitor for nasal septum breakdown and gastric distension (CPAP belly).'
            ],
            [
                'title' => 'Sepsis Red Flags', 
                'category' => 'Critical', 
                'content' => 'Neonatal sepsis is a leading cause of mortality. Key signs include temperature instability (fever or hypothermia), lethargy, poor feeding, apnea, and mottled skin. Early-onset sepsis occurs within 72 hours and is often vertical transmission, while late-onset is usually hospital-acquired.'
            ],
            [
                'title' => 'Phototherapy Guidelines', 
                'category' => 'Routine', 
                'content' => 'Used to treat hyperbilirubinemia. Blue-green light (430-490 nm) converts unconjugated bilirubin into water-soluble isomers (lumirubin) excreted in urine/bile. Ensure eyes are covered, monitor hydration, and maximize skin exposure. Check bilirubin levels every 6-12 hours.'
            ],
            [
                'title' => 'Kangaroo Mother Care (KMC)', 
                'category' => 'Routine', 
                'content' => 'KMC involves early, continuous, and prolonged skin-to-skin contact. It promotes thermal regulation, increases breastfeeding rates, reduces infection risk, and improves weight gain. Criteria: hemodynamic stability and ability to tolerate handling.'
            ],
            [
                'title' => 'Hypoglycemia Management', 
                'category' => 'Critical', 
                'content' => 'Defined as blood glucose < 2.6 mmol/L in symptomatic or high-risk neonates. Initial fix: 10% Dextrose bolus (2 ml/kg) followed by increased Glucose Infusion Rate (GIR). High risk includes preterms, SGA, and infants of diabetic mothers (IDM).'
            ],
            [
                'title' => 'Surfactant Administration', 
                'category' => 'Clinical', 
                'content' => 'Used for Respiratory Distress Syndrome (RDS) caused by surfactant deficiency. Administered via endotracheal tube (LISA or INSURE technique). It reduces surface tension and prevents alveolar collapse. Monitor for transient hypoxia or bradycardia during delivery.'
            ],
            [
                'title' => 'NEC Recognition', 
                'category' => 'Critical', 
                'content' => 'Necrotizing Enterocolitis (NEC) is an intestinal emergency. Signs: abdominal distension, bile-stained aspirates, bloody stools. X-ray may show pneumatosis intestinalis (gas in the bowel wall). Management: NPO, gastric decompression, broad-spectrum antibiotics.'
            ],
            [
                'title' => 'VLBW vs ELBW', 
                'category' => 'Clinical', 
                'content' => 'Very Low Birth Weight (VLBW) is < 1500g. Extremely Low Birth Weight (ELBW) is < 1000g. These infants require specialized care including humidity in incubators, parenteral nutrition, and meticulous developmental care.'
            ],
            [
                'title' => 'Therapeutic Hypothermia', 
                'category' => 'Critical', 
                'content' => 'Used for Hypoxic-Ischemic Encephalopathy (HIE) in term/near-term infants. Aim: Cool to 33.5°C for 72 hours starting within 6 hours of birth. It reduces neuronal death by slowing cerebral metabolism.'
            ],
            [
                'title' => 'Kernicterus Prevention', 
                'category' => 'Critical', 
                'content' => 'Kernicterus is irreversible brain damage from high bilirubin. Early signs: lethargy, poor suck, high-pitched cry. Late signs: opisthotonus, seizures. Monitor TSB levels and ensure timely phototherapy or exchange transfusion.'
            ],
            [
                'title' => 'Neonatal Reflexes', 
                'category' => 'Routine', 
                'content' => 'Assessment of the nervous system. Rooting (searching for nipple), Sucking, Moro (startle reflex), Palmar Grasp, and Babinski. Absence or asymmetry can indicate neurological insult or birth injury.'
            ],
            [
                'title' => 'GBS Prophylaxis', 
                'category' => 'Clinical', 
                'content' => 'Group B Streptococcus is a leading cause of neonatal sepsis. Intrapartum antibiotic prophylaxis (IAP) given to GBS+ mothers at least 4 hours before delivery significantly reduces early-onset disease.'
            ],
            [
                'title' => 'PDA in Preterms', 
                'category' => 'Clinical', 
                'content' => 'Patent Ductus Arteriosus (PDA) often fails to close in preterms. Symptoms: bounding pulses, active precordium, systolic murmur. Management: Fluid restriction, NSAIDs (Indomethacin/Ibuprofen), or surgical ligation if hemodynamically significant.'
            ],
            [
                'title' => 'Meconium Aspiration', 
                'category' => 'Critical', 
                'content' => 'MAS occurs when a neonate inhales meconium-stained amniotic fluid. It causes airway obstruction, chemical pneumonitis, and surfactant inactivation. Often leads to PPHN (Persistent Pulmonary Hypertension of the Newborn).'
            ],
            [
                'title' => 'Inborn Errors of Metabolism', 
                'category' => 'Advanced', 
                'content' => 'Suspect IEM if a previously healthy infant suddenly deteriorates with metabolic acidosis, hyperammonemia, or hypoglycemia. Common types: Urea cycle disorders, Organic acidemias, Galactosemia.'
            ],
            [
                'title' => 'ROP Screening', 
                'category' => 'Routine', 
                'content' => 'Retinopathy of Prematurity affects preterms <32 weeks or <1500g. Caused by abnormal vascular growth in the retina. Risk factors: high oxygen exposure, sepsis, fluctuations in SpO2.'
            ],
            [
                'title' => 'IVH Prevention', 
                'category' => 'Advanced', 
                'content' => 'Intraventricular Hemorrhage (IVH) occurs in germinal matrix. Prevention bundle: minimal handling, midline head positioning, avoiding rapid fluid boluses, and maintaining stable blood pressure.'
            ],
            [
                'title' => 'CHD Screening', 
                'category' => 'Routine', 
                'content' => 'Critical Congenital Heart Disease (CCHD) screening via pulse oximetry. Done after 24 hours of life. Measures SpO2 in right hand (pre-ductal) and either foot (post-ductal). Difference >3% or SpO2 <95% is a fail.'
            ],
            [
                'title' => 'NICU Breastfeeding', 
                'category' => 'Essential', 
                'content' => 'Breast milk reduces the risk of NEC, sepsis, and ROP. It provides immunological protection and improves neurodevelopmental outcomes. Encourage early colostrum expression and skin-to-skin contact.'
            ],
        ];

        foreach ($flashcards as $f) {
            Flashcard::create($f);
        }

        $scenarios = [
            [
                'title' => 'Acute Respiratory Distress', 
                'description' => 'A 28-week preterm neonate is born via emergency C-section. At 15 minutes of life, the baby shows significant subcostal recessions, grunting, and nasal flaring. SpO2 is 84% on room air.', 
                'problem' => 'What is the most likely diagnosis and the immediate respiratory intervention?', 
                'solution' => 'Diagnosis: Respiratory Distress Syndrome (RDS). Intervention: Start nasal CPAP at 6-7 cmH2O and assess for surfactant requirement.', 
                'difficulty' => 'Advanced'
            ],
            [
                'title' => 'Post-Natal Jaundice', 
                'description' => 'A 3-day old term baby presents with visible jaundice reaching the palms and soles. Total serum bilirubin (TSB) is 340 umol/L. The baby is sleepy but breastfeeding well.', 
                'problem' => 'Based on the bilirubin level, what is the immediate clinical action required?', 
                'solution' => 'Initiate intensive phototherapy immediately and check for blood group incompatibility (ABO/Rh) and hemolysis.', 
                'difficulty' => 'Intermediate'
            ],
            [
                'title' => 'Sudden Bradycardia', 
                'description' => 'A neonate on CPAP suddenly develops bradycardia (HR 70 bpm) and desaturation (SpO2 65%). You notice the chest is not moving well and there are absent breath sounds on the left side.', 
                'problem' => 'What is the suspected emergency and the immediate life-saving procedure?', 
                'solution' => 'Suspected Pneumothorax. Procedure: Needle thoracocentesis (aspiration) in the 2nd intercostal space, mid-clavicular line.', 
                'difficulty' => 'Critical'
            ],
            [
                'title' => 'Feeding Intolerance', 
                'description' => 'A 1200g ELBW infant on Day 5 of life. The nurse reports a 4cm increase in abdominal girth and green (bilious) gastric residuals of 5ml.', 
                'problem' => 'What is the immediate nursing and medical action?', 
                'solution' => 'Make the infant NPO (Nil Per Os), insert an orogastric tube for decompression, and order an urgent abdominal X-ray to rule out NEC.', 
                'difficulty' => 'Advanced'
            ],
            [
                'title' => 'Calculation: GIR', 
                'description' => 'A 2.5kg infant is receiving 10% Dextrose at a rate of 12ml/hr.', 
                'problem' => 'Calculate the Glucose Infusion Rate (GIR) in mg/kg/min.', 
                'solution' => 'Formula: (Rate * Concentration) / (6 * Weight). Result: (12 * 10) / (6 * 2.5) = 120 / 15 = 8 mg/kg/min.', 
                'difficulty' => 'Intermediate'
            ],
            [
                'title' => 'Birth Asphyxia Triage', 
                'description' => 'Baby born at 40 weeks. No spontaneous breathing at birth. Heart rate is 80 bpm. Tone is limp.', 
                'problem' => 'What is the priority in the first 60 seconds (The Golden Minute)?', 
                'solution' => 'Start Positive Pressure Ventilation (PPV) using a bag-and-mask at a rate of 40-60 breaths per minute.', 
                'difficulty' => 'Critical'
            ],
            [
                'title' => 'Umbilical Line Check', 
                'description' => 'An Umbilical Venous Catheter (UVC) has just been inserted. X-ray shows the tip is located at the level of T7, just above the diaphragm.', 
                'problem' => 'Is this position correct? If not, where should it be?', 
                'solution' => 'Yes, this is the high position (T6-T9). It should be in the inferior vena cava, just above the junction with the right atrium.', 
                'difficulty' => 'Advanced'
            ],
            [
                'title' => 'Vitamin K Prophylaxis', 
                'description' => 'A newborn is admitted to the NBU after a home delivery. The mother is unsure if any medications were given at birth.', 
                'problem' => 'What injection is mandatory to prevent Vitamin K Deficiency Bleeding (VKDB)?', 
                'solution' => 'Intramuscular Vitamin K (Phytomenadione) 1mg (or 0.5mg if <1500g).', 
                'difficulty' => 'Essential'
            ],
            [
                'title' => 'Thermal Regulation', 
                'description' => 'A preterm baby in an incubator has a temperature of 35.9°C (cold stress).', 
                'problem' => 'List two immediate environmental adjustments.', 
                'solution' => 'Increase incubator air temperature and ensure the baby is wearing a hat/covered appropriately to reduce radiant heat loss.', 
                'difficulty' => 'Essential'
            ],
            [
                'title' => 'Fluid Management', 
                'description' => 'Day 1 of life for a 1500g neonate. Standard protocol suggests starting at 60ml/kg/day.', 
                'problem' => 'What is the total fluid volume for 24 hours and the hourly IV rate?', 
                'solution' => 'Total: 60 * 1.5 = 90ml. Hourly rate: 90 / 24 = 3.75 ml/hr.', 
                'difficulty' => 'Intermediate'
            ],
            [
                'title' => 'Hypoglycemic Seizure', 
                'description' => 'An infant of a diabetic mother is 2 hours old. Suddenly develops generalized twitching. Random blood sugar is 1.1 mmol/L.', 
                'problem' => 'Immediate pharmacological intervention?', 
                'solution' => '10% Dextrose bolus (2ml/kg) over 5-10 minutes, followed by an increase in GIR.', 
                'difficulty' => 'Critical'
            ],
            [
                'title' => 'Septic Shock', 
                'description' => 'A neonate with suspected sepsis has a blood pressure of 32/18 mmHg. CRT is 5 seconds. Liver is 3cm below costal margin.', 
                'problem' => 'Priority intervention after starting antibiotics?', 
                'solution' => 'Fluid resuscitation (Normal Saline 10-20ml/kg) and consider inotropic support (Dopamine/Dobutamine).', 
                'difficulty' => 'Advanced'
            ],
            [
                'title' => 'MAS Airway', 
                'description' => 'Thick meconium-stained fluid at birth. The baby is non-vigorous (no breathing, poor tone).', 
                'problem' => 'Current NRP recommendation for airway management?', 
                'solution' => 'Start PPV if the baby is not breathing. Routine endotracheal suctioning for meconium is no longer recommended unless there is airway obstruction.', 
                'difficulty' => 'Critical'
            ],
            [
                'title' => 'PDA Assessment', 
                'description' => 'A 26-weeker on Day 4. You hear a continuous "machinery" murmur at the left upper sternal border. Pulses are bounding.', 
                'problem' => 'Likely diagnosis and bedside investigation?', 
                'solution' => 'Hemodynamically Significant PDA (hsPDA). Investigation: Bedside Echocardiogram.', 
                'difficulty' => 'Advanced'
            ],
            [
                'title' => 'ROP Screening Criteria', 
                'description' => 'A neonate was born at 30 weeks with a birth weight of 1300g.', 
                'problem' => 'When should the first ROP screening be performed?', 
                'solution' => 'At 4 weeks of chronological age or 31 weeks post-menstrual age (whichever is later).', 
                'difficulty' => 'Intermediate'
            ],
        ];

        foreach ($scenarios as $s) {
            Scenario::create($s);
        }
    }
}

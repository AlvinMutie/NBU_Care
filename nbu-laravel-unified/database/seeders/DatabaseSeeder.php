<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Seed Pre-Authorized Clinical Staff Registry
        $staffRegistry = [
            ['hospital_id' => 'NBU-2026-001', 'role' => 'Nursing In-Charge'],
            ['hospital_id' => 'NBU-2026-002', 'role' => 'Nurse'],
            ['hospital_id' => 'NBU-2026-003', 'role' => 'Consultant Pediatrician'],
            ['hospital_id' => 'NBU-2026-004', 'role' => 'CO Pediatrics / MO'],
            ['hospital_id' => 'NBU-2026-005', 'role' => 'Student'],
            ['hospital_id' => 'NBU-2026-006', 'role' => 'ICT / IT Support'],
            ['hospital_id' => 'NBU-2026-007', 'role' => 'Hospital Management'],
            ['hospital_id' => 'NBU-ADMIN-999', 'role' => 'Nursing In-Charge'],
        ];

        foreach ($staffRegistry as $staff) {
            \Illuminate\Support\Facades\DB::table('preauthorized_staff')->updateOrInsert(
                ['hospital_id' => $staff['hospital_id']],
                [
                    'role' => $staff['role'],
                    'assigned_department' => 'NBU',
                    'created_at' => now(),
                    'updated_at' => now(),
                ]
            );
        }

        // 2. Seed an Approved System Administrator (Nursing In-Charge role)
        User::updateOrCreate(
            ['email' => 'admin@neodesk.org'],
            [
                'name' => 'Chief Nurse In-Charge',
                'password' => \Illuminate\Support\Facades\Hash::make('password'),
                'hospital_id' => 'NBU-ADMIN-999',
                'role' => 'Nursing In-Charge',
                'status' => 'Approved',
                'is_verified' => true,
                'email_verified_at' => now(),
            ]
        );

        User::updateOrCreate(
            ['email' => 'angela.omwansa@hospital.go.ke'],
            [
                'name' => 'Dr. Angela Omwansa',
                'password' => \Illuminate\Support\Facades\Hash::make('password'),
                'hospital_id' => 'NBU-2026-003',
                'role' => 'Consultant Pediatrician',
                'status' => 'Approved',
                'is_verified' => true,
                'email_verified_at' => now(),
            ]
        );

        User::updateOrCreate(
            ['email' => 'teresa.njoroge@hospital.go.ke'],
            [
                'name' => 'Sister Teresa Njoroge',
                'password' => \Illuminate\Support\Facades\Hash::make('password'),
                'hospital_id' => 'NBU-2026-001',
                'role' => 'Nursing In-Charge',
                'status' => 'Approved',
                'is_verified' => true,
                'email_verified_at' => now(),
            ]
        );

        User::updateOrCreate(
            ['email' => 'patrick.kamau@hospital.go.ke'],
            [
                'name' => 'Nurse Patrick Kamau',
                'password' => \Illuminate\Support\Facades\Hash::make('password'),
                'hospital_id' => 'NBU-2026-002',
                'role' => 'Nurse',
                'status' => 'Approved',
                'is_verified' => true,
                'email_verified_at' => now(),
            ]
        );

        User::updateOrCreate(
            ['email' => 'cynthia.wekesa@hospital.go.ke'],
            [
                'name' => 'Nurse Cynthia Wekesa',
                'password' => \Illuminate\Support\Facades\Hash::make('password'),
                'hospital_id' => 'NBU-2026-004',
                'role' => 'CO Pediatrics / MO',
                'status' => 'Approved',
                'is_verified' => true,
                'email_verified_at' => now(),
            ]
        );

        // 3. Seed Realistic Neonatal Patients for registry
        $neonates = [
            [
                'hospital_number' => 'NBU-2026-901',
                'name' => 'Baby Jane Doe',
                'dob' => now()->subDays(3)->format('Y-m-d'),
                'gender' => 'Female',
                'birth_weight' => 2.250,
                'current_weight' => 2.100,
                'gestational_age' => 34,
                'admission_diagnosis' => 'Respiratory Distress Syndrome (RDS) due to prematurity',
                'history' => 'Born via emergency C-section to a 28-year-old mother with pre-eclampsia. Apgar score 6 at 1 min, 8 at 5 mins.',
                'mother_phone' => '+254712345678',
                'status' => 'Stable',
            ],
            [
                'hospital_number' => 'NBU-2026-902',
                'name' => 'Baby John Mwangi',
                'dob' => now()->subDays(6)->format('Y-m-d'),
                'gender' => 'Male',
                'birth_weight' => 1.950,
                'current_weight' => 1.850,
                'gestational_age' => 32,
                'admission_diagnosis' => 'Very Low Birth Weight (VLBW) / Hyperbilirubinemia',
                'history' => 'Spontaneous vaginal delivery. Resuscitated briefly with bag and mask ventilation. Jaundice noticed on Day 2.',
                'mother_phone' => '+254722334455',
                'status' => 'Stable',
            ],
            [
                'hospital_number' => 'NBU-2026-903',
                'name' => 'Baby Ethan Kibet',
                'dob' => now()->subDays(2)->format('Y-m-d'),
                'gender' => 'Male',
                'birth_weight' => 3.100,
                'current_weight' => 2.950,
                'gestational_age' => 38,
                'admission_diagnosis' => 'Neonatal Sepsis / Meconium Aspiration',
                'history' => 'Term male infant. Meconium-stained amniotic fluid. Started on Ampicillin and Gentamicin.',
                'mother_phone' => '+254733445566',
                'status' => 'Stable',
            ],
            [
                'hospital_number' => 'NBU-2026-904',
                'name' => 'Baby Amani Wambua',
                'dob' => now()->subDays(10)->format('Y-m-d'),
                'gender' => 'Female',
                'birth_weight' => 1.600,
                'current_weight' => 1.720,
                'gestational_age' => 30,
                'admission_diagnosis' => 'Extreme Prematurity / Feeding Intolerance',
                'history' => 'Born to multi-gravid mother with preterm premature rupture of membranes (PPROM). On CPAP support.',
                'mother_phone' => '+254744556677',
                'status' => 'Stable',
            ],
        ];

        foreach ($neonates as $neonate) {
            \Illuminate\Support\Facades\DB::table('neonates')->updateOrInsert(
                ['hospital_number' => $neonate['hospital_number']],
                [
                    'name' => $neonate['name'],
                    'dob' => $neonate['dob'],
                    'gender' => $neonate['gender'],
                    'birth_weight' => $neonate['birth_weight'],
                    'current_weight' => $neonate['current_weight'],
                    'gestational_age' => $neonate['gestational_age'],
                    'admission_diagnosis' => $neonate['admission_diagnosis'],
                    'history' => $neonate['history'],
                    'mother_phone' => $neonate['mother_phone'],
                    'status' => $neonate['status'],
                    'created_at' => now(),
                    'updated_at' => now(),
                ]
            );
        }

        // Fetch seeded users and neonates for scheduling
        $adminUser = User::where('email', 'admin@neodesk.org')->first();
        $consultant = User::where('email', 'angela.omwansa@hospital.go.ke')->first();
        $manager = User::where('email', 'teresa.njoroge@hospital.go.ke')->first();
        $nurse = User::where('email', 'patrick.kamau@hospital.go.ke')->first();

        // Create a Rota for Today
        $rotaId = \Illuminate\Support\Facades\DB::table('rotas')->insertGetId([
            'date' => now()->format('Y-m-d'),
            'shift' => 'Morning',
            'consultant_id' => $consultant->id,
            'manager_id' => $manager->id,
            'created_by' => $adminUser->id,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // Assign Nurse to Rota
        \Illuminate\Support\Facades\DB::table('rota_user')->insert([
            'rota_id' => $rotaId,
            'user_id' => $nurse->id,
        ]);

        // Seed Shift Handovers for baby patients
        $janeDoe = \Illuminate\Support\Facades\DB::table('neonates')->where('hospital_number', 'NBU-2026-901')->first();
        $johnMwangi = \Illuminate\Support\Facades\DB::table('neonates')->where('hospital_number', 'NBU-2026-902')->first();

        \Illuminate\Support\Facades\DB::table('handovers')->insert([
            [
                'neonate_id' => $janeDoe->id,
                'date' => now(),
                'shift' => 'Morning',
                'clinical_lead_id' => $consultant->id,
                'nurse_on_duty_id' => $manager->id,
                'commentary' => 'Infant stable on room air. Minimal retractions noted in the early morning but resolved. Tolerating feeds well. Vital checkups are fully reassuring.',
                'temperature' => 36.6,
                'sugar_level' => 4.2,
                'oxygen_saturation' => 98,
                'heart_rate' => 142,
                'respiratory_rate' => 48,
                'investigations' => json_encode([
                    'liver' => 'Normal',
                    'kidney' => 'Normal',
                    'fbc' => 'Hb 14.2 g/dL, WBC 11.5',
                ]),
                'plan' => 'Maintain thermal care. Encourage breast feeds every 3 hours. Monitor diaper output.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'neonate_id' => $johnMwangi->id,
                'date' => now(),
                'shift' => 'Morning',
                'clinical_lead_id' => $consultant->id,
                'nurse_on_duty_id' => $manager->id,
                'commentary' => 'Jaundice is visibly present on the trunk. Started phototherapy at 09:00. Ensure eye protection patches are kept secured and phototherapy light is positioned properly.',
                'temperature' => 36.8,
                'sugar_level' => 4.5,
                'oxygen_saturation' => 97,
                'heart_rate' => 138,
                'respiratory_rate' => 45,
                'investigations' => json_encode([
                    'liver' => 'Serum Bilirubin 210 mmol/L',
                    'kidney' => 'Normal',
                    'fbc' => 'Hb 13.8 g/dL',
                ]),
                'plan' => 'Continue phototherapy. Monitor bilirubin level in 12 hours. Ensure high fluid intake via express breast milk.',
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);

        // Seed Clinical Flashcards
        \Illuminate\Support\Facades\DB::table('flashcards')->insert([
            [
                'title' => 'Neonatal Resuscitation Protocol',
                'category' => 'Critical',
                'when_to_perform' => 'Perform immediately at birth if the newborn is apneic, limp, or has a heart rate < 100 bpm.',
                'steps' => json_encode([
                    'Provide warmth: Place infant under a radiant warmer and dry completely.',
                    'Clear airway: Position head in sniffing position; suction mouth then nose if obstructed.',
                    'Initiate PPV: Start Positive Pressure Ventilation with room air if HR < 100 or infant is gasping.',
                    'Start compressions: If HR < 60 after 30 seconds of effective ventilation, start chest compressions (3:1 ratio).'
                ]),
                'warning' => 'Do not perform vigorous deep suctioning immediately as it can induce vagal bradycardia.',
                'tips' => 'Always ensure MR. SOPA checklist is executed if chest movement is inadequate during PPV.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Kangaroo Mother Care (KMC)',
                'category' => 'Routine',
                'when_to_perform' => 'Indicated for stable low birth weight newborns (< 2.0 kg) to maintain normothermia.',
                'steps' => json_encode([
                    'Secure skin-to-skin: Place infant upright inside mother\'s gown between breasts.',
                    'Ensure airway protection: Keep head turned to one side and slightly extended to keep airway open.',
                    'Exclusive Breastfeeding: Promote frequent breastfeeding (every 2-3 hours) or express breast milk feeding.',
                    'Continuous monitoring: Track breathing patterns and check feet warmth.'
                ]),
                'warning' => 'Discontinue KMC and seek urgent help if chest indrawings or grunting occurs.',
                'tips' => 'Encourage fathers or other family members to take shifts in providing KMC to support the mother.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Neonatal Hypoglycemia Protocol',
                'category' => 'Clinical',
                'when_to_perform' => 'Check blood glucose at 2 hours of life for high-risk neonates (preterms, diabetic mother infants, SGA).',
                'steps' => json_encode([
                    'Measure Sugar: Check heel-prick blood glucose using a calibrated glucometer.',
                    'Immediate Feed: If glucose is < 2.6 mmol/L but baby is stable, initiate immediate breastfeed or cup feed.',
                    'Start IV Fluids: If glucose < 1.6 mmol/L or baby is symptomatic, give D10W bolus (2 mL/kg) and start infusion.',
                    'Re-check: Re-measure blood glucose 30 minutes post intervention.'
                ]),
                'warning' => 'Delayed treatment of severe neonatal hypoglycemia can lead to irreversible neurological injury or seizures.',
                'tips' => 'Avoid rapid termination of high-concentration glucose infusions to prevent rebound hypoglycemia.',
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);

        // Seed Clinical Training Scenarios
        \Illuminate\Support\Facades\DB::table('scenarios')->insert([
            [
                'title' => 'Preterm Hypoglycemia Maintenance Infusion',
                'problem_statement' => 'A 32-week preterm baby weighing 1.8 kg has a blood sugar of 1.8 mmol/L at 2 hours of life and is lethargic. Prescribe a 2 mL/kg D10W bolus and calculate the ongoing D10W maintenance fluid rate at 80 mL/kg/day.',
                'solution_steps' => json_encode([
                    'Calculate D10W Bolus: 1.8 kg * 2 mL/kg = 3.6 mL of D10W administered over 5-10 minutes.',
                    'Calculate Daily Maintenance Vol: 1.8 kg * 80 mL/kg/day = 144 mL/day.',
                    'Calculate Hourly Infusion Rate: 144 mL / 24 hours = 6.0 mL/hour of D10W.'
                ]),
                'formulas_used' => 'Bolus Vol = Weight (kg) * 2 mL/kg; Hourly Rate = (Weight * Daily TFI) / 24',
                'warning' => 'Confirm IV patency before administering D10W; extravasation can cause skin necrosis and severe chemical cellulitis.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Apneic Neonatal Resuscitation',
                'problem_statement' => 'A term male baby is delivered via emergency Caesarean section due to cord prolapse. The baby is born limp, pale, and is not breathing. The heart rate is 50 beats per minute. Describe the resuscitation sequence.',
                'solution_steps' => json_encode([
                    'Initial steps: Place baby under radiant heater, dry vigorously, position head, and clear airway (mouth then nose). Time target: 30 seconds.',
                    'Ventilation: Baby remains apneic; initiate positive pressure ventilation (PPV) using a T-piece or self-inflating bag. Time target: 30 seconds.',
                    'Cardiopulmonary resuscitation: HR is checked and is still 50 bpm despite chest expansion. Initiate chest compressions at 3:1 ratio combined with 100% oxygen.'
                ]),
                'formulas_used' => 'Compressions to Ventilation Ratio = 3:1 (90 compressions and 30 breaths per minute)',
                'warning' => 'Never start chest compressions without first completing 30 seconds of effective positive pressure ventilation.',
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);
    }
}

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
    }
}

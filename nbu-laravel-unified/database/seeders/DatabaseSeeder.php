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
    }
}

<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Flashcard;
use App\Models\Scenario;
use App\Models\Setting;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Test Credentials from README.md
        $password = Hash::make('password');

        $users = [
            [
                'name' => 'System Admin',
                'email' => 'admin@neodesk.org',
                'password' => $password,
                'role' => 'Nursing In-Charge',
                'status' => 'Approved',
                'isVerified' => true,
            ],
            [
                'name' => 'Angela Omwansa',
                'email' => 'angela.omwansa@hospital.go.ke',
                'password' => $password,
                'role' => 'Consultant Pediatrician',
                'status' => 'Approved',
                'isVerified' => true,
            ],
            [
                'name' => 'Teresa Njoroge',
                'email' => 'teresa.njoroge@hospital.go.ke',
                'password' => $password,
                'role' => 'Nursing In-Charge',
                'status' => 'Approved',
                'isVerified' => true,
            ],
            [
                'name' => 'Patrick Kamau',
                'email' => 'patrick.kamau@hospital.go.ke',
                'password' => $password,
                'role' => 'Staff Nurse',
                'status' => 'Approved',
                'isVerified' => true,
            ],
            [
                'name' => 'Cynthia Nekesa',
                'email' => 'cynthia.wekesa@hospital.go.ke',
                'password' => $password,
                'role' => 'Medical Officer',
                'status' => 'Approved',
                'isVerified' => true,
            ],
        ];

        foreach ($users as $userData) {
            User::create($userData);
        }

        // Initial Clinical Content (Examples)
        Flashcard::create([
            'title' => 'Neonatal Resuscitation',
            'category' => 'Critical',
            'content' => 'Initial steps: Provide warmth, clear airway if necessary, dry, stimulate.',
            'execution_logic' => 'Step 1: Warmth; Step 2: Airway; Step 3: Dry; Step 4: Stimulate.'
        ]);

        Scenario::create([
            'title' => 'Hypoglycemia Management',
            'description' => 'A newborn with blood sugar of 1.2 mmol/L.',
            'problem' => 'Calculate the bolus dose of 10% Dextrose (2ml/kg).',
            'solution' => '2ml/kg * weight = Bolus volume.',
            'maths_data' => ['dosage' => 2, 'unit' => 'ml/kg'],
            'difficulty' => 'Intermediate'
        ]);

        // Global Settings
        Setting::create(['key' => 'ward_name', 'value' => 'Neonatal Building Unit (NBU)', 'type' => 'string']);
        Setting::create(['key' => 'hospital_name', 'value' => 'General Hospital', 'type' => 'string']);
        Setting::create(['key' => 'global_override', 'value' => 'false', 'type' => 'boolean']);
    }
}

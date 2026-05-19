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
    }
}

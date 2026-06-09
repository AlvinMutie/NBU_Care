<?php

namespace Database\Seeders;

use App\Models\AuditLog;
use App\Models\User;
use Illuminate\Database\Seeder;

class AuditLogSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admin = User::where('email', 'admin@neodesk.org')->first();
        
        $logs = [
            ['user_id' => $admin->id, 'action' => 'System Login', 'resource_type' => 'auth', 'payload' => ['ip' => '127.0.0.1']],
            ['user_id' => $admin->id, 'action' => 'Neonate Admission', 'resource_type' => 'neonate', 'payload' => ['name' => 'Baby Mary']],
            ['user_id' => $admin->id, 'action' => 'Dose Calculation', 'resource_type' => 'calculator', 'payload' => ['drug' => 'Dopamine']],
            ['user_id' => $admin->id, 'action' => 'Shift Change', 'resource_type' => 'rota', 'payload' => ['shift' => 'Morning']],
            ['user_id' => $admin->id, 'action' => 'Settings Update', 'resource_type' => 'settings', 'payload' => ['key' => 'ward_name']],
        ];

        foreach ($logs as $l) {
            AuditLog::create($l);
        }
    }
}

<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ClinicalWorkflowTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test saving a shift handover report successfully.
     */
    public function test_shift_handover_report_creation_and_audit_logging()
    {
        // 1. Arrange: Create nurse, consultant, neonate
        $nurse = User::factory()->create([
            'name' => 'Nurse Joyce',
            'role' => 'Nurse',
            'status' => 'Approved',
        ]);

        $consultant = User::factory()->create([
            'name' => 'Dr. Alvin Mutie',
            'role' => 'Consultant Pediatrician',
            'status' => 'Approved',
        ]);

        $neonateId = DB::table('neonates')->insertGetId([
            'hospital_number' => 'NBU-TEST-2026',
            'name' => 'Baby Ya Baba',
            'dob' => '2026-05-18',
            'gender' => 'Male',
            'birth_weight' => 3.2,
            'current_weight' => 3.1,
            'gestational_age' => 37,
            'mother_phone' => '+254700000000',
            'admission_diagnosis' => 'Healthy Neonate',
            'history' => 'Born via normal delivery.',
            'status' => 'Stable',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // Act: Post handover data as the nurse
        $response = $this->actingAs($nurse)->post('/handovers', [
            'neonateId' => $neonateId,
            'shift' => 'Morning',
            'clinicalLeadId' => $consultant->id,
            'temperature' => 36.8,
            'sugarLevel' => 4.5,
            'oxygenSaturation' => 98,
            'heartRate' => 140,
            'respiratoryRate' => 42,
            'fbc' => 'Hb 14.2 g/dL',
            'kidney' => 'Urea 3.0 mmol/L',
            'liver' => 'Bilirubin 110 umol/L',
            'commentary' => 'Baby is active, feeding well via NG tube.',
            'plan' => 'Maintain feeding and monitor vitals.',
        ]);

        // Assert: Successful redirect back
        $response->assertRedirect();

        // Assert: Data persisted in handovers table
        $this->assertDatabaseHas('handovers', [
            'neonate_id' => $neonateId,
            'nurse_on_duty_id' => $nurse->id,
            'clinical_lead_id' => $consultant->id,
            'shift' => 'Morning',
            'temperature' => 36.8,
            'sugar_level' => 4.5,
            'oxygen_saturation' => 98,
            'heart_rate' => 140,
            'respiratory_rate' => 42,
            'commentary' => 'Baby is active, feeding well via NG tube.',
            'plan' => 'Maintain feeding and monitor vitals.',
        ]);

        // Assert: Audit log captured with correct columns (user_id instead of user_name!)
        $this->assertDatabaseHas('audit_logs', [
            'user_id' => $nurse->id,
            'type' => 'Medication', // Custom category for audit events
        ]);
        
        $log = DB::table('audit_logs')->where('user_id', $nurse->id)->first();
        $this->assertStringContainsString('Baby Ya Baba', $log->action);
        $this->assertStringContainsString('Joyce', $log->action);
    }

    /**
     * Test scheduling a duty rota successfully.
     */
    public function test_scheduling_duty_rota_with_assigned_nurses()
    {
        // 1. Arrange: Create admin, consultant, manager, and ward nurses
        $admin = User::factory()->create([
            'name' => 'Chief Admin',
            'role' => 'ICT / IT Support',
            'status' => 'Approved',
        ]);

        $consultant = User::factory()->create([
            'name' => 'Dr. Mutie',
            'role' => 'Consultant Pediatrician',
            'status' => 'Approved',
        ]);

        $manager = User::factory()->create([
            'name' => 'Sister Mary',
            'role' => 'Nursing In-Charge',
            'status' => 'Approved',
        ]);

        $nurseA = User::factory()->create([
            'name' => 'Nurse Alice',
            'role' => 'Nurse',
            'status' => 'Approved',
        ]);

        $nurseB = User::factory()->create([
            'name' => 'Nurse Bob',
            'role' => 'Nurse',
            'status' => 'Approved',
        ]);

        // Act: Post rota data as the admin
        $response = $this->actingAs($admin)->post('/rotas', [
            'date' => '2026-05-20',
            'shift' => 'Afternoon',
            'consultantId' => $consultant->id,
            'managerId' => $manager->id,
            'assignedNurses' => [$nurseA->id, $nurseB->id],
        ]);

        // Assert: Success redirect
        $response->assertRedirect();

        // Assert: Rota persisted
        $this->assertDatabaseHas('rotas', [
            'date' => '2026-05-20',
            'shift' => 'Afternoon',
            'consultant_id' => $consultant->id,
            'manager_id' => $manager->id,
            'created_by' => $admin->id,
        ]);

        $rota = DB::table('rotas')->first();

        // Assert: Assigned nurses linked in pivot table
        $this->assertDatabaseHas('rota_user', [
            'rota_id' => $rota->id,
            'user_id' => $nurseA->id,
        ]);

        $this->assertDatabaseHas('rota_user', [
            'rota_id' => $rota->id,
            'user_id' => $nurseB->id,
        ]);
    }
}

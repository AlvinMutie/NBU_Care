<?php

namespace Tests\Feature\Auth;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class RegistrationTest extends TestCase
{
    use RefreshDatabase;

    public function test_registration_screen_can_be_rendered(): void
    {
        $response = $this->get('/register');

        $response->assertStatus(200);
    }

    public function test_new_users_can_register(): void
    {
        \Illuminate\Support\Facades\DB::table('preauthorized_staff')->insert([
            'hospital_id' => 'HOSP-1234',
            'role' => 'Nurse',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $response = $this->post('/register', [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => 'password',
            'password_confirmation' => 'password',
            'hospital_id' => 'HOSP-1234',
        ]);

        $this->assertDatabaseHas('users', [
            'email' => 'test@example.com',
            'hospital_id' => 'HOSP-1234',
            'status' => 'Pending',
        ]);
        $response->assertRedirect(route('pending-approval'));
    }
}

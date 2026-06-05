<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('neonates', function (Blueprint $table) {
            $table->time('birth_time')->nullable()->after('dob');
            $table->string('delivery_method')->nullable();
            $table->integer('apgar_1')->nullable();
            $table->integer('apgar_5')->nullable();
            $table->integer('apgar_10')->nullable();
            $table->string('place_of_birth')->nullable();
            $table->string('current_unit')->default('NICU');
            $table->string('bed_number')->nullable();
            $table->foreignId('assigned_nurse_id')->nullable()->constrained('users')->nullOnDelete();
            $table->foreignId('consultant_id')->nullable()->constrained('users')->nullOnDelete();
        });

        Schema::create('maternal_profiles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('neonate_id')->constrained()->onDelete('cascade');
            $table->string('mother_name')->nullable();
            $table->string('mother_hospital_number')->nullable();
            $table->integer('mother_age')->nullable();
            $table->string('mother_contact')->nullable();
            $table->integer('gravidity')->nullable();
            $table->integer('parity')->nullable();
            $table->integer('prev_neonatal_deaths')->default(0);
            $table->integer('stillbirths')->default(0);
            $table->integer('preterm_deliveries')->default(0);
            $table->json('medical_history')->nullable(); // HIV, DM, etc.
            $table->boolean('anc_attendance')->default(false);
            $table->boolean('steroids_given')->default(false);
            $table->text('infections')->nullable();
            $table->integer('prom_duration_hours')->nullable();
            $table->text('pregnancy_complications')->nullable();
            $table->string('mode_of_delivery')->nullable();
            $table->boolean('resuscitation_at_birth')->default(false);
            $table->boolean('meconium_presence')->default(false);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('maternal_profiles');
        Schema::table('neonates', function (Blueprint $table) {
            $table->dropColumn([
                'birth_time', 'delivery_method', 'apgar_1', 'apgar_5', 'apgar_10', 
                'place_of_birth', 'current_unit', 'bed_number', 
                'assigned_nurse_id', 'consultant_id'
            ]);
        });
    }
};

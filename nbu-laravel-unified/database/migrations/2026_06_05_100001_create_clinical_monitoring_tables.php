<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // TIME-SERIES VITALS
        Schema::create('vitals', function (Blueprint $table) {
            $table->id();
            $table->foreignId('neonate_id')->constrained()->onDelete('cascade');
            $table->foreignId('user_id')->nullable()->constrained('users')->nullOnDelete();
            $table->decimal('temperature', 4, 1)->nullable();
            $table->integer('heart_rate')->nullable();
            $table->integer('respiratory_rate')->nullable();
            $table->integer('oxygen_saturation')->nullable();
            $table->decimal('blood_sugar', 4, 1)->nullable();
            $table->timestamp('measured_at')->useCurrent();
            $table->timestamps();

            $table->index(['neonate_id', 'measured_at']);
        });

        // WEIGHT TRENDS
        Schema::create('weight_logs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('neonate_id')->constrained()->onDelete('cascade');
            $table->decimal('weight_kg', 5, 3);
            $table->timestamp('measured_at')->useCurrent();
            $table->timestamps();

            $table->index(['neonate_id', 'measured_at']);
        });

        // CLINICAL ASSESSMENTS (Systematic Reviews)
        Schema::create('clinical_assessments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('neonate_id')->constrained()->onDelete('cascade');
            $table->foreignId('user_id')->constrained('users');
            $table->string('primary_diagnosis')->nullable();
            $table->text('working_diagnosis')->nullable();
            $table->text('differential_diagnosis')->nullable();
            $table->json('systems_review')->nullable(); // neuro, respiratory, cvs, gi, skin
            $table->timestamps();
        });

        // EVENT-BASED CLINICAL NOTES
        Schema::create('clinical_notes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('neonate_id')->constrained()->onDelete('cascade');
            $table->foreignId('user_id')->constrained('users');
            $table->enum('note_type', ['Nurse', 'MO', 'Consultant', 'Specialist'])->default('Nurse');
            $table->text('content');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('clinical_notes');
        Schema::dropIfExists('clinical_assessments');
        Schema::dropIfExists('weight_logs');
        Schema::dropIfExists('vitals');
    }
};

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('handovers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('neonate_id')->constrained('neonates')->cascadeOnDelete();
            $table->timestamp('date')->useCurrent();
            $table->enum('shift', ['Morning', 'Afternoon', 'Night']);
            $table->foreignId('clinical_lead_id')->nullable()->constrained('users')->nullOnDelete();
            $table->foreignId('nurse_on_duty_id')->nullable()->constrained('users')->nullOnDelete();
            $table->text('commentary')->nullable();
            
            // Patient Vitals
            $table->decimal('temperature', 4, 1)->nullable();
            $table->decimal('sugar_level', 4, 1)->nullable();
            $table->unsignedSmallInteger('oxygen_saturation')->nullable();
            $table->unsignedSmallInteger('heart_rate')->nullable();
            $table->unsignedSmallInteger('respiratory_rate')->nullable();
            
            // Investigations & Treatments
            $table->jsonb('investigations')->nullable();
            $table->jsonb('medications_given')->nullable();
            $table->text('plan')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('handovers');
    }
};

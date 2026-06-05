<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // LAB INVESTIGATIONS
        Schema::create('lab_results', function (Blueprint $table) {
            $table->id();
            $table->foreignId('neonate_id')->constrained()->onDelete('cascade');
            $table->string('test_name'); // FBC, CRP, CRP, Bilirubin, etc.
            $table->json('result_data')->nullable(); // For multiple values like RFTs
            $table->string('summary_value')->nullable(); // Main result if single
            $table->string('unit')->nullable();
            $table->string('reference_range')->nullable();
            $table->enum('status', ['Pending', 'Completed', 'Flagged']).default('Pending');
            $table->timestamp('ordered_at')->useCurrent();
            $table->timestamp('result_at')->nullable();
            $table->timestamps();
        });

        // IMAGING RECORDS
        Schema::create('imaging_records', function (Blueprint $table) {
            $table->id();
            $table->foreignId('neonate_id')->constrained()->onDelete('cascade');
            $table->enum('type', ['CXR', 'Cranial Ultrasound', 'Echo', 'Other']);
            $table->text('findings')->nullable();
            $table->string('image_path')->nullable();
            $table->timestamp('performed_at')->useCurrent();
            $table->timestamps();
        });

        // TREATMENT MODULE (Medications & Fluids)
        Schema::create('treatments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('neonate_id')->constrained()->onDelete('cascade');
            $table->foreignId('prescriber_id')->constrained('users');
            $table->string('item_name');
            $table->enum('type', ['Medication', 'Fluid', 'Feeding']);
            $table->decimal('dose_mg_kg', 8, 2)->nullable();
            $table->string('calculated_dose')->nullable();
            $table->string('volume')->nullable();
            $table->string('route')->nullable();
            $table->string('frequency')->nullable();
            $table->decimal('fluid_rate_ml_kg_day', 6, 2)->nullable();
            $table->timestamp('start_date')->useCurrent();
            $table->timestamp('end_date')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        // ALERTS SYSTEM
        Schema::create('alerts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('neonate_id')->constrained()->onDelete('cascade');
            $table->enum('type', ['Hypoglycemia', 'Sepsis', 'Desaturation', 'DrugSafety', 'ClinicalBoundary']);
            $table->enum('severity', ['Info', 'Warning', 'Critical'])->default('Warning');
            $table->text('message');
            $table->boolean('is_resolved')->default(false);
            $table->foreignId('resolved_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('alerts');
        Schema::dropIfExists('treatments');
        Schema::dropIfExists('imaging_records');
        Schema::dropIfExists('lab_results');
    }
};

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
        Schema::create('neonates', function (Blueprint $table) {
            $table->id();
            $table->string('hospital_number')->unique();
            $table->string('name');
            $table->date('dob');
            $table->enum('gender', ['Male', 'Female', 'Other']);
            $table->decimal('birth_weight', 5, 3);
            $table->decimal('current_weight', 5, 3);
            $table->unsignedTinyInteger('gestational_age');
            $table->text('admission_diagnosis')->nullable();
            $table->text('clinical_history')->nullable();
            $table->enum('status', ['Stable', 'Critical', 'Serious', 'Discharged'])->default('Stable');
            $table->string('mother_name')->nullable();
            $table->string('mother_phone')->nullable();
            $table->boolean('active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('neonates');
    }
};

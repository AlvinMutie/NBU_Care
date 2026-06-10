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
        Schema::table('users', function (Blueprint $table) {
            $table->integer('quiz_streak')->default(0);
            $table->date('last_quiz_date')->nullable();
            $table->decimal('calculation_accuracy', 5, 2)->default(0.00);
            $table->integer('total_calculations')->default(0);
            $table->integer('correct_calculations')->default(0);
            $table->string('clinical_rotation_year')->nullable();
        });

        Schema::table('neonates', function (Blueprint $table) {
            $table->foreignId('user_id')->nullable()->constrained()->onDelete('cascade');
            $table->boolean('is_simulated')->default(false);
            $table->string('case_scenario_type')->nullable(); // e.g., 'Extreme Prematurity', 'Neonatal Jaundice', etc.
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'quiz_streak', 
                'last_quiz_date', 
                'calculation_accuracy', 
                'total_calculations', 
                'correct_calculations',
                'clinical_rotation_year'
            ]);
        });

        Schema::table('neonates', function (Blueprint $table) {
            $table->dropForeign(['user_id']);
            $table->dropColumn(['user_id', 'is_simulated', 'case_scenario_type']);
        });
    }
};

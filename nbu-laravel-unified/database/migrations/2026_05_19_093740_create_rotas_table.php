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
        Schema::create('rotas', function (Blueprint $table) {
            $table->id();
            $table->date('date');
            $table->enum('shift', ['Morning', 'Afternoon', 'Night']);
            $table->foreignId('consultant_id')->nullable()->constrained('users')->nullOnDelete();
            $table->foreignId('manager_id')->nullable()->constrained('users')->nullOnDelete();
            $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();

            // Enforce unique rota per shift and date
            $table->unique(['date', 'shift']);
        });

        // Pivot table for nurses assigned to a rota
        Schema::create('rota_user', function (Blueprint $table) {
            $table->foreignId('rota_id')->constrained('rotas')->cascadeOnDelete();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->primary(['rota_id', 'user_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rota_user');
        Schema::dropIfExists('rotas');
    }
};

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
            $table->foreignId('neonate_id')->constrained('neonates')->onDelete('cascade');
            $table->foreignId('nurse_id')->constrained('users');
            $table->text('clinical_status');
            $table->text('vitals_snapshot'); // JSON or summarized text
            $table->text('investigations')->nullable();
            $table->text('treatment_plan');
            $table->string('shift_type'); // Morning, Afternoon, Night
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

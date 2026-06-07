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
            $table->string('gender'); // [Male, Female, Other]
            $table->decimal('birth_weight', 8, 3);
            $table->decimal('current_weight', 8, 3);
            $table->integer('gestational_age'); // weeks
            $table->integer('apgar_1')->nullable();
            $table->integer('apgar_5')->nullable();
            $table->integer('apgar_10')->nullable();
            $table->string('place_of_birth')->nullable();
            $table->string('delivery_method')->nullable();
            $table->string('status')->default('Stable'); // [Stable, Critical, Serious, Discharged]
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

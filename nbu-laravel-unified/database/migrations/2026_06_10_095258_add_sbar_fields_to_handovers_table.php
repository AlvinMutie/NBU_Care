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
        Schema::table('handovers', function (Blueprint $table) {
            $table->text('situation')->nullable();
            $table->text('background')->nullable();
            $table->text('assessment')->nullable();
            $table->text('recommendation')->nullable();
            $table->boolean('is_guided')->default(false);
            $table->json('guided_responses')->nullable(); // For storing answers to guided questions
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('handovers', function (Blueprint $table) {
            $table->dropColumn(['situation', 'background', 'assessment', 'recommendation', 'is_guided', 'guided_responses']);
        });
    }
};

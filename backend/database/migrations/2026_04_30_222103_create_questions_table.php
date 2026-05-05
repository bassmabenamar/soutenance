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
   Schema::create('questions', function (Blueprint $table) {
    $table->id();

    // 🔥 MUST match BIGINT UNSIGNED
    $table->unsignedBigInteger('q_c_m_id');

    $table->text('question');
    $table->string('option_a');
    $table->string('option_b');
    $table->string('option_c');
    $table->string('option_d');
    $table->string('correct_answer');

    $table->timestamps();

    // 🔥 FOREIGN KEY (safe version)
    $table->foreign('q_c_m_id')
          ->references('id')
          ->on('q_c_m_s')
          ->onDelete('cascade');
});
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('questions');
    }
};

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
    Schema::create('results', function (Blueprint $table) {
    $table->id();

    // 🔥 MUST match BIGINT UNSIGNED
    $table->unsignedBigInteger('user_id');
    $table->unsignedBigInteger('q_c_m_id');

    $table->integer('score');

    $table->timestamps();

    // 🔥 FOREIGN KEYS (manual safe version)
    $table->foreign('user_id')
        ->references('id')
        ->on('users')
        ->onDelete('cascade');

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
        Schema::dropIfExists('results');
    }
};

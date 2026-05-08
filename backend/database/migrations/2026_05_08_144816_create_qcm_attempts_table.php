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
        Schema::create('qcm_attempts', function (Blueprint $table) {
           $table->id();
    $table->foreignId('user_id')->constrained()->onDelete('cascade');
    $table->foreignId('qcm_id')->constrained()->onDelete('cascade');

    $table->integer('score')->default(0);
    $table->string('status')->default('in_progress');

    $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('qcm_attempts');
    }
};

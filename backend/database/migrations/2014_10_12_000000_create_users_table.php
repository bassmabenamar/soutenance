<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {

            $table->id(); // 🔥 REQUIRED

            $table->string('name');
            $table->string('access_code')->unique();
            $table->string('role')->default('student');
            $table->string('status')->default('Actif'); // Actif or Bloqué
            $table->integer('progress')->default(0);    // Progress percentage
            $table->rememberToken();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
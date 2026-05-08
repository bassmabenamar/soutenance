<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {

            $table->id();

            // REQUIRED FOR AUTH
            $table->string('name');
           
            $table->string('password');

            // YOUR CUSTOM FIELDS
            $table->string('access_code')->unique()->nullable();
            $table->string('role')->default('student');
            $table->string('device_id')->nullable();
            $table->boolean('is_active')->default(true);

            $table->rememberToken();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
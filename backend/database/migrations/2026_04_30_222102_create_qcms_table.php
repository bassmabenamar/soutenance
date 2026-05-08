<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('qcms', function (Blueprint $table) {
            $table->id();

            $table->foreignId('language_id')
                ->constrained()
                ->onDelete('cascade');

            $table->string('title');
            $table->string('status')->default('ACTIVE');
            $table->integer('time_limit')->nullable();
$table->json('questions');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('qcms');
    }
};
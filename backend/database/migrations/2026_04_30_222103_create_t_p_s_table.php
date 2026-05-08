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
        Schema::create('tps', function (Blueprint $table) {
      $table->id();
        $table->string('title');
        $table->string('category');
        $table->string('difficulty');
        $table->text('description');
        $table->longText('instructions')->nullable();
        $table->integer('estimated_time');

        $table->boolean('is_published')->default(false);
        $table->boolean('auto_correction')->default(true);

        $table->string('file_path')->nullable(); // PDF
        $table->string('thumbnail')->nullable(); // image

        $table->timestamps();
});
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('t_p_s');
    }
};

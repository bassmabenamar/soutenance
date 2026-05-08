<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Course;
use App\Models\Language;

class CourseSeeder extends Seeder
{
    public function run(): void
    {
        $html = Language::where('title', 'HTML')->first();

        Course::create([
            'title' => 'HTML Basics',
            'description' => 'Learn HTML from zero',
            'language_id' => $html->id
        ]);
    }
}
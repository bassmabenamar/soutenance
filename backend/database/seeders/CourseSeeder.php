<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Course;

class CourseSeeder extends Seeder
{
    public function run(): void
    {
        Course::create([
            'title' => 'HTML Course',
            'description' => 'Learn HTML from zero'
        ]);

        Course::create([
            'title' => 'CSS Course',
            'description' => 'Learn CSS basics and advanced'
        ]);
    }
}
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
            'language_id' => 1,
            'level' => 'Débutant',
            'description' => 'Learn HTML from zero',
            'file_path' => 'courses/html.pdf',
            'file_size' => '2.1 MB'
        ]);

        Course::create([
            'title' => 'CSS Course',
            'language_id' => 2,
            'level' => 'Intermédiaire',
            'description' => 'Learn CSS basics and advanced',
            'file_path' => 'courses/css.pdf',
            'file_size' => '3.4 MB'
        ]);

        Course::create([
            'title' => 'JavaScript Course',
            'language_id' => 3,
            'level' => 'Avancé',
            'description' => 'Master JavaScript step by step',
            'file_path' => 'courses/js.pdf',
            'file_size' => '4.2 MB'
        ]);
    }
}
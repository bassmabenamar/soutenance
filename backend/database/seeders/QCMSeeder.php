<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\QCM;

class QCMSeeder extends Seeder
{
    public function run(): void
    {
        $qcm = QCM::create([
            'title' => 'HTML Basics',
            'category' => 'HTML',
            'status' => 'published'
        ]);

        $qcm->questions()->createMany([
            [
                'question' => 'What does HTML stand for?',
                'option_a' => 'Hyper Text Markup Language',
                'option_b' => 'Home Tool Markup Language',
                'option_c' => 'Hyperlinks Text Mark Language',
                'option_d' => 'None',
                'correct_answer' => 'A'
            ],
            [
                'question' => 'Which tag is for title?',
                'option_a' => '<h1>',
                'option_b' => '<title>',
                'option_c' => '<head>',
                'option_d' => '<meta>',
                'correct_answer' => 'B'
            ]
        ]);
    }
}
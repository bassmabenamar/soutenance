<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\QCM;
use App\Models\Language;

class QcmSeeder extends Seeder
{
    public function run(): void
    {
        // Get first language (or create fallback)
        $language = Language::first();

        if (!$language) {
            $language = Language::create([
                'name' => 'JavaScript'
            ]);
        }

        QCM::create([
            'language_id' => $language->id,
            'title' => 'JavaScript Basics Quiz',
            'category' => 'Développement Web',
            'time_limit' => 15,
            'status' => 'ACTIVE',
            'questions' => [
                [
                    'question_text' => 'What is JavaScript?',
                    'options' => [
                        'Programming Language',
                        'Database',
                        'Operating System',
                        'Server'
                    ],
                    'correct_answer_index' => 0
                ],
                [
                    'question_text' => 'Which keyword declares a variable?',
                    'options' => [
                        'var',
                        'echo',
                        'print',
                        'define'
                    ],
                    'correct_answer_index' => 0
                ],
                [
                    'question_text' => 'Which company created JavaScript?',
                    'options' => [
                        'Microsoft',
                        'Netscape',
                        'Google',
                        'Apple'
                    ],
                    'correct_answer_index' => 1
                ]
            ]
        ]);

        QCM::create([
            'language_id' => $language->id,
            'title' => 'HTML Fundamentals',
            'category' => 'Développement Web',
            'time_limit' => 10,
            'status' => 'ACTIVE',
            'questions' => [
                [
                    'question_text' => 'What does HTML stand for?',
                    'options' => [
                        'Hyper Text Markup Language',
                        'Home Tool Markup Language',
                        'Hyperlinks Text Machine Language',
                        'None'
                    ],
                    'correct_answer_index' => 0
                ],
                [
                    'question_text' => 'Which tag is used for a paragraph?',
                    'options' => [
                        '<p>',
                        '<h1>',
                        '<div>',
                        '<span>'
                    ],
                    'correct_answer_index' => 0
                ]
            ]
        ]);
    }
}
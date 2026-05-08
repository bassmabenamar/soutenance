<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Qcm;
use App\Models\Question;

class QuestionSeeder extends Seeder
{
    public function run(): void
    {
        // Get QCM (example: HTML QCM)
        $qcm = Qcm::first(); // or Qcm::find(1)

        if (!$qcm) return;

        /*
        =========================
        QUESTION 1
        =========================
        */
        $q1 = Question::create([
            'qcm_id' => $qcm->id,
            'question_text' => 'What does HTML stand for?',
            'code_snippet' => null,
        ]);

        $q1->options()->createMany([
            [
                'option_text' => 'Hyper Text Markup Language',
                'is_correct' => true,
            ],
            [
                'option_text' => 'Home Tool Markup Language',
                'is_correct' => false,
            ],
            [
                'option_text' => 'Hyperlinks Text Management Language',
                'is_correct' => false,
            ],
            [
                'option_text' => 'High Text Machine Language',
                'is_correct' => false,
            ],
        ]);

        /*
        =========================
        QUESTION 2
        =========================
        */
        $q2 = Question::create([
            'qcm_id' => $qcm->id,
            'question_text' => 'Which tag is used for a paragraph in HTML?',
            'code_snippet' => null,
        ]);

        $q2->options()->createMany([
            [
                'option_text' => '<p>',
                'is_correct' => true,
            ],
            [
                'option_text' => '<h1>',
                'is_correct' => false,
            ],
            [
                'option_text' => '<div>',
                'is_correct' => false,
            ],
            [
                'option_text' => '<span>',
                'is_correct' => false,
            ],
        ]);

        /*
        =========================
        QUESTION 3 (CODE)
        =========================
        */
        $q3 = Question::create([
            'qcm_id' => $qcm->id,
            'question_text' => 'What is the output of console.log(typeof []) in JavaScript?',
            'code_snippet' => 'console.log(typeof []);',
        ]);

        $q3->options()->createMany([
            [
                'option_text' => '"object"',
                'is_correct' => true,
            ],
            [
                'option_text' => '"array"',
                'is_correct' => false,
            ],
            [
                'option_text' => '"list"',
                'is_correct' => false,
            ],
            [
                'option_text' => '"undefined"',
                'is_correct' => false,
            ],
        ]);
    }
}
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\QCM;
use App\Models\Result;
use Illuminate\Support\Facades\Auth;

class QcmController extends Controller
{
    // =========================
    // LIST LANGUAGES (FROM DB)
    // =========================
    public function languages()
    {
        $qcms = QCM::with('language')->get();

        $languages = $qcms->map(function ($qcm) {
            return [
                "id" => $qcm->language_id,
                "title" => $qcm->language->name ?? "Unknown",
                "icon_name" => "Globe",
                "color" => "bg-orange-500",
                "count" => is_array($qcm->questions) ? count($qcm->questions) : 0
            ];
        });

        return response()->json($languages);
    }

    // =========================
    // GET QCM BY LANGUAGE
    // =========================
    public function getByLanguage($languageId)
    {
        $qcm = QCM::where('language_id', $languageId)->first();

        if (!$qcm) {
            return response()->json([
                'message' => 'No QCM found for this language'
            ], 404);
        }

        return response()->json([
            'id' => $qcm->id,
            'title' => $qcm->title,
            'time_limit' => $qcm->time_limit,
            'questions' => $qcm->questions ?? []
        ]);
    }

    // =========================
    // SUBMIT QCM
    // =========================
    public function submit(Request $request)
    {
        $request->validate([
            'qcm_id' => 'required|exists:qcms,id',
            'answers' => 'required|array'
        ]);

        $qcm = QCM::findOrFail($request->qcm_id);

        $questions = $qcm->questions ?? [];
        $answers = $request->answers;

        $score = 0;
        $total = count($questions);

        foreach ($questions as $index => $question) {

    $qid = $index;

    // correct answer index from database
    $correctIndex = $question['correct_answer_index'];

    // selected answer from frontend
    $selectedAnswer = $answers[$qid] ?? null;

    // correct answer text
    $correctAnswer = $question['options'][$correctIndex];

    if ($selectedAnswer === $correctAnswer) {
        $score++;
    }
}
        $passed = $total > 0 ? ($score >= ($total / 2)) : false;

        $result = Result::create([
            'user_id' => Auth::id(),
            'qcm_id' => $qcm->id,
            'score' => $score,
            'passed' => $passed
        ]);

        return response()->json([
            'message' => 'Quiz submitted successfully',
            'score' => $score,
            'total' => $total,
            'passed' => $passed
        ]);
    }
}
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
                "title" => $qcm->language->title ?? "Unknown",
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

    // correct answer index from DB
    $correctIndex = (int) $question['correct_answer_index'];

    // selected answer from frontend
    $selectedIndex = $answers[$index] ?? null;

    // compare index with index
    if ($selectedIndex !== null && (int)$selectedIndex === $correctIndex) {
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
    // =========================
// ADMIN - GET ALL QCM
// =========================
public function index()
{
    return response()->json(QCM::all());
}

// =========================
// ADMIN - CREATE QCM
// =========================
public function store(Request $request)
{
    $qcm = QCM::create([
        'title' => $request->title,
        'language_id' => $request->language_id,
        'time_limit' => $request->time_limit,
        'questions' => $request->questions
    ]);

    return response()->json([
        'message' => 'QCM created successfully',
        'data' => $qcm
    ]);
}

// =========================
// ADMIN - DELETE QCM
// =========================
public function destroy($id)
{
    QCM::findOrFail($id)->delete();

    return response()->json([
        'message' => 'QCM deleted successfully'
    ]);
}
}
<?php

namespace App\Http\Controllers;

use App\Models\QCM;
use App\Models\Question;

use Illuminate\Http\Request;
use App\Models\Result;
use App\Models\Device;

class QCMController extends Controller
{
    public function index()
    {
        return QCM::with('questions')->get();
    }

    public function store(Request $request)
    {
        $qcm = QCM::create($request->only(['title', 'category']));

        foreach ($request->questions as $q) {
            $qcm->questions()->create($q);
        }

        return $qcm;
    }

    public function submit(Request $request)
    {
        $score = 0;

        foreach ($request->answers as $ans) {
            $q = Question::find($ans['question_id']);

            if ($q && $q->correct_answer === $ans['answer']) {
                $score++;
            }
        }

        Result::create([
            'user_id' => auth()->id(),
            'q_c_m_id' => $request->qcm_id,
            'score' => $score
        ]);

        return ['score' => $score];
    }

 public function results()
{
    $user = auth()->user();

    return [
        'auth_user' => $user,
        'user_class' => get_class($user),
        'results' => Result::with('qcm')
            ->where('user_id', auth()->id())
            ->get()
    ];
}
}
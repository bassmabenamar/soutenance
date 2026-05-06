<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\QCM;
use App\Models\Question;
use Illuminate\Support\Facades\DB;

class QCMController extends Controller
{
    // STORE QCM + QUESTIONS
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'required|string',
            'questions' => 'required|array|min:1',
        ]);

        DB::beginTransaction();

        try {
            // CREATE QCM
            $qcm = QCM::create([
                'title' => $request->title,
                'category' => $request->category,
                'status' => 'published'
            ]);

            // LOOP QUESTIONS
            foreach ($request->questions as $q) {

                $options = $q['options'];

                Question::create([
                    'q_c_m_id' => $qcm->id,
                    'question' => $q['question_text'],
                    'option_a' => $options[0],
                    'option_b' => $options[1],
                    'option_c' => $options[2],
                    'option_d' => $options[3],
                    'correct_answer' => ['A','B','C','D'][$q['correct_answer_index']]
                ]);
            }

            DB::commit();

            return response()->json([
                'message' => 'QCM créé avec succès'
            ], 201);

        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'message' => 'Erreur',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    
    public function index()
{
    return QCM::select('id','title','category','status')->get();
}
    public function adminIndex()
{
    $quizzes = QCM::withCount('questions')->get()->map(function($q) {
        return [
            'id' => $q->id,
            'title' => $q->title,
            'status' => strtoupper($q->status),
            'qs' => $q->questions_count,
            'resp' => "0",
            'success' => "0%",
            'category' => $q->category
        ];
    });

    return response()->json($quizzes);
}
public function destroy($id)
{
    $qcm = QCM::findOrFail($id);
    $qcm->delete();

    return response()->json([
        'message' => 'QCM supprimé avec succès'
    ]);
}
public function languages()
{
    return QCM::select('category')
        ->selectRaw('COUNT(*) as count')
        ->groupBy('category')
        ->get()
        ->map(function ($item) {
            return [
                'id' => strtolower($item->category),
                'title' => $item->category,
                'count' => $item->count,
                'icon_name' => 'Globe',
                'color' => 'bg-orange-500'
            ];
        });
}
public function getByCategory($category)
{
    return QCM::with('questions')
        ->whereRaw('LOWER(category) = ?', [$category])
        ->firstOrFail();
}
}
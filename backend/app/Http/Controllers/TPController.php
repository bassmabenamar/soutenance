<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\TP;

class TPController extends Controller
{
    // GET ALL TPs + STATS
    public function index()
    {
        $tps = TP::all();

        return response()->json([
            'tps' => $tps,
            'stats' => [
                'total' => TP::count(),
                'averageDifficulty' => 'Intermédiaire', // you can calculate real logic later
                'activeStudents' => 120 // replace with real relation later
            ]
        ]);
    }

    // CREATE TP (IMPORTANT FIX for your error "time limit required")
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'category' => 'required',
            'difficulty' => 'required',
            'description' => 'required',
            'instructions' => 'required',
            'estimated_time' => 'required|integer', // 🔥 THIS FIXES YOUR ERROR
        ]);

        $tp = new TP();

        $tp->title = $request->title;
        $tp->category = $request->category;
        $tp->difficulty = $request->difficulty;
        $tp->description = $request->description;
        $tp->instructions = $request->instructions;
        $tp->estimated_time = $request->estimated_time;
        $tp->auto_correction = $request->auto_correction ? 1 : 0;
$tp->is_published = $request->is_published ? 1 : 0;

        $tp->save();

        return response()->json([
            'message' => 'TP created successfully',
            'tp' => $tp
        ]);
    }

    // DELETE
    public function destroy($id)
    {
        $tp = TP::findOrFail($id);
        $tp->delete();

        return response()->json([
            'message' => 'TP deleted successfully'
        ]);
    }

    // SHOW ONE TP
    public function show($id)
    {
        return TP::findOrFail($id);
    }
}
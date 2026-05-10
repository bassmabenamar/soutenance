<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\TP;
use Illuminate\Support\Facades\Storage;

class TPController extends Controller
{
    // GET ALL TPs + STATS
    public function index(Request $request)
{
    $query = Tp::query();

    // FILTER CATEGORY
    if ($request->category) {
        $query->where('category', $request->category);
    }

    $tps = $query->latest()->get();

    return response()->json([
        'tps' => $tps,
        'stats' => [
            'total' => Tp::count(),
            'averageDifficulty' => 'Intermédiaire',
            'activeStudents' => 120
        ]
    ]);
}
    // CREATE TP (IMPORTANT FIX for your error "time limit required")
    public function store(Request $request)
{
    $request->validate([
        'title' => 'required',
        'description' => 'required',
        'tp_file' => 'nullable|mimes:pdf|max:20480',
        'thumbnail' => 'nullable|image',
    ]);

    $filePath = null;
    $thumbnailPath = null;

    // PDF
    if ($request->hasFile('tp_file')) {
        $filePath = $request->file('tp_file')
            ->store('tp', 'public');
    }

    // Thumbnail
    if ($request->hasFile('thumbnail')) {
        $thumbnailPath = $request->file('thumbnail')
            ->store('thumbnails', 'public');
    }

    $tp = Tp::create([
        'title' => $request->title,
        'category' => $request->category,
        'difficulty' => $request->difficulty,
        'description' => $request->description,
        'instructions' => $request->instructions,
        'estimated_time' => $request->estimated_time,
        'is_published' => $request->is_published,
        'auto_correction' => $request->auto_correction,

        // IMPORTANT
        'file_path' => $filePath,
        'thumbnail' => $thumbnailPath,
    ]);

    return response()->json([
        'message' => 'TP créé avec succès',
        'tp' => $tp
    ]);
}
    // DELETE
    public function destroy($id)
{
    $tp = Tp::findOrFail($id);

    // DELETE PDF
    if ($tp->file_path) {
       Storage::disk('public')->delete($tp->file_path);
    }

    // DELETE THUMBNAIL
    if ($tp->thumbnail) {
        Storage::disk('public')->delete($tp->thumbnail);
    }

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
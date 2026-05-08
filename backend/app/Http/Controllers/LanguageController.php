<?php


namespace App\Http\Controllers;

use App\Models\Language;

use Illuminate\Http\Request;

class LanguageController extends Controller
{
    // GET /api/languages
    public function index()
    {
        return response()->json(
            Language::all()
        );
    }

    // CREATE (admin only later)
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string',
            'icon_name' => 'nullable|string',
            'color' => 'nullable|string',
        ]);

        $language = Language::create($request->all());

        return response()->json($language);
    }
}

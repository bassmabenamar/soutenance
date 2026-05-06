<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Course;
use Illuminate\Support\Facades\Storage;

class CourseController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | 🎓 GET ALL COURSES (Used as Languages List)
    |--------------------------------------------------------------------------
    */
    public function index()
    {
        $courses = Course::latest()->get();

        return response()->json($courses); // ✅ IMPORTANT (no "courses" wrapper)
    }

    /*
    |--------------------------------------------------------------------------
    | 🎯 GET COURSES BY CATEGORY (HTML, CSS, JS...)
    |--------------------------------------------------------------------------
    */
    public function byCategory($category)
    {
        $courses = Course::where('category', $category)->latest()->get();

        return response()->json($courses);
    }

    /*
    |--------------------------------------------------------------------------
    | 📄 GET SINGLE COURSE (PDF DETAIL)
    |--------------------------------------------------------------------------
    */
    public function show($id)
    {
        $course = Course::findOrFail($id);

        return response()->json($course);
    }

    /*
    |--------------------------------------------------------------------------
    | ⬆️ UPLOAD COURSE (ADMIN)
    |--------------------------------------------------------------------------
    */
    public function upload(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'required|string',
            'level' => 'required|string',
            'description' => 'nullable|string',
            'file' => 'required|file|mimes:pdf|max:102400'
        ]);

        // store file
        $path = $request->file('file')->store('courses', 'public');

        // file size
        $size = $request->file('file')->getSize();
        $fileSize = round($size / 1024 / 1024, 2) . ' MB';

        // create course
        $course = Course::create([
            'title' => $request->title,
            'category' => $request->category,
            'level' => $request->level,
            'description' => $request->description,
            'file_path' => $path,
            'file_size' => $fileSize
        ]);

        return response()->json([
            'message' => 'Course uploaded successfully',
            'course' => $course
        ], 201);
    }

    /*
    |--------------------------------------------------------------------------
    | ❌ DELETE COURSE
    |--------------------------------------------------------------------------
    */
    public function destroy($id)
    {
        $course = Course::findOrFail($id);

        if ($course->file_path && Storage::disk('public')->exists($course->file_path)) {
            Storage::disk('public')->delete($course->file_path);
        }

        $course->delete();

        return response()->json([
            'message' => 'Course deleted successfully'
        ]);
    }
    public function languages()
{
    $languages = Course::select('category')
        ->distinct()
        ->get()
        ->map(function ($item) {
            return [
                'id' => strtolower($item->category),
                'title' => $item->category,
                'subtitle' => 'Formation complète',
                'description' => 'Apprenez ' . $item->category . ' avec des cours pratiques et PDF.',
                'level' => 'Tous niveaux',
                'icon_name' => $this->getIcon($item->category),
                'color' => 'from-orange-400 to-orange-600',
                'stats' => 'Modules disponibles'
            ];
        });

    return response()->json($languages);
}
private function getIcon($category)
{
    return match(strtolower($category)) {
        'html' => 'Globe',
        'css' => 'Layout',
        'javascript' => 'Zap',
        'bootstrap' => 'Box',
        default => 'Globe'
    };
}
}
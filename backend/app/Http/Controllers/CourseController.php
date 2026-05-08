<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Course;
use Illuminate\Support\Facades\Storage;

class CourseController extends Controller
{
    // =========================
    // GET ALL COURSES (ADMIN)
    // =========================
    public function index()
    {
        return response()->json([
            'courses' => Course::with('language')->get()
        ]);
    }

    // =========================
    // GET COURSES BY LANGUAGE (FRONTEND)
    // =========================
    public function byLanguage($languageId)
    {
        $courses = Course::where('language_id', $languageId)->get();

        return response()->json([
            'courses' => $courses
        ]);
    }

    // =========================
    // SHOW SINGLE COURSE (PDF VIEWER)
    // =========================
    public function show($id)
    {
        $course = Course::find($id);

        if (!$course) {
            return response()->json([
                'message' => 'Course not found'
            ], 404);
        }

        return response()->json($course);
    }

    // =========================
    // STORE COURSE (UPLOAD PDF)
    // =========================
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string',
            'language_id' => 'required|exists:languages,id',
            'level' => 'required|string',
            'file' => 'required|mimes:pdf|max:20480',
        ]);

        $path = $request->file('file')->store('courses', 'public');

        $course = Course::create([
            'title' => $request->title,
            'language_id' => $request->language_id,
            'level' => $request->level,
            'description' => $request->description,
            'file_path' => $path,
            'category' => $request->category,
        ]);

        return response()->json([
            'message' => 'Course created successfully',
            'course' => $course
        ]);
    }

    // =========================
    // DELETE COURSE
    // =========================
    public function destroy($id)
    {
        $course = Course::findOrFail($id);

        if ($course->file_path) {
            Storage::disk('public')->delete($course->file_path);
        }

        $course->delete();

        return response()->json([
            'message' => 'Course deleted successfully'
        ]);
    }
}
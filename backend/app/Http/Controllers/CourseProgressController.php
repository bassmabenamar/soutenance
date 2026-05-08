<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Course;
use Illuminate\Support\Facades\Storage;

class CourseController extends Controller
{
    public function index()
    {
        return response()->json(Course::all());
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'category' => 'required',
            'level' => 'required',
            'file' => 'required|file|mimes:pdf',
        ]);

        $path = $request->file('file')->store('courses', 'public');

        $course = Course::create([
            'title' => $request->title,
            'category' => $request->category,
            'level' => $request->level,
            'description' => $request->description,
            'file_path' => $path,
        ]);

        return response()->json($course);
    }

    public function destroy($id)
    {
        $course = Course::findOrFail($id);

        if ($course->file_path) {
            Storage::disk('public')->delete($course->file_path);
        }

        $course->delete();

        return response()->json(['message' => 'Deleted successfully']);
    }
}
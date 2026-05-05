<?php

namespace App\Http\Controllers;

use App\Models\Lesson;
use Illuminate\Http\Request;

class LessonController extends Controller
{
    public function store(Request $request)
    {
        return Lesson::create($request->all());
    }
}
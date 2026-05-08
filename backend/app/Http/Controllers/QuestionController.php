<?php

namespace App\Http\Controllers;

use App\Models\Question;

class QuestionController extends Controller
{
    public function store()
    {
        return Question::create(request()->all());
    }

    public function update($id)
    {
        $q = Question::find($id);
        $q->update(request()->all());
        return $q;
    }

    public function destroy($id)
    {
        return Question::destroy($id);
    }
}
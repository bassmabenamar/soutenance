<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\Request;

class BookController extends Controller
{
    public function index()
    {
        return Book::all();
    }

    public function store(Request $request)
    {
        $file = $request->file('file')->store('books');

        return Book::create([
            'title' => $request->title,
            'file' => $file,
            'category' => $request->category
        ]);
    }

    public function destroy($id)
    {
        return Book::destroy($id);
    }
}
<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Book;
use App\Models\QCM;

class AdminController extends Controller
{
    public function stats()
    {
        return [
            'users' => User::count(),
            'books' => Book::count(),
            'qcm' => QCM::count(),
        ];
    }

    public function users()
    {
        return User::all();
    }
}
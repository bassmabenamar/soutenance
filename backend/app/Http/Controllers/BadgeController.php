<?php

namespace App\Http\Controllers;

use App\Models\Badge;

class BadgeController extends Controller
{
    public function index()
    {
        return Badge::all();
    }
}
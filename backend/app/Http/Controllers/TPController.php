<?php

namespace App\Http\Controllers;

use App\Models\TP;
use Illuminate\Http\Request;

class TPController extends Controller
{
    public function index()
    {
        return TP::all();
    }

    public function store(Request $request)
    {
        return TP::create($request->all());
    }

    public function destroy($id)
    {
        return TP::destroy($id);
    }
}
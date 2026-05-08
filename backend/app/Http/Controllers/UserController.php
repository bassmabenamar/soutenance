<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserController extends Controller
{
    // GET ALL USERS
    public function index()
    {
        return response()->json([
            'users' => User::all(),
            'summary' => [
                'total' => User::count(),
                'active' => User::where('is_active', true)->count(),
                'blocked' => User::where('is_active', false)->count(),
                'completion' => 0
            ]
        ]);
    }

    // CREATE USER (NO EMAIL)
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'password' => 'required|min:6',
            'role' => 'required|string',
        ]);

        $user = User::create([
            'name' => $request->name,

            // 🔑 generate access code automatically
            'access_code' => 'STU-' . strtoupper(Str::random(6)),

            'password' => Hash::make($request->password),

            'role' => $request->role ?? 'student',

            'is_active' => true,
        ]);

        return response()->json([
            'message' => 'User created successfully',
            'user' => $user
        ], 201);
    }

    // CHANGE STATUS (Actif / Bloqué)
    public function updateStatus($id, Request $request)
    {
        $user = User::findOrFail($id);

        $user->is_active = $request->status === 'Actif';
        $user->save();

        return response()->json([
            'message' => 'Status updated',
            'user' => $user
        ]);
    }

    // DELETE USER
    public function destroy($id)
    {
        User::findOrFail($id)->delete();

        return response()->json([
            'message' => 'User deleted'
        ]);
    }
}
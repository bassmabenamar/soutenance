<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\UserDevice;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'access_code' => 'required',
            'device_id' => 'required'
        ]);

        $user = User::where('access_code', $request->access_code)->first();

        if (!$user) {
            return response()->json([
                'message' => 'Code invalide'
            ], 401);
        }

        /*
        |-------------------------------------------------
        | ADMIN → no restrictions
        |-------------------------------------------------
        */
        if ($user->role === 'admin') {
            return $this->generateToken($user);
        }

        /*
        |-------------------------------------------------
        | STUDENT DEVICE LIMIT SYSTEM (MAX 3)
        |-------------------------------------------------
        */

        // check if device already exists
        $existingDevice = UserDevice::where('user_id', $user->id)
            ->where('device_id', $request->device_id)
            ->first();

        // count devices
        $devicesCount = UserDevice::where('user_id', $user->id)->count();

        if (!$existingDevice) {

            // BLOCK if more than 3 devices
            if ($devicesCount >= 3) {
                return response()->json([
                    'message' => 'Trop d’appareils connectés (limite 3 atteinte)'
                ], 403);
            }

            // register new device
            UserDevice::create([
                'user_id' => $user->id,
                'device_id' => $request->device_id
            ]);
        }

        return $this->generateToken($user);
    }

    /*
    |-------------------------------------------------
    | GENERATE TOKEN
    |-------------------------------------------------
    */
    private function generateToken($user)
    {
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'token' => $token,
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'role' => strtolower($user->role),
                'access_code' => $user->access_code
            ]
        ]);
    }

    /*
    |-------------------------------------------------
    | LOGOUT
    |-------------------------------------------------
    */
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Déconnexion réussie'
        ]);
    }
}
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\QCM;
use App\Models\Course;
use App\Models\Order;

class AdminController extends Controller
{
    // USERS LIST
    public function users()
    {
        return response()->json([
            'users' => User::all()->map(function ($u) {
                return [
                    'id' => $u->id,
                    'name' => $u->name,
                    'access_code' => $u->access_code,
                    'status' => $u->status,
                    'progress' => rand(20, 100)
                ];
            }),
            'summary' => [
                'total' => User::count(),
                'active' => User::where('status', 'Actif')->count(),
                'completion' => 72,
                'blocked' => User::where('status', 'Bloqué')->count(),
            ]
        ]);
    }

    // PATCH /admin/users/{id}/status
    public function toggleUserStatus(Request $request, $id)
    {
        $user = User::findOrFail($id);
        $user->status = $request->status;
        $user->save();

        return response()->json(['message' => 'Status updated']);
    }

    // DASHBOARD (simple)
    public function dashboard()
    {
        return response()->json([
            'users' => User::count(),
            'qcm' => 10,
            'tp' => 5
        ]);
    }

    // CERTIFICATES STUBS (for your page AddCertificat.jsx)
    public function certificateStats()
    {
        return response()->json([
            'issued' => 120,
            'eligible' => 45
        ]);
    }

    public function certificateEligibility()
    {
        return response()->json(User::all());
    }

    public function generateCertificate($userId)
    {
        return response()->json([
            'message' => "Certificate generated for user $userId"
        ]);
    }

    public function getCertificateRules()
    {
        return response()->json([
            'min_score' => 70
        ]);
    }

    public function updateCertificateRules(Request $request)
    {
        return response()->json([
            'message' => 'Rules updated'
        ]);
    }
     public function stats()
    {
        return response()->json([
            "students_total" => User::where('access_code', 'LIKE', 'STU-%')->count(),
            "pdf_courses" => Course::count(),
            "qcm_total" => QCM::count(),
            "orders_total"=>Order::count(),
            "active_sessions" => User::where('is_active', 1)->count(),
        ]);
    }
}
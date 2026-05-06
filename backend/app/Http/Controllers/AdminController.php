<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Certificate;
use App\Models\Course;
use Barryvdh\DomPDF\Facade\Pdf;

class AdminController extends Controller
{
    public function dashboard()
    {
        return response()->json([
            'students_count' => User::where('role', 'student')->count(),
            'courses_count' => Course::count(),
        ]);    
    }    

    public function stats()
    {
        return response()->json([
            [
                "label" => "ÉTUDIANTS TOTAL",
                "value" => User::where('role','student')->count(),
                "growth" => "+12%",
            ],    
            [
                "label" => "COURS",
                "value" => Course::count(),
                "growth" => "+5",
            ],    
        ]);    
    }    

    public function activities()
    {
        return response()->json([
            [
                "title" => "Nouvel étudiant inscrit",
                "desc" => "Un étudiant s'est inscrit",
                "time" => "2 min",
            ],    
        ]);    
    }    

    public function courses()
    {
        return Course::all();
    }    
    

    // --- Return all students with summary ---
    public function users()
    {
        $students = User::where('role', 'student')->get(['id', 'name', 'email', 'status', 'progress']);

        $summary = [
            'total' => $students->count(),
            'active' => $students->where('status', 'Actif')->count(),
            'completion' => $students->avg('progress') ?? 0,
            'blocked' => $students->where('status', 'Bloqué')->count(),
        ];

        return response()->json([
            'users' => $students,
            'summary' => $summary,
        ]);
    }

    // --- Toggle a student's status ---
    public function toggleUserStatus($id, Request $request)
    {
        $user = User::findOrFail($id);

        $newStatus = $request->status; // 'Actif' or 'Bloqué'
        $user->status = $newStatus;
        $user->save();

        return response()->json(['user' => $user]);
    }
    public function certificateStats()
{
    return response()->json([
        'total' => Certificate::count(),
        'delivered' => Certificate::where('is_delivered', true)->count(),
    ]);
}


public function certificateEligibility()
{
    $students = User::where('role', 'student')->get()->map(function ($s) {
        return [
            'id' => $s->id,
            'name' => $s->name,
            'email' => $s->access_code,  // if you store email there, or add email field
            'progress' => $s->progress,
            'path' => '—',               // optional, replace with actual course/path
            'eligible' => $s->progress >= 80
        ];
    });

    return response()->json($students);
}

public function generateCertificate($userId)
{
    $user = User::findOrFail($userId);

    if ($user->progress < 80) {
        return response()->json(['message' => 'Not eligible'], 403);
    }

    // mark certificate as delivered
    Certificate::updateOrCreate(
        ['user_id' => $userId],
        [
            'progress' => $user->progress,
            'is_eligible' => true,
            'is_delivered' => true
        ]
    );

    $pdf = Pdf::loadView('certificates.template', compact('user'));
return $pdf->download("certificate_{$user->id}.pdf");
}
public function getCertificateRules() {
    // Example static rules, or load from DB
    return response()->json([
        ['label' => 'Minimum Score', 'value' => 80, 'key' => 'min_score'],
        ['label' => 'Course Completion', 'value' => 100, 'key' => 'course_completion'],
    ]);
}

public function updateCertificateRules(Request $request) {
    $rules = $request->rules; // array
    // save to DB or config
    return response()->json(['success' => true]);
}
    
}

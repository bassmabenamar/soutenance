<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\QCM;
use Illuminate\Support\Facades\Auth;
class StudentController extends Controller
{
    public function dashboard()
    {
        $user = auth()->user();

        return response()->json([
            'stats' => [
                'globalProgress' => 38,
                'learningTime' => '24h 45m',
                'weeklyTrend' => '+12%',
                'currentModule' => 3
            ],
            'courses' => [
                ['title' => 'HTML5', 'progress' => 95, 'tag' => 'Presque fini', 'color' => 'bg-orange-500'],
                ['title' => 'CSS Modern', 'progress' => 45, 'tag' => 'En cours', 'color' => 'bg-blue-500'],
                ['title' => 'JavaScript ES6', 'progress' => 12, 'tag' => 'Débutant', 'color' => 'bg-yellow-500'],
                ['title' => 'Bootstrap 5', 'progress' => 0, 'tag' => 'Pas commencé', 'color' => 'bg-slate-200'],
            ],
            'activities' => [
                [
                    'type' => 'quiz',
                    'title' => 'Quiz réussi : Flexbox Mastery',
                    'subtitle' => 'Score : 18/20',
                    'xp' => '+50 XP',
                    'time' => 'Il y a 2 heures'
                ],
            ]
        ]);
    }



public function certifications()
{
    $user = Auth::user();

    // Exemple logique simple (à adapter selon ton système)
    $certifications = QCM::with('questions')
        ->get()
        ->map(function ($qcm) use ($user) {

            $total = $qcm->questions->count();

            // fake progress (à remplacer par vraie table results si tu as)
            $progress = rand(0, 100);

            return [
                'id' => $qcm->id,
                'title' => 'Certificat ' . $qcm->category,
                'status' => $progress >= 80 ? 'Obtenu' : ($progress > 0 ? 'Disponible' : 'Verrouillé'),
                'desc' => 'Certification sur ' . $qcm->category,
                'type' => $qcm->category,
                'progress' => $progress,
                'active' => $progress >= 80,
                'locked' => $progress < 30,
            ];
        });

    return response()->json([
        'certs' => $certifications
    ]);
}

public function profile()
{
    $user = Auth::user();

    return response()->json([
        "name" => $user->name,
        "email" => $user->email,

        // 🔐 Security
        "access_code" => "CB-" . $user->id . "-XYZ",
        "device_id" => request()->ip(),
        "is_active" => true,

        // 📊 Stats
        "stats" => [
            "completed_courses" => 12, // later from DB
            "xp" => 480
        ],

        // 📈 Skills
        "skills" => [
            ["name" => "HTML", "level" => 90],
            ["name" => "CSS", "level" => 70],
            ["name" => "JavaScript", "level" => 50],
        ],

        // 🏆 Badges
        "badges" => [
            [
                "name" => "Génie Code",
                "type" => "code",
                "color" => "bg-orange-50 text-orange-500"
            ],
            [
                "name" => "Rapide",
                "type" => "speed",
                "color" => "bg-blue-50 text-blue-500"
            ],
            [
                "name" => "Bug Hunter",
                "type" => "bug",
                "color" => "bg-green-50 text-green-500"
            ]
        ],

        // 🖼 Avatar
        "avatar_url" => null
    ]);
}
}
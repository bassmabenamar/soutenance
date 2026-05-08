<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class StudentController extends Controller
{
   public function dashboard(Request $request)
{
    $user = $request->user();

    return response()->json([
        'stats' => [
            'globalProgress' => 65,
            'learningTime' => '12h 30m',
            'weeklyTrend' => '18%',
            'currentModule' => 2
        ],

        'courses' => [
            [
                'id' => 1,
                'title' => 'HTML & CSS Basics',
                'progress' => 80,
                'tag' => 'Frontend',
                'color' => 'bg-blue-500'
            ],
            [
                'id' => 2,
                'title' => 'JavaScript Fundamentals',
                'progress' => 45,
                'tag' => 'JS',
                'color' => 'bg-yellow-500'
            ],
            [
                'id' => 3,
                'title' => 'React Advanced',
                'progress' => 20,
                'tag' => 'React',
                'color' => 'bg-purple-500'
            ]
        ],

        'activities' => [
            [
                'type' => 'quiz',
                'title' => 'Quiz HTML terminé',
                'subtitle' => 'HTML Basics',
                'time' => '2h ago',
                'xp' => 120
            ],
            [
                'type' => 'lesson',
                'title' => 'Cours CSS complété',
                'subtitle' => 'Flexbox',
                'time' => '1 day ago',
                'xp' => 80
            ]
        ]
    ]);
}
public function profile()
{
    $user = auth()->user();

    return response()->json([
        "name" => $user->name,

        // ❌ SUPPRIMÉ : email

        "access_code" => $user->access_code,
        "device_id" => $user->device_id,
        "is_active" => $user->is_active,

        "stats" => [
            "completed_courses" => 12,
            "xp" => 482
        ],

        "skills" => [
            ["name" => "JavaScript", "level" => 78],
            ["name" => "Backend", "level" => 45]
        ],

        "badges" => [
            ["name" => "Génie", "type" => "code", "color" => "bg-orange-50 text-orange-500"],
            ["name" => "Rapide", "type" => "speed", "color" => "bg-blue-50 text-blue-500"]
        ]
    ]);
}
}
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Result;
use App\Models\QCM;
use Illuminate\Support\Facades\Auth;

class CertificationController extends Controller
{public function index()
{
    $user = auth()->user();

    return response()->json([
        "current_badge" => "Expert Frontend",

        "stats" => [
            "total" => 2,
            "completed" => 18,
            "avg" => 94
        ],

        "courses_progress" => [
            [
                "name" => "HTML",
                "progress" => 85,
                "color" => "bg-orange-500"
            ],
            [
                "name" => "CSS",
                "progress" => 60,
                "color" => "bg-blue-500"
            ]
        ],

        "certifications" => [
            [
                "id" => 1,
                "title" => "HTML Specialist",
                "status" => "Obtenu",
                "desc" => "SEO & semantic HTML",
                "type" => "HTML",
                "progress" => 100
            ],
            [
                "id" => 2,
                "title" => "CSS Master",
                "status" => "Verrouillé",
                "desc" => "Layouts avancés",
                "type" => "CSS",
                "progress" => 80
            ]
        ],

        "latest_cert" => [
            "title" => "HTML Specialist",
            "score" => 98,
            "date" => "2026-05-12",
            "img" => "https://i.imgur.com/8QjZz4Z.png"
        ]
    ]);
}
    private function getBadge($avg)
    {
        if ($avg >= 90) return "Expert Frontend";
        if ($avg >= 70) return "Intermédiaire";
        return "Débutant";
    }
}
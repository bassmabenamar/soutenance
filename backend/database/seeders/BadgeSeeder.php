<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Badge;
use App\Models\User;

class BadgeSeeder extends Seeder
{
    public function run(): void
    {
        $user = User::first();

        Badge::insert([
            [
                'user_id' => $user->id,
                'name' => 'HTML Beginner',
                'type' => 'code',
                'color' => 'bg-orange-50 text-orange-500'
            ],
            [
                'user_id' => $user->id,
                'name' => 'Fast Learner',
                'type' => 'speed',
                'color' => 'bg-blue-50 text-blue-500'
            ]
        ]);
    }
}
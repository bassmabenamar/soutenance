<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Certification;
use App\Models\User;

class CertificationSeeder extends Seeder
{
    public function run(): void
    {
        $user = User::first();

        Certification::create([
            'user_id' => $user->id,
            'title' => 'HTML Specialist',
            'type' => 'HTML',
            'status' => 'Obtenu',
            'score' => 95,
            'file_url' => null
        ]);
    }
}
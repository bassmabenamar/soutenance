<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // 👨‍💼 Admin
        User::create([
            'name' => 'Admin',
            'access_code' => 'ADMIN123',
            'role' => 'admin',
        ]);

        // 👨‍🎓 Students
        User::create([
            'name' => 'Student 1',
            'access_code' => 'CODE001',
            'role' => 'student',
        ]);

        User::create([
            'name' => 'Student 2',
            'access_code' => 'CODE002',
            'role' => 'student',
        ]);
    }
}
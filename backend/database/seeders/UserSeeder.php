<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;


use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
   User::create([
    'name' => 'John Doe',
    'access_code' => '1234',
    'role' => 'student',
    'status' => 'Actif',
    'progress' => 75,
    
]);

User::create([
    'name' => 'Jane Smith',
    'access_code' => '5678',
    'role' => 'student',
    'status' => 'Bloqué',
    'progress' => 40,
]);

User::create([
    'name' => 'Admin',
    'access_code' => 'ADMIN001',
    'role' => 'admin',
    'status' => 'Actif',
    'progress' => 100,

]);
    }
}
<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\USER;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
public function run(): void
{
    USER::insert([
        [
            'name' => 'bassma',
            'access_code' => 'ADMIN1',
            'password' => Hash::make('123456'),
            'role' => 'admin',
            'device_id' => null,
            'is_active' => 1,
            'created_at' => now(),
            'updated_at' => now(),
        ],
        [
            'name' => 'aya',
            'access_code' => 'CB100',
            'password' => Hash::make('123456'),
            'role' => 'student',
            'device_id' => 'DEV-001',
            'is_active' => 1,
            'created_at' => now(),
            'updated_at' => now(),
        ],
        [
            'name' => 'kaoutar',
            'access_code' => 'CB10',
            'password' => Hash::make('123456'),
            'role' => 'student',
            'device_id' => 'DEV-002',
            'is_active' => 0,
            'created_at' => now(),
            'updated_at' => now(),
        ],
        [
            'name' => 'omar',
            'access_code' => 'STU-1003',
            'password' => Hash::make('123456'),
            'role' => 'student',
            'device_id' => 'DEV-003',
            'is_active' => 1,
            'created_at' => now(),
            'updated_at' => now(),
        ],
    ]);
}
}
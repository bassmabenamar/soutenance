<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Language;

class LanguageSeeder extends Seeder
{
    public function run(): void
    {
        Language::insert([
            [
                'title' => 'HTML',
                'icon_name' => 'Globe',
                'color' => 'bg-orange-500'
            ],
            [
                'title' => 'CSS',
                'icon_name' => 'Palette',
                'color' => 'bg-blue-500'
            ],
            [
                'title' => 'JavaScript',
                'icon_name' => 'Code',
                'color' => 'bg-yellow-500'
            ]
        ]);
    }
}
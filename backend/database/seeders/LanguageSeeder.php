<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Language;

class LanguageSeeder extends Seeder
{
    public function run(): void
    {
        Language::create([
            'title' => 'HTML',
            'icon_name' => 'code',
            'color' => '#F97316'
        ]);

        Language::create([
            'title' => 'CSS',
            'icon_name' => 'palette',
            'color' => '#3B82F6'
        ]);

        Language::create([
            'title' => 'JavaScript',
            'icon_name' => 'zap',
            'color' => '#FACC15'
        ]);
    }
}
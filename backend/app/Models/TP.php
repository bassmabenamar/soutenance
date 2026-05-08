<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
class Tp extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'category',
        'difficulty',
        'description',
        'instructions',
        'estimated_time',
        'is_published',
        'auto_correction',
        'file_path',
        'thumbnail',
    ];

    public function language()
    {
        return $this->belongsTo(Language::class);
    }
}
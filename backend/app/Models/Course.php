<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'category',
        'description',
        'level',
        'language_id',
        'file_path',
    ];

    // =========================
    // RELATION
    // =========================
    public function language()
    {
        return $this->belongsTo(Language::class);
    }
}
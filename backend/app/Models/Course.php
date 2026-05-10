<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'language_id',
        'level',
        'description',
        'file_path',
        'category'
    ];

    // =========================
    // RELATION
    // =========================
    public function language()
    {
        return $this->belongsTo(Language::class);
    }
}
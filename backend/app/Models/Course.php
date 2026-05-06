<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    protected $fillable = [
    'title',
    'category',
    'level',
    'description',
    'file_path',
    'file_size'
];

    public function language()
{
    return $this->belongsTo(Language::class);
}

public function lessons()
{
    return $this->hasMany(Lesson::class);
}
}
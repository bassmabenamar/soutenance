<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QCM extends Model
{
    use HasFactory;
     protected $table = 'qcms'; 
    protected $fillable = [
        'language_id',
        'title',
        'category',
        'time_limit',
        'status',
        'questions',
    ];

    protected $casts = [
        'questions' => 'array',
    ];

    public function language()
    {
        return $this->belongsTo(Language::class);
    }
}
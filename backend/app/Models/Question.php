<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Question extends Model
{
    use HasFactory;

    protected $fillable = [
        'qcm_id',
        'question_text',
        'code_snippet',
        'level'
    ];

    public function qcm()
    {
        return $this->belongsTo(Qcm::class);
    }

    public function options()
    {
        return $this->hasMany(Option::class);
    }
}
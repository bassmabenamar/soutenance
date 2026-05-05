<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    protected $fillable = [
        'q_c_m_id',
        'question',
        'option_a',
        'option_b',
        'option_c',
        'option_d',
        'correct_answer'
    ];

    public function qcm()
    {
        return $this->belongsTo(QCM::class);
    }
}
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QcmAnswer extends Model
{
    use HasFactory;

    protected $fillable = [
        'qcm_attempt_id',
        'question_id',
        'option_id'
    ];

    public function attempt()
    {
        return $this->belongsTo(QcmAttempt::class, 'qcm_attempt_id');
    }

    public function question()
    {
        return $this->belongsTo(Question::class);
    }

    public function option()
    {
        return $this->belongsTo(Option::class);
    }
}
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QcmAttempt extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'qcm_id',
        'score',
        'status'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function qcm()
    {
        return $this->belongsTo(Qcm::class);
    }

    public function answers()
    {
        return $this->hasMany(QcmAnswer::class);
    }
}
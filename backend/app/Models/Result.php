<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Result extends Model
{
    protected $fillable = [
        'user_id',
        'q_c_m_id',
        'score'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function qcm()
    {
        return $this->belongsTo(QCM::class);
    }
}
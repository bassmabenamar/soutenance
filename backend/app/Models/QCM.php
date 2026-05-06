<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class QCM extends Model
{
    protected $table = 'q_c_m_s';

    protected $fillable = [
        'title',
        'category','status'
    ];

    public function questions()
    {
        return $this->hasMany(Question::class ,'q_c_m_id');
    }

    public function results()
    {
        return $this->hasMany(Result::class);
    }
}
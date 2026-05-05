<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class QCM extends Model
{
    protected $table = 'q_c_m_s';

    protected $fillable = [
        'title',
        'category'
    ];

    public function questions()
    {
        return $this->hasMany(Question::class);
    }

    public function results()
    {
        return $this->hasMany(Result::class);
    }
}
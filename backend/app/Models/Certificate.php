<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Certificate extends Model
{
    protected $fillable = [
        'user_id',
        'progress',
        'is_eligible',
        'is_delivered'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
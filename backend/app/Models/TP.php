<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TP extends Model
{
    protected $table = 't_p_s';

    protected $fillable = [
        'title',
        'description'
    ];
}
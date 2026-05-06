<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens;

    protected $fillable = [
        'name',
        'access_code',
        'role',
        'status',
        'progress'
    ];

    protected $hidden = [];

    // 📱 devices (max 3 login devices)
    public function devices()
    {
        return $this->hasMany(Device::class);
    }

    // 🏆 quiz results
    public function results()
    {
        return $this->hasMany(Result::class);
    }
}
<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;
use App\Models\Device;
class User extends Authenticatable
{
        use HasApiTokens,HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'password',
        'access_code',
        'role',
        'device_id',
        'is_active'
    ];

    public function certifications()
    {
        return $this->hasMany(Certification::class);
    }

    public function badges()
    {
        return $this->hasMany(Badge::class);
    }

    public function courseProgress()
    {
        return $this->hasMany(CourseProgress::class);
    }

    public function qcmAttempts()
    {
        return $this->hasMany(QcmAttempt::class);
    }

    public function devices()
    {
        return $this->hasMany(Device::class);
    }
}
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
class Language extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'icon_name',
        'color'
    ];

    public function courses()
    {
        return $this->hasMany(Course::class);
    }

    public function qcms()
    {
        return $this->hasMany(Qcm::class);
    }
}
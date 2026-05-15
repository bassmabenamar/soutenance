<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
    'first_name',
    'last_name',
    'address',
    'city',
    'zip_code',
    'phone',
    'amount',
    'status'
];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
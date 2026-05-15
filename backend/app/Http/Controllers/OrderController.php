<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;

class OrderController extends Controller
{
    public function store(Request $request)
    {
        return Order::create([

            'first_name' => $request->firstName,
            'last_name' => $request->lastName,

            'address' => $request->address,
            'city' => $request->city,

            'zip_code' => $request->zipCode,

            'phone' => $request->phone,

            'amount' => $request->amount,

            'status' => 'pending'
        ]);
    }
}
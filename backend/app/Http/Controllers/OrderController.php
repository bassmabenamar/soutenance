<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;

class OrderController extends Controller
{
    public function index(Request $request)
    {
        return Order::where('user_id', $request->user()->id)->get();
    }

    public function store(Request $request)
    {
        return Order::create([
            'user_id' => $request->user()->id,
            'product' => $request->product,
            'amount' => $request->amount,
            'status' => 'pending'
        ]);
    }
}
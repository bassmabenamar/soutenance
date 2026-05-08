<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Device;

class DeviceController extends Controller
{
    public function register(Request $request)
    {
        return Device::create([
            'user_id' => $request->user()->id,
            'device_id' => $request->device_id,
            'ip_address' => $request->ip(),
            'user_agent' => $request->header('User-Agent')
        ]);
    }
}
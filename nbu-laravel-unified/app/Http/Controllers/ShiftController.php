<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\DutyRota;
use Illuminate\Http\Request;

class ShiftController extends Controller
{
    public function assign(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'shift_type' => 'required|string',
            'date' => 'required|date',
            'ward' => 'required|string',
        ]);

        $rota = DutyRota::create([
            'user_id' => $request->user_id,
            'shift_type' => $request->shift_type,
            'date' => $request->date,
            'ward' => $request->ward,
            'status' => 'Scheduled',
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Shift assigned successfully.',
            'data' => $rota
        ]);
    }

    public function index()
    {
        $rotas = DutyRota::with('user')->orderBy('date', 'desc')->get();
        return response()->json([
            'success' => true,
            'data' => $rotas
        ]);
    }
}

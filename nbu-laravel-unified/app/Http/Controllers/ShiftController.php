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
            'shift' => 'required|string',
            'date' => 'required|date',
            'role_assigned' => 'nullable|string',
        ]);

        $rota = DutyRota::create([
            'user_id' => $request->user_id,
            'shift' => $request->shift,
            'date' => $request->date,
            'role_assigned' => $request->role_assigned ?? 'Clinician',
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

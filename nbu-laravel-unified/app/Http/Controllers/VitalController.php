<?php

namespace App\Http\Controllers;

use App\Models\Vital;
use Illuminate\Http\Request;

class VitalController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'neonate_id' => 'required|exists:neonates,id',
            'temperature' => 'nullable|numeric',
            'heart_rate' => 'nullable|integer',
            'spo2' => 'nullable|integer',
        ]);

        $vital = Vital::create($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Vitals recorded.',
            'data' => $vital
        ], 201);
    }

    public function history($neonateId)
    {
        $vitals = Vital::where('neonate_id', $neonateId)->latest()->get();
        return response()->json([
            'success' => true,
            'data' => $vitals
        ]);
    }
}

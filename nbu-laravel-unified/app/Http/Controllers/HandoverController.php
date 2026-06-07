<?php

namespace App\Http\Controllers;

use App\Models\Handover;
use Illuminate\Http\Request;

class HandoverController extends Controller
{
    public function index($neonateId = null)
    {
        $query = Handover::with('nurse');
        if ($neonateId) {
            $query->where('neonate_id', $neonateId);
        }
        $handovers = $query->latest()->get();

        return response()->json([
            'success' => true,
            'data' => $handovers
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'neonate_id' => 'required|exists:neonates,id',
            'clinical_status' => 'required|string',
            'vitals_snapshot' => 'required|array',
            'treatment_plan' => 'required|string',
            'shift_type' => 'required|string',
        ]);

        $handover = Handover::create([
            'neonate_id' => $request->neonate_id,
            'nurse_id' => $request->user()->id,
            'clinical_status' => $request->clinical_status,
            'vitals_snapshot' => $request->vitals_snapshot,
            'investigations' => $request->investigations,
            'treatment_plan' => $request->treatment_plan,
            'shift_type' => $request->shift_type,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Handover recorded successfully.',
            'data' => $handover
        ], 201);
    }
}

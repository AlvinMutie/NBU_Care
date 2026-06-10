<?php

namespace App\Http\Controllers;

use App\Models\Handover;
use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade\Pdf;

class HandoverController extends Controller
{
    public function downloadPDF(Handover $handover)
    {
        $handover->load('neonate', 'nurse');
        
        $pdf = Pdf::loadView('pdfs.handover', compact('handover'));
        
        return $pdf->download("handover_{$handover->neonate->hospital_number}.pdf");
    }

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
            'clinical_status' => 'nullable|string',
            'vitals_snapshot' => 'nullable|array',
            'treatment_plan' => 'nullable|string',
            'shift_type' => 'required|string',
            'situation' => 'nullable|string',
            'background' => 'nullable|string',
            'assessment' => 'nullable|string',
            'recommendation' => 'nullable|string',
            'is_guided' => 'nullable|boolean',
            'guided_responses' => 'nullable|array',
        ]);

        $handover = Handover::create([
            'neonate_id' => $request->neonate_id,
            'nurse_id' => $request->user()->id,
            'clinical_status' => $request->clinical_status ?? 'N/A',
            'vitals_snapshot' => $request->vitals_snapshot ?? [],
            'investigations' => $request->investigations,
            'treatment_plan' => $request->treatment_plan ?? 'N/A',
            'shift_type' => $request->shift_type,
            'situation' => $request->situation,
            'background' => $request->background,
            'assessment' => $request->assessment,
            'recommendation' => $request->recommendation,
            'is_guided' => $request->is_guided ?? false,
            'guided_responses' => $request->guided_responses,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Handover recorded successfully.',
            'data' => $handover
        ], 201);
    }
}

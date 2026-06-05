<?php

namespace App\Http\Controllers;

use App\Models\Neonate;
use App\Models\Vital;
use App\Models\WeightLog;
use App\Models\ClinicalNote;
use App\Models\MaternalProfile;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class NeonateProfileController extends Controller
{
    /**
     * Display the full neonatal clinical profile.
     */
    public function show(Neonate $neonate)
    {
        $neonate->load([
            'maternalProfile',
            'vitals' => fn($q) => $q->take(50),
            'weightLogs' => fn($q) => $q->take(30),
            'assessments',
            'notes.author',
            'labResults',
            'imagingRecords',
            'treatments' => fn($q) => $q->where('is_active', true),
            'alerts' => fn($q) => $q->where('is_resolved', false),
        ]);

        return Inertia::render('Clinical/NeonateProfile', [
            'neonate' => $neonate,
            'age' => $neonate->age,
        ]);
    }

    /**
     * Store a new vital sign entry (Time-series).
     */
    public function storeVital(Request $request, Neonate $neonate)
    {
        $validated = $request->validate([
            'temperature' => 'nullable|numeric|min:30|max:45',
            'heart_rate' => 'nullable|integer|min:0|max:300',
            'respiratory_rate' => 'nullable|integer|min:0|max:150',
            'oxygen_saturation' => 'nullable|integer|min:0|max:100',
            'blood_sugar' => 'nullable|numeric|min:0|max:30',
            'measured_at' => 'nullable|date',
        ]);

        $vital = $neonate->vitals()->create([
            'user_id' => auth()->id(),
            'temperature' => $validated['temperature'],
            'heart_rate' => $validated['heart_rate'],
            'respiratory_rate' => $validated['respiratory_rate'],
            'oxygen_saturation' => $validated['oxygen_saturation'],
            'blood_sugar' => $validated['blood_sugar'],
            'measured_at' => $validated['measured_at'] ?? now(),
        ]);

        return redirect()->back()->with('success', 'Vital sign recorded.');
    }

    /**
     * Store a clinical note.
     */
    public function storeNote(Request $request, Neonate $neonate)
    {
        $validated = $request->validate([
            'note_type' => 'required|in:Nurse,MO,Consultant,Specialist',
            'content' => 'required|string',
        ]);

        $neonate->notes()->create([
            'user_id' => auth()->id(),
            'note_type' => $validated['note_type'],
            'content' => $validated['content'],
        ]);

        return redirect()->back()->with('success', 'Clinical note added.');
    }

    /**
     * Update maternal profile.
     */
    public function updateMaternal(Request $request, Neonate $neonate)
    {
        $neonate->maternalProfile()->updateOrCreate(
            ['neonate_id' => $neonate->id],
            $request->all() // In production, use specific validation
        );

        return redirect()->back()->with('success', 'Maternal history updated.');
    }
}

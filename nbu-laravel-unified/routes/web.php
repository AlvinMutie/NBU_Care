<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    $neonates = \Illuminate\Support\Facades\DB::table('neonates')
        ->orderBy('created_at', 'desc')
        ->get()
        ->map(function ($neonate) {
            // Map db columns to JS keys
            return [
                'id' => $neonate->id,
                'hospitalNumber' => $neonate->hospital_number,
                'name' => $neonate->name,
                'dob' => $neonate->dob,
                'gender' => $neonate->gender,
                'birthWeight' => $neonate->birth_weight,
                'currentWeight' => $neonate->current_weight,
                'gestationalAge' => $neonate->gestational_age,
                'admissionDiagnosis' => $neonate->admission_diagnosis,
                'history' => $neonate->history,
                'motherPhone' => $neonate->mother_phone,
                'status' => $neonate->status,
                'createdAt' => $neonate->created_at,
            ];
        });

    $auditLogs = \Illuminate\Support\Facades\DB::table('audit_logs')
        ->orderBy('created_at', 'desc')
        ->take(50)
        ->get();

    return Inertia::render('Dashboard', [
        'initialNeonates' => $neonates,
        'initialAuditLogs' => $auditLogs,
    ]);
})->middleware(['auth'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Admit new neonate patient
    Route::post('/neonates', function (\Illuminate\Http\Request $request) {
        $validated = $request->validate([
            'hospitalNumber' => 'required|string|unique:neonates,hospital_number',
            'name' => 'required|string|max:255',
            'dob' => 'required|date',
            'gender' => 'required|string|in:Male,Female,Other',
            'birthWeight' => 'required|numeric|min:0',
            'currentWeight' => 'required|numeric|min:0',
            'gestationalAge' => 'required|integer|min:20|max:45',
            'admissionDiagnosis' => 'nullable|string',
            'history' => 'nullable|string',
            'motherPhone' => 'nullable|string',
        ]);

        \Illuminate\Support\Facades\DB::table('neonates')->insert([
            'hospital_number' => $validated['hospitalNumber'],
            'name' => $validated['name'],
            'dob' => $validated['dob'],
            'gender' => $validated['gender'],
            'birth_weight' => $validated['birthWeight'],
            'current_weight' => $validated['currentWeight'],
            'gestational_age' => $validated['gestationalAge'],
            'admission_diagnosis' => $validated['admissionDiagnosis'] ?? null,
            'history' => $validated['history'] ?? null,
            'mother_phone' => $validated['motherPhone'] ?? null,
            'status' => 'Stable',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return redirect()->back()->with('success', 'Neonate admitted successfully.');
    });

    // Save medication dosage calculator audit logs
    Route::post('/audit-logs', function (\Illuminate\Http\Request $request) {
        $validated = $request->validate([
            'action' => 'required|string|max:1000',
            'type' => 'required|string|max:255',
            'status' => 'required|string|max:255',
        ]);

        \Illuminate\Support\Facades\DB::table('audit_logs')->insert([
            'user_id' => auth()->id(),
            'user_name' => auth()->user()->name,
            'action' => $validated['action'],
            'calculation_type' => $validated['type'],
            'input_parameters' => json_encode($request->all()),
            'output_result' => json_encode(['status' => $validated['status']]),
            'is_flagged' => false,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return redirect()->back()->with('success', 'Action logged successfully.');
    });
});

require __DIR__.'/auth.php';

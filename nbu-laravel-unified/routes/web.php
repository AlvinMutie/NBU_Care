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
        ->get();

    $auditLogs = \Illuminate\Support\Facades\DB::table('audit_logs')
        ->leftJoin('users', 'audit_logs.user_id', '=', 'users.id')
        ->select('audit_logs.*', 'users.name as user_name')
        ->orderBy('audit_logs.created_at', 'desc')
        ->take(50)
        ->get();

    $handovers = \Illuminate\Support\Facades\DB::table('handovers')
        ->leftJoin('neonates', 'handovers.neonate_id', '=', 'neonates.id')
        ->leftJoin('users as nurse', 'handovers.nurse_on_duty_id', '=', 'nurse.id')
        ->leftJoin('users as lead', 'handovers.clinical_lead_id', '=', 'lead.id')
        ->select(
            'handovers.*', 
            'neonates.name as neonate_name', 
            'neonates.hospital_number as neonate_hospital_number',
            'nurse.name as nurse_name',
            'lead.name as lead_name'
        )
        ->orderBy('handovers.created_at', 'desc')
        ->get()
        ->map(function ($h) {
            $h->investigations = json_decode($h->investigations ?? '{}');
            $h->medications_given = json_decode($h->medications_given ?? '[]');
            return $h;
        });

    $rotasRaw = \Illuminate\Support\Facades\DB::table('rotas')
        ->leftJoin('users as consultant', 'rotas.consultant_id', '=', 'consultant.id')
        ->leftJoin('users as manager', 'rotas.manager_id', '=', 'manager.id')
        ->select(
            'rotas.*',
            'consultant.name as consultant_name',
            'manager.name as manager_name'
        )
        ->orderBy('rotas.date', 'desc')
        ->orderBy('rotas.shift', 'asc')
        ->get();

    $rotas = $rotasRaw->map(function ($rota) {
        $nurses = \Illuminate\Support\Facades\DB::table('rota_user')
            ->join('users', 'rota_user.user_id', '=', 'users.id')
            ->where('rota_user.rota_id', $rota->id)
            ->select('users.id', 'users.name', 'users.role')
            ->get();
        
        $rota->nurses = $nurses;
        return $rota;
    });

    $allUsers = \Illuminate\Support\Facades\DB::table('users')
        ->select('id', 'name', 'role', 'email', 'status', 'is_verified', 'phone', 'id_number', 'created_at')
        ->orderBy('created_at', 'desc')
        ->get();

    $flashcards = \Illuminate\Support\Facades\DB::table('flashcards')
        ->orderBy('category', 'asc')
        ->orderBy('title', 'asc')
        ->get()
        ->map(function ($f) {
            $f->steps = json_decode($f->steps ?? '[]');
            return $f;
        });

    $scenarios = \Illuminate\Support\Facades\DB::table('scenarios')
        ->orderBy('title', 'asc')
        ->get()
        ->map(function ($s) {
            $s->solution_steps = json_decode($s->solution_steps ?? '[]');
            return $s;
        });

    return Inertia::render('Dashboard', [
        'initialNeonates' => $neonates,
        'initialAuditLogs' => $auditLogs,
        'initialHandovers' => $handovers,
        'initialRotas' => $rotas,
        'allUsers' => $allUsers,
        'flashcards' => $flashcards,
        'scenarios' => $scenarios,
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
            'gestationalAge' => 'required|integer|min:1|max:45',
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
            'action' => $validated['action'],
            'type' => $validated['type'],
            'status' => 'Checked', // Match migration enum: 'Checked', 'Review', 'Waiting'
            'metadata' => json_encode($request->all()),
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return redirect()->back()->with('success', 'Action logged successfully.');
    });

    // Record Shift Handover Report
    Route::post('/handovers', function (\Illuminate\Http\Request $request) {
        $validated = $request->validate([
            'neonateId' => 'required|exists:neonates,id',
            'shift' => 'required|string|in:Morning,Afternoon,Night',
            'clinicalLeadId' => 'nullable|exists:users,id',
            'temperature' => 'nullable|numeric|min:30|max:45',
            'sugarLevel' => 'nullable|numeric|min:0|max:30',
            'oxygenSaturation' => 'nullable|integer|min:0|max:100',
            'heartRate' => 'nullable|integer|min:0|max:300',
            'respiratoryRate' => 'nullable|integer|min:0|max:150',
            'fbc' => 'nullable|string|max:255',
            'kidney' => 'nullable|string|max:255',
            'liver' => 'nullable|string|max:255',
            'commentary' => 'nullable|string',
            'plan' => 'nullable|string',
        ]);

        $investigations = [
            'fbc' => $validated['fbc'] ?? null,
            'kidney' => $validated['kidney'] ?? null,
            'liver' => $validated['liver'] ?? null,
        ];

        $neonate = \Illuminate\Support\Facades\DB::table('neonates')->where('id', $validated['neonateId'])->first();

        \Illuminate\Support\Facades\DB::table('handovers')->insert([
            'neonate_id' => $validated['neonateId'],
            'date' => now(),
            'shift' => $validated['shift'],
            'clinical_lead_id' => $validated['clinicalLeadId'] ?? null,
            'nurse_on_duty_id' => auth()->id(),
            'temperature' => $validated['temperature'] ?? null,
            'sugar_level' => $validated['sugarLevel'] ?? null,
            'oxygen_saturation' => $validated['oxygenSaturation'] ?? null,
            'heart_rate' => $validated['heartRate'] ?? null,
            'respiratory_rate' => $validated['respiratoryRate'] ?? null,
            'investigations' => json_encode($investigations),
            'medications_given' => json_encode([]),
            'commentary' => $validated['commentary'] ?? null,
            'plan' => $validated['plan'] ?? null,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // Audit log with user_id! (using MEDICATION CALCULATED or CLINICAL HANDOVER)
        \Illuminate\Support\Facades\DB::table('audit_logs')->insert([
            'user_id' => auth()->id(),
            'action' => "CLINICAL SHIFT HANDOVER: Registered handover for newborn " . ($neonate ? $neonate->name : 'Neonate') . " by nurse " . auth()->user()->name,
            'type' => 'Medication', // Category matches audit_logs table
            'status' => 'Checked',
            'metadata' => json_encode(['neonate_id' => $validated['neonateId'], 'shift' => $validated['shift']]),
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return redirect()->back()->with('success', 'Shift handover report recorded successfully.');
    });

    // Schedule Clinician Duty Rota
    Route::post('/rotas', function (\Illuminate\Http\Request $request) {
        $validated = $request->validate([
            'date' => 'required|date',
            'shift' => 'required|string|in:Morning,Afternoon,Night',
            'consultantId' => 'nullable|exists:users,id',
            'managerId' => 'nullable|exists:users,id',
            'assignedNurses' => 'nullable|array',
            'assignedNurses.*' => 'exists:users,id',
        ]);

        // Enforce unique rota constraint by date and shift
        $existing = \Illuminate\Support\Facades\DB::table('rotas')
            ->where('date', $validated['date'])
            ->where('shift', $validated['shift'])
            ->first();

        if ($existing) {
            return redirect()->back()->withErrors(['date' => 'A duty roster already exists for this date and shift.']);
        }

        $rotaId = \Illuminate\Support\Facades\DB::table('rotas')->insertGetId([
            'date' => $validated['date'],
            'shift' => $validated['shift'],
            'consultant_id' => $validated['consultantId'] ?? null,
            'manager_id' => $validated['managerId'] ?? null,
            'created_by' => auth()->id(),
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        if (!empty($validated['assignedNurses'])) {
            foreach ($validated['assignedNurses'] as $nurseId) {
                \Illuminate\Support\Facades\DB::table('rota_user')->insert([
                    'rota_id' => $rotaId,
                    'user_id' => $nurseId,
                ]);
            }
        }

        return redirect()->back()->with('success', 'Duty rota scheduled successfully.');
    });

    // Approve user registration
    Route::post('/admin/users/{user}/approve', function (\App\Models\User $user) {
        if (!in_array(auth()->user()->role, ['Hospital Management', 'Nursing In-Charge', 'ICT / IT Support'])) {
            return redirect()->back()->withErrors(['role' => 'Unauthorized action.']);
        }
        
        \Illuminate\Support\Facades\DB::table('users')
            ->where('id', $user->id)
            ->update([
                'status' => 'Approved',
                'is_verified' => true,
                'verified_by' => auth()->id(),
                'verification_date' => now(),
            ]);

        // Audit log
        \Illuminate\Support\Facades\DB::table('audit_logs')->insert([
            'user_id' => auth()->id(),
            'action' => "USER APPROVED: Approved access request for {$user->name} ({$user->role})",
            'type' => 'Medication',
            'status' => 'Checked',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return redirect()->back()->with('success', "Approved {$user->name} successfully.");
    });

    // Reject user registration
    Route::post('/admin/users/{user}/reject', function (\App\Models\User $user) {
        if (!in_array(auth()->user()->role, ['Hospital Management', 'Nursing In-Charge', 'ICT / IT Support'])) {
            return redirect()->back()->withErrors(['role' => 'Unauthorized action.']);
        }

        \Illuminate\Support\Facades\DB::table('users')
            ->where('id', $user->id)
            ->update([
                'status' => 'Rejected',
                'is_verified' => false,
            ]);

        // Audit log
        \Illuminate\Support\Facades\DB::table('audit_logs')->insert([
            'user_id' => auth()->id(),
            'action' => "USER REJECTED: Rejected access request for {$user->name} ({$user->role})",
            'type' => 'Medication',
            'status' => 'Checked',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return redirect()->back()->with('success', "Rejected {$user->name} successfully.");
    });

    // Update user role
    Route::post('/admin/users/{user}/update-role', function (\App\Models\User $user, \Illuminate\Http\Request $request) {
        if (!in_array(auth()->user()->role, ['Hospital Management', 'Nursing In-Charge', 'ICT / IT Support'])) {
            return redirect()->back()->withErrors(['role' => 'Unauthorized action.']);
        }

        $validated = $request->validate([
            'role' => 'required|string|in:Nursing In-Charge,Nurse,Consultant Pediatrician,CO Pediatrics / MO,Student,ICT / IT Support,Hospital Management',
        ]);

        \Illuminate\Support\Facades\DB::table('users')
            ->where('id', $user->id)
            ->update([
                'role' => $validated['role'],
            ]);

        // Audit log
        \Illuminate\Support\Facades\DB::table('audit_logs')->insert([
            'user_id' => auth()->id(),
            'action' => "USER ROLE UPDATED: Changed role of {$user->name} to {$validated['role']}",
            'type' => 'Medication',
            'status' => 'Checked',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return redirect()->back()->with('success', "Updated role for {$user->name} to {$validated['role']} successfully.");
    });
});

require __DIR__.'/auth.php';

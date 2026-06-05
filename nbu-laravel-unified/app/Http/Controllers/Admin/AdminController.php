<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class AdminController extends Controller
{
    /**
     * Display the admin dashboard.
     */
    public function index(Request $request): Response
    {
        // Authorization check
        if (!in_array(auth()->user()->role, ['Hospital Management', 'Nursing In-Charge', 'ICT / IT Support'])) {
            abort(403, 'Unauthorized access to Admin Portal.');
        }

        $allUsers = DB::table('users')
            ->select('id', 'name', 'role', 'email', 'status', 'is_verified', 'phone', 'id_number', 'created_at')
            ->orderBy('created_at', 'desc')
            ->get();

        $auditLogs = DB::table('audit_logs')
            ->leftJoin('users', 'audit_logs.user_id', '=', 'users.id')
            ->select('audit_logs.*', 'users.name as user_name', 'users.is_verified')
            ->orderBy('audit_logs.created_at', 'desc')
            ->take(200)
            ->get();

        return Inertia::render('Admin/Dashboard', [
            'allUsers' => $allUsers,
            'initialAuditLogs' => $auditLogs,
        ]);
    }

    /**
     * Update a user's role.
     */
    public function updateRole(User $user, Request $request)
    {
        if (!in_array(auth()->user()->role, ['Hospital Management', 'Nursing In-Charge', 'ICT / IT Support'])) {
            return redirect()->back()->withErrors(['role' => 'Unauthorized action.']);
        }

        $validated = $request->validate([
            'role' => 'required|string|in:Nursing In-Charge,Nurse,Consultant Pediatrician,CO Pediatrics / MO,Student,ICT / IT Support,Hospital Management',
        ]);

        DB::table('users')
            ->where('id', $user->id)
            ->update([
                'role' => $validated['role'],
            ]);

        // Audit log
        DB::table('audit_logs')->insert([
            'user_id' => auth()->id(),
            'action' => "USER ROLE UPDATED: Changed role of {$user->name} to {$validated['role']}",
            'type' => 'Management',
            'status' => 'Checked',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return redirect()->back()->with('success', "Updated role for {$user->name} to {$validated['role']} successfully.");
    }
}

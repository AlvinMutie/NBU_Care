<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\VerificationQueue;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class VerificationController extends Controller
{
    /**
     * Approve a user's clinical credentials.
     */
    public function approve(User $user): RedirectResponse
    {
        if (!in_array(auth()->user()->role, ['Hospital Management', 'Nursing In-Charge', 'ICT / IT Support'])) {
            return redirect()->back()->withErrors(['role' => 'Unauthorized action.']);
        }

        DB::transaction(function () use ($user) {
            // Update User status
            $user->update([
                'status' => 'Approved',
                'is_verified' => true,
                'verified_by' => auth()->id(),
                'verification_date' => now(),
            ]);

            // Update or Create Verification Queue entry
            VerificationQueue::updateOrCreate(
                ['user_id' => $user->id],
                [
                    'status' => 'Approved',
                    'verified_by' => auth()->id(),
                    'verification_date' => now(),
                    'notes' => 'Clinical credentials verified and approved by ' . auth()->user()->name,
                ]
            );

            // Log the action
            DB::table('audit_logs')->insert([
                'user_id' => auth()->id(),
                'action' => "USER VERIFIED & APPROVED: Approved clinical access for {$user->name} ({$user->role})",
                'type' => 'Clinical',
                'status' => 'Checked',
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        });

        return redirect()->back()->with('success', "Verified and approved {$user->name} successfully.");
    }

    /**
     * Reject a user's clinical credentials.
     */
    public function reject(User $user, Request $request): RedirectResponse
    {
        if (!in_array(auth()->user()->role, ['Hospital Management', 'Nursing In-Charge', 'ICT / IT Support'])) {
            return redirect()->back()->withErrors(['role' => 'Unauthorized action.']);
        }

        DB::transaction(function () use ($user, $request) {
            $user->update([
                'status' => 'Rejected',
                'is_verified' => false,
            ]);

            VerificationQueue::updateOrCreate(
                ['user_id' => $user->id],
                [
                    'status' => 'Rejected',
                    'verified_by' => auth()->id(),
                    'verification_date' => now(),
                    'notes' => $request->input('reason', 'Credentials could not be verified.'),
                ]
            );

            DB::table('audit_logs')->insert([
                'user_id' => auth()->id(),
                'action' => "USER REJECTED: Rejected access request for {$user->name} ({$user->role})",
                'type' => 'Clinical',
                'status' => 'Checked',
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        });

        return redirect()->back()->with('success', "Rejected {$user->name} successfully.");
    }
}

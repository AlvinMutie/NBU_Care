<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Setting;
use App\Models\Neonate;
use App\Models\AuditLog;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function stats()
    {
        return response()->json([
            'success' => true,
            'data' => [
                'total_staff' => User::count(),
                'live_cases' => Neonate::where('status', '!=', 'Discharged')->count(),
                'doses_given' => AuditLog::where('action', 'calculation')->count(),
                'safety_score' => 98 // Placeholder for logic
            ]
        ]);
    }

    public function analytics()
    {
        return response()->json([
            'success' => true,
            'data' => [
                'distribution' => [
                    ['name' => 'Critical', 'value' => Neonate::where('status', 'Critical')->count(), 'color' => '#ef4444'],
                    ['name' => 'Serious', 'value' => Neonate::where('status', 'Serious')->count(), 'color' => '#f59e0b'],
                    ['name' => 'Stable', 'value' => Neonate::where('status', 'Stable')->count(), 'color' => '#10b981'],
                ],
                'staffing' => [
                    ['name' => 'Day', 'required' => 12, 'actual' => User::where('role', 'Staff Nurse')->count()],
                    ['name' => 'Afternoon', 'required' => 10, 'actual' => max(4, User::where('role', 'Staff Nurse')->count() - 2)],
                    ['name' => 'Night', 'required' => 8, 'actual' => max(2, User::where('role', 'Staff Nurse')->count() - 4)],
                ]
            ]
        ]);
    }

    public function users()
    {
        $users = User::all();
        return response()->json([
            'success' => true,
            'data' => $users
        ]);
    }

    public function pendingUsers()
    {
        $users = User::where('status', 'Pending')->get();
        return response()->json([
            'success' => true,
            'data' => $users
        ]);
    }

    public function verifyUser(Request $request, User $user)
    {
        $user->update([
            'status' => 'Approved',
            'isVerified' => true,
            'verifiedBy' => $request->user()->id
        ]);

        return response()->json([
            'success' => true,
            'message' => 'User approved.'
        ]);
    }

    public function settings()
    {
        $settings = Setting::all()->pluck('value', 'key');
        return response()->json([
            'success' => true,
            'data' => $settings
        ]);
    }

    public function updateSettings(Request $request)
    {
        foreach ($request->all() as $key => $value) {
            Setting::updateOrCreate(['key' => $key], ['value' => $value]);
        }

        return response()->json([
            'success' => true,
            'message' => 'Settings updated.'
        ]);
    }
}

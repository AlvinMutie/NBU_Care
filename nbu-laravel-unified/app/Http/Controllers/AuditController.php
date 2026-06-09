<?php

namespace App\Http\Controllers;

use App\Models\AuditLog;
use Illuminate\Http\Request;

class AuditController extends Controller
{
    public function index(Request $request)
    {
        $query = AuditLog::with('user');

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('action', 'like', "%{$search}%")
                  ->orWhere('resource_type', 'like', "%{$search}%")
                  ->orWhereHas('user', function($qu) use ($search) {
                      $qu->where('name', 'like', "%{$search}%");
                  });
            });
        }

        $logs = $query->latest()->paginate(20);
        
        return response()->json([
            'success' => true,
            'data' => $logs
        ]);
    }

    public function recent()
    {
        $logs = AuditLog::with('user')->latest()->take(10)->get();
        return response()->json([
            'success' => true,
            'data' => $logs
        ]);
    }
}

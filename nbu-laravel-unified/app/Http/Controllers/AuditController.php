<?php

namespace App\Http\Controllers;

use App\Models\AuditLog;
use Illuminate\Http\Request;

class AuditController extends Controller
{
    public function index()
    {
        $logs = AuditLog::with('user')->latest()->paginate(20);
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

<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\NeonateController;
use App\Http\Controllers\HandoverController;
use App\Http\Controllers\VitalController;
use App\Http\Controllers\AuditController;
use App\Http\Controllers\LearningController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\ShiftController;
use Illuminate\Support\Facades\Route;

Route::post('/auth/register', [AuthController::class, 'register']);
Route::post('/auth/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/auth/logout', [AuthController::class, 'logout']);
    Route::get('/auth/profile', [AuthController::class, 'profile']);

    Route::apiResource('neonates', NeonateController::class);
    
    Route::get('/handovers/{neonateId?}', [HandoverController::class, 'index']);
    Route::post('/handovers', [HandoverController::class, 'store']);
    
    Route::post('/vitals', [VitalController::class, 'store']);
    Route::get('/vitals/history/{neonateId}', [VitalController::class, 'history']);

    Route::get('/learning/flashcards', [LearningController::class, 'flashcards']);
    Route::get('/learning/scenarios', [LearningController::class, 'scenarios']);

    Route::get('/logs/recent', [AuditController::class, 'recent']);
    Route::get('/logs', [AuditController::class, 'index']);

    Route::get('/admin/stats', [AdminController::class, 'stats']);
    Route::get('/admin/analytics', [AdminController::class, 'analytics']);
    Route::get('/admin/users', [AdminController::class, 'users']);
    Route::get('/auth/pending', [AdminController::class, 'pendingUsers']);
    Route::post('/auth/verify/{user}', [AdminController::class, 'verifyUser']);
    Route::get('/admin/settings', [AdminController::class, 'settings']);
    Route::patch('/admin/settings', [AdminController::class, 'updateSettings']);

    Route::get('/shifts', [ShiftController::class, 'index']);
    Route::post('/shifts/assign', [ShiftController::class, 'assign']);
});

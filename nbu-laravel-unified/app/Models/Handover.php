<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Handover extends Model
{
    protected $fillable = [
        'neonate_id', 'nurse_id', 'clinical_status', 'vitals_snapshot', 
        'investigations', 'treatment_plan', 'shift_type',
        'situation', 'background', 'assessment', 'recommendation', 'is_guided', 'guided_responses', 'status'
    ];

    protected $casts = [
        'vitals_snapshot' => 'json',
        'guided_responses' => 'json',
    ];

    public function neonate(): BelongsTo
    {
        return $this->belongsTo(Neonate::class);
    }

    public function nurse(): BelongsTo
    {
        return $this->belongsTo(User::class, 'nurse_id');
    }
}

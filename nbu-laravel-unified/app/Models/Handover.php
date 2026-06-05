<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Handover extends Model
{
    use HasFactory;

    protected $fillable = [
        'neonate_id', 'date', 'shift', 'clinical_lead_id', 'nurse_on_duty_id',
        'temperature', 'sugar_level', 'oxygen_saturation', 'heart_rate', 'respiratory_rate',
        'investigations', 'medications_given', 'commentary', 'plan'
    ];

    protected $casts = [
        'date' => 'datetime',
        'investigations' => 'json',
        'medications_given' => 'json',
        'temperature' => 'decimal:1',
        'sugar_level' => 'decimal:1',
    ];

    public function neonate(): BelongsTo
    {
        return $this->belongsTo(Neonate::class);
    }

    public function nurse(): BelongsTo
    {
        return $this->belongsTo(User::class, 'nurse_on_duty_id');
    }

    public function lead(): BelongsTo
    {
        return $this->belongsTo(User::class, 'clinical_lead_id');
    }
}

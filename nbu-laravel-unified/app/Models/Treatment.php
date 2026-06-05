<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Treatment extends Model
{
    use HasFactory;

    protected $fillable = [
        'neonate_id', 'prescriber_id', 'item_name', 'type', 
        'dose_mg_kg', 'calculated_dose', 'volume', 'route', 
        'frequency', 'fluid_rate_ml_kg_day', 'start_date', 'end_date', 'is_active'
    ];

    protected $casts = [
        'start_date' => 'datetime',
        'end_date' => 'datetime',
        'is_active' => 'boolean',
        'dose_mg_kg' => 'decimal:2',
        'fluid_rate_ml_kg_day' => 'decimal:2',
    ];

    public function neonate(): BelongsTo
    {
        return $this->belongsTo(Neonate::class);
    }

    public function prescriber(): BelongsTo
    {
        return $this->belongsTo(User::class, 'prescriber_id');
    }
}

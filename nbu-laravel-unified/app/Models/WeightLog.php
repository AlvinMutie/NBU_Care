<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class WeightLog extends Model
{
    use HasFactory;

    protected $fillable = ['neonate_id', 'weight_kg', 'measured_at'];

    protected $casts = [
        'measured_at' => 'datetime',
        'weight_kg' => 'decimal:3',
    ];

    public function neonate(): BelongsTo
    {
        return $this->belongsTo(Neonate::class);
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Vital extends Model
{
    protected $fillable = [
        'neonate_id', 'temperature', 'heart_rate', 'respiratory_rate', 
        'spo2', 'blood_sugar', 'noted_by'
    ];

    public function neonate(): BelongsTo
    {
        return $this->belongsTo(Neonate::class);
    }
}

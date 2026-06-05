<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class LabResult extends Model
{
    use HasFactory;

    protected $fillable = [
        'neonate_id', 'test_name', 'result_data', 'summary_value', 
        'unit', 'reference_range', 'status', 'ordered_at', 'result_at'
    ];

    protected $casts = [
        'result_data' => 'json',
        'ordered_at' => 'datetime',
        'result_at' => 'datetime',
    ];

    public function neonate(): BelongsTo
    {
        return $this->belongsTo(Neonate::class);
    }
}

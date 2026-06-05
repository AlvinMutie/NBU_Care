<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Vital extends Model
{
    use HasFactory;

    protected $fillable = [
        'neonate_id', 'user_id', 'temperature', 'heart_rate', 
        'respiratory_rate', 'oxygen_saturation', 'blood_sugar', 'measured_at'
    ];

    protected $casts = [
        'measured_at' => 'datetime',
        'temperature' => 'decimal:1',
        'blood_sugar' => 'decimal:1',
    ];

    public function neonate(): BelongsTo
    {
        return $this->belongsTo(Neonate::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}

// I'll put others in separate write_file calls to be cleaner as per instructions, 
// although I could technically group them if they were related closely, 
// but separate files for separate models is standard.

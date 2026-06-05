<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class VerificationQueue extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'status',
        'verified_by',
        'verification_date',
        'documents',
        'notes',
    ];

    protected $casts = [
        'documents' => 'json',
        'verification_date' => 'datetime',
    ];

    /**
     * Get the user that owns the verification request.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the user who verified the request.
     */
    public function verifier(): BelongsTo
    {
        return $this->belongsTo(User::class, 'verified_by');
    }
}

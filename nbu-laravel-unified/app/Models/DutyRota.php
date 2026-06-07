<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class DutyRota extends Model
{
    protected $fillable = [
        'user_id', 'date', 'shift', 'role_assigned'
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}

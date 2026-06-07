<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AuditLog extends Model
{
    protected $fillable = [
        'user_id', 'action', 'resource_type', 'resource_id', 'payload', 'ip_address'
    ];

    protected $casts = [
        'payload' => 'json',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}

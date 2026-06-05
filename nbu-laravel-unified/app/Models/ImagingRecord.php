<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ImagingRecord extends Model
{
    use HasFactory;

    protected $fillable = ['neonate_id', 'type', 'findings', 'image_path', 'performed_at'];

    protected $casts = [
        'performed_at' => 'datetime',
    ];

    public function neonate(): BelongsTo
    {
        return $this->belongsTo(Neonate::class);
    }
}

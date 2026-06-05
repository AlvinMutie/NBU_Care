<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ClinicalNote extends Model
{
    use HasFactory;

    protected $fillable = ['neonate_id', 'user_id', 'note_type', 'content'];

    public function neonate(): BelongsTo
    {
        return $this->belongsTo(Neonate::class);
    }

    public function author(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}

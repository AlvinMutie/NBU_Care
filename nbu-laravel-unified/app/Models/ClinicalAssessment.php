<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ClinicalAssessment extends Model
{
    use HasFactory;

    protected $fillable = [
        'neonate_id', 'user_id', 'primary_diagnosis', 
        'working_diagnosis', 'differential_diagnosis', 'systems_review'
    ];

    protected $casts = [
        'systems_review' => 'json',
    ];

    public function neonate(): BelongsTo
    {
        return $this->belongsTo(Neonate::class);
    }

    public function clinician(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}

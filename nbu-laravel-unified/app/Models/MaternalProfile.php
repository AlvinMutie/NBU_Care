<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class MaternalProfile extends Model
{
    use HasFactory;

    protected $fillable = [
        'neonate_id', 'mother_name', 'mother_hospital_number', 'mother_age', 'mother_contact',
        'gravidity', 'parity', 'prev_neonatal_deaths', 'stillbirths', 'preterm_deliveries',
        'medical_history', 'anc_attendance', 'steroids_given', 'infections', 
        'prom_duration_hours', 'pregnancy_complications', 'mode_of_delivery',
        'resuscitation_at_birth', 'meconium_presence'
    ];

    protected $casts = [
        'medical_history' => 'json',
        'anc_attendance' => 'boolean',
        'steroids_given' => 'boolean',
        'resuscitation_at_birth' => 'boolean',
        'meconium_presence' => 'boolean',
    ];

    public function neonate(): BelongsTo
    {
        return $this->belongsTo(Neonate::class);
    }
}

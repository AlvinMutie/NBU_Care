<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Neonate extends Model
{
    protected $fillable = [
        'hospital_number', 'name', 'dob', 'gender', 'birth_weight', 
        'current_weight', 'gestational_age', 'apgar_1', 'apgar_5', 
        'apgar_10', 'place_of_birth', 'delivery_method', 'status',
        'user_id', 'is_simulated', 'case_scenario_type'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function vitals(): HasMany
    {
        return $this->hasMany(Vital::class);
    }

    public function handovers(): HasMany
    {
        return $this->hasMany(Handover::class);
    }
}

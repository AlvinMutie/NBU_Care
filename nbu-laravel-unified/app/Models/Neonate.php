<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Carbon\Carbon;

class Neonate extends Model
{
    use HasFactory;

    protected $fillable = [
        'hospital_number', 'name', 'dob', 'gender', 
        'birth_weight', 'current_weight', 'gestational_age', 
        'admission_diagnosis', 'history', 'mother_phone', 'status',
        'birth_time', 'delivery_method', 'apgar_1', 'apgar_5', 'apgar_10',
        'place_of_birth', 'current_unit', 'bed_number', 
        'assigned_nurse_id', 'consultant_id'
    ];

    protected $casts = [
        'dob' => 'date',
        'birth_weight' => 'decimal:3',
        'current_weight' => 'decimal:3',
    ];

    /**
     * Get the neonate's age in hours or days.
     */
    public function getAgeAttribute(): string
    {
        $dob = Carbon::parse($this->dob);
        if ($this->birth_time) {
            $dob->setTimeFromTimeString($this->birth_time);
        }

        $now = Carbon::now();
        $hours = $now->diffInHours($dob);

        if ($hours < 48) {
            return $hours . ' hours';
        }

        return $now->diffInDays($dob) . ' days';
    }

    public function maternalProfile(): HasOne
    {
        return $this->hasOne(MaternalProfile::class);
    }

    public function vitals(): HasMany
    {
        return $this->hasMany(Vital::class)->orderBy('measured_at', 'desc');
    }

    public function weightLogs(): HasMany
    {
        return $this->hasMany(WeightLog::class)->orderBy('measured_at', 'desc');
    }

    public function assessments(): HasMany
    {
        return $this->hasMany(ClinicalAssessment::class)->orderBy('created_at', 'desc');
    }

    public function notes(): HasMany
    {
        return $this->hasMany(ClinicalNote::class)->orderBy('created_at', 'desc');
    }

    public function labResults(): HasMany
    {
        return $this->hasMany(LabResult::class)->orderBy('ordered_at', 'desc');
    }

    public function imagingRecords(): HasMany
    {
        return $this->hasMany(ImagingRecord::class)->orderBy('performed_at', 'desc');
    }

    public function treatments(): HasMany
    {
        return $this->hasMany(Treatment::class)->orderBy('start_date', 'desc');
    }

    public function alerts(): HasMany
    {
        return $this->hasMany(Alert::class)->orderBy('created_at', 'desc');
    }
}

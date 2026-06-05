<?php

namespace App\Services;

use App\Models\Vital;
use App\Models\Alert;
use App\Models\LabResult;

class MonitoringService
{
    /**
     * Check vitals against safety boundaries and trigger alerts.
     */
    public function checkVitals($neonateId, array $vitals)
    {
        \Illuminate\Support\Facades\Log::info("Running safety engine for Neonate #{$neonateId}", $vitals);

        $temp = $vitals['temperature'] ?? null;
        $sugar = $vitals['blood_sugar'] ?? null;
        $spo2 = $vitals['oxygen_saturation'] ?? null;
        $hr = $vitals['heart_rate'] ?? null;

        // 1. Hypoglycemia Check
        if ($sugar !== null && $sugar < 2.6) {
            $this->triggerAlert($neonateId, 'Hypoglycemia', 'Critical', "Blood sugar critical: {$sugar} mmol/L. Start hypoglycemia protocol.");
        }

        // 2. Oxygen Desaturation Check
        if ($spo2 !== null && $spo2 < 90) {
            $this->triggerAlert($neonateId, 'Desaturation', 'Critical', "Oxygen saturation low: {$spo2}%. Verify airway and FiO2.");
        }

        // 3. Tachycardia / Bradycardia Check
        if ($hr !== null) {
            if ($hr > 180) {
                $this->triggerAlert($neonateId, 'ClinicalBoundary', 'Warning', "Tachycardia detected: {$hr} bpm.");
            } elseif ($hr < 100) {
                $this->triggerAlert($neonateId, 'ClinicalBoundary', 'Critical', "Bradycardia detected: {$hr} bpm.");
            }
        }
    }

    /**
     * Trigger a clinical alert.
     */
    protected function triggerAlert($neonateId, $type, $severity, $message)
    {
        Alert::create([
            'neonate_id' => $neonateId,
            'type' => $type,
            'severity' => $severity,
            'message' => $message,
            'is_resolved' => false,
        ]);
        
        // In a real system, you might trigger a WebSocket event or SMS/Push here.
    }
}

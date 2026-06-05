<?php

namespace App\Observers;

use App\Models\Handover;
use App\Events\VitalCreated;

class HandoverObserver
{
    /**
     * Handle the Handover "created" event.
     */
    public function created(Handover $handover): void
    {
        VitalCreated::dispatch($handover->neonate_id, [
            'temperature' => $handover->temperature,
            'heart_rate' => $handover->heart_rate,
            'respiratory_rate' => $handover->respiratory_rate,
            'oxygen_saturation' => $handover->oxygen_saturation,
            'blood_sugar' => $handover->sugar_level, // Handover uses sugar_level field
        ]);
    }
}

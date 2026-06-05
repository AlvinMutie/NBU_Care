<?php

namespace App\Observers;

use App\Models\Vital;
use App\Events\VitalCreated;

class VitalObserver
{
    /**
     * Handle the Vital "created" event.
     */
    public function created(Vital $vital): void
    {
        VitalCreated::dispatch($vital->neonate_id, [
            'temperature' => $vital->temperature,
            'heart_rate' => $vital->heart_rate,
            'respiratory_rate' => $vital->respiratory_rate,
            'oxygen_saturation' => $vital->oxygen_saturation,
            'blood_sugar' => $vital->blood_sugar,
        ]);
    }
}

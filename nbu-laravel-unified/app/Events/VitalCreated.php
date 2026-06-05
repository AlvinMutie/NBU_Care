<?php

namespace App\Events;

use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class VitalCreated
{
    use Dispatchable, SerializesModels;

    public $neonateId;
    public $vitals;

    /**
     * Create a new event instance.
     * 
     * @param int $neonateId
     * @param array $vitals Array containing temperature, heart_rate, respiratory_rate, oxygen_saturation, blood_sugar
     */
    public function __construct($neonateId, array $vitals)
    {
        $this->neonateId = $neonateId;
        $this->vitals = $vitals;
    }
}

<?php

namespace App\Listeners;

use App\Events\VitalCreated;
use App\Services\MonitoringService;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class ClinicalMonitoringListener
{
    protected $monitoringService;

    /**
     * Create the event listener.
     */
    public function __construct(MonitoringService $monitoringService)
    {
        $this->monitoringService = $monitoringService;
    }

    /**
     * Handle the event.
     */
    public function handle(VitalCreated $event): void
    {
        try {
            $this->monitoringService->checkVitals($event->neonateId, $event->vitals);
        } catch (\Exception $e) {
            \Illuminate\Support\Facades\Log::error("Safety engine failed: " . $e->getMessage());
        }
    }
}

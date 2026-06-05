<?php

namespace App\Providers;

use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        if (env('APP_ENV') === 'production') {
            \Illuminate\Support\Facades\URL::forceScheme('https');
        }

        \Illuminate\Support\Facades\Vite::prefetch(concurrency: 3);

        // Register Model Observers for Safety Engine
        \App\Models\Vital::observe(\App\Observers\VitalObserver::class);
        \App\Models\Handover::observe(\App\Observers\HandoverObserver::class);

        // Manual Event Listener Registration (if auto-discovery is off)
        \Illuminate\Support\Facades\Event::listen(
            \App\Events\VitalCreated::class,
            \App\Listeners\ClinicalMonitoringListener::class
        );
    }
}

Refactor MonitoringService into an event-driven architecture.

Implement:

1. VitalCreated Event
2. VitalObserver OR Event Listener
3. MonitoringService Listener
4. Ensure ALL vitals (including handovers) trigger monitoring

Requirements:
- No controller-based triggering
- Must be system-wide
- Must be fail-safe
- Must include logging when alert engine runs

Output full Laravel implementation.
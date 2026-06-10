<!DOCTYPE html>
<html>
<head>
    <title>Clinical Handover Report</title>
    <style>
        body { font-family: sans-serif; color: #333; line-height: 1.6; }
        .header { text-align: center; border-bottom: 2px solid #10b981; padding-bottom: 20px; margin-bottom: 30px; }
        .section { margin-bottom: 25px; }
        .section-title { font-weight: bold; font-size: 14px; color: #10b981; text-transform: uppercase; margin-bottom: 8px; border-bottom: 1px solid #eee; }
        .content { font-size: 12px; }
        .grid { display: table; width: 100%; }
        .grid-item { display: table-cell; width: 50%; }
        .label { font-weight: bold; color: #666; }
        .footer { margin-top: 50px; font-size: 10px; color: #999; text-align: center; border-top: 1px solid #eee; padding-top: 10px; }
    </style>
</head>
<body>
    <div class="header">
        <h1>Clinical Handover Report</h1>
        <p>Generated via NeoDesk LMS | {{ now()->format('d M Y H:i') }}</p>
    </div>

    <div class="section">
        <div class="section-title">Patient Identification</div>
        <div class="grid">
            <div class="grid-item">
                <span class="label">Name:</span> {{ $handover->neonate->name }}<br>
                <span class="label">Hospital ID:</span> {{ $handover->neonate->hospital_number }}
            </div>
            <div class="grid-item">
                <span class="label">GA:</span> {{ $handover->neonate->gestational_age }} weeks<br>
                <span class="label">Current Weight:</span> {{ $handover->neonate->current_weight }} kg
            </div>
        </div>
    </div>

    <div class="section">
        <div class="section-title">S - Situation</div>
        <div class="content">{{ $handover->situation ?? $handover->clinical_status }}</div>
    </div>

    <div class="section">
        <div class="section-title">B - Background</div>
        <div class="content">{{ $handover->background ?? 'Admission Date: ' . $handover->neonate->dob }}</div>
    </div>

    <div class="section">
        <div class="section-title">A - Assessment</div>
        <div class="content">
            {{ $handover->assessment ?? 'Treatment Plan: ' . $handover->treatment_plan }}
            @if($handover->vitals_snapshot)
                <br><br>
                <span class="label">Vitals Snapshot:</span>
                <ul>
                    @foreach($handover->vitals_snapshot as $key => $value)
                        <li>{{ ucfirst(str_replace('_', ' ', $key)) }}: {{ $value }}</li>
                    @endforeach
                </ul>
            @endif
        </div>
    </div>

    <div class="section">
        <div class="section-title">R - Recommendation</div>
        <div class="content">{{ $handover->recommendation ?? 'N/A' }}</div>
    </div>

    <div class="footer">
        Handover by: {{ $handover->nurse->name }} ({{ $handover->nurse->role }}) | 
        Shift: {{ $handover->shift_type }} | 
        NeoDesk Security Protocol v16.0
    </div>
</body>
</html>

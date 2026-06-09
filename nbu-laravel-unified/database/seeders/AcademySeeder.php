<?php

namespace Database\Seeders;

use App\Models\Flashcard;
use App\Models\Scenario;
use Illuminate\Database\Seeder;

class AcademySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Flashcard::truncate();
        Scenario::truncate();

        $flashcards = [
            ['title' => 'APGAR Score', 'category' => 'Routine', 'content' => 'Used to evaluate a newborn\'s physical condition and determines any immediate need for extra medical or emergency care.'],
            ['title' => 'CPAP pressure', 'category' => 'Clinical', 'content' => 'The starting pressure for neonatal CPAP is usually 5-7 cmH2O.'],
            ['title' => 'Sepsis signs', 'category' => 'Critical', 'content' => 'Lethargy, poor feeding, temperature instability, respiratory distress.'],
            ['title' => 'Phototherapy', 'category' => 'Routine', 'content' => 'Used for treating neonatal jaundice by lowering bilirubin levels in the blood.'],
            ['title' => 'Kangaroo Care', 'category' => 'Routine', 'content' => 'Skin-to-skin contact between a parent and a newborn, especially preterm babies.'],
            ['title' => 'VLBW Definition', 'category' => 'Clinical', 'content' => 'Very Low Birth Weight is defined as a birth weight of less than 1500 grams.'],
            ['title' => 'ELBW Definition', 'category' => 'Critical', 'content' => 'Extremely Low Birth Weight is defined as a birth weight of less than 1000 grams.'],
            ['title' => 'Hypoglycemia Range', 'category' => 'Critical', 'content' => 'In neonates, a blood glucose level less than 2.6 mmol/L is often considered hypoglycemic.'],
            ['title' => 'Surfactant Therapy', 'category' => 'Clinical', 'content' => 'Used for Respiratory Distress Syndrome (RDS) to help keep the lungs open.'],
            ['title' => 'Necrotizing Enterocolitis (NEC)', 'category' => 'Critical', 'content' => 'A serious gastrointestinal problem where intestinal tissue dies.'],
        ];

        foreach ($flashcards as $f) {
            Flashcard::create($f);
        }

        $scenarios = [
            ['title' => 'RDS Management', 'description' => 'A 28-weeker showing signs of respiratory distress.', 'problem' => 'What is the immediate action?', 'solution' => 'Start CPAP and consider surfactant.', 'difficulty' => 'Advanced'],
            ['title' => 'Jaundice Treatment', 'description' => 'Bilirubin levels at 300 umol/L in a 3-day old.', 'problem' => 'What therapy is indicated?', 'solution' => 'Intensive Phototherapy.', 'difficulty' => 'Intermediate'],
            ['title' => 'Hypoglycemia Fix', 'description' => 'Neonate with BS 1.8 mmol/L.', 'problem' => 'Initial management?', 'solution' => '10% Dextrose bolus (2ml/kg).', 'difficulty' => 'Advanced'],
            ['title' => 'Birth Asphyxia', 'description' => 'APGAR 3 at 1 minute.', 'problem' => 'Initial resuscitation step?', 'solution' => 'Positive Pressure Ventilation (PPV).', 'difficulty' => 'Critical'],
            ['title' => 'Late Preterm Feeding', 'description' => '35-weeker with poor suck.', 'problem' => 'Feeding strategy?', 'solution' => 'Nasogastric Tube (NGT) feeding.', 'difficulty' => 'Intermediate'],
            ['title' => 'Sepsis Evaluation', 'description' => 'Temp 38.5C, lethargic.', 'problem' => 'Diagnostic steps?', 'solution' => 'Full Blood Count (FBC), CRP, and Blood Culture.', 'difficulty' => 'Intermediate'],
            ['title' => 'Meconium Aspiration', 'description' => 'Thick meconium at birth, not breathing.', 'problem' => 'Action?', 'solution' => 'Resuscitate as per NLS guidelines.', 'difficulty' => 'Critical'],
            ['title' => 'Anemia in Preterm', 'description' => 'Hb 8.0 g/dL in a stable 30-weeker.', 'problem' => 'When to transfuse?', 'solution' => 'As per institutional restrictive transfusion guidelines.', 'difficulty' => 'Advanced'],
            ['title' => 'IV Fluid Calculation', 'description' => 'Day 1 neonate, 1.5kg.', 'problem' => 'Total fluid volume at 60ml/kg?', 'solution' => '90ml per 24 hours.', 'difficulty' => 'Intermediate'],
            ['title' => 'Cord Care', 'description' => 'Routine care of umbilical stump.', 'problem' => 'Recommended cleaning agent?', 'solution' => 'Dry care or Chlorhexidine as per WHO.', 'difficulty' => 'Essential'],
        ];

        foreach ($scenarios as $s) {
            Scenario::create($s);
        }
    }
}

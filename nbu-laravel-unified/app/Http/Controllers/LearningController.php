<?php

namespace App\Http\Controllers;

use App\Models\Flashcard;
use App\Models\Scenario;
use Illuminate\Http\Request;

class LearningController extends Controller
{
    public function recordCalculation(Request $request)
    {
        $user = $request->user();
        $request->validate([
            'is_correct' => 'required|boolean'
        ]);

        $user->total_calculations += 1;
        if ($request->is_correct) {
            $user->correct_calculations += 1;
        }

        $user->calculation_accuracy = ($user->correct_calculations / $user->total_calculations) * 100;
        $user->save();

        return response()->json([
            'success' => true,
            'data' => [
                'accuracy' => $user->calculation_accuracy,
                'total' => $user->total_calculations
            ]
        ]);
    }

    public function currentChallenge(Request $request)
    {
        $user = $request->user();
        
        // Determine current day based on streak or some other logic
        $currentDay = $user->quiz_streak + 1;
        
        // Find scenario for this day (cycle through 5 scenarios if needed, or have 30 scenarios)
        // For now, let's assume we have 5 core scenarios as requested
        $scenarioIndex = ($currentDay - 1) % 5;
        $scenarios = [
            ['type' => 'Extreme Prematurity', 'day' => 1],
            ['type' => 'Neonatal Jaundice', 'day' => 2],
            ['type' => 'Sepsis', 'day' => 3],
            ['type' => 'Respiratory Distress Syndrome', 'day' => 4],
            ['type' => 'Infant of a Diabetic Mother', 'day' => 5],
        ];
        
        $challenge = $scenarios[$scenarioIndex];
        
        return response()->json([
            'success' => true,
            'data' => [
                'day' => $currentDay,
                'challenge' => $challenge,
                'streak' => $user->quiz_streak,
                'accuracy' => $user->calculation_accuracy
            ]
        ]);
    }

    public function flashcards()
    {
        $flashcards = Flashcard::all();
        return response()->json([
            'success' => true,
            'data' => $flashcards
        ]);
    }

    public function storeFlashcard(Request $request)
    {
        $request->validate([
            'title' => 'required|string',
            'category' => 'required|string',
            'content' => 'required|string',
            'execution_logic' => 'nullable|string',
        ]);

        $flashcard = Flashcard::create($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Flashcard created.',
            'data' => $flashcard
        ]);
    }

    public function updateFlashcard(Request $request, Flashcard $flashcard)
    {
        $flashcard->update($request->all());
        return response()->json([
            'success' => true,
            'message' => 'Flashcard updated.',
            'data' => $flashcard
        ]);
    }

    public function destroyFlashcard(Flashcard $flashcard)
    {
        $flashcard->delete();
        return response()->json([
            'success' => true,
            'message' => 'Flashcard deleted.'
        ]);
    }

    public function scenarios()
    {
        $scenarios = Scenario::all();
        return response()->json([
            'success' => true,
            'data' => $scenarios
        ]);
    }

    public function storeScenario(Request $request)
    {
        $request->validate([
            'title' => 'required|string',
            'description' => 'required|string',
            'problem' => 'required|string',
            'solution' => 'required|string',
            'maths_data' => 'nullable|array',
            'difficulty' => 'nullable|string',
        ]);

        $scenario = Scenario::create($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Scenario created.',
            'data' => $scenario
        ]);
    }

    public function updateScenario(Request $request, Scenario $scenario)
    {
        $scenario->update($request->all());
        return response()->json([
            'success' => true,
            'message' => 'Scenario updated.',
            'data' => $scenario
        ]);
    }

    public function destroyScenario(Scenario $scenario)
    {
        $scenario->delete();
        return response()->json([
            'success' => true,
            'message' => 'Scenario deleted.'
        ]);
    }
}

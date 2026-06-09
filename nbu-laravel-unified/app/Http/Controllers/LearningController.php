<?php

namespace App\Http\Controllers;

use App\Models\Flashcard;
use App\Models\Scenario;
use Illuminate\Http\Request;

class LearningController extends Controller
{
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

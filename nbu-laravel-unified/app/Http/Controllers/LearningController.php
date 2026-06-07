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

    public function scenarios()
    {
        $scenarios = Scenario::all();
        return response()->json([
            'success' => true,
            'data' => $scenarios
        ]);
    }
}

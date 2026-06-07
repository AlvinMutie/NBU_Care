<?php

namespace App\Http\Controllers;

use App\Models\Neonate;
use Illuminate\Http\Request;

class NeonateController extends Controller
{
    public function index()
    {
        $neonates = Neonate::all();
        return response()->json([
            'success' => true,
            'data' => $neonates
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'hospital_number' => 'required|string|unique:neonates',
            'name' => 'required|string|max:255',
            'dob' => 'required|date',
            'gender' => 'required|string',
            'birth_weight' => 'required|numeric',
            'current_weight' => 'required|numeric',
            'gestational_age' => 'required|integer',
        ]);

        $neonate = Neonate::create($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Neonate admitted successfully.',
            'data' => $neonate
        ], 201);
    }

    public function show(Neonate $neonate)
    {
        return response()->json([
            'success' => true,
            'data' => $neonate->load('vitals', 'handovers')
        ]);
    }

    public function update(Request $request, Neonate $neonate)
    {
        $neonate->update($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Neonate record updated.',
            'data' => $neonate
        ]);
    }

    public function destroy(Neonate $neonate)
    {
        $neonate->delete();
        return response()->json([
            'success' => true,
            'message' => 'Neonate record deleted.'
        ]);
    }
}

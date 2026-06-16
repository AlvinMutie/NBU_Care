<?php

namespace App\Http\Controllers;

use App\Models\Neonate;
use Illuminate\Http\Request;

class NeonateController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        
        if ($user->role === 'Student') {
            $neonates = Neonate::where('user_id', $user->id)
                               ->where('is_simulated', true)
                               ->get();
        } else {
            $neonates = Neonate::where('is_simulated', false)->get();
        }

        return response()->json([
            'success' => true,
            'data' => $neonates
        ]);
    }

    public function store(Request $request)
    {
        $user = $request->user();
        
        $request->validate([
            'hospital_number' => 'required|string|unique:neonates',
            'name' => 'required|string|max:255',
            'dob' => 'required|date',
            'gender' => 'required|string',
            'birth_weight' => 'required|numeric',
            'current_weight' => 'required|numeric',
            'gestational_age' => 'required|integer',
        ]);

        $data = $request->all();
        
        if ($user->role === 'Student') {
            $data['user_id'] = $user->id;
            $data['is_simulated'] = true;
        } else {
            $data['is_simulated'] = false;
        }

        $neonate = Neonate::create($data);

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
        $request->validate([
            'hospital_number' => 'sometimes|required|string|unique:neonates,hospital_number,' . $neonate->id,
            'name' => 'sometimes|required|string|max:255',
            'dob' => 'sometimes|required|date',
            'gender' => 'sometimes|required|string',
            'birth_weight' => 'sometimes|required|numeric',
            'current_weight' => 'sometimes|required|numeric',
            'gestational_age' => 'sometimes|required|integer',
            'status' => 'sometimes|required|string',
        ]);

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

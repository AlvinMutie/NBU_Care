<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'hospital_id' => 'required|string|exists:preauthorized_staff,hospital_id|unique:users,hospital_id',
        ], [
            'hospital_id.exists' => 'This Hospital Staff ID is not authorized to register. Please contact ICT Support.',
            'hospital_id.unique' => 'This Hospital Staff ID has already been registered to an active account.',
        ]);

        $staff = \Illuminate\Support\Facades\DB::table('preauthorized_staff')
            ->where('hospital_id', $request->hospital_id)
            ->first();

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'hospital_id' => $request->hospital_id,
            'role' => $staff->role ?? 'Student',
            'status' => 'Pending',
            'is_verified' => false,
        ]);

        event(new Registered($user));

        return redirect(route('pending-approval'));
    }
}

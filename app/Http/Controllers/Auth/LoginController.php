<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class LoginController extends Controller
{
    // ✅ Show the login form (GET)
    public function showLoginForm()
    {
        return view('login'); // Change this if your login view is elsewhere (e.g. 'login')
    }

    // ✅ Handle login submission (POST)
    public function login(Request $request)
    {
        // Validate login input
        $request->validate([
            'name' => 'required|string',
            'password' => 'required|string',
        ]);

        // Check if user exists
        $user = User::where('name', $request->name)->first();

        if (!$user) {
            return response()->json([
                'message' => 'No user found with this name.',
                'errors' => ['name' => ['No user found with this name.']]
            ], 422);
        }

        // Attempt to log in
        if (Auth::attempt(['name' => $request->name, 'password' => $request->password])) {
            $request->session()->regenerate();

            return response()->json([
                'message' => 'Login successful!',
                'redirect' => route('dashboard')
            ]);
        }

        // If password is incorrect
        return response()->json([
            'message' => 'Incorrect password.',
            'errors' => ['password' => ['Incorrect password.']]
        ], 422);
    }
}

<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\TaskController;

// ✅ Show login form
Route::get('/login', function () {
    return view('login'); // or [LoginController::class, 'showLoginForm']
})->name('login');

// ✅ Show register form
Route::get('/register', function () {
    return view('register');
})->name('register');

// ✅ Submit login and register forms
Route::post('/login', [LoginController::class, 'login'])->name('login.submit');
Route::post('/register', [RegisterController::class, 'register'])->name('register.submit');

// ✅ Authenticated dashboard
Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware('auth')->name('dashboard');

// ✅ Logout route
Route::get('/logout', function () {
    Auth::logout();
    request()->session()->invalidate();
    request()->session()->regenerateToken();
    return redirect()->route('login');
})->name('logout');

// Optional: Redirect '/' to login
Route::redirect('/', '/login');

Route::post('/tasks', [TaskController::class, 'store'])->name('tasks.store');

Route::get('/tasks', [TaskController::class, 'index'])->name('tasks.index');

Route::get('/tasks/search', [TaskController::class, 'search'])->name('tasks.search');

Route::get('/tasks/{id}', [TaskController::class, 'show']);

Route::put('/tasks/{id}', [TaskController::class, 'update']);

Route::delete('/tasks/{id}', [TaskController::class, 'destroy']);

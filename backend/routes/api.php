<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\QCMController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\TPController;
use App\Http\Controllers\AdminController;

/*
|--------------------------------------------------------------------------
| PUBLIC ROUTES
|--------------------------------------------------------------------------
*/

Route::post('/login', [AuthController::class, 'login']);

/*
|--------------------------------------------------------------------------
| PROTECTED ROUTES (USER)
|--------------------------------------------------------------------------
*/

Route::middleware('auth:sanctum')->group(function () {

    // 👤 Auth
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);

    // 📚 Courses
    Route::get('/courses', [CourseController::class, 'index']);

    // 📘 Books (PDF)
    Route::get('/books', [BookController::class, 'index']);

    // 🧪 QCM
    Route::get('/qcm', [QCMController::class, 'index']);
    Route::post('/qcm/submit', [QCMController::class, 'submit']);
    Route::get('/qcm/results', [QCMController::class, 'results']);

    // 💻 TP
    Route::get('/tp', [TPController::class, 'index']);
});

/*
|--------------------------------------------------------------------------
| ADMIN ROUTES
|--------------------------------------------------------------------------
*/

Route::middleware(['auth:sanctum', 'admin'])->group(function () {

    // 📊 Admin dashboard
    Route::get('/admin/stats', [AdminController::class, 'stats']);

    // 📚 Manage books
    Route::post('/books', [BookController::class, 'store']);
    Route::delete('/books/{id}', [BookController::class, 'destroy']);

    // 🧪 Manage QCM
    Route::post('/qcm', [QCMController::class, 'store']);

    // 💻 Manage TP
    Route::post('/tp', [TPController::class, 'store']);
    Route::delete('/tp/{id}', [TPController::class, 'destroy']);
});
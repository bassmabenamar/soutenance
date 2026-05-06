<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\QCMController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\TPController;

/*
|--------------------------------------------------------------------------
| PUBLIC
|--------------------------------------------------------------------------
*/
Route::post('/login', [AuthController::class, 'login']);

/*
|--------------------------------------------------------------------------
| AUTH
|--------------------------------------------------------------------------
*/
Route::middleware('auth:sanctum')->group(function () {

    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);

    /*
    |--------------------------------------------------------------------------
    | 🎓 STUDENT
    |--------------------------------------------------------------------------
    */

    // ✅ ALL COURSES (for CoursesPage = languages list)
    Route::get('/courses', [CourseController::class, 'index']);

    // ✅ FILTER BY CATEGORY (VERY IMPORTANT 🔥)
    Route::get('/courses/category/{category}', [CourseController::class, 'byCategory']);

    // ✅ COURSE DETAIL (PDF page)
    Route::get('/courses/{id}', [CourseController::class, 'show']);

    // BOOKS
    Route::get('/books', [BookController::class, 'index']);

    // QCM
    Route::get('/qcm', [QCMController::class, 'index']);
    Route::post('/qcm/submit', [QCMController::class, 'submit']);
    Route::get('/qcm/results', [QCMController::class, 'results']);

    // TP
    Route::get('/tp', [TPController::class, 'index']);

    // Dashboard
    Route::get('/student/dashboard', [StudentController::class, 'dashboard']);
    Route::get('/languages', [CourseController::class, 'languages']);
    Route::get('/student/qcm/languages', [QCMController::class, 'languages']);
    Route::get('/student/qcm/{category}', [QCMController::class, 'getByCategory']);
    Route::get('/student/certifications', [StudentController::class, 'certifications']);
    Route::get('/student/profile', [StudentController::class, 'profile']);
    /*
    |--------------------------------------------------------------------------
    | 🛠️ ADMIN
    |--------------------------------------------------------------------------
    */
    Route::middleware('admin')->group(function () {

        Route::get('/admin/dashboard', [AdminController::class, 'dashboard']);
        Route::get('/admin/stats', [AdminController::class, 'stats']);
        Route::get('/admin/courses', [AdminController::class, 'courses']);
        Route::get('/admin/activities', [AdminController::class, 'activities']);

        // COURSES
        Route::post('/admin/courses/upload', [CourseController::class, 'upload']);
        Route::delete('/admin/courses/{id}', [CourseController::class, 'destroy']);

        // QCM
        Route::get('/admin/qcm', [QCMController::class, 'index']);
        Route::post('/admin/qcm/store', [QCMController::class, 'store']);
        Route::delete('/admin/qcm/{id}', [QCMController::class, 'destroy']);

        // USERS
Route::get('/admin/users', [AdminController::class, 'users']);
Route::patch('/admin/users/{id}/status', [AdminController::class, 'toggleUserStatus']);


// --- CERTIFICATES ---
Route::get('/admin/certificates/stats', [AdminController::class, 'certificateStats']);
Route::get('/admin/certificates/eligibility', [AdminController::class, 'certificateEligibility']);
Route::get('/admin/certificates/generate/{userId}', [AdminController::class, 'generateCertificate']);    });
// Example: get rules
Route::get('/admin/certificates/rules', [AdminController::class, 'getCertificateRules']);

// Example: update rules
Route::post('/admin/certificates/rules/update', [AdminController::class, 'updateCertificateRules']);
});
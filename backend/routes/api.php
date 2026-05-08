<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\{
    AuthController,
    AdminController,
    QcmController,
    CourseController,
    LanguageController,
    ResultController,
    StudentController,
    CertificationController,
    UserController,
    TPController
};

/* ================= AUTH ================= */
Route::post('/login', [AuthController::class, 'login']);

/* ================= PUBLIC ================= */
Route::get('/languages', [LanguageController::class, 'index']);
Route::get('/courses/category/{languageId}', [CourseController::class, 'byLanguage']);
Route::get('/courses/{id}', [CourseController::class, 'show']);

/* ================= PROTECTED ================= */
Route::middleware('auth:sanctum')->group(function () {

    /* AUTH */
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);

    /* STUDENT */
    Route::prefix('student')->group(function () {

        Route::get('/dashboard', [StudentController::class, 'dashboard']);

        // QCM
        Route::get('/qcm/languages', [QcmController::class, 'languages']);
        Route::get('/qcm/{languageId}', [QcmController::class, 'getByLanguage']);
        Route::post('/qcm/submit', [QcmController::class, 'submit']);

        // results
        Route::get('/results', [ResultController::class, 'index']);

        // certifications
        Route::get('/certifications', [CertificationController::class, 'index']);
    });

    /* ADMIN */
    Route::prefix('admin')->group(function () {

        Route::get('/stats', [AdminController::class, 'stats']);

        Route::get('/users', [UserController::class, 'index']);
        Route::post('/users/store', [UserController::class, 'store']);
        Route::delete('/users/{id}', [UserController::class, 'destroy']);

        Route::get('/courses', [CourseController::class, 'index']);
        Route::post('/courses/upload', [CourseController::class, 'store']);
        Route::delete('/courses/{id}', [CourseController::class, 'destroy']);

        Route::get('/qcm', [QcmController::class, 'index']);
        Route::post('/qcm/store', [QcmController::class, 'store']);
        Route::delete('/qcm/{id}', [QcmController::class, 'destroy']);
    });

    /* TP */
    Route::prefix('admin/tp')->group(function () {
        Route::get('/', [TPController::class, 'index']);
        Route::post('/store', [TPController::class, 'store']);
        Route::get('/{id}', [TPController::class, 'show']);
        Route::delete('/{id}', [TPController::class, 'destroy']);
    });
});
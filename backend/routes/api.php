<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\AuthController;

Route::get('/categories', [CategoryController::class, 'index']);
Route::get('/categories/{id}/products', [CategoryController::class, 'products']);

Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{id}', [ProductController::class, 'show']);
Route::get('/products/slug/{slug}', [ProductController::class, 'showBySlug']);

Route::prefix('auth')->group(function () {

    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
        //->middleware('throttle:login');

    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/me', [AuthController::class, 'me']);
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::post('/refresh', [AuthController::class, 'refresh']);
    });
});

//Route::middleware(['auth:sanctum', 'role:customer,admin'])->group(function () {
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/orders', [OrderController::class, 'store']);
    Route::get('/orders', [OrderController::class, 'index']);
    Route::get('/orders/{order}', [OrderController::class, 'show']);
});

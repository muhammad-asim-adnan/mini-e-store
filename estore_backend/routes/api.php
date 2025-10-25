<?php


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\AuthController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::get('/all-products', [ProductController::class, 'getProducts']);
Route::post('/store-product', [ProductController::class, 'storeProducts']);


Route::get('/sanctum/csrf-cookie', function () {
    return response()->json(['message' => 'CSRF cookie set']);
});

// Public routes
Route::post('/login', [AuthController::class, 'login']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);
});
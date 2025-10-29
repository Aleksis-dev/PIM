<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductGroupController;
use App\Http\Controllers\ProductsController;
use Illuminate\Support\Facades\Route;

#Route::get('/user', function (Request $request) {
#    return $request->user();
#})->middleware('auth:sanctum');

Route::post('/admin/login', [AuthController::class, 'login']);
Route::get('/admin/authorize', [AuthController::class, 'authorize_check']);

Route::apiResource('/product_group', ProductGroupController::class);
Route::post('/product_group/{product_group}/products', [ProductsController::class, 'store']);

Route::get('/products', [ProductsController::class, 'index']);
Route::get('/products/{products}', [ProductsController::class, 'show']);
Route::put('/products/{products}', [ProductsController::class, 'update']);
Route::delete('/products/{products}', [ProductsController::class, 'destroy']);

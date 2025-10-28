<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductGroupController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

#Route::get('/user', function (Request $request) {
#    return $request->user();
#})->middleware('auth:sanctum');

Route::post('/admin/login', [AuthController::class, 'login']);
Route::apiResource('/product_group', ProductGroupController::class)->middleware('auth:sanctum');

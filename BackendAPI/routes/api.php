<?php

use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::controller(UserController::class)->prefix('user')->group(function () {
    Route::get('/','index');
    Route::get('/show/{user}','show');    // isme user ek id hai user ki or ye id user ko pass ho jayegi 
    Route::post('/create', 'create');
    Route::post('/update/{user}', 'update');
    Route::get('/delete/{user}', 'destroy');
});

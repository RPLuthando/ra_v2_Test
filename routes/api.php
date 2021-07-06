<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


//Public routes
//Login
Route::post('/login', [\App\Http\Controllers\AuthController::class, 'sendLoginLink']);

//Protected routes
Route::group(['middleware' => ['auth:sanctum']], function () {
  //Auth
  Route::post('/logout', [\App\Http\Controllers\AuthController::class, 'logout']);
  Route::post('/register', [\App\Http\Controllers\UserController::class, 'register']);
  //User
  Route::get('/users', [\App\Http\Controllers\UserController::class, 'listUsers']);
  Route::get('/user/{id}', [\App\Http\Controllers\UserController::class, 'singleUser']);
  Route::put('/user/{id}', [\App\Http\Controllers\UserController::class, 'updateUser']);
  Route::post('/user/{id}', [\App\Http\Controllers\UserController::class, 'softDelete']);
  Route::get('/restore/{id}', [\App\Http\Controllers\UserController::class, 'restoreSoftDelete']);
  Route::get('/search/{user_name}', [\App\Http\Controllers\UserController::class, 'searchUser']);
  //Group
  Route::post('/create_group', [\App\Http\Controllers\GroupController::class, 'createGroup']);
  Route::get('/view_group', [\App\Http\Controllers\GroupController::class, 'viewGroup']);
  Route::put('/update_group/{id}', [\App\Http\Controllers\GroupController::class, 'updateGroup']);
  Route::post('/delete_group/{id}', [\App\Http\Controllers\GroupController::class, 'deleteGroup']);
  Route::get('/view_group/{id}', [\App\Http\Controllers\GroupController::class, 'viewSingleGroup']);
  Route::get('/search_group/{id}', [\App\Http\Controllers\GroupController::class, 'searchGroup']);
});


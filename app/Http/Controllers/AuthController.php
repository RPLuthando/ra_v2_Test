<?php

namespace App\Http\Controllers;

use App\Mail\UserLoginMail;
use App\Models\User;
use Validator;
use http\Env\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Grosv\LaravelPasswordlessLogin\LoginUrl;
use Illuminate\Support\Facades\Mail;
use Laravel\Sanctum\HasApiTokens;

class AuthController extends Controller
{
  function sendLoginLink(Request $request) {
    $email = $request->get('user_email');
    $user = User::where('user_email', $email)->first();

    if(!$user) {
      return response()->json([
        'status' => 404,
        'message' => 'User email not found!'
      ]);
    }
    $user_email = $user->user_email;
    $generator = new LoginUrl($user);
    $data['url'] = $generator->generate();
    $data['user_email'] = $user_email;
    $userData['user'] = $user;

    Mail::to($user_email)->send(new UserLoginMail($data));

    $token = $user->createToken('logintoken');

    return response()->json([
      'status' => 200,
      'data' => $data,
      'user' => $userData,
      'token' => $token,
      'message' => 'Email successfully sent.'
    ]);
  }

  public function logout(Request $request) {
    $request->user()->currentAccessToken()->delete();
    return response()->json([
      'status' => 200,
      'message' => 'You have logged out successfully!'
    ]);
  }
}

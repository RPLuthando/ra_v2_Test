<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
  public function register(Request $request) {

    $email = $request->get('user_email');
    $user = User::where('user_email', '=', $email)->first();

    if ($user === null) {
      $user = new User();
      $user->entity_id = $request->entity_id;
      $user->created_by_id = $request->created_by_id;
      $user->user_name = $request->user_name;
      $user->user_surname = $request->user_surname;
      $user->user_email = $request->user_email;
      $user->group_name = $request->group_name;
      $user->active = $request->active;
      $user->save();

      $token = $user->createToken('registertoken');

      return response()->json([
        'user' => $user,
        'token' => $token,
        'status' => 200,
        'message' => 'Registration successful.'
      ]);
    } else {
      return response()->json([
        'status' => 422,
        'message' => 'Email already exist.'
      ]);
    }
  }

  public function listUsers() {
    return User::all();
  }

  public function singleUser($id) {
    return User::find($id);
  }

  public function updateUser(Request $request, $id) {
    $user = User::find($id);
    $user->update($request->all());

    return response()->json([
      'status' => 201,
      'message' => 'Update successful.'
    ]);
  }

  public function softDelete($id) {
    $user = User::find($id);
    $user->delete();

    return response()->json([
      'status' => 201,
      'message' => 'User deleted successfully.'
    ]);
  }

  public function restoreSoftDelete($id) {
    User::withTrashed()->find($id)->restore();

    return response()->json([
      'status' => 201,
      'message' => 'User restored successfully.'
    ]);
  }

  public function searchUser($user_name) {
    return User::where('user_name', 'like', '%'.$user_name.'%')->get();
  }
}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Group;

class GroupController extends Controller
{
    public function createGroup(Request $request) {

      $group_name_request = $request->get('group_name');
      $group_name = Group::where('group_name', '=', $group_name_request)->first();

      if ($group_name === null) {
        $group = new Group();
        $group->created_by_id = $request->created_by_id;
        $group->group_name = $request->group_name;
        $group->save();

        return response()->json([
          'group' => $group,
          'status' => 200,
          'message' => 'Group created successfully.'
        ]);
      } else {
        return response()->json([
          'status' => 422,
          'message' => 'Group already exist.'
        ]);
      }
    }

    public function viewGroup() {
      return Group::all();
    }

    public function updateGroup(Request $request, $id) {
      $group = Group::find($id);
      $group->update($request->all());

      return response()->json([
        'status' => 201,
        'message' => 'Update successful.'
      ]);
    }

    public function deleteGroup($id) {
      $group = Group::find($id);
      $group->delete();

      return response()->json([
        'status' => 201,
        'message' => 'Group deleted successfully.'
      ]);
    }

    public function viewSingleGroup($id) {
      return Group::find($id);
    }

  public function searchGroup($group_name) {
    return Group::where('group_name', 'like', '%'.$group_name.'%')->get();
  }
}

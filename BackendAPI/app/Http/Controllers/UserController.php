<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return User::all();
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $user = Validator::make($request->all(), [
            'name'=> ['required'],
            'email'=> ['required', 'email', 'unique:users'],
            'course' => ['required'],
            'gender' => ['required'],
            'photo' => ['required', 'image'],
            'hobbie' => ['required'],
        ]);


        if($user->fails())
        {
            return response($user->messages(), 200);
        }

        $image = $request->file('photo');
        $imageName = time() . '_' . $image->getClientOriginalName();
        $image->move(public_path('Images'), $imageName);

        $userData = $request->only(['name', 'email', 'course', 'gender', 'hobbie']);
        $userData['photo'] = $imageName;

        $result = User::create($userData);

        if($result)
            return successResponse("Data addedd Successful");
        else
            return errorResponse("Data not Successfully added!");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        return $user;
    }

  //  OR

    // public function show (User $user)
    // {
    //     $user = User::find($id);
    //     return $user;
    // }
    
//---------------

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        if ($request->hasFile('photo')) {
            $imagePath = public_path("Images/{$user->photo}");
            if (File::exists($imagePath)) {
                File::delete($imagePath);
            }

            $image = $request->file('photo');
            $imageName = time() . '_' . $image->getClientOriginalName();
            $image->move(public_path('Images'), $imageName);

            $user->photo = $imageName;
        }

        $user->name = $request->name;
        $user->email = $request->email;
        $user->course = $request->course;
        $user->gender = $request->gender;
        $user->hobbie = $request->hobbie;

        $user->save();

        return successResponse("Data Successfully Updated");

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $imagePath = public_path("Images/{$user->photo}");
        if (File::exists($imagePath))
            File::delete($imagePath);

            $user->delete();
            return successResponse("Data Successfully Deleted");
    }
}

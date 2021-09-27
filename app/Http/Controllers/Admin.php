<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\User;

use Mail;

class Admin extends Controller
{
     public function adminloginview()
    {
      return view('auth/login');
    }


    public function accountverified($id)
    {

      $user = User::where('id',$id)->get();

      if($user->count() > 0)
      {

        if($user->first()->user_status > 0)
        {
          return redirect('/');
        }else{


          User::where('id',$id)->update([
            'user_status'=>1
          ]);

          return view('accountverified');

        }





      }else
      {
        return redirect('/');
      }
     

      

    }

     public function sentemailview()
    {
        return view('accountverification');
    }


}

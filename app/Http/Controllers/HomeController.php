<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Illuminate\Support\Facades\Auth;

use App\Models\User;

use Yajra\Datatables\Datatables;



class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */

    public function adminview()
    {
        return view('home');
    }

    public function userview()
    {
        return view('userview');
    }

    public function guestuserview()
    {
         return view('guestuserview');
    }

    public function index()
    {

        $user = Auth::user();

        if($user->role_id == 1)
        {
           return $this->adminview();
        }
        elseif($user->role_id == 2)
        {
           return $this->userview();
        }
        else{

          return  $this->guestuserview();
        }

       
        
       // return view('home');
    }

    public function userlistingview()
    {
       
       $data['list'] = User::where('role_id','>',1)->get();

        return view('userslist',$data);
    }

    public function userlistdatatable()
    {
        $users = User::where('role_id','>',1)->get();
        
        return Datatables::of($users)
        ->addColumn('status', function($query){
           return $query->user_status==1 ? 'Active' : 'Inactive';
        })
        ->addColumn('date', function($query){
           return date('m-d-Y h:i a',strtotime($query->created_at));
        })
        ->make();
    }

   
}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\User;

use Illuminate\Support\Facades\DB;

use Mail;

use Auth;

use Response;
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

    public function googledatastore(Request $req)
    {
      $posted_data = $req->posted_data;

      $posted_arr  = json_decode($posted_data,true);

      $user_id = Auth::user()->id;

      if(isset($posted_arr[0]['click_event_data']))
      {
          $resp_one = $posted_arr[0]['click_event_data'];
          $resp_two = $posted_arr[1]['place_info_data'];



          $data_for_insert = [
            'user_id'=>$user_id,
            'click_event_lat'=>$resp_one['click_event_lat'],
            'click_event_lng'=>$resp_one['click_event_lng'],
            'click_event_place'=>$resp_one['click_event_plc'],
            'click_event_latlng_both'=>$resp_one['click_event_latlng_both'],
            'business_status'=>$resp_two['business_status'],
            'formatted_address'=>$resp_two['formatted_address'],
            'name'=>$resp_two['name'],
            'vicinity'=>$resp_two['vicinity'],
            'created_at'=>date('Y-m-d H:i:s'),
          ];

          $check = DB::table('user_locations')
              ->where('user_id',$user_id)
              ->where('click_event_place',$resp_one['click_event_plc']);

          if($check->count() > 0)
          {
            return Response::json(array(
                    'code'=>200
                )); 
          }else
          {
          
          $location_id = DB::table('user_locations')->insertGetId($data_for_insert);

          if(count($resp_two['types']) > 0)
          {
            foreach ($resp_two['types'] as $key => $value) {
                
                $location_type_arr = [
            'location_id'=>$location_id,
            'user_id'=>$user_id,
            'place_id'=>$resp_one['click_event_plc'],
            'location_type'=>$value,
            'created_at'=>date('Y-m-d H:i:s')
          ];

            DB::table('location_types')->insert($location_type_arr);

            }
          }

          

        

            return Response::json(array(
                    'code'=>200

                )); 
          }

          
      }
     
    }


    public function getalllocationsbyuserid(Request $req)
    {
        $user_id = Auth::user()->id;
        
        $query =  DB::table('user_locations')->get();

        

        if($query->count() > 0)
        {
          $query_two = DB::select("SELECT * FROM location_types GROUP BY location_type");

          return Response::json(array(
                    'code'=>200,
                    'resp'=>$query,
                    'resp_two'=>$query_two
                )); 
        }
        else
        {
          return Response::json(array(
                    'code'=>400,
                    'resp'=>'',
                    'resp_two'=>''
                )); 
        }

    }


}

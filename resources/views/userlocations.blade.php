@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-12">
            <div class="card">
                <div class="card-header">{{ __('Users Locations List') }}</div>

                <div class="card-body">
                    @if (session('status'))
                        <div class="alert alert-success" role="alert">
                            {{ session('status') }}
                        </div>
                    @endif


<table class="table table-bordered" id="UsersLocationsList" data-url="{{route('userdatatabletwo')}}" data-id="{{$user_id}}">
  <thead>
    <tr>
      <th scope="col">S#</th>
      <th scope="col">Name</th>
      <th scope="col">Latitude</th>
      <th scope="col">Longitude</th>
      <th scope="col">Date</th>
    </tr>
  </thead>
 

</table>
                   
                </div>
            </div>
        </div>
    </div>
</div>
@endsection

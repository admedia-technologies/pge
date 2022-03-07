<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta charset="utf-8">
    <title>Mapview</title>
    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.css">
    <style>
      html, body, #map {
        height: 100%;
        margin: 0px;
        padding: 0px
      }

      #panel {
        position: absolute;
        top: 5px;
        left: 50%;
        margin-left: -180px;
        z-index: 5;
        background-color: #fff;
        padding: 5px;
        border: 1px solid #999;
      }

      #bar {
        width: auto;
        background-color: rgba(255, 255, 255, 0.75);
        margin: 8px;
        padding: 4px;
        border-radius: 4px;
      }

      #autoc {
        width: 100%;
        box-sizing: border-box;
      }
      .accordion {
  background-color: #eee;
  color: #444;
  cursor: pointer;
  padding: 18px;
  width: 100%;
  border: none;
  text-align: left;
  outline: none;
  font-size: 15px;
  transition: 0.4s;
}

.active, .accordion:hover {
  background-color: #ccc;
}

.accordion:after {
  content: '\002B';
  color: #777;
  font-weight: bold;
  float: right;
  margin-left: 5px;
}

.active:after {
  content: "\2212";
}

.panel {
  padding: 0 18px;
  background-color: white;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.2s ease-out;
}
.main-content {
    position: absolute;
    z-index: 1;
    background: white;
    opacity: 0.8;
    margin-top: 52px;
    margin-left: 12px;
    width: 165px;
    font-size: 16px;
    font-family: 'Roboto';
    font-weight: bold;

    text-decoration: none;
}
.main-content a {
    font-size: 16px;
    font-family: system-ui;
    font-weight: bold;
    color:#538ff4;
    text-decoration: none;
    padding-left: 5px;
}

.sidenav {
  height: 100%;
  width: 0;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: #111;
  overflow-x: hidden;
  transition: 0.5s;
  padding-top: 60px;
}

.sidenav a {
  padding: 8px 8px 8px 32px;
  text-decoration: none;
  font-size: 25px;
  color: #818181;
  display: block;
  transition: 0.3s;
}

.sidenav a:hover {
  color: #f1f1f1;
}

.sidenav .closebtn {
  position: absolute;
  top: 0;
  right: 25px;
  font-size: 36px;
  margin-left: 50px;
}
.loc-addr {
    font-size: 11px;
    padding-left: 3px;
}
.loc-heading {
    font-size: 15px;
    padding-left: 3px;
    color:black;
    font-weight: 900 !important;
}

.location-container {
    border-radius: 3px;
    background: white;
    margin: 5px;
    padding-bottom: 3px;
    padding-top: 3px;
    cursor: pointer;

}

.category-container{
   border-radius: 3px;
    background: white;
    margin: 5px;
    padding-bottom: 3px;
    padding-top: 3px;
    cursor: pointer;
}

.locations-list-dev{
  min-height: 885px !important;
    max-height: atuo !important;
    height: auto !important;
}
@media screen and (max-height: 450px) {
  .sidenav {padding-top: 15px;}
  .sidenav a {font-size: 18px;}
}

    </style>

    <script src="https://www.gstatic.com/external_hosted/jquery2.min.js"></script>
    <script
      src="https://maps.googleapis.com/maps/api/js?libraries=drawing,places,geometry&key=AIzaSyB3ooLNpuPYxeG-NX9j1t-b0XeaHQBHvVs"></script>
      <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>

      <script src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js"></script>

    <script src="{{asset('js/mapview.js')}}"></script>
  </head>

  <body>

    <div class="main-content">
      <div class="toggle-location">

        <a href="javascript:;" class="btn-location-show" onclick="openNav()">Show Locations</a>

      </div>
      <div class="toggle-categories">
        <a href="javascript:;" class="btn-location-show" onclick="openNavOne()">Show Categories</a>
      </div>
     <!--  <hr style="margin: 3px;
    border-bottom: black;
    margin-left: 0px;
    margin-right: 0px;" /> -->
      <div class="locations-list">

<div id="mySidenavOne" class="sidenav">
  <a href="javascript:void(0)" class="closebtn" onclick="closeNavOne()">&times;</a>
<h3 class="heading-one" style="position: absolute;
    color: white;
    margin-top: -45px;
    margin-left: 11px;
    font-size: 29px;">Categories</h3>
    <div class="categories-list-dev" style="height: 788px;"></div>
</div>

<div id="mySidenav" class="sidenav" style="overflow-x: scroll !important;">
  <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>
  <h3 class="heading-one" style="position: absolute;
    color: white;
    margin-top: -45px;
    margin-left: 11px;
    font-size: 29px;">Locations</h3>
    <div class="locations-list-dev"></div>

</div>

<!-- <span style="font-size:30px;cursor:pointer" onclick="openNav()">&#9776; open</span> -->



      </div>
    </div>
    <div id="map"></div>
    <div id="map-rounded"></div>

    <div id="bar">
  <p class="auto resourcedata"
  data-url-two="{{url('getalllocations')}}"
  data-url-three="{{url('loadinitdatalocations')}}" data-token="{{ csrf_token() }}" data-url="{{url('postdata')}}" style="margin: 0px !important;">

<div class="container-one" style="margin: 0px !important;">
      <div class="username-txt" style="font-size: 17px;
    text-transform: capitalize;
    font-weight: bold;color: #538ff4;">{{auth::user()->name}}</div>

 <a class="dropdown-item" style="float:right;font-size: 12px;color: black;font-weight: bold;font-family: 'Roboto';" href="{{ route('logout') }}"
                                       onclick="event.preventDefault();
                                                     document.getElementById('logout-form').submit();">
                                        {{ __('Logout') }}
                                    </a>


<form id="logout-form" action="{{ route('logout') }}" method="POST" class="d-none">
                                        @csrf
                                    </form>


      </p>

    </div>
      <!-- <p><a id="clear" href="#">Click here</a> to clear map.</p> -->
    </div>

    <div id="popup1" class="overlay">
	<div class="popup">
		<h2>Save Location</h2>
		<span class="close" >&times;</span>
		<div class="content">
			Choose a category to save the current location to.
      <select name="location_categories" id="location_categories" class="form-control">
        <option value="">Select Categories </option>
      </select>
      <button id="save_location" class="submit">Submit</button>
		</div>
	</div>
</div>


<style>
.submit{
  margin-top: 5%;
    float: right;
    border: none;
    background: #ff5e00;
    color: white;
    padding: 7px 12px;
    border-radius: 5px;
    cursor: pointer;
}
.form-control {
  margin-top: 5%; 
    display: block;
    width: 100%;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
}

.box {
  width: 40%;
  margin: 0 auto;
  background: rgba(255,255,255,0.2);
  padding: 35px;
  border: 2px solid #fff;
  border-radius: 20px/50px;
  background-clip: padding-box;
  text-align: center;
}

.overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.7);
  transition: opacity 500ms;
  /* visibility: hidden;
  opacity: 0; */
  display: none;
}
/* .overlay:target {
  visibility: visible;
  opacity: 1;
} */

.popup {
  margin: 70px auto;
  padding: 20px;
  background: #fff;
  border-radius: 5px;
  width: 30%;
  position: relative;
  transition: all 5s ease-in-out;
}

.popup h2 {
  margin-top: 0;
  color: #333;
  font-family: Tahoma, Arial, sans-serif;
}
.popup .close {
  position: absolute;
  top: 20px;
  right: 30px;
  transition: all 200ms;
  font-size: 30px;
  font-weight: bold;
  text-decoration: none;
  color: #333;
  cursor: pointer;
}
.popup .close:hover {
  color: #06D85F;
}
.popup .content {
  max-height: 30%;
  overflow: auto;
}

@media screen and (max-width: 700px){
  .box{
    width: 70%;
  }
  .popup{
    width: 70%;
  }
}
    </style>
    
  </body>
</html>

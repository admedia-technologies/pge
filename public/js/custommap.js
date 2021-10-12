var apiKey = 'AIzaSyCzAVx1R2k2EiPNJgreLFxJKck8ricXeUA';

var map;
var drawingManager;
var placeIdArray = [];
var polylines = [];
var snappedCoordinates = [];
var PostedDaraArr = [];





function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
}
function openNavOne() {
  document.getElementById("mySidenavOne").style.width = "250px";
}
function closeNavOne() {
  document.getElementById("mySidenavOne").style.width = "0";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}

function initialize() {
  var mapOptions = {
    zoom: 16,
    center: {lat: 12.36566, lng: -1.53388,}
    //center: {lat: 40.730610, lng: -73.935242,}
  };
  map = new google.maps.Map(document.getElementById('map'), mapOptions);

  const service = new google.maps.places.PlacesService(map);

  // Adds a Places search box. Searching for a place will center the map on that
  // location.
  map.controls[google.maps.ControlPosition.RIGHT_TOP].push(
      document.getElementById('bar'));
  var autocomplete = new google.maps.places.Autocomplete(
      document.getElementById('autoc'));
  autocomplete.bindTo('bounds', map);
  autocomplete.addListener('place_changed', function() {
    var place = autocomplete.getPlace();
    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      // map.setZoom(16);
    }
  });

  // Enables the polyline drawing control. Click on the map to start drawing a
  // polyline. Each click will add a new vertice. Double-click to stop drawing.
  drawingManager = new google.maps.drawing.DrawingManager({
    drawingMode: google.maps.drawing.OverlayType.POLYLINE,
    drawingControl: false,
    drawingControlOptions: {
      position: google.maps.ControlPosition.TOP_CENTER,
      drawingModes: [
        google.maps.drawing.OverlayType.POLYLINE
      ]
    },
    polylineOptions: {
      strokeColor: '#696969',
      strokeWeight: 2,
      strokeOpacity: 0.3,
    }
  });
  //drawingManager.setMap(map);

  // Snap-to-road when the polyline is completed.
  drawingManager.addListener('polylinecomplete', function(poly) {
    var path = poly.getPath();
    polylines.push(poly);
    placeIdArray = [];
    runSnapToRoad(path);
  });


  // Clear button. Click to remove all polylines.
  // document.getElementById('clear').addEventListener('click', function(event) {
  //   event.preventDefault();
  //   for (var i = 0; i < polylines.length; ++i) {
  //     polylines[i].setMap(null);
  //   }
  //   polylines = [];
  //   return false;
  // });

function highlight(cLatLng,cLat,cLng,degree,color)
{
  var polyline = new google.maps.Polyline({
    strokeColor:color, //'#C00'
    strokeOpacity: 0.7,
    strokeWeight: 3
    });

  var dirService = new google.maps.DirectionsService();
var dirRenderer = new google.maps.DirectionsRenderer({suppressMarkers: false});
dirRenderer.setMap(map);
dirRenderer.setOptions({polylineOptions: polyline}); 
var pointA = new google.maps.LatLng(cLat,cLng); 

        var request = {
  origin: google.maps.geometry.spherical.computeOffset(pointA, 300, degree),
  destination: cLatLng,
   // waypoints:DirectionsServiceArrList,
  provideRouteAlternatives: true,
  travelMode: 'DRIVING',
  drivingOptions: {
    departureTime: new Date(/* now, or future date */),
    trafficModel: 'bestguess'
  },
  unitSystem: google.maps.UnitSystem.IMPERIAL
};

dirService.route(request, function(result, status) {
  if (status == google.maps.DirectionsStatus.OK) {
    dirRenderer.setDirections(result);
  }
});

}
 
  function postData(PostedDaraArr)
  {
    $.ajax({
      type:'POST',
      url:$(".resourcedata").attr("data-url"),
      data:'_token='+$(".resourcedata").attr("data-token")+'&posted_data='+JSON.stringify(PostedDaraArr)
    }).done(function(resp){

      if(resp.code==200)
      {
        toastr.success("Location Saved Successfully!");
      }

      console.log(resp.code);

    }).fail(function(resp){

      console.log(resp);

    }); 
  }

  function GetAllLocations()
{
$(document).find(".old-elements").remove();
$.ajax({
      type:'POST',
      url:$(".resourcedata").attr("data-url-two"),
      data:'_token='+$(".resourcedata").attr("data-token")
    }).done(function(resp){

      if(resp.code == 200)
      {
        var html =``;
        $(resp.resp).each(function(index,el){

          html+=`<div class="old-elements location-container">
            <div class="loc-heading">${el.name}</div>
            <div class="loc-addr">${el.formatted_address}</div>
          </div>`;

          console.log(el);

        });
        var htmltwo=``;
        $(resp.resp_two).each(function(index,el){

          htmltwo+=`<div class="old-elements location-container">
            <div class="loc-heading">${el.location_type}</div>
            <div class="loc-addr">${el.place_id}</div>
          </div>`;

        });

        $(".locations-list-dev").html(html);

        $(".categories-list-dev").html(htmltwo);
      }

    }).fail(function(resp){

      console.log(resp);

    }); 

}

GetAllLocations();

  map.addListener("click", (mapsMouseEvent) => {
    PostedDaraArr = [];
    var cLat = mapsMouseEvent.latLng.lat();
    var cLng = mapsMouseEvent.latLng.lng();
    var cLatLng = cLat+","+cLng;
    var cPlace = mapsMouseEvent.placeId;

    var ClickedDataArr = {
        click_event_lat:cLat,
        click_event_lng:cLng,
        click_event_plc:cPlace,
        click_event_latlng_both:cLatLng
    };

    PostedDaraArr.push({click_event_data:ClickedDataArr});

     const request = {
    placeId:cPlace,
    fields:["name", "formatted_address", "place_id", "geometry", "type", "business_status", "vicinity"]
  };


 service.getDetails(request, (place, status) => {
    if (
      status === google.maps.places.PlacesServiceStatus.OK &&
      place &&
      place.geometry &&
      place.geometry.location
    ) {
      console.log(place,"Places");
    console.log(place.business_status);
    //console.log(status,"satus");
    var placeInfoArr ={
        business_status:place.business_status,
        formatted_address:place.formatted_address,
        location:{
        lat:place.geometry.location.lat(),
        lng:place.geometry.location.lng()
        },
        name:place.name,
        place_id:place.place_id,
        types:place.types,
        vicinity:place.vicinity
    };

    PostedDaraArr.push({place_info_data:placeInfoArr});

    }

    });  


    $.ajax({
      type:'GET',
      url:'https://roads.googleapis.com/v1/nearestRoads?points='+cLat+','+cLng+'&key='+apiKey
    }).done(function(resp){

      var PolyLinesArr = [];
      var DirectionsServiceArrList =[];
      var DistanceRequst = [];
      var NearestRoadsArr = [];
      $(resp.snappedPoints).each(function(index,el){

        var SingleRoadLat =el.location.latitude;
        var SingleRoadLng =el.location.longitude;
        var bothLatLng = SingleRoadLat+","+SingleRoadLng;

        highlight(cLatLng,SingleRoadLat,SingleRoadLng,0,'#C00');
        highlight(cLatLng,SingleRoadLat,SingleRoadLng,-90,'#00FF00');
        highlight(cLatLng,SingleRoadLat,SingleRoadLng,180,'#0000FF');
        highlight(cLatLng,SingleRoadLat,SingleRoadLng,90,'#8B4513');

        // highlight(cLatLng,SingleRoadLat,SingleRoadLng,180);
        // highlight(cLatLng,SingleRoadLat,SingleRoadLng,225);
        // highlight(cLatLng,SingleRoadLat,SingleRoadLng,270);
        // highlight(cLatLng,SingleRoadLat,SingleRoadLng,315);

        PolyLinesArr.push({ lat:SingleRoadLat, lng:SingleRoadLng});
        // var googleLatLng = new google.maps.LatLng(SingleRoadLat, SingleRoadLng);
        // PolyLinesArr.push(googleLatLng);
        DirectionsServiceArrList.push({location:bothLatLng,stopover: true});

        var roadIndex = index + 1;

        NearestRoadsArr.push({
          id:roadIndex,
          road_lat:SingleRoadLat,
          road_lng:SingleRoadLng,
          road_bth:bothLatLng
        });

       // console.log("Road #"+roadIndex+" Response | ",el.location);

       
        
      });


      PostedDaraArr.push({nearest_roads_data:NearestRoadsArr});

      //console.log("Polyline Collection | ",PolyLinesArr);

      //console.log("DirectionsService Collection | ",DirectionsServiceArrList);

      //console.log("Nearest Roads API | Response | ",resp.snappedPoints);






  //      const flightPath = new google.maps.Polyline({
  //   path: PolyLinesArr,
  //   geodesic: true,
  //   strokeColor: "#FF0000",
  //   strokeOpacity: 1,
  //   strokeWeight: 5,
  //   fillColor: "#FF0000",
  //   fillOpacity: 1,
  //   radius_changed:300
  // });

  // flightPath.setMap(map);

postData(PostedDaraArr);
    }).fail(function(resp){
      console.log(resp);
    });


      //console.log("Click Event | Response | ",mapsMouseEvent.latLng.lat()+","+mapsMouseEvent.latLng.lng());

      console.log(PostedDaraArr);


    

  });

/**Exp 01 start**/
/*map.addListener("click", (mapsMouseEvent) => {

    


//Example 01
  //   var cLat = mapsMouseEvent.latLng.lat();
  //   var cLng = mapsMouseEvent.latLng.lng();
  //   var cPlace = mapsMouseEvent.placeId;
  //   var cLatLng = cLat+","+cLng;
   
  //   var latlng = new google.maps.LatLng(cLat,cLng);
  //   snappedCoordinates.push(latlng);
  //   placeIdArray.push(cPlace);

  //   var snappedPolyline = new google.maps.Polyline({
  //   path: snappedCoordinates,
  //   strokeColor: '#add8e6',
  //   strokeWeight: 4,
  //   strokeOpacity: 0.9,
  // });

  // //snappedPolyline.setMap(map);
  // polylines.push(snappedPolyline);


  // var pyrmont = new google.maps.LatLng(cLat,cLng);
  //    var request = {
  //   location: pyrmont,
  //   radius: '1500',
  //   types: ['store']
  // };

  // service = new google.maps.places.PlacesService(map);
  // service.nearbySearch(request, callback);  
  // function callback(results, status) {
  // if (status == google.maps.places.PlacesServiceStatus.OK) {
    
  //      for (var i = 0; i < results.length; i++) {
  //     var place = results[i];
  //     if(i == 0)
  //     {
  //       var newSnap =new google.maps.LatLng(place.geometry.location.lat(),place.geometry.location.lng());
  //       snappedCoordinates.push(newSnap);
  //       placeIdArray.push(place.place_id);


  //     }

  //   }
        
    
  // }
  // }
        

  //      var snappedPolylineTwo = new google.maps.Polyline({
  //         path: snappedCoordinates,
  //         strokeColor: '#add8e6',
  //         strokeWeight: 4,
  //         strokeOpacity: 0.9,
  //       });
        
  //       polylines.push(snappedPolylineTwo);




  //   var path = snappedPolylineTwo.getPath();
  //   polylines.push(snappedPolylineTwo);
  //   runSnapToRoad(path);

  


    console.log("snapped",snappedCoordinates);
    console.log("Place",placeIdArray);
    console.log("poly",polylines)
    
});


*/




}

// Snap a user-created polyline to roads and draw the snapped path
function runSnapToRoad(path) {
  var pathValues = [];
  for (var i = 0; i < path.getLength(); i++) {
    pathValues.push(path.getAt(i).toUrlValue());
  }

  $.get('https://roads.googleapis.com/v1/snapToRoads', {
    interpolate: true,
    key: apiKey,
    path: pathValues.join('|')
  }, function(data) {
    processSnapToRoadResponse(data);
    drawSnappedPolyline();
  });
}

// Store snapped polyline returned by the snap-to-road service.
function processSnapToRoadResponse(data) {
  snappedCoordinates = [];
  placeIdArray = [];
  for (var i = 0; i < data.snappedPoints.length; i++) {
    var latlng = new google.maps.LatLng(
        data.snappedPoints[i].location.latitude,
        data.snappedPoints[i].location.longitude);
    snappedCoordinates.push(latlng);
    placeIdArray.push(data.snappedPoints[i].placeId);
  }
}

// Draws the snapped polyline (after processing snap-to-road response).
function drawSnappedPolyline() {
  var snappedPolyline = new google.maps.Polyline({
    path: snappedCoordinates,
    strokeColor: '#add8e6',
    strokeWeight: 4,
    strokeOpacity: 0.9,
  });

  snappedPolyline.setMap(map);
  polylines.push(snappedPolyline);
}

$(window).load(initialize);
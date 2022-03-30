var apiKey = 'AIzaSyB3ooLNpuPYxeG-NX9j1t-b0XeaHQBHvVs';

var map;
var drawingManager;
var placeIdArray = [];
var polylines = [];
var snappedCoordinates = [];
var PostedDaraArr = [];
var MarkersArray = [];
var PolyLinesArrDirServices = [];

var newDirService;
var newDirRender;
var allRenders = [];

var directionsService = new google.maps.DirectionsService();
var directionsDisplay = new google.maps.DirectionsRenderer({ suppressMarkers: false, preserveViewport: true });

function RenderHighlight(request, cLat, cLng, color) {
    var delayFactor = 0;
    var polyline = new google.maps.Polyline({
        strokeColor: color, //'#C00'
        strokeOpacity: 0.7,
        strokeWeight: 3
    });

    PolyLinesArrDirServices.push(polyline);

    var dirService = new google.maps.DirectionsService();
    var dirRenderer = new google.maps.DirectionsRenderer({ suppressMarkers: false, preserveViewport: true });

    allRenders.push(dirRenderer);

    newDirService = dirService;
    newDirRender = dirRenderer;

    dirRenderer.setMap(map);
    dirRenderer.setOptions({ polylineOptions: polyline });


    dirService.route(request, function(result, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            dirRenderer.setDirections(result);
        } else if (status === google.maps.DirectionsStatus.OVER_QUERY_LIMIT) {
            delayFactor++;
            setTimeout(function() {
                RenderHighlight(request);
            }, delayFactor * 1000);
        } else {
            console.log("Route: " + status);
        }
    });
}

function InitialHighlight(cLatLng, cLat, cLng, degree, color) {
    var pointA = new google.maps.LatLng(cLat, cLng);

    var request = {
        origin: google.maps.geometry.spherical.computeOffset(pointA, 300, degree),
        destination: cLatLng,
        // waypoints:DirectionsServiceArrList,
        provideRouteAlternatives: true,
        travelMode: 'DRIVING',
        drivingOptions: {
            departureTime: new Date( /* now, or future date */ ),
            trafficModel: 'bestguess'
        },
        unitSystem: google.maps.UnitSystem.IMPERIAL
    };

    RenderHighlight(request, cLat, cLng, color);
}


function GetNearestRoads(cLat, cLng, apiKey, cLatLng) {
    $.ajax({
        type: 'GET',
        url: 'https://roads.googleapis.com/v1/nearestRoads?points=' + cLat + ',' + cLng + '&key=' + apiKey
    }).done(function(resp) {
        console.log(resp);
        $(resp.snappedPoints).each(function(index, el) {

            var SingleRoadLat = el.location.latitude;
            var SingleRoadLng = el.location.longitude;
            var bothLatLng = SingleRoadLat + "," + SingleRoadLng;

            //    for(var i=0; i<=360; i=i+40) {
            //   InitialHighlight(cLatLng,SingleRoadLat,SingleRoadLng,i,'#C00');
            // }
            //  // InitialHighlight(cLatLng,SingleRoadLat,SingleRoadLng,0,'#C00');
            //   InitialHighlight(cLatLng,SingleRoadLat,SingleRoadLng,-90,'#00FF00');
            //   InitialHighlight(cLatLng,SingleRoadLat,SingleRoadLng,180,'#0000FF');
            //   InitialHighlight(cLatLng,SingleRoadLat,SingleRoadLng,90,'#8B4513');

        });



    }).fail(function(resp) {

        console.log(resp);

    });
}

var delayFactor = 0;

function calculateRoute(mapOrigin, mapDestination) {
    var request = {
        origin: mapOrigin,
        destination: mapDestination,
        travelMode: 'DRIVING',
        provideRouteAlternatives: true,
    };

    directionsService.route(request, function(result, status) {
        if (status == "OK") {
            var directionsDisplay = new google.maps.DirectionsRenderer({ map: map });
            var polyline = new google.maps.Polyline({
                strokeColor: '#FF0000', //'#C00'
                strokeOpacity: 0.7,
                strokeWeight: 2
            });
            allRenders.push(directionsDisplay);
            directionsDisplay.setOptions({ polylineOptions: polyline });
            directionsDisplay.setDirections(result);
        } else if (status === google.maps.DirectionsStatus.OVER_QUERY_LIMIT) {
            console.log("OVER_QUERY_LIMIT");
            delayFactor++;
            setTimeout(function() {
                calculateRoute(mapOrigin, mapDestination);
            }, delayFactor * 1000);
            //calculateRoute(mapOrigin, mapDestination);
        } else {
            console.log("return false!");
            return false;
        }
    });
}

function loadLocationsinit(map, directionsService, directionsDisplay) {
    $.ajax({
        type: 'POST',
        url: $(".resourcedata").attr("data-url-three"),
        data: '_token=' + $(".resourcedata").attr("data-token")
    }).done(function(resp) {

        $(resp.resp).each(function(index, el) {
            var clickLat = el.click_event_lat;
            var clickLng = el.click_event_lng;
            var cLatLng = el.click_event_latlng_both;
            var MainOrigin = new google.maps.LatLng(clickLat, clickLng);

            // drawCircle(clickLat, clickLng);

            // var PointA = new google.maps.LatLng(clickLat, clickLng);
            // console.log(PointA);

            // var DestinationOne = google.maps.geometry.spherical.computeOffset(PointA, 300, 0);
            // calculateRoute(MainOrigin, DestinationOne);

            // var DestinationTwo = google.maps.geometry.spherical.computeOffset(PointA, 300, -90);
            // calculateRoute(MainOrigin, DestinationTwo);

            // var DestinationThree = google.maps.geometry.spherical.computeOffset(PointA, 300, 180);
            // calculateRoute(MainOrigin, DestinationThree);

            // var DestinationFour = google.maps.geometry.spherical.computeOffset(PointA, 300, 90);
            // calculateRoute(MainOrigin, DestinationFour);

            // var DestinationFive = google.maps.geometry.spherical.computeOffset(PointA, 300, 40);
            // calculateRoute(MainOrigin, DestinationFive);

            // var DestinationSix = google.maps.geometry.spherical.computeOffset(PointA, 300, 80);
            // calculateRoute(MainOrigin, DestinationSix);

            // var DestinationSeven = google.maps.geometry.spherical.computeOffset(PointA, 300, 120);
            // calculateRoute(MainOrigin, DestinationSeven);

            // var DestinationEight = google.maps.geometry.spherical.computeOffset(PointA, 300, 160);
            // calculateRoute(MainOrigin, DestinationEight);

            // var DestinationNine = google.maps.geometry.spherical.computeOffset(PointA, 300, 200);
            // calculateRoute(MainOrigin, DestinationNine);

            // var DestinationTen = google.maps.geometry.spherical.computeOffset(PointA, 300, 240);
            // calculateRoute(MainOrigin, DestinationTen);

            // var DestinationElevin = google.maps.geometry.spherical.computeOffset(PointA, 300, 280);
            // calculateRoute(MainOrigin, DestinationElevin);

            // var DestinationTwelve = google.maps.geometry.spherical.computeOffset(PointA, 300, 320);
            // calculateRoute(MainOrigin, DestinationTwelve);

            // var DestinationTherteen = google.maps.geometry.spherical.computeOffset(PointA, 300, 360);
            // calculateRoute(MainOrigin, DestinationTherteen);
            // for(var i=0; i<=360; i=i+40) {
            //  console.log(i);
            // }

            // GetNearestRoads(clickLat,clickLng,apiKey,cLatLng);

        });
        // setTimeout(function () {

        //   map.setZoom(17);

        //   $(document).find(".loading").hide();
        //   $(document).find(".notice").hide();
        // }, 1000);



    }).fail(function(resp) {
        console.log(resp);
    });
}


function GetAllLocations() {
    $(document).find(".old-elements-locations").remove();
    $(document).find(".old-elements").remove();
    $.ajax({
        type: 'POST',
        url: $(".resourcedata").attr("data-url-two"),
        data: '_token=' + $(".resourcedata").attr("data-token")
    }).done(function(resp) {

        if (resp.code == 200) {
            var html = ``;
            $(resp.resp).each(function(index, el) {

                html += `<div class="old-elements-locations location-container" data-lat="${el.click_event_lat}" data-lng="${el.click_event_lng}">
            <div class="loc-heading">${el.name == "NF" || el.name == "" ? el.click_event_place : el.name}</div>
            <div class="loc-addr">${el.formatted_address == "NF" || el.name == "" ? el.click_event_latlng_both : el.formatted_address}</div>
          </div>`;

                // console.log(el);

            });
            var htmltwo = ``;
            $(resp.resp_two).each(function(index, el) {

                htmltwo += `<div class="old-elements category-container" data-type="${el.location_type}" id="${el.id}">
            <div class="loc-heading">${el.location_type.toUpperCase()}</div>

          </div>`;

            });

            var html3 = ``;
            $(resp.resp_two).each(function(index, el) {

                html3 += `<option value="${el.id}">${el.location_type}</option>`;

            });

            $("#location_categories").html(html3);

            $(".locations-list-dev").html(html);

            $(".categories-list-dev").html(htmltwo);
        }

    }).fail(function(resp) {

        console.log(resp);

    });

}

function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    GetAllLocations();
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

function createMarker(place) {

    var infowindow = new google.maps.InfoWindow();

    if (!place.geometry || !place.geometry.location) return;

    const marker = new google.maps.Marker({
        map,
        position: place.geometry.location,
    });

    MarkersArray.push(marker);

    google.maps.event.addListener(marker, "click", (data) => {
        infowindow.setContent(place.name || "");
        infowindow.open(map);
        console.log("yes clicked", data.latLng.lat(), data.latLng.lng());

        var e = {
            latLng: new google.maps.LatLng(data.latLng.lat(), data.latLng.lng())
        };

        google.maps.event.trigger(map, 'click', e);

        setTimeout(function() {
            map.setZoom(16);
        }, 3000);
    });
}


function getLocationsandStore(type) {
    for (let i = 0; i < MarkersArray.length; i++) {
        MarkersArray[i].setMap(null);
    }
    if (allRenders.length > 0) {
        for (var i = 0; i < allRenders.length; i++) {
            allRenders[i].setMap(null);
        }
    }

    $.ajax({
        type: 'GET',
        url: '/getLocationsByType/' + type,
    }).done(function(resp) {
        if (resp.locations.length < 1) {
            toastr.success("Aucun lieu trouvé pour cette catégorie");
        } else if (resp.locations.length == 1) {
            toastr.success(resp.locations.length + " lieu trouvé pour cette catégorie");
        } else {
            toastr.success(resp.locations.length + " lieux trouvés pour cette catégorie");
        }
        resp.locations.forEach(element => {
            map.panTo({ lat: parseFloat(element.click_event_lat), lng: parseFloat(element.click_event_lng) });
            marker = new google.maps.Marker({
                map: map,
                position: { lat: parseFloat(element.click_event_lat), lng: parseFloat(element.click_event_lng) }
            });
            MarkersArray.push(marker);

            drow_line_bycatecore(element.click_event_place);
        });
    }).fail(function(resp) {
        console.log(resp);
        $("#error_field").html("Une erreur inattendue s'est produite lors de l'enregistrement de la localisation");
    });
}


    function drow_line_bycatecore(place_id) {

        $.ajax({
            type: "GET",
            url: '/isplace', // This is what I have updated
            // url: 'http://localhost/laravel-marker/drow-map.php', 
            data: { place_id:place_id }, //'GhIJ9xm8VBG7KEAR3uboTDVu-L8'
            dataType:'json',
            success: function( resp ) {
                console.log('resp');
                console.log(resp);
                if(resp.length){
                    $.each( resp , function( key, resplace ) {
                    isSaveHighlight('#C00', resplace);
                    });
                }
            },
            error: function(e) {
                console.log(e);
            }
        });
        
    }

    function isSaveHighlight( color,resp) {
        var polyline = new google.maps.Polyline({
            strokeColor: color, //'#C00'
            strokeOpacity: 0.7,
            strokeWeight: 3
        });
    
        PolyLinesArrDirServices.push(polyline);
    
        var dirService = new google.maps.DirectionsService();
        var dirRenderer = new google.maps.DirectionsRenderer({ suppressMarkers: false });
    
        allRenders.push(dirRenderer);
    
        newDirService = dirService;
        newDirRender = dirRenderer;
    
        dirRenderer.setMap(map);
        dirRenderer.setOptions({
            polylineOptions: polyline,
            suppressMarkers: true
        });
    
        dirRenderer.setDirections(resp);
    }

function drawCircle(cLat, cLng) {
    new google.maps.Circle({
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#FF0000",
        fillOpacity: 0.35,
        map,
        center: {
            lat: parseFloat(cLat),
            lng: parseFloat(cLng)
        },
        radius: 300,
    });
}

function initialize() {
    var mapOptions = {
        zoom: 16,
        center: { lat: 12.36566, lng: -1.53388, }
        //center: {lat: 40.730610, lng: -73.935242,}
    };
    map = new google.maps.Map(document.getElementById('map'), mapOptions);

    const service = new google.maps.places.PlacesService(map);

    //getLocationsandStore();
    // Adds a Places search box. Searching for a place will center the map on that
    // location.
    map.controls[google.maps.ControlPosition.RIGHT_TOP].push(document.getElementById('bar'));
    var autocomplete = new google.maps.places.Autocomplete(document.getElementById('autoc'));
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
    
    var saveLocation = [];
    function highlight(cLatLng, cLat, cLng, degree, color, distance = 300) {
        var polyline = new google.maps.Polyline({
            strokeColor: color, //'#C00'
            strokeOpacity: 0.7,
            strokeWeight: 3
        });

        PolyLinesArrDirServices.push(polyline);

        var dirService = new google.maps.DirectionsService();
        var dirRenderer = new google.maps.DirectionsRenderer({ suppressMarkers: false });

        allRenders.push(dirRenderer);

        newDirService = dirService;
        newDirRender = dirRenderer;

        dirRenderer.setMap(map);
        dirRenderer.setOptions({
            polylineOptions: polyline,
            suppressMarkers: true
        });
        var pointA = new google.maps.LatLng(cLat, cLng);

        var request = {
            origin: google.maps.geometry.spherical.computeOffset(pointA, distance, degree), //distance: 300m
            destination: cLatLng,
            // waypoints:DirectionsServiceArrList,
            provideRouteAlternatives: true,
            travelMode: 'WALKING',
            drivingOptions: {
                departureTime: new Date( /* now, or future date */ ),
                trafficModel: 'bestguess'
            },
            unitSystem: google.maps.UnitSystem.IMPERIAL
        };


        var myJSONText = JSON.stringify(request);

        $.ajax({
            type: "GET",
            url: '/google_routs', // This is what I have updated
            // url: 'http://localhost/laravel-marker/drow-map.php', 
            data: { origin: myJSONText },
            dataType:'json',
            success: function( resp ) {
                resp.routes = typecastRoutes(resp.routes);
                resp.request = request;
                // if (resp.routes[0].legs[0].distance.value <= 300) {
                if(resp.status == 'OK'){
                    saveLocation.push(resp);
                    dirRenderer.setDirections(resp);
                }
               
                // }
                // console.log(resp);
            },
            error: function(e) {
                console.log(e);
            }
        });


        // dirService.route(request, function(result, status) {
        //     if (status == google.maps.DirectionsStatus.OK) {
        //         // console.log(result.routes[0].legs[0].distance.value);
        //         console.log(result);

        //         // if (result.routes[0].legs[0].distance.value <= 300) {
        //             dirRenderer.setDirections(result);
        //         // }
        //     }
        // });
    }

    function isSaveHighlight( color,resp) {
        var polyline = new google.maps.Polyline({
            strokeColor: color, //'#C00'
            strokeOpacity: 0.7,
            strokeWeight: 3
        });
    
        PolyLinesArrDirServices.push(polyline);
    
        var dirService = new google.maps.DirectionsService();
        var dirRenderer = new google.maps.DirectionsRenderer({ suppressMarkers: false });
    
        allRenders.push(dirRenderer);
    
        newDirService = dirService;
        newDirRender = dirRenderer;
    
        dirRenderer.setMap(map);
        dirRenderer.setOptions({
            polylineOptions: polyline,
            suppressMarkers: true
        });
    
        dirRenderer.setDirections(resp);
    }


            function typecastRoutes(routes){
                routes.forEach(function(route){
                    route.bounds = asBounds(route.bounds);
                    // I don't think `overview_path` is used but it exists on the
                    // response of DirectionsService.route()

                    route.overview_path = asPath(route.overview_polyline);
                    route.overview_polyline = route.overview_polyline.points;

                    route.legs.forEach(function(leg){
                        leg.start_location = asLatLng(leg.start_location);
                        leg.end_location   = asLatLng(leg.end_location);

                        leg.steps.forEach(function(step){
                            step.start_location = asLatLng(step.start_location);
                            step.end_location   = asLatLng(step.end_location);
                            step.path = asPath(step.polyline);
                            step.travel_mode = "WALKING";
                        });

                    });
                });

                return routes;
            }

            function asBounds(boundsObject){
                return new google.maps.LatLngBounds(asLatLng(boundsObject.southwest),
                    asLatLng(boundsObject.northeast));
            }

            function asLatLng(latLngObject){
                return new google.maps.LatLng(latLngObject.lat, latLngObject.lng);
            }

            function asPath(encodedPolyObject){
                return google.maps.geometry.encoding.decodePath( encodedPolyObject.points );
            }


    function save_temp_data(PostedDaraArr) {
        console.log("in post data");
        $.ajax({
            type: 'POST',
            url: '/location/save/meta',
            data: '_token=' + $(".resourcedata").attr("data-token") + '&posted_data=' + JSON.stringify(PostedDaraArr)
        }).done(function(resp) {
            console.log(resp);
           
        }).fail(function(resp) {
        
            console.log(resp);
        });
    }


    function postData(PostedDaraArr) {
        console.log("in post data");
        $.ajax({
            type: 'POST',
            url: $(".resourcedata").attr("data-url"),
            data: '_token=' + $(".resourcedata").attr("data-token") + '&posted_data=' + JSON.stringify(PostedDaraArr)
        }).done(function(resp) {
            console.log('resp done') ;
            console.log(resp);
            if (resp.code == 200) {
                toastr.success("Location Saved Successfully!");

                // setTimeout(function() {

                //     map.setZoom(16);
                //     GetAllLocations();
                // }, 5000);
            }

            // console.log(resp.code);


        }).fail(function(resp) {
            console.log('resp done') ;

            console.log(resp);
        });
    }

    GetAllLocations();

    $(".close").click(function(){
        $('.overlay').fadeOut();
    });

    $("button#save_location").click(function(){
        
        var location_categories = $('#location_categories').val();
        PostedDaraArr[0].click_event_data.location_categories = location_categories;
        PostedDaraArr[0].click_event_data.click_event_plc = place_id;
            
        postData(PostedDaraArr);
        $('.overlay').fadeOut();
    });

    function saveLocationFun(){

        console.log("in savelocation");
        
        // var location_categories = $('#location_categories').val();
        PostedDaraArr[0].click_event_data.location_categories = null;
        PostedDaraArr[0].click_event_data.click_event_plc = place_id;
        postData(PostedDaraArr);

        var location = [];
        for (let index = 0; index < saveLocation.length; index++) {

            location.push(saveLocation[index]);
            if(location.length == 10 || saveLocation.length == index+1){ 
                save_temp_data({place_id:place_id,location:location});
                console.log(location);
                location = [];
            }
        }
    }

    var place_id = "";
    function get_place_id(latitude,longitude){
        var geocoder = new google.maps.Geocoder;

        var latlng = {lat: parseFloat(latitude), lng: parseFloat(longitude)};

        geocoder.geocode({'location': latlng}, function(results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
            if (results[1]) {
                place_id = results[1].place_id;
               // console.log(results[1].place_id);
            } else {
                window.alert('No results found');
            }
            } else {
            window.alert('Geocoder failed due to: ' + status);
            }
        });
    }
   




    map.addListener("click", (mapsMouseEvent) => {

        //reset here
        // if(newDirRender){
        // newDirRender.setMap(null);
        // }

        // if (allRenders.length > 0) {
        //   for (var i = 0; i < allRenders.length; i++) {
        //     allRenders[i].setMap(null);
        //   }
        // }

        $('.overlay').fadeIn();

        get_place_id( mapsMouseEvent.latLng.lat(),mapsMouseEvent.latLng.lng());
        // console.log("all render", allRenders);

        PostedDaraArr = [];
        var cLat = mapsMouseEvent.latLng.lat();
        var cLng = mapsMouseEvent.latLng.lng();
        var cLatLng = cLat + "," + cLng;
        var cPlace = "ChIJB24l1P-VLg4R0lmCHT4h0mU";    //mapsMouseEvent.placeId;


        

       
        console.log('lat: ' + cLat + ', lng: ' + cLng + ', latlng: ' + cLatLng + ', place: ' + cPlace);

        var ClickedDataArr = {
            click_event_lat: cLat,
            click_event_lng: cLng,
            click_event_plc: (cPlace),
            click_event_latlng_both: cLatLng,
            location_categories:"",
        };

        PostedDaraArr.push({ click_event_data: ClickedDataArr });

        const request = {
            placeId: cPlace,
            fields: ["name", "formatted_address", "place_id", "geometry", "type", "business_status", "vicinity"]
        };

        console.log('Let try to draw circle');
        // drawCircle(cLat, cLng);

        service.getDetails(request, (place, status) => {
            if (
                status === google.maps.places.PlacesServiceStatus.OK &&
                place &&
                place.geometry &&
                place.geometry.location
            ) {
                // console.log(place, "Places");
                // console.log(place.business_status);
                //console.log(status,"satus");
                var placeInfoArr = {
                    business_status: place.business_status,
                    formatted_address: place.formatted_address,
                    location: {
                        lat: place.geometry.location.lat(),
                        lng: place.geometry.location.lng()
                    },
                    name: place.name,
                    place_id: place.place_id,
                    types: place.types,
                    vicinity: place.vicinity
                };

                PostedDaraArr.push({ place_info_data: placeInfoArr });
            }
        });


        $.ajax({
            type: 'GET',
            url: 'https://roads.googleapis.com/v1/nearestRoads?points=' + cLat + ',' + cLng + '&key=' + apiKey
        }).done(function(resp) {

            var PolyLinesArr = [];
            var DirectionsServiceArrList = [];
            var DistanceRequst = [];
            var NearestRoadsArr = [];
            $(resp.snappedPoints).each(function(index, el) {

                var SingleRoadLat = el.location.latitude;
                var SingleRoadLng = el.location.longitude;
                var bothLatLng = SingleRoadLat + "," + SingleRoadLng;
                var LatLng = { lat: SingleRoadLat, lng: SingleRoadLng };
                new google.maps.Marker({
                    position: LatLng,
                    map,
                });

                // for (var i = 0; i <= 360; i = i + 40) { //angle: 40 degree
                // highlight(cLatLng, SingleRoadLat, SingleRoadLng, i, '#C00');
                // }

                // ***********

                $.ajax({
                    type: "GET",
                    url: '/isplace', // This is what I have updated
                    // url: 'http://localhost/laravel-marker/drow-map.php', 
                    data: { place_id:place_id }, //'GhIJ9xm8VBG7KEAR3uboTDVu-L8'
                    dataType:'json',
                    success: function( resp ) {
                        console.log('resp');
                        console.log(resp);
                        if(resp.length){
                            $.each( resp , function( key, resplace ) {
                            isSaveHighlight('#C00', resplace);
                            });
                        }
                        else{
                            
                            var ReductionDegree = 0;
                            var radius = 300;
                            toastr.success("Veuillez patienter, les tracés sont en cours de traitement...");
                            // var inter = setInterval(function() {
                                for (var i = 0; i <= 96000; i = i++) {
                                ReductionDegree += 10;
            
                                if (ReductionDegree >= 360 && radius >= 45) {
                                    ReductionDegree = 0;
                                    radius = radius - 10;
                                    // clearInterval(inter);
                                    toastr.success("Veuillez patienter, les tracés sont toujours en cours de traitement...");
                                }
                                // console.log("************************************Dégré = " + ReductionDegree + " et Rayon = " + radius);
                               highlight(cLatLng, SingleRoadLat, SingleRoadLng, ReductionDegree, '#C00', radius);
                                // radius = radius - 50;
            
                                if (radius < 45) {
                                    console.log("stop");
                                    // save_temp_data({place_id:place_id,location:[],status:'true'});
                                      saveLocationFun();
                                    // clearInterval(inter);
                                    break;
                                }
                            }
                            // }, 300);


                        }
                    },
                    error: function(e) {
                        console.log(e);
                    }
                });

                // saveLocationFun();

               

                // *********************

                // highlight(cLatLng, SingleRoadLat, SingleRoadLng, -90, '#00FF00');
                // highlight(cLatLng, SingleRoadLat, SingleRoadLng, 180, '#0000FF');
                // highlight(cLatLng, SingleRoadLat, SingleRoadLng, 90, '#8B4513');

                // highlight(cLatLng, SingleRoadLat, SingleRoadLng, 30, '#C00');
                // highlight(cLatLng, SingleRoadLat, SingleRoadLng, 60, '#C00');
                // highlight(cLatLng, SingleRoadLat, SingleRoadLng, 120, '#C00');
                // highlight(cLatLng, SingleRoadLat, SingleRoadLng, 150, '#C00');

                // highlight(cLatLng,SingleRoadLat,SingleRoadLng,180);
                // highlight(cLatLng,SingleRoadLat,SingleRoadLng,225);
                // highlight(cLatLng,SingleRoadLat,SingleRoadLng,270);
                // highlight(cLatLng,SingleRoadLat,SingleRoadLng,315);

                PolyLinesArr.push({ lat: SingleRoadLat, lng: SingleRoadLng });
                // var googleLatLng = new google.maps.LatLng(SingleRoadLat, SingleRoadLng);
                // PolyLinesArr.push(googleLatLng);
                DirectionsServiceArrList.push({ location: bothLatLng, stopover: true });

                var roadIndex = index + 1;

                NearestRoadsArr.push({
                    id: roadIndex,
                    road_lat: SingleRoadLat,
                    road_lng: SingleRoadLng,
                    road_bth: bothLatLng
                });

                // console.log("Road #"+roadIndex+" Response | ",el.location);

            });
            PostedDaraArr.push({ nearest_roads_data: NearestRoadsArr });

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

            //postData(PostedDaraArr);
        }).fail(function(resp) {
            console.log(resp);
        });

        //console.log("Click Event | Response | ",mapsMouseEvent.latLng.lat()+","+mapsMouseEvent.latLng.lng());
        // console.log(PostedDaraArr);
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

$(document).on('click', '.location-container', function(resp) {

    var clat = $(this).attr("data-lat");
    var clng = $(this).attr("data-lng");

    var e = {
        latLng: new google.maps.LatLng(clat, clng)
    };

    google.maps.event.trigger(map, 'click', e);

    setTimeout(function() {
        map.setZoom(16);
    }, 3000);
});


$(document).on('click', '.category-container', function(resp) {

    $(".category-container").css("background", "white");

    $(this).css("background", "red");

    var type = $(this).attr("id");

    getLocationsandStore(type);
});


setTimeout(function() {
    loadLocationsinit(map, directionsService, directionsDisplay);
}, 2000);
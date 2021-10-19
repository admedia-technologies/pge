$(document).ready(function(){


	$(".btn-guest-user").click(function(){

		
		$(".login-email-txt").val("guestuser@guestuser.com");

		$(".login-password-txt").val("guestuser");

		$(".login-submit-btn").trigger("click");
		

	});


	 
$.noConflict();
var i=1;
	   $("#UsersDatatable").DataTable({
        processing: true,
        serverSide: true,
        ajax: $('#UsersDatatable').attr("data-url"),
        columns: [
            {"render": function() {return i++;}},
            { data: 'name', name: 'name' },
            { data: 'email', name: 'email' },
            { data: 'status', name: 'status' },
            { data: 'date', name: 'created_at' },
            { data: 'locations', name: 'locations', searchable: false, orderable: false }
        ]
    });


$("#UsersLocationsList").DataTable({
        
        ajax: {
            type:'get',
            url:$('#UsersLocationsList').attr("data-url"),
            data:function(d){
                 d.user_id = $('#UsersLocationsList').attr("data-id");
            },
            processing: true,
        serverSide: true,
        },
        columns: [
            {"render": function() {return i++;}},
            { data: 'formatted_address', name: 'formatted_address' },
            { data: 'click_event_lat', name: 'click_event_lat' },
            { data: 'click_event_lat', name: 'click_event_lng' },
            { data: 'created_at', name: 'created_at' },
            
        ]
    });

});
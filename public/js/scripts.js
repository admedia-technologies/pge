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
            { data: 'date', name: 'created_at' }
        ]
    });


});
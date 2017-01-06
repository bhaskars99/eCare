$(document).ready(function(){
    /*$("#accordian li a").on("click",function(){
      $("#case"+$(this).attr("id")).show().siblings().hide();
      $(this).parents().addClass('active');
      $(this).parents().siblings().removeClass('active');
    });*/
	if(localStorage.fname){
		$("#username").html("Welcome "+ localStorage.fname)
	}
    $("#comhealth li").on("click",function(){
         $("#comheacon>div.ch:nth-child("+($(this).index()+1)+")").show().siblings().hide();
         $(this).addClass('active').siblings().removeClass('active');        
     });
     $("#genhealth li").on("click",function(){
         
         $("#genheacon>div.gh:nth-child("+($(this).index()+1)+")").show().siblings().hide();
         $(this).addClass('active').siblings().removeClass('active');        
     });


 $('#accordian a:last').tab('show')
$('#accordian a').click(function (e) {
  e.preventDefault();
  $(this).tab('show');
  console.log($(this));
})

     
    $("#goMaps").on("click",function(){
      $("#myModalMaps").modal('show');
    });
if(localStorage.length==0){
	$('#myModal').modal('show');
    $("#formDeatails").on("submit",function(){
      localStorage.fname = $("#fname").val()
     // localStorage.fname = $('[name="fname"]').val()
      localStorage.lname = $("#lname").val()
      localStorage.telephone = $("#telephone").val()
      localStorage.gender = $('[name="gender"]').val()
      localStorage.city = $("#city").val();
      $("#username").html("Welcome "+ localStorage.fname)
      $("#myModal").modal('hide');
    });
}
    

	

    


/*
	$.getJSON( "hospitals.json", function( data ) {
	  var items = [];
	  //console.log(data)
	  $.each( data, function( key, val ) {
	    items.push( "<li id='" + key + "'>" + val + "</li>" );
	  });
	 
	  $( "<ul/>", {
	    "class": "my-new-list",
	    html: items.join( "" )
	  }).appendTo( "body" );
	});


*/





















    var map;
	var infowindow;
	var Crd;
	//navigator.geolocation.getCurrentPosition(success);
	function success(pos) {  Crd = pos.coords;
		console.log(Crd)
		// initialize(Crd);
	};
if(localStorage){
	console.log(localStorage)
}
	
});
function initialize(Crd) {
  var pyrmont = new google.maps.LatLng(Crd.latitude, Crd.longitude); // sample location to start with

  map = new google.maps.Map(document.getElementById('map-canvas'), {
    center: pyrmont,
    zoom: 10
  });

  var request = {
    location: pyrmont,
    radius: 200,
    types: ['hospital', 'health'] // this is where you set the map to get the hospitals and health related places
  };
  infowindow = new google.maps.InfoWindow();
  var service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, callback);
}

function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);
    }
  }
}

function createMarker(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
}
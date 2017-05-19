var deals;
var i;
var long;
var date;
var pic = [];
var com=[];
$(document).ready(function(){
	function initMap() {
        var uluru = {lat: -25.363, lng: 131.044};
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 4,
          center: uluru
        });
        var marker = new google.maps.Marker({
          position: uluru,
          map: map
        });
      }

	//Obtengo las ciudades
	var select, cities;
	select= document.getElementsByTagName("select");
	$.getJSON("http://hci.it.itba.edu.ar/v1/api/geo.groovy?method=getcities",function(data){
		 cities = data.cities;
		 		   	
	     long=cities.length;
	    for(var i=0; i<long;i++)
	    	$("select").append("<option value="+ data.cities[i].id+">"+data.cities[i].name+"</option>");
	  for(var i=0; i<long;i++)
	    	$("select").append("<option value="+ data.cities[i].id+">"+data.cities[i].name+"</option>");
	    $("select").disabled=true;
		$.getJSON("http://hci.it.itba.edu.ar/v1/api/booking.groovy?method=getflightdeals&from="+$("select").val(),function(data){
			 deals = data.deals;
			 var table= document.getElementsByTagName("table");		       	
		     long=deals.length;
		     $("table").append("<tr id='primeraFila'><td>Deal</td><td>City</td><td>Country</td><td>Price</td></tr>");
		    var time= new Date();
		    var day=time.getUTCDate()+7;   
		    var month=time.getMonth()+1;
		    var year=time.getFullYear();
		    if(day>30){
		    	day=day-30;
		    	month++;
		    }
		    if(month>12){
		    	month=month-12;
		    	year++;
		    }
		    var ceroday="";
		    var ceromonth="";
		    if(day<10)
		    	ceroday="0";
		    if(month<10)
		    	ceromonth="0";
		    date= ""+ceromonth+month+"/"+ceroday+day+"/"+year+"";
		    for(i=0; i<long-1;i++){
    			var mediaLink;
    			 var flickerAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
				  com[i]=$.getJSON( flickerAPI, {
				    tags: deals[i].city.name,
				    tagmode: "any",
				    format: "json"
				  }).done(function(data) {
		    			$.each( data.items, function( i, item ) {
       						pic.push(item.media.m)
        					if ( i === 1 ) 
          						return false;
          				});

        });}
		    
	}).done(function(){
		com[long-2].complete(function(){
		for(i=0; i<long-1;i++){
			mediaLink=pic[i];
			var link = "<a href='flightsList.html?&from="+ $("select").val()+"&to="+deals[i].city.id+"&dateFrom="+date+"&round=false&dateTo=&adults=1&child=0&infants=0' onclick='cambio("+i+");' id="+i+">";     
			$("table").append("<tr id='fila'><td><img class='img-rounded' src="+mediaLink+" /></td><td>"+link+deals[i].city.name+"</a></td><td>"+deals[i].city.country.name+"</td><td>"+deals[i].price+"</td></tr>");
		}
		$("select").removeAttr("disabled");  
		});	
	});		
	});
	
	$("select").change(function(){
		$("table").children().remove();
		$("table").append("<tr><td>Loading</td></tr>");
		this.disabled=true;
		$.getJSON("http://hci.it.itba.edu.ar/v1/api/booking.groovy?method=getflightdeals&from="+this[this.selectedIndex].value,function(data){
		 $("table").children().remove();
		 var deals = data.deals;
		 var table= document.getElementsByTagName("table");		       	
	     long=deals.length;
	     $("table").append("<tr id='primeraFila'><td>Deal</td><td>City</td><td>Country</td><td>Price</td></tr>");
	     var time= new Date();
		    var day=time.getUTCDate()+7;   
		    var month=time.getMonth()+1;
		    var year=time.getFullYear();
		    if(day>30){
		    	day=day-30;
		    	month++;
		    }
		    if(month>12){
		    	month=month-12;
		    	year++;
		    }
		   	var ceroday="";
		    var ceromonth="";
		    if(day<10)
		    	ceroday="0";
		    if(month<10)
		    	ceromonth="0";
		    var date= ""+ceromonth+month+"/"+ceroday+day+"/"+year+"";
		   for(i=0; i<long-1;i++){
    			var mediaLink;
    			 var flickerAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
				  com[i]=$.getJSON( flickerAPI, {
				    tags: deals[i].city.name,
				    tagmode: "any",
				    format: "json"
				  }).done(function(data) {
		    			$.each( data.items, function( i, item ) {
       						pic.push(item.media.m)
        					if ( i === 1 ) 
          						return false;
          				});

        });}
		    
	}).done(function(){
		com[long-2].complete(function(){
		for(i=0; i<long-1;i++){
			mediaLink=pic[i];
			var link = "<a href='flightsList.html?&from="+ $("select").val()+"&to="+deals[i].city.id+"&dateFrom="+date+"&round=false&dateTo=&adults=1&child=0&infants=0' onclick='cambio("+i+");' id="+i+">";     
			$("table").append("<tr id='fila'><td><img class='img-rounded' src="+mediaLink+" /></td><td>"+link+deals[i].city.name+"</a></td><td>"+deals[i].city.country.name+"</td><td>"+deals[i].price+"</td></tr>");
		}
		$("select").removeAttr("disabled");  
		});	
	});		
	});




});

function cambio(i){
	var datef= getQueryV("dateFrom",i);
	var idfrom=getQueryV("from",i);
	var idto=getQueryV("to",i);
	var info="&from="+idfrom+"&to="+idto+"&dateFrom="+datef+"&round=false&dateTo=''&adults=1&child=0&infants=0";
	sessionStorage.setItem("infoBusqueda", info);  
	document.getElementById(i).href="flightsList.html";
	sessionStorage.setItem("isRound", "false"); 
	sessionStorage.setItem("adults", 1);
	sessionStorage.setItem("children", 0);
    sessionStorage.setItem("infants", 0);
}
function getQueryV(variable, i){

		var a= document.getElementById(i);
		a=a.toString();
       var vars = a.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}
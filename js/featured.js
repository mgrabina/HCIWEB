$(document).ready(function(){
	//Obtengo las ciudades
	var select, cities, long;
	$.getJSON("http://hci.it.itba.edu.ar/v1/api/misc.groovy?method=getcities",function(data){
		 cities = data.cities;
		 select= document.getElementsByTagName("select");		       	
	     long=cities.length;
	    for(var i=0; i<long;i++)
	    	$("select").append("<option value='"+ data.cities[i].id+"'>"+data.cities[i].name+"</option>");	
	});
	select.onchange = function(){
		$.getJSON("http://hci.it.itba.edu.ar/v1/api/booking.groovy?method=getflightdeals&from="+select.value,function(data){
		 var deals = data.deals;
		 var table= document.getElementsByTagName("table");		       	
	     long=deals.length;
	    for(var i=0; i<long;i++)
	    	$("table").append("<tr><td>"+deals[i].city.name+"</td><td>"+deals[i].city.country.name+"</td><td>"+deals[i].price+"</td></tr>");	
	});
	};

});
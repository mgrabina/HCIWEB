$(document).ready(function(){
	//Obtengo las ciudades
	var select, cities, long;
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
			 var deals = data.deals;
			 var table= document.getElementsByTagName("table");		       	
		     long=deals.length;
		     $("table").append("<tr id='primeraFila'><td>City</td><td>Country</td><td>Price</td></tr>");
		    for(var i=0; i<long;i++)
		    	$("table").append("<tr id='fila'><td>"+deals[i].city.name+"</td><td>"+deals[i].city.country.name+"</td><td>"+deals[i].price+"</td></tr>");	
	}).done(function(){
		$("select").removeAttr("disabled");  	
	});		
	});
	
	$("select").change(function(){
		$("table").children().remove();
		this.disabled=true;
		$.getJSON("http://hci.it.itba.edu.ar/v1/api/booking.groovy?method=getflightdeals&from="+this[this.selectedIndex].value,function(data){
		 var deals = data.deals;
		 var table= document.getElementsByTagName("table");		       	
	     long=deals.length;
	     $("table").append("<tr id='primeraFila'><td>City</td><td>Country</td><td>Price</td></tr>");
	    for(var i=0; i<long;i++)
	    	$("table").append("<tr id='fila'><td>"+deals[i].city.name+"</td><td>"+deals[i].city.country.name+"</td><td>"+deals[i].price+"</td></tr>");	
	}).done(function(){
		$("select").removeAttr("disabled");
	});
	});

});
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
		    var date= ""+month+"/"+day+"/"+year+"";
		    for(var i=0; i<long;i++){
		    	var link = "<a href='flightsList.html?from="+ $("select").val()+"&to="+deals[i].city.id+"&dateFrom="+date+"&round=false&dateTo='>";     
		    	$("table").append("<tr id='fila'><td>"+link+deals[i].city.name+"</a></td><td>"+deals[i].city.country.name+"</td><td>"+deals[i].price+"</td></tr>");
		    }
	}).done(function(){
		$("select").removeAttr("disabled");  	
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
	     $("table").append("<tr id='primeraFila'><td>City</td><td>Country</td><td>Price</td></tr>");
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
		    var date= ""+month+"/"+day+"/"+year+"";
		    for(var i=0; i<long;i++){
		    	var link = "<a href='flightsList.html?from="+ $("select").val()+"&to="+deals[i].city.id+"&dateFrom="+date+"&round=false&dateTo='>";     
		    	$("table").append("<tr id='fila'><td>"+link+deals[i].city.name+"</a></td><td>"+deals[i].city.country.name+"</td><td>"+deals[i].price+"</td></tr>");
		    }	
	}).done(function(){
		$("select").removeAttr("disabled");
	});
	});

});



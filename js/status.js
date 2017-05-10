$(document).ready(function(){
	var select, aerolineas, long;
	$.getJSON("http://hci.it.itba.edu.ar/v1/api/misc.groovy?method=getairlines",function(data){
		 aerolineas = data.airlines;
		 select= document.getElementsByTagName("select");		       	
	     long=aerolineas.length;
	    for(var i=0; i<long;i++)
	    	$("select").append("<option value='"+ data.airlines[i].id+"'>"+data.airlines[i].name+"</option>");	
	});
	
	$("button").click(function(){
		var id = document.getElementsByTagName('select').value;
		var number = document.getElementById('flightNumber').value;
		window.alert(id +" " + number); 
		$.getJSON("http://hci.it.itba.edu.ar/v1/api/status.groovy?method=getflightstatus&airline_id="+id+"&flight_number="+number,function(data){
			status = data.status;
			window.alert(status);
		});
	}	);		
});
$(document).ready(function(){
	var select, aerolineas, long;
	$.getJSON("http://hci.it.itba.edu.ar/v1/api/misc.groovy?method=getairlines",function(data){
		 aerolineas = data.airlines;
		 select= document.getElementsByTagName("select");		       	
	     long=aerolineas.length;
	    for(var i=0; i<long;i++)
	    	$("select").append("<option value='"+ data.airlines[i].id+"'>"+data.airlines[i].name+"</option>");	
	});		
});

	function buscarEstado(){
		document.getElementById('errores').innerHTML='';
		var select=document.getElementsByTagName("select");
		id = $("select").val();
		number = document.getElementById('flightNumber').value; 
		$.getJSON("http://hci.it.itba.edu.ar/v1/api/status.groovy?method=getflightstatus&airline_id="+id+"&flight_number="+number,function(data){
			var text="";
			try{
			if(data.error.code<1000)
							  document.getElementById('errores').innerHTML+='<div class="alert alert-danger" role="alert">'+data.error.message+'</div>';
			}catch(err){
			switch(data.status.status){
				case "S": text="Scheduled";
					break;
				case "A": text="Active";
					break;
				case "R": text="Deflected";
					break;
				case "L": text="Landed";
					break;
				case "C": text="Canceled";
					break;	
			}
			if (data.status.status == "S" || data.status.status == "A") {
				if(data.status.departure.gate_delay == null)
					text= text+" - On Time - " + data.status.departure.scheduled_time;
				else
					text= text+" - Delayed - " + data.status.departure.gate_delay;
			}
			  document.getElementById('errores').innerHTML+='<div class="alert alert-warning" role="alert">'+text+'</div>';

		}});
	}	

$(document).ready(function(){
	
	$.getJSON("http://hci.it.itba.edu.ar/v1/api/misc.groovy?method=getairlines",function(data){
		var aerolineas = data.airlines;
		var select= document.getElementsByTagName("select");		       	
	    var long=aerolineas.length;
	    for(var i=0; i<long;i++)
	    	$("select").append("<option>"+data.airlines[i].name+"</option>");	
	});	
});
	

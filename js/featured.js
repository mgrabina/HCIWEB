
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
		    var ceroday="";
		    var ceromonth="";
		    if(day<10)
		    	ceroday="0";
		    if(month<10)
		    	ceromonth="0";
		    var date= ""+ceromonth+month+"/"+ceroday+day+"/"+year+"";
		    for(var i=0; i<long;i++){
		    	var link = "<a href='flightsList.html?&from="+ $("select").val()+"&to="+deals[i].city.id+"&dateFrom="+date+"&round=false&dateTo=&adults=1&child=0&infants=0' onclick='cambio("+i+");' id="+i+">";     
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
		   	var ceroday="";
		    var ceromonth="";
		    if(day<10)
		    	ceroday="0";
		    if(month<10)
		    	ceromonth="0";
		    var date= ""+ceromonth+month+"/"+ceroday+day+"/"+year+"";
		    for(var i=0; i<long;i++){
				var link = "<a href='flightsList.html?&from="+ $("select").val()+"&to="+deals[i].city.id+"&dateFrom="+date+"&round=false&dateTo=&adults=1&child=0&infants=0' onclick='cambio("+i+");' id="+i+">";
		    	$("table").append("<tr id='fila'><td>"+link+deals[i].city.name+"</a></td><td>"+deals[i].city.country.name+"</td><td>"+deals[i].price+"</td></tr>");
		    }	
	}).done(function(){
		$("select").removeAttr("disabled");
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
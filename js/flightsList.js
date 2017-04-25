
$(document).ready(function(){
   //código a ejecutar cuando el DOM está listo para recibir instrucciones.
$("#details").hide();

$("#detailsButton").click(details);

$( function() {
    $( "#slider" ).slider();
  } );

});




function details(){
	$("#details").toggle();



}







//$("#tickets").append("<div id=\"ticket\"><div class=\"col-md-2 row-height\" id=\"leftBorder\"><h4><span class=\"label label-info\">departure</span></h4><h4>24/04/17</h4><h4>american ailines</h4></div>	<div class=\"col-md-2 row-height\" id=\"light\"><h4>FROM: BUE</h4><h6>Aeropuerto internacional de Ezeiza</h6><h4>17:30hs</h4></div><div class=\"col-md-2 row-height\" id=\"light\"><h4>TO: MIA</h4><h6>Aeropuerto internacional de Miami</h6><h4>6:20hs</h4></div><div class=\"col-md-2 row-height\" id=\"light\"><h4>Duration:</h4><h4>10:00hs</h4></div><div class=\"col-md-2 row-height\" id=\"light\"><h4>flight number:</h4><h4>4430</h4><h5>stars</h5></div><div class=\"col-md-2 row-height\" id=\"rightBorder\"><h4>8.520 ARS</h4><h7>1 adult, 2 child</h7><button type=\"button\" class=\"btn btn-primary\">continue</button></div></div>");

//$("#tickets").append("<div id=\"ticket\"><div class=\"col-md-2 row-height\" id=\"leftBorder\"><h4><span class=\"label label-info\">departure</span></h4><h4>24/04/17</h4><h4>american ailines</h4></div>	<div class=\"col-md-2 row-height\" id=\"light\"><h4>FROM: BUE</h4><h6>Aeropuerto internacional de Ezeiza</h6><h4>17:30hs</h4></div><div class=\"col-md-2 row-height\" id=\"light\"><h4>TO: MIA</h4><h6>Aeropuerto internacional de Miami</h6><h4>6:20hs</h4></div><div class=\"col-md-2 row-height\" id=\"light\"><h4>Duration:</h4><h4>10:00hs</h4></div><div class=\"col-md-2 row-height\" id=\"light\"><h4>flight number:</h4><h4>4430</h4><h5>stars</h5></div><div class=\"col-md-2 row-height\" id=\"rightBorder\"><h4>8.520 ARS</h4><h7>1 adult, 2 child</h7><button type=\"button\" class=\"btn btn-primary\">continue</button></div></div>");

//$("#tickets").append("<div id=\"ticket\"><div class=\"col-md-2 row-height\" id=\"leftBorder\"><h4><span class=\"label label-info\">departure</span></h4><h4>24/04/17</h4><h4>american ailines</h4></div>	<div class=\"col-md-2 row-height\" id=\"light\"><h4>FROM: BUE</h4><h6>Aeropuerto internacional de Ezeiza</h6><h4>17:30hs</h4></div><div class=\"col-md-2 row-height\" id=\"light\"><h4>TO: MIA</h4><h6>Aeropuerto internacional de Miami</h6><h4>6:20hs</h4></div><div class=\"col-md-2 row-height\" id=\"light\"><h4>Duration:</h4><h4>10:00hs</h4></div><div class=\"col-md-2 row-height\" id=\"light\"><h4>flight number:</h4><h4>4430</h4><h5>stars</h5></div><div class=\"col-md-2 row-height\" id=\"rightBorder\"><h4>8.520 ARS</h4><h7>1 adult, 2 child</h7><button type=\"button\" class=\"btn btn-primary\">continue</button></div></div>");

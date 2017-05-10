
$(document).ready(function(){
   //código a ejecutar cuando el DOM está listo para recibir instrucciones.

$( function() {
    $( "#slider" ).slider();
  } );


loadTickets();
checkCities();
 datePicker();

});




 





 function loadTickets(){
 

var from = "BUE";
var to = "TUC";
var date = "2017-12-25";
var adults = "2";
var children = "1";
var infants = "1";
var passengersAd = adults!="0"?(adults!="1"?(adults+" adults"):(adults+" adult")):""     ;
var passengersCh = children!="0"?(children!="1"?(", "+children+" children"):(", " +children+" child")):"" ;
var passengersIn = infants!="0"?(infants!="1"?(", "+infants+" infants"):(", " +infants+" infant")):"" ;

 var url = "http://hci.it.itba.edu.ar/v1/api/booking.groovy?method=getonewayflights&from="+from+"&to="+to+"&dep_date="+date+"&adults="+adults+"&children="+children+"&infants="+infants ;


 document.getElementById("priceOrder").setAttribute("href", url);


$.getJSON(url,function(data){

    var size = data.total;
    var i = 0;
    

   for( i = 0; i<size; i++){
              

      var totalPrice = data.flights[i].price.total.total;


      var airline = data.flights[i].outbound_routes[0].segments[0].airline.name;
 
      var duration = data.flights[i].outbound_routes[0].segments[0].duration ;

      var depAirportInfo = data.flights[i].outbound_routes[0].segments[0].departure.airport.description;
      var arrAirportInfo = data.flights[i].outbound_routes[0].segments[0].arrival.airport.description;
      var flightNumber = data.flights[i].outbound_routes[0].segments[0].number;

      
      var depDate = data.flights[i].outbound_routes[0].segments[0].departure.date.substring(8, 10)+ "/" +data.flights[i].outbound_routes[0].segments[0].departure.date.substring(5, 7)+"/"+ data.flights[i].outbound_routes[0].segments[0].departure.date.substring(0, 4) ;
      var arrDate = data.flights[i].outbound_routes[0].segments[0].arrival.date.substring(8, 10)+ "/" +data.flights[i].outbound_routes[0].segments[0].arrival.date.substring(5, 7)

      var depTime = data.flights[i].outbound_routes[0].segments[0].departure.date.substring(12, 16);
      var arrTime = data.flights[i].outbound_routes[0].segments[0].arrival.date.substring(12, 16);


      var ticket = "<div id=\"ticket\">" +
                "<div class=\"row row-ticket\" id=\"rowTicketTop\">" +
                  "<div class=\"col-md-2\">" +
                    "<h4><span class=\"label label-info\">departure</span></h4>" +
                  "</div>" +  
                  "<div class=\"col-md-2\">" +
                    "<h4>FROM: "+ from +"</h4>" +
                  "</div>" +
                  "<div class=\"col-md-2\">" +
                    "<h4>TO: "+ to +"</h4>" +
                  "</div>" +  
                  "<div class=\"col-md-2\">" +
                    "<h4>Duration:</h4>" +
                  "</div>" +  
                  "<div class=\"col-md-2\">" +
                    "<h4>flight number:</h4>" +
                  "</div>" +
                  "<div class=\"col-md-2 dark\" id=\"rightBorderTop\">" +
                    "<h4>"+ totalPrice +" USD</h4>" +
                  "</div>" +
                "</div>" +
                "<div class=\"row row-ticket\">" +
                  "<div class=\"col-md-2\">" +
                    "<h4>"+ depDate +"</h4>" +
                  "</div>" +  
                  "<div class=\"col-md-2\">" +
                    "<h6>"+ depAirportInfo +"</h6>" +
                  "</div>" +
                  "<div class=\"col-md-2\">" +
                    "<h6>"+ arrAirportInfo +"</h6>" +
                  "</div>" +  
                  "<div class=\"col-md-2\">" +
                    "<h4>"+duration+"hs</h4>" +
                  "</div>" +
                  "<div class=\"col-md-2\">" +
                    "<h4>"+ flightNumber +"</h4>" +
                  "</div>" +
                  "<div class=\"col-md-2 dark\">" +
                    "<h7>"+ passengersAd + passengersCh + passengersIn +"</h7>" +
                  "</div>" +
                "</div>" +
                
                "<div class=\"row row-ticket\" id=\"rowTicketBottom\">" +
                  "<div class=\"col-md-2\" id=\"leftBorderBotton\">" +
                    "<h4>"+ airline +"</h4>" +
                  "</div>" +  
                  "<div class=\"col-md-2\">" +    
                    "<h4>"+ depTime +"hs</h4>" +
                  "</div>" +
                  "<div class=\"col-md-2\">" +
                    "<h4>"+ arrTime +"hs</h4>" +
                  "</div>"  +
                  "<div class=\"col-md-2\">" +
                    "<h4></h4>" +
                  "</div>" +  
                  "<div class=\"col-md-2\">" +
                    "<h5>stars</h5>" +
                  "</div>" +
                  "<div class=\"col-md-2 dark\" id=\"rightBorderBottom\">" +
                    "<button type=\"button\" class=\"btn btn-grey\">continue</button>" +
                  "</div>" +
                "</div>" +
              "</div>"


               $("#tickets").append(ticket); 
               
           }   


  }); 







 }





function datePicker() {

	$( function() {
    $( "#dateFrom" ).datepicker();
  	} );

	$( function() {
    $( "#dateTo" ).datepicker();
  	} );
}

function checkCities(){

  var availableCities = [];


$.getJSON("http://hci.it.itba.edu.ar/v1/api/geo.groovy?method=getcities&page_size=100",function(data){

      var size = data.total;
      var i = 0;
      for( i = 0; i<size; i++){
        availableCities.push(data.cities[i].name);
      }

}); 
  

	$( function() {
    

    $( "#from" ).autocomplete({
      source: availableCities
    });

     $( "#to" ).autocomplete({
      source: availableCities
    });

  } );



}





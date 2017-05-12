
$(document).ready(function(){
   //código a ejecutar cuando el DOM está listo para recibir instrucciones.


loadAirlines();
loadTickets();
checkCities();
 datePicker();


 


$(document).on('click','#page', function(event) {

    pageInFocus = this.getAttribute("value");
    loadTickets();
   
}); 




$(document).on('click','.checkbox', function(event) {
    sliderSetted = false;
    pageInFocus = 1;
    checkAirlines();
    loadTickets();
   
}); 



$( ".slider" ).on( "slide", function( event, ui ) {
  $( "#hoursSelected" ).empty();
    $("#hoursSelected").append(ui.value + "hs max"); 
} );

$( ".slider" ).on( "slidechange", function( event, ui ) {
  pageInFocus = 1;
  loadTickets();
} );






});



//
//
//
//
var airlinesToShow = [];
var airlinesNumber;
var filterAirlines = false;
var sliderSetted = false;
var minDuration = 100;
var maxDuration = 0;
var pageInFocus = 1;
var pagesSize = 5;


function updateHoursSelected(value){
    

    
   
    $( "#hoursSelected" ).empty();
    $("#hoursSelected").append(value + "hs max"); 
}





function setSlider(){



$( ".slider" ).slider({
  min: minDuration,
  max: maxDuration,
  value: maxDuration,
  range: "min",

  

});

 $( "#hoursSelected" ).empty();
$("#hoursSelected").append(maxDuration + "hs max"); 


}


function loadAirlines(){

  $.getJSON("http://hci.it.itba.edu.ar/v1/api/misc.groovy?method=getairlines",function(data){
        var size = data.total;
        airlinesNumber = size;
        var i = 0;

         for( i = 0; i<size; i++){
            var airline = data.airlines[i].name;

            var alcb = "<label class=\"checkbox\">" +
                      "<input type=\"checkbox\"  name=\""+ airline +"\" id=\"cb"+ i +"\"  value=\""+ i +"\">" + airline +
                     "</label>"
            
            $("#airlinesCB").append(alcb); 

            
                     
         }      

    }); 
}

 





 function loadTickets(){

  window.location.href = "#";

$("#loading").append("<h4><span class=\"label label-info\" id=\"load\"><span class=\"glyphicon glyphicon-hourglass ld ld-spin\" aria-hidden=\"true\"></span> Loading...</span></h4>");  

var from = "BUE";
var to = "MIA";
var date = "2017-12-25";
var adults = "2";
var children = "1";
var infants = "1";
var passengersAd = adults!="0"?(adults!="1"?(adults+" adults"):(adults+" adult")):""     ;
var passengersCh = children!="0"?(children!="1"?(", "+children+" children"):(", " +children+" child")):"" ;
var passengersIn = infants!="0"?(infants!="1"?(", "+infants+" infants"):(", " +infants+" infant")):"" ;

 var url = "http://hci.it.itba.edu.ar/v1/api/booking.groovy?method=getonewayflights&from="+from+"&to="+to+"&dep_date="+date+"&adults="+adults+"&children="+children+"&infants="+infants+"&page_size=100" ;

 //document.getElementById("priceOrder").setAttribute("href", url);


$.getJSON(url,function(data){

    var size = data.total;
    var i = 0;
    $( "#tickets" ).empty();
    $( "#minDuration" ).empty();
    $( "#maxDuration" ).empty();


    

    minDuration = 100;
    maxDuration = 0;

     var ticketAppend = 1;

   for( i = 0; i<size; i++){
              

      var totalPrice = data.flights[i].price.total.total;


      var airline = data.flights[i].outbound_routes[0].segments[0].airline.name;
      var rating = data.flights[i].outbound_routes[0].segments[0].airline.rating;
 
      var duration = data.flights[i].outbound_routes[0].segments[0].duration ;

      var depAirportInfo = data.flights[i].outbound_routes[0].segments[0].departure.airport.description;
      var arrAirportInfo = data.flights[i].outbound_routes[0].segments[0].arrival.airport.description;
      var flightNumber = data.flights[i].outbound_routes[0].segments[0].number;

      
      var depDate = data.flights[i].outbound_routes[0].segments[0].departure.date.substring(8, 10)+ "/" +data.flights[i].outbound_routes[0].segments[0].departure.date.substring(5, 7)+"/"+ data.flights[i].outbound_routes[0].segments[0].departure.date.substring(0, 4) ;
      var arrDate = data.flights[i].outbound_routes[0].segments[0].arrival.date.substring(8, 10)+ "/" +data.flights[i].outbound_routes[0].segments[0].arrival.date.substring(5, 7)

      var depTime = data.flights[i].outbound_routes[0].segments[0].departure.date.substring(12, 16);
      var arrTime = data.flights[i].outbound_routes[0].segments[0].arrival.date.substring(12, 16);


      //

      
      var durationInt = parseInt(duration.substring(0,2));
     

      


      //


      var ticket = "<div id=\"ticket"+ i +"\">" +
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
                      "<div id=\"star"+ i +"\">" +

                      "</div>" + 
                  "</div>" +
                  "<div class=\"col-md-2 dark\" id=\"rightBorderBottom\">" +
                    "<button type=\"button\" class=\"btn btn-grey\">continue</button>" +
                  "</div>" +
                "</div>" +
              "</div>"

              setStar(i, rating);


              if( filterAirlines == false){
               

                  if (durationInt < minDuration ){
                    minDuration = durationInt;
                   
                  }
                  if (durationInt > maxDuration){
                    maxDuration = durationInt;
                  }

                  if( !sliderSetted){
                    if( appendTicket(ticketAppend)){
                      $("#tickets").append(ticket);   
                    }
                    ticketAppend++;

                  }
                  else{
                    if( durationInt <= $( ".slider" ).slider( "value" ) ){
                       if( appendTicket(ticketAppend)){
                          $("#tickets").append(ticket);  
                       }
                       ticketAppend++;
                    }
                  } 

              }
              else{
               if( contains(airlinesToShow, airline)){
                  

                    if (durationInt < minDuration ){
                      minDuration = durationInt;
                     
                    }
                    if (durationInt > maxDuration){
                      maxDuration = durationInt;
                    }
                    if( durationInt <= $( ".slider" ).slider( "value" ) )
                     $("#tickets").append(ticket);
                  
                }
             }   
          }


         $( "#loading" ).empty();


  if( !sliderSetted)
  setSlider();
  sliderSetted = true;
  if(minDuration == 100)
    $("#minDuration").append("min: 0hs");
  else       
    $("#minDuration").append("min:"+minDuration+"hs");
  $("#maxDuration").append("max:"+maxDuration+"hs");

  
  setPages(ticketAppend-1);

  }); 
 }


 function setStar(i, rating){

   if( rating == null)
    rating = 0;

    $(function () {
 
        $("#star" + i).rateYo({
          rating: rating,
          readOnly: true,
          starWidth: "20px"
        });
    });



 }


function setPages(size){

  $( ".pagination" ).empty();

  var numberPages;

  if(size > pagesSize){
    if( size%pagesSize == 0){
      
      numberPages = size/pagesSize;
    

    }
    else{
      
      numberPages = size/pagesSize;
      numberPages = parseInt(numberPages) + 1;

     
    

    }


    for( var i = 1; i<= numberPages; i++){
      if( pageInFocus == i)
        $(".pagination").append( "<li class=\"active\"><a id=\"page\" value=\""+ i +"\" href=\"#\">"+ i +"</a></li>" );
      else 
        $(".pagination").append( "<li><a id=\"page\" value=\""+ i +"\" href=\"#\">"+ i +"</a></li>" );
    }


    
   
     }          

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

function contains(a, obj) {
    var i = a.length;
    while (i--) {
       if (a[i] === obj) {
           return true;
       }
    }
    return false;
}


function checkAirlines(){
    var i = 0;

    var airlinesChecked = [];

    for( i = 0; i<airlinesNumber; i++){


      if (document.getElementById("cb" + i ).checked){
        
        airlinesChecked.push(document.getElementById("cb" + i ).getAttribute("name"));


      }
    }


      if( airlinesChecked.length > 0)
        filterAirlines = true;
      else
        filterAirlines = false;

      airlinesToShow = airlinesChecked;

      
  
}



function appendTicket(value){

  var minVal;
  var maxVal;

  if( pageInFocus == 1){
    minVal = 1;
    maxVal = pagesSize;
  }
  else{
    minVal = ((pageInFocus - 1) * pagesSize) + 1;
    maxVal = pageInFocus * pagesSize;
  }

  if( value >= minVal && value <= maxVal)
    return true;

  return false;
}
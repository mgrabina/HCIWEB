
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

$(document).on('click','#order', function(event) {

   	loadPageInOrder(this.getAttribute("type"));
   
}); 

$(document).on('click','.checkbox', function(event) {
    sliderSetted = false;
    pageInFocus = 1;
    checkAirlines();
    loadTickets();
   
}); 

$("#searchButton").click(validate);



$(document).on('click','.btnContinue', function(event) {
    
    ticketSelected(this);
   
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
//variables
//
var airlinesToShow = [];
var airlinesNumber;
var filterAirlines = false;
var sliderSetted = false;
var minDuration = 100;
var maxDuration = 0;
var pageInFocus = 1;

//CHANGE TO SET THE SIZE OF THE PAGES
var pagesSize = 5;


var sort = false;
var sortKey;



var from = getQueryVariable(sessionStorage.getItem("infoBusqueda"),"from");
var to = getQueryVariable(sessionStorage.getItem("infoBusqueda"),"to");

var date2 = getQueryVariable(sessionStorage.getItem("infoBusqueda"),"dateFrom"); // mm/dd/yyyy
if(getQueryV("departure")=="true"){
    var aux = to;
    to = from;
    from = aux;
    date2
    date2 = getQueryVariable(sessionStorage.getItem("infoBusqueda"),"dateTo"); // mm/dd/yyyy
}
var date = date2.substring(6, 10) + "-" + date2.substring(0, 2) + "-" + date2.substring(3, 5);    // yyyy-mm-dd
var round= getQueryVariable(sessionStorage.getItem("infoBusqueda"),"round");
var adults = getQueryVariable(sessionStorage.getItem("infoBusqueda"),"adults");
var children = getQueryVariable(sessionStorage.getItem("infoBusqueda"),"child");
var infants = getQueryVariable(sessionStorage.getItem("infoBusqueda"),"infants");

//
//
//
//




//Choose what to do when the ticket has been selected
function ticketSelected(button){

   var airline = button.getAttribute("airline");
  var depDate = button.getAttribute("depDate");
  var arrDate = button.getAttribute("arrDate");
  var depAirportInfo = button.getAttribute("depAirportInfo");
  var arrAirportInfo = button.getAttribute("arrAirportInfo");
  var totalPrice = button.getAttribute("totalPrice");
	var flightNumber = button.getAttribute("flightN");
  var depTime = button.getAttribute("depTime");
  var arrTime = button.getAttribute("arrTime");
  var prices = button.getAttribute("prices");
  var flightId = button.getAttribute("flightId");



  
	
	if (sessionStorage.getItem("isRound")=="false"){
		
    sessionStorage.setItem("departureFlightNumber", flightNumber);
     sessionStorage.setItem("departureFrom", from);
      sessionStorage.setItem("departureTo", to); 
      sessionStorage.setItem("departureAirline", airline);
      sessionStorage.setItem("departureDepDate", depDate);
      sessionStorage.setItem("departureArrDate", arrDate);
      sessionStorage.setItem("departureDepAirportInfo", depAirportInfo);
      sessionStorage.setItem("departureArrAirportInfo", arrAirportInfo);
      sessionStorage.setItem("departureTotalPrice", totalPrice);
      sessionStorage.setItem("departureDepTime", depTime);
      sessionStorage.setItem("departureArrTime", arrTime);
      sessionStorage.setItem("departurePrices", prices);
      sessionStorage.setItem("departureFlightId", flightId);

      
  

      window.location.href = "paymentMethod.html" ;
	}else{
		if( getQueryV("departure")==false ){
		  
      sessionStorage.setItem("departureFlightNumber", flightNumber);
      sessionStorage.setItem("departureFrom", from);
      sessionStorage.setItem("departureTo", to); 
      sessionStorage.setItem("departureAirline", airline);
      sessionStorage.setItem("departureDepDate", depDate);
      sessionStorage.setItem("departureArrDate", arrDate);
      sessionStorage.setItem("departureDepAirportInfo", depAirportInfo);
      sessionStorage.setItem("departureArrAirportInfo", arrAirportInfo);
      sessionStorage.setItem("departureTotalPrice", totalPrice);
      sessionStorage.setItem("departureDepTime", depTime);
      sessionStorage.setItem("departureArrTime", arrTime);
      sessionStorage.setItem("departurePrices", prices);
      sessionStorage.setItem("departureFlightId", flightId);
    
 

    

      window.location.href = "flightsList.html?departure=true";
    }else{
	   
	   sessionStorage.setItem("returningFlightNumber", flightNumber);
     sessionStorage.setItem("returningFrom", from);
      sessionStorage.setItem("returningTo", to); 
     sessionStorage.setItem("returningAirline", airline);
      sessionStorage.setItem("returningDepDate", depDate);
      sessionStorage.setItem("returningArrDate", arrDate);
      sessionStorage.setItem("returningDepAirportInfo", depAirportInfo);
      sessionStorage.setItem("returningArrAirportInfo", arrAirportInfo);
      sessionStorage.setItem("returningTotalPrice", totalPrice);
      sessionStorage.setItem("returningDepTime", depTime);
      sessionStorage.setItem("returningArrTime", arrTime);
      sessionStorage.setItem("returningPrices", prices);
      sessionStorage.setItem("returningFlightId", flightId);
      
     

      window.location.href = "paymentMethod.html";
    }
  }




}


//reload the tickets by the order type selected
function loadPageInOrder(type){

	sort = true
	sortKey = "&sort_key=" + type;
	pageInFocus = 1;
	loadTickets();

}



function getQueryV(variable)
{
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}


//get the variable from the url
function getQueryVariable(queryP ,variable)
{
       var query = queryP;
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}



//update the hs selected in the slider
function updateHoursSelected(value){
    $( "#hoursSelected" ).empty();
    $("#hoursSelected").append(value + "hs max"); 
}




//set the slider
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


//load the airlines availables
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

 




//load the selectable tickets 
 function loadTickets(){

  window.location.href = "#";

$( "#loading" ).empty();
$("#loading").append("<h4><span class=\"label label-info\" id=\"load\"><span class=\"glyphicon glyphicon-hourglass ld ld-spin\" aria-hidden=\"true\"></span> Loading...</span></h4>");  


var passengersAd = adults!="0"?(adults!="1"?(adults+" adults"):(adults+" adult")):""     ;
var passengersCh = children!="0"?(children!="1"?(", "+children+" children"):(", " +children+" child")):"" ;
var passengersIn = infants!="0"?(infants!="1"?(", "+infants+" infants"):(", " +infants+" infant")):"" ;

 var url = "http://hci.it.itba.edu.ar/v1/api/booking.groovy?method=getonewayflights&from="+from+"&to="+to+"&dep_date="+date+"&adults="+adults+"&children="+children+"&infants="+infants+"&page_size=100" ;

if (sort)
	url = url + sortKey;


$.getJSON(url,function(data){

    var size = data.total;
    if(size==0){
      document.getElementById('errores').innerHTML='<div class="alert alert-danger" role="alert">There are not available flights.</div>';
     
    }
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

      var flightId = data.flights[i].outbound_routes[0].segments[0].id;

      
      var depDate = data.flights[i].outbound_routes[0].segments[0].departure.date.substring(8, 10)+ "/" +data.flights[i].outbound_routes[0].segments[0].departure.date.substring(5, 7)+"/"+ data.flights[i].outbound_routes[0].segments[0].departure.date.substring(0, 4) ;
      var arrDate = data.flights[i].outbound_routes[0].segments[0].arrival.date.substring(8, 10)+ "/" +data.flights[i].outbound_routes[0].segments[0].arrival.date.substring(5, 7)

      var depTime = data.flights[i].outbound_routes[0].segments[0].departure.date.substring(12, 16);
      var arrTime = data.flights[i].outbound_routes[0].segments[0].arrival.date.substring(12, 16);


      var ded = depDate.substring(0,2);
      var ard = arrDate.substring(0,2);
      var plusOne = (ded == ard)?"":"(+1)";
     


        var depOrArr = (getQueryV("departure")==false)?"departure":"returning";
   
      var durationInt = parseInt(duration.substring(0,2));


      var pricePerAdult = "Price per adult: " + data.flights[i].price.adults.base_fare +", ";

      var pricePerChild;
      var pricePerInfant;



      if(data.flights[i].price.children == null)
        pricePerChild = "";
      else
        pricePerChild = "Price per child: " + data.flights[i].price.children.base_fare +", ";

    
     if(data.flights[i].price.infants == null)
        pricePerInfant = "";
      else
        pricePerInfant = "Price per infant: " + data.flights[i].price.infants.base_fare +", ";


      var charges = data.flights[i].price.total.charges;
      var taxes = data.flights[i].price.total.taxes;
      var fare = data.flights[i].price.total.fare;


      var prices =  pricePerAdult + pricePerChild  + pricePerInfant + "Charges: " + charges + ", Taxes: " + taxes ;

      

     

     
      

      var ticket = "<div id=\"ticket"+ i +"\">" +
                "<div class=\"row row-ticket\" id=\"rowTicketTop\">" +
                  "<div class=\"col-md-2\">" +
                    "<h4><span class=\"label label-info\">"+ depOrArr +"</span></h4>" +
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
                    "<h4>"+ depDate + plusOne +"</h4>" +
                  "</div>" +  
                  "<div class=\"col-md-2\">" +
                    "<h6>"+ depAirportInfo  +"</h6>" +
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
                    "<button type=\"button\" class=\"btn btn-link\" data-trigger=\"focus\" data-container=\"body\" id=\"detailsbtn\" data-toggle=\"popover\" data-placement=\"right\" data-content=\""+ prices +"\">Details</button>" +
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
                    "<button type=\"button\" class=\"btn btn-grey btnContinue\" flightId=\""+ flightId +"\" prices=\""+ prices +"\"  flightN=\""+ flightNumber +"\" airline=\""+ airline +"\" arrTime=\""+ arrTime +"\" depTime=\""+ depTime +"\" depDate=\""+ depDate +"\"  arrDate=\""+ arrDate +"\" totalPrice=\""+ totalPrice +"\" depAirportInfo=\""+ depAirportInfo +"\" arrAirportInfo=\""+ arrAirportInfo +"\">continue</button>" +
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


    $(function () {
  $('[data-toggle="popover"]').popover()
})




  }); 
 }




// set the stars rating bar for the i ticket
 function setStar(i, rating){
   rating = rating/2;
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



//set the number of pages using the var pagesSize
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



//set the datePicker for the form
function datePicker() {

	$( function() {
    $( "#dateFrom" ).datepicker();
  	} );

	$( function() {
    $( "#dateTo" ).datepicker();
  	} );
}


var availableCities = [];
var availableCitiesid=[];
//check the cities for the form
function checkCities(){

  

      var cities = JSON.parse(localStorage.getItem("cities")).cities;
      var size = cities.length ;
      var data2 = JSON.parse(localStorage.getItem("airport"));

      var i = 0;
      for( i = 0; i<size; i++){
        availableCities.push(cities[i].name);
        availableCitiesid.push(cities[i].id);
      }
      size = data2.total;
      for(var x=0;x<size;x++){
        availableCities.push(data2.airports[x].description);
        availableCitiesid.push(data2.airports[x].city.id);
       }  
      var from2;
      var to2;
      for(var x=0;x<availableCitiesid.length;x++){
        if(availableCitiesid[x]==from)
          from2=availableCities[x];
        if(to==availableCitiesid[x])
          to2=availableCities[x];
      }
      document.getElementById("from").value=from2;
      document.getElementById("to").value=to2;
      if(round=="false"){
        document.getElementById("dateTo").style.display='none';
        document.getElementById("SdateTo").style.display='none';
      }
 
  

	$( function() {
    

    $( "#from" ).autocomplete({
      source: availableCities
    });

     $( "#to" ).autocomplete({
      source: availableCities
    });

  } );



}



//simple contain function por array
function contains(a, obj) {
    var i = a.length;
    while (i--) {
       if (a[i] === obj) {
           return true;
       }
    }
    return false;
}



// check the airlines selected in the filter
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


//if the ticket belong to the current page return true, else false
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
function validate(){
  document.getElementById('errores').innerHTML = '';
  var errores='';
  var ret=true;
  //
  var from = document.getElementById("from").value;
  var to = document.getElementById("to").value;
  var roundTrip = (round=="false")?false:true;
  var dateFrom = Date.parse(document.getElementById("dateFrom").value); // Format:  yyyy-mm-dd
  var dateTo = Date.parse(document.getElementById("dateTo").value);
  var time= new Date();
  if(from=="" || to==""|| isNaN(dateFrom)){
    errores= errores+'Please complete all the fields.'+ "<br/>";
    ret=false;
  }else
  if(roundTrip==true && isNaN(dateTo)){
    errores= errores+'Please complete the returning date.'+ "<br/>"
    ret=false;
  }
  if(ret!=false){
    if(from==to){
      errores=errores +'Same city.<br/>';
      ret=false;
    }
    
    var long = availableCities.length;
    var flag= false;
    var flag2=false;
    for(var i=0;i<long && (flag==false || flag2==false) ;i++){
      if(flag == false && from==availableCities[i])
        flag=true;
      if(flag2 == false && to==availableCities[i])
        flag2=true;
    }
    if(flag2==false || flag== false){
         errores=errores +'Is not a city. <br/>';
      ret=false;
    }
    
    if(roundTrip){      
      if(dateFrom<=time || dateTo<=time || dateTo<=dateFrom){
        errores=errores +'Invalid date. <br/>';
        ret=false;
      }
    }else{
        if(dateFrom<=time){
          errores=errores +'Invalid date. <br/>';
          ret=false;
        }  
      }

    if(dateFrom==dateTo){
      errores=errores +'Same date. <br/>';
      ret=false;
     }

      // false or true
 
    if(adults==0 && children==0 && infants == 0){
      errores=errores +'No hay pasajeros \n';
      ret=false;
    }
   }
   for(var x=0; x< availableCities.length;x++){
    if(availableCities[x]==from)
      idfrom=availableCitiesid[x];
    if(availableCities[x]==to)
      idto=availableCitiesid[x];
  }
  if(errores==""&& idfrom==idto){
    errores+='Same city.<br/>';
    ret=false;
  } 
  if(ret==false){
    document.getElementById('errores').innerHTML+='<div class="alert alert-danger" role="alert">'+errores+'</div>';
    document.getElementById("searchButton").href="#";
  }
  else{
    var idfrom;
    var idto;
    for(var x=0; x< availableCities.length;x++){
      if(availableCities[x]==from)
        idfrom=availableCitiesid[x];
      if(availableCities[x]==to)
        idto=availableCitiesid[x];
    }


   if(roundTrip){
    
    var info ="&from="+idfrom+"&to="+idto+"&dateFrom="+document.getElementById("dateFrom").value+"&round=true&dateTo="+document.getElementById("dateTo").value+"&adults="+adults+"&child="+children+"&infants="+infants+""; 
    }else{
      var info = "&from="+idfrom+"&to="+idto+"&dateFrom="+document.getElementById("dateFrom").value+"&round=false&dateTo=''&adults="+adults+"&child="+children+"&infants="+infants+"";     
    }
    document.getElementById("searchButton").href="flightsList.html";
    sessionStorage.setItem("infoBusqueda", info);


  }
}

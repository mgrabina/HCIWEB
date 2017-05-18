$(document).ready(function(){
   //código a ejecutar cuando el DOM está listo para recibir instrucciones.



  getPassengersInfo("adult", adults);
  getPassengersInfo("child", children);
  getPassengersInfo("infant", infants);
  getPaymentsAndContactInfo();
  getFlightsInfo();
  $('button').click(book());

});


var adults = sessionStorage.getItem("adults");
var children = sessionStorage.getItem("children");
var infants = sessionStorage.getItem("infants");


function book(){
  var flight_id;
  var installments;
  var credit_card_number;
  var expiration;
  var credit_card_first_name;
  var credit_card_last_name;
  var security_code;
  var city_id;
  var city_state;
  var country_id;
  var zipcode;
  var street;
  var apartment;
  var floor;
  var email;
  var phone;
  var url = 'http://hci.it.itba.edu.ar/v1/api/booking.groovy?method=bookflight2&booking=%7b%22flight_id%22:'+flight_id+',%22passengers%22:%5b%7b%22first_name%22:%22John%22,%22last_name%22:%22Doe%22,%22birthdate%22:%221969-06-02%22,%22id_type%22:1,%22id_number%22:%2217155171%22%7d%5d,%22payment%22:%7b%22installments%22:'+installments+',%22credit_card%22:%7b%22number%22:%'+credit_card_number+'%22,%22expiration%22:%22'+expiration+'%22,%22security_code%22:%22'+security_code+'%22,%22first_name%22:%22'+credit_card_first_name+'%22,%22last_name%22:%22'+credit_card_last_name+'%22%7d,%22billing_address%22:%7b%22city%22:%7b%22id%22:%22'+city_id+'%22,%22state%22:%22'+city_state+'%22,%22country%22:%7b%22id%22:%22'+country_id+'%22%7d%7d,%22zip_code%22:'+zipcode+',%22street%22:%22'+street+'%22,%22floor%22:%22'+floor+'%22,%22apartment%22:%22'+apartment+'%22%7d%7d,%22contact%22:%7b%22email%22:%22'+email+'%22,%22phones%22:%5b%22'+phone+'%22%5d%7d%7d';
  $.getJSON(url, function(data){
    if(data.booking){
            document.getElementById('err').innerHTML='<div class="alert alert-success" role="alert">Booked. <a href="home2.html">Book another flight?</a></div>';
          }else{
            document.getElementById('err').innerHTML='<div class="alert alert-success" role="alert">Error booking</div>';
          }
  });

}

function getPassengersInfo(passType, number){


  

   for(var i=1; i<=number; i++){

      
      var passenger = passType + i;

        var name =  sessionStorage.getItem("name"+passenger);
        var identification;

          if(sessionStorage.getItem("isDni"+passenger)=="true")
            identification = "D.N.I.: "
          else
            identification = "Passport: "

        var idNumber =  sessionStorage.getItem("passengerId"+passenger); 
        identification += idNumber;


         var birthDate =  sessionStorage.getItem("birthDate"+passenger);

        var info =     "<div class=\"col-md-4\">"+
                        "<h4>name: "+ name +"</h4>"+
                        "</div>"+
                        "<div class=\"col-md-4\">"+
                        "<h4>"+ identification +"</h4>"+
                        "</div>"+
                        "<div class=\"col-md-4\">"+
                        "<h4>birthDate: "+ birthDate +"</h4>"+
                        "</div>" 

        $("#passengerInfo").append(info);
 

  }

   var height = parseInt(adults) + parseInt(children) + parseInt(infants);
   height = height *3 +5;
  

   $(".passInfo").css("height", height+"em");
   

}


function getPaymentsAndContactInfo(){


  var email = sessionStorage.getItem("email");
  var phoneNumber = sessionStorage.getItem("phoneNumber");

    var contactInfo = "<h4>email: "+ email +"</h4>" +
                       "<h4>phone number: "+ phoneNumber +"</h4>"



  $("#contactInfo").append(contactInfo);


  var cardNumber = sessionStorage.getItem("cardNumber");
  var expirationDate = sessionStorage.getItem("expirationDate");
  var paymentName = sessionStorage.getItem("paymentName");
  var installments =  sessionStorage.getItem("installments");


  var paymentInfo = "<div class=\"col-md-3\">" +
                      "<h4>Name: "+ paymentName +"</h4>" +
                      
                      "</div>" +
                      "<div class=\"col-md-3\">" +
                      "<h4>credit card: "+ cardNumber +"</h4>" +
                    
                      "</div>" +
                      "<div class=\"col-md-3\">" +
                      "<h4>expiration date: "+ expirationDate +"</h4>" +
                      
                      "</div>" +
                       "<div class=\"col-md-3\">" +
                      "<h4>installments: "+ installments +"</h4>" +
                      
                      "</div>"

   $("#paymentInfo").append(paymentInfo);               


}


function getFlightsInfo() {

  var from = sessionStorage.getItem("departureFrom");
  var to = sessionStorage.getItem("departureTo");
  var flightNumber = sessionStorage.getItem("departureFlightNumber");
  var airline = sessionStorage.getItem("departureAirline");
  var depDate = sessionStorage.getItem("departureDepDate");
  var arrDate = sessionStorage.getItem("departureArrDate");
   var depTime = sessionStorage.getItem("departureDepTime");
  var arrTime = sessionStorage.getItem("departureArrTime");
  var depAirportInfo = sessionStorage.getItem("departureDepAirportInfo");
  var arrAirportInfo = sessionStorage.getItem("departureArrAirportInfo");
  var totalPrice = sessionStorage.getItem("departureTotalPrice");


  var flightInfo = "<div class=\"col-md-3\">"+
                    "<h4>airline: "+ airline +"</h4>"+
                    "<h4>flight number: "+ flightNumber +"</h4>"+
                    "<h4>"+ depDate +"</h4>"+
                    "</div>"+
                    "<div class=\"col-md-3\">"+
                    "<h4>from: "+ from +"</h4>"+
                    "<h5>"+ depAirportInfo +"</h5>"+
                    "<h4>"+ depTime +"hs</h4>"+
                    "</div>"+
                    "<div class=\"col-md-3\">"+
                    "<h4>to: "+ to +"</h4>"+
                    "<h5> "+ arrAirportInfo +"</h5>"+
                    "<h4>"+ arrTime +"hs</h4>"+
                    "</div>"+
                    "<div class=\"col-md-3\">"+
                    "<h4>Total Price</h4>"+
                    "<h4>"+ totalPrice +"USD</h4>"+
                    "</div>"

   $("#firstFlightInfo").append(flightInfo);                   


if( sessionStorage.getItem("isRound") == "true"){


       var from = sessionStorage.getItem("returningFrom");
      var to = sessionStorage.getItem("returningTo");
      var flightNumber = sessionStorage.getItem("returningFlightNumber");
      var airline = sessionStorage.getItem("returningAirline");
      var depDate = sessionStorage.getItem("returningDepDate");
      var arrDate = sessionStorage.getItem("returningArrDate");
       var depTime = sessionStorage.getItem("returningDepTime");
      var arrTime = sessionStorage.getItem("returningArrTime");
      var depAirportInfo = sessionStorage.getItem("returningDepAirportInfo");
      var arrAirportInfo = sessionStorage.getItem("returningArrAirportInfo");
      var totalPrice = sessionStorage.getItem("returningTotalPrice");




  var flightInfo = "<article id=\"SecondFlightData\">" +
                    " <h3>Second Flight Info</h3>" +
                     "<div class=\"col-md-3\">"+
                    "<h4>airline: "+ airline +"</h4>"+
                    "<h4>flight number: "+ flightNumber +"</h4>"+
                    "<h4>"+ depDate +"</h4>"+
                    "</div>"+
                    "<div class=\"col-md-3\">"+
                    "<h4>from: "+ from +"</h4>"+
                    "<h5>"+ depAirportInfo +"</h5>"+
                    "<h4>"+ depTime +"hs</h4>"+
                    "</div>"+
                    "<div class=\"col-md-3\">"+
                    "<h4>to: "+ to +"</h4>"+
                    "<h5> "+ arrAirportInfo +"</h5>"+
                    "<h4>"+ arrTime +"hs</h4>"+
                    "</div>"+
                    "<div class=\"col-md-3\">"+
                    "<h4>Total Price</h4>"+
                    "<h4>"+ totalPrice +"USD</h4>"+
                    "</div>"+
                    "</article>"


   $("#secondFlightInfo").append(flightInfo);  

}


}

$(document).ready(function(){
   //código a ejecutar cuando el DOM está listo para recibir instrucciones.





  getPassengersInfo("adult", adults);
  getPassengersInfo("child", children);
  getPassengersInfo("infant", infants);
  getPaymentsAndContactInfo();
  getFlightsInfo();
  
});


var adults = sessionStorage.getItem("adults");
var children = sessionStorage.getItem("children");
var infants = sessionStorage.getItem("infants");

var url1 = "http://hci.it.itba.edu.ar/v1/api/booking.groovy?method=bookflight2&booking=%7b%22flight_id%22:" 
var url2d = "";
var url2a = "";
var url3 = ",%22passengers%22:%5b";
var url4 = "%5d,";

function book(){
  
  var url = url1 + url2d + url3 + url4;
 

       $.getJSON(url,function(data){

          

          if(url2a==""){
            if(data.booking){
                  document.getElementById("btn").remove();
                  document.getElementById('err').innerHTML+='<div class="alert alert-success" role="alert">Booking confirmed. <a href="index.html">Book another?</a></div>';
                  
            }else
                  document.getElementById('err').innerHTML+='<div class="alert alert-danger" role="alert">Error booking.</div>';
          }


        })



       if( url2a != ""){

          var url = url1 + url2a + url3 + url4;
 

       $.getJSON(url,function(data){

           if(data.booking)
                  document.getElementById('err').innerHTML+='<div class="alert alert-success" role="alert">Booking confirmed. <a href="index.html">Book another?</a></div>';
            else
                  document.getElementById('err').innerHTML+='<div class="alert alert-danger" role="alert">Error booking.</div>';
        })

       }

 }

function getPassengersInfo(passType, number){


  

   for(var i=1; i<=number; i++){

      
      var passenger = passType + i;

        var name =  sessionStorage.getItem("name"+passenger);
        var identification;
        var id="";

          if(sessionStorage.getItem("isDni"+passenger)=="true"){
            identification = "D.N.I.: ";
            id="1";
          }
          else{
            identification = "Passport: ";
            id="2";
          }

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

        var n = name.split(' ');


        url3 +=  "%7b"+
                  "%22first_name%22:%22"+ n[0]+
                  "%22,%22last_name%22:%22" + n[1]+
                  "%22,%22birthdate%22:%22" + birthDate +
                  "%22,%22id_type%22:"+ id +
                  ",%22id_number%22:%22"+ idNumber +
                  "%22"+
                 "%7d,"
 

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
  var securityCode =  sessionStorage.getItem("securityCode");

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

   var exp = expirationDate.substr(0, 4);
   var n = paymentName.split(' ');
  
   var city = sessionStorage.getItem("city");
   var country = sessionStorage.getItem("country");
   var cityId = sessionStorage.getItem("cityId");
   var state =  sessionStorage.getItem("state");
   var st = state.replace(/ /g, "%20");
   var countryId = sessionStorage.getItem("countryId");
   var zipCode = sessionStorage.getItem("zipCode");
   var address = sessionStorage.getItem("address");
   var ad = address.replace(/ /g, "%20");
   var floor = sessionStorage.getItem("floor");
   var apartment = sessionStorage.getItem("apartment");


   var billingInfo =     "<div class=\"col-md-4\">"+
                        "<h4>country: "+ country +"</h4>"+
                        "<h4>state: "+ state +"</h4>"+
                        "</div>"+
                        "<div class=\"col-md-4\">"+
                        "<h4>city: "+ city +"</h4>"+
                        "<h4>zip code: "+ zipCode +"</h4>"+
                        "</div>"+
                        "<div class=\"col-md-4\">"+
                        "<h4>address: "+ address +"</h4>"+
                        "</div>" 

        $("#billingInfo").append(billingInfo);




   url4 += "%22payment%22:%7b%22installments%22:"+installments+
            ",%22credit_card%22:%7b%22number%22:%22" + cardNumber +
            "%22,%22expiration%22:%22" + exp +
            "%22,%22security_code%22:%22" + securityCode +
            "%22,%22first_name%22:%22" + n[0] +
            "%22,%22last_name%22:%22" + n[1] + "%22%7d," +
            "%22billing_address%22:%7b%22city%22:%7b%22id%22:%22" + cityId +
            "%22,%22state%22:%22" + st +
            "%22,%22country%22:%7b%22id%22:%22" + countryId +
            "%22%7d%7d,%22zip_code%22:" + zipCode +
            ",%22street%22:%22" + ad +
            "%22,%22floor%22:%22" + floor +
            "%22,%22apartment%22:%22" + apartment +
            "%22%7d%7d,%22contact%22:%7b%22email%22:%22" + email +
            "%22,%22phones%22:%5b%22" + phoneNumber + "%22%5d%7d%7d"



     


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
  var prices = sessionStorage.getItem("departurePrices");
  var flightId = sessionStorage.getItem("departureFlightId");
  url2d = flightId;

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
                    "<h5> "+ prices +"</h5>"+
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
      var prices = sessionStorage.getItem("returningPrices");
      var flightId = sessionStorage.getItem("returningFlightId");
      url2a = flightId;


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
                    "<h5> "+ prices +"</h5>"+
                    "</div>"+
                    "</article>"


   $("#secondFlightInfo").append(flightInfo);  

}


}

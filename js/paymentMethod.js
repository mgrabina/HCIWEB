$(document).ready(function(){
   //código a ejecutar cuando el DOM está listo para recibir instrucciones.


$('#continueButton').click(validate);

setPassengersInfo("adult", adults);
setPassengersInfo("child", children);
setPassengersInfo("infant", infants);


loadCitiesAndCountries();

});

//
//
//
//
var adults = sessionStorage.getItem("adults");
var children = sessionStorage.getItem("children");
var infants = sessionStorage.getItem("infants");






function setPassengersInfo(passType, number){




  for(var i=1; i<=number; i++){

      
      passenger = passType + i;

      var info = "<tr>" +
            "<th scope=\"row\">"+ passType +" "+ i +"</th>" +
             "<td><input id=\"name"+ passenger +"\" class=\"form-control\" type=\"text\" name=\"name\" placeholder=\"Name\" required autofocus></td>" +
            "<td><input id=\"birthDate"+ passenger +"\" class=\"form-control\" type=\"date\" name=\"birthDate\" required></td>" +
            "<td>" + 
                  
              "<div class=\"radio\">" +
              "<label>" +
                "<input type=\"radio\" name=\"optionsRadios"+ passenger +"\" id=\"optionRadioDni"+ passenger +"\" value=\"option1\" checked>DNI"+
              "</label>"+
            
              "<label>"+
              "<input type=\"radio\" name=\"optionsRadios"+ passenger +"\" id=\"optionsRadioPassport"+ passenger +"\" value=\"option2\">Passport"+
              "</label>"+
            "</div>"+

            "</td>" +
            "<td><input id=\"passengerId"+ passenger +"\" class=\"form-control\" type=\"text\" name=\"identification\" placeholder=\"Number\" required></td>" +
            
            "</tr>"


      $("#passengersInfo").append(info);
  }


}


function validate(){

 //
 //
 //
 //VALIDAR
 //
 //
 //

  saveInfoPass("adult", adults);
  saveInfoPass("child", children);
  saveInfoPass("infant", infants);
  saveInfo();


  document.getElementById("continueButton").href = "confirmation.html";


  return;
}




function saveInfoPass(passType, number){


  for(var i=1; i<=number; i++){

      passenger = passType + i;

      var name = document.getElementById("name"+passenger).value;
      var birthDate = document.getElementById("birthDate"+passenger).value;  //yyyy-mm-dd
      var isDni = document.getElementById("optionRadioDni"+passenger).checked; // true or false
      var passengerId = document.getElementById("passengerId"+passenger).value;

     
     sessionStorage.setItem("name"+passenger, name); 
     sessionStorage.setItem("birthDate"+passenger, birthDate); 
     sessionStorage.setItem("isDni"+passenger, isDni); 
     sessionStorage.setItem("passengerId"+passenger, passengerId); 
     
      
  }

}

function saveInfo(){
  var cardNumber =  document.getElementById("cardNumber").value;
  var expirationDate =  document.getElementById("expirationDate").value;
  var paymentName =  document.getElementById("paymentName").value;
  var securityCode =  document.getElementById("securityCode").value;
  var installments =  document.getElementById("installments").value;

  sessionStorage.setItem("cardNumber", cardNumber); 
  sessionStorage.setItem("expirationDate", expirationDate); 
  sessionStorage.setItem("paymentName", paymentName); 
  sessionStorage.setItem("securityCode", securityCode); 
  sessionStorage.setItem("installments", installments); 





  var country =  document.getElementById("country").value;
  var indexCountry = availableCountries.indexOf(country);
  var countryId = availableCountriesId[indexCountry];

  var city =  document.getElementById("city").value;
  var indexCity = availableCities.indexOf(city);
  var cityId = availableCitiesId[indexCity];

 var zipCode =  document.getElementById("zipCode").value;
 var address =  document.getElementById("address").value;
 var state =  document.getElementById("state").value;
 var floor =  document.getElementById("floor").value;
 var apartment =  document.getElementById("apartment").value;

 sessionStorage.setItem("country", country); 
 sessionStorage.setItem("countryId", countryId); 
 sessionStorage.setItem("city", city); 
 sessionStorage.setItem("cityId", cityId); 
 sessionStorage.setItem("zipCode", zipCode); 
 sessionStorage.setItem("address", address); 
 sessionStorage.setItem("state", state); 
 sessionStorage.setItem("floor", floor); 
 sessionStorage.setItem("apartment", apartment); 




var email=  document.getElementById("email").value;
var phoneNumber =  document.getElementById("phoneNumber").value;

 
 sessionStorage.setItem("email", email); 
 sessionStorage.setItem("phoneNumber", phoneNumber); 


}




//
//

var availableCities = [];
var availableCitiesId = [];
var availableCountries = [];
var availableCountriesId = [];



function loadCitiesAndCountries(){


    $.getJSON("http://hci.it.itba.edu.ar/v1/api/geo.groovy?method=getcities&page_size=100", function(data){

      var size = data.total;
      
      for( var i = 0; i<size; i++){
        availableCities.push(data.cities[i].name);
        availableCitiesId.push(data.cities[i].id);
      }


      $( "#city" ).autocomplete({
      source: availableCities
    });


}); 



$.getJSON("http://hci.it.itba.edu.ar/v1/api/geo.groovy?method=getcountries", function(data){

      var size = data.total;
     
      for( var i = 0; i<size; i++){


        availableCountries.push(data.countries[i].name);

        availableCountriesId.push(data.countries[i].id);

        

      }


      $( "#country" ).autocomplete({
      source: availableCountries
    });


}); 









}
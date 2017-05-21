$(document).ready(function(){
   //código a ejecutar cuando el DOM está listo para recibir instrucciones.
$('#continueButton').click(validate);

setPassengersInfo("adult", adults);
setPassengersInfo("child", children);
setPassengersInfo("infant", infants);
$('#cuotas').click(loadcuotas);

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
             "<td><input maxlength='80' id=\"name"+ passenger +"\" class=\"form-control\" type=\"text\" name=\"name\" placeholder=\"Name\" required autofocus></td>" +
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
            "<td><input maxlength='80' id=\"passengerId"+ passenger +"\" class=\"form-control\" type=\"text\" name=\"identification\" placeholder=\"Number\" required></td>" +

            "</tr>"


      $("#passengersInfo").append(info);
  }


}


function validate(){
  var errores="";
  var date=new Date();
  var d=date.getUTCDate();
  var m=date.getMonth()+1;
  var y=date.getFullYear();
  var age;
  var name;
  var idp;
  var monthage;
  var yearage;
  var dayage;
  for(i=1;i<=adults && errores=="";i++){
  name=document.getElementById("nameadult"+i+"").value;
  idp=document.getElementById("passengerIdadult"+i+"").value;
  if(name==""||idp=="")
    errores+="Please complete all the fields."+"<br/>";
  }

  for(i=1;i<=children && errores=="";i++){
  name=document.getElementById("namechild"+i+"").value;
  idp=document.getElementById("passengerIdchild"+i+"").value;
  if(name==""||idp=="")
    errores+="Please complete all the fields."+"<br/>";
  }

  for(i=1;i<=infants && errores=="";i++){
  name=document.getElementById("nameinfant"+i+"").value;
  idp=document.getElementById("passengerIdinfant"+i+"").value;
  if(name==""||idp=="")
    errores+="Please complete all the fields."+"<br/>";
  }

  for(i=1;i<=adults;i++){
    age=document.getElementById("birthDateadult"+i+"").value;
    yearage=age.substring(0,4);
    monthage=age.substring(5,7);
    dayage=age.substring(8,10)
    if((y-yearage)<11)
      errores+="Please check the adult number "+i+" age."+"<br/>";
    if(y-yearage==11){
      if(m<monthage)
        errores+="Please check the adult number "+i+" age."+"<br/>";
      else
        if(m==monthage)
          if(d<dayage)
            errores+="Please check the adult number "+i+" age."+"<br/>";
    }

  }
  for(i=1;i<=children;i++){

    age=document.getElementById("birthDatechild"+i+"").value;
    yearage=age.substring(0,4);
    monthage=age.substring(5,7);
    dayage=age.substring(8,10)
    if((y-yearage)>11)
      errores+="Please check the child number "+i+" age."+"<br/>";
    if(y-yearage==11){
      if(m>monthage)
        errores+="Please check the child number "+i+" age."+"<br/>";
      else
        if(m==monthage)
          if(d>dayage)
            errores+="Please check the child number "+i+" age."+"<br/>";
    }
    if((y-yearage)<2)
      errores+="Please check the child number "+i+" age."+"<br/>";
    if(y-yearage==2){
      if(m<monthage)
        errores+="Please check the child number "+i+" age."+"<br/>";
      else
        if(m==monthage)
          if(d<dayage)
            errores+="Please check the child number "+i+" age."+"<br/>";
    }
  }
  for(i=1;i<=infants;i++){
    age=document.getElementById("birthDateinfant"+i+"").value;
    yearage=age.substring(0,4);
    monthage=age.substring(5,7);
    dayage=age.substring(8,10)
    if((y-yearage)>2)
      errores+="Please check the infant number "+i+" age."+"<br/>";
    if(y-yearage==2){
      if(m>monthage)
        errores+="Please check the infant number "+i+" age."+"<br/>";
      else
        if(m==monthage)
          if(d>dayage)
            errores+="Please check the infant number "+i+" age."+"<br/>";
    }
    if((y-yearage)<0)
      errores+="Please check the infant number "+i+" age."+"<br/>";
    if(y-yearage==0){
      if(m<monthage)
        errores+="Please check the infant number "+i+" age."+"<br/>";
      else
        if(m==monthage)
          if(d<dayage)
            errores+="Please check the infant number "+i+" age."+"<br/>";
    }


  }



var monthnow=date.getMonth()+2;
var yearnow=date.getFullYear();

var card=document.getElementById("cardNumber").value;
var exp_date=document.getElementById("expirationDate").value;
var sec_code=document.getElementById("securityCode").value;
var namep=document.getElementById("paymentName").value;
var country=document.getElementById("country").value;
var city=document.getElementById("city").value;
var state=document.getElementById("state").value;
var zip=document.getElementById("zipCode").value;
var address=document.getElementById("address").value;
var email=document.getElementById("email").value;
var phoneNumber=document.getElementById("phoneNumber").value;
document.getElementById('errores').innerHTML = '';
if(card==""|| exp_date==""|| sec_code=="" || namep=="" || country==""|| city==""|| state==""|| zip==""|| address==""|| email==""|| phoneNumber==""){
   if(errores!="Please complete all the fields."+"<br/>")
      errores+="Please complete all the fields."+"<br/>";
   document.getElementById('errores').innerHTML+='<div class="alert alert-danger" role="alert">'+errores+'</div>';
}else{
var exp_dateY=exp_date.toString().substring(0,4);
var exp_dateM=exp_date.toString().substring(5,7);
if(yearnow>exp_dateY){
  errores+="Invalid expiration card date"+"<br/>";
}

if(yearnow==exp_dateY && monthnow>exp_dateM)
  errores+="Invalid expiration card date"+"<br/>";
exp_dateY=exp_dateY%2000;

if(errores==""){
var link="http://hci.it.itba.edu.ar/v1/api/booking.groovy?method=validatecreditcard&number="+card+"&exp_date="+exp_dateM+exp_dateY+"&sec_code="+sec_code+"";
$.getJSON(link,function(data){
  try{
    switch(data.error.code){
      case 106: errores+="Invalid card number"+"<br/>";
                break;
      case 107: errores+="Invalid expiration date"+"<br/>";
                break;
      case 108: errores+="Invalid security code"+"<br/>";
                break;
      default : errores+="Please try again"+"<br/>";
    }
  }catch(e){
   document.getElementById("continueButton").href = "confirmation.html";
   window.location="confirmation.html";
 }
}).done(function(){
  document.getElementById('errores').innerHTML+='<div class="alert alert-danger" role="alert">'+errores+'</div>';
});


}else{
   document.getElementById('errores').innerHTML+='<div class="alert alert-danger" role="alert">'+errores+'</div>';
}

 }//
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
  sessionStorage.setItem("cardNumber", cardNumber);
  sessionStorage.setItem("expirationDate", expirationDate);
  sessionStorage.setItem("paymentName", paymentName);
  sessionStorage.setItem("securityCode", securityCode);
  sessionStorage.setItem("installments", $("#cuotas").val());




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
var depcuotas=[];
var arrcuotas=[];
var card;
var depflight=sessionStorage.getItem("departureFlightId");
var round=sessionStorage.getItem("isRound");
var retflight=sessionStorage.getItem("returningId");
function loadcuotas(){
    card=document.getElementById("cardNumber").value;
    $.getJSON("http://hci.it.itba.edu.ar/v1/api/booking.groovy?method=getinstallments&flight_id="+depflight+"&adults="+adults+"&children="+children+"&infants="+infants+"&number="+card+"",function(data){
         try{
          var cuotas=data.installments;
          var cant=cuotas.length;
        for(var x=0;x<cant;x++){
          if ( $("#cuotas option[value='"+cuotas[x].quantity+"']").length == 0 )
            $("select").append("<option value="+cuotas[x].quantity+">"+cuotas[x].quantity+"</option>");
        }
        }catch(e){}
    });
    if(round==true){
      $.getJSON("http://hci.it.itba.edu.ar/v1/api/booking.groovy?method=getinstallments&flight_id="+retflight+"&adults="+adults+"&children="+children+"&infants="+infants+"&number="+card+"",function(data){
          try{
          var cuotas=data.installments;
          var cant=cuotas.length;
        for(var x=0;x<cant;x++){
          if ( $("#cuotas option[value='"+cuotas[x].quantity+"']").length == 0 )
            $("select option[value='"+cuotas[x].quantity+"']").remove();
        }
        }catch(e){}
    });
  
}}












var availableCities = [];
var availableCitiesid=[];
$(document).ready(function(){
   //código a ejecutar cuando el DOM está listo para recibir instrucciones.
var i = 0;
$('#noJavascript').remove();
var totalc;
var sizec=10;
var flagc=0;
if (!localStorage.cities) {
  $.getJSON("http://hci.it.itba.edu.ar/v1/api/geo.groovy?method=getcities&page_size="+sizec+"", function(data){

        totalc = data.total;
        if(totalc<sizec){
          for(var x=0; x<size; x++){
            availableCities.push(data.cities[x].name);
            availableCitiesid.push(data.cities[x].id);
            i++;
          }
          localStorage.setItem("cities", JSON.stringify(data));
        }else{
          flagc=1;
        }  
  }).done(function(){
    if(flagc==1){
       $.getJSON("http://hci.it.itba.edu.ar/v1/api/geo.groovy?method=getcities&page_size="+totalc+"", function(data){
          totalc = data.total;
          for(var x=0; x<totalc; x++){
            availableCities.push(data.cities[x].name);
            availableCitiesid.push(data.cities[x].id);
          }
        localStorage.setItem("cities", JSON.stringify(data));

       }); 
    }
  }); 
  var total;
  var sizea=10;
  var flaga=0;
 $.getJSON ("http://hci.it.itba.edu.ar/v1/api/geo.groovy?method=getairports&page_size="+sizea+"",function(data){
    total=data.total;
    if(total<sizea){
      for(var x=0;x<sizea;x++){
        availableCities.push(data.airports[x].description);
        availableCitiesid.push(data.airports[x].city.id);
        i++;
      } 
      localStorage.setItem("airport", JSON.stringify(data));
     }else {
      flaga=1;
     }
}).done(function(){
    if(flaga==1){
      $.getJSON ("http://hci.it.itba.edu.ar/v1/api/geo.groovy?method=getairports&page_size="+total+"",function(data){
        total=data.total;
        for(var x=0;x<total;x++){
          availableCities.push(data.airports[x].description);
          availableCitiesid.push(data.airports[x].city.id);
          i++;
        } 
        localStorage.setItem("airport", JSON.stringify(data));
      });
    } 
});}
else{
  var data = JSON.parse(localStorage.getItem("cities"));
  var data2 = JSON.parse(localStorage.getItem("airport"));

  var size = data.total;
  var i = 0;
  for( i = 0; i<size; i++){
    availableCities.push(data.cities[i].name);
    availableCitiesid.push(data.cities[i].id);
  }
  size = data2.total;
  for(var x=0;x<size;x++){
        availableCities.push(data2.airports[x].description);
        availableCitiesid.push(data2.airports[x].city.id);
  }      
}
  checkCities(availableCities);
  datePicker();



$("#searchButton").click(validate);

  document.getElementById("roundTrip").onchange = function(){
    if(document.getElementById("roundTrip").checked){
      document.getElementById("dateTo").disabled=false;
    }else{
      document.getElementById("dateTo").disabled=true;
    }


};
});


function validate(){
  document.getElementById('errores').innerHTML = '';
  var errores='';
  var ret=true;
	var from = document.getElementById("from").value;
  var to = document.getElementById("to").value;
  var dateFrom = Date.parse(document.getElementById("dateFrom").value); // Format:  yyyy-mm-dd
  var dateTo = Date.parse(document.getElementById("dateTo").value);
  var time= new Date();
  var roundTrip = $("#roundTrip").is(":checked");  // false or true
  if(from=="" || to=="" || isNaN(dateFrom) ) {
   errores= errores+'Please complete all the fields.'+ "<br/>";
    ret=false;
  }
  if(roundTrip==true && isNaN(dateTo)){
    errores= errores+'Please complete the returning date.'+ "<br/>";
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

   
    if(document.getElementById("roundTrip").checked){      
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

    
    var adults = document.getElementById("adults").value;
    if(adults=="")
      adults=0;
    sessionStorage.setItem("adults", adults);
    var children = document.getElementById("children").value;
    if(children=="")
      children=0;
    sessionStorage.setItem("children", children);
    var infants = document.getElementById("infants").value;
    if(infants=="")
      infants=0;
    sessionStorage.setItem("infants", infants);
    if(adults==0 && children==0 && infants == 0){
      errores=errores +'Please select passengers. <br/>';
      ret=false;
    }
    if(adults>6||children>6||infants>6){
      errores=errores +'The passenger limit per category is 6.<br/>';
      ret=false;
    }
   }
  var idfrom;
  var idto;
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
    

  if(document.getElementById("roundTrip").checked){
    var info = "&from="+idfrom+"&to="+idto+"&dateFrom="+document.getElementById("dateFrom").value+"&round=true&dateTo="+document.getElementById("dateTo").value+"&adults="+adults+"&child="+children+"&infants="+infants+""; 
    sessionStorage.setItem("isRound", "true");
  }else{
      var info="&from="+idfrom+"&to="+idto+"&dateFrom="+document.getElementById("dateFrom").value+"&round=false&dateTo=''&adults="+adults+"&child="+children+"&infants="+infants+"";     
     sessionStorage.setItem("isRound", "false"); 
  
      }
    document.getElementById("searchButton").href="flightsList.html";
    sessionStorage.setItem("infoBusqueda", info); 


  }
}


function checkCities(){
  $( function() {
    

    $( "#from" ).autocomplete({
      source: availableCities
    });

     $( "#to" ).autocomplete({
      source: availableCities
    });

  } );



}


function datePicker() {

	$( function() {
    $( "#dateFrom" ).datepicker();
  	} );

	$( function() {
    $( "#dateTo" ).datepicker();
  	} );
}
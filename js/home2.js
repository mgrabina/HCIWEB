
var availableCities = [];
var availableCitiesid=[];
$(document).ready(function(){
   //código a ejecutar cuando el DOM está listo para recibir instrucciones.
  
$('#noJavascript').remove();
if (!localStorage.cities) {
  $.getJSON("http://hci.it.itba.edu.ar/v1/api/geo.groovy?method=getcities&page_size=100", function(data){

        var size = data.total;
        var i = 0;
        for( i = 0; i<size; i++){
          availableCities.push(data.cities[i].name);
          availableCitiesid.push(data.cities[i].id);
        }
        localStorage.setItem("cities", JSON.stringify(data));
  }); 
}else{
  var data = JSON.parse(localStorage.getItem("cities"));

  var size = data.total;
        var i = 0;
        for( i = 0; i<size; i++){
          availableCities.push(data.cities[i].name);
          availableCitiesid.push(data.cities[i].id);
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
    if(from==to)
      errores=errores +'Same city.<br/>';
    
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
    sessionStorage.setItem("adults", adults);
    var children = document.getElementById("children").value;
    sessionStorage.setItem("children", children);
    var infants = document.getElementById("infants").value;
    sessionStorage.setItem("infants", infants);

    if(adults==0 && children==0 && infants == 0){
      errores=errores +'Please select passengers. <br/>';
      ret=false;
    }
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
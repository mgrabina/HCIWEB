
var availableCities = [];
$(document).ready(function(){
   //código a ejecutar cuando el DOM está listo para recibir instrucciones.
  


$.getJSON("http://hci.it.itba.edu.ar/v1/api/geo.groovy?method=getcities&page_size=100", function(data){

      var size = data.total;
      var i = 0;
      for( i = 0; i<size; i++){
        availableCities.push(data.cities[i].name);
      }

}); 
	
  checkCities(availableCities);
  datePicker();



var a=$("#searchButton").click(validate);
if(a==false){
  document.getElementById("searchButton").href="#";
}
else{
 document.getElementById("searchButton").href="flightsList.html"; 
}

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
	//alert("is working fine");
	var from = document.getElementById("from").value;
  var to = document.getElementById("to").value;
  if(from=="" || to==""){
   errores= errores+'Complete los campos'+ "\n";
    ret=false;
  }
  if(ret!=false){
    if(from==to)
      errores=errores +'Misma ciudad\n';
    
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
      errores=errores +'No es una ciudad \n';
      ret=false;
    }

    var dateFrom = Date.parse(document.getElementById("dateFrom").value); // Format:  yyyy-mm-dd
    var dateTo = Date.parse(document.getElementById("dateTo").value);
    var time= new Date();
    if(document.getElementById("roundTrip").checked){      
      if(dateFrom<=time || dateTo<=time || dateTo<=dateFrom){
        errores=errores +'Dia invalido \n';
        ret=false;
      }
    }else{
        if(dateFrom<=time){
          errores=errores +'Dia invalido \n';
          ret=false;
        }  
      }

    if(dateFrom==dateTo){
      errores=errores +'Misma fecha \n';
      ret=false;
     }

    var roundTrip = $("#roundTrip").is(":checked");  // false or true
    var adults = document.getElementById("adults").value;
    var childs = document.getElementById("childs").value;
    var infants = document.getElementById("infants").value;

    if(adults==0 && childs==0 && infants == 0){
      errores=errores +'No hay pasajeros \n';
      ret=false;
    }
   } 
  document.getElementById('errores').innerHTML+='<div class="alert alert-danger" role="alert">'+errores+'</div>';
  return ret;
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
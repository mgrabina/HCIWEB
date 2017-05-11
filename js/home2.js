
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



<<<<<<< HEAD
var a=$("#searchButton").click(validate);
if(a==false){
  document.getElementById("searchButton").href="#";
}
else{
 document.getElementById("searchButton").href="flightsList.html"; 
}

=======
$("#searchButton").click(validate);

  document.getElementById("roundTrip").onchange = function(){
    if(document.getElementById("roundTrip").checked){
      document.getElementById("dateTo").removeAttr('disabled');
    }else{
       document.getElementById("dateTo").attr({
                    'disabled': 'disabled'
                });
    }
  };
>>>>>>> origin/master

});



function validate(){


	//alert("is working fine");
	var from = document.getElementById("from").value;
  var to = document.getElementById("to").value;
  
  if(from=="" || to==""){
    alert("complete all the fields");
    ret=false;
  }
  
  if(from==to)
    alert("same city");
  var ret=true;
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
    alert("not a city");
    ret=false;
  }

  var dateFrom = document.getElementById("dateFrom").value; // Format:  yyyy-mm-dd
  var dateTo = document.getElementById("dateTo").value;
  var time= new Date();
  if(time<dateFrom || time<dateTo || dateTo<dateFrom){
    alert("invalid day");
    ret=false;
  }

  if(dateFrom==dateTo){
    alert("same date");
    ret=false;
   }

  var roundTrip = $("#roundTrip").is(":checked");  // false or true
  var adults = document.getElementById("adults").value;
  var childs = document.getElementById("childs").value;
  var infants = document.getElementById("infants").value;

  if(adults==0 && childs==0 && infants == 0){
    alert("no passengers");  
    ret=false;
  }
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
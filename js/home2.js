
$(document).ready(function(){
   //código a ejecutar cuando el DOM está listo para recibir instrucciones.

	
  checkCities();
  datePicker();

 


$("#searchButton").click(validate);



});



function validate(){



  





	//alert("is working fine");
	var from = document.getElementById("from").value;
	var to = document.getElementById("to").value;
	var dateFrom = document.getElementById("dateFrom").value; // Format:  yyyy-mm-dd
	var dateTo = document.getElementById("dateTo").value;
	var roundTrip = $("#roundTrip").is(":checked");  // false or true
	var adults = document.getElementById("adults").value;
	var childs = document.getElementById("childs").value;
	var infants = document.getElementById("infants").value;

	//alert(dateFrom);


	


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


function datePicker() {

	$( function() {
    $( "#dateFrom" ).datepicker();
  	} );

	$( function() {
    $( "#dateTo" ).datepicker();
  	} );
}
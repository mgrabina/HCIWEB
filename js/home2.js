
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
  if(from=="" || to=="")
    alert("complete all the fields");
  if(from==to){
    alert("same city");
  }
  $.getJSON("http://hci.it.itba.edu.ar/v1/api/geo.groovy?method=getcities&page_size=100",function(data){

      var long = data.total;
      var flag= new Boolean(false);
      var flag2=new Boolean(false);
      for(var i=0;i<long && (flag==false || flag2==false) ;i++){
        if(flag == false && from==data.cities[i].name){
          flag=true;
        }
        if(flag2 == false && to==data.cities[i].name){
          flag2=true;
        }
      }
      if(flag2==false || flag== false){
        alert("not a city");
      }
  });    

  var dateFrom = document.getElementById("dateFrom").value; // Format:  yyyy-mm-dd
  var dateTo = document.getElementById("dateTo").value;
  var time= new Date();
  if(time<dateFrom || time<dateTo || dateTo<dateFrom)
    alert("invalid day");

  if(dateFrom==dateTo){
    alert("same date");
   }

  var roundTrip = $("#roundTrip").is(":checked");  // false or true
  var adults = document.getElementById("adults").value;
  var childs = document.getElementById("childs").value;
  var infants = document.getElementById("infants").value;

  if(adults==0 && childs==0 && infants == 0)
    alert("no passengers");


	

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
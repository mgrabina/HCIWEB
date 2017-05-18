$(document).ready(function(){
   	$('#btn').click(function(){
   		//Validar
   		if(validate()){
   			var id, flightNumber, friendliness, yes_recommed, mileage_program, comfort, comments, food, quality_price, punctuality;
   			id = $("select").val();
			flightNumber = document.getElementById('flightNumber').value;
			friendliness = document.getElementById('friendliness').value;
			mileage_program = document.getElementById('mileage_program').value;
			comfort = document.getElementById('comfort').value;
			try{
				comments = document.getElementById('comments').value;	
			}catch(err){
				comment = '';
			}			
			food = document.getElementById('food').value;
			quality_price = document.getElementById('quality_price').value;
			punctuality = document.getElementById('punctuality').value;
			yes_recommed = document.getElementById('checkbox').checked;

   			var url ="http://hci.it.itba.edu.ar/v1/api/review.groovy?method=reviewairline2&review=%"+
			"7b%22flight%22:%7b%22airline%22:%7b%22id%22:%22"+id+"%22%7d,%22number%22:"+flightNumber+"%7d,"+
			"%22rating%22:%7b%22friendliness%22:"+friendliness+",%22food%22:"+food+",%22punctuality%22:"+punctuality+",%22mile"+
			"age_program%22:"+mileage_program+",%22comfort%22:"+comfort+",%22quality_price%22:"+quality_price+"%7d,%22yes_recommend%22"+
			":"+yes_recommed+",%22comments%22:%22"+comments+"%22%7d";
   			$.getJSON(url,function(data){
  				if(data.review){
  					document.getElementById('err').innerHTML='<div class="alert alert-success" role="alert">Review Sended <a href="registerReview.html">Send another?</a></div>';
  				}else{
  					document.getElementById('err').innerHTML='<div class="alert alert-success" role="alert">Sending the review return an error.</div>';
  				}
  			});
   		}
   	});
});

function validate(){
	document.getElementById('err').innerHTML = '';
	if(document.getElementById('friendliness').value < 1 || document.getElementById('friendliness').value > 10
	||	document.getElementById('quality_price').value < 1 || document.getElementById('quality_price').value > 10
	||	document.getElementById('punctuality').value < 1 || document.getElementById('punctuality').value > 10
	||	document.getElementById('comfort').value < 1 || document.getElementById('comfort').value > 10
	||	document.getElementById('mileage_program').value < 1 || document.getElementById('mileage_program').value > 10
	||	document.getElementById('food').value < 1 || document.getElementById('food').value > 10){

		document.getElementById('err').innerHTML+='<div class="alert alert-danger" role="alert">Please enter values between 1 and 10</div>';
		return false;
	}
	if(document.getElementById('flightNumber').value>9999 || document.getElementById('flightNumber').value<0000  ){
		document.getElementById('err').innerHTML+='<div class="alert alert-success" role="alert">Please enter a valid flight number</div>';				
		return false;
	}
	return true;
}
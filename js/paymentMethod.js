$(document).ready(function(){
	$('#boton').click(validate);
});

}
function validate(){
	$('errores').innerHTML='';
	var errores;
	//Los errores se ponen en el div errores con estilo Bootstrap
	//SE VAN ANCLANDO A LA VARIABLE ERRORES;
	//Ojo que la mayoria valida HTML, ya que no deja ingresar cosas que no correspondan

	document.getElementById('errores').innerHTML+='<div class="alert alert-danger" role="alert">'+errores+'</div>';
	return;
}
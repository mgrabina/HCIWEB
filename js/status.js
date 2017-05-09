$(document).onReady({
	$.getJSON( "http://hci.it.itba.edu.ar/v1/api/misc.groovy?method=getairlines", function( data ) {	
    var datos = JSON.parse(data);
    var select = document.getElementTagName("select");
    for (let value of datos) {
 		select.append('  <option value="'+ value.name+'">'+ value.name+'</option>')
	}
});
});
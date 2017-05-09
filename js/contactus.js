$(document).ready(function(){
	document.getElementsByTagName('button').onclick = function(){
		window.open('mailto:martograbina@gmail.com?subject='+document.getElementsById('name').value+'&body=' + document.getElementsById('email') + ': ' + document.getElementsById('texto'));
	};
});
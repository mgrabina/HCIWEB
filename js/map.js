      function initMap() {
        var cities = JSON.parse(localStorage.getItem("cities")).cities;
        var size = cities.length ;
        var locations = [];
        var centerMap = {lat: -34.603281,lng: -58.367834};
        var markers = []; 
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 2,
          center: centerMap
        });
        for(var i=0;i<size;i++){
          locations[i] = {lat: cities[i].latitude, lng: cities[i].longitude};
          markers[i] = new google.maps.Marker({
          position: locations[i],
          map: map
        });
        }
      }

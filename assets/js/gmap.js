// This example adds a user-editable rectangle to the map.
// When the user changes the bounds of the rectangle,
// an info window pops up displaying the new bounds.

var rectangle;
var infoWindow;
var map;
var geocoder;
var markers;
var markerCluster;
var players;

function setCountryMarkers(data) {
  markers = [];
  players = data;
  for (player of players){
    getCountry(player.nationality, player.name);
  }
}

function checkCluster() {
  if (markers.length == players.length){
    markerCluster = new MarkerClusterer(map, markers,
            {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
  }
}

function getCountry(country, player_name) {
    geocoder.geocode( { 'address': country }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          var finalLatLng = results[0].geometry.location;
          // if (markers.length != 0) {
          //   for (existingMarker of markers) {
          //     var pos = existingMarker.getPosition();
          //
          //     //if a marker already exists in the same position as this marker
          //     if (latlng.equals(pos)) {
          //       //update the position of the coincident marker by applying a small multipler to its coordinates
          //       var newLat = latlng.lat() + (Math.random() -.5) / 1500;// * (Math.random() * (max - min) + min);
          //       var newLng = latlng.lng() + (Math.random() -.5) / 1500;// * (Math.random() * (max - min) + min);
          //       finalLatLng = new google.maps.LatLng(newLat,newLng);
          //     }
          //   }
          // }
          var marker = new google.maps.Marker({
            map: map,
            label: player_name,
            position: finalLatLng
          });
          markers.push(marker);
          checkCluster();
        } else if (status == google.maps.GeocoderStatus.OVER_QUERY_LIMIT) {
            setTimeout(function () {
                //Recursively calling spotPosition method for lost addresses
                getCountry(country, player_name);
            }, 1000);
        }
    });
}

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
  	center: new google.maps.LatLng(33.8547, 35.8623),
  	zoom: 1,
  	minZoom: 1
  });

  geocoder = new google.maps.Geocoder();
}

function getMap() {
  return map;
}

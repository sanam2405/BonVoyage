var centreLat = 22.5372339;
var centreLong = 88.3317497;
var map;
var marker;
const locationMap = new Map();


fetch('./assets/js/zoo.json')
    .then(response => response.json())
    .then(data => {

        // Iterate through the data from zoo.json
        data.forEach(item => {
            const name = item.description.name;
            const latitude = item.location.latitude;
            const longitude = item.location.longitude;

            // Add the name and location to the map
            locationMap.set(name, { latitude, longitude });
        });
    })
    .catch(error => {
        console.error('Error:', error);
    });

//   console.log(locationMap);

function initMap() {
    // Create a new map instance
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: centreLat, lng: centreLong }, // Set the initial map center
        zoom: 18.25,// Set the initial zoom level
        disableDefaultUI: true,
    });
}


// Function to add a marker to the map
function addMarker(latitude, longitude, title) {
    // Check if a marker already exists, remove it first
    if (marker) {
        marker.setMap(null);
    }

    // Create a new marker and add it to the map
    marker = new google.maps.Marker({
        position: { lat: latitude, lng: longitude },
        map: map,
        title: title
    });

    marker.setMap(locationMap);
}


function removeMarker() {

    if (marker) {
        marker.setMap(null);
    }
}


initMap();
// addMarker();
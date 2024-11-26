var map = L.map('map').setView([56.8796, 24.6032], 7); // Centrs uz Latviju

// Pievieno OpenStreetMap 
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Funkcija koordinātu pārvēršanai, izmantojot functions.js
function convertCoordinates(coords) {
    var latLng = LKS92WGS84.convertXYToLatLon([coords[0], coords[1]]);
    return [latLng[1], latLng[0]]; // Leaflet izmanto [lng, lat]
}

var customIcon = L.icon({
    iconUrl: 'custom__map__pin__location__pinned__gps__marker-512 .png', 
    iconSize: [25, 41], 
    iconAnchor: [12, 41], 
    popupAnchor: [1, -34] 
});

// Ielādē un parsē JSON datus
fetch('geomap.json')
    .then(response => response.json())
    .then(data => {
        data.features.forEach(feature => {
            var coordinates = convertCoordinates(feature.geometry.coordinates);
            var properties = feature.properties;
            var marker = L.marker([coordinates[1], coordinates[0]], { icon: customIcon }).addTo(map); // Izmanto pielāgotu ikonu
            marker.bindPopup(`<b>${properties.PLACENAME}</b><br>${properties.PLACESUBTY}`);
        });
    })
    .catch(error => console.error('Kļūda ielādējot JSON datus:', error));

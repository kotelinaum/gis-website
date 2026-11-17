// Place where the map starts: [latitude, longitude]
const place = [41.996092043617345, 21.42432935914003];

// Create the map inside the <div id="map">, zoomed to level 16
const map = L.map('map').setView(place, 16);

// Esri street map tiles (the same style as in your screenshot)
L.tileLayer(
    'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
    { attribution: 'Esri | TomTom | Garmin | USGS' }
).addTo(map);

// Orange dot on the location
L.circleMarker(place, {
    radius: 8,
    color: '#e8731a',
    fillColor: '#e8731a',
    fillOpacity: 1
}).addTo(map);

// Manhattan
var coords = [40.739940, -73.988801];

var world = VIZI.world('world', {
  skybox: false,
  postProcessing: false
}).setView(coords);

// Add controls
VIZI.Controls.orbit().addTo(world);

// CartoDB basemap
VIZI.imageTileLayer('http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
}).addTo(world);

// Buildings from Mapzen


VIZI.topoJSONTileLayer('https://vector.mapzen.com/osm/buildings/{z}/{x}/{y}.topojson?api_key=vector-tiles-NT5Emiw', {
  interactive: false,
  style: function (feature) {
    var height;

    if (feature.properties.height) {
      height = feature.properties.height;
    } else {
      height = 10 + Math.random() * 10;
    }

    return {
      height: height
    };
  },
  filter: function (feature) {
    // Don't show points
    return feature.geometry.type !== 'Point';
  },
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://whosonfirst.mapzen.com#License">Who\'s On First</a>.'
}).addTo(world);



$("#Paris").click(function () {

  world._controls[0].flyToLatLon(new VIZI.latLon(48.866002, 2.326264), 10)
});
$("#Singapore").click(function () {
  world._controls[0].flyToLatLon(new VIZI.latLon(1.313738, 103.892207), 10)
});
$("#Manhattan").click(function () {
  world._controls[0].flyToLatLon(new VIZI.latLon(40.739940, -73.988801), 10)
});
$("#Freeze").click(function () {
  alert("Handler for Freeze called.");
});
$("#Crash").click(function () {
  alert("Handler for Crash called.");
});

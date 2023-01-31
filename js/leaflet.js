const map = L.map('theMap').setView([51.505, -0.09], 3);

const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


const popup = L.popup();

function onMapClick(e) {
	popup
		.setLatLng(e.latlng)
		.setContent(`Your content is here.`)//You clicked the map at ${e.latlng.toString()}
		.openOn(map);
		makeDraggable(popup);//from https://stackoverflow.com/questions/58059686/draggable-leaflet-popup
	updateGravityForm(e.latlng)		
	console.log(e.lat)
}

map.on('click', onMapClick);

function updateGravityForm(latLong){
	const latField = document.querySelector('#input_1_7');
	const longField = document.querySelector('#input_1_8');
	latField.value = latLong;
	longField.value = latLong;
}

function makeDraggable(popup){
      var pos = map.latLngToLayerPoint(popup.getLatLng());
      L.DomUtil.setPosition(popup._wrapper.parentNode, pos);
      var draggable = new L.Draggable(popup._container, popup._wrapper);
      draggable.enable();
      
      draggable.on('dragend', function() {
        var pos = map.layerPointToLatLng(this._newPos);
        popup.setLatLng(pos);
        updateGravityForm(pos)		
      });
    }
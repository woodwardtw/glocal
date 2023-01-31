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
	updateGravityForm(e.latlng)		
}

map.on('click', onMapClick);

function updateGravityForm(latLong){
	const latField = document.querySelector('#input_1_7');
	const longField = document.querySelector('#input_1_8');
	latField.value = latLong;
	longField.value = latLong;
}
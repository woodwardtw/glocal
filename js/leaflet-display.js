console.log('leaflet display');
const map = L.map('displayMap').setView([32.825512, -30.535592], 2.6);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1Ijoid29vZHdhcmR0dyIsImEiOiJjanNhaTVheGgwYTB4NDRwb25qN3lrbjkzIn0.Vi6Vk1OENLLYV1lWVNYSTw'
}).addTo(map);


const wpJson = document.querySelector('link[rel="https://api.w.org/"]').href + 'wp/v2/posts?per_page=99&_embed';
//console.log(wpJson);

fetch(wpJson).then(response => response.json()).then(data => markerMaker(data));



function markerMaker(data){
    var markers = L.markerClusterGroup({
      spiderfyOnMaxZoom: true,
      showCoverageOnHover: true,
      zoomToBoundsOnClick: true,
      maxClusterRadius: 40,
    });
    data.forEach((item, index) => {
    	if(item.lat_long){
    		  const title = item.title.rendered;  
		      const latLng = item.lat_long[0].split(', '); 
		      
		      const lat = latLng[0];
		      const long = latLng[1];
		      const marker = L.marker([lat, long]).addTo(map);
		      let imgHtml = '';
		      let detailHtml = '';
		      if(item._embedded["wp:featuredmedia"]){
		        const imgUrl = item._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url;
		        imgHtml = `<img src="${imgUrl}" class="popup-img" alt="Picture of ${title}." width="250px" height="180px">`;
		      }
		      if(item.content.rendered){
		        const content = item.content.rendered;
		        const author = item._embedded.author[0].name;
		        const category = item._embedded["wp:term"][0][0].name;
		        let theme = '';
		        if(item._embedded["wp:term"][2][0] != undefined){
		        	theme = item._embedded["wp:term"][2][0].name; //item._embedded["wp:term"][1][0].name;
		        }
		        detailHtml = `<div class="map-details">
		        				<div class='map-author'>${author}</div>
		        				<div class='map-theme'>theme: ${theme}</div>
		        				<div class='map-cat'>category: ${category}</div>
		        				<div class='map-caption'>
		        					 ${content}
		        				</div>
		        			</div>`;
		      }
		      if (lat != '' && long != ''){
		      	//<h2 class="popup-name">${title}</h2> 
		        marker.bindPopup(`${imgHtml}${detailHtml}`
		        	, {
						  maxWidth: 300,
						  minWidth: 300,
						  autoPanPaddingTopLeft: 310,
						  autoPan: true,
						  maxHeight: 300,
						  draggable: true,
						}
		        	);
		      }
		      markers.addLayer(marker);

    	}
    
  });
    map.addLayer(markers);
}

//pan to center on popup from https://stackoverflow.com/questions/22538473/leaflet-center-popup-and-marker-to-the-map
map.on('popupopen', function(e) {
    var px = map.project(e.target._popup._latlng); // find the pixel location on the map where the popup anchor is
    px.y -= e.target._popup._container.clientHeight/2; // find the height of the popup container, divide by 2, subtract from the Y axis of marker location
    map.panTo(map.unproject(px),{animate: true}); // pan to new center
});


// var markers = L.markerClusterGroup();
// markers.addLayer(L.marker(getRandomLatLng(map)));
// ... Add more layers ...
// map.addLayer(markers);
console.log('leaflet display');
const map = L.map('theMap').setView([32.825512, -30.535592], 2.6);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1Ijoid29vZHdhcmR0dyIsImEiOiJjanNhaTVheGgwYTB4NDRwb25qN3lrbjkzIn0.Vi6Vk1OENLLYV1lWVNYSTw'
}).addTo(map);


const wpJson = document.querySelector('link[rel="https://api.w.org/"]').href + 'wp/v2/posts?per_page=99&_embed';
console.log(wpJson);

fetch(wpJson).then(response => response.json()).then(data => markerMaker(data));



function markerMaker(data){
    var markers = L.markerClusterGroup({
      spiderfyOnMaxZoom: true,
      showCoverageOnHover: false,
      zoomToBoundsOnClick: false,
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
		      console.log(item._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url);
		      if(item._embedded["wp:featuredmedia"]){
		        const imgUrl = item._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url;
		        imgHtml = `<img src="${imgUrl}" alt="Picture of ${title}." width="150px" height="auto">`;
		      }
		      if(item.content.rendered){
		        const content = item.content.rendered;
		        detailHtml = `<div class="details">${content}</div>`;
		      }
		      if (lat != '' && long != ''){
		        marker.bindPopup(`<h2 class="popup-name">${title}</h2> ${imgHtml}${detailHtml}`);
		      }
		      markers.addLayer(marker);

    	}
    
  });
    map.addLayer(markers);
}


// var markers = L.markerClusterGroup();
// markers.addLayer(L.marker(getRandomLatLng(map)));
// ... Add more layers ...
// map.addLayer(markers);
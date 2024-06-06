
	mapboxgl.accessToken = map_token;
    const map = new mapboxgl.Map({
        container: 'map', // container 
        style: 'mapbox://styles/mapbox/satellite-streets-v12',
        center: listing.geometry.coordinates, // starting position [lng, lat]
        zoom: 9 // starting zoom
    });

    const marker1 = new mapboxgl.Marker({ color: 'red'})
        .setLngLat(listing.geometry.coordinates)
        .setPopup( new mapboxgl.Popup({offset:25}).setHTML(`<h3>${listing.title}</h3><p>Exact Location will be provided after booking</p>`))
        .addTo(map);

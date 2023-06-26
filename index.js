
document.addEventListener('DOMContentLoaded', function () {

    var map = L.map('map', {
        center: [20, -99],
        zoom: 7,
        // maxBounds: bounds,
        maxZoom: 19,
        minZoom: 7,

        fullscreenControl: { 
            pseudoFullscreen: false
        },
    });
  
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    var tile_layer = L.tileLayer.wms('https://dev-sieg.cdmx.gob.mx/geoserver/wms?service=WMS&request=GetMap&layers=geonode%3Amicrocuencas&styles=&format=image%2Fpng&transparent=true&version=1.1.1&width=256&height=256&srs=EPSG%3A3857&bbox=-11075419.6504089,2152466.7165105646,-11036283.891926888,2191602.474992575', {
        layers: 'microcuencas',
        format: 'image/png',
        //transparent: true,
        //'opacity':0.8
    }).addTo(map);

    var wmsLayer = L.tileLayer.wms('http://ows.mundialis.de/services/service?', {
        layers: 'TOPO-OSM-WMS'
    }).addTo(map);

    var wmsLayer1 = L.tileLayer.wms('http://ows.mundialis.de/services/service?', {
        layers: 'SRTM30-Colored-Hillshade'
    }).addTo(map);

    var Places = L.tileLayer.wms('http://ows.mundialis.de/services/service?', {
        layers: 'OSM-Overlay-WMS'
    }).addTo(map);


    var capa_mp = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png'); // Capa que se unsa en el mapaminiatura
    var miniMap = new L.Control.MiniMap(capa_mp, { toggleDisplay: true }).addTo(map); // Mapa miniatura     

    
    var baseMaps = {
        "Base": tile_layer,
        "Base2": wmsLayer,
    };
    var overlayMaps = {
        "Capa2": wmsLayer1,
        "Capa3": Places,
    };

    var layerControl = L.control.layers(baseMaps, overlayMaps).addTo(map); //COntrolador de capas
    L.control.mousePosition().addTo(map); //Cordenadas en la posición del mapa
    L.control.locate().addTo(map); // Ubicación
    L.control.sideBySide(overlayMap, baseMaps).addTo(map); //Comparación de capas

    /*
    let hg = L.control.heightgraph();
    hg.addTo(map);
    hg.addData(geojson);
    L.geoJson(geojson).addTo(map);
    */
  });
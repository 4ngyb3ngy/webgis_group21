import 'ol/ol.css';
import 'ol-layerswitcher/dist/ol-layerswitcher.css';
import { Map, View, Overlay } from 'ol';
import { Tile, Image, Group, Vector } from 'ol/layer';
import { OSM, ImageWMS, XYZ, StadiaMaps } from 'ol/source';
import VectorSource from 'ol/source/Vector';
import { GeoJSON } from 'ol/format';
import { fromLonLat } from 'ol/proj';
import { ScaleLine, FullScreen, MousePosition, } from 'ol/control';
import LayerSwitcher from 'ol-layerswitcher';
import { createStringXY } from 'ol/coordinate';
import { Style, Fill, Stroke } from 'ol/style';


// OpenStreetMap base map
let osm = new Tile({
    title: "Open Street Map",
    type: "base",
    visible: true,
    source: new OSM()
});

// Average Maps
let Kosovo1A = new Image({
    title: "Average Kosovo pm2p5 2022",
    source: new ImageWMS({
        url:'https://www.gis-geoserver.polimi.it/geoserver/gisgeoserver_21/wms',
        params: { 'LAYERS': 'gisgeoserver_21:Kosovo_average_pm2p5_2022' }

    }),
    visible: false
});

let Kosovo1G = new Image({
    title: "Average Kosovo no2 2022",
    source: new ImageWMS({
        url:'https://www.gis-geoserver.polimi.it/geoserver/gisgeoserver_21/wms',
        params: { 'LAYERS': 'gisgeoserver_21:Kosovo_average_no2_2022' }

    }),
    visible: false
});

// Concentration maps
var Kosovo2A = new Image({
    title: "Concentration map pm2.5 Kosovo 2020",
    source: new ImageWMS({
        url:'https://www.gis-geoserver.polimi.it/geoserver/gisgeoserver_21/wms',
        params: { 'LAYERS': 'gisgeoserver_21:Kosovo_pm2p5_concentration_map_2020'}
    }),
    visible: false
});

var Kosovo2G = new Image({
    title: "Concentration map no2 Kosovo 2020",
    source: new ImageWMS({
        url:'https://www.gis-geoserver.polimi.it/geoserver/gisgeoserver_21/wms',
        params: { 'LAYERS': 'gisgeoserver_21:kosovo_no2_concentration_map_2020'}
    }),
    visible: false
});

var Kosovo3A = new Image({
    title: "Kosovo CAMS pm2.5 December 2022",
    source: new ImageWMS({
        url:'https://www.gis-geoserver.polimi.it/geoserver/gisgeoserver_21/wms',
        params: { 'LAYERS': 'gisgeoserver_21:Kosovo_CAMS_pm2p5_2022_12'}
    }),
    visible: false
});

var Kosovo3G = new Image({
    title: "Kosovo CAMS no2 December 2022",
    source: new ImageWMS({
        url:'https://www.gis-geoserver.polimi.it/geoserver/gisgeoserver_21/wms',
        params: { 'LAYERS': 'gisgeoserver_21:Kosovo_CAMS_no2_2022_12'}
    }),
    visible: false
});

var Kosovo4A = new Image({
    title: "Kosovo annual average difference from 2017-2021 pm2.5",
    source: new ImageWMS({
        url:'https://www.gis-geoserver.polimi.it/geoserver/gisgeoserver_21/wms',
        params: { 'LAYERS': 'gisgeoserver_21:Kosovo_pm2p5_2017-2021_AAD_map_2022'}
    }),
    visible: false
});

var Kosovo4G = new Image({
    title: "Kosovo annual average difference from 2017-2021 no2",
    source: new ImageWMS({
        url:'https://www.gis-geoserver.polimi.it/geoserver/gisgeoserver_21/wms',
        params: { 'LAYERS': 'gisgeoserver_21:Kosovo_no2_2017-2021_AAD_map_2022'}
    }),
    visible: false
});

var Kosovo5 = new Image({
    title: "Kosovo reclassiffied map 2022",
    source: new ImageWMS({
        url:'https://www.gis-geoserver.polimi.it/geoserver/gisgeoserver_21/wms',
        params: { 'LAYERS': 'gisgeoserver_21:Kosovo_LC_reclassiffied_2022'}
    }),
    visible: true
});

var Kosovo6A = new Image({
    title: "Kosovo settelment area statistics pm2.5",
    source: new ImageWMS({
        url:'https://www.gis-geoserver.polimi.it/geoserver/gisgeoserver_21/wms',
        params: { 'LAYERS': 'gisgeoserver_21:Kosovo_pm2p5_zonal_statistics_2013-2022'}
    }),
    visible: false
});

var Kosovo6G = new Image({
    title: "Kosovo settlement area statistic no2",
    source: new ImageWMS({
        url:'https://www.gis-geoserver.polimi.it/geoserver/gisgeoserver_21/wms',
        params: { 'LAYERS': 'gisgeoserver_21:kosovo_no2_zonal_statistics_2013-2022'}
    }),
    visible: false
});

var Kosovo7A = new Image({
    title: "Bivariate map pm2.5 2020",
    source: new ImageWMS({
        url:'https://www.gis-geoserver.polimi.it/geoserver/gisgeoserver_21/wms',
        params: { 'LAYERS': 'gisgeoserver_21:Kosovo_pm2p5_2020_bivariate'}
    }),
    visible: false
});

var Kosovo7G = new Image({
    title: "Bivariate map no2 2020",
    source: new ImageWMS({
        url:'https://www.gis-geoserver.polimi.it/geoserver/gisgeoserver_21/wms',
        params: { 'LAYERS': 'gisgeoserver_21:Kosovo_no2_2020_bivariate'}
    }),
    visible: false
});

let Averagemaps = new Group({
    title: 'Average maps',
    fold : 'close',
    layers : [Kosovo1A,Kosovo1G]
});

let Concentrationmaps = new Group({
    title: 'Concentration maps',
    fold : 'close',
    layers : [Kosovo2A,Kosovo2G]
});

let CAMSmaps = new Group({
    title: 'CAMS maps',
    fold: 'close',
    layers : [Kosovo3A, Kosovo3G]
}); 

let Strangemaps = new Group({
    title: 'Average difference',
    fold: 'close',
    layers : [Kosovo4A, Kosovo4G]
});

let Statisticsemaps = new Group({
    title: 'Statistics on settelment area',
    fold: 'close',
    layers : [Kosovo6A, Kosovo6G]
});

let Bivariatemaps = new Group ({
    title : 'Bivariate maps',
    fold : 'close',
    layers : [Kosovo7A, Kosovo7G]
});

// Add the layer groups code here:
let basemapLayers = new Group({
    title: 'Base Maps',
    layers: [osm]
});


// Map Initialization
let mapOrigin = fromLonLat([20.9, 42.6]);
let zoomLevel = 8.7;
let map = new Map({
    target: document.getElementById('map'),
    //layers: [basemapLayers, overlayLayers],
    layers: [],
    view: new View({
        center: mapOrigin,
        zoom: zoomLevel
    }),
    projection: 'EPSG:3857'
});

// Add the map controls here:
map.addControl(new ScaleLine());
map.addControl(new FullScreen());
map.addControl(
    new MousePosition({
        coordinateFormat: createStringXY(4),
        projection: 'EPSG:4326',
        className: 'custom-control',
        placeholder: '0.0000, 0.0000'
    })
);

// Add the LayerSwitcher control here:
var layerSwitcher = new LayerSwitcher({});
map.addControl(layerSwitcher);

// Add the Stadia Basemaps here:
var stamenWatercolor = new Tile({
    title: 'Stamen Watercolor',
    type: 'base',
    visible: false,
    source: new StadiaMaps({
        layer: 'stamen_watercolor'
    })
});
var stamenToner = new Tile({
    title: 'Stamen Toner',
    type: 'base',
    visible: false,
    source: new StadiaMaps({
        layer: 'stamen_toner'
    })
});
basemapLayers.getLayers().extend([stamenWatercolor, stamenToner]);

// Add the ESRI XYZ basemaps here:
var esriTopoBasemap = new Tile({
    title: 'ESRI Topographic',
    type: 'base',
    visible: false,
    source: new XYZ({
        attributions:
            'Tiles © <a href="https://services.arcgisonline.com/ArcGIS/' +
            'rest/services/World_Topo_Map/MapServer">ArcGIS</a>',
        url:
            'https://server.arcgisonline.com/ArcGIS/rest/services/' +
            'World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
    }),
});
var esriWorldImagery = new Tile({
    title: 'ESRI World Imagery',
    type: 'base',
    visible: false,
    source: new XYZ({
        attributions:
            'Tiles © <a href="https://services.arcgisonline.com/ArcGIS/' +
            'rest/services/World_Imagery/MapServer">ArcGIS</a>',
        url:
            'https://server.arcgisonline.com/ArcGIS/rest/services/' +
            'World_Imagery/MapServer/tile/{z}/{y}/{x}',
    }),
});
basemapLayers.getLayers().extend([
    esriTopoBasemap, esriWorldImagery
]);

var cartoPositron = new Tile({
    title: 'CartoDB Positron',
    type: 'base',
    visible: false,
    source: new XYZ({
        attributions: '© CartoDB',
        url: 'https://{a-c}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
        maxZoom: 19
    })
});
basemapLayers.getLayers().extend([cartoPositron]);

// Add the WFS layer here:
// First, the URL definition:
var wfsUrl = "https://www.gis-geoserver.polimi.it/geoserver/gis/wfs?" + 
"service=WFS&" + 
"version=2.0.0&" +
"request=GetFeature&" + 
"typeName=gis:COL_water_areas&" + 
"srsname=EPSG:3857&" + 
"outputFormat=application/json";


// Add the popup code here:
var container = document.getElementById('popup');
var content = document.getElementById('popup-content');
var closer = document.getElementById('popup-closer');
var popup = new Overlay({
    element: container
}); 

map.addOverlay(popup);

closer.onclick = function () {
    popup.setPosition(undefined);
    closer.blur(); 
    return false;
};

// Add the pointermove event code here:
map.on('pointermove', function(event) {
    var pixel = map.getEventPixel(event.originalEvent);
    var hit = map.hasFeatureAtPixel(pixel);
    map.getTarget().style.cursor = hit ? 'pointer' : '';
});

const excludedLayers = [
   'gisgeoserver_21:Kosovo_average_pm2p5_2022',
   'gisgeoserver_21:Kosovo_average_no2_2022',
   'gisgeoserver_21:Kosovo_CAMS_pm2p5_2022_12',
   'gisgeoserver_21:Kosovo_CAMS_no2_2022_12',
   'gisgeoserver_21:Kosovo_pm2p5_zonal_statistics_2013-2022',
   'gisgeoserver_21:kosovo_no2_zonal_statistics_2013-2022',
   'gisgeoserver_21:Kosovo_pm2p5_2020_bivariate',
   'gisgeoserver_21:Kosovo_no2_2020_bivariate'
];

function updateLegend() {
    const layers = map.getLayers().getArray();

    function getVisibleWMSLayers(group) {
        let visible = [];
        group.getLayers().forEach(layer => {
            if (layer instanceof Group) {
                visible = visible.concat(getVisibleWMSLayers(layer));
            } else if (layer.getVisible() && layer.getSource() instanceof ImageWMS) {
                visible.push(layer);
            }
        });
        return visible;
    }

    const activeLayers = getVisibleWMSLayers(map);
    const legendDiv = document.getElementById('legend-content');
    legendDiv.innerHTML = '';

    activeLayers.forEach(layer => {
        const layerName = layer.getSource().getParams().LAYERS;

        if (excludedLayers.includes(layerName)) return;
        const title = layer.get('title');
        const legendUrl = `${layer.getSource().getUrl()}?REQUEST=GetLegendGraphic&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER=${layerName}`;

        legendDiv.innerHTML += `
            <div class="legend-item" style="margin-bottom: 8px;">
                <strong>${title}</strong><br>
                <img src="${legendUrl}" alt="Legenda ${title}" />
            </div>
        `;
    });
}
// Add the layer groups to the map here, at the end of the script!

map.addLayer(basemapLayers);
map.addLayer(Concentrationmaps);
map.addLayer(Averagemaps);
map.addLayer(CAMSmaps);
map.addLayer(Strangemaps);
map.addLayer(Kosovo5);
map.addLayer(Statisticsemaps);
map.addLayer(Bivariatemaps);

function attachLegendListener(layer) {
    if (layer instanceof Group) {
        layer.getLayers().forEach(attachLegendListener);
    } else if (layer instanceof Image) {
        layer.on('change:visible', updateLegend);
    }
}

map.getLayers().forEach(attachLegendListener);
updateLegend();
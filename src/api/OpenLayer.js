import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import Icon from "ol/style/Icon";
import Style from "ol/style/Style";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import View from "ol/View";
import Map from "ol/Map";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import * as olProj from "ol/proj";

// importing the OpenLayers stylesheet is required for having
// good looking buttons!
import "ol/ol.css";

const createMap = (reference, latitude, longitude) => {
  return new Map({
    // the map will be created using the 'map-root' ref
    target: reference,
    layers: [
      // adding a background tiled layer
      new TileLayer({
        source: new OSM(), // tiles are served by OpenStreetMap
      }),
    ],

    // the map view will initially show the whole world
    view: new View({
      zoom: 15,
      center: olProj.fromLonLat([longitude, latitude]),
      constrainResolution: true,
    }),
  });
};

export { createMap };

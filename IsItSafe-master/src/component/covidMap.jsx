import React, { Component } from 'react';
import {MapContainer, GeoJSON, TileLayer, LayersControl } from "react-leaflet";
import mapData from './../data/CovidTest.json';
// import mapDatapnt from './../data/cnyt_pnt.json';
import "leaflet/dist/leaflet.css";
//import MarkerClusterGroup from 'react-leaflet-markercluster';
import "./covidMap.css";

class CovidMap extends Component {
    // state = { color: "#fff00"};

    // color = ["blue", "green", "yellow", "grey", "red"];

componentDidMount() {
    //console.log(mapData);
}
countyStyle = {
 fillColor: "gray",
 fillOpacity:.01,
 color: "black",
 weight: 0.7,

};



printMessageToConsole = (event) => {
    console.log(event.target.feature.properties);
    var x = event.target.feature.properties
    sessionStorage.setItem("target", JSON.stringify(x));
};

// changeCountyColor = (event) => {
//     event.target.setStyle({
//        color: "green",
//        fillColor: this.state.color,
//        fillOpacity: 0.3,
//     });
// }

onEachCounty = (County, Layer) => {
const covidCases = County.properties.COVID_cases
;
// const covidDeaths = County.properties.COVID_deaths;

Layer.bindPopup("Covid Cases: "+ covidCases)
// ("Covid Cases:" + covidDeaths );
};


render() { 
        return (
        <div class="covidMap">
            <h1 style={{ textAlign: "center" }} >Interactive Covid Map</h1>
            <h3 style={{ textAlign: "center "}} >Click on your county to view current active cases.</h3>
        <MapContainer style={{ height: "60vh", width: "90vh" }} zoom={2.5} center={[31.5, -96.4]}>
        <LayersControl position="topright">
      <LayersControl.BaseLayer checked name="OpenStreetMap.Mapnik">
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </LayersControl.BaseLayer>
      <LayersControl.BaseLayer name="OpenStreetMap.BlackAndWhite">
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png"
        />
        </LayersControl.BaseLayer>
       
        <GeoJSON 
                style={this.countyStyle} 
                data={mapData.features}
                onEachFeature={this.onEachCounty}
                />
        
        </LayersControl>
      
     </MapContainer>
</div>
        )
    }
};


 
export default CovidMap;
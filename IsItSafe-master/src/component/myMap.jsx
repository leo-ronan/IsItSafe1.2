import React, { Component } from 'react';
import {MapContainer, GeoJSON } from "react-leaflet";
import mapData from './../data/counties.json';
//import mapDatapnt from './../data/countiesPoints.json';
import "leaflet/dist/leaflet.css";
import "./myMap.css";

class MyMap extends Component {
    state = { color: "#fff00"};

    color = ["blue", "green", "yellow", "grey", "red"];

componentDidMount() {
    //console.log(mapData);
}
countyStyle = {
 fillColor: "gray",
 fillOpacity:1,
 color: "black",
 weight: 0.7,

};
// pointStyle = {
//     iconUrl: 'my-icon.png',
//     iconSize: [38, 95],
//     iconAnchor: [22, 94],
//     popupAnchor: [-3, -76],
//     shadowUrl: 'my-icon-shadow.png',
//     shadowSize: [68, 95],
//     shadowAnchor: [22, 94]
// };


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
const countyName = County.properties.NAME;
const stateName = County.properties.STATE;
Layer.bindPopup(countyName + ", " + stateName);

// Layer.options.fillOpacity = Math.random();
//  const colorIndex = Math.floor(Math.random() * this.color.length);
// Layer.options.fillColor = this.color[colorIndex]; 

Layer.on({
    click: this.printMessageToConsole,
    // mouseover: this.changeCountyColor,
});
};
colorChange = (event) =>
this.setState({color: event.target.value });

render() { 
        return (
        <div class="myMap">
            <h1 style={{ textAlign: "center" }} >Is It Safe?</h1>
            <h3 style={{ textAlign: "center "}} >Click on your county to view active disaster declarations from FEMA</h3>
            <MapContainer style={{ height: "60vh", width: "90vh" }} zoom={2.5} center={[31.5, -96.4]}>
               <GeoJSON 
                style={this.countyStyle} 
                data={mapData.features}
                onEachFeature={this.onEachCounty} />
            {/* </MapContainer>
            <MapContainer style={{ height: "80vh" }} zoom={3} center={[31.5, -96.4]}> 
                <GeoJSON 
                style={this.pointStyle} 
                data={mapDatapnt.features}
                onEachFeature={this.onEachCounty} /> */}
            </MapContainer>

        </div>  
        );
    }
}
 
export default MyMap;
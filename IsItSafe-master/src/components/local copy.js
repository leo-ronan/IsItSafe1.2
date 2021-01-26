import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const Local = () => {
  const [data, setData] = useState([]);

  const api_key = "71bd3c9de51567a495cc45c857ebcaf2";

  //api.openweathermap.org/data/2.5/forecast/daily?q={city name}&cnt={cnt}&appid={API key}

  useEffect(() => {
    //  fetch(`http://api.openweathermap.org/data/2.5/forecast/daily?q=${"london"}&cnt=${12}&appid=71bd3c9de51567a495cc45c857ebcaf2`)
    // fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${"london"},${"GB"}&appid=71bd3c9de51567a495cc45c857ebcaf2`)
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${"london"}&APPID=${api_key}`
    )
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => console.log(err));
  }, []);

  const displayData = () => {
    // console.clear();
    console.log(data);
    if (data.list) {
      console.log(data.list.length, "<===length of data");
      // for (let i = 0; i !== data.list.length; i += 8) {
      //   let weatherIcon = data.list[i].weather[0].icon;
      //   let temp = data.list[i].main.temp;
      //   let humidity = data.list[i].main.humidity;
      //   let xdate = data.list[i].dt_txt;

      <p>test</p> 
        data.list.map( (res) =>{
          //console.log(res)
          return (
            <React.Fragment>
              
              <div>
                <p>Data</p>
                <h1>{res.main.temp}</h1>
                {/* <h1>{humidity}</h1>
                <h1>{xdate}</h1> */}
              </div>
            </React.Fragment>
          );
        }
              
          )
        // return (
        //   <React.Fragment>
            
        //     <div>
        //       <h1>{temp}</h1>
        //       <h1>{humidity}</h1>
        //       <h1>{xdate}</h1>
        //     </div>
        //   </React.Fragment>
        // );
     // }
    }
  };

  return (
    <div className="local">
      this is the local component
      {displayData()}
      {/*  <MapContainer className="map" center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
                    <TileLayer
                      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={[51.505, -0.09]}>
                      <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                      </Popup>
                    </Marker>
                  </MapContainer> */}
    </div>
  );
};

export default Local;

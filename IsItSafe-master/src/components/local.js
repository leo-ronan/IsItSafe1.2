import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
require("dotenv").config();

const Local = () => {
  const [data, setData] = useState([]);

  const api_key = WEATHERKEY;

  //api.openweathermap.org/data/2.5/forecast/daily?q={city name}&cnt={cnt}&appid={API key}

  useEffect(() => {
    //  fetch(`http://api.openweathermap.org/data/2.5/forecast/daily?q=${"london"}&cnt=${12}&appid=71bd3c9de51567a495cc45c857ebcaf2`)
    // fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${"london"},${"GB"}&appid=71bd3c9de51567a495cc45c857ebcaf2`)
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${"london"}&APPID=${api_key}&units=imperial`
    )
      .then(res => res.json())
      .then(res => setData(res))
      .catch(err => console.log(err));
  }, []);

  const displayData = () => {
    // console.clear();

    <p>test</p>;
    console.log(data);
    if (data.list) {
      console.log(data.list.length, "<===length of data");
      // for (let i = 0; i !== data.list.length; i += 8) {
      //   let weatherIcon = data.list[i].weather[0].icon;
      //   let temp = data.list[i].main.temp;
      //   let humidity = data.list[i].main.humidity;
      //   let xdate = data.list[i].dt_txt;
      var res = data.list.map(res => {
        if (res.dt_txt.indexOf("15:00:00") !== -1)
          return (
            <React.Fragment>
              <div className="col-2 ml-2">
                <div class="card bg-info text-white">
                  <div class="card-body p-1">
                    <h5 class="card-title">{res.dt_txt}</h5>
                    <img
                      src={
                        "http://openweathermap.org/img/w/" +
                        res.weather[0].icon +
                        ".png"
                      }
                      width="50px"
                    />
                    <p class="card-text">Temp: {res.main.temp} °F</p>
                    <p class="card-text">Humidity: {res.main.humidity}%</p>
                  </div>
                </div>
              </div>
            </React.Fragment>
          );
      });
    }

    return res;
  };

  return (
    <div className="local">
      <p> Weather</p>
      <div className="row">{displayData()}</div>
    </div>
  );
};

export default Local;

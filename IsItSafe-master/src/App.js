import React from "react";
import MyMap from "./component/myMap";
import CovidMap from "./component/covidMap";
import Heading from "./components/heading";
import Form from "./components/form";
import Forecast from "./components/forecast";
import Local from "./components/local";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/navbar";
import Footer from "./components/Footer";
import Jumbotron from "./components/jumbotronn";
import Search from "./components/search";
import "./App.css";
import "./components/API-Call";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
require("dotenv").config();

const api_key = process.env.WEATHERKEY;

class App extends React.Component {
  state = {
    tempature: " ",
    City: "",
    Country: "",
    humidity: "",
    description: "",
    icon: "",
    error: ""
  };
  getWeather = async e => {
    const city = e.target.elements.city.value;
    const state = e.target.elements.state.value;
    e.preventDefault();
    if (!(city && state)) {
      return this.setState({
        error: "Please fill out the input fields properly"
      });
    }
    const api_call = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city},${state}&units=imperial&appid=${api_key}`
    );

    const response = await api_call.json();
    console.log(response);
    this.setState({
      temperature: response.main.temp,
      city: response.name,
      humidity: response.main.humidity,
      pressure: response.main.pressure,
      icon: response.weather[0].icon,
      description: response.weather[0].description,
      error: ""
    });
  };

  render() {
    return (
      <>
        <Navbar />
        <Router>
          <div>
            <Jumbotron />
            <Heading />

            <Switch>
              <Route path="/local" component={Local} />

              <Route path="/search" component={Search} />

              {/* <Route exact path="/">
                <Form loadWeather={this.getWeather} />
                <Forecast
                  temperature={this.state.temperature}
                  city={this.state.city}
                  country={this.state.country}
                  humidity={this.state.humidity}
                  pressure={this.state.pressure}
                  icon={this.state.icon}
                  description={this.state.description}
                  error={this.state.error}
                />
              </Route> */}
              <Route exact path="/home">
                <div className="row">
                  <div className="col-2">
                    <Form loadWeather={this.getWeather} />
                  </div>
                  <div className="col-10">
                  <div>
                      <p>5 Day Forecast</p>
                  </div>
                    <div className="secondChild">
                      <Forecast
                        temperature={this.state.temperature}
                        city={this.state.city}
                        statee={this.state.statee}
                        humidity={this.state.humidity}
                        pressure={this.state.pressure}
                        icon={this.state.icon}
                        description={this.state.description}
                        error={this.state.error}
                      />
                    </div>
                    <Local />
                    <div className="row">
                      <CovidMap />
                    </div>
                  </div>
                </div>
              </Route>
              <Route exact path="/map">
                <MyMap />
                <div id="disasterCount"></div>
                <div id="data"></div>
              </Route>
              <Redirect to="/home"></Redirect>
            </Switch>
            <Footer />
          </div>
        </Router>
      </>
    );
  }
}

export default App;

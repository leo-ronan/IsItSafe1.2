import React from 'react';

const Forecast = (props) => {
    if(props.city){
    return(
        <div className="forecast">
            {props.country && props.city && 
                <p> Location: {props.city}</p>}
                {props.temperature && <p> Temperature: {props.temperature} F</p>}
                {props.humidity && <p> Humidity: {props.humidity} 
                </p>}
                {props.pressure && <p> Pressure: {props.pressure} </p>}
                {props.icon && <img src={`http://openweathermap.org/img/wn/${props.icon}.png`} alt= 'weather icon'/>}

                {props.description && <p> Conditions: {props.description} </p>}
                {props.error && <p>{props.error}</p>}
        </div>
    )
                } else{
                    return <h1 className="no">NO DATA AVAILABLE</h1>
                }
}

export default Forecast;
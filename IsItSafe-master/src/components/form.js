import React from 'react';


const Form = (props) =>{
    return (
        <form onSubmit = {props.loadWeather} className="homeForm">
            <input type ="text" name='city'
            placeholder="Choose a city"/>
            <input type = 'text' name= "state"
            placeholder="Choose a state"></input>
            <button> Get Weather </button>
        </form>
    )

}

export default Form;

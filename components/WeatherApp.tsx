import "./WeatherApp.css";
import { useEffect, useState } from 'react';

// define the initial data and therefore imply the types 
const initialWeatherData = {
    current: {
        temp_c: 0,
        condition: {
            text: "Loading...",
        },
    },
    forecast:
        { forecastday: [
            { day: {
                avgtemp_c: 0,
                condition: {
                    text: "Loading...",
                },
            }
        }
    ]
    },
};

const WeatherApp = () => {
    // set some initial state for the forecast to be put in
    const [weatherData, setWeatherData] = useState(initialWeatherData);


    // fetch the data from the api and update the state
        useEffect(() => {
            const fetchWeatherData = async () => {
            try {
                const response = await fetch('http://api.weatherapi.com/v1/forecast.json?key=d39316be901d4606a23151312241504&q=Melksham&days=3&aqi=no&alerts=no');
                const data = await response.json();
                console.log(data);
                setWeatherData(data);
                
            } catch (error) {
                console.error('Error fetching weather data:', error);
                alert("Error fetching weather data!")
            }
            };
        // call the function
        fetchWeatherData();
    }, []);
    
    // render the actual component
    return (
        <div className="weatherApp">
            <h2>Melksham 3 Day Forecast</h2>
            <div className="days">
                <span className="dayOne">Current: {weatherData.current.condition.text || 'Loading...'}, {weatherData.current.temp_c}°C</span>
                <span className="dayTwo">Tomorrow: {weatherData.forecast.forecastday[1].day.condition.text || 'Loading...'}, {weatherData.forecast.forecastday[1].day.avgtemp_c || 0}°C</span>
                <span className="dayThree">The day after: {weatherData.forecast.forecastday[2].day.condition.text || 'Loading...'}, {weatherData.forecast.forecastday[2].day.avgtemp_c || 0}°C</span>
            </div>
        </div>
    );
}

export default WeatherApp;
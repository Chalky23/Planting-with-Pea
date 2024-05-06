import "./WeatherApp.css";
import { useEffect, useState } from "react";

const WeatherApp = () => {
  // define the initial data and therefore imply the types
  interface forecastday {
    day: {
      avgtemp_c: number;
      condition: {
        text: string;
        icon: string;
      };
    };
  }

  const initialWeatherData = {
    current: {
      temp_c: 0,
      condition: {
        text: "Enter location below",
        icon: "//cdn.weatherapi.com/weather/64x64/day/116.png",
      },
    },
    location: {
      name: "Find Your Local",
    },
    forecast: {
      forecastday: [
        {
          day: {
            avgtemp_c: 0,
            condition: {
              text: "Loading...",
              icon: "",
            },
          },
        },
      ],
    },
  };
  // Set initial states
  const [weatherData, setWeatherData] = useState(initialWeatherData);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // Flag for submission

  // fetch the data from the api and update the state
  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(
          `https://api.weatherapi.com/v1/forecast.json?key=d39316be901d4606a23151312241504&q=${searchTerm}&days=3&aqi=no&alerts=no`
        );
        const data = await response.json();
        console.log(data);

        if (data.forecast && data.forecast.forecastday.length > 0) {
          // Only set data if forecast exists and has elements
          setWeatherData(data);
        } else {
          // Handle empty response (optional)
          console.log("No forecast data received from the API.");
        }
      } catch (error) {
        console.error("Error fetching weather data:", error);
        alert("Error fetching weather data!");
      } finally {
        setIsSubmitting(false); // Reset submission flag after call
      }
    };

    if (searchTerm && isSubmitting) {
      // Only fetch on search term and submission
      fetchWeatherData();
    }
  }, [searchTerm, isSubmitting]);

  // Handle search input changes
  const handleSearchChange = (event: { target: { value: string } }) => {
    setSearchTerm(event.target.value);
  };

  // Handle form submission defaults
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission behavior
    setIsSubmitting(true); // Set submission flag to trigger API call
  };

  // render the actual component
  return (
    <div className="weatherApp">
      {weatherData.current && ( // Check if weatherData.current exists
        <>
          <h2>{weatherData.location.name} 3 Day Weather Forecast</h2>
          <div className="weather">
            <div className="currentWeather">
              <h3>Today</h3>
              <span>
                {weatherData.current.condition.text}
                <br />
              </span>

              <span>{weatherData.current.temp_c}°C</span>
              {/* eslint-disable-next-line @next/next/no-img-element*/}
              <img
                src={weatherData.current.condition.icon}
                alt="weather icon"
              />
            </div>
            <div className="dayOneWeather">
              <h3>Tomorrow</h3>
              <span>
                {weatherData.forecast.forecastday?.[1]?.day.condition.text}
                <br />
              </span>
              <span>
                {weatherData.forecast.forecastday?.[1]?.day.avgtemp_c}°C
              </span>
              {/* eslint-disable-next-line @next/next/no-img-element*/}
              <img
                src={weatherData.forecast.forecastday?.[1]?.day.condition.icon}
                alt="weather icon"
              />
            </div>
            <div className="dayTwoWeather">
              <h3>The day after</h3>
              <span>
                {weatherData.forecast.forecastday?.[2]?.day.condition.text}
                <br />
              </span>
              <span>
                {weatherData.forecast.forecastday?.[2]?.day.avgtemp_c}°C
              </span>
              {/* eslint-disable-next-line @next/next/no-img-element*/}
              <img
                src={weatherData.forecast.forecastday?.[2]?.day.condition.icon}
                alt="weather icon"
              />
            </div>
          </div>
        </>
      )}

      {/* Search bar */}
      <form
        className="searchBar"
        id="weatherSearchForm"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="Enter city name"
          value={searchTerm}
          onChange={handleSearchChange}
          id="weatherSearchInput"
        />
        <button type="submit" className="search">
          Search
        </button>
      </form>
    </div>
  );
};

export default WeatherApp;

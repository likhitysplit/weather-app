import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchWeatherData } from '../slices/weatherSlice.js';

const Weather = () => {
  const [city, setCity] = useState('');
  // const dispatch = useDispatch();
  // const { weatherData } = useSelector((state) => state.weather);
  const [weatherData, setWeatherData] = useState(null);

  const key = '147f54d9da4d40848ad193205243009';

 useEffect(() => {
    const fetchWeatherData = async () => {
      if (city) {
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${key}&q=${city}`);
        const data = await response.json();
        console.log(data);
        setWeatherData(data);
      }
    };
    fetchWeatherData();
  }, [city]);  


  return (
    <div className="weather-container">
      <label>Enter city or zip code here!</label>
      <input
        id="city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="city/zip code"
      />

      {weatherData && weatherData.location && weatherData.current && (
        <div className="weather-info">
          <h3>Weather in {weatherData.location.name}</h3>
          <p>Temperature: {weatherData.current.temp_f} °F / {weatherData.current.temp_c} °C</p>
          <p>Feels like: {weatherData.current.feelslike_f} °F / {weatherData.current.feelslike_c} °C</p>
          <p>Condition: {weatherData.current.condition.text}</p>
          <img src={weatherData.current.condition.icon} alt={weatherData.current.condition.text} />
        </div>
      )}
    </div>
  );
};

export default Weather;

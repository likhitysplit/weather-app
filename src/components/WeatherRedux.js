import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchWeatherData } from '../slices/weatherSlice';
import BarGraph from '../components/BarGraph';
import LineGraph from '../components/LineGraph';
import MmGraph from './MmGraph';
import '../App.css';

const WeatherRedux = ({ loggedInUser, handleLogout }) => {
  const [city, setCity] = useState('');
  const [selectedGraph, setSelectedGraph] = useState('bar');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { username, city: urlCity } = useParams(); 

  const { weatherData } = useSelector((state) => state.weather);

  useEffect(() => {
    if (!loggedInUser) {
      navigate('/');
    } else if (urlCity) {
      setCity(urlCity);
      dispatch(fetchWeatherData(urlCity)); 
    }
  }, [loggedInUser, urlCity, dispatch, navigate]);

  const handleFetchWeather = () => {
    if (city) {
      dispatch(fetchWeatherData(city));
      navigate(`/${loggedInUser}/${city}`); 
      setCity('');
    }
  };

  return (
    <div>
      {loggedInUser && (
        <>
          <div className="top">
            <h2>welcome, {loggedInUser}!</h2>
            <button className="logout-button" onClick={handleLogout}>logout</button>
          </div>

          <div className="weather-container">
            <label style={{ color: '#8EACCD' }}>enter city or zip code here!</label>
            <input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="city/zip code"
            />
            <button onClick={handleFetchWeather}>get weather!</button>
          </div>

          {weatherData && weatherData.location && weatherData.current && (
            <div className="graph-container">
              <div className="weather-details">
                <div className="weather-info">
                  <h3>weather in {weatherData.location.name}</h3>
                  <p>temperature: {weatherData.current.temp_f} °F / {weatherData.current.temp_c} °C</p>
                  <p>feels like: {weatherData.current.feelslike_f} °F / {weatherData.current.feelslike_c} °C</p>
                  <p>condition: {weatherData.current.condition.text}</p>
                  <img src={weatherData.current.condition.icon} alt={weatherData.current.condition.text} />
                </div>
              </div>

              <div className="graph-toggle-buttons">
                <button onClick={() => setSelectedGraph('bar')} className="graph-button">7-day forecast!</button>
                <button onClick={() => setSelectedGraph('line')} className="graph-button">precipitation (in.)</button>
                <button onClick={() => setSelectedGraph('line_mm')} className="graph-button">precipitation (mm.)</button>
              </div>

              <div className="graph-display">
                {selectedGraph === 'bar' && <BarGraph weatherData={weatherData} />}
                {selectedGraph === 'line' && <LineGraph weatherData={weatherData} />}
                {selectedGraph === 'line_mm' && <MmGraph weatherData={weatherData} />}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default WeatherRedux;

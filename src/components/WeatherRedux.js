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
  const [showCityInfo, setShowCityInfo] = useState(false); 
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

  const CityInformation = ({ cityName, country, onClose }) => {
    console.log(country);
    const [cityInfo, setCityInfo] = useState(null);
    const key = 'sk-kX5O6720a6f699c58443';
    const API_URL = `https://continentl.com/api/country-list?page=1&key=${key}`;

    useEffect(() => {
      const fetchCityData = async () => {
          const response = await fetch(API_URL);
          const cityData = await response.json();

          const cityDetails = {
            name: cityData.name,
            officialLanguage: cityData.official_language,
            capital: cityData.capital,
          };

          setCityInfo(cityDetails);
      };

      if (country) {
        fetchCityData();
        console.log("data fetched!");
      }
    }, [country]);

    if (!cityInfo) return "not working?";

    return (
      <div className="popup-overlay">
        <div className="popup">
          <button className="close-button" onClick={onClose}>X</button>
          <h2>name: {cityInfo.name}</h2>
          <p><strong>official language:</strong> {cityInfo.officialLanguage}</p>
          <p><strong>capital:</strong> {cityInfo.capital}</p>
        </div>
      </div>
    );
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
            <label className="text">enter city or zip code here!</label>
            <input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="city/zip code"
            />
            <button onClick={handleFetchWeather}>get weather!</button>
            <button onClick={() => setShowCityInfo(true)}>city information</button>
          </div>

          {weatherData && weatherData.location && weatherData.current && (
            <div className="graph-container">
              <div className="weather-details">
                <div className="weather-info">
                  <h3>weather in {weatherData.location.name}</h3>
                  <p>temperature: {weatherData.current.temp_f} °F / {weatherData.current.temp_c} °C</p>
                  <p>feels Like: {weatherData.current.feelslike_f} °F / {weatherData.current.feelslike_c} °C</p>
                  <p>condition: {weatherData.current.condition.text}</p>
                  <img src={weatherData.current.condition.icon} alt={weatherData.current.condition.text} />
                </div>
              </div>

              <div className="graph-toggle-buttons">
                <button onClick={() => setSelectedGraph('bar')} className="graph-button">7-day forecast</button>
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

          {showCityInfo && (
            <CityInformation 
              cityName={city} 
              country={weatherData.location.country} 
              onClose={() => setShowCityInfo(false)} 
            />
          )}
        </>
      )}
    </div>
  );
};

export default WeatherRedux;

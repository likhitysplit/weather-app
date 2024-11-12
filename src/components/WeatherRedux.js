import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { fetchWeatherData } from '../slices/weatherSlice';
import BarGraph from '../components/BarGraph.js';
import LineGraph from '../components/LineGraph.js';
import MmGraph from './MmGraph';
import '../App.css';
import CityInformation from './CityInformation.js';
import Loader from './Loader';

const WeatherRedux = ({ loggedInUser, handleLogout }) => {
  const [city, setCity] = useState('');
  const [selectedGraph, setSelectedGraph] = useState('bar');
  const [showCityInfo, setShowCityInfo] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { username, city: urlCity } = useParams();
  const { search } = useLocation();

  const { weatherData } = useSelector((state) => state.weather);

  const searchParams = new URLSearchParams(search);
  const country = searchParams.get('country') || 'USA';  
  const role = searchParams.get('role') || 'regular';   

  useEffect(() => {
    if (!loggedInUser) {
      navigate('/');
    } else if (urlCity) {
      setCity(urlCity);
      setLoading(true);
      dispatch(fetchWeatherData(urlCity)).then(() => setLoading(false));
    }
  }, [loggedInUser, urlCity, dispatch, navigate]);

  const handleFetchWeather = () => {
    if (city) {
      setLoading(true);
      dispatch(fetchWeatherData(city)).then(() => setLoading(false));
      navigate(`/${loggedInUser.username}/${city}?country=${country}&role=${role}`);
      setCity('');
    }
  };

  return (
    <div>
      {loggedInUser && (
        <>
          <div className="top">
            <h2 style={{ color: role === 'admin' ? 'red' : 'black' }}>
              welcome, {loggedInUser.username} ({role})
            </h2>
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
            {role === "admin" && (
              <button onClick={() => setShowCityInfo(true)}>city information</button>
            )}
          </div>

          {loading ? (
            <Loader />
          ) : (
            weatherData && weatherData.location && weatherData.current && (
              <div className="graph-container">
                <div className="weather-details">
                  <div className="weather-info">
                    <h3>weather in {weatherData.location.name}</h3>
                    <p>temperature: {country === 'USA' ? `${weatherData.current.temp_f} °F` : `${weatherData.current.temp_c} °C`}</p>
                    <p>feels like: {country === 'USA' ? `${weatherData.current.feelslike_f} °F` : `${weatherData.current.feelslike_c} °C`}</p>
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
            )
          )}

          {showCityInfo && (
            <CityInformation
              cityName={city}
              onClose={() => setShowCityInfo(false)}
            />
          )}
        </>
      )}
    </div>
  );
};

export default WeatherRedux;

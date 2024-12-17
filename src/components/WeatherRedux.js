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
import LikeButton from './LikeButton'; 

const WeatherRedux = ({ loggedInUser, handleLogout, likedData, handleLike }) => { 
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

  const delayFetchWeather = (city) => {
    setLoading(true); 
    setTimeout(() => {
      dispatch(fetchWeatherData(city)).finally(() => setLoading(false)); 
    }, 3000); 
  };

  useEffect(() => {
    if (!loggedInUser) {
      navigate('/');
    } else if (urlCity) {
      setCity(urlCity);
      delayFetchWeather(urlCity); 
    }
  }, [loggedInUser, urlCity, dispatch, navigate]);

  useEffect(() => {
    if (searchParams.get('premium') === 'true') {
      loggedInUser.premium = true; 
    }
  }, [searchParams, loggedInUser]);

  const handleFetchWeather = () => {
    if (city) {
        try {
          delayFetchWeather(city); 
          navigate(`/${loggedInUser.username}/${city}?country=${country}&role=${role}`);
          setCity('');
        } catch {
          console.error("failed to get weather information.");
        }
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
                    <LikeButton
                      cityName={weatherData.location.name}
                      where_liked="getweather_liked"
                      likedData={likedData}
                      handleLike={handleLike}
                    />
                    <p>temperature: {country === 'USA' ? `${weatherData.current.temp_f} °F` : `${weatherData.current.temp_c} °C`}</p>
                    <p>feels like: {country === 'USA' ? `${weatherData.current.feelslike_f} °F` : `${weatherData.current.feelslike_c} °C`}</p>
                    <p>condition: {weatherData.current.condition.text}</p>
                    <img src={weatherData.current.condition.icon} alt={weatherData.current.condition.text} />
                  </div>
                </div>

                {loggedInUser.premium && ( 
              <div className="graphs-premium">
                <div className="graph-toggle-buttons">
                  <button onClick={() => setSelectedGraph('bar')} className="graph-button">7-day forecast</button>
                  <button onClick={() => setSelectedGraph('line')} className="graph-button">Precipitation (in.)</button>
                  <button onClick={() => setSelectedGraph('line_mm')} className="graph-button">Precipitation (mm.)</button>
                </div>

                <div className="graph-display">
                  {selectedGraph === 'bar' && <BarGraph weatherData={weatherData} />}
                  {selectedGraph === 'line' && <LineGraph weatherData={weatherData} />}
                  {selectedGraph === 'line_mm' && <MmGraph weatherData={weatherData} />}
                </div>
              </div>
            )}
              </div>
            )
          )}

          {showCityInfo && (
            <CityInformation
            cityName={city}
            onClose={() => setShowCityInfo(false)}
            likedData={likedData} 
            handleLike={handleLike} 
          />
          )}
        </>
      )}
    </div>
  );
};

export default WeatherRedux;

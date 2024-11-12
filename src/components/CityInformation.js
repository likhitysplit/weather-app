import React, { useEffect, useState } from 'react';
import Loader from './Loader';

const CityInformation = ({ cityName, onClose }) => {
  const [cityInfo, setCityInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const mockCityData = {
    name: "mock city",
    officialLanguage: "mock language",
    capital: "mock capital"
  };

  useEffect(() => {
    const fetchCityData = async () => {
      setTimeout(() => {
        setCityInfo(mockCityData);
        setIsLoading(false); 
        console.log("mock data fetched!");
      }, 1500); 
    };

    if (cityName) {
      fetchCityData();
    }
  }, [cityName]);

  if (isLoading) {
    return (
      <div className="popup-overlay">
        <div className="popup">
          <button className="close-button" onClick={onClose}>X</button>
          <Loader/>
        </div>
      </div>
    );
  }

  if (!cityInfo) return null;

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

export default CityInformation;

import React, { useEffect, useState } from 'react';
import Loader from './Loader';
import LikeButton from './LikeButton';

const CityInformation = ({ cityName, onClose, likedData, handleLike }) => {
  const [cityInfo, setCityInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const mockCityData = {
    name: "mock city",
    officialLanguage: "mock language",
    capital: "mock capital",
    imageUrl: "../images/globe.png", 
  };

  useEffect(() => {
    const fetchCityData = async () => {
      setTimeout(() => {
        setCityInfo(mockCityData);
        setIsLoading(false);
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
          <button className="close-button" onClick={onClose}>
            X
          </button>
          <Loader />
        </div>
      </div>
    );
  }

  if (!cityInfo) return null;

  return (
    <div className="popup-overlay">
      <div className="popup">
        <button className="close-button" onClick={onClose}>
          X
        </button>
        <h2>name: {cityInfo.name}</h2>
        <LikeButton
          cityName={cityInfo.name}
          where_liked="cityinformation_liked"
          likedData={likedData || { cityinformation_liked: [] }} 
          handleLike={handleLike}
        />
        <p>
          <strong>official language:</strong> {cityInfo.officialLanguage}
        </p>
        <p>
          <strong>capital:</strong> {cityInfo.capital}
        </p>
        <img
          src={cityInfo.imageUrl}
          alt={`${cityInfo.name}`}
          loading="lazy"
          width="100"
        />
      </div>
    </div>
  );
};

export default CityInformation;
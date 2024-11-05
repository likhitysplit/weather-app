import React, { useEffect, useState } from 'react';
import '../App.css';

const CityInformation = ({ cityName, onClose }) => {
    const [cityInfo, setCityInfo] = useState(null);
    const key = 'sk-kX5O6720a6f699c58443';
    const API_URL = `https://continentl.com/api/country-list?city=${cityName}&key=${key}`;

    useEffect(() => {
        const fetchCityData = async () => {
            try {
                const response = await fetch(API_URL);
                const data = await response.json();
                
                const cityDetails = {
                    name: data.name,
                    officialLanguage: data.official_language,
                    capital: data.capital,
                    flag: data.flag,
                };
                
                setCityInfo(cityDetails);
            } catch (error) {
                console.log("error fetching details.")
            }
        };

        if (cityName) {
            fetchCityData();
        }
    }, [cityName]);

    if (!cityInfo) return null;

    return (
        <div className="popup-overlay">
            <div className="popup">
                <button className="close-button" onClick={onClose}>X</button>
                <h2>{cityInfo.name}</h2>
                <p><strong>official language:</strong> {cityInfo.officialLanguage}</p>
                <p><strong>capital:</strong> {cityInfo.capital}</p>
                <img src={cityInfo.flag} alt={`${cityInfo.name} flag`} style={{ width: '100px' }} />
            </div>
        </div>
    );
};

export default CityInformation;

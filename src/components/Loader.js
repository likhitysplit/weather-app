import React from 'react';
import '../App.css'; 

const Loader = () => {
  return (
    <div className="loader-container">
      <p>loading information...</p>
      <div className="loading-bar-container">
        <div className="loading-bar"></div>
      </div>
    </div>
  );
};

export default Loader;

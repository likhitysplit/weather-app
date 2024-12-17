import React, { useEffect } from 'react';

const LikeButton = ({ cityName, where_liked, likedData, handleLike }) => {
  const isLiked = likedData[where_liked].includes(cityName);

  const logLikedCities = () => {
    console.log(`liked cities (${where_liked}):`, likedData[where_liked]);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === 'q') {
          try {
            event.preventDefault();  
            logLikedCities();      
          } catch 
          {
            console.error("failed to get liked cities.");
          }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [likedData, where_liked]);

  const handleButtonClick = () => {
    handleLike(where_liked, cityName);
  };

  return (
    <button
      onClick={handleButtonClick}
      className={`btn ${isLiked ? 'btn-success' : 'btn-outline-secondary'}`}
    >
      {isLiked ? 'unlike' : 'like'}
    </button>
  );
};

export default LikeButton;

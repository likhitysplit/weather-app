import React, { useEffect } from 'react';


const Subscriptions = ({ loggedInUser, isPremium, handlePremiumStatus }) => {
  const handlePremiumClick = () => {
    const newStatus = !isPremium; 
    handlePremiumStatus(newStatus);
    alert(newStatus ? 'yay, you are now a premium user!' : 'you are no longer a premium user. :(');
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === 'p') {
        event.preventDefault();
        const premiumStatus = isPremium ? 'premium user' : 'regular user';
        console.log(`status: ${premiumStatus}`);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isPremium]);

  return (
    <div>
      <h1>join simple weather+!</h1>
      <p>get 3-day weather forecasts in your area.</p>
      <p>view your local weather reports with graphs!</p>
      <button onClick={handlePremiumClick}>
        {isPremium ? 'cancel premium :(' : 'subscribe now!'}
      </button>
    </div>
  );
};


export default Subscriptions;
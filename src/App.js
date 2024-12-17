import React, { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import RouterOutlet from './components/RouterOutlet';
import { UserProvider } from './components/UserContext';
import Loader from './components/Loader';

import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 

const Header = lazy(() => import('./components/Header'));
const Footer = lazy(() => import('./components/Footer'));

function App() {
  const [loggedInUser, setLoggedInUser] = useState('');
  const sessionTimer = 10 * 60 * 1000;

  const [likedData, setLikedData] = useState({
    getweather_liked: [],
    cityinformation_liked: [],
  });

  const [likeCount, setLikeCount] = useState(0);

  const handleLogout = () => {
    setLoggedInUser('');
    sessionStorage.removeItem('isLoggedIn');
    alert('session timed out. you have been logged out.');
  };

  const handleLike = (where_liked, cityName) => {
    setLikedData((prev) => {
      const isLiked = prev[where_liked]?.includes(cityName);
      const updatedList = isLiked
        ? prev[where_liked].filter((name) => name !== cityName)
        : [...prev[where_liked], cityName];

      if (isLiked) {
        setLikeCount(likeCount - 1);
      } else {
        setLikeCount(likeCount + 1);
      }

      return { ...prev, [where_liked]: updatedList };
    });
  };

  useEffect(() => {
    if (loggedInUser) {
      sessionStorage.setItem('isLoggedIn', true);

      const timer = setTimeout(() => {
        handleLogout();
      }, sessionTimer);

      return () => clearTimeout(timer);
    }
  }, [loggedInUser]);

  const handlePremiumStatus = (isPremium) => {
    if (loggedInUser) {
      setLoggedInUser({ ...loggedInUser, premium: isPremium });
    }
  };

  return (
    <UserProvider>
      <Router>
        <div className="d-flex flex-column min-vh-100">
          <Suspense fallback={<Loader />}>
            {loggedInUser && (
              <Header loggedInUser={loggedInUser} handleLogout={handleLogout} />
            )}
          </Suspense>
          <main className="flex-grow-1">
            <h1 className="title text-center">instant weather!</h1>
            <RouterOutlet
              loggedInUser={loggedInUser}
              setLoggedInUser={setLoggedInUser}
              handleLogout={handleLogout}
              likedData={likedData}
              handleLike={handleLike}
              handlePremiumStatus={handlePremiumStatus}
            />
          </main>
          <Suspense fallback={<Loader />}>
            {loggedInUser && <Footer />}
          </Suspense>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;

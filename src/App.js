import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import LoginComponent from './components/LoginComponent.js';
import WeatherRedux from './components/WeatherRedux.js';
import { UserProvider } from './components/UserContext.js';
import RegisterComponent from './components/RegisterComponent.js';

function App() {
  const [loggedInUser, setLoggedInUser] = useState("");
  const sessionTimer = 5 * 60 * 1000;

  const handleLogout = () => {
    setLoggedInUser("");
    sessionStorage.removeItem("isLoggedIn");
    alert("Session timed out. You have been logged out.");
  };

  useEffect(() => {
    if (loggedInUser) {
      sessionStorage.setItem("isLoggedIn", true);

      const timer = setTimeout(() => {
        handleLogout();
      }, sessionTimer);

      return () => clearTimeout(timer);
    }
  }, [loggedInUser]);

  return (
    <UserProvider> 
      <Router>
        <div className="App">
          <h1 className="title">instant weather!</h1>
          <Routes>
            <Route 
              path="/" 
              element={<LoginComponent setLoggedInUser={setLoggedInUser} />} 
            />
            <Route 
              path="/register" 
              element={<RegisterComponent setLoggedInUser={setLoggedInUser}/>} 
            />
            <Route 
              path="/:username/:city?" 
              element={<WeatherRedux loggedInUser={loggedInUser} handleLogout={handleLogout} />} 
            />
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;

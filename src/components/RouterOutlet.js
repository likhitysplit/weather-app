import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginComponent from './LoginComponent';
import RegisterComponent from './RegisterComponent';
import Loader from './Loader';
import WeatherRedux from './WeatherRedux';
import Subscriptions from './Subscriptions';

const GuardedRoute = ({ element, loggedIn }) => {
  return loggedIn ? element : <Navigate to="/" />;
};

const RouterOutlet = ({
  loggedInUser,
  setLoggedInUser,
  handleLogout,
  likedData,
  handleLike,
  handlePremiumStatus
}) => {
  return (
    <main className="flex-grow-1">
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route
            path="/"
            element={<LoginComponent setLoggedInUser={setLoggedInUser} />}
          />
          <Route
            path="/register"
            element={<RegisterComponent setLoggedInUser={setLoggedInUser} />}
          />
          <Route
            path="/:username/:city?"
            element={
              <GuardedRoute
                loggedIn={!!loggedInUser}
                element={
                  <WeatherRedux
                    loggedInUser={loggedInUser}
                    handleLogout={handleLogout}
                    likedData={likedData}
                    handleLike={handleLike}
                  />
                }
              />
            }
          />
        <Route
          path="/:username/subscriptions"
          element={
            <GuardedRoute
              loggedIn={!!loggedInUser}
              element={
                <Subscriptions
                  loggedInUser={loggedInUser}
                  isPremium={loggedInUser?.premium} 
                  handlePremiumStatus={handlePremiumStatus} 
                />
              }
            />
          }
        />
        </Routes>
      </Suspense>
    </main>
  );
};

export default RouterOutlet;

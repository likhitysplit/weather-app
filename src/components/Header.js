import React from 'react';
import { Link, useParams } from 'react-router-dom';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Header = ({ loggedInUser, handleLogout }) => {
  const { username, city } = useParams(); 

  const country = loggedInUser?.country || 'USA'; 
  const role = loggedInUser?.role || 'regular';  

  const displayUsername = username || loggedInUser?.username || 'defaultUser'; 

  return (
    <header>
      <nav className="navbar navbar-expand-lg bg-dark border-bottom border-light">
        <div className="container-fluid">
          <Link
            className="navbar-brand text-black border border-light p-2"
            to={`/${displayUsername}?country=${country}&role=${role}`} 
          >
            instant weather!
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              {loggedInUser ? (
                <>
                  <li className="nav-item">
                    <p
                      style={{
                        color: loggedInUser.role === 'admin' ? 'red' : 'black',
                        marginTop: '10px',
                        margin: '10px',
                      }}
                    >
                      welcome, {loggedInUser.username} ({loggedInUser.role || 'regular'})
                    </p>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="btn btn-outline-dark border border-black"
                      to={`/${displayUsername}/subscriptions`} 
                    >
                      subscribe
                    </Link>
                  </li>
                  <li className="nav-item">
                    <button
                      className="btn btn-outline-dark border border-black"
                      onClick={handleLogout}
                    >
                      logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link
                      className="nav-link text-black border border-white p-2"
                      to="/"
                    >
                      home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link text-black border border-white p-2"
                      to="/register"
                    >
                      register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;

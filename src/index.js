import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Provider } from 'react-redux';
import { store } from './store';

ReactDOM.createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId='443923672451-l4r0kej5q9a6qgdorm9anhedcecchu8e.apps.googleusercontent.com'>
    <Provider store={store}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>
  </GoogleOAuthProvider>
);

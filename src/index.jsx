import React from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx";
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router } from "react-router-dom";
import { store } from './Redux/store'
import { Provider } from 'react-redux'
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3001'; //https://api.perxins.com

ReactDOM.render(
    <Router>
      <Provider store={store}>
      <React.StrictMode>
          <HelmetProvider>
            <App />
          </HelmetProvider>
      </React.StrictMode>
      </Provider>
    </Router>
  ,
  document.getElementById("root")
);

// New PWA registration for Vite
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('SW registered: ', registration);
      })
      .catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/css/style.css';
import App from './App';
import "flatpickr/dist/themes/material_red.css";
 
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

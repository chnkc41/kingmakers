import React from 'react';
import ReactDOM from 'react-dom/client';
import 'flatpickr/dist/themes/material_red.css';

import './assets/css/style.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

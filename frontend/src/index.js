import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import AppComponent from './components/AppComponent';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppComponent />
  </React.StrictMode>
);


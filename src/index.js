import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthProvider from './context/AuthContext';
import ShipmentProvider from './context/ShipmentContext';

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <ShipmentProvider>
        <App />
      </ShipmentProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

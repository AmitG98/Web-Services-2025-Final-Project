// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { UserSessionProvider } from "./context/UserSessionProvider";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserSessionProvider>
      <App />
    </UserSessionProvider>
  </React.StrictMode>
);

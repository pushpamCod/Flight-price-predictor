import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Error logging service (optional)
const logError = (error, errorInfo) => {
  // You can send this to an error reporting service like Sentry
  console.error('Application Error:', error);
  console.error('Error Info:', errorInfo);
};

// Create root element
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render app with error handling
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Optional: Add global error handling
window.addEventListener('error', (event) => {
  logError(event.error, { componentStack: event.filename + ':' + event.lineno });
});

window.addEventListener('unhandledrejection', (event) => {
  logError(event.reason, { type: 'unhandledrejection' });
});
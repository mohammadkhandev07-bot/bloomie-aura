import React from 'react';
import ReactDOM from 'react-dom/client';
import './style.css';  // All styles imported here
import App from './App';

// Create root element
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render App
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// ===== SERVICE WORKER (Optional - for PWA) =====
// If you want your app to work offline and load faster,
// uncomment the following lines:
//
// import * as serviceWorkerRegistration from './serviceWorkerRegistration';
// serviceWorkerRegistration.register();

// ===== PERFORMANCE MEASUREMENT (Optional) =====
// import reportWebVitals from './reportWebVitals';
// reportWebVitals(console.log);

// ===== CONSOLE WELCOME MESSAGE =====
console.log('%c 🌿 Bloom & Aura ', 'font-size: 30px; font-weight: bold; color: #D4AF37;');
console.log('%c blooming beauty, lasting aura ', 'font-size: 16px; color: #2C1810;');
console.log('%c 🕯️ Handcrafted with love ❤️ ', 'font-size: 14px; color: #FF6B35;');

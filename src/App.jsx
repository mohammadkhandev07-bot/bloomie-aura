import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import SuccessPage from './pages/SuccessPage';

// Lazy loading for better performance (optional)
// const HomePage = React.lazy(() => import('./pages/HomePage'));
// const CartPage = React.lazy(() => import('./pages/CartPage'));
// const SuccessPage = React.lazy(() => import('./pages/SuccessPage'));

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        {/* ===== NAVBAR ===== */}
        <Navbar />
        
        {/* ===== MAIN CONTENT ===== */}
        <main className="main-content">
          <Routes>
            {/* Homepage */}
            <Route path="/" element={<HomePage />} />
            
            {/* Cart/Checkout Page */}
            <Route path="/cart" element={<CartPage />} />
            
            {/* Order Success Page */}
            <Route path="/success" element={<SuccessPage />} />
            
            {/* 404 - Not Found - Redirect to Home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* ===== FOOTER ===== */}
        <footer className="app-footer">
          <div className="footer-container">
            <div className="footer-grid">
              {/* Brand */}
              <div className="footer-brand">
                <img src="/logo.png" alt="Bloom & Aura" className="footer-logo" />
                <h3>Bloom & Aura</h3>
                <p>🌿 blooming beauty, lasting aura</p>
                <p className="footer-tagline">
                  Handcrafted candles made with love and natural ingredients.
                </p>
              </div>

              {/* Quick Links */}
              <div className="footer-links">
                <h4>Quick Links</h4>
                <ul>
                  <li><a href="/">Home</a></li>
                  <li><a href="/products">Products</a></li>
                  <li><a href="/cart">Cart</a></li>
                  <li><a href="/about">About Us</a></li>
                </ul>
              </div>

              {/* Support */}
              <div className="footer-links">
                <h4>Support</h4>
                <ul>
                  <li><a href="/faq">FAQ</a></li>
                  <li><a href="/returns">Returns Policy</a></li>
                  <li><a href="/shipping">Shipping Info</a></li>
                  <li><a href="/contact">Contact Us</a></li>
                </ul>
              </div>

              {/* Contact */}
              <div className="footer-contact">
                <h4>Get in Touch</h4>
                <p>📧 info@bloomandaura.com</p>
                <p>📞 +91 98765 43210</p>
                <p>📍 Mumbai, India</p>
                <div className="footer-socials">
                  <a href="#" aria-label="Instagram">📸</a>
                  <a href="#" aria-label="Facebook">📘</a>
                  <a href="#" aria-label="YouTube">▶️</a>
                  <a href="#" aria-label="Pinterest">📌</a>
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="footer-bottom">
              <p>© 2026 Bloom & Aura. All rights reserved.</p>
              <p>Made with ❤️ in India</p>
            </div>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;

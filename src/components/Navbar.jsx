import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiShoppingCart, FiMenu, FiX } from 'react-icons/fi';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  // Cart count (hardcoded 0 initially, baad mein context se connect karenge)
  const cartCount = 0;

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close menu on link click (mobile)
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Active link style
  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          {/* ====== LOGO SECTION ====== */}
          <Link to="/" className="nav-logo" onClick={closeMenu}>
            <img 
              src="/logo.png" 
              alt="Bloom & Aura" 
              className="nav-logo-img"
            />
            <span className="nav-brand">
              Bloom <span className="nav-brand-aura">& Aura</span>
            </span>
          </Link>

          {/* ====== DESKTOP MENU ====== */}
          <ul className="nav-menu">
            <li className="nav-item">
              <Link 
                to="/" 
                className={`nav-link ${isActive('/')}`}
                onClick={closeMenu}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/products" 
                className={`nav-link ${isActive('/products')}`}
                onClick={closeMenu}
              >
                Products
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/cart" 
                className={`nav-link cart-link ${isActive('/cart')}`}
                onClick={closeMenu}
              >
                <FiShoppingCart className="cart-icon" />
                Cart
                {cartCount > 0 && (
                  <span className="cart-badge">{cartCount}</span>
                )}
              </Link>
            </li>
          </ul>

          {/* ====== MOBILE HAMBURGER ====== */}
          <div className="nav-toggle" onClick={toggleMenu}>
            {isMenuOpen ? (
              <FiX className="toggle-icon" />
            ) : (
              <FiMenu className="toggle-icon" />
            )}
          </div>
        </div>

        {/* ====== MOBILE DROPDOWN MENU ====== */}
        <div className={`mobile-menu ${isMenuOpen ? 'active' : ''}`}>
          <ul className="mobile-menu-items">
            <li className="mobile-item">
              <Link 
                to="/" 
                className={`mobile-link ${isActive('/')}`}
                onClick={closeMenu}
              >
                🏠 Home
              </Link>
            </li>
            <li className="mobile-item">
              <Link 
                to="/products" 
                className={`mobile-link ${isActive('/products')}`}
                onClick={closeMenu}
              >
                🕯️ Products
              </Link>
            </li>
            <li className="mobile-item">
              <Link 
                to="/cart" 
                className={`mobile-link cart-mobile ${isActive('/cart')}`}
                onClick={closeMenu}
              >
                🛒 Cart
                {cartCount > 0 && (
                  <span className="mobile-badge">{cartCount}</span>
                )}
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* ====== INLINE STYLES (style.css mein daalna) ====== */}
      <style jsx>{`
        /* ===== NAVBAR BASE ===== */
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          background: linear-gradient(135deg, #2C1810 0%, #4A2A1A 100%);
          box-shadow: 0 4px 20px rgba(44, 24, 16, 0.3);
          padding: 0 2rem;
          height: 75px;
          display: flex;
          align-items: center;
          border-bottom: 2px solid #D4AF37;
        }

        .nav-container {
          max-width: 1400px;
          width: 100%;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        /* ===== LOGO ===== */
        .nav-logo {
          display: flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
          transition: transform 0.3s ease;
        }

        .nav-logo:hover {
          transform: scale(1.05);
        }

        .nav-logo-img {
          height: 50px;
          width: 50px;
          object-fit: contain;
          border-radius: 50%;
          border: 2px solid #D4AF37;
          padding: 3px;
          background: #FFF8F0;
          transition: all 0.3s ease;
        }

        .nav-logo:hover .nav-logo-img {
          border-color: #FF6B35;
          box-shadow: 0 0 20px rgba(255, 107, 53, 0.3);
        }

        .nav-brand {
          font-size: 1.8rem;
          font-weight: 700;
          color: #FFF8F0;
          letter-spacing: 1px;
          font-family: 'Georgia', serif;
        }

        .nav-brand-aura {
          color: #D4AF37;
          font-style: italic;
        }

        /* ===== DESKTOP MENU ===== */
        .nav-menu {
          display: flex;
          align-items: center;
          gap: 2rem;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .nav-item {
          position: relative;
        }

        .nav-link {
          color: #FFF8F0;
          text-decoration: none;
          font-size: 1.1rem;
          font-weight: 500;
          padding: 0.5rem 0;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 8px;
          position: relative;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background: #D4AF37;
          transition: width 0.3s ease;
        }

        .nav-link:hover {
          color: #D4AF37;
        }

        .nav-link:hover::after {
          width: 100%;
        }

        .nav-link.active {
          color: #D4AF37;
        }

        .nav-link.active::after {
          width: 100%;
        }

        /* ===== CART LINK ===== */
        .cart-link {
          position: relative;
          padding: 0.5rem 1rem;
          background: rgba(212, 175, 55, 0.15);
          border-radius: 25px;
          border: 1px solid rgba(212, 175, 55, 0.3);
          transition: all 0.3s ease;
        }

        .cart-link:hover {
          background: rgba(212, 175, 55, 0.25);
          border-color: #D4AF37;
          transform: translateY(-2px);
        }

        .cart-icon {
          font-size: 1.3rem;
        }

        .cart-badge {
          position: absolute;
          top: -8px;
          right: -8px;
          background: #FF6B35;
          color: white;
          font-size: 0.7rem;
          font-weight: 700;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }

        /* ===== HAMBURGER TOGGLE ===== */
        .nav-toggle {
          display: none;
          cursor: pointer;
          color: #FFF8F0;
          padding: 0.5rem;
          transition: all 0.3s ease;
          z-index: 1001;
        }

        .nav-toggle:hover {
          color: #D4AF37;
          transform: rotate(90deg);
        }

        .toggle-icon {
          font-size: 2rem;
        }

        /* ===== MOBILE MENU ===== */
        .mobile-menu {
          display: none;
          position: fixed;
          top: 75px;
          left: 0;
          right: 0;
          background: linear-gradient(180deg, #2C1810 0%, #1A0E0A 100%);
          padding: 2rem;
          box-shadow: 0 10px 30px rgba(0,0,0,0.5);
          transform: translateY(-120%);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          border-bottom: 2px solid #D4AF37;
          max-height: calc(100vh - 75px);
          overflow-y: auto;
        }

        .mobile-menu.active {
          transform: translateY(0);
        }

        .mobile-menu-items {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .mobile-item {
          opacity: 0;
          transform: translateX(-20px);
          animation: slideIn 0.3s ease forwards;
        }

        .mobile-item:nth-child(1) { animation-delay: 0.1s; }
        .mobile-item:nth-child(2) { animation-delay: 0.2s; }
        .mobile-item:nth-child(3) { animation-delay: 0.3s; }

        @keyframes slideIn {
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .mobile-link {
          display: flex;
          align-items: center;
          gap: 12px;
          color: #FFF8F0;
          text-decoration: none;
          font-size: 1.3rem;
          font-weight: 500;
          padding: 0.8rem 1rem;
          border-radius: 12px;
          transition: all 0.3s ease;
          background: rgba(255, 248, 240, 0.05);
        }

        .mobile-link:hover {
          background: rgba(212, 175, 55, 0.15);
          color: #D4AF37;
          padding-left: 1.5rem;
        }

        .mobile-link.active {
          color: #D4AF37;
          background: rgba(212, 175, 55, 0.1);
        }

        .cart-mobile {
          position: relative;
        }

        .mobile-badge {
          margin-left: auto;
          background: #FF6B35;
          color: white;
          font-size: 0.8rem;
          font-weight: 700;
          padding: 0.2rem 0.8rem;
          border-radius: 20px;
        }

        /* ===== RESPONSIVE ===== */
        @media screen and (max-width: 768px) {
          .navbar {
            padding: 0 1rem;
            height: 65px;
          }

          .nav-menu {
            display: none;
          }

          .nav-toggle {
            display: block;
          }

          .mobile-menu {
            display: block;
          }

          .nav-brand {
            font-size: 1.4rem;
          }

          .nav-logo-img {
            height: 40px;
            width: 40px;
          }
        }

        @media screen and (max-width: 480px) {
          .nav-brand {
            font-size: 1.1rem;
          }
          
          .nav-logo-img {
            height: 35px;
            width: 35px;
          }

          .navbar {
            height: 60px;
            padding: 0 0.8rem;
          }

          .mobile-menu {
            top: 60px;
            padding: 1.5rem;
          }

          .mobile-link {
            font-size: 1.1rem;
            padding: 0.6rem 0.8rem;
          }
        }

        /* ===== SCROLL EFFECT ===== */
        .navbar.scrolled {
          background: rgba(44, 24, 16, 0.95);
          backdrop-filter: blur(10px);
          border-bottom-color: #FF6B35;
        }
      `}</style>
    </>
  );
};

export default Navbar;

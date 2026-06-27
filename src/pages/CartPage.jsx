import React, { useState } from 'react';
import OrderForm from '../components/OrderForm';
import { FiShoppingCart, FiArrowLeft, FiInfo } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const CartPage = () => {
  const [cartItems] = useState([
    {
      id: 1,
      name: 'Vanilla Bliss Candle',
      price: 499,
      quantity: 2,
      image: '/images/candles/vanilla.jpg'
    }
  ]);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="cart-page">
      <div className="container">
        {/* ===== PAGE HEADER ===== */}
        <div className="cart-header">
          <Link to="/" className="back-link">
            <FiArrowLeft /> Continue Shopping
          </Link>
          <h1 className="cart-title">
            <FiShoppingCart className="title-icon" />
            Checkout
          </h1>
          <div className="cart-summary-badge">
            {totalItems} {totalItems === 1 ? 'item' : 'items'} • ₹{totalPrice}
          </div>
        </div>

        {/* ===== ORDER FORM ===== */}
        <div className="cart-content">
          <OrderForm />
        </div>

        {/* ===== TRUST BADGES ===== */}
        <div className="trust-badges">
          <div className="trust-item">
            <span className="trust-icon">🔒</span>
            <span>Secure Checkout</span>
          </div>
          <div className="trust-item">
            <span className="trust-icon">🚚</span>
            <span>Free Delivery</span>
          </div>
          <div className="trust-item">
            <span className="trust-icon">💳</span>
            <span>COD Available</span>
          </div>
          <div className="trust-item">
            <span className="trust-icon">🔄</span>
            <span>Easy Returns</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .cart-page {
          min-height: 100vh;
          padding: 6rem 0 4rem;
          background: linear-gradient(135deg, #FFF8F0 0%, #F7E8D7 100%);
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        /* ===== HEADER ===== */
        .cart-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
          padding-bottom: 1.5rem;
          border-bottom: 2px solid rgba(44, 24, 16, 0.08);
          flex-wrap: wrap;
          gap: 1rem;
        }

        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #5A3D2E;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.3s ease;
        }

        .back-link:hover {
          color: #D4AF37;
        }

        .cart-title {
          font-size: 2rem;
          font-weight: 800;
          color: #2C1810;
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 0;
        }

        .title-icon {
          color: #D4AF37;
        }

        .cart-summary-badge {
          padding: 0.5rem 1.5rem;
          background: white;
          border-radius: 50px;
          color: #2C1810;
          font-weight: 600;
          box-shadow: 0 4px 15px rgba(44, 24, 16, 0.08);
        }

        /* ===== TRUST BADGES ===== */
        .trust-badges {
          display: flex;
          justify-content: center;
          gap: 2rem;
          margin-top: 2rem;
          padding-top: 2rem;
          border-top: 2px solid rgba(44, 24, 16, 0.05);
          flex-wrap: wrap;
        }

        .trust-item {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #5A3D2E;
          font-size: 0.9rem;
          font-weight: 500;
        }

        .trust-icon {
          font-size: 1.2rem;
        }

        /* ===== RESPONSIVE ===== */
        @media screen and (max-width: 768px) {
          .cart-page {
            padding: 5rem 0 2rem;
          }

          .container {
            padding: 0 1rem;
          }

          .cart-header {
            flex-direction: column;
            align-items: flex-start;
          }

          .cart-title {
            font-size: 1.6rem;
          }

          .cart-summary-badge {
            align-self: flex-start;
          }

          .trust-badges {
            gap: 1rem;
          }

          .trust-item {
            font-size: 0.8rem;
          }
        }

        @media screen and (max-width: 480px) {
          .trust-badges {
            grid-template-columns: 1fr 1fr;
            gap: 0.5rem;
          }

          .trust-item {
            justify-content: center;
            padding: 0.5rem;
            background: white;
            border-radius: 8px;
          }
        }
      `}</style>
    </div>
  );
};

export default CartPage;

import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Confetti from '../components/Confetti';
import { 
  FiCheckCircle, 
  FiHome, 
  FiPackage, 
  FiTruck, 
  FiMail, 
  FiDownload,
  FiShare2,
  FiHeart,
  FiClock
} from 'react-icons/fi';

const SuccessPage = () => {
  const location = useLocation();
  const [showConfetti, setShowConfetti] = useState(true);
  const [timeLeft, setTimeLeft] = useState('');

  // Get order data from navigation state
  const orderData = location.state?.orderData || {};
  const orderId = location.state?.orderId || 'ORD-' + Date.now().toString().slice(-6);

  // Fallback data if no state
  const displayData = {
    name: orderData.fullName || 'Customer',
    candle: orderData.selectedCandle?.label || 'Vanilla Bliss',
    quantity: orderData.quantity || 1,
    total: orderData.totalAmount || 499,
    address: orderData.address || '123, Street, City',
    email: orderData.email || 'customer@email.com',
    phone: orderData.phone || '9876543210'
  };

  // Estimated delivery time
  useEffect(() => {
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 5);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    setTimeLeft(deliveryDate.toLocaleDateString('en-US', options));
  }, []);

  // Share order
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'My Bloom & Aura Order',
        text: `I just ordered a ${displayData.candle} candle from Bloom & Aura! 🕯️✨`,
        url: window.location.href
      });
    }
  };

  return (
    <div className="success-page">
      {/* ===== CONFETTI ===== */}
      {showConfetti && (
        <Confetti 
          duration={6000}
          particleCount={200}
          onComplete={() => setShowConfetti(false)}
        />
      )}

      <div className="success-container">
        <div className="success-card">
          {/* ===== SUCCESS ICON ===== */}
          <div className="success-icon-wrapper">
            <FiCheckCircle className="success-icon" />
            <div className="success-ring"></div>
          </div>

          {/* ===== HEADER ===== */}
          <div className="success-header">
            <h1>🎉 Order Placed Successfully!</h1>
            <p className="order-id">
              Order # <strong>{orderId}</strong>
            </p>
            <p className="success-message">
              Thank you, <strong>{displayData.name}</strong>! Your order has been confirmed.
            </p>
          </div>

          {/* ===== ORDER SUMMARY ===== */}
          <div className="order-summary">
            <h3>
              <FiPackage className="summary-icon" />
              Order Summary
            </h3>
            
            <div className="summary-grid">
              <div className="summary-item">
                <span className="summary-label">Candle</span>
                <span className="summary-value">{displayData.candle}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Quantity</span>
                <span className="summary-value">× {displayData.quantity}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Total Amount</span>
                <span className="summary-value total-price">₹{displayData.total}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Payment</span>
                <span className="summary-value">Cash on Delivery</span>
              </div>
            </div>

            {/* ===== DELIVERY ADDRESS ===== */}
            <div className="delivery-address">
              <h4>📦 Delivery Address</h4>
              <p>{displayData.address}</p>
              <p className="phone-info">📞 {displayData.phone}</p>
              <p className="email-info">✉️ {displayData.email}</p>
            </div>

            {/* ===== DELIVERY INFO ===== */}
            <div className="delivery-info">
              <div className="delivery-item">
                <FiTruck className="delivery-icon" />
                <div>
                  <strong>Estimated Delivery</strong>
                  <span>{timeLeft}</span>
                </div>
              </div>
              <div className="delivery-item">
                <FiClock className="delivery-icon" />
                <div>
                  <strong>Order Status</strong>
                  <span>Confirmed ✓</span>
                </div>
              </div>
            </div>
          </div>

          {/* ===== ACTION BUTTONS ===== */}
          <div className="success-actions">
            <Link to="/" className="btn-primary">
              <FiHome /> Continue Shopping
            </Link>
            <button className="btn-secondary" onClick={handleShare}>
              <FiShare2 /> Share
            </button>
            <button className="btn-outline">
              <FiDownload /> Download Invoice
            </button>
          </div>

          {/* ===== CONFIRMATION NOTE ===== */}
          <div className="confirmation-note">
            <FiMail className="note-icon" />
            <p>
              A confirmation email has been sent to <strong>{displayData.email}</strong>.
              We'll notify you when your order ships!
            </p>
          </div>

          {/* ===== LOVE NOTE ===== */}
          <div className="love-note">
            <FiHeart className="love-icon" />
            <p>Thank you for choosing Bloom & Aura! 🕯️✨</p>
          </div>
        </div>
      </div>

      {/* ===== STYLES ===== */}
      <style jsx>{`
        .success-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #FFF8F0 0%, #F7E8D7 100%);
          padding: 6rem 2rem 2rem;
        }

        .success-container {
          width: 100%;
          max-width: 650px;
          margin: 0 auto;
        }

        /* ===== CARD ===== */
        .success-card {
          background: white;
          padding: 3rem;
          border-radius: 30px;
          box-shadow: 0 20px 60px rgba(44, 24, 16, 0.1);
          animation: slideUp 0.6s ease;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        /* ===== ICON ===== */
        .success-icon-wrapper {
          position: relative;
          display: flex;
          justify-content: center;
          margin-bottom: 1.5rem;
        }

        .success-icon {
          font-size: 5rem;
          color: #4CAF50;
          z-index: 2;
          animation: bounceIn 0.6s ease;
        }

        .success-ring {
          position: absolute;
          width: 100px;
          height: 100px;
          border-radius: 50%;
          border: 4px solid rgba(76, 175, 80, 0.15);
          animation: ringPulse 2s ease-in-out infinite;
        }

        @keyframes bounceIn {
          0% { transform: scale(0); opacity: 0; }
          50% { transform: scale(1.3); opacity: 1; }
          70% { transform: scale(0.9); }
          100% { transform: scale(1); }
        }

        @keyframes ringPulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.2); opacity: 0; }
        }

        /* ===== HEADER ===== */
        .success-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .success-header h1 {
          color: #2C1810;
          font-size: 2.2rem;
          margin-bottom: 0.3rem;
        }

        .order-id {
          color: #8B7355;
          font-size: 1.1rem;
        }

        .order-id strong {
          color: #D4AF37;
          font-weight: 700;
        }

        .success-message {
          color: #5A3D2E;
          margin-top: 0.5rem;
          font-size: 1.05rem;
        }

        .success-message strong {
          color: #2C1810;
        }

        /* ===== ORDER SUMMARY ===== */
        .order-summary {
          background: #FFF8F0;
          padding: 1.5rem;
          border-radius: 16px;
          margin-bottom: 2rem;
        }

        .order-summary h3 {
          display: flex;
          align-items: center;
          gap: 10px;
          color: #2C1810;
          margin-bottom: 1rem;
          font-size: 1.2rem;
        }

        .summary-icon {
          color: #D4AF37;
        }

        .summary-grid {
          display: grid;
          gap: 0.5rem;
        }

        .summary-item {
          display: flex;
          justify-content: space-between;
          padding: 0.5rem 0;
          border-bottom: 1px solid rgba(44, 24, 16, 0.05);
        }

        .summary-item:last-child {
          border-bottom: none;
        }

        .summary-label {
          color: #5A3D2E;
        }

        .summary-value {
          color: #2C1810;
          font-weight: 600;
        }

        .total-price {
          color: #D4AF37;
          font-size: 1.1rem;
        }

        /* ===== DELIVERY ADDRESS ===== */
        .delivery-address {
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 2px dashed rgba(44, 24, 16, 0.1);
        }

        .delivery-address h4 {
          color: #2C1810;
          margin-bottom: 0.3rem;
        }

        .delivery-address p {
          color: #5A3D2E;
          margin: 0.2rem 0;
        }

        .phone-info,
        .email-info {
          font-size: 0.9rem;
          color: #8B7355 !important;
        }

        /* ===== DELIVERY INFO ===== */
        .delivery-info {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 2px dashed rgba(44, 24, 16, 0.1);
        }

        .delivery-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 0.8rem;
          background: white;
          border-radius: 12px;
        }

        .delivery-icon {
          font-size: 1.5rem;
          color: #D4AF37;
        }

        .delivery-item div {
          display: flex;
          flex-direction: column;
        }

        .delivery-item strong {
          color: #2C1810;
          font-size: 0.85rem;
        }

        .delivery-item span {
          color: #5A3D2E;
          font-size: 0.85rem;
        }

        /* ===== ACTIONS ===== */
        .success-actions {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          margin-bottom: 1.5rem;
        }

        .btn-primary,
        .btn-secondary,
        .btn-outline {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 0.8rem 1.5rem;
          border-radius: 50px;
          font-weight: 600;
          text-decoration: none;
          cursor: pointer;
          transition: all 0.3s ease;
          border: none;
          flex: 1;
          min-width: 150px;
        }

        .btn-primary {
          background: linear-gradient(135deg, #D4AF37, #FF6B35);
          color: white;
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(212, 175, 55, 0.3);
        }

        .btn-secondary {
          background: #2C1810;
          color: white;
        }

        .btn-secondary:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(44, 24, 16, 0.2);
        }

        .btn-outline {
          background: transparent;
          color: #2C1810;
          border: 2px solid #2C1810;
        }

        .btn-outline:hover {
          background: #2C1810;
          color: white;
        }

        /* ===== CONFIRMATION NOTE ===== */
        .confirmation-note {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 1rem;
          background: rgba(212, 175, 55, 0.05);
          border-radius: 12px;
          margin-bottom: 1rem;
        }

        .note-icon {
          color: #D4AF37;
          font-size: 1.2rem;
          margin-top: 0.2rem;
        }

        .confirmation-note p {
          color: #5A3D2E;
          font-size: 0.95rem;
          margin: 0;
        }

        .confirmation-note strong {
          color: #2C1810;
        }

        /* ===== LOVE NOTE ===== */
        .love-note {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 1rem;
          background: linear-gradient(135deg, rgba(212, 175, 55, 0.05), rgba(255, 107, 53, 0.05));
          border-radius: 12px;
          border: 2px solid rgba(212, 175, 55, 0.1);
        }

        .love-icon {
          color: #FF6B35;
          font-size: 1.2rem;
          animation: heartbeat 1.5s ease-in-out infinite;
        }

        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }

        .love-note p {
          color: #2C1810;
          font-weight: 500;
          margin: 0;
        }

        /* ===== RESPONSIVE ===== */
        @media screen and (max-width: 768px) {
          .success-page {
            padding: 5rem 1rem 1rem;
          }

          .success-card {
            padding: 2rem;
          }

          .success-header h1 {
            font-size: 1.8rem;
          }

          .success-icon {
            font-size: 4rem;
          }

          .success-ring {
            width: 80px;
            height: 80px;
          }

          .delivery-info {
            grid-template-columns: 1fr;
          }

          .success-actions {
            flex-direction: column;
          }

          .btn-primary,
          .btn-secondary,
          .btn-outline {
            flex: none;
            width: 100%;
          }
        }

        @media screen and (max-width: 480px) {
          .success-card {
            padding: 1.5rem;
            border-radius: 20px;
          }

          .success-header h1 {
            font-size: 1.4rem;
          }

          .order-id {
            font-size: 0.95rem;
          }

          .summary-grid {
            font-size: 0.9rem;
          }

          .delivery-item {
            padding: 0.6rem;
          }
        }
      `}</style>
    </div>
  );
};

export default SuccessPage;

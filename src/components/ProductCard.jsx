import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingCart, FiHeart, FiStar, FiEye } from 'react-icons/fi';

const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  // Product data with fallback
  const {
    id,
    name = 'Handmade Candle',
    price = 499,
    image = '/images/candle-default.jpg',
    rating = 4.5,
    reviews = 120,
    fragrance = 'Vanilla',
    isNew = false,
    isBestSeller = false,
    discount = 0
  } = product || {};

  // Calculate discounted price
  const discountedPrice = discount > 0 
    ? Math.round(price - (price * discount / 100)) 
    : price;

  // Handle add to cart
  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
    
    // TODO: Cart context mein add karna hai
    console.log('Added to cart:', { id, name, price: discountedPrice });
  };

  // Handle like
  const handleLike = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  // Generate stars for rating
  const renderStars = () => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FiStar key={`star-${i}`} className="star-filled" />);
    }
    
    if (hasHalfStar) {
      stars.push(<FiStar key="half-star" className="star-half" />);
    }

    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FiStar key={`empty-${i}`} className="star-empty" />);
    }

    return stars;
  };

  return (
    <div 
      className="product-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* ===== PRODUCT IMAGE ===== */}
      <div className="product-image-wrapper">
        <Link to={`/product/${id}`} className="product-image-link">
          <img 
            src={image} 
            alt={name}
            className={`product-image ${isHovered ? 'zoomed' : ''}`}
            loading="lazy"
          />
        </Link>

        {/* ===== BADGES ===== */}
        <div className="product-badges">
          {isNew && <span className="badge-new">New</span>}
          {isBestSeller && <span className="badge-bestseller">⭐ Bestseller</span>}
          {discount > 0 && (
            <span className="badge-discount">-{discount}%</span>
          )}
        </div>

        {/* ===== QUICK ACTION BUTTONS ===== */}
        <div className={`quick-actions ${isHovered ? 'visible' : ''}`}>
          <button 
            className="quick-btn like-btn"
            onClick={handleLike}
            aria-label="Add to wishlist"
          >
            <FiHeart className={isLiked ? 'liked' : ''} />
          </button>
          <button 
            className="quick-btn view-btn"
            onClick={() => window.location.href = `/product/${id}`}
            aria-label="Quick view"
          >
            <FiEye />
          </button>
        </div>

        {/* ===== ADD TO CART OVERLAY ===== */}
        <button 
          className={`add-to-cart-overlay ${isHovered ? 'visible' : ''}`}
          onClick={handleAddToCart}
        >
          <FiShoppingCart />
          {isAdded ? 'Added ✓' : 'Add to Cart'}
        </button>
      </div>

      {/* ===== PRODUCT INFO ===== */}
      <div className="product-info">
        <div className="product-header">
          <Link to={`/product/${id}`} className="product-name">
            {name}
          </Link>
          <span className="product-fragrance">
            🌸 {fragrance}
          </span>
        </div>

        {/* ===== RATING ===== */}
        <div className="product-rating">
          <div className="stars">
            {renderStars()}
          </div>
          <span className="rating-text">
            ({reviews} reviews)
          </span>
        </div>

        {/* ===== PRICE ===== */}
        <div className="product-pricing">
          {discount > 0 ? (
            <>
              <span className="price-original">₹{price}</span>
              <span className="price-discounted">₹{discountedPrice}</span>
              <span className="price-save">Save ₹{price - discountedPrice}</span>
            </>
          ) : (
            <span className="price-current">₹{price}</span>
          )}
        </div>

        {/* ===== ADD TO CART BUTTON (Mobile) ===== */}
        <button 
          className="add-to-cart-mobile"
          onClick={handleAddToCart}
        >
          <FiShoppingCart />
          {isAdded ? 'Added ✓' : 'Add to Cart'}
        </button>
      </div>

      {/* ===== INLINE STYLES ===== */}
      <style jsx>{`
        /* ===== PRODUCT CARD ===== */
        .product-card {
          background: white;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 4px 15px rgba(44, 24, 16, 0.08);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
        }

        .product-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(44, 24, 16, 0.15);
        }

        /* ===== IMAGE WRAPPER ===== */
        .product-image-wrapper {
          position: relative;
          overflow: hidden;
          aspect-ratio: 1 / 1;
          background: #F7E8D7;
          cursor: pointer;
        }

        .product-image-link {
          display: block;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        .product-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .product-image.zoomed {
          transform: scale(1.1);
        }

        /* ===== BADGES ===== */
        .product-badges {
          position: absolute;
          top: 12px;
          left: 12px;
          display: flex;
          flex-direction: column;
          gap: 6px;
          z-index: 2;
        }

        .badge-new,
        .badge-bestseller,
        .badge-discount {
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          animation: slideIn 0.3s ease;
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .badge-new {
          background: #FF6B35;
          color: white;
        }

        .badge-bestseller {
          background: #D4AF37;
          color: white;
        }

        .badge-discount {
          background: #FF4444;
          color: white;
        }

        /* ===== QUICK ACTIONS ===== */
        .quick-actions {
          position: absolute;
          top: 12px;
          right: 12px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          opacity: 0;
          transform: translateX(20px);
          transition: all 0.3s ease;
          z-index: 2;
        }

        .quick-actions.visible {
          opacity: 1;
          transform: translateX(0);
        }

        .quick-btn {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          border: none;
          background: white;
          color: #2C1810;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          font-size: 1rem;
        }

        .quick-btn:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 20px rgba(0,0,0,0.15);
        }

        .like-btn .liked {
          color: #FF6B35;
          fill: #FF6B35;
        }

        .like-btn:hover {
          color: #FF6B35;
        }

        .view-btn:hover {
          color: #D4AF37;
        }

        /* ===== ADD TO CART OVERLAY ===== */
        .add-to-cart-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 14px;
          background: linear-gradient(0deg, rgba(44, 24, 16, 0.9) 0%, transparent 100%);
          color: white;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transform: translateY(100%);
          transition: transform 0.3s ease;
          z-index: 2;
          opacity: 0;
        }

        .add-to-cart-overlay.visible {
          transform: translateY(0);
          opacity: 1;
        }

        .add-to-cart-overlay:hover {
          background: linear-gradient(0deg, rgba(212, 175, 55, 0.95) 0%, rgba(212, 175, 55, 0.7) 100%);
        }

        .add-to-cart-overlay svg {
          font-size: 1.2rem;
        }

        /* ===== PRODUCT INFO ===== */
        .product-info {
          padding: 1.2rem;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .product-header {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .product-name {
          font-size: 1.1rem;
          font-weight: 600;
          color: #2C1810;
          text-decoration: none;
          transition: color 0.3s ease;
          line-height: 1.3;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .product-name:hover {
          color: #D4AF37;
        }

        .product-fragrance {
          font-size: 0.85rem;
          color: #8B7355;
          font-weight: 400;
        }

        /* ===== RATING ===== */
        .product-rating {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .stars {
          display: flex;
          gap: 2px;
        }

        .star-filled {
          color: #FFD700;
          fill: #FFD700;
        }

        .star-half {
          color: #FFD700;
          fill: #FFD700;
        }

        .star-empty {
          color: #D3D3D3;
        }

        .rating-text {
          font-size: 0.8rem;
          color: #8B7355;
        }

        /* ===== PRICING ===== */
        .product-pricing {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }

        .price-current {
          font-size: 1.3rem;
          font-weight: 700;
          color: #D4AF37;
        }

        .price-original {
          font-size: 1rem;
          color: #999;
          text-decoration: line-through;
        }

        .price-discounted {
          font-size: 1.3rem;
          font-weight: 700;
          color: #FF6B35;
        }

        .price-save {
          font-size: 0.8rem;
          font-weight: 600;
          color: #4CAF50;
          background: rgba(76, 175, 80, 0.1);
          padding: 2px 10px;
          border-radius: 12px;
        }

        /* ===== ADD TO CART MOBILE ===== */
        .add-to-cart-mobile {
          display: none;
          width: 100%;
          padding: 10px;
          background: linear-gradient(135deg, #D4AF37, #FF6B35);
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 0.95rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: 4px;
          gap: 8px;
          align-items: center;
          justify-content: center;
        }

        .add-to-cart-mobile:hover {
          transform: scale(1.02);
          box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);
        }

        .add-to-cart-mobile svg {
          font-size: 1.1rem;
        }

        /* ===== RESPONSIVE ===== */
        @media screen and (max-width: 768px) {
          .quick-actions {
            opacity: 1;
            transform: translateX(0);
          }

          .add-to-cart-overlay {
            display: none;
          }

          .add-to-cart-mobile {
            display: flex;
          }

          .product-card:hover {
            transform: translateY(-5px);
          }
        }

        @media screen and (max-width: 480px) {
          .product-info {
            padding: 0.8rem;
          }

          .product-name {
            font-size: 0.95rem;
          }

          .price-current,
          .price-discounted {
            font-size: 1.1rem;
          }

          .quick-btn {
            width: 32px;
            height: 32px;
            font-size: 0.85rem;
          }
        }

        /* ===== RIPPLE EFFECT ===== */
        .add-to-cart-overlay::after,
        .add-to-cart-mobile::after {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .add-to-cart-overlay:hover::after,
        .add-to-cart-mobile:hover::after {
          opacity: 1;
        }
      `}</style>
    </div>
  );
};

export default ProductCard;

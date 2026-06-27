import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import ProductCard from '../components/ProductCard';
import { FiArrowRight, FiShoppingBag, FiHeart, FiStar, FiTruck, FiShield, FiRefreshCw } from 'react-icons/fi';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');

  // Sample product data (backend se fetch karenge baad mein)
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setProducts([
        {
          id: 1,
          name: 'Vanilla Bliss Candle',
          price: 499,
          image: '/images/candles/vanilla.jpg',
          rating: 4.8,
          reviews: 234,
          fragrance: 'Vanilla',
          isNew: true,
          isBestSeller: true,
          discount: 20,
          category: 'floral'
        },
        {
          id: 2,
          name: 'Lavender Dream Candle',
          price: 599,
          image: '/images/candles/lavender.jpg',
          rating: 4.6,
          reviews: 189,
          fragrance: 'Lavender',
          isNew: false,
          isBestSeller: false,
          discount: 0,
          category: 'floral'
        },
        {
          id: 3,
          name: 'Rose Garden Candle',
          price: 699,
          image: '/images/candles/rose.jpg',
          rating: 4.9,
          reviews: 312,
          fragrance: 'Rose',
          isNew: true,
          isBestSeller: true,
          discount: 15,
          category: 'floral'
        },
        {
          id: 4,
          name: 'Jasmine Evening Candle',
          price: 549,
          image: '/images/candles/jasmine.jpg',
          rating: 4.4,
          reviews: 156,
          fragrance: 'Jasmine',
          isNew: false,
          isBestSeller: false,
          discount: 10,
          category: 'floral'
        },
        {
          id: 5,
          name: 'Sandalwood Serenity',
          price: 799,
          image: '/images/candles/sandalwood.jpg',
          rating: 4.7,
          reviews: 278,
          fragrance: 'Sandalwood',
          isNew: true,
          isBestSeller: true,
          discount: 25,
          category: 'woody'
        },
        {
          id: 6,
          name: 'Cinnamon Spice Candle',
          price: 449,
          image: '/images/candles/cinnamon.jpg',
          rating: 4.3,
          reviews: 98,
          fragrance: 'Cinnamon',
          isNew: false,
          isBestSeller: false,
          discount: 0,
          category: 'spicy'
        },
        {
          id: 7,
          name: 'Ocean Breeze Candle',
          price: 649,
          image: '/images/candles/ocean.jpg',
          rating: 4.5,
          reviews: 145,
          fragrance: 'Ocean Breeze',
          isNew: true,
          isBestSeller: false,
          discount: 10,
          category: 'fresh'
        },
        {
          id: 8,
          name: 'Honey & Oats Candle',
          price: 529,
          image: '/images/candles/honey.jpg',
          rating: 4.8,
          reviews: 201,
          fragrance: 'Honey & Oats',
          isNew: false,
          isBestSeller: true,
          discount: 15,
          category: 'gourmand'
        }
      ]);
      setLoading(false);
    }, 500);
  }, []);

  // Filter products by category
  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  // Categories
  const categories = [
    { id: 'all', label: 'All' },
    { id: 'floral', label: '🌸 Floral' },
    { id: 'woody', label: '🌳 Woody' },
    { id: 'spicy', label: '🌶️ Spicy' },
    { id: 'fresh', label: '🌊 Fresh' },
    { id: 'gourmand', label: '🍯 Gourmand' }
  ];

  // Features
  const features = [
    {
      icon: <FiTruck />,
      title: 'Free Delivery',
      description: 'Free delivery on all orders'
    },
    {
      icon: <FiShield />,
      title: '100% Natural',
      description: 'Made with natural wax and oils'
    },
    {
      icon: <FiRefreshCw />,
      title: 'Easy Returns',
      description: 'Hassle-free return policy'
    },
    {
      icon: <FiHeart />,
      title: 'Handcrafted',
      description: 'Made with love and care'
    }
  ];

  if (loading) {
    return (
      <div className="loading-page">
        <div className="loader">
          <div className="candle-loader"></div>
          <p>Loading our collection...</p>
        </div>
        <style jsx>{`
          .loading-page {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #FFF8F0;
            padding-top: 75px;
          }
          .loader {
            text-align: center;
          }
          .candle-loader {
            width: 40px;
            height: 80px;
            background: linear-gradient(180deg, #F5E6D3, #E8D5C4);
            border-radius: 20px 20px 10px 10px;
            margin: 0 auto 20px;
            position: relative;
            animation: glow 1.5s ease-in-out infinite;
          }
          .candle-loader::after {
            content: '';
            position: absolute;
            top: -30px;
            left: 50%;
            transform: translateX(-50%);
            width: 20px;
            height: 30px;
            background: linear-gradient(180deg, #FF6B35, #FFD700);
            border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
            animation: flicker 0.2s ease-in-out infinite alternate;
          }
          @keyframes glow {
            0%, 100% { box-shadow: 0 0 20px rgba(212, 175, 55, 0.2); }
            50% { box-shadow: 0 0 40px rgba(212, 175, 55, 0.4); }
          }
          @keyframes flicker {
            0% { transform: translateX(-50%) scaleY(1); }
            100% { transform: translateX(-50%) scaleY(0.9) rotate(2deg); }
          }
          .loader p {
            color: #5A3D2E;
            font-size: 1.1rem;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="homepage">
      {/* ===== HERO SECTION ===== */}
      <HeroSection />

      {/* ===== FEATURES BANNER ===== */}
      <section className="features-section">
        <div className="container">
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PRODUCTS SECTION ===== */}
      <section className="products-section" id="products">
        <div className="container">
          <div className="section-header">
            <div className="section-title-wrapper">
              <span className="section-badge">✨ Our Collection</span>
              <h2 className="section-title">Premium Handcrafted Candles</h2>
              <p className="section-subtitle">
                Each candle is carefully crafted with love and natural ingredients 
                to create a warm, inviting atmosphere in your home.
              </p>
            </div>
            <Link to="/products" className="view-all-btn">
              View All <FiArrowRight />
            </Link>
          </div>

          {/* ===== CATEGORY FILTERS ===== */}
          <div className="category-filters">
            {categories.map(cat => (
              <button
                key={cat.id}
                className={`filter-btn ${activeCategory === cat.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* ===== PRODUCTS GRID ===== */}
          <div className="products-grid">
            {filteredProducts.length > 0 ? (
              filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <div className="no-products">
                <p>No products found in this category</p>
              </div>
            )}
          </div>

          {/* ===== LOAD MORE ===== */}
          <div className="load-more-wrapper">
            <button className="load-more-btn">
              <FiShoppingBag /> Load More Products
            </button>
          </div>
        </div>
      </section>

      {/* ===== NEWSLETTER SECTION ===== */}
      <section className="newsletter-section">
        <div className="container">
          <div className="newsletter-content">
            <h2>Subscribe to Our Newsletter</h2>
            <p>Get updates on new products, exclusive offers, and candle care tips!</p>
            <div className="newsletter-form">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="newsletter-input"
              />
              <button className="newsletter-btn">Subscribe</button>
            </div>
          </div>
        </div>
      </section>

      {/* ===== STYLES ===== */}
      <style jsx>{`
        /* ===== HOMEPAGE ===== */
        .homepage {
          background: #FFF8F0;
        }

        .container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        /* ===== FEATURES SECTION ===== */
        .features-section {
          padding: 4rem 0;
          background: white;
          border-top: 1px solid rgba(44, 24, 16, 0.05);
          border-bottom: 1px solid rgba(44, 24, 16, 0.05);
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2rem;
        }

        .feature-card {
          text-align: center;
          padding: 1.5rem;
          transition: all 0.3s ease;
          border-radius: 16px;
        }

        .feature-card:hover {
          background: #FFF8F0;
          transform: translateY(-5px);
        }

        .feature-icon {
          font-size: 2.5rem;
          color: #D4AF37;
          margin-bottom: 0.5rem;
        }

        .feature-card h3 {
          color: #2C1810;
          font-size: 1.1rem;
          margin-bottom: 0.3rem;
        }

        .feature-card p {
          color: #8B7355;
          font-size: 0.9rem;
        }

        /* ===== PRODUCTS SECTION ===== */
        .products-section {
          padding: 5rem 0;
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 3rem;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .section-badge {
          display: inline-block;
          background: rgba(212, 175, 55, 0.1);
          color: #D4AF37;
          padding: 0.3rem 1rem;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }

        .section-title {
          font-size: 2.5rem;
          font-weight: 800;
          color: #2C1810;
          margin: 0;
        }

        .section-subtitle {
          color: #8B7355;
          font-size: 1.05rem;
          max-width: 550px;
          margin: 0.5rem 0 0;
        }

        .view-all-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 0.8rem 1.8rem;
          background: transparent;
          color: #2C1810;
          border: 2px solid #2C1810;
          border-radius: 50px;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.3s ease;
          white-space: nowrap;
        }

        .view-all-btn:hover {
          background: #2C1810;
          color: #FFF8F0;
          transform: translateY(-2px);
        }

        /* ===== CATEGORY FILTERS ===== */
        .category-filters {
          display: flex;
          gap: 0.8rem;
          flex-wrap: wrap;
          margin-bottom: 2.5rem;
          padding-bottom: 1rem;
          border-bottom: 2px solid rgba(44, 24, 16, 0.05);
        }

        .filter-btn {
          padding: 0.6rem 1.5rem;
          background: white;
          border: 2px solid #E8DDD0;
          border-radius: 50px;
          font-size: 0.95rem;
          font-weight: 500;
          color: #5A3D2E;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .filter-btn:hover {
          border-color: #D4AF37;
          color: #D4AF37;
        }

        .filter-btn.active {
          background: linear-gradient(135deg, #D4AF37, #FF6B35);
          color: white;
          border-color: transparent;
          box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);
        }

        /* ===== PRODUCTS GRID ===== */
        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 2rem;
        }

        .no-products {
          grid-column: 1 / -1;
          text-align: center;
          padding: 3rem;
          color: #8B7355;
        }

        /* ===== LOAD MORE ===== */
        .load-more-wrapper {
          text-align: center;
          margin-top: 3rem;
        }

        .load-more-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 0.8rem 2.5rem;
          background: white;
          border: 2px solid #D4AF37;
          border-radius: 50px;
          font-size: 1rem;
          font-weight: 600;
          color: #D4AF37;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .load-more-btn:hover {
          background: #D4AF37;
          color: white;
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(212, 175, 55, 0.2);
        }

        /* ===== NEWSLETTER ===== */
        .newsletter-section {
          padding: 5rem 0;
          background: linear-gradient(135deg, #2C1810 0%, #4A2A1A 100%);
        }

        .newsletter-content {
          text-align: center;
          max-width: 600px;
          margin: 0 auto;
        }

        .newsletter-content h2 {
          color: #FFF8F0;
          font-size: 2.2rem;
          margin-bottom: 0.5rem;
        }

        .newsletter-content p {
          color: #D4AF37;
          margin-bottom: 2rem;
        }

        .newsletter-form {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          justify-content: center;
        }

        .newsletter-input {
          flex: 1;
          min-width: 250px;
          padding: 0.8rem 1.5rem;
          border: none;
          border-radius: 50px;
          font-size: 1rem;
          outline: none;
        }

        .newsletter-input:focus {
          box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.3);
        }

        .newsletter-btn {
          padding: 0.8rem 2rem;
          background: linear-gradient(135deg, #D4AF37, #FF6B35);
          color: white;
          border: none;
          border-radius: 50px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .newsletter-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(212, 175, 55, 0.3);
        }

        /* ===== RESPONSIVE ===== */
        @media screen and (max-width: 1024px) {
          .features-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.5rem;
          }
        }

        @media screen and (max-width: 768px) {
          .section-title {
            font-size: 2rem;
          }

          .section-header {
            flex-direction: column;
            align-items: flex-start;
          }

          .products-grid {
            grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
          }

          .newsletter-form {
            flex-direction: column;
          }

          .newsletter-input {
            min-width: auto;
          }
        }

        @media screen and (max-width: 480px) {
          .container {
            padding: 0 1rem;
          }

          .features-grid {
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
          }

          .feature-card {
            padding: 1rem;
          }

          .feature-icon {
            font-size: 2rem;
          }

          .products-grid {
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
          }

          .section-title {
            font-size: 1.6rem;
          }

          .category-filters {
            gap: 0.5rem;
          }

          .filter-btn {
            padding: 0.4rem 1rem;
            font-size: 0.8rem;
          }
        }
      `}</style>
    </div>
  );
};

export default HomePage;

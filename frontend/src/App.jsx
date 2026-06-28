import React, { useState, useEffect, useCallback } from 'react';
import { Routes, Route, Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import { ShoppingCart, Plus, Minus, Star, Leaf, Clock, Shield, Gift, Heart, Menu, X, Check, ArrowLeft, Award, Users, Sparkles } from 'lucide-react';
import './style.css';

// ===== PRODUCT DATA =====
const PRODUCTS = [
  { id: 1, name: 'Vanilla Bliss', fragrance: 'Sweet Vanilla', price: 499, originalPrice: 624, discount: 20, isNew: true, isBestseller: true, rating: 4.8, reviews: 124, image: '/images/candles/vanilla.png', description: 'A warm, comforting scent that fills your home with the sweet aroma of Madagascar vanilla. Perfect for cozy evenings and relaxation.' },
  { id: 2, name: 'Lavender Dream', fragrance: 'Calming Lavender', price: 599, originalPrice: 599, discount: 0, isNew: false, isBestseller: true, rating: 4.6, reviews: 98, image: '/images/candles/lavender.png', description: 'Hand-poured with pure lavender essential oil from Provence. Creates a serene atmosphere for meditation and peaceful sleep.' },
  { id: 3, name: 'Rose Garden', fragrance: 'Fresh Rose', price: 699, originalPrice: 823, discount: 15, isNew: true, isBestseller: false, rating: 4.9, reviews: 156, image: '/images/candles/rose.png', description: 'The timeless elegance of fresh Bulgarian roses captured in a candle. Romantic and uplifting for any special occasion.' },
  { id: 4, name: 'Jasmine Evening', fragrance: 'Exotic Jasmine', price: 549, originalPrice: 610, discount: 10, isNew: false, isBestseller: false, rating: 4.7, reviews: 87, image: '/images/candles/jasmine.png', description: 'Intoxicating jasmine blossoms blended with subtle musk. An exotic fragrance that transforms your space into a luxurious retreat.' },
  { id: 5, name: 'Sandalwood Serenity', fragrance: 'Warm Sandalwood', price: 799, originalPrice: 1065, discount: 25, isNew: true, isBestseller: true, rating: 4.8, reviews: 203, image: '/images/candles/sandalwood.png', description: 'Rich, woody sandalwood from India. Grounding and spiritual, perfect for yoga practice and mindful moments.' },
  { id: 6, name: 'Cinnamon Spice', fragrance: 'Spicy Cinnamon', price: 449, originalPrice: 449, discount: 0, isNew: false, isBestseller: false, rating: 4.5, reviews: 76, image: '/images/candles/cinnamon.png', description: 'Warm cinnamon sticks with hints of clove and nutmeg. The perfect autumn and winter companion for festive gatherings.' },
  { id: 7, name: 'Ocean Breeze', fragrance: 'Fresh Ocean', price: 649, originalPrice: 721, discount: 10, isNew: true, isBestseller: false, rating: 4.7, reviews: 112, image: '/images/candles/ocean.png', description: 'Crisp sea salt and ocean mist with undertones of driftwood. Brings the freshness of the coast into your living space.' },
  { id: 8, name: 'Honey & Oats', fragrance: 'Sweet Honey', price: 529, originalPrice: 622, discount: 15, isNew: false, isBestseller: false, rating: 4.6, reviews: 94, image: '/images/candles/honey.png', description: 'Golden honey drizzled over toasted oats with a hint of vanilla. Warm, comforting, and utterly delicious for your senses.' }
];

const PINCODE_DATA = {
  '400001': { city: 'Mumbai', state: 'Maharashtra' },
  '400050': { city: 'Mumbai', state: 'Maharashtra' },
  '400053': { city: 'Mumbai', state: 'Maharashtra' },
  '110001': { city: 'Delhi', state: 'Delhi' },
  '110020': { city: 'Delhi', state: 'Delhi' },
  '110030': { city: 'Delhi', state: 'Delhi' },
  '560001': { city: 'Bengaluru', state: 'Karnataka' },
  '560034': { city: 'Bengaluru', state: 'Karnataka' },
  '560076': { city: 'Bengaluru', state: 'Karnataka' },
  '600001': { city: 'Chennai', state: 'Tamil Nadu' },
  '600020': { city: 'Chennai', state: 'Tamil Nadu' },
  '700001': { city: 'Kolkata', state: 'West Bengal' },
  '700020': { city: 'Kolkata', state: 'West Bengal' }
};

const OWNER_EMAIL = 'nimrahkhan40139@gmail.com';

// ===== STARS =====
const Stars = ({ rating }) => (
  <span className="stars">
    {'★'.repeat(Math.floor(rating))}
    {rating % 1 >= 0.5 ? '½' : ''}
    {'☆'.repeat(5 - Math.floor(rating) - (rating % 1 >= 0.5 ? 1 : 0))}
  </span>
);

// ===== NAVBAR =====
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="nav-brand">
          <img src="/logo.png" alt="Bloom and Aura" className="nav-logo" onError={(e) => e.target.style.display='none'} />
          <div>
            <span className="nav-brand-text">Bloom and Aura</span>
            <span className="nav-brand-tagline">blooming beauty, lasting aura</span>
          </div>
        </Link>
        <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <li><Link to="/" className={isActive('/') ? 'active' : ''} onClick={() => setMenuOpen(false)}>Home</Link></li>
          <li><Link to="/products" className={isActive('/products') ? 'active' : ''} onClick={() => setMenuOpen(false)}>Products</Link></li>
          <li><Link to="/about" className={isActive('/about') ? 'active' : ''} onClick={() => setMenuOpen(false)}>About</Link></li>
          <li><Link to="/history" className={isActive('/history') ? 'active' : ''} onClick={() => setMenuOpen(false)}>History</Link></li>
        </ul>
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </nav>
  );
};

// ===== HOME PAGE =====
const HomePage = () => {
  const navigate = useNavigate();

  return (
    <>
      <section className="hero" style={{ minHeight: '90vh' }}>
        <div className="hero-container">
          <div>
            <div className="hero-badge">
              <Leaf size={16} /> Premium Handmade Candles
            </div>
            <h1 className="hero-title">
              Blooming Beauty,<br />
              Lasting <span className="gradient-text">Aura</span>
            </h1>
            <p className="hero-desc">
              Discover our collection of handcrafted candles made with 100% natural soy wax 
              and premium essential oils. Each candle is carefully poured to create the 
              perfect ambiance for your home.
            </p>
            <div className="hero-buttons">
              <button className="btn btn-primary" onClick={() => navigate('/products')}>
                Shop Now <ShoppingCart size={18} />
              </button>
              <button className="btn btn-secondary" onClick={() => navigate('/about')}>
                Our Story
              </button>
            </div>
            <div className="hero-stats">
              <div className="stat-item">
                <div className="stat-number">500+</div>
                <div className="stat-label">Happy Customers</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">50+</div>
                <div className="stat-label">Premium Scents</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">100%</div>
                <div className="stat-label">Natural Wax</div>
              </div>
            </div>
          </div>
          <div className="hero-image-side">
            <img src="/images/home-candle.png" alt="Bloom and Aura" />
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--cream)' }}>
        <div className="section-container">
          <div className="section-header">
            <span className="section-label">Why Choose Us</span>
            <h2 className="section-title">Crafted with Love</h2>
            <p className="section-subtitle">Every candle tells a story of passion and perfection</p>
          </div>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon"><Leaf size={28} /></div>
              <h3>100% Natural</h3>
              <p>Pure soy wax with no harmful chemicals</p>
            </div>
            <div className="value-card">
              <div className="value-icon"><Heart size={28} /></div>
              <h3>Handcrafted</h3>
              <p>Each candle is poured by hand</p>
            </div>
            <div className="value-card">
              <div className="value-icon"><Clock size={28} /></div>
              <h3>Long Lasting</h3>
              <p>Up to 50 hours of burn time</p>
            </div>
            <div className="value-card">
              <div className="value-icon"><Gift size={28} /></div>
              <h3>Perfect Gift</h3>
              <p>Elegant packaging for any occasion</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

// ===== PRODUCT CARD =====
const ProductCard = ({ product, onOrder }) => {
  const navigate = useNavigate();

  return (
    <div className="product-card" style={{ cursor: 'pointer' }}>
      <div className="product-image-wrapper" onClick={() => navigate(`/products/${product.id}`)}>
        <img src={product.image} alt={product.name} className="product-image" onError={(e) => { e.target.src = '/logo.png'; }} />
      </div>
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-fragrance">{product.fragrance}</p>
        <div className="product-rating">
          <Stars rating={product.rating} />
          <span className="rating-count">({product.reviews})</span>
        </div>
        <div className="product-price-row">
          <span className="price-current">Rs.{product.price}</span>
          {product.originalPrice > product.price && (
            <span className="price-original">Rs.{product.originalPrice}</span>
          )}
          {product.discount > 0 && <span className="price-discount">-{product.discount}%</span>}
        </div>
        <button className="btn-add-cart" onClick={() => onOrder(product)}>
          <ShoppingCart size={18} /> Order Now
        </button>
      </div>
    </div>
  );
};

// ===== PRODUCTS PAGE =====
const ProductsPage = ({ onOrder }) => {
  return (
    <div className="products-section" style={{ paddingTop: '96px' }}>
      <div className="section-container">
        <div className="section-header">
          <span className="section-label">Collection</span>
          <h2 className="section-title">Our Products</h2>
          <p className="section-subtitle">Explore our premium handcrafted candles</p>
        </div>
        <div className="products-grid">
          {PRODUCTS.map(p => <ProductCard key={p.id} product={p} onOrder={onOrder} />)}
        </div>
      </div>
    </div>
  );
};

// ===== PRODUCT DETAIL PAGE =====
const ProductDetailPage = ({ onOrder }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = PRODUCTS.find(p => p.id === parseInt(id));

  if (!product) return (
    <div className="product-detail" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
      <div style={{ textAlign: 'center' }}>
        <h2>Product not found</h2>
        <button className="btn btn-primary" onClick={() => navigate('/products')} style={{ marginTop: '20px' }}>
          <ArrowLeft size={18} /> Back to Products
        </button>
      </div>
    </div>
  );

  return (
    <div className="product-detail">
      <div className="detail-container">
        <div className="detail-image-wrapper">
          <img src={product.image} alt={product.name} className="detail-image" onError={(e) => { e.target.src = '/logo.png'; }} />
        </div>
        <div className="detail-info">
          <div className="detail-breadcrumb">
            <Link to="/">Home</Link> / <Link to="/products">Products</Link> / <span>{product.name}</span>
          </div>
          <h1 className="detail-name">{product.name}</h1>
          <p className="detail-fragrance">{product.fragrance}</p>
          <div className="detail-rating">
            <Stars rating={product.rating} />
            <span>({product.reviews} reviews)</span>
          </div>
          <div className="detail-price-row">
            <span className="detail-price">Rs.{product.price}</span>
            {product.originalPrice > product.price && <span className="detail-original">Rs.{product.originalPrice}</span>}
            {product.discount > 0 && <span className="detail-discount">-{product.discount}% OFF</span>}
          </div>
          <p className="detail-description">{product.description}</p>
          <div className="detail-features">
            <div className="detail-feature"><div className="detail-feature-icon"><Clock size={18} /></div><span>50+ Hours Burn</span></div>
            <div className="detail-feature"><div className="detail-feature-icon"><Leaf size={18} /></div><span>Natural Soy Wax</span></div>
            <div className="detail-feature"><div className="detail-feature-icon"><Shield size={18} /></div><span>Non-Toxic</span></div>
            <div className="detail-feature"><div className="detail-feature-icon"><Gift size={18} /></div><span>Gift Ready</span></div>
          </div>
          <button className="btn btn-primary btn-large" onClick={() => onOrder(product)}>
            <ShoppingCart size={20} /> Order Now - Rs.{product.price}
          </button>
        </div>
      </div>
    </div>
  );
};

// ===== ORDER FORM PAGE =====
const OrderFormPage = ({ product, onSubmitOrder }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '', email: '', phone: '', address: '', landmark: '', pincode: '', city: '', state: '', quantity: 1, notes: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!product) {
    navigate('/products');
    return null;
  }

  const validate = () => {
    const errs = {};
    if (!formData.fullName.trim()) errs.fullName = 'Full name is required';
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errs.email = 'Valid email is required';
    if (!formData.phone.trim() || formData.phone.length !== 10) errs.phone = '10-digit phone number required';
    if (!formData.address.trim()) errs.address = 'Address is required';
    if (!formData.pincode.trim() || !PINCODE_DATA[formData.pincode]) errs.pincode = 'Enter valid pincode';
    if (!formData.city.trim()) errs.city = 'City is required';
    if (!formData.state.trim()) errs.state = 'State is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handlePincode = (val) => {
    const pin = val.replace(/\D/g, '').slice(0, 6);
    setFormData(prev => ({ ...prev, pincode: pin }));
    if (PINCODE_DATA[pin]) {
      setFormData(prev => ({ ...prev, pincode: pin, city: PINCODE_DATA[pin].city, state: PINCODE_DATA[pin].state }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    await onSubmitOrder({ ...formData, product, total: product.price * formData.quantity });
    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="success-page">
        <div className="success-card">
          <div className="success-icon"><Check size={40} /></div>
          <h2 className="success-title">Order Placed!</h2>
          <p className="success-text">Thank you for your order.</p>
          <p className="success-text">We will contact you shortly.</p>
          <button className="btn btn-primary" onClick={() => navigate('/products')} style={{ marginTop: '24px' }}>
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <h2 className="checkout-title">Place Your Order</h2>

        <div className="checkout-form" style={{ marginBottom: '24px', padding: '24px', display: 'flex', gap: '20px', alignItems: 'center' }}>
          <img src={product.image} alt={product.name} style={{ width: '100px', height: '100px', borderRadius: '12px', objectFit: 'cover' }} onError={(e) => { e.target.src = '/logo.png'; }} />
          <div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--brown)' }}>{product.name}</h3>
            <p style={{ color: 'var(--gray-500)' }}>{product.fragrance}</p>
            <p style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--brown)' }}>Rs.{product.price}</p>
          </div>
        </div>

        <form className="checkout-form" onSubmit={handleSubmit}>
          <div className="form-section">
            <h3 className="form-section-title">Product Quantity</h3>
            <div className="quantity-selector" style={{ marginBottom: '0' }}>
              <span className="qty-label">Quantity:</span>
              <div className="qty-control">
                <button type="button" className="qty-btn" onClick={() => setFormData(prev => ({ ...prev, quantity: Math.max(1, prev.quantity - 1) }))}><Minus size={16} /></button>
                <span className="qty-value">{formData.quantity}</span>
                <button type="button" className="qty-btn" onClick={() => setFormData(prev => ({ ...prev, quantity: prev.quantity + 1 }))}><Plus size={16} /></button>
              </div>
              <span style={{ fontWeight: 700, color: 'var(--brown)', marginLeft: '20px' }}>Total: Rs.{product.price * formData.quantity}</span>
            </div>
          </div>

          <div className="form-section">
            <h3 className="form-section-title">Personal Details</h3>
            <div className="form-grid">
              <div className="form-group full-width">
                <label className="form-label">Full Name <span>*</span></label>
                <input
                  className={`form-input ${errors.fullName ? 'error' : ''}`}
                  value={formData.fullName}
                  onChange={e => setFormData({...formData, fullName: e.target.value})}
                  placeholder="Enter your full name"
                />
                {errors.fullName && <span className="error-text show">{errors.fullName}</span>}
              </div>
              <div className="form-group">
                <label className="form-label">Email <span>*</span></label>
                <input
                  className={`form-input ${errors.email ? 'error' : ''}`}
                  type="email"
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                  placeholder="your@email.com"
                />
                {errors.email && <span className="error-text show">{errors.email}</span>}
              </div>
              <div className="form-group">
                <label className="form-label">Phone Number <span>*</span></label>
                <input
                  className={`form-input ${errors.phone ? 'error' : ''}`}
                  value={formData.phone}
                  onChange={e => setFormData({...formData, phone: e.target.value.replace(/\D/g, '').slice(0,10)})}
                  placeholder="9876543210"
                  maxLength={10}
                />
                {errors.phone && <span className="error-text show">{errors.phone}</span>}
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3 className="form-section-title">Shipping Address</h3>
            <div className="form-grid">
              <div className="form-group full-width">
                <label className="form-label">Complete Address <span>*</span></label>
                <textarea
                  className={`form-input ${errors.address ? 'error' : ''}`}
                  rows="2"
                  value={formData.address}
                  onChange={e => setFormData({...formData, address: e.target.value})}
                  placeholder="House no, Street, Area, Landmark..."
                  style={{ resize: 'vertical' }}
                />
                {errors.address && <span className="error-text show">{errors.address}</span>}
              </div>
              <div className="form-group">
                <label className="form-label">Pincode <span>*</span></label>
                <input
                  className={`form-input ${errors.pincode ? 'error' : ''}`}
                  value={formData.pincode}
                  onChange={e => handlePincode(e.target.value)}
                  placeholder="400001"
                  maxLength={6}
                />
                {errors.pincode && <span className="error-text show">{errors.pincode}</span>}
              </div>
              <div className="form-group">
                <label className="form-label">City <span>*</span></label>
                <input
                  className={`form-input ${errors.city ? 'error' : ''}`}
                  value={formData.city}
                  onChange={e => setFormData({...formData, city: e.target.value})}
                  placeholder="Auto-filled"
                  readOnly={!!PINCODE_DATA[formData.pincode]}
                />
                {errors.city && <span className="error-text show">{errors.city}</span>}
              </div>
              <div className="form-group">
                <label className="form-label">State <span>*</span></label>
                <input
                  className={`form-input ${errors.state ? 'error' : ''}`}
                  value={formData.state}
                  onChange={e => setFormData({...formData, state: e.target.value})}
                  placeholder="Auto-filled"
                  readOnly={!!PINCODE_DATA[formData.pincode]}
                />
                {errors.state && <span className="error-text show">{errors.state}</span>}
              </div>
              <div className="form-group full-width">
                <label className="form-label">Additional Notes</label>
                <textarea
                  className="form-input"
                  rows="2"
                  value={formData.notes}
                  onChange={e => setFormData({...formData, notes: e.target.value})}
                  placeholder="Any delivery instructions..."
                  style={{ resize: 'vertical' }}
                />
              </div>
            </div>
          </div>

          <button type="submit" className="btn btn-primary btn-checkout" disabled={loading}>
            {loading ? 'Placing Order...' : <>Place Order <Check size={18} /></>}
          </button>
        </form>
      </div>
    </div>
  );
};

// ===== ABOUT PAGE =====
const AboutPage = () => (
  <div className="about-page">
    <div className="about-hero">
      <h1 className="about-hero-title">Our Story</h1>
      <p className="about-hero-text">Crafting moments of tranquility, one candle at a time</p>
    </div>
    <div className="about-section">
      <div className="about-grid">
        <div className="about-image">
          <img src="/images/about.jpg" alt="About us" onError={(e) => e.target.style.display='none'} />
        </div>
        <div className="about-content">
          <h2>Passion in Every Pour</h2>
          <p>Bloom and Aura was born from a simple belief: everyone deserves a sanctuary. Our founder started making candles in a small kitchen, experimenting with natural soy wax and essential oils until the perfect blend was found.</p>
          <p>Today, we continue that tradition of handcrafted excellence. Each candle is poured by hand, using only the finest natural ingredients sourced from sustainable farms across India.</p>
          <p>From the first flicker to the last glow, we promise an experience that soothes the soul and elevates your space.</p>
        </div>
      </div>
    </div>
    <div className="about-section" style={{ background: 'var(--cream)' }}>
      <div className="values-grid">
        <div className="value-card">
          <div className="value-icon"><Award size={28} /></div>
          <h3>Premium Quality</h3>
          <p>Only the finest natural ingredients</p>
        </div>
        <div className="value-card">
          <div className="value-icon"><Users size={28} /></div>
          <h3>Community</h3>
          <p>Supporting local artisans</p>
        </div>
        <div className="value-card">
          <div className="value-icon"><Sparkles size={28} /></div>
          <h3>Innovation</h3>
          <p>Exploring new scents</p>
        </div>
        <div className="value-card">
          <div className="value-icon"><Heart size={28} /></div>
          <h3>Made with Love</h3>
          <p>From our family to yours</p>
        </div>
      </div>
    </div>
  </div>
);

// ===== HISTORY PAGE =====
const HistoryPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('bloomie-orders');
    if (saved) setOrders(JSON.parse(saved));
  }, []);

  if (orders.length === 0) return (
    <div className="history-page">
      <div className="history-container">
        <h2 className="history-title">Order History</h2>
        <div className="history-empty">
          <div style={{ fontSize: '4rem', marginBottom: '16px' }}>🕯️</div>
          <h3>No orders yet</h3>
          <p>Your completed orders will appear here</p>
          <button className="btn btn-primary" onClick={() => window.location.href = '/products'} style={{ marginTop: '20px' }}>
            Shop Now
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="history-page">
      <div className="history-container">
        <h2 className="history-title">Order History</h2>
        {orders.map((order, idx) => (
          <div className="history-card" key={idx}>
            <div className="history-header">
              <div>
                <span className="history-id">{order.id || 'BA' + Date.now()}</span>
                <span className="history-date" style={{ marginLeft: '16px' }}>{order.date || new Date().toLocaleDateString()}</span>
              </div>
              <span className="history-status status-pending">Processing</span>
            </div>
            <div className="history-items">
              <div className="history-item">
                <span>{order.product?.name} x {order.quantity}</span>
                <span>Rs.{order.total}</span>
              </div>
            </div>
            <div className="history-total"><span>Total</span><span>Rs.{order.total}</span></div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ===== MAIN APP =====
const App = () => {
  const [orderProduct, setOrderProduct] = useState(null);
  const navigate = useNavigate();

  const handleOrder = useCallback((product) => {
    setOrderProduct(product);
    navigate('/order');
  }, []);

  const handleSubmitOrder = useCallback(async (orderData) => {
    const orders = JSON.parse(localStorage.getItem('bloomie-orders') || '[]');
    orders.unshift({ 
      ...orderData, 
      id: 'BA' + Date.now().toString(36).toUpperCase(), 
      date: new Date().toLocaleDateString() 
    });
    localStorage.setItem('bloomie-orders', JSON.stringify(orders));

    try {
      await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...orderData,
          toEmail: OWNER_EMAIL,
          subject: `New Order - ${orderData.product.name} from ${orderData.fullName}`
        })
      });
    } catch (e) { 
      console.log('Email API failed, order saved locally', e); 
    }
  }, []);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage onOrder={handleOrder} />} />
        <Route path="/products/:id" element={<ProductDetailPage onOrder={handleOrder} />} />
        <Route path="/order" element={<OrderFormPage product={orderProduct} onSubmitOrder={handleSubmitOrder} />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/history" element={<HistoryPage />} />
      </Routes>
    </>
  );
};

export default App;

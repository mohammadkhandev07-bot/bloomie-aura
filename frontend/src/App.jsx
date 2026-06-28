import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Routes, Route, Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import { ShoppingCart, Trash2, Plus, Minus, Star, Leaf, Clock, Shield, Gift, Heart, Menu, X, Check, ArrowLeft, MapPin, Phone, Mail, Clock as ClockIcon, Package, Truck, Award, Users, Sparkles } from 'lucide-react';
import './style.css';

// ===== PRODUCT DATA =====
const PRODUCTS = [
  { id: 1, name: 'Vanilla Bliss', fragrance: 'Sweet Vanilla', price: 499, originalPrice: 624, discount: 20, isNew: true, isBestseller: true, rating: 4.8, reviews: 124, image: '/images/candles/vanilla.jpg', description: 'A warm, comforting scent that fills your home with the sweet aroma of Madagascar vanilla. Perfect for cozy evenings and relaxation.' },
  { id: 2, name: 'Lavender Dream', fragrance: 'Calming Lavender', price: 599, originalPrice: 599, discount: 0, isNew: false, isBestseller: true, rating: 4.6, reviews: 98, image: '/images/candles/lavender.jpg', description: 'Hand-poured with pure lavender essential oil from Provence. Creates a serene atmosphere for meditation and peaceful sleep.' },
  { id: 3, name: 'Rose Garden', fragrance: 'Fresh Rose', price: 699, originalPrice: 823, discount: 15, isNew: true, isBestseller: false, rating: 4.9, reviews: 156, image: '/images/candles/rose.jpg', description: 'The timeless elegance of fresh Bulgarian roses captured in a candle. Romantic and uplifting for any special occasion.' },
  { id: 4, name: 'Jasmine Evening', fragrance: 'Exotic Jasmine', price: 549, originalPrice: 610, discount: 10, isNew: false, isBestseller: false, rating: 4.7, reviews: 87, image: '/images/candles/jasmine.jpg', description: 'Intoxicating jasmine blossoms blended with subtle musk. An exotic fragrance that transforms your space into a luxurious retreat.' },
  { id: 5, name: 'Sandalwood Serenity', fragrance: 'Warm Sandalwood', price: 799, originalPrice: 1065, discount: 25, isNew: true, isBestseller: true, rating: 4.8, reviews: 203, image: '/images/candles/sandalwood.jpg', description: 'Rich, woody sandalwood from India. Grounding and spiritual, perfect for yoga practice and mindful moments.' },
  { id: 6, name: 'Cinnamon Spice', fragrance: 'Spicy Cinnamon', price: 449, originalPrice: 449, discount: 0, isNew: false, isBestseller: false, rating: 4.5, reviews: 76, image: '/images/candles/cinnamon.jpg', description: 'Warm cinnamon sticks with hints of clove and nutmeg. The perfect autumn and winter companion for festive gatherings.' },
  { id: 7, name: 'Ocean Breeze', fragrance: 'Fresh Ocean', price: 649, originalPrice: 721, discount: 10, isNew: true, isBestseller: false, rating: 4.7, reviews: 112, image: '/images/candles/ocean.jpg', description: 'Crisp sea salt and ocean mist with undertones of driftwood. Brings the freshness of the coast into your living space.' },
  { id: 8, name: 'Honey & Oats', fragrance: 'Sweet Honey', price: 529, originalPrice: 622, discount: 15, isNew: false, isBestseller: false, rating: 4.6, reviews: 94, image: '/images/candles/honey.jpg', description: 'Golden honey drizzled over toasted oats with a hint of vanilla. Warm, comforting, and utterly delicious for your senses.' }
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

// ===== CONFETTI =====
const Confetti = ({ active, onComplete }) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const colors = ['#D4AF37', '#FF6B35', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#F38181'];
    const particles = Array.from({ length: 200 }, () => ({
      x: Math.random() * canvas.width, y: -20,
      size: Math.random() * 10 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      speedY: Math.random() * 4 + 2,
      speedX: (Math.random() - 0.5) * 5,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 12,
      opacity: 1
    }));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let activeParticles = 0;
      particles.forEach(p => {
        if (p.opacity <= 0) return;
        activeParticles++;
        p.y += p.speedY; p.x += p.speedX;
        p.rotation += p.rotationSpeed;
        p.opacity -= 0.004;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.globalAlpha = Math.max(0, p.opacity);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();
      });
      if (activeParticles > 0) {
        animationRef.current = requestAnimationFrame(animate);
      } else { onComplete(); }
    };
    animate();
    return () => { if (animationRef.current) cancelAnimationFrame(animationRef.current); };
  }, [active, onComplete]);

  if (!active) return null;
  return <canvas ref={canvasRef} className="confetti-canvas" />;
};

// ===== STARS =====
const Stars = ({ rating }) => (
  <span className="stars">
    {'★'.repeat(Math.floor(rating))}
    {rating % 1 >= 0.5 ? '½' : ''}
    {'☆'.repeat(5 - Math.floor(rating) - (rating % 1 >= 0.5 ? 1 : 0))}
  </span>
);

// ===== NAVBAR =====
const Navbar = ({ cartCount }) => {
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
          <img src="/logo.png" alt="Bloom & Aura" className="nav-logo" onError={(e) => e.target.style.display='none'} />
          <div>
            <span className="nav-brand-text">Bloom & Aura</span>
            <span className="nav-brand-tagline">blooming beauty, lasting aura</span>
          </div>
        </Link>
        <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <li><Link to="/" className={isActive('/') ? 'active' : ''} onClick={() => setMenuOpen(false)}>Home</Link></li>
          <li><Link to="/products" className={isActive('/products') ? 'active' : ''} onClick={() => setMenuOpen(false)}>Products</Link></li>
          <li><Link to="/about" className={isActive('/about') ? 'active' : ''} onClick={() => setMenuOpen(false)}>About</Link></li>
          <li><Link to="/history" className={isActive('/history') ? 'active' : ''} onClick={() => setMenuOpen(false)}>History</Link></li>
          <li><Link to="/cart" className={isActive('/cart') ? 'active' : ''} onClick={() => setMenuOpen(false)}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ShoppingCart size={18} /> Cart
            </span>
          </Link></li>
        </ul>
        <Link to="/cart" className="nav-cart" style={{ marginRight: '16px' }}>
          <ShoppingCart size={20} />
          <span>Cart</span>
          {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
        </Link>
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </nav>
  );
};

// ===== HOME PAGE - CLEAN, NO CANDLE, NO SHOPPING =====
const HomePage = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* Hero - Left text, Right empty for your image */}
      <section className="hero" style={{ minHeight: '90vh' }}>
        <div className="hero-container">
          {/* LEFT SIDE - Text only */}
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

          {/* RIGHT SIDE - Khali jaga for your image */}
          <div className="hero-image-side">
            {/* Yahan apni image lagao */}
            {/* <img src="/images/home-candle.png" alt="Bloom & Aura" /> */}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section products-section">
        <div className="section-container">
          <div className="section-header">
            <span className="section-label">Featured</span>
            <h2 className="section-title">Our Bestsellers</h2>
            <p className="section-subtitle">Customer favorites that bring warmth and serenity to every home</p>
          </div>
          <div className="products-grid">
            {featured.map(p => <ProductCard key={p.id} product={p} onAdd={onAddToCart} />)}
          </div>
          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <button className="btn btn-secondary" onClick={() => navigate('/products')}>
              View All Products <ArrowLeft size={18} style={{ transform: 'rotate(180deg)' }} />
            </button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section" style={{ background: 'var(--cream)' }}>
        <div className="section-container">
          <div className="section-header">
            <span className="section-label">Why Us</span>
            <h2 className="section-title">Crafted with Care</h2>
            <p className="section-subtitle">Every candle tells a story of passion, quality, and attention to detail</p>
          </div>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon"><Leaf size={24} /></div>
              <h3>100% Natural</h3>
              <p>Pure soy wax with no harmful chemicals or additives</p>
            </div>
            <div className="value-card">
              <div className="value-icon"><Heart size={24} /></div>
              <h3>Hand-Poured</h3>
              <p>Each candle is crafted with love and precision</p>
            </div>
            <div className="value-card">
              <div className="value-icon"><ClockIcon size={24} /></div>
              <h3>Long Lasting</h3>
              <p>50+ hours of burn time for extended enjoyment</p>
            </div>
            <div className="value-card">
              <div className="value-icon"><Award size={24} /></div>
              <h3>Premium Quality</h3>
              <p>Only the finest essential oils and fragrances</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

// ===== PRODUCT CARD =====
const ProductCard = ({ product, onAdd }) => {
  const [added, setAdded] = useState(false);
  const navigate = useNavigate();

  const handleAdd = (e) => {
    e.stopPropagation();
    onAdd(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="product-card" onClick={() => navigate(`/product/${product.id}`)}>
      <div className="product-image-wrapper">
        <img src={product.image} alt={product.name} className="product-image"
          onError={(e) => { e.target.src = 'https://placehold.co/400x350/D4AF37/FFF?text=Bloom+%26+Aura'; }} />
        {product.isNew && <span className="product-badge badge-new">New</span>}
        {product.isBestseller && <span className="product-badge badge-bestseller" style={{ left: product.isNew ? '70px' : '16px' }}>Bestseller</span>}
        {product.discount > 0 && <span className="product-badge badge-discount" style={{ left: (product.isNew && product.isBestseller) ? '160px' : product.isNew || product.isBestseller ? '70px' : '16px' }}>-{product.discount}%</span>}
      </div>
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-fragrance">{product.fragrance}</p>
        <div className="product-rating">
          <Stars rating={product.rating} />
          <span className="rating-count">({product.reviews} reviews)</span>
        </div>
        <div className="product-price-row">
          {product.discount > 0 && <span className="price-original">₹{product.originalPrice}</span>}
          <span className="price-current">₹{product.price}</span>
          {product.discount > 0 && <span className="price-discount">{product.discount}% OFF</span>}
        </div>
        <button className={`btn-add-cart ${added ? 'added' : ''}`} onClick={handleAdd}>
          {added ? <><Check size={18} /> Added</> : <><ShoppingCart size={18} /> Add to Cart</>}
        </button>
      </div>
    </div>
  );
};

// ===== PRODUCTS PAGE =====
const ProductsPage = ({ onAddToCart }) => (
  <div style={{ paddingTop: '96px' }}>
    <section className="section products-section">
      <div className="section-container">
        <div className="section-header">
          <span className="section-label">Collection</span>
          <h2 className="section-title">All Products</h2>
          <p className="section-subtitle">Handcrafted with love, made for your soul</p>
        </div>
        <div className="products-grid">
          {PRODUCTS.map(p => <ProductCard key={p.id} product={p} onAdd={onAddToCart} />)}
        </div>
      </div>
    </section>
  </div>
);

// ===== PRODUCT DETAIL PAGE =====
const ProductDetailPage = ({ onAddToCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = PRODUCTS.find(p => p.id === parseInt(id));
  const [qty, setQty] = useState(1);

  if (!product) return <div className="product-detail"><div className="detail-container">Product not found</div></div>;

  return (
    <div className="product-detail">
      <div className="detail-container">
        <div className="detail-image-wrapper">
          <img src={product.image} alt={product.name} className="detail-image"
            onError={(e) => { e.target.src = 'https://placehold.co/600x600/D4AF37/FFF?text=Bloom+%26+Aura'; }} />
        </div>
        <div className="detail-info">
          <div className="detail-breadcrumb">
            <Link to="/">Home</Link> <span>/</span> <Link to="/products">Products</Link> <span>/</span> <span style={{ color: 'var(--gray-800)' }}>{product.name}</span>
          </div>
          {product.isNew && <span className="product-badge badge-new" style={{ position: 'static', display: 'inline-block', marginBottom: '12px' }}>New Arrival</span>}
          <h1 className="detail-name">{product.name}</h1>
          <p className="detail-fragrance">{product.fragrance} Fragrance</p>
          <div className="detail-rating">
            <Stars rating={product.rating} />
            <span style={{ color: 'var(--gray-500)', fontSize: '0.9rem' }}>{product.rating} ({product.reviews} reviews)</span>
          </div>
          <div className="detail-price-row">
            <span className="detail-price">₹{product.price}</span>
            {product.discount > 0 && <>
              <span className="detail-original">₹{product.originalPrice}</span>
              <span className="detail-discount">{product.discount}% OFF</span>
            </>}
          </div>
          <p className="detail-description">{product.description}</p>
          <div className="detail-features">
            <div className="detail-feature"><div className="detail-feature-icon"><Leaf size={18} /></div>100% Natural Soy Wax</div>
            <div className="detail-feature"><div className="detail-feature-icon"><ClockIcon size={18} /></div>50+ Hours Burn Time</div>
            <div className="detail-feature"><div className="detail-feature-icon"><Shield size={18} /></div>Non-Toxic & Safe</div>
            <div className="detail-feature"><div className="detail-feature-icon"><Gift size={18} /></div>Hand-Poured in India</div>
          </div>
          <div className="quantity-selector">
            <span className="qty-label">Quantity:</span>
            <div className="qty-control">
              <button className="qty-btn" onClick={() => setQty(Math.max(1, qty - 1))}><Minus size={16} /></button>
              <span className="qty-value">{qty}</span>
              <button className="qty-btn" onClick={() => setQty(Math.min(10, qty + 1))}><Plus size={16} /></button>
            </div>
          </div>
          <div className="detail-actions">
            <button className="btn btn-primary btn-large" onClick={() => { for(let i=0;i<qty;i++) onAddToCart(product); navigate('/cart'); }}>
              <ShoppingCart size={20} /> Add to Cart
            </button>
            <button className="btn btn-secondary btn-large" onClick={() => navigate('/cart')}>
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ===== CART PAGE =====
const CartPage = ({ cart, onUpdateQty, onRemove, onCheckout }) => {
  const navigate = useNavigate();
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shipping = subtotal > 500 ? 0 : 50;
  const total = subtotal + shipping;

  return (
    <div className="cart-page">
      <div className="cart-container">
        <h1 className="cart-title"><ShoppingCart size={28} /> Shopping Cart ({cart.length} items)</h1>
        {cart.length === 0 ? (
          <div className="cart-empty">
            <div className="cart-empty-icon">🛒</div>
            <h3>Your cart is empty</h3>
            <p>Add some beautiful candles to get started</p>
            <button className="btn btn-primary" onClick={() => navigate('/products')}>
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cart.map((item, idx) => (
                <div className="cart-item" key={idx}>
                  <img src={item.image} alt={item.name} className="cart-item-image"
                    onError={(e) => { e.target.src = 'https://placehold.co/120x120/D4AF37/FFF?text=Bloom'; }} />
                  <div className="cart-item-info">
                    <h4>{item.name}</h4>
                    <p>{item.fragrance}</p>
                    <div className="qty-control" style={{ marginTop: '12px' }}>
                      <button className="qty-btn" onClick={() => onUpdateQty(idx, Math.max(1, item.qty - 1))}><Minus size={14} /></button>
                      <span className="qty-value">{item.qty}</span>
                      <button className="qty-btn" onClick={() => onUpdateQty(idx, Math.min(10, item.qty + 1))}><Plus size={14} /></button>
                    </div>
                  </div>
                  <div className="cart-item-actions">
                    <span className="cart-item-price">₹{item.price * item.qty}</span>
                    <button className="btn-remove" onClick={() => onRemove(idx)}><Trash2 size={16} /> Remove</button>
                  </div>
                </div>
              ))}
            </div>
            <div className="cart-summary">
              <h3>Order Summary</h3>
              <div className="summary-row"><span>Subtotal</span><span>₹{subtotal}</span></div>
              <div className="summary-row"><span>Shipping</span><span>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span></div>
              <div className="summary-row"><span>Tax</span><span>Included</span></div>
              <div className="summary-row total"><span>Total</span><span>₹{total}</span></div>
              <button className="btn btn-primary btn-checkout" onClick={onCheckout}>
                Proceed to Checkout <ArrowLeft size={18} style={{ transform: 'rotate(180deg)' }} />
              </button>
              <button className="btn btn-secondary" style={{ width: '100%', marginTop: '12px' }} onClick={() => navigate('/products')}>
                Continue Shopping
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// ===== CHECKOUT PAGE =====
const CheckoutPage = ({ cart, onOrderSuccess }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '', email: '', phone: '', address: '', landmark: '', city: '', state: '', pincode: '', instructions: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shipping = subtotal > 500 ? 0 : 50;
  const total = subtotal + shipping;

  const handlePincode = (e) => {
    const code = e.target.value;
    setFormData(prev => ({ ...prev, pincode: code }));
    if (code.length === 6 && PINCODE_DATA[code]) {
      setFormData(prev => ({ ...prev, city: PINCODE_DATA[code].city, state: PINCODE_DATA[code].state }));
    }
  };

  const validate = () => {
    const err = {};
    if (formData.fullName.length < 3) err.fullName = 'Name must be at least 3 characters';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) err.email = 'Invalid email';
    if (!/^\d{10}$/.test(formData.phone)) err.phone = 'Phone must be 10 digits';
    if (formData.address.length < 5) err.address = 'Address must be at least 5 characters';
    if (!formData.city) err.city = 'City is required';
    if (!formData.state) err.state = 'State is required';
    if (!/^\d{6}$/.test(formData.pincode)) err.pincode = 'Pincode must be 6 digits';
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);

    const items = cart.map(item => ({ name: item.name, price: item.price, quantity: item.qty }));

    try {
      const res = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, items, totalAmount: total })
      });
      const data = await res.json();
      if (res.ok) {
        onOrderSuccess(data.orderId);
      } else {
        alert(data.errors?.join(', ') || 'Something went wrong');
      }
    } catch {
      const mockId = 'BLOOM-' + Math.random().toString(36).substr(2, 9).toUpperCase();
      onOrderSuccess(mockId);
    }
    setLoading(false);
  };

  if (cart.length === 0) {
    return (
      <div className="checkout-page">
        <div className="checkout-container">
          <div className="cart-empty">
            <div className="cart-empty-icon">🛒</div>
            <h3>Your cart is empty</h3>
            <button className="btn btn-primary" onClick={() => navigate('/products')}>Continue Shopping</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <h1 className="checkout-title">Checkout</h1>
        <form className="checkout-form" onSubmit={handleSubmit}>
          <div className="form-section">
            <h3 className="form-section-title">Contact Information</h3>
            <div className="form-grid">
              <div className="form-group full-width">
                <label className="form-label">Full Name <span>*</span></label>
                <input type="text" className={`form-input ${errors.fullName ? 'error' : formData.fullName ? 'success' : ''}`}
                  value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} placeholder="John Doe" />
                {errors.fullName && <span className="error-text show">{errors.fullName}</span>}
              </div>
              <div className="form-group">
                <label className="form-label">Email <span>*</span></label>
                <input type="email" className={`form-input ${errors.email ? 'error' : formData.email ? 'success' : ''}`}
                  value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} placeholder="john@example.com" />
                {errors.email && <span className="error-text show">{errors.email}</span>}
              </div>
              <div className="form-group">
                <label className="form-label">Phone <span>*</span></label>
                <input type="tel" className={`form-input ${errors.phone ? 'error' : formData.phone ? 'success' : ''}`}
                  value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value.replace(/\D/g, '').slice(0,10)})} placeholder="9876543210" maxLength={10} />
                {errors.phone && <span className="error-text show">{errors.phone}</span>}
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3 className="form-section-title">Shipping Address</h3>
            <div className="form-grid">
              <div className="form-group full-width">
                <label className="form-label">Address <span>*</span></label>
                <input type="text" className={`form-input ${errors.address ? 'error' : formData.address ? 'success' : ''}`}
                  value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} placeholder="123, Main Street, Apartment 4B" />
                {errors.address && <span className="error-text show">{errors.address}</span>}
              </div>
              <div className="form-group">
                <label className="form-label">Landmark</label>
                <input type="text" className="form-input" value={formData.landmark}
                  onChange={e => setFormData({...formData, landmark: e.target.value})} placeholder="Near City Mall" />
              </div>
              <div className="form-group">
                <label className="form-label">Pincode <span>*</span></label>
                <input type="text" className={`form-input ${errors.pincode ? 'error' : formData.pincode ? 'success' : ''}`}
                  value={formData.pincode} onChange={handlePincode} placeholder="400001" maxLength={6} />
                {errors.pincode && <span className="error-text show">{errors.pincode}</span>}
              </div>
              <div className="form-group">
                <label className="form-label">City <span>*</span></label>
                <input type="text" className={`form-input ${errors.city ? 'error' : formData.city ? 'success' : ''}`}
                  value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} placeholder="Auto-filled" readOnly={!!PINCODE_DATA[formData.pincode]} />
                {errors.city && <span className="error-text show">{errors.city}</span>}
              </div>
              <div className="form-group">
                <label className="form-label">State <span>*</span></label>
                <input type="text" className={`form-input ${errors.state ? 'error' : formData.state ? 'success' : ''}`}
                  value={formData.state} onChange={e => setFormData({...formData, state: e.target.value})} placeholder="Auto-filled" readOnly={!!PINCODE_DATA[formData.pincode]} />
                {errors.state && <span className="error-text show">{errors.state}</span>}
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3 className="form-section-title">Order Items</h3>
            <div className="checkout-items">
              {cart.map((item, idx) => (
                <div className="checkout-item" key={idx}>
                  <span>{item.name} x {item.qty}</span>
                  <span>₹{item.price * item.qty}</span>
                </div>
              ))}
              <div className="checkout-total"><span>Total</span><span>₹{total}</span></div>
            </div>
          </div>

          <div className="form-group full-width">
            <label className="form-label">Special Instructions</label>
            <textarea className="form-input" rows={3} value={formData.instructions}
              onChange={e => setFormData({...formData, instructions: e.target.value})} placeholder="Gift wrapping, message card, delivery instructions..." />
          </div>

          <button type="submit" className="btn btn-primary btn-checkout" disabled={loading}>
            {loading ? 'Processing...' : <>Place Order <Check size={18} /></>}
          </button>
        </form>
      </div>
    </div>
  );
};

// ===== SUCCESS PAGE =====
const SuccessPage = ({ orderId }) => {
  const navigate = useNavigate();
  return (
    <div className="success-page">
      <div className="success-card">
        <div className="success-icon"><Check size={40} /></div>
        <h2 className="success-title">Order Placed!</h2>
        <p className="success-text">Thank you for choosing Bloom & Aura.</p>
        <p className="success-text">Your candle is being crafted with love.</p>
        <div className="success-order-id">{orderId}</div>
        <p className="success-text" style={{ fontSize: '0.85rem', color: 'var(--gray-400)' }}>
          A confirmation email has been sent to you.
        </p>
        <button className="btn btn-primary" style={{ marginTop: '20px' }} onClick={() => navigate('/')}>
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

// ===== ABOUT PAGE =====
const AboutPage = () => (
  <div className="about-page">
    <div className="about-hero">
      <h1 className="about-hero-title">Our Story</h1>
      <p className="about-hero-text">Crafting moments of serenity, one candle at a time</p>
    </div>

    <section className="about-section">
      <div className="about-grid">
        <div className="about-image">
          <img src="/images/candles/sandalwood.jpg" alt="Our Craft" onError={(e) => e.target.src='https://placehold.co/600x400/D4AF37/FFF?text=Our+Story'} />
        </div>
        <div className="about-content">
          <h2>Handcrafted with Passion</h2>
          <p>Bloom & Aura was born from a simple belief: that every home deserves the warmth and tranquility of a perfectly crafted candle. Founded in 2020, we started as a small kitchen operation and have grown into a beloved brand across India.</p>
          <p>Each candle is hand-poured in small batches using 100% natural soy wax, premium essential oils, and cotton wicks. We never compromise on quality, ensuring every product meets our exacting standards.</p>
          <p>Our mission is to bring the art of candle-making to every Indian home, creating products that are not just beautiful but also safe, sustainable, and soul-soothing.</p>
        </div>
      </div>
    </section>

    <section className="about-section" style={{ background: 'var(--cream)' }}>
      <div className="section-container">
        <div className="section-header">
          <span className="section-label">Our Values</span>
          <h2 className="section-title">What We Stand For</h2>
        </div>
        <div className="values-grid">
          <div className="value-card">
            <div className="value-icon"><Leaf size={24} /></div>
            <h3>Sustainable</h3>
            <p>Eco-friendly materials and packaging that respect our planet</p>
          </div>
          <div className="value-card">
            <div className="value-icon"><Heart size={24} /></div>
            <h3>Authentic</h3>
            <p>Real essential oils, no synthetic fragrances ever</p>
          </div>
          <div className="value-card">
            <div className="value-icon"><Users size={24} /></div>
            <h3>Community</h3>
            <p>Supporting local artisans and small businesses</p>
          </div>
          <div className="value-card">
            <div className="value-icon"><Sparkles size={24} /></div>
            <h3>Quality</h3>
            <p>Rigorous testing ensures every candle is perfect</p>
          </div>
        </div>
      </div>
    </section>
  </div>
);

// ===== HISTORY PAGE =====
const HistoryPage = ({ orders }) => (
  <div className="history-page">
    <div className="history-container">
      <h1 className="history-title"><Package size={28} /> Order History</h1>
      {orders.length === 0 ? (
        <div className="history-empty">
          <div className="cart-empty-icon">📦</div>
          <h3>No orders yet</h3>
          <p>Your order history will appear here</p>
          <button className="btn btn-primary" onClick={() => window.location.href='/products'}>
            Start Shopping
          </button>
        </div>
      ) : (
        orders.map((order, idx) => (
          <div className="history-card" key={idx}>
            <div className="history-header">
              <div>
                <span className="history-id">{order.orderId}</span>
                <span className="history-date" style={{ marginLeft: '16px' }}>{new Date(order.createdAt).toLocaleDateString()}</span>
              </div>
              <span className={`history-status status-${order.status}`}>{order.status}</span>
            </div>
            <div className="history-items">
              {order.items.map((item, i) => (
                <div className="history-item" key={i}>
                  <span>{item.name} x {item.quantity}</span>
                  <span>₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>
            <div className="history-total">
              <span>Total</span>
              <span>₹{order.totalAmount}</span>
            </div>
          </div>
        ))
      )}
    </div>
  </div>
);

// ===== FOOTER =====
const Footer = () => (
  <footer className="footer">
    <div className="footer-container">
      <div className="footer-brand">
        <img src="/logo.png" alt="Bloom & Aura" className="footer-logo" onError={(e) => e.target.style.display='none'} />
        <h3 className="footer-brand-name">Bloom & Aura</h3>
        <p className="footer-desc">Premium handcrafted candles made with love and natural ingredients. Bringing warmth and serenity to every home since 2020.</p>
        <div className="social-icons">
          <a href="#" className="social-icon" aria-label="Instagram">📷</a>
          <a href="#" className="social-icon" aria-label="Facebook">📘</a>
          <a href="#" className="social-icon" aria-label="Twitter">🐦</a>
          <a href="#" className="social-icon" aria-label="Pinterest">📌</a>
        </div>
      </div>
      <div>
        <h4 className="footer-title">Quick Links</h4>
        <ul className="footer-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/products">Products</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/cart">Cart</Link></li>
        </ul>
      </div>
      <div>
        <h4 className="footer-title">Support</h4>
        <ul className="footer-links">
          <li><a href="#">FAQ</a></li>
          <li><a href="#">Shipping Info</a></li>
          <li><a href="#">Returns</a></li>
          <li><a href="#">Privacy Policy</a></li>
        </ul>
      </div>
      <div className="footer-contact">
        <h4 className="footer-title">Contact</h4>
        <p><MapPin size={16} /> 123 Candle Street, Mumbai</p>
        <p><Phone size={16} /> +91 98765 43210</p>
        <p><Mail size={16} /> hello@bloomandaura.com</p>
        <p><ClockIcon size={16} /> Mon-Sat: 10AM - 8PM</p>
      </div>
    </div>
    <div className="footer-bottom">
      <p>Made with ❤️ in India | Bloom & Aura © 2024</p>
    </div>
  </footer>
);

// ===== MAIN APP =====
function App() {
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [confettiActive, setConfettiActive] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const navigate = useNavigate();

  const addToCart = useCallback((product) => {
    setCart(prev => {
      const existing = prev.findIndex(item => item.id === product.id);
      if (existing >= 0) {
        const updated = [...prev];
        updated[existing].qty += 1;
        return updated;
      }
      return [...prev, { ...product, qty: 1 }];
    });
  }, []);

  const updateQty = useCallback((idx, qty) => {
    setCart(prev => {
      const updated = [...prev];
      updated[idx].qty = qty;
      return updated;
    });
  }, []);

  const removeFromCart = useCallback((idx) => {
    setCart(prev => prev.filter((_, i) => i !== idx));
  }, []);

  const handleOrderSuccess = (id) => {
    setOrderId(id);
    setConfettiActive(true);
    // Save order to history
    const orderItems = cart.map(item => ({ name: item.name, price: item.price, quantity: item.qty }));
    const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0) + (cart.reduce((sum, item) => sum + item.price * item.qty, 0) > 500 ? 0 : 50);
    setOrders(prev => [...prev, { orderId: id, items: orderItems, totalAmount: total, status: 'pending', createdAt: new Date().toISOString() }]);
    setCart([]);
    navigate('/success');
  };

  const handleConfettiComplete = () => setConfettiActive(false);

  return (
    <div className="app">
      <Navbar cartCount={cart.reduce((sum, item) => sum + item.qty, 0)} />
      <Routes>
        <Route path="/" element={<HomePage onAddToCart={addToCart} />} />
        <Route path="/products" element={<ProductsPage onAddToCart={addToCart} />} />
        <Route path="/product/:id" element={<ProductDetailPage onAddToCart={addToCart} />} />
        <Route path="/cart" element={<CartPage cart={cart} onUpdateQty={updateQty} onRemove={removeFromCart} onCheckout={() => navigate('/checkout')} />} />
        <Route path="/checkout" element={<CheckoutPage cart={cart} onOrderSuccess={handleOrderSuccess} />} />
        <Route path="/success" element={<SuccessPage orderId={orderId} />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/history" element={<HistoryPage orders={orders} />} />
      </Routes>
      <Footer />
      <Confetti active={confettiActive} onComplete={handleConfettiComplete} />
    </div>
  );
}

export default App;

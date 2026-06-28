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

// ===== HOME PAGE - FIXED =====
const HomePage = ({ onAddToCart }) => {
  const navigate = useNavigate();
  
  // Featured products = bestsellers
  const featured = PRODUCTS.filter(p => p.isBestseller);

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
            <img src="/images/home-candle.png" alt="Bloom & Aura" />
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

      {/* Features Section */}
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
              <p>Pure soy wax with no harmful chemicals or additives</p>
            </div>
            <div className="value-card">
              <div className="value-icon"><Heart size={28} /></div>
              <h3>Handcrafted</h3>
              <p>Each candle is poured by hand with attention to detail</p>
            </div>
            <div className="value-card">
              <div className="value-icon"><Clock size={28} /></div>
              <h3>Long Lasting</h3>
              <p>Up to 50 hours of burn time for extended enjoyment</p>
            </div>
            <div className="value-card">
              <div className="value-icon"><Gift size={28} /></div>
              <h3>Perfect Gift</h3>
              <p>Elegant packaging makes it ideal for any occasion</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

// ===== PRODUCT CARD =====
const ProductCard = ({ product, onAdd }) => {
  const navigate = useNavigate();
  const [added, setAdded] = useState(false);

  const handleAdd = (e) => {
    e.stopPropagation();
    onAdd(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const getBadge = () => {
    if (product.isNew) return <span className="product-badge badge-new">New</span>;
    if (product.discount > 0) return <span className="product-badge badge-discount">-{product.discount}%</span>;
    if (product.isBestseller) return <span className="product-badge badge-bestseller">Best</span>;
    return null;
  };

  return (
    <div className="product-card" onClick={() => navigate(`/products/${product.id}`)}>
      <div className="product-image-wrapper">
        {getBadge()}
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
          <span className="price-current">₹{product.price}</span>
          {product.originalPrice > product.price && (
            <span className="price-original">₹{product.originalPrice}</span>
          )}
          {product.discount > 0 && <span className="price-discount">-{product.discount}%</span>}
        </div>
        <button className={`btn-add-cart ${added ? 'added' : ''}`} onClick={handleAdd}>
          {added ? <><Check size={18} /> Added</> : <><ShoppingCart size={18} /> Add to Cart</>}
        </button>
      </div>
    </div>
  );
};

// ===== PRODUCTS PAGE =====
const ProductsPage = ({ onAddToCart }) => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all' ? PRODUCTS : PRODUCTS.filter(p => {
    if (filter === 'new') return p.isNew;
    if (filter === 'bestseller') return p.isBestseller;
    if (filter === 'discount') return p.discount > 0;
    return true;
  });

  const filters = [
    { key: 'all', label: 'All Products' },
    { key: 'new', label: 'New Arrivals' },
    { key: 'bestseller', label: 'Bestsellers' },
    { key: 'discount', label: 'On Sale' }
  ];

  return (
    <div className="products-section" style={{ paddingTop: '96px' }}>
      <div className="section-container">
        <div className="section-header">
          <span className="section-label">Collection</span>
          <h2 className="section-title">Our Products</h2>
          <p className="section-subtitle">Explore our premium handcrafted candles</p>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '40px', flexWrap: 'wrap' }}>
          {filters.map(f => (
            <button key={f.key} className={`btn ${filter === f.key ? 'btn-primary' : 'btn-secondary'}`} 
              onClick={() => setFilter(f.key)} style={{ padding: '10px 24px', fontSize: '0.9rem' }}>
              {f.label}
            </button>
          ))}
        </div>

        <div className="products-grid">
          {filtered.map(p => <ProductCard key={p.id} product={p} onAdd={onAddToCart} />)}
        </div>
      </div>
    </div>
  );
};

// ===== PRODUCT DETAIL PAGE =====
const ProductDetailPage = ({ onAddToCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = PRODUCTS.find(p => p.id === parseInt(id));
  const [qty, setQty] = useState(1);

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

  const related = PRODUCTS.filter(p => p.id !== product.id && p.fragrance === product.fragrance).slice(0, 3);

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
            <span className="detail-price">₹{product.price}</span>
            {product.originalPrice > product.price && <span className="detail-original">₹{product.originalPrice}</span>}
            {product.discount > 0 && <span className="detail-discount">-{product.discount}% OFF</span>}
          </div>
          <p className="detail-description">{product.description}</p>
          <div className="detail-features">
            <div className="detail-feature"><div className="detail-feature-icon"><Clock size={18} /></div><span>50+ Hours Burn</span></div>
            <div className="detail-feature"><div className="detail-feature-icon"><Leaf size={18} /></div><span>Natural Soy Wax</span></div>
            <div className="detail-feature"><div className="detail-feature-icon"><Shield size={18} /></div><span>Non-Toxic</span></div>
            <div className="detail-feature"><div className="detail-feature-icon"><Gift size={18} /></div><span>Gift Ready</span></div>
          </div>
          <div className="quantity-selector">
            <span className="qty-label">Quantity:</span>
            <div className="qty-control">
              <button className="qty-btn" onClick={() => setQty(Math.max(1, qty - 1))}><Minus size={16} /></button>
              <span className="qty-value">{qty}</span>
              <button className="qty-btn" onClick={() => setQty(qty + 1)}><Plus size={16} /></button>
            </div>
          </div>
          <div className="detail-actions">
            <button className="btn btn-primary btn-large" onClick={() => { for(let i=0;i<qty;i++) onAddToCart(product); }}>
              <ShoppingCart size={20} /> Add to Cart - ₹{product.price * qty}
            </button>
            <button className="btn btn-secondary btn-large" onClick={() => navigate('/cart')}>
              View Cart
            </button>
          </div>
        </div>
      </div>
      {related.length > 0 && (
        <div className="section-container" style={{ marginTop: '60px' }}>
          <h3 className="section-title" style={{ fontSize: '1.8rem', marginBottom: '32px' }}>You May Also Like</h3>
          <div className="products-grid">
            {related.map(p => <ProductCard key={p.id} product={p} onAdd={onAddToCart} />)}
          </div>
        </div>
      )}
    </div>
  );
};

// ===== CART PAGE =====
const CartPage = ({ cart, onUpdateQty, onRemove, onClear }) => {
  const navigate = useNavigate();
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  if (cart.length === 0) return (
    <div className="cart-page">
      <div className="cart-container">
        <h2 className="cart-title"><ShoppingCart size={28} /> Your Cart</h2>
        <div className="cart-empty">
          <div className="cart-empty-icon">🕯️</div>
          <h3>Your cart is empty</h3>
          <p>Discover our beautiful candles and add some to your cart</p>
          <button className="btn btn-primary" onClick={() => navigate('/products')}>Browse Products</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="cart-page">
      <div className="cart-container">
        <h2 className="cart-title"><ShoppingCart size={28} /> Your Cart ({cart.length})</h2>
        <div className="cart-items">
          {cart.map(item => (
            <div className="cart-item" key={item.id}>
              <img src={item.image} alt={item.name} className="cart-item-image" onError={(e) => { e.target.src = '/logo.png'; }} />
              <div className="cart-item-info">
                <h4>{item.name}</h4>
                <p>{item.fragrance}</p>
                <div className="qty-control" style={{ marginTop: '12px' }}>
                  <button className="qty-btn" onClick={() => onUpdateQty(item.id, Math.max(1, item.qty - 1))}><Minus size={14} /></button>
                  <span className="qty-value">{item.qty}</span>
                  <button className="qty-btn" onClick={() => onUpdateQty(item.id, item.qty + 1)}><Plus size={14} /></button>
                </div>
              </div>
              <div className="cart-item-actions">
                <span className="cart-item-price">₹{item.price * item.qty}</span>
                <button className="btn-remove" onClick={() => onRemove(item.id)}><Trash2 size={16} /> Remove</button>
              </div>
            </div>
          ))}
        </div>
        <div className="cart-summary">
          <h3>Order Summary</h3>
          <div className="summary-row"><span>Subtotal</span><span>₹{total}</span></div>
          <div className="summary-row"><span>Shipping</span><span>Free</span></div>
          <div className="summary-row total"><span>Total</span><span>₹{total}</span></div>
          <button className="btn btn-primary btn-checkout" onClick={() => navigate('/checkout')}>
            Proceed to Checkout
          </button>
          <button className="btn btn-secondary" style={{ width: '100%', marginTop: '12px' }} onClick={onClear}>
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
};

// ===== CHECKOUT PAGE =====
const CheckoutPage = ({ cart, onPlaceOrder }) => {
  const navigate = useNavigate();
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const [formData, setFormData] = useState({
    fullName: '', email: '', phone: '', address: '', landmark: '', pincode: '', city: '', state: '', notes: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formData.fullName.trim()) errs.fullName = 'Full name is required';
    if (!formData.email.trim() || !/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(formData.email)) errs.email = 'Valid email is required';
    if (!formData.phone.trim() || formData.phone.length !== 10) errs.phone = '10-digit phone number required';
    if (!formData.address.trim()) errs.address = 'Address is required';
    if (!formData.pincode.trim() || !PINCODE_DATA[formData.pincode]) errs.pincode = 'Enter valid pincode';
    if (!formData.city.trim()) errs.city = 'City is required';
    if (!formData.state.trim()) errs.state = 'State is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handlePincode = (val) => {
    const pin = val.replace(/\\D/g, '').slice(0, 6);
    setFormData({ ...formData, pincode: pin });
    if (PINCODE_DATA[pin]) {
      setFormData(prev => ({ ...prev, pincode: pin, city: PINCODE_DATA[pin].city, state: PINCODE_DATA[pin].state }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    await onPlaceOrder({ ...formData, items: cart, total });
    setLoading(false);
    navigate('/success');
  };

  if (cart.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <h2 className="checkout-title\">Checkout</h2>
        <form className="checkout-form" onSubmit={handleSubmit}>
          <div className="form-section">
            <h3 className="form-section-title\">Contact Information</h3>
            <div className="form-grid">
              <div className="form-group full-width">
                <label className="form-label\">Full Name <span>*</span></label>
                <input className={`form-input ${errors.fullName ? 'error' : ''}`} value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} placeholder="John Doe" />
                {errors.fullName && <span className="error-text show\">{errors.fullName}</span>}
              </div>
              <div className="form-group">
                <label className="form-label\">Email <span>*</span></label>
                <input className={`form-input ${errors.email ? 'error' : ''}`} type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} placeholder="john@example.com" />
                {errors.email && <span className="error-text show\">{errors.email}</span>}
              </div>
              <div className="form-group">
                <label className="form-label\">Phone <span>*</span></label>
                <input className={`form-input ${errors.phone ? 'error' : ''}`} value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value.replace(/\\D/g, '').slice(0,10)})} placeholder="9876543210" maxLength={10} />
                {errors.phone && <span className="error-text show\">{errors.phone}</span>}
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3 className="form-section-title\">Shipping Address</h3>
            <div className="form-grid">
              <div className="form-group full-width">
                <label className="form-label\">Address <span>*</span></label>
                <input className={`form-input ${errors.address ? 'error' : ''}`} value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} placeholder="123, Main Street, Apartment 4B" />
                {errors.address && <span className="error-text show\">{errors.address}</span>}
              </div>
              <div className="form-group full-width">
                <label className="form-label\">Landmark</label>
                <input className="form-input" value={formData.landmark} onChange={e => setFormData({...formData, landmark: e.target.value})} placeholder="Near City Mall" />
              </div>
              <div className="form-group">
                <label className="form-label\">Pincode <span>*</span></label>
                <input className={`form-input ${errors.pincode ? 'error' : ''}`} value={formData.pincode} onChange={e => handlePincode(e.target.value)} placeholder="400001" maxLength={6} />
                {errors.pincode && <span className="error-text show\">{errors.pincode}</span>}
              </div>
              <div className="form-group">
                <label className="form-label\">City <span>*</span></label>
                <input className={`form-input ${errors.city ? 'error' : ''}`} value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} placeholder="Auto-filled" readOnly={!!PINCODE_DATA[formData.pincode]} />
                {errors.city && <span className="error-text show\">{errors.city}</span>}
              </div>
              <div className="form-group">
                <label className="form-label\">State <span>*</span></label>
                <input className={`form-input ${errors.state ? 'error' : ''}`} value={formData.state} onChange={e => setFormData({...formData, state: e.target.value})} placeholder="Auto-filled" readOnly={!!PINCODE_DATA[formData.pincode]} />
                {errors.state && <span className="error-text show\">{errors.state}</span>}
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3 className="form-section-title\">Order Items</h3>
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
            <label className="form-label\">Special Instructions</label>
            <textarea className="form-input" rows="3" value={formData.notes} onChange={e => setFormData({...formData, notes: e.target.value})} placeholder="Any delivery instructions..." style={{ resize: 'vertical' }} />
          </div>

          <button type="submit" className="btn btn-primary btn-checkout" disabled={loading}>
            {loading ? 'Placing Order...' : <>Place Order <Check size={18} /></>}
          </button>
        </form>
      </div>
    </div>
  );
};

// ===== SUCCESS PAGE =====
const SuccessPage = () => {
  const navigate = useNavigate();
  const orderId = 'BA' + Date.now().toString(36).toUpperCase();

  return (
    <div className="success-page">
      <div className="success-card">
        <div className="success-icon\"><Check size={40} /></div>
        <h2 className="success-title\">Order Placed!</h2>
        <p className="success-text\">Thank you for your purchase.</p>
        <p className="success-text\">We've sent a confirmation to your email.</p>
        <div className="success-order-id\">{orderId}</div>
        <button className="btn btn-primary" onClick={() => navigate('/')} style={{ marginTop: '24px' }}>
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
      <h1 className="about-hero-title\">Our Story</h1>
      <p className="about-hero-text\">Crafting moments of tranquility, one candle at a time</p>
    </div>
    <div className="about-section">
      <div className="about-grid">
        <div className="about-image">
          <img src="/images/about.jpg" alt="About us" onError={(e) => e.target.style.display='none'} />
        </div>
        <div className="about-content">
          <h2>Passion in Every Pour</h2>
          <p>Bloom & Aura was born from a simple belief: everyone deserves a sanctuary. Our founder started making candles in a small kitchen, experimenting with natural soy wax and essential oils until the perfect blend was found.</p>
          <p>Today, we continue that tradition of handcrafted excellence. Each candle is poured by hand, using only the finest natural ingredients sourced from sustainable farms across India.</p>
          <p>From the first flicker to the last glow, we promise an experience that soothes the soul and elevates your space.</p>
        </div>
      </div>
    </div>
    <div className="about-section" style={{ background: 'var(--cream)' }}>
      <div className="values-grid">
        <div className="value-card">
          <div className="value-icon\"><Award size={28} /></div>
          <h3>Premium Quality</h3>
          <p>Only the finest natural ingredients make it into our candles</p>
        </div>
        <div className="value-card">
          <div className="value-icon\"><Users size={28} /></div>
          <h3>Community</h3>
          <p>Supporting local artisans and sustainable farming</p>
        </div>
        <div className="value-card">
          <div className="value-icon\"><Sparkles size={28} /></div>
          <h3>Innovation</h3>
          <p>Constantly exploring new scents and techniques</p>
        </div>
        <div className="value-card">
          <div className="value-icon\"><Heart size={28} /></div>
          <h3>Made with Love</h3>
          <p>Every candle is a labor of love from our family to yours</p>
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
        <h2 className="history-title\">Order History</h2>
        <div className="history-empty">
          <div style={{ fontSize: '4rem', marginBottom: '16px' }}>📦</div>
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
        <h2 className="history-title\">Order History</h2>
        {orders.map((order, idx) => (
          <div className="history-card" key={idx}>
            <div className="history-header">
              <div>
                <span className="history-id\">{order.id || 'BA' + Date.now()}</span>
                <span className="history-date\" style={{ marginLeft: '16px' }}>{order.date || new Date().toLocaleDateString()}</span>
              </div>
              <span className="history-status status-pending\">Processing</span>
            </div>
            <div className="history-items">
              {order.items?.map((item, i) => (
                <div className="history-item" key={i}>
                  <span>{item.name} x {item.qty}</span>
                  <span>₹{item.price * item.qty}</span>
                </div>
              ))}
            </div>
            <div className="history-total\"><span>Total</span><span>₹{order.total}</span></div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ===== MAIN APP =====
const App = () => {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('bloomie-cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    localStorage.setItem('bloomie-cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = useCallback((product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { ...product, qty: 1 }];
    });
  }, []);

  const updateQty = useCallback((id, qty) => {
    setCart(prev => prev.map(item => item.id === id ? { ...item, qty } : item));
  }, []);

  const removeFromCart = useCallback((id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const placeOrder = useCallback(async (orderData) => {
    const orders = JSON.parse(localStorage.getItem('bloomie-orders') || '[]');
    orders.unshift({ ...orderData, id: 'BA' + Date.now().toString(36).toUpperCase(), date: new Date().toLocaleDateString() });
    localStorage.setItem('bloomie-orders', JSON.stringify(orders));
    setCart([]);
    setShowConfetti(true);
    try {
      await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });
    } catch (e) { console.log('Email notification failed', e); }
  }, []);

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <>
      <Confetti active={showConfetti} onComplete={() => setShowConfetti(false)} />
      <Navbar cartCount={cartCount} />
      <Routes>
        <Route path="/" element={<HomePage onAddToCart={addToCart} />} />
        <Route path="/products" element={<ProductsPage onAddToCart={addToCart} />} />
        <Route path="/products/:id" element={<ProductDetailPage onAddToCart={addToCart} />} />
        <Route path="/cart" element={<CartPage cart={cart} onUpdateQty={updateQty} onRemove={removeFromCart} onClear={clearCart} />} />
        <Route path="/checkout" element={<CheckoutPage cart={cart} onPlaceOrder={placeOrder} />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/history" element={<HistoryPage />} />
      </Routes>
    </>
  );
};

export default App;

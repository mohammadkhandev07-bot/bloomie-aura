import React, { useState, useEffect, useRef, useCallback } from 'react';
import './style.css';

// ===== PRODUCT DATA =====
const PRODUCTS = [
  { id: 1, name: 'Vanilla Bliss', fragrance: 'Sweet Vanilla', price: 499, originalPrice: 624, discount: 20, isNew: true, rating: 4.8, reviews: 124, image: '/images/candles/vanilla.jpg' },
  { id: 2, name: 'Lavender Dream', fragrance: 'Calming Lavender', price: 599, originalPrice: 599, discount: 0, isNew: false, rating: 4.6, reviews: 98, image: '/images/candles/lavender.jpg' },
  { id: 3, name: 'Rose Garden', fragrance: 'Fresh Rose', price: 699, originalPrice: 823, discount: 15, isNew: true, rating: 4.9, reviews: 156, image: '/images/candles/rose.jpg' },
  { id: 4, name: 'Jasmine Evening', fragrance: 'Exotic Jasmine', price: 549, originalPrice: 610, discount: 10, isNew: false, rating: 4.7, reviews: 87, image: '/images/candles/jasmine.jpg' },
  { id: 5, name: 'Sandalwood Serenity', fragrance: 'Warm Sandalwood', price: 799, originalPrice: 1065, discount: 25, isNew: true, rating: 4.8, reviews: 203, image: '/images/candles/sandalwood.jpg' },
  { id: 6, name: 'Cinnamon Spice', fragrance: 'Spicy Cinnamon', price: 449, originalPrice: 449, discount: 0, isNew: false, rating: 4.5, reviews: 76, image: '/images/candles/cinnamon.jpg' },
  { id: 7, name: 'Ocean Breeze', fragrance: 'Fresh Ocean', price: 649, originalPrice: 721, discount: 10, isNew: true, rating: 4.7, reviews: 112, image: '/images/candles/ocean.jpg' },
  { id: 8, name: 'Honey & Oats', fragrance: 'Sweet Honey', price: 529, originalPrice: 622, discount: 15, isNew: false, rating: 4.6, reviews: 94, image: '/images/candles/honey.jpg' }
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

// ===== STARS COMPONENT =====
const Stars = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;
  return (
    <span className="stars">
      {'★'.repeat(fullStars)}
      {hasHalf ? '½' : ''}
      {'☆'.repeat(5 - fullStars - (hasHalf ? 1 : 0))}
    </span>
  );
};

// ===== CONFETTI COMPONENT =====
const Confetti = ({ active, onComplete }) => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animationRef = useRef(null);

  useEffect(() => {
    if (!active) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ['#D4AF37', '#FF6B35', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'];

    particlesRef.current = Array.from({ length: 150 }, () => ({
      x: Math.random() * canvas.width,
      y: -20,
      size: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      speedY: Math.random() * 3 + 2,
      speedX: (Math.random() - 0.5) * 4,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 10,
      opacity: 1
    }));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let activeParticles = 0;

      particlesRef.current.forEach(p => {
        if (p.opacity <= 0) return;
        activeParticles++;

        p.y += p.speedY;
        p.x += p.speedX;
        p.rotation += p.rotationSpeed;
        p.opacity -= 0.005;

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
      } else {
        onComplete();
      }
    };

    animate();

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [active, onComplete]);

  if (!active) return null;
  return <canvas ref={canvasRef} className="confetti-canvas" />;
};

// ===== NAVBAR =====
const Navbar = ({ cartCount, onNavigate }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <a href="#home" className="nav-brand" onClick={() => onNavigate('home')}>
        <img src="/logo.png" alt="Bloom & Aura" className="nav-logo" />
        <div>
          <span className="nav-brand-text">Bloom & Aura</span>
          <span className="nav-brand-tagline">blooming beauty, lasting aura</span>
        </div>
      </a>

      <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
        <li><a href="#home" onClick={() => { onNavigate('home'); setMenuOpen(false); }}>Home</a></li>
        <li><a href="#products" onClick={() => { onNavigate('products'); setMenuOpen(false); }}>Products</a></li>
        <li><a href="#order" onClick={() => { onNavigate('order'); setMenuOpen(false); }}>Order</a></li>
        <li className="nav-cart-badge">
          <a href="#order" onClick={() => { onNavigate('order'); setMenuOpen(false); }}>
            Cart 🛒
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </a>
        </li>
      </ul>

      <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </button>
    </nav>
  );
};

// ===== HERO SECTION =====
const HeroSection = ({ onShopNow }) => (
  <section id="home" className="hero">
    <div className="hero-container">
      <div className="hero-content">
        <span className="hero-badge">✨ Premium Handmade Candles</span>
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
          <button className="btn btn-primary" onClick={onShopNow}>
            Shop Now 🛍️
          </button>
          <a href="#products" className="btn btn-secondary">
            Learn More 📖
          </a>
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

      <div className="candle-visual">
        <div className="candle-container">
          <div className="candle-glow"></div>
          <div className="candle-flame"></div>
          <div className="candle-wick"></div>
          <div className="candle-body"></div>
          <div className="candle-plate"></div>
        </div>
      </div>
    </div>
  </section>
);

// ===== PRODUCT CARD =====
const ProductCard = ({ product, onAddToCart }) => {
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    onAddToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="product-card">
      <div className="product-image-wrapper">
        <img src={product.image} alt={product.name} className="product-image" 
             onError={(e) => { e.target.src = 'https://via.placeholder.com/300x250/D4AF37/FFF?text=Bloom+%26+Aura'; }} />
        {product.isNew && <span className="product-badge badge-new">NEW</span>}
        {product.discount > 0 && <span className="product-badge badge-discount" style={{left: product.isNew ? '5rem' : '1rem'}}>-{product.discount}%</span>}
      </div>
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-fragrance">{product.fragrance}</p>
        <div className="product-rating">
          <Stars rating={product.rating} />
          <span className="rating-text">({product.reviews})</span>
        </div>
        <div className="product-price-row">
          {product.discount > 0 && <span className="price-original">₹{product.originalPrice}</span>}
          <span className={product.discount > 0 ? 'price-discounted' : 'price-current'}>₹{product.price}</span>
        </div>
        <button className={`btn-add-cart ${added ? 'added' : ''}`} onClick={handleAdd}>
          {added ? '✓ Added!' : '🛒 Add to Cart'}
        </button>
      </div>
    </div>
  );
};

// ===== PRODUCTS SECTION =====
const ProductsSection = ({ onAddToCart }) => (
  <section id="products" className="products-section">
    <div className="section-header">
      <h2 className="section-title">Our Collection</h2>
      <p className="section-subtitle">Handcrafted with love, made for your soul</p>
    </div>
    <div className="products-grid">
      {PRODUCTS.map(product => (
        <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
      ))}
    </div>
  </section>
);

// ===== ORDER FORM =====
const OrderForm = ({ cart, onOrderSuccess }) => {
  const [formData, setFormData] = useState({
    fullName: '', email: '', phone: '', address: '', landmark: '',
    city: '', state: '', pincode: '', candleId: '', quantity: 1, instructions: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [selectedCandle, setSelectedCandle] = useState(null);

  useEffect(() => {
    if (cart.length > 0) {
      const lastItem = cart[cart.length - 1];
      setSelectedCandle(lastItem);
      setFormData(prev => ({ ...prev, candleId: lastItem.id.toString() }));
    }
  }, [cart]);

  const handlePincodeChange = (e) => {
    const code = e.target.value;
    setFormData(prev => ({ ...prev, pincode: code }));

    if (code.length === 6 && PINCODE_DATA[code]) {
      setFormData(prev => ({
        ...prev,
        city: PINCODE_DATA[code].city,
        state: PINCODE_DATA[code].state
      }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (formData.fullName.length < 3) newErrors.fullName = 'Name must be at least 3 characters';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email address';
    if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = 'Phone must be 10 digits';
    if (formData.address.length < 5) newErrors.address = 'Address must be at least 5 characters';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.state) newErrors.state = 'State is required';
    if (!/^\d{6}$/.test(formData.pincode)) newErrors.pincode = 'Pincode must be 6 digits';
    if (!formData.candleId) newErrors.candleId = 'Please select a candle';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    try {
      const response = await fetch('https://bloom-aura-backend.onrender.com/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        onOrderSuccess(data.orderId || 'ORD-' + Date.now());
        setFormData({
          fullName: '', email: '', phone: '', address: '', landmark: '',
          city: '', state: '', pincode: '', candleId: '', quantity: 1, instructions: ''
        });
        setSelectedCandle(null);
      } else {
        alert(data.error || 'Something went wrong');
      }
    } catch (err) {
      // Fallback for demo without backend
      const mockOrderId = 'BLOOM-' + Math.random().toString(36).substr(2, 9).toUpperCase();
      onOrderSuccess(mockOrderId);
      setFormData({
        fullName: '', email: '', phone: '', address: '', landmark: '',
        city: '', state: '', pincode: '', candleId: '', quantity: 1, instructions: ''
      });
      setSelectedCandle(null);
    }

    setLoading(false);
  };

  const candle = PRODUCTS.find(p => p.id.toString() === formData.candleId);
  const subtotal = candle ? candle.price * formData.quantity : 0;
  const shipping = subtotal > 500 ? 0 : 50;
  const total = subtotal + shipping;

  return (
    <section id="order" className="order-section">
      <div className="order-container">
        <h2 className="order-title">Place Your Order 🕯️</h2>
        <form className="order-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Full Name <span>*</span></label>
            <input type="text" className={`form-input ${errors.fullName ? 'error' : formData.fullName ? 'success' : ''}`}
                   value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})}
                   placeholder="John Doe" />
            {errors.fullName && <span className="error-text show">{errors.fullName}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">Email <span>*</span></label>
            <input type="email" className={`form-input ${errors.email ? 'error' : formData.email ? 'success' : ''}`}
                   value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                   placeholder="john@example.com" />
            {errors.email && <span className="error-text show">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">Phone <span>*</span></label>
            <input type="tel" className={`form-input ${errors.phone ? 'error' : formData.phone ? 'success' : ''}`}
                   value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value.replace(/\D/g, '').slice(0,10)})}
                   placeholder="9876543210" maxLength={10} />
            {errors.phone && <span className="error-text show">{errors.phone}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">Pincode <span>*</span></label>
            <input type="text" className={`form-input ${errors.pincode ? 'error' : formData.pincode ? 'success' : ''}`}
                   value={formData.pincode} onChange={handlePincodeChange}
                   placeholder="400001" maxLength={6} />
            {errors.pincode && <span className="error-text show">{errors.pincode}</span>}
          </div>

          <div className="form-group full-width">
            <label className="form-label">Address <span>*</span></label>
            <input type="text" className={`form-input ${errors.address ? 'error' : formData.address ? 'success' : ''}`}
                   value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})}
                   placeholder="123, Main Street, Apartment 4B" />
            {errors.address && <span className="error-text show">{errors.address}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">Landmark</label>
            <input type="text" className="form-input" value={formData.landmark}
                   onChange={e => setFormData({...formData, landmark: e.target.value})}
                   placeholder="Near City Mall" />
          </div>

          <div className="form-group">
            <label className="form-label">City <span>*</span></label>
            <input type="text" className={`form-input ${errors.city ? 'error' : formData.city ? 'success' : ''}`}
                   value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})}
                   placeholder="Auto-filled from pincode" readOnly={!!PINCODE_DATA[formData.pincode]} />
            {errors.city && <span className="error-text show">{errors.city}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">State <span>*</span></label>
            <input type="text" className={`form-input ${errors.state ? 'error' : formData.state ? 'success' : ''}`}
                   value={formData.state} onChange={e => setFormData({...formData, state: e.target.value})}
                   placeholder="Auto-filled from pincode" readOnly={!!PINCODE_DATA[formData.pincode]} />
            {errors.state && <span className="error-text show">{errors.state}</span>}
          </div>

          <div className="form-group full-width">
            <label className="form-label">Select Candle <span>*</span></label>
            <select className={`form-input ${errors.candleId ? 'error' : formData.candleId ? 'success' : ''}`}
                    value={formData.candleId} onChange={e => {
                      setFormData({...formData, candleId: e.target.value});
                      setSelectedCandle(PRODUCTS.find(p => p.id.toString() === e.target.value));
                    }}>
              <option value="">Choose your candle...</option>
              {PRODUCTS.map(p => (
                <option key={p.id} value={p.id}>{p.name} - ₹{p.price}</option>
              ))}
            </select>
            {errors.candleId && <span className="error-text show">{errors.candleId}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">Quantity</label>
            <div className="quantity-control">
              <button type="button" className="qty-btn" onClick={() => setFormData({...formData, quantity: Math.max(1, formData.quantity - 1)})}>-</button>
              <span className="qty-value">{formData.quantity}</span>
              <button type="button" className="qty-btn" onClick={() => setFormData({...formData, quantity: Math.min(10, formData.quantity + 1)})}>+</button>
            </div>
          </div>

          <div className="form-group full-width">
            <label className="form-label">Special Instructions</label>
            <textarea className="form-input" rows={3} value={formData.instructions}
                      onChange={e => setFormData({...formData, instructions: e.target.value})}
                      placeholder="Gift wrapping, message card, etc." />
          </div>

          <div className="price-summary">
            <div className="price-row">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="price-row">
              <span>Shipping</span>
              <span>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
            </div>
            <div className="price-row total">
              <span>Total</span>
              <span>₹{total}</span>
            </div>
          </div>

          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? 'Processing... ⏳' : 'Place Order ✨'}
          </button>
        </form>
      </div>
    </section>
  );
};

// ===== FOOTER =====
const Footer = () => (
  <footer className="footer">
    <div className="footer-container">
      <div className="footer-brand">
        <img src="/logo.png" alt="Bloom & Aura" className="footer-logo" />
        <h3 className="footer-brand-name">Bloom & Aura</h3>
        <p className="footer-desc">
          Premium handcrafted candles made with love and natural ingredients. 
          Bringing warmth and serenity to every home since 2020.
        </p>
        <div className="social-icons">
          <a href="#" className="social-icon" aria-label="Instagram">📷</a>
          <a href="#" className="social-icon" aria-label="Facebook">📘</a>
          <a href="#" className="social-icon" aria-label="Twitter">🐦</a>
          <a href="#" className="social-icon" aria-label="Pinterest">📌</a>
        </div>
      </div>

      <div className="footer-col">
        <h4 className="footer-title">Quick Links</h4>
        <ul className="footer-links">
          <li><a href="#home">Home</a></li>
          <li><a href="#products">Products</a></li>
          <li><a href="#order">Order Now</a></li>
          <li><a href="#">About Us</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </div>

      <div className="footer-col">
        <h4 className="footer-title">Support</h4>
        <ul className="footer-links">
          <li><a href="#">FAQ</a></li>
          <li><a href="#">Shipping Info</a></li>
          <li><a href="#">Returns</a></li>
          <li><a href="#">Privacy Policy</a></li>
          <li><a href="#">Terms of Service</a></li>
        </ul>
      </div>

      <div className="footer-col footer-contact">
        <h4 className="footer-title">Contact Us</h4>
        <p>📍 123 Candle Street, Mumbai</p>
        <p>📞 +91 98765 43210</p>
        <p>✉️ hello@bloomandaura.com</p>
        <p>🕐 Mon-Sat: 10AM - 8PM</p>
      </div>
    </div>

    <div className="footer-bottom">
      <p>Made with ❤️ in India | Bloom & Aura © 2024</p>
    </div>
  </footer>
);

// ===== FLOATING NAV =====
const FloatingNav = ({ activeSection, onCelebrate }) => (
  <div className="floating-nav">
    <a href="#home" className={`float-btn ${activeSection === 'home' ? 'active' : ''}`}>
      <span>🏠</span>
      <span>Home</span>
    </a>
    <a href="#products" className={`float-btn ${activeSection === 'products' ? 'active' : ''}`}>
      <span>🕯️</span>
      <span>Products</span>
    </a>
    <a href="#order" className={`float-btn ${activeSection === 'order' ? 'active' : ''}`}>
      <span>🛒</span>
      <span>Cart</span>
    </a>
    <button className="float-btn" onClick={onCelebrate}>
      <span>🎉</span>
      <span>Celebrate</span>
    </button>
  </div>
);

// ===== SUCCESS MODAL =====
const SuccessModal = ({ orderId, onClose }) => (
  <div className="modal-overlay" onClick={onClose}>
    <div className="modal-content" onClick={e => e.stopPropagation()}>
      <div className="modal-icon">🎉</div>
      <h3 className="modal-title">Order Placed!</h3>
      <p className="modal-text">Thank you for choosing Bloom & Aura. Your candle is being crafted with love.</p>
      <div className="modal-order-id">{orderId}</div>
      <button className="btn-close" onClick={onClose}>Continue Shopping</button>
    </div>
  </div>
);

// ===== MAIN APP =====
function App() {
  const [cart, setCart] = useState([]);
  const [confettiActive, setConfettiActive] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [activeSection, setActiveSection] = useState('home');

  const addToCart = useCallback((product) => {
    setCart(prev => [...prev, product]);
  }, []);

  const handleOrderSuccess = (id) => {
    setOrderId(id);
    setShowSuccess(true);
    setConfettiActive(true);
    setCart([]);
  };

  const handleConfettiComplete = () => {
    setConfettiActive(false);
  };

  const triggerCelebrate = () => {
    setConfettiActive(true);
    setTimeout(() => setConfettiActive(false), 4000);
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'products', 'order'];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el && el.offsetTop <= scrollPos && el.offsetTop + el.offsetHeight > scrollPos) {
          setActiveSection(section);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToProducts = () => {
    document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="app">
      <Navbar cartCount={cart.length} onNavigate={(section) => {
        document.getElementById(section).scrollIntoView({ behavior: 'smooth' });
      }} />
      <HeroSection onShopNow={scrollToProducts} />
      <ProductsSection onAddToCart={addToCart} />
      <OrderForm cart={cart} onOrderSuccess={handleOrderSuccess} />
      <Footer />
      <FloatingNav activeSection={activeSection} onCelebrate={triggerCelebrate} />
      <Confetti active={confettiActive} onComplete={handleConfettiComplete} />
      {showSuccess && <SuccessModal orderId={orderId} onClose={() => setShowSuccess(false)} />}
    </div>
  );
}

export default App;

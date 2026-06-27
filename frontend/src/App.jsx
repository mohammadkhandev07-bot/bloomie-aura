import React, { useState, useEffect, useRef } from 'react';
import './style.css';

// ========================================
// 1. NAVBAR COMPONENT
// ========================================
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <nav className="navbar">
      <div className="nav-container">
        <a href="/" className="nav-logo">
          <img src="/logo.png" alt="Bloom & Aura" className="nav-logo-img" />
          <span className="nav-brand">Bloom <span className="nav-brand-aura">& Aura</span></span>
        </a>
        
        <div className="nav-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? '✕' : '☰'}
        </div>
        
        <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <li><a href="/" className="nav-link active">Home</a></li>
          <li><a href="#products" className="nav-link">Products</a></li>
          <li><a href="/cart" className="nav-link cart-link">🛒 Cart</a></li>
        </ul>
      </div>
    </nav>
  );
};

// ========================================
// 2. HERO SECTION
// ========================================
const HeroSection = () => {
  const flameRef = useRef(null);

  useEffect(() => {
    const animateFlame = () => {
      if (!flameRef.current) return;
      const flicker = Math.sin(Date.now() / 100) * 3;
      const flickerY = Math.sin(Date.now() / 80) * 2;
      flameRef.current.style.transform = `translateX(${flicker}px) translateY(${flickerY}px)`;
      requestAnimationFrame(animateFlame);
    };
    animateFlame();
  }, []);

  return (
    <section className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-badge">✨ Premium Handmade Candles</div>
          <h1 className="hero-title">
            <span>Blooming Beauty,</span>
            <span className="title-aura">Lasting Aura</span>
          </h1>
          <p className="hero-description">
            Experience the magic of our handcrafted candles. 
            Each candle is infused with love and natural fragrances 
            to create a warm, inviting atmosphere in your home.
          </p>
          <div className="hero-buttons">
            <a href="#products" className="btn-primary">🛍️ Shop Now →</a>
            <a href="#about" className="btn-secondary">Learn More</a>
          </div>
          <div className="hero-stats">
            <div>
              <span className="stat-number">500+</span>
              <span>Happy Customers</span>
            </div>
            <div>
              <span className="stat-number">50+</span>
              <span>Premium Scents</span>
            </div>
            <div>
              <span className="stat-number">100%</span>
              <span>Natural Wax</span>
            </div>
          </div>
        </div>
        
        <div className="hero-visual">
          <div className="candle-container">
            <div className="flame-wrapper">
              <div className="flame-glow"></div>
              <div className="flame" ref={flameRef}>
                <div className="flame-inner"></div>
                <div className="flame-core"></div>
              </div>
            </div>
            <div className="candle-body">
              <div className="candle-stripes">
                <div className="stripe"></div>
                <div className="stripe"></div>
                <div className="stripe"></div>
              </div>
              <div className="candle-label">Bloom & Aura</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ========================================
// 3. PRODUCT CARD
// ========================================
const ProductCard = ({ product }) => {
  const [isAdded, setIsAdded] = useState(false);
  
  const handleAddToCart = () => {
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
    alert(`🛒 Added ${product.name} to cart!`);
  };

  return (
    <div className="product-card">
      <div className="product-image-wrapper">
        <img src={product.image} alt={product.name} className="product-image" />
        {product.isNew && <span className="badge-new">New</span>}
        {product.discount > 0 && <span className="badge-discount">-{product.discount}%</span>}
      </div>
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-fragrance">🌸 {product.fragrance}</p>
        <div className="product-rating">
          <span className="stars">★★★★★</span>
          <span className="rating-text">({product.reviews || 100} reviews)</span>
        </div>
        <div className="product-pricing">
          {product.discount > 0 ? (
            <>
              <span className="price-original">₹{product.price}</span>
              <span className="price-discounted">₹{Math.round(product.price * (1 - product.discount/100))}</span>
            </>
          ) : (
            <span className="price-current">₹{product.price}</span>
          )}
        </div>
        <button className="add-to-cart" onClick={handleAddToCart}>
          {isAdded ? '✅ Added!' : '🛒 Add to Cart'}
        </button>
      </div>
    </div>
  );
};

// ========================================
// 4. ORDER FORM (Flipkart Style)
// ========================================
const OrderForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    landmark: '',
    city: '',
    state: '',
    pincode: '',
    candleType: 'vanilla',
    quantity: 1,
    specialInstructions: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [pincodeData, setPincodeData] = useState(null);

  const candles = [
    { value: 'vanilla', label: 'Vanilla Bliss', price: 499 },
    { value: 'lavender', label: 'Lavender Dream', price: 599 },
    { value: 'rose', label: 'Rose Garden', price: 699 },
    { value: 'jasmine', label: 'Jasmine Evening', price: 549 },
    { value: 'sandalwood', label: 'Sandalwood Serenity', price: 799 }
  ];

  const selectedCandle = candles.find(c => c.value === formData.candleType);
  const totalAmount = selectedCandle ? selectedCandle.price * formData.quantity : 0;

  // Auto-detect pincode
  useEffect(() => {
    if (formData.pincode.length === 6) {
      // Mock pincode lookup
      const mockData = {
        '400001': { city: 'Mumbai', state: 'Maharashtra' },
        '110001': { city: 'Delhi', state: 'Delhi' },
        '560001': { city: 'Bengaluru', state: 'Karnataka' },
        '600001': { city: 'Chennai', state: 'Tamil Nadu' },
        '700001': { city: 'Kolkata', state: 'West Bengal' }
      };
      const data = mockData[formData.pincode];
      if (data) {
        setPincodeData(data);
        setFormData(prev => ({
          ...prev,
          city: data.city,
          state: data.state
        }));
      } else {
        setPincodeData(null);
      }
    } else {
      setPincodeData(null);
    }
  }, [formData.pincode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'phone' && value.length > 10) return;
    if (name === 'pincode' && value.length > 6) return;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.fullName || formData.fullName.length < 3) {
      alert('Please enter your full name (min 3 characters)');
      return;
    }
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      alert('Please enter a valid email address');
      return;
    }
    if (!formData.phone || formData.phone.length !== 10) {
      alert('Please enter a valid 10-digit phone number');
      return;
    }
    if (!formData.address || formData.address.length < 5) {
      alert('Please enter your complete address (min 5 characters)');
      return;
    }
    if (!formData.city || formData.city.length < 2) {
      alert('Please enter your city');
      return;
    }
    if (!formData.state || formData.state.length < 2) {
      alert('Please enter your state');
      return;
    }
    if (!formData.pincode || formData.pincode.length !== 6) {
      alert('Please enter a valid 6-digit pincode');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      const orderId = 'ORD-' + Date.now().toString().slice(-6);
      alert(`🎉 Order placed successfully!\nOrder ID: ${orderId}\nThank you for shopping with Bloom & Aura! 🕯️`);
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1500);
  };

  if (isSuccess) {
    return (
      <div className="success-message">
        <div className="success-icon">🎉</div>
        <h2>Order Placed Successfully!</h2>
        <p>Thank you for your order! We'll deliver it to your doorstep soon.</p>
        <p className="success-order-id">Order ID: ORD-{Date.now().toString().slice(-6)}</p>
        <button className="btn-primary" onClick={() => setIsSuccess(false)}>Place Another Order</button>
      </div>
    );
  }

  return (
    <div className="order-form-wrapper">
      <div className="form-header">
        <h2 className="form-title">📦 Place Your Order</h2>
        <p className="form-subtitle">Fill in the details below to place your order. We'll deliver it to your doorstep! 🕯️</p>
      </div>
      
      <form onSubmit={handleSubmit} className="order-form">
        <div className="form-grid">
          {/* ===== LEFT COLUMN - Customer Details ===== */}
          <div className="form-column">
            <h3 className="section-heading">👤 Customer Details</h3>
            
            <div className="form-group">
              <label>Full Name <span className="required">*</span></label>
              <input 
                type="text" 
                name="fullName" 
                value={formData.fullName} 
                onChange={handleChange} 
                placeholder="Enter your full name" 
                required 
              />
            </div>
            
            <div className="form-group">
              <label>Email Address <span className="required">*</span></label>
              <input 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                placeholder="Enter your email" 
                required 
              />
            </div>
            
            <div className="form-group">
              <label>Phone Number <span className="required">*</span></label>
              <input 
                type="tel" 
                name="phone" 
                value={formData.phone} 
                onChange={handleChange} 
                placeholder="10-digit phone number" 
                maxLength="10" 
                required 
              />
            </div>
            
            <div className="form-group">
              <label>Address <span className="required">*</span></label>
              <input 
                type="text" 
                name="address" 
                value={formData.address} 
                onChange={handleChange} 
                placeholder="House/Flat number, Street, Locality" 
                required 
              />
            </div>
            
            <div className="form-group">
              <label>Landmark <span className="optional">(Optional)</span></label>
              <input 
                type="text" 
                name="landmark" 
                value={formData.landmark} 
                onChange={handleChange} 
                placeholder="Nearby landmark for easy delivery" 
              />
            </div>
          </div>
          
          {/* ===== RIGHT COLUMN - Location & Order ===== */}
          <div className="form-column">
            <h3 className="section-heading">📍 Delivery & Order</h3>
            
            <div className="form-row">
              <div className="form-group half">
                <label>City <span className="required">*</span></label>
                <input 
                  type="text" 
                  name="city" 
                  value={formData.city} 
                  onChange={handleChange} 
                  placeholder="City" 
                  required 
                />
              </div>
              <div className="form-group half">
                <label>State <span className="required">*</span></label>
                <input 
                  type="text" 
                  name="state" 
                  value={formData.state} 
                  onChange={handleChange} 
                  placeholder="State" 
                  required 
                />
              </div>
            </div>
            
            <div className="form-group">
              <label>Pincode <span className="required">*</span></label>
              <input 
                type="text" 
                name="pincode" 
                value={formData.pincode} 
                onChange={handleChange} 
                placeholder="6-digit pincode" 
                maxLength="6" 
                required 
              />
              {pincodeData && (
                <span className="pincode-success">✅ City & State auto-filled!</span>
              )}
            </div>
            
            <div className="form-group">
              <label>Select Candle <span className="required">*</span></label>
              <select 
                name="candleType" 
                value={formData.candleType} 
                onChange={handleChange}
              >
                {candles.map(c => (
                  <option key={c.value} value={c.value}>
                    {c.label} - ₹{c.price}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label>Quantity <span className="required">*</span></label>
              <div className="quantity-controls">
                <button 
                  type="button" 
                  className="qty-btn"
                  onClick={() => {
                    if (formData.quantity > 1) {
                      setFormData({ ...formData, quantity: formData.quantity - 1 });
                    }
                  }}
                >−</button>
                <span className="qty-value">{formData.quantity}</span>
                <button 
                  type="button" 
                  className="qty-btn"
                  onClick={() => {
                    if (formData.quantity < 10) {
                      setFormData({ ...formData, quantity: formData.quantity + 1 });
                    }
                  }}
                >+</button>
              </div>
            </div>
            
            <div className="price-summary">
              <div className="price-row">
                <span>Price per candle:</span>
                <span>₹{selectedCandle?.price || 0}</span>
              </div>
              <div className="price-row">
                <span>Quantity:</span>
                <span>× {formData.quantity}</span>
              </div>
              <div className="price-divider"></div>
              <div className="price-row total">
                <span>Total Amount:</span>
                <span>₹{totalAmount}</span>
              </div>
              <div className="price-note">🚚 Free delivery on all orders!</div>
            </div>
            
            <div className="form-group">
              <label>Special Instructions <span className="optional">(Optional)</span></label>
              <textarea 
                name="specialInstructions" 
                value={formData.specialInstructions} 
                onChange={handleChange} 
                placeholder="Any special requests? (e.g., gift wrapping, delivery time)"
                rows="2"
              />
            </div>
          </div>
        </div>
        
        <button type="submit" className="submit-btn" disabled={isSubmitting}>
          {isSubmitting ? '⏳ Placing Order...' : '✅ Place Order'}
        </button>
        <p className="form-note">🔒 Your information is secure. Cash on Delivery available.</p>
      </form>
    </div>
  );
};

// ========================================
// 5. CONFETTI (Success Celebration)
// ========================================
const Confetti = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const colors = ['#FF6B35', '#D4AF37', '#FFD700', '#FF4444', '#4CAF50', '#2196F3', '#9C27B0', '#FF4081'];

    for (let i = 0; i < 150; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        size: Math.random() * 8 + 4,
        speedX: (Math.random() - 0.5) * 8,
        speedY: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 15,
        shape: Math.floor(Math.random() * 3)
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;

      particles.forEach(p => {
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(p.y / 50) * 0.5;
        p.rotation += p.rotationSpeed;
        p.speedY += 0.08;
        p.speedX *= 0.99;
        
        if (p.y < canvas.height + 50) alive = true;
        
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation * Math.PI / 180);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.min(1, (canvas.height - p.y + 100) / 200);
        
        if (p.shape === 0) {
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.shape === 1) {
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        } else {
          ctx.beginPath();
          ctx.moveTo(0, -p.size / 2);
          ctx.lineTo(-p.size / 2, p.size / 2);
          ctx.lineTo(p.size / 2, p.size / 2);
          ctx.closePath();
          ctx.fill();
        }
        
        ctx.restore();
      });

      if (alive) requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    setTimeout(() => {
      const timer = setInterval(() => {
        if (particles.every(p => p.y > canvas.height + 50)) {
          cancelAnimationFrame(animate);
          clearInterval(timer);
        }
      }, 1000);
    }, 3000);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return <canvas ref={canvasRef} className="confetti-canvas" />;
};

// ========================================
// 6. MAIN APP
// ========================================
const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [showConfetti, setShowConfetti] = useState(false);

  const products = [
    { id: 1, name: 'Vanilla Bliss Candle', price: 499, fragrance: 'Vanilla', isNew: true, discount: 20, reviews: 234, image: '/images/candles/vanilla.jpg' },
    { id: 2, name: 'Lavender Dream Candle', price: 599, fragrance: 'Lavender', isNew: false, discount: 0, reviews: 189, image: '/images/candles/lavender.jpg' },
    { id: 3, name: 'Rose Garden Candle', price: 699, fragrance: 'Rose', isNew: true, discount: 15, reviews: 312, image: '/images/candles/rose.jpg' },
    { id: 4, name: 'Jasmine Evening Candle', price: 549, fragrance: 'Jasmine', isNew: false, discount: 10, reviews: 156, image: '/images/candles/jasmine.jpg' },
    { id: 5, name: 'Sandalwood Serenity', price: 799, fragrance: 'Sandalwood', isNew: true, discount: 25, reviews: 278, image: '/images/candles/sandalwood.jpg' },
    { id: 6, name: 'Cinnamon Spice Candle', price: 449, fragrance: 'Cinnamon', isNew: false, discount: 0, reviews: 98, image: '/images/candles/cinnamon.jpg' },
    { id: 7, name: 'Ocean Breeze Candle', price: 649, fragrance: 'Ocean Breeze', isNew: true, discount: 10, reviews: 145, image: '/images/candles/ocean.jpg' },
    { id: 8, name: 'Honey & Oats Candle', price: 529, fragrance: 'Honey & Oats', isNew: false, discount: 15, reviews: 201, image: '/images/candles/honey.jpg' }
  ];

  const triggerConfetti = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 5000);
  };

  return (
    <>
      {showConfetti && <Confetti />}
      <Navbar />
      
      {currentPage === 'home' && (
        <>
          <HeroSection />
          <section className="products-section" id="products">
            <div className="container">
              <div className="section-header">
                <div>
                  <span className="section-badge">✨ Our Collection</span>
                  <h2 className="section-title">Premium Handcrafted Candles</h2>
                  <p className="section-subtitle">Each candle is carefully crafted with love and natural ingredients</p>
                </div>
                <a href="#all" className="view-all-btn">View All →</a>
              </div>
              <div className="products-grid">
                {products.map(p => <ProductCard key={p.id} product={p} />)}
              </div>
            </div>
          </section>
        </>
      )}

      {currentPage === 'cart' && <OrderForm />}

      <footer className="footer">
        <div className="footer-container">
          <div className="footer-grid">
            <div className="footer-brand">
              <img src="/logo.png" alt="Bloom & Aura" className="footer-logo" />
              <h3>Bloom & Aura</h3>
              <p>🌿 blooming beauty, lasting aura</p>
              <p className="footer-tagline">Handcrafted candles made with love and natural ingredients.</p>
            </div>
            <div className="footer-links">
              <h4>Quick Links</h4>
              <ul>
                <li><a href="/">Home</a></li>
                <li><a href="#products">Products</a></li>
                <li><a href="/cart">Cart</a></li>
                <li><a href="/about">About Us</a></li>
              </ul>
            </div>
            <div className="footer-contact">
              <h4>Get in Touch</h4>
              <p>📧 info@bloomandaura.com</p>
              <p>📞 +91 98765 43210</p>
              <p>📍 Mumbai, India</p>
              <div className="footer-socials">
                <a href="#">📸</a>
                <a href="#">📘</a>
                <a href="#">▶️</a>
                <a href="#">📌</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2026 Bloom & Aura. All rights reserved.</p>
            <p>Made with ❤️ in India</p>
          </div>
        </div>
      </footer>

      {/* ===== PAGE NAVIGATION ===== */}
      <div className="page-nav">
        <button 
          onClick={() => setCurrentPage('home')} 
          className={currentPage === 'home' ? 'active' : ''}
        >
          🏠 Home
        </button>
        <button 
          onClick={() => setCurrentPage('cart')} 
          className={currentPage === 'cart' ? 'active' : ''}
        >
          🛒 Cart
        </button>
        <button onClick={triggerConfetti} className="celebrate-btn">
          🎉 Celebrate
        </button>
      </div>
    </>
  );
};

export default App;

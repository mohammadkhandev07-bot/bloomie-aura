import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiShoppingBag } from 'react-icons/fi';

const HeroSection = () => {
  const flameRef = useRef(null);
  const glowRef = useRef(null);

  // Candle flame animation using CSS + JS
  useEffect(() => {
    const flame = flameRef.current;
    const glow = glowRef.current;
    
    let angle = 0;
    let flicker = 0;

    const animateFlame = () => {
      if (!flame) return;
      
      // Random flicker effect
      flicker = Math.sin(Date.now() / 100) * 3 + Math.sin(Date.now() / 50) * 2;
      const flickerY = Math.sin(Date.now() / 80) * 2;
      
      flame.style.transform = `translateX(${flicker}px) translateY(${flickerY}px) scale(${1 + Math.sin(Date.now() / 150) * 0.05})`;
      flame.style.filter = `brightness(${1 + Math.sin(Date.now() / 120) * 0.1})`;
      
      // Glow pulse
      if (glow) {
        glow.style.transform = `scale(${1 + Math.sin(Date.now() / 200) * 0.1})`;
        glow.style.opacity = 0.6 + Math.sin(Date.now() / 150) * 0.2;
      }
      
      requestAnimationFrame(animateFlame);
    };

    animateFlame();
  }, []);

  return (
    <section className="hero-section">
      <div className="hero-container">
        {/* ===== LEFT CONTENT ===== */}
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-icon">✨</span>
            Premium Handmade Candles
          </div>
          
          <h1 className="hero-title">
            <span className="title-line1">Blooming Beauty,</span>
            <span className="title-line2">
              Lasting <span className="title-aura">Aura</span>
            </span>
          </h1>
          
          <p className="hero-description">
            Experience the magic of our handcrafted candles. 
            Each candle is infused with love and natural fragrances 
            to create a warm, inviting atmosphere in your home.
          </p>
          
          <div className="hero-buttons">
            <Link to="/products" className="btn-primary">
              <FiShoppingBag className="btn-icon" />
              Shop Now
              <FiArrowRight className="btn-arrow" />
            </Link>
            <Link to="/about" className="btn-secondary">
              Learn More
            </Link>
          </div>
          
          {/* ===== STATS ===== */}
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">500+</span>
              <span className="stat-label">Happy Customers</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-number">50+</span>
              <span className="stat-label">Premium Scents</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-number">100%</span>
              <span className="stat-label">Natural Wax</span>
            </div>
          </div>
        </div>
        
        {/* ===== RIGHT CANDLE VISUAL ===== */}
        <div className="hero-visual">
          <div className="candle-container">
            {/* Candle Body */}
            <div className="candle-body">
              <div className="candle-stripes">
                <div className="stripe"></div>
                <div className="stripe"></div>
                <div className="stripe"></div>
              </div>
              <div className="candle-label">Bloom & Aura</div>
            </div>
            
            {/* Candle Flame */}
            <div className="flame-wrapper">
              <div className="flame-glow" ref={glowRef}></div>
              <div className="flame" ref={flameRef}>
                <div className="flame-inner"></div>
                <div className="flame-core"></div>
              </div>
            </div>
            
            {/* Floating Particles */}
            <div className="particles">
              <div className="particle p1">✦</div>
              <div className="particle p2">✧</div>
              <div className="particle p3">✦</div>
              <div className="particle p4">✧</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* ===== WAVE DIVIDER ===== */}
      <div className="hero-wave">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 60L60 55C120 50 240 40 360 45C480 50 600 70 720 75C840 80 960 70 1080 60C1200 50 1320 50 1380 50L1440 50V120H0V60Z" fill="#FFF8F0"/>
        </svg>
      </div>
      
      {/* ===== INLINE STYLES ===== */}
      <style jsx>{`
        /* ===== HERO SECTION ===== */
        .hero-section {
          min-height: 100vh;
          background: linear-gradient(135deg, #FFF8F0 0%, #F7E8D7 50%, #EDD9C0 100%);
          display: flex;
          align-items: center;
          position: relative;
          overflow: hidden;
          padding: 2rem 0;
        }

        /* Decorative background elements */
        .hero-section::before {
          content: '';
          position: absolute;
          top: -50%;
          right: -20%;
          width: 800px;
          height: 800px;
          background: radial-gradient(circle, rgba(212, 175, 55, 0.08) 0%, transparent 70%);
          border-radius: 50%;
          animation: floatBg 20s ease-in-out infinite;
        }

        .hero-section::after {
          content: '';
          position: absolute;
          bottom: -30%;
          left: -10%;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(255, 107, 53, 0.05) 0%, transparent 70%);
          border-radius: 50%;
          animation: floatBg 25s ease-in-out infinite reverse;
        }

        @keyframes floatBg {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -30px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }

        .hero-container {
          max-width: 1400px;
          width: 100%;
          margin: 0 auto;
          padding: 0 2rem;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
          position: relative;
          z-index: 2;
        }

        /* ===== LEFT CONTENT ===== */
        .hero-content {
          display: flex;
          flex-direction: column;
          gap: 1.8rem;
          animation: fadeInLeft 1s ease;
        }

        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(212, 175, 55, 0.15);
          color: #D4AF37;
          padding: 0.5rem 1.2rem;
          border-radius: 50px;
          font-size: 0.9rem;
          font-weight: 600;
          width: fit-content;
          border: 1px solid rgba(212, 175, 55, 0.2);
          backdrop-filter: blur(10px);
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.03); }
        }

        .badge-icon {
          font-size: 1.2rem;
        }

        .hero-title {
          font-size: 4.5rem;
          font-weight: 800;
          line-height: 1.1;
          color: #2C1810;
          margin: 0;
        }

        .title-line1 {
          display: block;
          font-weight: 700;
          color: #4A2A1A;
        }

        .title-line2 {
          display: block;
          font-weight: 800;
        }

        .title-aura {
          background: linear-gradient(135deg, #D4AF37 0%, #FF6B35 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          position: relative;
        }

        .title-aura::after {
          content: '✨';
          position: absolute;
          top: -20px;
          right: -30px;
          font-size: 2rem;
          animation: sparkle 2s ease-in-out infinite;
          -webkit-text-fill-color: initial;
        }

        @keyframes sparkle {
          0%, 100% { opacity: 1; transform: scale(1) rotate(0deg); }
          50% { opacity: 0.5; transform: scale(1.3) rotate(180deg); }
        }

        .hero-description {
          font-size: 1.2rem;
          line-height: 1.8;
          color: #5A3D2E;
          max-width: 500px;
          margin: 0;
          font-weight: 400;
        }

        /* ===== BUTTONS ===== */
        .hero-buttons {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 1rem 2.5rem;
          background: linear-gradient(135deg, #D4AF37 0%, #FF6B35 100%);
          color: white;
          text-decoration: none;
          border-radius: 50px;
          font-weight: 600;
          font-size: 1.1rem;
          transition: all 0.3s ease;
          border: none;
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }

        .btn-primary::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transition: left 0.5s ease;
        }

        .btn-primary:hover::before {
          left: 100%;
        }

        .btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 30px rgba(212, 175, 55, 0.3);
        }

        .btn-icon {
          font-size: 1.2rem;
        }

        .btn-arrow {
          transition: transform 0.3s ease;
        }

        .btn-primary:hover .btn-arrow {
          transform: translateX(5px);
        }

        .btn-secondary {
          display: inline-flex;
          align-items: center;
          padding: 1rem 2rem;
          background: transparent;
          color: #2C1810;
          text-decoration: none;
          border-radius: 50px;
          font-weight: 600;
          font-size: 1.1rem;
          border: 2px solid #2C1810;
          transition: all 0.3s ease;
        }

        .btn-secondary:hover {
          background: #2C1810;
          color: #FFF8F0;
          transform: translateY(-3px);
          box-shadow: 0 10px 30px rgba(44, 24, 16, 0.2);
        }

        /* ===== STATS ===== */
        .hero-stats {
          display: flex;
          align-items: center;
          gap: 2rem;
          padding-top: 1rem;
          border-top: 2px solid rgba(44, 24, 16, 0.1);
        }

        .stat-item {
          display: flex;
          flex-direction: column;
        }

        .stat-number {
          font-size: 1.8rem;
          font-weight: 800;
          color: #D4AF37;
        }

        .stat-label {
          font-size: 0.9rem;
          color: #5A3D2E;
          font-weight: 500;
        }

        .stat-divider {
          width: 2px;
          height: 40px;
          background: rgba(44, 24, 16, 0.15);
        }

        /* ===== RIGHT CANDLE VISUAL ===== */
        .hero-visual {
          display: flex;
          justify-content: center;
          align-items: center;
          animation: fadeInRight 1s ease 0.3s both;
        }

        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .candle-container {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        /* ===== CANDLE BODY ===== */
        .candle-body {
          width: 120px;
          height: 280px;
          background: linear-gradient(180deg, #F5E6D3 0%, #E8D5C4 50%, #D4BBA8 100%);
          border-radius: 60px 60px 20px 20px;
          position: relative;
          box-shadow: 
            0 20px 60px rgba(44, 24, 16, 0.2),
            inset 0 -20px 40px rgba(44, 24, 16, 0.1),
            inset 0 20px 40px rgba(255, 255, 255, 0.3);
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .candle-body:hover {
          transform: scale(1.02);
          box-shadow: 0 30px 80px rgba(44, 24, 16, 0.3);
        }

        /* Candle Stripes */
        .candle-stripes {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          overflow: hidden;
          border-radius: 60px 60px 20px 20px;
        }

        .stripe {
          height: 4px;
          background: rgba(212, 175, 55, 0.3);
          margin: 20px 20px;
          border-radius: 2px;
        }

        .stripe:nth-child(1) { margin-top: 40px; width: 60%; }
        .stripe:nth-child(2) { width: 80%; }
        .stripe:nth-child(3) { width: 50%; margin-bottom: 40px; }

        .candle-label {
          position: absolute;
          bottom: 40px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 0.8rem;
          font-weight: 700;
          color: #2C1810;
          background: rgba(255, 248, 240, 0.8);
          padding: 0.3rem 1rem;
          border-radius: 20px;
          letter-spacing: 2px;
          backdrop-filter: blur(5px);
          border: 1px solid rgba(212, 175, 55, 0.3);
          white-space: nowrap;
        }

        /* ===== FLAME ===== */
        .flame-wrapper {
          position: relative;
          margin-bottom: -10px;
          z-index: 3;
        }

        .flame-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 120px;
          height: 120px;
          background: radial-gradient(circle, rgba(255, 107, 53, 0.3) 0%, rgba(212, 175, 55, 0.1) 50%, transparent 70%);
          border-radius: 50%;
          filter: blur(20px);
          animation: glowPulse 2s ease-in-out infinite;
        }

        @keyframes glowPulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.6; }
          50% { transform: translate(-50%, -50%) scale(1.2); opacity: 1; }
        }

        .flame {
          position: relative;
          width: 40px;
          height: 60px;
          background: linear-gradient(180deg, #FF6B35 0%, #FFD700 40%, #FF8C00 70%, #FF4500 100%);
          border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
          transform-origin: bottom center;
          filter: blur(1px);
          animation: flicker 0.1s ease-in-out infinite alternate;
          box-shadow: 
            0 0 40px rgba(255, 107, 53, 0.6),
            0 0 80px rgba(255, 107, 53, 0.3),
            0 0 120px rgba(212, 175, 55, 0.2);
        }

        .flame-inner {
          position: absolute;
          bottom: 10%;
          left: 50%;
          transform: translateX(-50%);
          width: 20px;
          height: 35px;
          background: linear-gradient(180deg, #FFFFFF 0%, #FFD700 40%, #FF8C00 80%);
          border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
          filter: blur(2px);
          opacity: 0.8;
        }

        .flame-core {
          position: absolute;
          bottom: 20%;
          left: 50%;
          transform: translateX(-50%);
          width: 10px;
          height: 20px;
          background: radial-gradient(circle, #FFFFFF 0%, #FFD700 50%, transparent 100%);
          border-radius: 50%;
          filter: blur(1px);
          opacity: 0.9;
        }

        @keyframes flicker {
          0% { transform: skewX(0deg) scaleY(1); }
          25% { transform: skewX(2deg) scaleY(0.95); }
          50% { transform: skewX(-2deg) scaleY(1.05); }
          75% { transform: skewX(1deg) scaleY(0.97); }
          100% { transform: skewX(-1deg) scaleY(1.02); }
        }

        /* ===== FLOATING PARTICLES ===== */
        .particles {
          position: absolute;
          top: -80px;
          left: 50%;
          transform: translateX(-50%);
          width: 300px;
          height: 300px;
          pointer-events: none;
        }

        .particle {
          position: absolute;
          font-size: 1.5rem;
          color: #D4AF37;
          opacity: 0;
          animation: floatParticle 4s ease-in-out infinite;
        }

        .p1 {
          top: 20%;
          left: 10%;
          animation-delay: 0s;
          font-size: 1.8rem;
        }

        .p2 {
          top: 10%;
          right: 10%;
          animation-delay: 1s;
          font-size: 1.2rem;
        }

        .p3 {
          bottom: 30%;
          left: 0%;
          animation-delay: 2s;
          font-size: 2rem;
        }

        .p4 {
          bottom: 20%;
          right: 0%;
          animation-delay: 3s;
          font-size: 1.4rem;
        }

        @keyframes floatParticle {
          0% { opacity: 0; transform: translateY(20px) scale(0); }
          20% { opacity: 1; transform: translateY(0) scale(1); }
          80% { opacity: 1; transform: translateY(-60px) scale(1); }
          100% { opacity: 0; transform: translateY(-100px) scale(0.5); }
        }

        /* ===== WAVE DIVIDER ===== */
        .hero-wave {
          position: absolute;
          bottom: -2px;
          left: 0;
          right: 0;
          z-index: 1;
        }

        .hero-wave svg {
          width: 100%;
          height: auto;
          display: block;
        }

        /* ===== RESPONSIVE ===== */
        @media screen and (max-width: 1024px) {
          .hero-title {
            font-size: 3.5rem;
          }
          
          .hero-container {
            gap: 2rem;
          }
        }

        @media screen and (max-width: 768px) {
          .hero-container {
            grid-template-columns: 1fr;
            text-align: center;
            padding: 1rem;
          }

          .hero-section {
            min-height: auto;
            padding: 4rem 0;
          }

          .hero-content {
            align-items: center;
            gap: 1.5rem;
          }

          .hero-title {
            font-size: 2.8rem;
          }

          .title-aura::after {
            display: none;
          }

          .hero-description {
            max-width: 100%;
            font-size: 1rem;
          }

          .hero-stats {
            justify-content: center;
          }

          .hero-visual {
            order: -1;
          }

          .candle-body {
            width: 100px;
            height: 240px;
          }

          .flame {
            width: 35px;
            height: 50px;
          }

          .hero-buttons {
            justify-content: center;
          }

          .btn-primary, .btn-secondary {
            padding: 0.8rem 1.8rem;
            font-size: 1rem;
          }

          .stat-number {
            font-size: 1.4rem;
          }

          .particles {
            display: none;
          }
        }

        @media screen and (max-width: 480px) {
          .hero-title {
            font-size: 2.2rem;
          }

          .hero-badge {
            font-size: 0.8rem;
            padding: 0.3rem 1rem;
          }

          .candle-body {
            width: 80px;
            height: 200px;
          }

          .flame {
            width: 30px;
            height: 45px;
          }

          .flame-glow {
            width: 80px;
            height: 80px;
          }

          .hero-stats {
            gap: 1rem;
            flex-wrap: wrap;
          }

          .stat-divider {
            display: none;
          }

          .btn-primary, .btn-secondary {
            padding: 0.7rem 1.5rem;
            font-size: 0.9rem;
          }

          .candle-label {
            font-size: 0.6rem;
            bottom: 30px;
            padding: 0.2rem 0.8rem;
          }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;

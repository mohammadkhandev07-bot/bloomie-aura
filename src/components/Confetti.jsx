import React, { useEffect, useRef, useState } from 'react';

const Confetti = ({ 
  duration = 4000, 
  colors = ['#FF6B35', '#D4AF37', '#FFD700', '#FF4444', '#4CAF50', '#2196F3', '#9C27B0', '#FF4081'],
  particleCount = 150,
  onComplete = null
}) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const particlesRef = useRef([]);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create particles
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height - canvas.height;
        this.size = Math.random() * 8 + 4;
        this.speedX = (Math.random() - 0.5) * 8;
        this.speedY = Math.random() * 8 + 4;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.rotation = Math.random() * 360;
        this.rotationSpeed = (Math.random() - 0.5) * 10;
        this.shape = Math.floor(Math.random() * 3); // 0: circle, 1: square, 2: triangle
        this.opacity = 1;
        this.deceleration = 0.99;
        this.gravity = 0.1;
        this.wobble = Math.random() * 10;
        this.wobbleSpeed = Math.random() * 0.1 + 0.05;
        this.trail = [];
      }

      update() {
        // Physics
        this.speedY += this.gravity;
        this.speedX *= this.deceleration;
        this.speedY *= this.deceleration;
        
        this.x += this.speedX + Math.sin(this.wobble) * 0.5;
        this.y += this.speedY;
        this.wobble += this.wobbleSpeed;
        this.rotation += this.rotationSpeed;
        
        // Fade out when near bottom
        if (this.y > canvas.height * 0.7) {
          this.opacity -= 0.01;
        }
        
        // Reset if completely faded
        if (this.opacity <= 0) {
          this.opacity = 0;
        }
      }

      draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate((this.rotation * Math.PI) / 180);
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;
        
        // Draw different shapes
        switch(this.shape) {
          case 0: // Circle
            ctx.beginPath();
            ctx.arc(0, 0, this.size / 2, 0, Math.PI * 2);
            ctx.fill();
            break;
          case 1: // Square
            ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
            break;
          case 2: // Triangle
            ctx.beginPath();
            ctx.moveTo(0, -this.size / 2);
            ctx.lineTo(-this.size / 2, this.size / 2);
            ctx.lineTo(this.size / 2, this.size / 2);
            ctx.closePath();
            ctx.fill();
            break;
          default:
            ctx.beginPath();
            ctx.arc(0, 0, this.size / 2, 0, Math.PI * 2);
            ctx.fill();
        }
        
        // Glow effect
        if (this.size > 6) {
          ctx.shadowColor = this.color;
          ctx.shadowBlur = 15;
          ctx.fill();
        }
        
        ctx.restore();
      }
    }

    // Initialize particles
    const initParticles = () => {
      particlesRef.current = [];
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push(new Particle());
      }
    };
    initParticles();

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      let allFaded = true;
      
      particlesRef.current.forEach(particle => {
        particle.update();
        particle.draw(ctx);
        if (particle.opacity > 0) {
          allFaded = false;
        }
      });
      
      // Check if all particles are faded
      if (allFaded && isActive) {
        setIsActive(false);
        if (onComplete) onComplete();
        cancelAnimationFrame(animationRef.current);
        return;
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animate();

    // Auto-stop after duration
    const timeout = setTimeout(() => {
      setIsActive(false);
      if (onComplete) onComplete();
      cancelAnimationFrame(animationRef.current);
    }, duration);

    // Cleanup
    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [duration, colors, particleCount, onComplete]);

  // Trigger burst on mount
  useEffect(() => {
    setIsActive(true);
  }, []);

  // Manual burst trigger
  const burst = () => {
    setIsActive(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    // Reinitialize particles with burst effect
    class BurstParticle {
      constructor() {
        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 12 + 4;
        this.x = canvas.width / 2;
        this.y = canvas.height / 2;
        this.size = Math.random() * 10 + 4;
        this.speedX = Math.cos(angle) * velocity;
        this.speedY = Math.sin(angle) * velocity - 5;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.rotation = Math.random() * 360;
        this.rotationSpeed = (Math.random() - 0.5) * 15;
        this.shape = Math.floor(Math.random() * 3);
        this.opacity = 1;
        this.gravity = 0.15;
        this.deceleration = 0.98;
        this.wobble = Math.random() * 10;
        this.wobbleSpeed = Math.random() * 0.1 + 0.05;
        this.life = 1;
        this.decay = 0.005 + Math.random() * 0.01;
      }

      update() {
        this.speedY += this.gravity;
        this.speedX *= this.deceleration;
        this.speedY *= this.deceleration;
        
        this.x += this.speedX + Math.sin(this.wobble) * 0.5;
        this.y += this.speedY;
        this.wobble += this.wobbleSpeed;
        this.rotation += this.rotationSpeed;
        
        this.life -= this.decay;
        this.opacity = this.life;
      }

      draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate((this.rotation * Math.PI) / 180);
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;
        
        // Glow
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 20;
        
        switch(this.shape) {
          case 0:
            ctx.beginPath();
            ctx.arc(0, 0, this.size / 2, 0, Math.PI * 2);
            ctx.fill();
            break;
          case 1:
            ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
            break;
          case 2:
            ctx.beginPath();
            ctx.moveTo(0, -this.size / 2);
            ctx.lineTo(-this.size / 2, this.size / 2);
            ctx.lineTo(this.size / 2, this.size / 2);
            ctx.closePath();
            ctx.fill();
            break;
        }
        ctx.restore();
      }
    }

    particlesRef.current = [];
    for (let i = 0; i < particleCount * 1.5; i++) {
      particlesRef.current.push(new BurstParticle());
    }

    // Restart animation
    const animateBurst = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      let alive = false;
      particlesRef.current.forEach(particle => {
        particle.update();
        particle.draw(ctx);
        if (particle.life > 0) alive = true;
      });
      
      if (alive) {
        animationRef.current = requestAnimationFrame(animateBurst);
      } else {
        setIsActive(false);
        if (onComplete) onComplete();
      }
    };
    
    cancelAnimationFrame(animationRef.current);
    animateBurst();
  };

  return (
    <div className="confetti-container">
      <canvas
        ref={canvasRef}
        className="confetti-canvas"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 9999,
          opacity: isActive ? 1 : 0,
          transition: 'opacity 0.5s ease'
        }}
      />
      
      {/* ===== TRIGGER BUTTON (for demo) ===== */}
      <div className="confetti-trigger">
        <button 
          onClick={burst}
          className="burst-btn"
          style={{
            position: 'fixed',
            bottom: '30px',
            right: '30px',
            zIndex: 10000,
            padding: '12px 24px',
            background: 'linear-gradient(135deg, #D4AF37, #FF6B35)',
            color: 'white',
            border: 'none',
            borderRadius: '50px',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: 'pointer',
            boxShadow: '0 4px 20px rgba(212, 175, 55, 0.3)',
            transition: 'all 0.3s ease',
            display: 'none' // Hidden by default, enable for testing
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'scale(1.05)';
            e.target.style.boxShadow = '0 6px 30px rgba(212, 175, 55, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'scale(1)';
            e.target.style.boxShadow = '0 4px 20px rgba(212, 175, 55, 0.3)';
          }}
        >
          🎉 Test Confetti
        </button>
      </div>
    </div>
  );
};

export default Confetti;

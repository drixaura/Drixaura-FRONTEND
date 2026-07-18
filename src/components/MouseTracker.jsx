import React, { useEffect, useRef } from 'react';

export default function MouseTracker() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let particles = [];
    const maxParticles = 60;

    // Handle resizing
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle Class
    class Particle {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        // Small random movement
        this.vx = (Math.random() - 0.5) * 1.5;
        this.vy = (Math.random() - 0.5) * 1.5;
        // Start size
        this.size = Math.random() * 6 + 4;
        // Start alpha
        this.alpha = 1;
        this.decay = Math.random() * 0.02 + 0.015;
        // Theme Colors: alternating between Cyan (#66FCF1) and Purple (#bd00ff)
        const isCyan = Math.random() > 0.4;
        this.color = isCyan 
          ? `rgba(102, 252, 241, ${this.alpha})`
          : `rgba(189, 0, 255, ${this.alpha})`;
        this.baseColor = isCyan ? '102, 252, 241' : '189, 0, 255';
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.alpha -= this.decay;
        this.color = `rgba(${this.baseColor}, ${this.alpha})`;
        if (this.size > 0.2) this.size -= 0.08;
      }

      draw() {
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        
        // Add soft glow effect
        ctx.shadowBlur = 10;
        ctx.shadowColor = `rgba(${this.baseColor}, ${this.alpha * 0.8})`;
        
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.restore();
      }
    }

    // Add particles on mouse move
    const handleMouseMove = (e) => {
      // Add 2 particles per mouse move event to make a dense, fluid trail
      if (particles.length < maxParticles) {
        particles.push(new Particle(e.clientX, e.clientY));
        particles.push(new Particle(e.clientX, e.clientY));
      }
    };

    // Add particles on touch for mobile devices
    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        if (particles.length < maxParticles) {
          particles.push(new Particle(touch.clientX, touch.clientY));
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);

    // Animation Loop
    const animate = () => {
      // Semi-transparent clear to leave a tiny trail, but clear enough to keep it clean
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.update();
        p.draw();

        // Remove dead particles
        if (p.alpha <= 0 || p.size <= 0.2) {
          particles.splice(i, 1);
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    // Clean up
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="mouse-canvas" />;
}

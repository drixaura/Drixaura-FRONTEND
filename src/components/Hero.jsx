import React from 'react';
import { Zap } from 'lucide-react';

export default function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero-grid">
        <div className="hero-content">
          <div className="hero-badge reveal">
            <Zap size={14} /> Full Stack Engineering & System Design
          </div>
          
          <h1 className="hero-title reveal" style={{ transitionDelay: '100ms' }}>
            We architect and build <span className="gradient-text">production-grade</span> digital platforms.
          </h1>
          
          <p className="hero-desc reveal" style={{ transitionDelay: '200ms' }}>
            As a specialized engineering duo, we design resilient backend infrastructures and meticulously craft interactive glassmorphic frontends. We transform complex technical requirements into scalable, elegant software systems that rank at the top for core web vitals and user experience.
          </p>
          
          <div className="hero-actions reveal" style={{ transitionDelay: '300ms' }}>
            <a href="#portfolio" className="btn btn-primary">
              Explore Softwares
            </a>
            <a href="#about-now" className="btn btn-secondary">
              Meet the Engineers
            </a>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-glow-card">
            <div className="glow-logo-box animate-float">
              <svg width="90" height="90" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: 'drop-shadow(0 0 16px rgba(0, 128, 128, 0.4))' }}>
                <path d="M16 2L2 9L16 16L30 9L16 2Z" fill="url(#heroLogoGrad)" />
                <path d="M2 23L16 30L30 23" stroke="var(--color-primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2 16L16 23L30 16" stroke="var(--color-secondary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.85" />
                <defs>
                  <linearGradient id="heroLogoGrad" x1="2" y1="9" x2="30" y2="9" gradientUnits="userSpaceOnUse">
                    <stop stopColor="var(--color-primary)" />
                    <stop offset="1" stopColor="var(--color-secondary)" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

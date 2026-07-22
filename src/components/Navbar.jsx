import React, { useState, useEffect } from 'react';
import { Menu, X, Terminal } from 'lucide-react';

export default function Navbar({ currentPage, setCurrentPage }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      // Toggle scrolled class
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Track active section based on scroll position (only if on homepage)
      if (currentPage === 'about' || currentPage.startsWith('portfolio-')) {
        setActiveSection('about-now');
        return;
      }

      const sections = ['home', 'portfolio', 'security', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPage]);

  // Adjust activeSection based on page swaps
  useEffect(() => {
    if (currentPage === 'about' || currentPage.startsWith('portfolio-')) {
      setActiveSection('about-now');
    } else {
      setActiveSection('home');
    }
  }, [currentPage]);

  const handleNavClick = (e, item) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (item.id === 'about-now') {
      setCurrentPage('about');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setCurrentPage('home');
      setTimeout(() => {
        const targetId = item.id === 'home' ? 'home' : item.id;
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        } else if (item.id === 'home') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 150);
    }
  };

  const navItems = [
    { label: 'Home', href: '#home', id: 'home' },
    { label: 'Softwares', href: '#portfolio', id: 'portfolio' },
    { label: 'Security', href: '#security', id: 'security' },
    { label: 'About Us', href: '#about-now', id: 'about-now' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <a 
          href="#home" 
          className="logo"
          onClick={(e) => {
            e.preventDefault();
            setCurrentPage('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 2L2 9L16 16L30 9L16 2Z" fill="url(#navLogoGrad)" />
            <path d="M2 23L16 30L30 23" stroke="var(--color-primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M2 16L16 23L30 16" stroke="var(--color-secondary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.85" />
            <defs>
              <linearGradient id="navLogoGrad" x1="2" y1="9" x2="30" y2="9" gradientUnits="userSpaceOnUse">
                <stop stopColor="var(--color-primary)" />
                <stop offset="1" stopColor="var(--color-secondary)" />
              </linearGradient>
            </defs>
          </svg>
          <span>DRIXAURA</span>
        </a>

        {/* Desktop Links */}
        <div className="nav-links">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
              onClick={(e) => handleNavClick(e, item)}
            >
              {item.label}
            </a>
          ))}
          <a 
            href="#contact" 
            className="btn btn-primary" 
            style={{ padding: '8px 20px', fontSize: '0.85rem' }}
            onClick={(e) => handleNavClick(e, { id: 'contact' })}
          >
            Inquire
          </a>
        </div>

        {/* Mobile Toggle Button */}
        <button
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          className="glass"
          style={{
            position: 'fixed',
            top: '70px',
            left: '20px',
            right: '20px',
            padding: '30px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            zIndex: 99,
            animation: 'fadeIn 0.3s ease-out'
          }}
        >
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
              style={{ fontSize: '1.1rem' }}
              onClick={(e) => handleNavClick(e, item)}
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            className="btn btn-primary"
            style={{ width: '100%', marginTop: '10px' }}
            onClick={(e) => handleNavClick(e, { id: 'contact' })}
          >
            Inquire
          </a>
        </div>
      )}
    </nav>
  );
}

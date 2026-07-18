import React, { useState, useEffect } from 'react';
import './styles/theme.css';
import './styles/App.css';
import NeonBackground from './components/NeonBackground';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Expertise from './components/Expertise';
import Portfolio from './components/Portfolio';
import Security from './components/Security';
import AboutNow from './components/AboutNow';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentPage, setCurrentPage] = useState('home');

  const handleSelectProject = (project) => {
    setSelectedProject(project);
  };

  useEffect(() => {
    // Delay query slightly to guarantee React elements are fully printed in DOM
    const timer = setTimeout(() => {
      const revealElements = document.querySelectorAll('.reveal');

      if (!window.IntersectionObserver) {
        // Fallback for environments lacking IntersectionObserver (like headless test runners)
        revealElements.forEach((el) => el.classList.add('active'));
        return;
      }

      const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.05 // Trigger reveal when at least 5% is visible
      };

      const observerCallback = (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target); // Reveal once
          }
        });
      };

      const observer = new IntersectionObserver(observerCallback, observerOptions);
      revealElements.forEach((el) => observer.observe(el));
    }, 150);

    return () => clearTimeout(timer);
  }, [currentPage]);

  return (
    <div className="app-container">
      {/* Background Interactive Mouse Tracing */}
      <NeonBackground />

      {/* Navigation */}
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />

      {/* Main Page Layout Switcher */}
      {currentPage === 'home' ? (
        <>
          <Hero />
          <Expertise />
          <Portfolio onSelectProject={handleSelectProject} />
          <Security />
          <Contact selectedProject={selectedProject} />
        </>
      ) : (
        <AboutNow onBackToHome={() => setCurrentPage('home')} />
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;

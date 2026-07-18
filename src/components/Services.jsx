import React from 'react';
import { Code, Smartphone, Layout, ShoppingCart, Gauge, Database } from 'lucide-react';

export default function Services() {
  const services = [
    {
      icon: <Code size={28} />,
      title: 'Custom Web Apps',
      desc: 'High-performance React/Next.js single-page and server-side applications built with clean code and modular architectures.',
    },
    {
      icon: <Smartphone size={28} />,
      title: 'Mobile-First Design',
      desc: 'Fluid layouts and responsive engineering ensuring your digital experience works flawlessly on devices of all shapes and sizes.',
    },
    {
      icon: <Layout size={28} />,
      title: 'UI/UX Engineering',
      desc: 'Eye-catching glassmorphism interfaces, smooth transitions, and user-centric flows built to maximize user interaction.',
    },
    {
      icon: <ShoppingCart size={28} />,
      title: 'E-commerce Architectures',
      desc: 'Robust electronic storefronts with secure payment gateway integrations, real-time inventory management, and fast checkouts.',
    },
    {
      icon: <Gauge size={28} />,
      title: 'SEO & Performance Tuning',
      desc: 'Lighthouse audits, caching structures, asset compression, and code splitting to make your site load in milliseconds and rank high.',
    },
    {
      icon: <Database size={28} />,
      title: 'Secure API Integrations',
      desc: 'Robust backend API development with rate-limiting, Helmet protection, strict validation, and smooth connection to frontend clients.',
    },
  ];

  return (
    <section id="services" className="section">
      <div className="section-header reveal">
        <h2 className="section-title">
          Our <span className="gradient-accent-text">Services</span>
        </h2>
        <p className="section-subtitle">
          We leverage the latest frameworks and robust programming methodologies to deliver exceptional web assets.
        </p>
      </div>

      <div className="services-grid">
        {services.map((service, index) => (
          <div 
            key={index} 
            className="service-card glass reveal" 
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            <div className="service-icon">{service.icon}</div>
            <h3 className="service-title">{service.title}</h3>
            <p className="service-desc">{service.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

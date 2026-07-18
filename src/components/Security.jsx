import React from 'react';
import { ShieldAlert, Zap, Lock, AlertOctagon } from 'lucide-react';

export default function Security() {
  const metrics = [
    { value: '100', label: 'Lighthouse Performance' },
    { value: '0', label: 'Vulnerabilities Identified' },
    { value: '99.9%', label: 'Uptime SLA Guarantee' },
    { value: '<250ms', label: 'Average Server Response' }
  ];

  const features = [
    {
      icon: <Lock size={20} />,
      title: 'Full Data Encryption',
      desc: 'All communications between the user browser and backend systems are encrypted using TLS 1.3 and advanced security headers (Helmet.js).'
    },
    {
      icon: <ShieldAlert size={20} />,
      title: 'XSS & SQL Injection Shielding',
      desc: 'Inputs are strictly validated and HTML-escaped on both frontend forms and backend endpoints, blocking malicious injection payloads.'
    },
    {
      icon: <AlertOctagon size={20} />,
      title: 'API Rate Limiting & DDoS Shield',
      desc: 'Custom express-rate-limiters intercept brute-force attempts and spam bots at the API gates, keeping server memory consumption minimal.'
    },
    {
      icon: <Zap size={20} />,
      title: 'Core Web Vitals Perfection',
      desc: 'Optimized asset delivery, server-side caching, and asynchronous scripts ensure our applications load instantly, maximizing SEO rankings.'
    }
  ];

  return (
    <section id="security" className="section">
      <div className="section-header reveal">
        <h2 className="section-title">
          Security & <span className="gradient-accent-text">Optimality</span>
        </h2>
        <p className="section-subtitle">
          We treat reliability, page speed, and application security not as options, but as the foundation of our engineering process.
        </p>
      </div>

      <div className="security-showcase glass reveal">
        <div className="security-left reveal">
          <h3 style={{ fontSize: '1.6rem', marginBottom: '15px' }}>Engineered for Total Protection</h3>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', fontSize: '0.95rem', marginBottom: '25px' }}>
            We implement industry-standard threat mitigation right from the scaffolding stage. By avoiding bulk third-party dependencies and focusing on modular architectures, we drastically reduce vectors of attack while maintaining extremely fast page loads.
          </p>

          <div className="metric-grid">
            {metrics.map((metric, idx) => (
              <div 
                key={idx} 
                className="metric-card glass reveal" 
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <div className="metric-circle">{metric.value}</div>
                <div className="metric-label">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="security-right">
          {features.map((feature, idx) => (
            <div 
              key={idx} 
              className="sec-feature-box reveal" 
              style={{ transitionDelay: `${idx * 150}ms` }}
            >
              <div className="sec-feature-icon">{feature.icon}</div>
              <div>
                <h4 className="sec-feature-title">{feature.title}</h4>
                <p className="sec-feature-desc">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

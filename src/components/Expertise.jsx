import React from 'react';
import { Database, Server, Layout, Cloud, Shield, Cpu, Code, Code2 } from 'lucide-react';

export default function Expertise() {
  const skills = [
    { name: 'React & Next.js', icon: <Layout size={24} /> },
    { name: 'Node.js & Express', icon: <Server size={24} /> },
    { name: 'PostgreSQL & MongoDB', icon: <Database size={24} /> },
    { name: 'Cloud & AWS', icon: <Cloud size={24} /> },
    { name: 'UI/UX Architecture', icon: <Code2 size={24} /> },
    { name: 'Security & Audits', icon: <Shield size={24} /> },
    { name: 'System Optimization', icon: <Cpu size={24} /> },
    { name: 'REST & GraphQL', icon: <Code size={24} /> }
  ];

  return (
    <section id="expertise" className="section" style={{ paddingTop: '60px', paddingBottom: '60px' }}>
      <div className="section-header reveal" style={{ marginBottom: '50px' }}>
        <h2 className="section-title" style={{ fontSize: '2.2rem' }}>
          Core <span className="gradient-accent-text">Expertise</span>
        </h2>
        <p className="section-subtitle" style={{ fontSize: '1.05rem' }}>
          A robust stack of modern technologies powering our enterprise-grade solutions.
        </p>
      </div>

      <div className="expertise-grid reveal" style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
        gap: '25px' 
      }}>
        {skills.map((skill, index) => (
          <div 
            key={index} 
            className="glass" 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '20px', 
              padding: '25px', 
              borderRadius: '16px',
              transition: 'transform var(--transition-fast), border-color var(--transition-fast)',
              cursor: 'default'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.borderColor = 'var(--border-focus)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = 'var(--border-light)';
            }}
          >
            <div style={{ color: 'var(--color-primary)' }}>
              {skill.icon}
            </div>
            <span style={{ fontSize: '1.1rem', fontWeight: '600', color: 'var(--text-primary)' }}>
              {skill.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

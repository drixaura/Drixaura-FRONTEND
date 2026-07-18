import React from 'react';
import { ExternalLink, Calendar, Gift, Compass, Utensils } from 'lucide-react';

export default function Portfolio({ onSelectProject }) {
  const projects = [
    {
      name: 'ArenaRent',
      tag: 'On-Demand Booking',
      desc: 'A real-time slot-booking platform for sports complexes. Enables users to rent turfs and courts for specific times, featuring automated scheduler conflict checks, dynamic pricing algorithms based on demand, and seamless online payment integration. The backend is architected to handle high concurrency during peak booking windows, ensuring a smooth, zero-downtime experience for facility managers and athletes alike.',
      icon: <Calendar size={32} />,
      color: 'linear-gradient(135deg, rgba(102, 252, 241, 0.2) 0%, rgba(189, 0, 255, 0.1) 100%)',
      accentColor: '#66FCF1',
      tech: 'React • Node.js • PostgreSQL • Redis'
    },
    {
      name: 'Blissbox',
      tag: 'Gifting & Experience SaaS',
      desc: 'A premium corporate subscription-box and experience gifting platform. Built with custom bundle configuration flows, interactive tracking dashboards, and robust subscription checkout systems. We engineered a highly modular e-commerce engine that supports complex inventory permutations, dynamic shipping calculation, and automated invoice generation for enterprise clients.',
      icon: <Gift size={32} />,
      color: 'linear-gradient(135deg, rgba(0, 112, 243, 0.2) 0%, rgba(102, 252, 241, 0.1) 100%)',
      accentColor: '#0070f3',
      tech: 'Next.js • MongoDB • Stripe • AWS',
      url: 'https://www.blissboxgifting.in/'
    },
    {
      name: 'Twentyoneholidays',
      tag: 'Luxury Travel Platform',
      desc: 'A bespoke luxury trip-planner and holiday booking portal. Integrates media-rich gallery layouts, customized itinerary configurations, multi-currency checkouts, and dedicated agent management portals. The frontend utilizes advanced pre-rendering and image optimization techniques to deliver a visually stunning, high-performance experience that ranks at the top for core web vitals.',
      icon: <Compass size={32} />,
      color: 'linear-gradient(135deg, rgba(189, 0, 255, 0.2) 0%, rgba(195, 7, 63, 0.1) 100%)',
      accentColor: '#bd00ff',
      tech: 'React • Express • AWS S3 • GraphQL',
      url: 'https://www.twentyoneholidays.com/'
    },
    {
      name: 'DineIn Command',
      tag: 'Restaurant Hospitality System',
      desc: 'An interactive dine-in interface for restaurants and hotels. Enables customers to browse digital menus, configure complex dietary options, and place orders directly to kitchen display screens in real-time. Built around a scalable WebSocket infrastructure to ensure instantaneous bi-directional communication between tableside tablets, point-of-sale systems, and back-of-house operations.',
      icon: <Utensils size={32} />,
      color: 'linear-gradient(135deg, rgba(195, 7, 63, 0.2) 0%, rgba(0, 112, 243, 0.1) 100%)',
      accentColor: '#c3073f',
      tech: 'React • Socket.io • Express • Redis'
    }
  ];

  return (
    <section id="portfolio" className="section">
      <div className="section-header reveal">
        <h2 className="section-title">
          Softwares <span className="gradient-accent-text">Developed</span>
        </h2>
        <p className="section-subtitle">
          Explore a curation of high-end custom web systems we designed, architected, and deployed from scratch.
        </p>
      </div>

      <div className="portfolio-grid">
        {projects.map((project, index) => (
          <div 
            key={index} 
            className="portfolio-card glass reveal" 
            style={{ transitionDelay: `${index * 150}ms` }}
          >
            
            {/* Mock browser mockup container */}
            <div 
              onClick={() => project.url ? window.open(project.url, '_blank', 'noopener,noreferrer') : null}
              style={{ 
                height: '100%',
                minHeight: '260px', 
                background: project.color, 
                borderRadius: '16px', 
                border: '1px solid var(--border-glass)',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: project.url ? 'pointer' : 'default'
              }}
            >
              {/* Browser Header Bar */}
              <div 
                style={{ 
                  position: 'absolute', 
                  top: '0', 
                  left: '0', 
                  width: '100%', 
                  height: '28px', 
                  background: 'rgba(5, 5, 8, 0.6)', 
                  borderBottom: '1px solid var(--border-glass)',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0 15px',
                  gap: '6px'
                }}
              >
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ff5f56' }} />
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ffbd2e' }} />
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#27c93f' }} />
              </div>

              {/* Central Abstract Mockup Content */}
              <div style={{ color: project.accentColor, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
                <div 
                  className="animate-float"
                  style={{ 
                    width: '80px', 
                    height: '80px', 
                    borderRadius: '50%', 
                    background: 'rgba(5, 5, 8, 0.7)', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    border: `1px solid ${project.accentColor}`,
                    boxShadow: `0 0 20px ${project.accentColor}40`
                  }}
                >
                  {project.icon}
                </div>
                <span style={{ fontSize: '0.9rem', fontWeight: '700', letterSpacing: '0.08em', color: 'var(--text-primary)' }}>
                  {project.name.toUpperCase()}
                </span>
              </div>
            </div>

            <div className="portfolio-info" style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center' }}>
              <span className="portfolio-tag" style={{ marginBottom: '10px' }}>{project.tag}</span>
              <h3 style={{ fontSize: '1.8rem', margin: '0 0 15px 0', color: 'var(--text-primary)' }}>{project.name}</h3>
              <p style={{ fontSize: '1.02rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '25px' }}>{project.desc}</p>
              
              <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-glass)', paddingTop: '20px' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '500' }}>{project.tech}</span>
                {project.url ? (
                  <a 
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary"
                    style={{ 
                      padding: '8px 16px',
                      fontSize: '0.85rem'
                    }}
                  >
                    Visit Site
                    <ExternalLink size={16} />
                  </a>
                ) : (
                  <a 
                    href="#contact" 
                    onClick={() => onSelectProject && onSelectProject(project)}
                    className="btn btn-secondary"
                    style={{ 
                      padding: '8px 16px',
                      fontSize: '0.85rem'
                    }}
                  >
                    Inquire
                    <ExternalLink size={16} />
                  </a>
                )}
              </div>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
}

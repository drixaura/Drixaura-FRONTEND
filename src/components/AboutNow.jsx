import React from 'react';
import { Terminal, Layers, Github, Linkedin, ArrowLeft } from 'lucide-react';

export default function AboutNow({ onBackToHome }) {
  const SDEs = [
    {
      name: 'Daksh',
      role: 'Full Stack SDE',
      icon: <Terminal size={18} />,
      image: '/daksh_avatar.jpg',
      bio: 'Daksh is a high-performance Full Stack Software Development Engineer (SDE) specializing in distributed system design, secure backend databases, and cloud architecture. He has deep expertise in architecting REST/GraphQL APIs, managing PostgreSQL and MongoDB databases, and optimizing runtime performance with Redis. Daksh designs resilient backend services while building clean React structures, ensuring that every project has a scalable and highly secure foundation.',
      skills: ['Node.js', 'Express.js', 'PostgreSQL', 'MongoDB', 'Redis', 'AWS (S3/EC2)', 'Docker', 'GraphQL', 'Security Audits', 'REST APIs', 'React.js', 'System Architecture'],
      github: 'https://github.com/daksh',
      linkedin: 'https://linkedin.com/in/daksh',
      glowClass: ''
    },
    {
      name: 'Drishti',
      role: 'Full Stack SDE',
      icon: <Layers size={18} />,
      image: '/drishti_avatar.png',
      bio: 'Drishti is a creative Full Stack Software Development Engineer (SDE) with a strong focus on responsive frontend architectures, micro-interactions, and premium UI/UX design. She specializes in crafting seamless glassmorphic interfaces using React, Next.js, and vanilla CSS, backed by robust server-side controllers in Node.js. Drishti prioritizes performance tuning, SEO positioning, and fluid usability, transforming complex logic into elegant digital experiences.',
      skills: ['React.js', 'Next.js', 'Vanilla CSS', 'UI/UX Design', 'Figma', 'Web Vitals', 'Framer Motion', 'Tailwind CSS', 'Redux', 'REST APIs', 'Node.js', 'Responsive Engineering'],
      github: 'https://github.com/drishti',
      linkedin: 'https://linkedin.com/in/drishti',
      glowClass: 'reverse-glow',
      reverse: true
    }
  ];

  return (
    <section id="about-now" className="section" style={{ minHeight: '92vh', paddingTop: '130px', paddingBottom: '80px' }}>
      <div className="reveal" style={{ marginBottom: '35px' }}>
        <button 
          onClick={onBackToHome}
          className="btn btn-secondary"
          style={{
            padding: '8px 20px',
            fontSize: '0.85rem',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            borderRadius: '50px'
          }}
        >
          <ArrowLeft size={16} />
          Back to Home
        </button>
      </div>

      <div className="section-header reveal">
        <h2 className="section-title">
          About <span className="gradient-accent-text">Now</span>
        </h2>
        <p className="section-subtitle">
          The software engineers and system designers shaping custom solutions from concept to deployment.
        </p>
      </div>

      <div className="creators-container">
        {SDEs.map((sde, index) => (
          <div 
            key={index} 
            className={`creator-profile glass reveal ${sde.reverse ? 'reverse' : ''}`}
            style={{ 
              transitionDelay: `${index * 200}ms`
            }}
          >
            {/* Image side */}
            <div className={`creator-image-wrapper ${sde.glowClass}`}>
              <img 
                src={sde.image} 
                alt={`${sde.name}'s portrait`} 
                className="creator-image"
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=500&q=80"; // fallback
                }}
              />
            </div>

            {/* Description side */}
            <div className="creator-info">
              <span className="creator-role">
                {sde.icon}
                {sde.role}
              </span>
              <h3 className="creator-name">{sde.name}</h3>
              <p className="creator-bio">{sde.bio}</p>
              
              <div className="creator-socials" style={{ display: 'flex', gap: '15px', margin: '5px 0 15px 0' }}>
                <a href={sde.github} target="_blank" rel="noopener noreferrer" className="social-icon" aria-label={`${sde.name} GitHub`}>
                  <Github size={18} />
                </a>
                <a href={sde.linkedin} target="_blank" rel="noopener noreferrer" className="social-icon" aria-label={`${sde.name} LinkedIn`}>
                  <Linkedin size={18} />
                </a>
              </div>
              
              <div className="creator-skills">
                {sde.skills.map((skill, idx) => (
                  <span key={idx} className="skill-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

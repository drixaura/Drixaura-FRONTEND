import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, Terminal as TerminalIcon, Cpu, Database, Network, HardDrive, 
  ShieldCheck, Server, Zap, Globe, GitBranch, RefreshCw, BarChart2 
} from 'lucide-react';

export default function DakshPortfolio({ onBack }) {
  // Page states
  const [activeSection, setActiveSection] = useState('overview');
  const [dropped, setDropped] = useState(false);
  const [flipped, setFlipped] = useState(false);

  // ID Card Physics State & Refs
  const lanyardRef = useRef(null);
  const cardRef = useRef(null);
  const physicsRef = useRef({
    angle: 0,
    angularVelocity: 0,
    angularAcceleration: 0,
    originX: 130, // Centered in 260px container
    originY: 0,
    cardX: 130,
    cardY: 0,
    length: 0, // Starts retracted
    isDragging: false,
    dragStartX: 0,
    dragStartY: 0,
    lastScrollY: 0,
    targetSway: 0
  });

  // Track scroll position for dropping the badge vertically
  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      
      // Drop badge when scrolled down
      if (currentScroll > 60) {
        setDropped(true);
      } else {
        setDropped(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    // Check initial scroll
    if (window.scrollY > 60) {
      setDropped(true);
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Trigger reveal animation for newly mounted elements when activeSection tab changes
  useEffect(() => {
    const timer = setTimeout(() => {
      const revealElements = document.querySelectorAll('.reveal');
      revealElements.forEach((el) => {
        el.classList.add('active');
      });
    }, 50);
    return () => clearTimeout(timer);
  }, [activeSection]);

  // Physics animation loop for the hanging lanyard
  useEffect(() => {
    let animationId;
    const updatePhysics = () => {
      const p = physicsRef.current;
      
      // Smoothly interpolate length based on dropped state
      const targetLength = dropped ? 280 : 0;
      p.length += (targetLength - p.length) * 0.08;

      if (!p.isDragging) {
        // Restoring force (gravity/tension): F = -g/l * sin(theta)
        const gravity = 0.004;
        p.angularAcceleration = -gravity * Math.sin(p.angle);
        
        // Damping / Air resistance
        p.angularVelocity += p.angularAcceleration;
        p.angularVelocity *= 0.982; // damping coefficient
        p.angle += p.angularVelocity;
        
        // Sway target towards mouse cursor displacement if close (proximity sway)
        p.angle += (p.targetSway - p.angle) * 0.1;
      }
      
      // Calculate rope path and card positioning based on the angle
      const endX = p.originX + p.length * Math.sin(p.angle);
      const endY = p.originY + p.length * Math.cos(p.angle);
      
      p.cardX = endX;
      p.cardY = endY;

      // Update lanyard SVG path
      if (lanyardRef.current) {
        const ctrlX = p.originX + (p.length * 0.4) * Math.sin(p.angle * 1.5);
        const ctrlY = p.originY + (p.length * 0.5);
        lanyardRef.current.setAttribute('d', `M${p.originX},${p.originY} Q${ctrlX},${ctrlY} ${endX},${endY}`);
      }

      // Update Card translation & rotation
      if (cardRef.current) {
        cardRef.current.style.transform = `translate(${endX - p.originX}px, ${endY - 280}px) rotate(${p.angle * 45}deg)`;
      }

      animationId = requestAnimationFrame(updatePhysics);
    };

    animationId = requestAnimationFrame(updatePhysics);
    return () => cancelAnimationFrame(animationId);
  }, [dropped]);

  // Drag handlers for the badge
  const handleDragStart = (e) => {
    const p = physicsRef.current;
    p.isDragging = true;
    
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    
    p.dragStartX = clientX;
    p.dragStartY = clientY;
  };

  const handleDragMove = (e) => {
    const p = physicsRef.current;
    if (!p.isDragging) return;

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    const dx = clientX - p.dragStartX;
    
    // Calculate new angle based on drag displacement
    const maxDragAngle = Math.PI / 4; // limit to 45 deg
    const newAngle = Math.max(-maxDragAngle, Math.min(maxDragAngle, dx * 0.005));
    
    p.angle = newAngle;
    p.angularVelocity = 0; // stop velocity while dragging
  };

  const handleDragEnd = () => {
    physicsRef.current.isDragging = false;
  };

  // Proximity sway on mouse moving near the card
  const handleMouseMoveNear = (e) => {
    const p = physicsRef.current;
    if (p.isDragging) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const hoverX = e.clientX - rect.left - (rect.width / 2);
    // sway target angle based on hover position (subtle displacement)
    p.targetSway = Math.max(-0.15, Math.min(0.15, hoverX * 0.002));
  };

  const handleMouseLeave = () => {
    physicsRef.current.targetSway = 0;
  };


  // ==========================================
  // Terminal Emulator States & Logic
  // ==========================================
  const [terminalHistory, setTerminalHistory] = useState([
    { type: 'output', text: 'DrixOS (v2.0-secure-core) initialized.' },
    { type: 'output', text: 'Type "help" to view the available profile commands.' },
    { type: 'output', text: '' }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [matrixActive, setMatrixActive] = useState(false);
  const terminalEndRef = useRef(null);

  const handleTerminalSubmit = (e) => {
    e.preventDefault();
    const command = inputVal.trim();
    if (!command) return;

    const newHistory = [...terminalHistory, { type: 'prompt', text: `daksh@drixaura:~$ ${command}` }];
    const cmdClean = command.toLowerCase();

    if (cmdClean === 'help') {
      newHistory.push({ type: 'output', text: 'Available commands:\n  about     - Brief biographical overview\n  skills    - Display technical skills stack profile\n  projects  - Show e-commerce & travel platforms engineered\n  neofetch  - Output specs and OS environment credentials\n  matrix    - Toggle green code screen matrix rainfall\n  clear     - Wipe clean the terminal screen buffer' });
    } else if (cmdClean === 'about') {
      newHistory.push({ type: 'output', text: 'Biography:\n Daksh Bhatt is a motivated Computer Science Engineering student @ J.C. Bose YMCA (2023-2027)\n and Full Stack Developer. Passionate about software engineering, clean code, scalable architecture,\n problem-solving, and continuous learning.\n Location: Haryana, India.' });
    } else if (cmdClean === 'skills') {
      newHistory.push({ type: 'output', text: 'Technical Skills Profile:\n\n Frontend:  React, JavaScript, HTML5, CSS3, Tailwind CSS\n Backend:   REST APIs, Firebase\n Database:  PostgreSQL, Database Design, Database Architecture\n Tools:     Git, GitHub, VS Code, Figma, Postman' });
    } else if (cmdClean === 'projects') {
      newHistory.push({ type: 'output', text: 'Projects & Professional Experience:\n\n [1] Twenty One Holidays (Travel Platform) - Feb 2026 - Present\n     - Developed travel booking platform with dynamic search and package filtering.\n     - Designed RESTful APIs using PostgreSQL and Firebase.\n     - Optimized performance, responsiveness, and SEO.\n\n [2] Blissbox Gifting (E-commerce Platform)\n     - Built modern personalized gifting store catalog and checkout system.\n     - Integrated secure user authentication and payment-ready architecture.' });
    } else if (cmdClean === 'neofetch') {
      newHistory.push({ type: 'output', text: '  ██████╗  ██████╗  ██╗  ██╗  ███████╗  \n  ██╔══██╗ ██╔══██╗ ╚██╗██╔╝  ██╔════╝  \n  ██║  ██║ ██████╔╝  ╚███╔╝   ███████╗  \n  ██║  ██║ ██╔══██╗  ██╔██╗   ╚════██║  \n  ██████╔╝ ██║  ██║ ██╔╝ ╚██╗ ███████║  \n  ╚══════╝  ╚═╝  ╚═╝ ╚═╝   ╚═╝ ╚══════╝  \n---------------------------------------\n OS: DrixOS v2.0.4-x86_64\n Host: J.C. Bose UST, YMCA (CSE B.Tech)\n Uptime: Feb 2026 - Present\n Location: Haryana, India\n Shell: bash-secure\n Target Engine: React / Tailwind / Postgres / Firebase' });
    } else if (cmdClean === 'matrix') {
      setMatrixActive(!matrixActive);
      newHistory.push({ type: 'output', text: matrixActive ? 'Matrix code rain deactivated.' : 'Matrix code rain triggered! Look at the terminal background.' });
    } else if (cmdClean === 'clear') {
      setTerminalHistory([]);
      setInputVal('');
      return;
    } else {
      newHistory.push({ type: 'output', text: `Command not found: "${command}". Type "help" for support.` });
    }

    setTerminalHistory(newHistory);
    setInputVal('');
  };

  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [terminalHistory]);


  // ==========================================
  // System Architect Visualizer States & Logic
  // ==========================================
  const [selectedNode, setSelectedNode] = useState('gateway');
  const [simulationActive, setSimulationActive] = useState(false);
  const [simulationType, setSimulationType] = useState('hit'); // 'hit' or 'miss'
  const [simStep, setSimStep] = useState(0);

  const nodes = {
    client: {
      name: 'Client App (React)',
      status: 'Active',
      details: 'Vite-React UI optimized for client execution. Integrates local storage caching and pre-rendering states for maximum responsiveness.',
      metric: 'Response: 0ms (Local)'
    },
    gateway: {
      name: 'API Gateway & Rate Limiter',
      status: 'Protected',
      details: 'Reverse proxy utilizing Token Bucket algorithm. Deflects DDoS attempts and filters malicious requests prior to forwarding to services.',
      metric: 'Latency: 1.2ms'
    },
    redis: {
      name: 'Redis Cache Cluster',
      status: '99.4% Hit Rate',
      details: 'In-memory data grid caching relational query results, authentication states, and high-velocity slot allocations. Runs on strict eviction rules.',
      metric: 'Lookup: 0.4ms'
    },
    app: {
      name: 'Node.js Express App',
      status: 'Nominal',
      details: 'Multi-threaded cluster hosts secure REST & GraphQL endpoints. Features async connection pooling and custom authorization hooks.',
      metric: 'Process: 8ms'
    },
    db: {
      name: 'PostgreSQL Database',
      status: 'Synced',
      details: 'Enterprise-grade relational database running replica clusters. Strict foreign constraints, transactional rollbacks, and composite index structures.',
      metric: 'Commit: 15ms'
    }
  };

  const startArchitectureSimulation = (type) => {
    if (simulationActive) return;
    setSimulationActive(true);
    setSimulationType(type);
    setSimStep(1);

    // Simulation steps logic
    const duration = 800; // time per node transition
    
    // Step 1: Client to Gateway
    setTimeout(() => {
      setSimStep(2); // Gateway
      setSelectedNode('gateway');
      
      // Step 2: Gateway to Redis
      setTimeout(() => {
        setSimStep(3); // Redis
        setSelectedNode('redis');

        if (type === 'hit') {
          // Cache Hit Path: returns from Redis back to Client
          setTimeout(() => {
            setSimStep(6); // Return to Client (Fast Path)
            setSelectedNode('client');
            setTimeout(() => {
              setSimulationActive(false);
              setSimStep(0);
            }, duration);
          }, duration);
        } else {
          // Cache Miss Path: Redis to App Server
          setTimeout(() => {
            setSimStep(4); // App Server
            setSelectedNode('app');

            // Step 4: App Server to PostgreSQL DB
            setTimeout(() => {
              setSimStep(5); // DB Write/Query
              setSelectedNode('db');

              // Step 5: Return path back to Client via App Server
              setTimeout(() => {
                setSimStep(6); // Returning
                setSelectedNode('client');
                setTimeout(() => {
                  setSimulationActive(false);
                  setSimStep(0);
                }, duration);
              }, duration * 1.2);
            }, duration);
          }, duration);
        }
      }, duration);
    }, duration);
  };

  return (
    <div className="portfolio-page-container">
      {/* Hanging ID Card Widget */}
      <div className={`hanging-id-card-wrapper ${dropped ? 'dropped' : ''}`}>
        <svg className="lanyard-svg">
          <path ref={lanyardRef} className="lanyard-line" />
        </svg>
        <div 
          ref={cardRef}
          className={`hanging-id-card ${flipped ? 'flipped' : ''}`}
          onMouseMove={handleMouseMoveNear}
          onMouseLeave={handleMouseLeave}
          onMouseDown={handleDragStart}
          onMouseMoveCapture={handleDragMove}
          onMouseUp={handleDragEnd}
          onTouchStart={handleDragStart}
          onTouchMove={handleDragMove}
          onTouchEnd={handleDragEnd}
          onClick={() => setFlipped(!flipped)}
          title="Click to Flip Badge"
        >
          <div className="card-inner">
            {/* Card Front */}
            <div className="card-face card-front">
              <span className="badge-header">DRIXAURA SDE</span>
              <div className="badge-photo-wrapper">
                <img 
                  src="/daksh_avatar.jpg" 
                  alt="Daksh Portrait" 
                  className="badge-photo"
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80";
                  }}
                />
              </div>
              <h4 className="badge-name" style={{ fontSize: '1.1rem' }}>DAKSH BHATT</h4>
              <span className="badge-role">Full Stack Developer</span>
              <div className="badge-rfid">
                <div className="badge-led" />
                CS ENGINEER (YMCA)
              </div>
              <span className="badge-barcode">||||| 8279529887 |||||</span>
            </div>

            {/* Card Back */}
            <div className="card-face card-back">
              <div className="badge-chip" />
              <div className="badge-back-row">
                <span>EMAIL</span>
                <span>daksh.bh28@gmail.com</span>
              </div>
              <div className="badge-back-row">
                <span>PHONE</span>
                <span>+91 8279529887</span>
              </div>
              <div className="badge-back-row">
                <span>GITHUB</span>
                <span>Daksh2828</span>
              </div>
              <div className="badge-back-row">
                <span>LINKEDIN</span>
                <span>daksh-bhatt-8a8a7b304</span>
              </div>
              <div className="badge-back-row">
                <span>LOC</span>
                <span>Haryana, India</span>
              </div>
              <p className="badge-disclaimer">
                B.TECH CSE STUDENT @ YMCA (2023-2027). AUTHORIZED PORTFOLIO ACCESS.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="section" style={{ padding: '0 20px' }}>
        {/* Navigation back and header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }} className="reveal">
          <button 
            onClick={onBack}
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
            Back to Team
          </button>

          <span className="badge-rfid" style={{ display: 'flex', gap: '8px', fontSize: '0.75rem', padding: '6px 14px' }}>
            <span className="badge-led" />
            SECURE PORTAL ONLINE
          </span>
        </div>

        {/* Hero Section Header */}
        <div className="section-header reveal" style={{ textAlign: 'left', marginBottom: '50px' }}>
          <h1 className="section-title" style={{ fontSize: '3.5rem', lineHeight: '1.1' }}>
            Daksh | <span style={{ color: 'var(--color-primary)' }}>Systems Architect</span>
          </h1>
          <p className="section-subtitle" style={{ margin: '15px 0 0 0', maxWidth: '750px', fontSize: '1.2rem', lineHeight: '1.6' }}>
            Building high-performance server pipelines, distributed transactional queuing, and robust caching topologies.
          </p>
        </div>

        {/* Dynamic Navigation Pills */}
        <div style={{ display: 'flex', gap: '15px', marginBottom: '40px', overflowX: 'auto', paddingBottom: '10px' }} className="reveal">
          {['overview', 'terminal', 'architecture', 'metrics', 'System Engineering'].map((sec) => (
            <button
              key={sec}
              onClick={() => setActiveSection(sec)}
              className={`btn ${activeSection === sec ? 'btn-primary' : 'btn-secondary'}`}
              style={{ padding: '8px 22px', fontSize: '0.85rem', whiteSpace: 'nowrap' }}
            >
              {sec}
            </button>
          ))}
        </div>

        {/* Overview Tab Content */}
        {activeSection === 'overview' && (
          <div className="creators-container" style={{ gridTemplateColumns: '1fr', gap: '30px' }}>
            <div className="creator-profile glass reveal" style={{ width: '100%', minHeight: 'auto' }}>
              <div className="creator-info" style={{ width: '100%', paddingRight: '0' }}>
                <h3 className="creator-name" style={{ fontSize: '2rem', marginBottom: '20px' }}>Professional Biography</h3>
                <p className="creator-bio" style={{ fontSize: '1.1rem', lineHeight: '1.7', marginBottom: '25px', color: 'var(--text-secondary)' }}>
                  Motivated Computer Science Engineering student and Full Stack Developer with hands-on experience building responsive web applications and scalable backend systems. Currently working on production-ready web platforms, delivering real-world solutions and improving user experience. Passionate about software engineering, clean code, scalable architecture, problem-solving, and continuous learning.
                </p>
                <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap', marginBottom: '25px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: '600' }}>Primary Role</span>
                    <span style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--color-primary)', marginTop: '5px' }}>Full Stack Developer</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: '600' }}>Core Stack</span>
                    <span style={{ fontSize: '1rem', fontWeight: '700', color: '#fff', marginTop: '5px' }}>React / JavaScript / Tailwind / PostgreSQL / Firebase</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: '600' }}>Education</span>
                    <span style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--color-secondary)', marginTop: '5px' }}>B.Tech CSE @ J.C. Bose UST, YMCA (2023 - 2027)</span>
                  </div>
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginTop: '20px' }}>
                  <div>
                    <h4 style={{ fontSize: '1.25rem', marginBottom: '15px', color: '#fff' }}>Key Achievements & Milestones</h4>
                    <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: '0.95rem' }}>
                      <li>Developed and maintained the production-ready travel booking platform for Twenty One Holidays.</li>
                      <li>Built a modern e-commerce platform for personalized gifting products at Blissbox Gifting.</li>
                      <li>Designed and integrated RESTful APIs with PostgreSQL database design and Firebase connection.</li>
                      <li>Implemented secure authentication, user management, and dynamic package filtering flows.</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 style={{ fontSize: '1.25rem', marginBottom: '15px', color: '#fff' }}>GCP Certifications & Skill Badges</h4>
                    <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: '0.95rem' }}>
                      <li>Google Cloud - The Basics of Google Cloud Compute</li>
                      <li>Google Cloud - Set Up a Google Cloud Network</li>
                      <li>Google Cloud - Manage Kubernetes in Google Cloud</li>
                      <li>Google Cloud - Get Started with Cloud Storage</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* System Engineering Tab Content */}
        {activeSection === 'System Engineering' && (
          <div className="creators-container" style={{ gridTemplateColumns: '1fr', gap: '30px' }}>
            <div className="creator-profile glass reveal" style={{ width: '100%', minHeight: 'auto' }}>
              <div className="creator-info" style={{ width: '100%', paddingRight: '0' }}>
                <h3 className="creator-name" style={{ fontSize: '2rem', marginBottom: '20px' }}>System Engineering Philosophy</h3>
                <p className="creator-bio" style={{ fontSize: '1.1rem', lineHeight: '1.7', marginBottom: '25px', color: 'var(--text-secondary)' }}>
                  "I write software under the assumption that systems will fail, networks will latency spike, and client request surges will occur. By decoupling state utilizing distributed cached channels, incorporating stringent token-based security, and designing transaction rollbacks, I engineer backends that remain structurally sound under high stress load profiles."
                </p>
                <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: '600' }}>Focus Areas</span>
                    <span style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--color-primary)', marginTop: '5px' }}>Concurrency, Security, Latency</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: '600' }}>Active Tech Stack</span>
                    <span style={{ fontSize: '1rem', fontWeight: '700', color: '#fff', marginTop: '5px' }}>Redis, PostgreSQL, Node, Go, Docker</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: '600' }}>System Certifications</span>
                    <span style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--color-secondary)', marginTop: '5px' }}>AWS Arch Professional, OCP-DB</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Visual Skill Tags Section */}
            <div className="portfolio-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
              <div className="glass reveal" style={{ padding: '25px' }}>
                <h4 style={{ fontSize: '1.2rem', color: 'var(--color-primary)', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Cpu size={20} /> High Concurrency Queues
                </h4>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                  Prevents double slot allocations inside booking platforms like ArenaRent by utilizing Redis transactional lock chains and distributed memory locks.
                </p>
              </div>

              <div className="glass reveal" style={{ padding: '25px' }}>
                <h4 style={{ fontSize: '1.2rem', color: 'var(--color-primary)', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Database size={20} /> Advanced Relational Schemas
                </h4>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                  Designs schema topologies with composite secondary index models, partitioning rules, and custom stored functions for high throughput commits.
                </p>
              </div>

              <div className="glass reveal" style={{ padding: '25px' }}>
                <h4 style={{ fontSize: '1.2rem', color: 'var(--color-primary)', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <ShieldCheck size={20} /> Security Architecture
                </h4>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                  Configures authorization flow middlewares, secure API routes, encryption-at-rest hashes (AES-256), and conducts database audits.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Terminal Tab Content */}
        {activeSection === 'terminal' && (
          <div className="reveal">
            <div style={{ marginBottom: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                Interactive DrixOS console. Click inside and type commands like <code>help</code>, <code>skills</code>, or <code>neofetch</code>.
              </p>
              <button 
                onClick={() => setTerminalHistory([{ type: 'output', text: 'Terminal output buffer cleared.' }])}
                className="btn btn-secondary" 
                style={{ padding: '4px 12px', fontSize: '0.75rem', borderRadius: '4px' }}
              >
                Clear Screen
              </button>
            </div>

            <div className="terminal-panel">
              <div className="terminal-header">
                <div className="terminal-dots">
                  <div className="terminal-dot close" />
                  <div className="terminal-dot minimize" />
                  <div className="terminal-dot maximize" />
                </div>
                <span className="terminal-title">daksh@drixaura:~</span>
                <span className="terminal-title">bash-secure</span>
              </div>
              <div className="terminal-body" style={{ position: 'relative' }}>
                {/* Matrix Background overlay */}
                {matrixActive && (
                  <div 
                    style={{
                      position: 'absolute',
                      top: 0, left: 0, right: 0, bottom: 0,
                      background: 'rgba(0, 5, 0, 0.9)',
                      color: 'rgba(51, 255, 51, 0.25)',
                      fontFamily: 'monospace',
                      fontSize: '0.75rem',
                      lineHeight: '1.1',
                      overflow: 'hidden',
                      zIndex: 1,
                      pointerEvents: 'none',
                      padding: '10px',
                      whiteSpace: 'pre'
                    }}
                  >
                    {Array.from({ length: 15 }).map((_, i) => (
                      <div key={i} style={{ animation: `float ${2 + (i % 3)}s linear infinite`, animationDelay: `${i * 0.1}s` }}>
                        {Array.from({ length: 45 }).map(() => String.fromCharCode(33 + Math.floor(Math.random() * 93))).join(' ')}
                      </div>
                    ))}
                  </div>
                )}
                
                <div style={{ position: 'relative', zIndex: 2 }}>
                  {terminalHistory.map((item, idx) => (
                    <div 
                      key={idx} 
                      style={{ 
                        whiteSpace: 'pre-wrap', 
                        marginBottom: '8px', 
                        color: item.type === 'prompt' ? 'var(--color-primary)' : '#33ff33' 
                      }}
                    >
                      {item.text}
                    </div>
                  ))}
                  <div ref={terminalEndRef} />
                  
                  <form onSubmit={handleTerminalSubmit} className="terminal-input-line">
                    <span className="terminal-prompt">daksh@drixaura:~$</span>
                    <input 
                      type="text" 
                      className="terminal-input"
                      value={inputVal}
                      onChange={(e) => setInputVal(e.target.value)}
                      autoFocus
                    />
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Architecture Tab Content */}
        {activeSection === 'architecture' && (
          <div className="reveal">
            <div className="system-visualizer-card glass">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', flexWrap: 'wrap', gap: '15px' }}>
                <div>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '6px' }}>Distributed Architecture Flow</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    Hover over nodes to inspect details. Simulate cache states to analyze packet flow path.
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button 
                    onClick={() => startArchitectureSimulation('hit')}
                    disabled={simulationActive}
                    className="btn btn-secondary"
                    style={{ padding: '6px 14px', fontSize: '0.8rem', borderColor: '#27c93f', color: '#27c93f' }}
                  >
                    <RefreshCw size={14} className={simulationActive && simulationType==='hit' ? 'spin' : ''} />
                    Simulate Cache Hit
                  </button>
                  <button 
                    onClick={() => startArchitectureSimulation('miss')}
                    disabled={simulationActive}
                    className="btn btn-secondary"
                    style={{ padding: '6px 14px', fontSize: '0.8rem', borderColor: '#ff5f56', color: '#ff5f56' }}
                  >
                    <RefreshCw size={14} className={simulationActive && simulationType==='miss' ? 'spin' : ''} />
                    Simulate Cache Miss
                  </button>
                </div>
              </div>

              {/* Node Graph Grid */}
              <div className="system-nodes-grid">
                {/* Node 1: Client */}
                <div 
                  className={`arch-node-card ${selectedNode === 'client' ? 'active' : ''} ${simulationActive && simStep === 1 ? 'animate-pulse' : ''}`}
                  onMouseEnter={() => setSelectedNode('client')}
                >
                  <div className="node-icon-wrapper">
                    <Globe size={24} />
                  </div>
                  <div className="node-title">React Client</div>
                  <div className="node-status">
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#27c93f', display: 'inline-block' }} />
                    Active
                  </div>
                </div>

                {/* Node 2: Gateway */}
                <div 
                  className={`arch-node-card ${selectedNode === 'gateway' ? 'active' : ''} ${simulationActive && simStep === 2 ? 'animate-pulse' : ''}`}
                  onMouseEnter={() => setSelectedNode('gateway')}
                >
                  <div className="node-icon-wrapper">
                    <Network size={24} />
                  </div>
                  <div className="node-title">API Gateway</div>
                  <div className="node-status">
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#27c93f', display: 'inline-block' }} />
                    Rate Limited
                  </div>
                </div>

                {/* Node 3: Redis Cache */}
                <div 
                  className={`arch-node-card ${selectedNode === 'redis' ? 'active' : ''} ${simulationActive && simStep === 3 ? 'animate-pulse' : ''}`}
                  onMouseEnter={() => setSelectedNode('redis')}
                >
                  <div className="node-icon-wrapper">
                    <HardDrive size={24} />
                  </div>
                  <div className="node-title">Redis Cache</div>
                  <div className="node-status" style={{ color: 'var(--color-primary)' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--color-primary)', display: 'inline-block' }} />
                    Evict LFU
                  </div>
                </div>

                {/* Node 4: Express Server */}
                <div 
                  className={`arch-node-card ${selectedNode === 'app' ? 'active' : ''} ${simulationActive && simStep === 4 ? 'animate-pulse' : ''}`}
                  onMouseEnter={() => setSelectedNode('app')}
                >
                  <div className="node-icon-wrapper">
                    <Server size={24} />
                  </div>
                  <div className="node-title">Node Server</div>
                  <div className="node-status">
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#27c93f', display: 'inline-block' }} />
                    Cluster (x8)
                  </div>
                </div>

                {/* Node 5: Database */}
                <div 
                  className={`arch-node-card ${selectedNode === 'db' ? 'active' : ''} ${simulationActive && simStep === 5 ? 'animate-pulse' : ''}`}
                  onMouseEnter={() => setSelectedNode('db')}
                >
                  <div className="node-icon-wrapper">
                    <Database size={24} />
                  </div>
                  <div className="node-title">Postgres DB</div>
                  <div className="node-status">
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#27c93f', display: 'inline-block' }} />
                    Replica Sync
                  </div>
                </div>
              </div>

              {/* Dynamic Connection lines SVG */}
              <div className="flow-svg-container">
                <svg width="100%" height="20" style={{ overflow: 'visible' }}>
                  {/* Base passive lines */}
                  <line x1="10%" y1="10" x2="90%" y2="10" className="flow-line" />
                  
                  {/* Dynamic active simulations */}
                  {simulationActive && (
                    <>
                      {/* Step 1: Client to Gateway */}
                      {simStep >= 1 && simStep <= 2 && (
                        <line x1="10%" y1="10" x2="30%" y2="10" className="flow-line-active" />
                      )}
                      
                      {/* Step 2: Gateway to Redis */}
                      {simStep >= 2 && simStep <= 3 && (
                        <line x1="30%" y1="10" x2="50%" y2="10" className="flow-line-active" />
                      )}

                      {/* Step 3 (Cache Hit): Redis back to Client */}
                      {simulationType === 'hit' && simStep >= 3 && simStep <= 6 && (
                        <path d="M 50 10 Q 30 -10 10 10" fill="none" className="flow-line-active" style={{ stroke: '#27c93f' }} />
                      )}

                      {/* Step 3 (Cache Miss): Redis to App */}
                      {simulationType === 'miss' && simStep >= 3 && simStep <= 4 && (
                        <line x1="50%" y1="10" x2="70%" y2="10" className="flow-line-active" style={{ stroke: '#ffbd2e' }} />
                      )}

                      {/* Step 4: App to DB */}
                      {simulationType === 'miss' && simStep >= 4 && simStep <= 5 && (
                        <line x1="70%" y1="10" x2="90%" y2="10" className="flow-line-active" style={{ stroke: '#ff5f56' }} />
                      )}

                      {/* Return Path from DB back */}
                      {simulationType === 'miss' && simStep >= 5 && simStep <= 6 && (
                        <path d="M 90 10 Q 50 40 10 10" fill="none" className="flow-line-active" style={{ stroke: '#27c93f' }} />
                      )}
                    </>
                  )}
                </svg>
              </div>

              {/* Node Details Panel */}
              <div 
                style={{ 
                  padding: '20px', 
                  borderRadius: '8px', 
                  background: 'rgba(255,255,255,0.02)', 
                  border: '1px solid rgba(255,255,255,0.06)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '20px'
                }}
              >
                <div style={{ maxWidth: '75%' }}>
                  <h4 style={{ fontSize: '1.1rem', color: '#fff', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {nodes[selectedNode].name}
                    <span style={{ fontSize: '0.75rem', background: 'rgba(102, 252, 241, 0.1)', color: 'var(--color-primary)', padding: '2px 8px', borderRadius: '12px' }}>
                      {nodes[selectedNode].status}
                    </span>
                  </h4>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                    {nodes[selectedNode].details}
                  </p>
                </div>
                
                <div className="metric-pill">
                  <span className="metric-pill-label">Performance</span>
                  <span className="metric-pill-value">{nodes[selectedNode].metric}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Metrics Tab Content */}
        {activeSection === 'metrics' && (
          <div className="reveal">
            <div className="skills-radar-section">
              <div className="glass" style={{ padding: '30px' }}>
                <h3 style={{ fontSize: '1.4rem', marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <BarChart2 size={20} className="gradient-text" /> Performance SLA Scores
                </h3>
                
                <div className="skill-metric-bar">
                  <div className="skill-bar-label">
                    <span>Database Query Speed (95th Pctl)</span>
                    <span style={{ color: 'var(--color-primary)' }}>12ms</span>
                  </div>
                  <div className="skill-bar-track">
                    <div className="skill-bar-fill animate-fill" style={{ width: '95%' }} />
                  </div>
                </div>

                <div className="skill-metric-bar">
                  <div className="skill-bar-label">
                    <span>API Gateway Rate-Limiting Uptime</span>
                    <span style={{ color: 'var(--color-primary)' }}>99.999%</span>
                  </div>
                  <div className="skill-bar-track">
                    <div className="skill-bar-fill animate-fill" style={{ width: '99%' }} />
                  </div>
                </div>

                <div className="skill-metric-bar">
                  <div className="skill-bar-label">
                    <span>Redis Cache Cache-Hit Efficiency</span>
                    <span style={{ color: 'var(--color-primary)' }}>98.4%</span>
                  </div>
                  <div className="skill-bar-track">
                    <div className="skill-bar-fill animate-fill" style={{ width: '98%' }} />
                  </div>
                </div>

                <div className="skill-metric-bar">
                  <div className="skill-bar-label">
                    <span>SSL/TLS Handshake Handover Time</span>
                    <span style={{ color: 'var(--color-primary)' }}>4.8ms</span>
                  </div>
                  <div className="skill-bar-track">
                    <div className="skill-bar-fill animate-fill" style={{ width: '92%' }} />
                  </div>
                </div>
              </div>

              <div className="glass" style={{ padding: '30px' }}>
                <h3 style={{ fontSize: '1.4rem', marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <ShieldCheck size={20} style={{ color: 'var(--color-secondary)' }} /> Security Audits & Health
                </h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  <div style={{ padding: '15px', borderRadius: '8px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                      <Zap size={18} style={{ color: '#27c93f' }} />
                      <div>
                        <div style={{ fontWeight: '700', fontSize: '0.95rem' }}>OWASP Top 10 Audit</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Continuous dynamic vulnerability scans</div>
                      </div>
                    </div>
                    <span style={{ fontSize: '0.8rem', background: 'rgba(39, 201, 63, 0.1)', color: '#27c93f', padding: '3px 8px', borderRadius: '20px', fontWeight: '700' }}>PASSED</span>
                  </div>

                  <div style={{ padding: '15px', borderRadius: '8px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                      <HardDrive size={18} style={{ color: '#27c93f' }} />
                      <div>
                        <div style={{ fontWeight: '700', fontSize: '0.95rem' }}>Database Partition Status</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Table partitions index optimization</div>
                      </div>
                    </div>
                    <span style={{ fontSize: '0.8rem', background: 'rgba(39, 201, 63, 0.1)', color: '#27c93f', padding: '3px 8px', borderRadius: '20px', fontWeight: '700' }}>OPTIMAL</span>
                  </div>

                  <div style={{ padding: '15px', borderRadius: '8px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                      <GitBranch size={18} style={{ color: 'var(--color-primary)' }} />
                      <div>
                        <div style={{ fontWeight: '700', fontSize: '0.95rem' }}>CI/CD Pipeline Security</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Automated docker container signing</div>
                      </div>
                    </div>
                    <span style={{ fontSize: '0.8rem', background: 'rgba(102, 252, 241, 0.1)', color: 'var(--color-primary)', padding: '3px 8px', borderRadius: '20px', fontWeight: '700' }}>SIGNED</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

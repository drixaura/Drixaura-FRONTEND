import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, Layers, Palette, Eye, Layout, Compass, Sliders, 
  Cpu, Database, Network, HardDrive, ShieldCheck, Server, Zap, 
  Globe, GitBranch, RefreshCw, BarChart2 
} from 'lucide-react';

export default function DrishtiPortfolio({ onBack }) {
  // Navigation states
  const [activeSection, setActiveSection] = useState('overview');
  
  // Interactive glassmorphic sandbox states
  const [blur, setBlur] = useState(12);
  const [opacity, setOpacity] = useState(0.15);
  const [color, setColor] = useState('#bd00ff'); // default to purple accent for Drishti
  const [copied, setCopied] = useState(false);

  const cssString = `background: rgba(${color === '#66FCF1' ? '102, 252, 241' : '189, 0, 255'}, ${opacity});
backdrop-filter: blur(${blur}px);
-webkit-backdrop-filter: blur(${blur}px);
border: 1px solid rgba(255, 255, 255, 0.15);
border-radius: 16px;
box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3);`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(cssString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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

  // ==========================================
  // Terminal Emulator States & Logic
  // ==========================================
  const [terminalHistory, setTerminalHistory] = useState([
    { type: 'output', text: 'DrixOS (v2.0-ui-core) initialized.' },
    { type: 'output', text: 'Type "help" to view the available profile commands.' },
    { type: 'output', text: '' }
  ]);
  const [inputVal, setInputVal] = useState('');
  const terminalEndRef = useRef(null);

  const handleTerminalSubmit = (e) => {
    e.preventDefault();
    const command = inputVal.trim();
    if (!command) return;

    const newHistory = [...terminalHistory, { type: 'prompt', text: `drishti@drixaura:~$ ${command}` }];
    const cmdClean = command.toLowerCase();

    if (cmdClean === 'help') {
      newHistory.push({ type: 'output', text: 'Available commands:\n  about     - Brief biographical overview\n  skills    - Display frontend capabilities bar chart\n  projects  - Show detailed frontend engineering specifications\n  neofetch  - Output specs and OS environment credentials\n  clear     - Wipe clean the terminal screen buffer' });
    } else if (cmdClean === 'about') {
      newHistory.push({ type: 'output', text: 'Biography:\n Drishti is a creative Full Stack SDE focusing on frontend rendering architectures,\n micro-interactions, and visual execution. She designs smooth animations,\n glassmorphic UI tokens, and optimizes layouts for perfect core web vitals.\n Clearance Level: Level 5 Administrator.\n Philosophy: Code is design, animations must be 60fps, UX must be fluid.' });
    } else if (cmdClean === 'skills') {
      newHistory.push({ type: 'output', text: 'Frontend Skills Distribution Profile:\n\n React / Next.js     [████████████████████] 100%\n CSS Animations      [████████████████████] 100%\n UI/UX Design System [██████████████████░░] 90%\n Web Vitals Perf     [██████████████████░░] 90%\n State Managers      [████████████████░░░░] 80%\n Responsive Dev      [████████████████████] 100%' });
    } else if (cmdClean === 'projects') {
      newHistory.push({ type: 'output', text: 'Visual Systems Engineered:\n\n [1] Twentyoneholidays Interface:\n     - Optimized image pre-rendering and asset payloads.\n     - Reduced First Contentful Paint by 40%.\n\n [2] Blissbox Bundle Customizer:\n     - Engineered drag-and-drop React bundles with complex sub-pixel borders.\n     - Fluid animations ran at a consistent 60fps.' });
    } else if (cmdClean === 'neofetch') {
      newHistory.push({ type: 'output', text: '  ██████╗  ██████╗  ██╗  ██╗  ███████╗  \n  ██╔══██╗ ██╔══██╗ ╚██╗██╔╝  ██╔════╝  \n  ██║  ██║ ██████╔╝  ╚███╔╝   ███████╗  \n  ██║  ██║ ██╔══██╗  ██╔██╗   ╚════██║  \n  ██████╔╝ ██║  ██║ ██╔╝ ╚██╗ ███████║  \n  ╚══════╝  ╚═╝  ╚═╝ ╚═╝   ╚═╝ ╚══════╝  \n---------------------------------------\n OS: DrixOS v2.0.4-x86_64\n Kernel: 6.12.1-drishti-ui-subsystem\n Shell: bash-secure\n Target Engine: React 19 / Next.js\n Browser Optimization: Chrome, Safari, Firefox\n Rendering: Server-Side Hydrated + SSR' });
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
  // Frontend Hydration Visualizer States & Logic
  // ==========================================
  const [selectedNode, setSelectedNode] = useState('state');
  const [simulationActive, setSimulationActive] = useState(false);
  const [simulationType, setSimulationType] = useState('hydrate'); // 'hydrate' or 'render'
  const [simStep, setSimStep] = useState(0);

  const nodes = {
    view: {
      name: 'DOM Viewport',
      status: 'Rendered',
      details: 'HTML nodes populated with client-side event handlers. Dynamic glassmorphism layers are applied and interactive canvas starts.',
      metric: 'FID: 8ms'
    },
    state: {
      name: 'State Manager (Redux/Zustand)',
      status: 'Synced',
      details: 'Central state manager holding theme parameters, active routing profiles, and real-time custom configuration states.',
      metric: 'Update: 0.1ms'
    },
    fetcher: {
      name: 'API Fetcher (GraphQL)',
      status: 'Idle',
      details: 'Query middleware linking user actions to database APIs. Caches data payloads locally to bypass repeated network requests.',
      metric: 'Transfer: 120ms'
    },
    cache: {
      name: 'Client Cache (IndexedDB)',
      status: 'Nominal',
      details: 'Persistent cache storing key visual assets, layout tokens, and user credentials. Accelerates load speeds on subsequent entries.',
      metric: 'Read: 1.5ms'
    },
    render: {
      name: 'React Reconciler (VDOM)',
      status: 'Hydrating',
      details: 'Virtual DOM computes tree changes and schedules optimized mutations to browser nodes, avoiding visual layout shifts.',
      metric: 'Diff: 1.2ms'
    }
  };

  const startArchitectureSimulation = (type) => {
    if (simulationActive) return;
    setSimulationActive(true);
    setSimulationType(type);
    setSimStep(1);

    const duration = 800;
    
    // Step 1: Render Tree to State
    setTimeout(() => {
      setSimStep(2); // State
      setSelectedNode('state');
      
      // Step 2: State to Fetcher
      setTimeout(() => {
        setSimStep(3); // Fetcher
        setSelectedNode('fetcher');

        if (type === 'hydrate') {
          // Hydrate Path: Fetcher ➔ Cache ➔ Reconciler
          setTimeout(() => {
            setSimStep(4); // Cache
            setSelectedNode('cache');
            
            setTimeout(() => {
              setSimStep(5); // React Reconciler
              setSelectedNode('render');
              
              setTimeout(() => {
                setSimStep(6); // DOM Viewport
                setSelectedNode('view');
                setTimeout(() => {
                  setSimulationActive(false);
                  setSimStep(0);
                }, duration);
              }, duration);
            }, duration);
          }, duration);
        } else {
          // Fast Render Path: State ➔ Reconciler ➔ Viewport
          setTimeout(() => {
            setSimStep(5); // React Reconciler (Direct)
            setSelectedNode('render');
            
            setTimeout(() => {
              setSimStep(6); // DOM Viewport
              setSelectedNode('view');
              setTimeout(() => {
                setSimulationActive(false);
                setSimStep(0);
              }, duration);
            }, duration);
          }, duration);
        }
      }, duration);
    }, duration);
  };

  return (
    <div className="portfolio-page-container">
      <div className="section" style={{ padding: '0 20px' }}>
        {/* Navigation header */}
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
            <Palette size={14} style={{ color: 'var(--color-secondary)' }} />
            CREATIVE PORTAL ONLINE
          </span>
        </div>

        {/* Hero Section Header */}
        <div className="section-header reveal" style={{ textAlign: 'left', marginBottom: '50px' }}>
          <h1 className="section-title" style={{ fontSize: '3.5rem', lineHeight: '1.1' }}>
            Drishti | <span style={{ color: 'var(--color-secondary)' }}>UI/UX Architect</span>
          </h1>
          <p className="section-subtitle" style={{ margin: '15px 0 0 0', maxWidth: '750px', fontSize: '1.2rem', lineHeight: '1.6' }}>
            Crafting premium interactive interfaces, responsive design systems, fluid micro-animations, and fast visual performance.
          </p>
        </div>

        {/* Navigation Pills */}
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

        {/* Overview section */}
        {activeSection === 'overview' && (
          <div className="creators-container" style={{ gridTemplateColumns: '1fr', gap: '30px' }}>
            <div className="creator-profile glass reveal" style={{ width: '100%', minHeight: 'auto' }}>
              <div className="creator-info" style={{ width: '100%', paddingRight: '0' }}>
                <h3 className="creator-name" style={{ fontSize: '2rem', marginBottom: '20px' }}>Professional Biography</h3>
                <p className="creator-bio" style={{ fontSize: '1.1rem', lineHeight: '1.7', marginBottom: '25px', color: 'var(--text-secondary)' }}>
                  Drishti is a creative Full Stack Software Development Engineer with a strong specialization in client-side state engines, micro-interactions, and premium visual interfaces. Bridging the gap between strict system parameters and fluid visual presentation, she constructs design system packages that load with near-zero latency.
                </p>
                
                <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap', marginBottom: '25px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: '600' }}>Focus Areas</span>
                    <span style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--color-secondary)', marginTop: '5px' }}>UI Performance, Interactive Tools</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: '600' }}>Design Stack</span>
                    <span style={{ fontSize: '1rem', fontWeight: '700', color: '#fff', marginTop: '5px' }}>React / Next.js / CSS3 / Figma</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: '600' }}>Performance Score</span>
                    <span style={{ fontSize: '1rem', fontWeight: '700', color: '#27c93f', marginTop: '5px' }}>LCP &lt; 1.2s (Hydrated)</span>
                  </div>
                </div>

                <h4 style={{ fontSize: '1.25rem', marginBottom: '15px', color: '#fff' }}>Key Enterprise Milestones</h4>
                <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: '1rem' }}>
                  <li>Designed Blissbox's custom corporate bundle configuration system, operating smoothly at 60fps.</li>
                  <li>Refactored image optimization pipelines and pre-rendering structures for Twentyoneholidays.</li>
                  <li>Created the agency's primary glassmorphism component libraries, packaging modular utility tokens.</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Terminal Tab Content */}
        {activeSection === 'terminal' && (
          <div className="reveal">
            <div style={{ marginBottom: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                Interactive UI subsystem console. Click inside and type commands like <code>help</code>, <code>skills</code>, or <code>neofetch</code>.
              </p>
              <button 
                onClick={() => setTerminalHistory([{ type: 'output', text: 'Terminal buffer cleared.' }])}
                className="btn btn-secondary" 
                style={{ padding: '4px 12px', fontSize: '0.75rem', borderRadius: '4px' }}
              >
                Clear Screen
              </button>
            </div>

            <div className="terminal-panel" style={{ borderColor: 'var(--color-secondary)' }}>
              <div className="terminal-header" style={{ background: 'rgba(15, 10, 20, 0.9)' }}>
                <div className="terminal-dots">
                  <div className="terminal-dot close" />
                  <div className="terminal-dot minimize" />
                  <div className="terminal-dot maximize" />
                </div>
                <span className="terminal-title">drishti@drixaura:~</span>
                <span className="terminal-title">bash-secure</span>
              </div>
              <div className="terminal-body" style={{ color: '#bd00ff', textShadow: '0 0 3px rgba(189, 0, 255, 0.35)' }}>
                <div>
                  {terminalHistory.map((item, idx) => (
                    <div 
                      key={idx} 
                      style={{ 
                        whiteSpace: 'pre-wrap', 
                        marginBottom: '8px', 
                        color: item.type === 'prompt' ? 'var(--color-secondary)' : '#e066ff' 
                      }}
                    >
                      {item.text}
                    </div>
                  ))}
                  <div ref={terminalEndRef} />
                  
                  <form onSubmit={handleTerminalSubmit} className="terminal-input-line">
                    <span className="terminal-prompt" style={{ color: 'var(--color-secondary)' }}>drishti@drixaura:~$</span>
                    <input 
                      type="text" 
                      className="terminal-input"
                      value={inputVal}
                      onChange={(e) => setInputVal(e.target.value)}
                      style={{ caretColor: '#bd00ff' }}
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
            <div className="system-visualizer-card glass" style={{ borderColor: 'var(--border-light)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', flexWrap: 'wrap', gap: '15px' }}>
                <div>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '6px' }}>Frontend Rendering Flow</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    Hover over nodes to inspect details. Simulate render flows to trace client mutations.
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button 
                    onClick={() => startArchitectureSimulation('hydrate')}
                    disabled={simulationActive}
                    className="btn btn-secondary"
                    style={{ padding: '6px 14px', fontSize: '0.8rem', borderColor: 'var(--color-secondary)', color: 'var(--color-secondary)' }}
                  >
                    <RefreshCw size={14} className={simulationActive && simulationType==='hydrate' ? 'spin' : ''} />
                    Simulate Hydration
                  </button>
                  <button 
                    onClick={() => startArchitectureSimulation('render')}
                    disabled={simulationActive}
                    className="btn btn-secondary"
                    style={{ padding: '6px 14px', fontSize: '0.8rem', borderColor: '#27c93f', color: '#27c93f' }}
                  >
                    <RefreshCw size={14} className={simulationActive && simulationType==='render' ? 'spin' : ''} />
                    Simulate Fast Render
                  </button>
                </div>
              </div>

              {/* Node Graph Grid */}
              <div className="system-nodes-grid">
                {/* Node 1: DOM Viewport */}
                <div 
                  className={`arch-node-card ${selectedNode === 'view' ? 'active' : ''} ${simulationActive && simStep === 6 ? 'animate-pulse' : ''}`}
                  onMouseEnter={() => setSelectedNode('view')}
                >
                  <div className="node-icon-wrapper">
                    <Eye size={24} />
                  </div>
                  <div className="node-title">Viewport View</div>
                  <div className="node-status">
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#27c93f', display: 'inline-block' }} />
                    Active
                  </div>
                </div>

                {/* Node 2: State Manager */}
                <div 
                  className={`arch-node-card ${selectedNode === 'state' ? 'active' : ''} ${simulationActive && simStep === 2 ? 'animate-pulse' : ''}`}
                  onMouseEnter={() => setSelectedNode('state')}
                >
                  <div className="node-icon-wrapper">
                    <Sliders size={24} />
                  </div>
                  <div className="node-title">State Manager</div>
                  <div className="node-status">
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#27c93f', display: 'inline-block' }} />
                    Synced
                  </div>
                </div>

                {/* Node 3: API Fetcher */}
                <div 
                  className={`arch-node-card ${selectedNode === 'fetcher' ? 'active' : ''} ${simulationActive && simStep === 3 ? 'animate-pulse' : ''}`}
                  onMouseEnter={() => setSelectedNode('fetcher')}
                >
                  <div className="node-icon-wrapper">
                    <Globe size={24} />
                  </div>
                  <div className="node-title">API Fetcher</div>
                  <div className="node-status" style={{ color: 'var(--color-secondary)' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--color-secondary)', display: 'inline-block' }} />
                    Secure QL
                  </div>
                </div>

                {/* Node 4: Cache */}
                <div 
                  className={`arch-node-card ${selectedNode === 'cache' ? 'active' : ''} ${simulationActive && (simulationType === 'hydrate' && simStep === 4) ? 'animate-pulse' : ''}`}
                  onMouseEnter={() => setSelectedNode('cache')}
                >
                  <div className="node-icon-wrapper">
                    <HardDrive size={24} />
                  </div>
                  <div className="node-title">Indexed Cache</div>
                  <div className="node-status">
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#27c93f', display: 'inline-block' }} />
                    Persistent
                  </div>
                </div>

                {/* Node 5: React Reconciler */}
                <div 
                  className={`arch-node-card ${selectedNode === 'render' ? 'active' : ''} ${simulationActive && simStep === 5 ? 'animate-pulse' : ''}`}
                  onMouseEnter={() => setSelectedNode('render')}
                >
                  <div className="node-icon-wrapper">
                    <Cpu size={24} />
                  </div>
                  <div className="node-title">React VDOM</div>
                  <div className="node-status">
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#27c93f', display: 'inline-block' }} />
                    Diffing
                  </div>
                </div>
              </div>

              {/* Dynamic Connection lines SVG */}
              <div className="flow-svg-container">
                <svg width="100%" height="20" style={{ overflow: 'visible' }}>
                  <line x1="10%" y1="10" x2="90%" y2="10" className="flow-line" />
                  
                  {simulationActive && (
                    <>
                      {/* Step 1: DOM to State */}
                      {simStep >= 1 && simStep <= 2 && (
                        <line x1="10%" y1="10" x2="30%" y2="10" className="flow-line-active" style={{ stroke: 'var(--color-secondary)' }} />
                      )}
                      
                      {/* Step 2: State to Fetcher */}
                      {simStep >= 2 && simStep <= 3 && (
                        <line x1="30%" y1="10" x2="50%" y2="10" className="flow-line-active" style={{ stroke: 'var(--color-secondary)' }} />
                      )}

                      {/* Step 3 (Hydrate): Fetcher to Cache */}
                      {simulationType === 'hydrate' && simStep >= 3 && simStep <= 4 && (
                        <line x1="50%" y1="10" x2="70%" y2="10" className="flow-line-active" style={{ stroke: 'var(--color-secondary)' }} />
                      )}

                      {/* Step 4 (Hydrate): Cache to Reconciler */}
                      {simulationType === 'hydrate' && simStep >= 4 && simStep <= 5 && (
                        <line x1="70%" y1="10" x2="90%" y2="10" className="flow-line-active" style={{ stroke: 'var(--color-secondary)' }} />
                      )}

                      {/* Step 3 (Fast Render): Fetcher bypass cache straight to Reconciler */}
                      {simulationType === 'render' && simStep >= 3 && simStep <= 5 && (
                        <path d="M 50 10 Q 70 -10 90 10" fill="none" className="flow-line-active" style={{ stroke: '#27c93f' }} />
                      )}

                      {/* Return Path from Reconciler to Viewport */}
                      {simStep >= 5 && simStep <= 6 && (
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
                    <span style={{ fontSize: '0.75rem', background: 'rgba(189, 0, 255, 0.1)', color: 'var(--color-secondary)', padding: '2px 8px', borderRadius: '12px' }}>
                      {nodes[selectedNode].status}
                    </span>
                  </h4>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                    {nodes[selectedNode].details}
                  </p>
                </div>
                
                <div className="metric-pill">
                  <span className="metric-pill-label">Metric</span>
                  <span className="metric-pill-value" style={{ color: 'var(--color-secondary)' }}>{nodes[selectedNode].metric}</span>
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
                  <BarChart2 size={20} style={{ color: 'var(--color-secondary)' }} /> Web Vitals SLA Scores
                </h3>
                
                <div className="skill-metric-bar">
                  <div className="skill-bar-label">
                    <span>Largest Contentful Paint (LCP)</span>
                    <span style={{ color: 'var(--color-secondary)' }}>0.9s (Good)</span>
                  </div>
                  <div className="skill-bar-track">
                    <div className="skill-bar-fill animate-fill" style={{ width: '98%', background: 'linear-gradient(90deg, var(--color-secondary) 0%, var(--color-primary) 100%)' }} />
                  </div>
                </div>

                <div className="skill-metric-bar">
                  <div className="skill-bar-label">
                    <span>Cumulative Layout Shift (CLS)</span>
                    <span style={{ color: 'var(--color-secondary)' }}>0.01 (Zero Shift)</span>
                  </div>
                  <div className="skill-bar-track">
                    <div className="skill-bar-fill animate-fill" style={{ width: '99%', background: 'linear-gradient(90deg, var(--color-secondary) 0%, var(--color-primary) 100%)' }} />
                  </div>
                </div>

                <div className="skill-metric-bar">
                  <div className="skill-bar-label">
                    <span>Interaction to Next Paint (INP)</span>
                    <span style={{ color: 'var(--color-secondary)' }}>11ms (Fast)</span>
                  </div>
                  <div className="skill-bar-track">
                    <div className="skill-bar-fill animate-fill" style={{ width: '96%', background: 'linear-gradient(90deg, var(--color-secondary) 0%, var(--color-primary) 100%)' }} />
                  </div>
                </div>

                <div className="skill-metric-bar">
                  <div className="skill-bar-label">
                    <span>First Input Delay (FID)</span>
                    <span style={{ color: 'var(--color-secondary)' }}>2ms (Instant)</span>
                  </div>
                  <div className="skill-bar-track">
                    <div className="skill-bar-fill animate-fill" style={{ width: '99%', background: 'linear-gradient(90deg, var(--color-secondary) 0%, var(--color-primary) 100%)' }} />
                  </div>
                </div>
              </div>

              <div className="glass" style={{ padding: '30px' }}>
                <h3 style={{ fontSize: '1.4rem', marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <ShieldCheck size={20} style={{ color: 'var(--color-primary)' }} /> Accessibility & SEO Audits
                </h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  <div style={{ padding: '15px', borderRadius: '8px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                      <Zap size={18} style={{ color: '#27c93f' }} />
                      <div>
                        <div style={{ fontWeight: '700', fontSize: '0.95rem' }}>Lighthouse Accessibility Audit</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Semantic tags, screen readers alt values</div>
                      </div>
                    </div>
                    <span style={{ fontSize: '0.8rem', background: 'rgba(39, 201, 63, 0.1)', color: '#27c93f', padding: '3px 8px', borderRadius: '20px', fontWeight: '700' }}>100/100</span>
                  </div>

                  <div style={{ padding: '15px', borderRadius: '8px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                      <Layout size={18} style={{ color: '#27c93f' }} />
                      <div>
                        <div style={{ fontWeight: '700', fontSize: '0.95rem' }}>Lighthouse Best Practices</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Modern image protocols, secure script loads</div>
                      </div>
                    </div>
                    <span style={{ fontSize: '0.8rem', background: 'rgba(39, 201, 63, 0.1)', color: '#27c93f', padding: '3px 8px', borderRadius: '20px', fontWeight: '700' }}>100/100</span>
                  </div>

                  <div style={{ padding: '15px', borderRadius: '8px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                      <GitBranch size={18} style={{ color: 'var(--color-primary)' }} />
                      <div>
                        <div style={{ fontWeight: '700', fontSize: '0.95rem' }}>Lighthouse SEO Audit</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Schema markup, meta descriptions validity</div>
                      </div>
                    </div>
                    <span style={{ fontSize: '0.8rem', background: 'rgba(102, 252, 241, 0.1)', color: 'var(--color-primary)', padding: '3px 8px', borderRadius: '20px', fontWeight: '700' }}>100/100</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* System Engineering Tab Content */}
        {activeSection === 'System Engineering' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
            <div className="creators-container" style={{ gridTemplateColumns: '1fr', gap: '30px' }}>
              <div className="creator-profile glass reveal" style={{ width: '100%', minHeight: 'auto' }}>
                <div className="creator-info" style={{ width: '100%', paddingRight: '0' }}>
                  <h3 className="creator-name" style={{ fontSize: '2rem', marginBottom: '20px' }}>Frontend Systems Architecture</h3>
                  <p className="creator-bio" style={{ fontSize: '1.1rem', lineHeight: '1.7', marginBottom: '25px', color: 'var(--text-secondary)' }}>
                    "Great user interfaces are felt, not just seen. I specialize in bridging the gap between sophisticated mockups and production-ready React codebases. By utilizing CSS transitions, dynamic responsive layout parameters, and strict performance metrics, I craft glassmorphic frameworks that feel light, fast, and satisfying to navigate."
                  </p>
                  
                  <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: '600' }}>Core Competencies</span>
                      <span style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--color-secondary)', marginTop: '5px' }}>Fluid Layouts, Micro-Animations</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: '600' }}>Visual Stack</span>
                      <span style={{ fontSize: '1rem', fontWeight: '700', color: '#fff', marginTop: '5px' }}>React / Next.js / CSS / Framer</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: '600' }}>Package Design</span>
                      <span style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--color-primary)', marginTop: '5px' }}>Modular CSS-in-JS Tokens</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Core Competencies Grid */}
            <div className="portfolio-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
              <div className="glass reveal" style={{ padding: '25px' }}>
                <h4 style={{ fontSize: '1.2rem', color: 'var(--color-secondary)', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Layout size={20} /> Responsive Fluid Layouts
                </h4>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                  Engineering adaptable grid systems and responsive spacing models that fit perfectly across phone screens, tablets, and massive 4K monitors.
                </p>
              </div>

              <div className="glass reveal" style={{ padding: '25px' }}>
                <h4 style={{ fontSize: '1.2rem', color: 'var(--color-secondary)', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Sliders size={20} /> Advanced Micro-Interactions
                </h4>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                  Designing hover feedback, spring loading loops, and layout transformations that respond smoothly to mouse vectors.
                </p>
              </div>

              <div className="glass reveal" style={{ padding: '25px' }}>
                <h4 style={{ fontSize: '1.2rem', color: 'var(--color-secondary)', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Eye size={20} /> Glassmorphism Frameworks
                </h4>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                  Implementing layered UI panels with backdrop-blur, sub-pixel borders, and subtle radial gradient lighting that matches the aesthetics of modern premium operating systems.
                </p>
              </div>
            </div>

            {/* Glassmorphism Sandbox Control Tool */}
            <div className="creators-container" style={{ gridTemplateColumns: '1fr 1.2fr', gap: '30px', marginTop: '10px' }}>
              {/* Control Panel */}
              <div className="glass reveal" style={{ padding: '30px' }}>
                <h3 style={{ fontSize: '1.3rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Sliders size={20} style={{ color: 'var(--color-secondary)' }} /> Glass Token Controls
                </h3>
                
                {/* Blur Control */}
                <div style={{ marginBottom: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '6px' }}>
                    <span>Backdrop Blur</span>
                    <span>{blur}px</span>
                  </div>
                  <input 
                    type="range" min="0" max="40" value={blur} 
                    onChange={(e) => setBlur(Number(e.target.value))}
                    style={{ width: '100%', accentColor: 'var(--color-secondary)' }}
                  />
                </div>

                {/* Opacity Control */}
                <div style={{ marginBottom: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '6px' }}>
                    <span>Glow Opacity</span>
                    <span>{Math.round(opacity * 100)}%</span>
                  </div>
                  <input 
                    type="range" min="0.05" max="0.4" step="0.01" value={opacity} 
                    onChange={(e) => setOpacity(Number(e.target.value))}
                    style={{ width: '100%', accentColor: 'var(--color-secondary)' }}
                  />
                </div>

                {/* Tint Selection */}
                <div style={{ marginBottom: '25px' }}>
                  <span style={{ fontSize: '0.85rem', display: 'block', marginBottom: '8px' }}>Theme Highlight Tint</span>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button 
                      onClick={() => setColor('#66FCF1')}
                      className="btn" 
                      style={{ 
                        padding: '8px 16px', fontSize: '0.8rem', 
                        background: color === '#66FCF1' ? 'rgba(102, 252, 241, 0.15)' : 'rgba(255,255,255,0.03)',
                        border: `1px solid ${color === '#66FCF1' ? '#66FCF1' : 'rgba(255,255,255,0.1)'}`,
                        color: '#66FCF1'
                      }}
                    >
                      Neon Cyan
                    </button>
                    <button 
                      onClick={() => setColor('#bd00ff')}
                      className="btn"
                      style={{ 
                        padding: '8px 16px', fontSize: '0.8rem', 
                        background: color === '#bd00ff' ? 'rgba(189, 0, 255, 0.15)' : 'rgba(255,255,255,0.03)',
                        border: `1px solid ${color === '#bd00ff' ? '#bd00ff' : 'rgba(255,255,255,0.1)'}`,
                        color: '#bd00ff'
                      }}
                    >
                      Neon Violet
                    </button>
                  </div>
                </div>

                {/* Code output display */}
                <div style={{ position: 'relative' }}>
                  <pre 
                    style={{ 
                      background: '#050508', 
                      padding: '15px', 
                      borderRadius: '8px', 
                      fontSize: '0.75rem', 
                      fontFamily: 'monospace', 
                      color: 'var(--text-secondary)',
                      overflowX: 'auto',
                      border: '1px solid rgba(255,255,255,0.05)'
                    }}
                  >
                    {cssString}
                  </pre>
                  <button 
                    onClick={handleCopyCode}
                    className="btn btn-secondary"
                    style={{ 
                      position: 'absolute', 
                      top: '8px', right: '8px', 
                      padding: '4px 10px', 
                      fontSize: '0.7rem', 
                      borderRadius: '4px' 
                    }}
                  >
                    {copied ? 'Copied!' : 'Copy CSS'}
                  </button>
                </div>
              </div>

              {/* Sandbox Canvas Visualizer */}
              <div 
                className="reveal" 
                style={{ 
                  borderRadius: '16px', 
                  border: '1px solid rgba(255,255,255,0.05)',
                  background: 'linear-gradient(45deg, #050508 25%, #0c0813 50%, #050508 75%)',
                  minHeight: '320px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <div 
                  style={{ 
                    position: 'absolute', 
                    width: '120px', height: '120px', 
                    borderRadius: '50%', 
                    background: 'var(--color-primary)', 
                    filter: 'blur(30px)',
                    top: '15%', left: '15%',
                    animation: 'float 5s ease-in-out infinite'
                  }} 
                />
                <div 
                  style={{ 
                    position: 'absolute', 
                    width: '140px', height: '140px', 
                    borderRadius: '50%', 
                    background: 'var(--color-secondary)', 
                    filter: 'blur(45px)',
                    bottom: '15%', right: '15%',
                    animation: 'float 7s ease-in-out infinite',
                    animationDelay: '1s'
                  }} 
                />

                {/* Dynamic glass plate */}
                <div 
                  style={{ 
                    width: '260px', 
                    height: '180px', 
                    zIndex: 2, 
                    display: 'flex', 
                    flexDirection: 'column', 
                    justifyContent: 'center', 
                    alignItems: 'center',
                    background: `rgba(${color === '#66FCF1' ? '102, 252, 241' : '189, 0, 255'}, ${opacity})`,
                    backdropFilter: `blur(${blur}px)`,
                    WebkitBackdropFilter: `blur(${blur}px)`,
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    borderRadius: '16px',
                    boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.3)',
                    transition: 'all 0.1s ease-out'
                  }}
                >
                  <div 
                    style={{ 
                      width: '35px', height: '35px', 
                      borderRadius: '50%', 
                      border: `1.5px solid ${color}`,
                      boxShadow: `0 0 10px ${color}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      marginBottom: '15px', color: '#fff'
                    }}
                  >
                    <Layers size={16} />
                  </div>
                  <span style={{ fontSize: '1rem', fontWeight: '800', letterSpacing: '0.05em', color: '#fff' }}>
                    GLASS PREVIEW
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                    Hover/Move sliders to render
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

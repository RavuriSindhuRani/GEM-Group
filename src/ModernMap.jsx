import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, Navigation as CompassNav, Compass, Layers, ZoomIn, ZoomOut, RotateCcw, 
  ExternalLink, ArrowUpRight, CheckCircle2, ShieldCheck, Phone, Car, Clock, Sparkles
} from 'lucide-react';
import { PROJECTS_DATA } from './projectsData';
import { Img } from './ui';

export default function ModernMap({ 
  selectedProjectId, 
  onSelectProject, 
  showDetailsButton = true,
  className = '' 
}) {
  const [activeId, setActiveId] = useState(selectedProjectId || PROJECTS_DATA[0].id);
  const [activeFilter, setActiveFilter] = useState('all');
  const [mapMode, setMapMode] = useState('vector'); // 'vector' or 'satellite'
  const [zoomLevel, setZoomLevel] = useState(1);
  const [showRadius, setShowRadius] = useState(true);

  const activeProject = PROJECTS_DATA.find(p => p.id === activeId) || PROJECTS_DATA[0];

  const handleSelect = (id) => {
    setActiveId(id);
    if (onSelectProject) onSelectProject(id);
  };

  const filteredProjects = PROJECTS_DATA.filter(p => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'ongoing') return p.status === 'Ongoing';
    if (activeFilter === 'completed') return p.status === 'Completed';
    if (activeFilter === 'rrr') return p.id.includes('sreenivasa') || p.id.includes('balaji-county');
    if (activeFilter === 'nh44') return p.id.includes('laxmi-balaji');
    if (activeFilter === 'nh65') return p.id.includes('infiniti');
    return true;
  });

  // Coordinates normalized for SVG canvas (viewBox: 0 0 1000 680)
  const PINS = [
    {
      id: 'sree-sreenivasa-county',
      name: 'RRR Sree Sreenivasa County',
      short: 'Sree Sreenivasa County',
      x: 430,
      y: 540,
      price: '₹18,000 / yd',
      tag: 'Ongoing · 50 Acres (Phases I, II, III)',
      color: '#d1283b',
      badge: 'Ongoing · HMDA',
      status: 'Ongoing',
    },
    {
      id: 'sree-laxmi-balaji-township',
      name: 'Sree Laxmi Balaji Township',
      short: 'Sree Laxmi Balaji',
      x: 470,
      y: 470,
      price: 'Completed & Delivered',
      tag: 'Completed Project · 46 Acres',
      color: '#059669',
      badge: 'Completed · DTCP',
      status: 'Completed',
    },
    {
      id: 'sri-balaji-county-balanagar',
      name: 'Sri Balaji County',
      short: 'Sri Balaji County',
      x: 410,
      y: 505,
      price: '₹16,000 / yd',
      tag: 'Ongoing · 20 Acres (Phase 1 & 2)',
      color: '#d97706',
      badge: 'Ongoing · HMDA',
      status: 'Ongoing',
    },
    {
      id: 'infiniti-counti-sadashivpet',
      name: 'Infiniti Counti',
      short: 'Infiniti Counti',
      x: 230,
      y: 190,
      price: '₹11,500 / yd',
      tag: 'Ongoing · 100 Acres (Mumbai Hwy)',
      color: '#0284c7',
      badge: 'Ongoing · DTCP',
      status: 'Ongoing',
    },
  ];

  // Landmarks for geographic context
  const LANDMARKS = [
    { name: 'Hyderabad Financial District (Gachibowli)', x: 520, y: 260, type: 'it', time: 'HQ' },
    { name: 'RGI Airport Shamshabad', x: 535, y: 350, type: 'airport', time: '30 mins' },
    { name: 'Rajapur / Polepally SEZ', x: 380, y: 575, type: 'sez', time: '5 mins' },
    { name: 'Amazon Fulfillment Center (HYD8)', x: 490, y: 440, type: 'logistics', time: '8 mins' },
    { name: 'Woxsen University & NIMZ', x: 190, y: 160, type: 'edu', time: '10 mins' },
    { name: 'IIT Hyderabad (Kandi)', x: 300, y: 210, type: 'edu', time: '25 mins' },
  ];

  return (
    <div className={`modern-map-container ${className}`}>
      {/* Map Control Header */}
      <div className="map-toolbar">
        <div className="map-title-row">
          <div className="map-badge">
            <Compass className="spin-slow" size={18} />
            <span>GEM Interactive Real Estate GIS Map</span>
          </div>
          <h3>Hyderabad Growth Corridors &amp; GEM Projects</h3>
          <p>Explore plotted developments strategically situated along the Regional Ring Road (RRR), NH-44, and NH-65.</p>
        </div>

        {/* Filter Bar */}
        <div className="map-filter-bar">
          <div className="filter-pills">
            <button 
              className={`filter-pill ${activeFilter === 'all' ? 'active' : ''}`}
              onClick={() => setActiveFilter('all')}
            >
              All Projects ({PROJECTS_DATA.length})
            </button>
            <button 
              className={`filter-pill ${activeFilter === 'ongoing' ? 'active' : ''}`}
              onClick={() => setActiveFilter('ongoing')}
            >
              <span className="dot red" /> Ongoing Projects (3)
            </button>
            <button 
              className={`filter-pill ${activeFilter === 'completed' ? 'active' : ''}`}
              onClick={() => setActiveFilter('completed')}
            >
              <span className="dot green" /> Completed Projects (1)
            </button>
            <button 
              className={`filter-pill ${activeFilter === 'rrr' ? 'active' : ''}`}
              onClick={() => setActiveFilter('rrr')}
            >
              RRR Corridor
            </button>
            <button 
              className={`filter-pill ${activeFilter === 'nh44' ? 'active' : ''}`}
              onClick={() => setActiveFilter('nh44')}
            >
              NH-44 Corridor
            </button>
            <button 
              className={`filter-pill ${activeFilter === 'nh65' ? 'active' : ''}`}
              onClick={() => setActiveFilter('nh65')}
            >
              NH-65 Corridor
            </button>
          </div>

          <div className="map-view-switches">
            <button 
              className={`mode-btn ${mapMode === 'vector' ? 'active' : ''}`}
              onClick={() => setMapMode('vector')}
              title="Vector Corridor Schematic Map"
            >
              <Layers size={15} /> Schematic GIS
            </button>
            <button 
              className={`mode-btn ${mapMode === 'satellite' ? 'active' : ''}`}
              onClick={() => setMapMode('satellite')}
              title="Live Satellite / Street View Map"
            >
              <CompassNav size={15} /> Live Satellite
            </button>
            <button 
              className={`mode-btn ${showRadius ? 'active' : ''}`}
              onClick={() => setShowRadius(!showRadius)}
              title="Toggle Distance Radius Rings"
            >
              Distance Rings
            </button>
          </div>
        </div>
      </div>

      {/* Main Map View Area */}
      <div className="map-stage-wrapper">
        {mapMode === 'vector' ? (
          <div className="vector-map-canvas" style={{ transform: `scale(${zoomLevel})`, transformOrigin: '50% 50%' }}>
            <svg viewBox="0 0 1000 680" className="gis-svg" preserveAspectRatio="xMidYMid meet">
              <defs>
                <radialGradient id="mapGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#0284c7" stopOpacity="0.12" />
                  <stop offset="100%" stopColor="#041624" stopOpacity="0" />
                </radialGradient>
                <linearGradient id="rrrGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f43f5e" />
                  <stop offset="50%" stopColor="#d1283b" />
                  <stop offset="100%" stopColor="#e11d48" />
                </linearGradient>
                <linearGradient id="orrGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#38bdf8" />
                  <stop offset="100%" stopColor="#0284c7" />
                </linearGradient>
                <filter id="glowFilter" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Background GIS Grid */}
              <rect x="0" y="0" width="1000" height="680" fill="#041320" />
              <g className="grid-lines" stroke="rgba(56, 189, 248, 0.07)" strokeWidth="1">
                {Array.from({ length: 11 }).map((_, i) => (
                  <line key={`v-${i}`} x1={i * 100} y1="0" x2={i * 100} y2="680" />
                ))}
                {Array.from({ length: 8 }).map((_, i) => (
                  <line key={`h-${i}`} x1="0" y1={i * 90} x2="1000" y2={i * 90} />
                ))}
              </g>

              {/* Distance Radius Rings centered at Shamshabad Airport (535, 350) */}
              {showRadius && (
                <g className="radius-rings" stroke="rgba(56, 189, 248, 0.16)" strokeDasharray="4 4" fill="none">
                  <circle cx="535" cy="350" r="100" />
                  <text x="545" y="245" fill="rgba(147, 197, 253, 0.7)" fontSize="11" fontWeight="500">15 km Radius (Airport Zone)</text>

                  <circle cx="535" cy="350" r="180" />
                  <text x="545" y="165" fill="rgba(147, 197, 253, 0.7)" fontSize="11" fontWeight="500">30 km Radius (Outer Corridor)</text>

                  <circle cx="535" cy="350" r="260" />
                  <text x="545" y="85" fill="rgba(147, 197, 253, 0.7)" fontSize="11" fontWeight="500">45 km Radius (RRR Investment Belt)</text>
                </g>
              )}

              {/* Major Highway Corridors */}
              {/* 1. Outer Ring Road (ORR) - Ellipse around Hyderabad */}
              <g className="orr-corridor">
                <ellipse cx="530" cy="270" rx="140" ry="90" fill="none" stroke="url(#orrGradient)" strokeWidth="4" opacity="0.85" />
                <rect x="580" y="172" width="110" height="22" rx="4" fill="#041b2d" stroke="#38bdf8" strokeWidth="1" />
                <text x="635" y="187" fill="#38bdf8" fontSize="11" fontWeight="700" textAnchor="middle">HYDERABAD ORR</text>
              </g>

              {/* 2. Regional Ring Road (RRR) - Mega Southern Arc */}
              <g className="rrr-corridor" filter="url(#glowFilter)">
                <path 
                  d="M 120,440 Q 280,630 520,610 T 920,490" 
                  fill="none" 
                  stroke="url(#rrrGradient)" 
                  strokeWidth="6" 
                  strokeDasharray="10 5" 
                />
                <rect x="400" y="625" width="220" height="26" rx="6" fill="#1e1014" stroke="#f43f5e" strokeWidth="1.5" />
                <text x="510" y="642" fill="#fda4af" fontSize="12" fontWeight="700" textAnchor="middle">
                  PROPOSED REGIONAL RING ROAD (RRR)
                </text>
              </g>

              {/* 3. Bangalore Highway (NH-44) */}
              <g className="nh44-road">
                <line x1="535" y1="260" x2="420" y2="670" stroke="#f59e0b" strokeWidth="4.5" strokeOpacity="0.85" />
                <text x="495" y="420" fill="#fcd34d" fontSize="11" fontWeight="700" transform="rotate(72 495 420)">
                  NH-44 BANGALORE HIGHWAY
                </text>
              </g>

              {/* 4. Mumbai Highway (NH-65) */}
              <g className="nh65-road">
                <line x1="520" y1="260" x2="100" y2="120" stroke="#10b981" strokeWidth="4.5" strokeOpacity="0.85" />
                <text x="280" y="180" fill="#6ee7b7" fontSize="11" fontWeight="700" transform="rotate(18 280 180)">
                  NH-65 MUMBAI HIGHWAY
                </text>
              </g>

              {/* Dynamic Connection Line from Active Project to Airport & Gachibowli */}
              {(() => {
                const curPin = PINS.find(p => p.id === activeId);
                if (!curPin) return null;
                return (
                  <g className="active-routes" strokeDasharray="5 5">
                    <line x1={curPin.x} y1={curPin.y} x2="535" y2="350" stroke="#38bdf8" strokeWidth="2.5" strokeOpacity="0.9" />
                    <line x1={curPin.x} y1={curPin.y} x2="520" y2="260" stroke="#f59e0b" strokeWidth="1.5" strokeOpacity="0.6" />
                  </g>
                );
              })()}

              {/* Landmarks / Hubs */}
              {LANDMARKS.map((lm, i) => (
                <g key={i} className="landmark-node" transform={`translate(${lm.x}, ${lm.y})`}>
                  <circle r="7" fill="#041624" stroke="#60a5fa" strokeWidth="2" />
                  <circle r="3" fill="#93c5fd" />
                  <rect x="12" y="-14" width="170" height="26" rx="4" fill="rgba(4, 22, 36, 0.92)" stroke="rgba(56, 189, 248, 0.4)" strokeWidth="1" />
                  <text x="18" y="3" fill="#f1f5f9" fontSize="10.5" fontWeight="600">{lm.name}</text>
                </g>
              ))}

              {/* Project Pins */}
              {PINS.map((pin) => {
                const isSelected = pin.id === activeId;
                const isVisible = filteredProjects.some(p => p.id === pin.id);
                if (!isVisible) return null;

                return (
                  <g 
                    key={pin.id} 
                    className={`project-pin-group ${isSelected ? 'selected' : ''}`}
                    transform={`translate(${pin.x}, ${pin.y})`}
                    onClick={() => handleSelect(pin.id)}
                    style={{ cursor: 'pointer' }}
                  >
                    {/* Pulse ring for active pin */}
                    {isSelected && (
                      <>
                        <circle r="32" fill="none" stroke={pin.color} strokeWidth="2" opacity="0.6" className="pulse-circle" />
                        <circle r="22" fill={pin.color} opacity="0.25" />
                      </>
                    )}

                    {/* Pin Base */}
                    <circle r="14" fill={pin.color} stroke="#ffffff" strokeWidth="3" filter="drop-shadow(0 4px 10px rgba(0,0,0,0.6))" />
                    <circle r="5" fill="#ffffff" />

                    {/* Pin Label Banner */}
                    <g transform="translate(20, -28)">
                      <rect 
                        width="190" 
                        height="54" 
                        rx="8" 
                        fill={isSelected ? '#ffffff' : 'rgba(3, 18, 30, 0.94)'} 
                        stroke={isSelected ? pin.color : 'rgba(56, 189, 248, 0.45)'} 
                        strokeWidth={isSelected ? '2.5' : '1'} 
                        filter="drop-shadow(0 8px 18px rgba(0,0,0,0.7))"
                      />
                      <text x="12" y="19" fill={isSelected ? '#031726' : '#ffffff'} fontSize="12" fontWeight="700">
                        {pin.short}
                      </text>
                      <text x="12" y="34" fill={isSelected ? '#d1283b' : '#38bdf8'} fontSize="11" fontWeight="700">
                        {pin.price}
                      </text>
                      <text x="12" y="47" fill={isSelected ? '#475569' : '#94a3b8'} fontSize="9.5" fontWeight="500">
                        {pin.tag}
                      </text>
                    </g>
                  </g>
                );
              })}
            </svg>

            {/* Map Canvas Floating Controls */}
            <div className="canvas-zoom-controls">
              <button onClick={() => setZoomLevel(prev => Math.min(prev + 0.2, 1.8))} title="Zoom In">
                <ZoomIn size={16} />
              </button>
              <button onClick={() => setZoomLevel(prev => Math.max(prev - 0.2, 0.8))} title="Zoom Out">
                <ZoomOut size={16} />
              </button>
              <button onClick={() => setZoomLevel(1)} title="Reset View">
                <RotateCcw size={16} />
              </button>
            </div>

            {/* Legend Overlay */}
            <div className="map-legend-card">
              <div className="legend-head">Corridor Legend</div>
              <div className="legend-item"><span className="legend-line rrr" /> Regional Ring Road (RRR)</div>
              <div className="legend-item"><span className="legend-line orr" /> Hyderabad ORR (Ring 1)</div>
              <div className="legend-item"><span className="legend-line nh44" /> NH-44 Bangalore Highway</div>
              <div className="legend-item"><span className="legend-line nh65" /> NH-65 Mumbai Highway</div>
              <div className="legend-item"><span className="legend-pin" /> GEM Plotted Projects</div>
            </div>
          </div>
        ) : (
          /* Live Satellite Map View */
          <div className="satellite-map-view">
            <iframe 
              className="satellite-iframe"
              title={`${activeProject.name} Live Map`}
              src={activeProject.embedMapSrc}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="satellite-overlay-bar">
              <div className="sat-info">
                <MapPin size={18} className="text-rose" />
                <div>
                  <b>{activeProject.name}</b>
                  <span>{activeProject.location}</span>
                </div>
              </div>
              <a 
                href={activeProject.googleMapUrl} 
                target="_blank" 
                rel="noreferrer" 
                className="btn btn-sm"
              >
                Open in Google Maps <ArrowUpRight size={15} />
              </a>
            </div>
          </div>
        )}

        {/* Selected Project Quick Inspector Card */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeProject.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            className="selected-project-quick-card"
          >
            <div className="quick-card-visual">
              <Img src={activeProject.heroImage} alt={activeProject.name} />
              <span className="quick-badge">{activeProject.statusBadge}</span>
              <span className="quick-price">{activeProject.price}</span>
            </div>

            <div className="quick-card-body">
              <div className="quick-header">
                <span className="quick-type">{activeProject.type}</span>
                <h4>{activeProject.name}</h4>
                <p className="quick-loc"><MapPin size={14} /> {activeProject.location}</p>
              </div>

              {/* Highlights Chips */}
              <div className="quick-metrics">
                <div className="qm-item">
                  <b>{activeProject.area}</b>
                  <span>Total Area</span>
                </div>
                <div className="qm-item">
                  <b>{activeProject.plotSizes}</b>
                  <span>Plot Sizes</span>
                </div>
                <div className="qm-item">
                  <b>{activeProject.approvals.split('&')[0]}</b>
                  <span>Approvals</span>
                </div>
              </div>

              {/* Key Distances */}
              <div className="quick-distances">
                <div className="qd-title"><Clock size={14} /> Key Connectivity:</div>
                <div className="qd-list">
                  {activeProject.distances.slice(0, 3).map((d, i) => (
                    <div key={i} className="qd-chip">
                      <span className="dot-mini" />
                      <b>{d.time}</b> {d.destination}
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="quick-actions">
                <a 
                  href={activeProject.googleMapUrl} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="btn ghost quick-btn"
                >
                  <CompassNav size={15} /> GPS Navigation
                </a>
                {showDetailsButton && (
                  <button 
                    onClick={() => {
                      if (onSelectProject) onSelectProject(activeProject.id);
                      const el = document.getElementById(`project-${activeProject.id}`) || document.getElementById('project-details-anchor');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }} 
                    className="btn quick-btn"
                  >
                    View Project Details <ArrowUpRight size={15} />
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Project Selector Bar below map */}
      <div className="map-projects-strip">
        <span className="strip-label">Select Project to Inspect:</span>
        <div className="strip-cards">
          {PROJECTS_DATA.map((p) => {
            const isCur = p.id === activeId;
            return (
              <button 
                key={p.id}
                onClick={() => handleSelect(p.id)}
                className={`strip-card ${isCur ? 'active' : ''}`}
              >
                <div className="strip-thumb">
                  <Img src={p.heroImage} alt={p.name} />
                </div>
                <div className="strip-copy">
                  <b>{p.shortName}</b>
                  <span className="strip-price">{p.price}</span>
                  <small>{p.city}</small>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

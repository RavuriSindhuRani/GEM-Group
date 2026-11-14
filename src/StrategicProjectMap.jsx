import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, Compass, Navigation, Layers, ZoomIn, ZoomOut, RotateCcw, 
  ExternalLink, ArrowUpRight, CheckCircle2, ShieldCheck, Clock, 
  Car, Building2, GraduationCap, Factory, HeartPulse, Landmark, 
  Eye, Download, Maximize2, Sparkles, X, FileText
} from 'lucide-react';
import { Img } from './ui';

// Category Definitions & High-Contrast Color Palette
export const MAP_CATEGORIES = {
  site: { label: 'Project Site', color: '#00A2E8', icon: MapPin },
  corridor: { label: 'Corridors & Highways', color: '#f59e0b', icon: Navigation },
  industry: { label: 'IT & Industrial SEZs', color: '#10b981', icon: Factory },
  education: { label: 'Educational Campuses', color: '#a855f7', icon: GraduationCap },
  healthcare: { label: 'Healthcare & Transit', color: '#ec4899', icon: HeartPulse },
  landmark: { label: 'Civic Landmarks', color: '#06b6d4', icon: Landmark }
};

// Project Specific Map Data directly derived from Brochure Page 2 & Page 8
// Spaced out across 960x600 viewBox with ZERO label overlapping
export const PROJECT_STRATEGIC_MAPS = {
  // ─────────────────────────────────────────────────────────────
  // 1. SRI BALAJI COUNTY (Brochure Page 2)
  // ─────────────────────────────────────────────────────────────
  'sri-balaji-county': {
    projectId: 'sri-balaji-county',
    projectName: 'Sri Balaji County',
    corridorTitle: 'Regional Ring Road (RRR) & Udithyal Road Growth Corridor',
    locationText: 'Udithyal Road, Balanagar near Shadnagar, Telangana',
    approvalsTag: 'HMDA Approved · TLP: 005098/HMDA/01539/SWDL/SK1/2025',
    pricingTag: 'Residential: ₹16,000 / yd · Commercial: ₹17,000 / yd',
    siteCoord: { x: 380, y: 330 },
    viewBox: '0 0 960 620',
    highways: [
      { id: 'nh44', name: 'Bengaluru Highway (NH-44 6-Lane Expressway)', path: 'M 480 30 L 480 590', width: 14, color: '#f59e0b', labelX: 495, labelY: 65, sub: '6-Lane National Economic Corridor' },
      { id: 'rrr', name: 'Regional Ring Road (RRR ₹17,000 Cr Corridor)', path: 'M 40 340 C 260 300, 700 300, 920 340', width: 15, color: '#ef4444', labelX: 60, labelY: 325, sub: 'Proposed ₹17,000 Cr Growth Corridor' },
      { id: 'orr', name: 'Outer Ring Road (ORR Shamshabad Junction)', path: 'M 80 140 C 320 110, 640 110, 880 140', width: 10, color: '#3b82f6', labelX: 100, labelY: 125, sub: 'Expressway Route to Financial District' },
      { id: 'irr', name: 'Inner Ring Road (City Core)', path: 'M 200 60 C 380 45, 580 45, 760 60', width: 6, color: '#64748b', labelX: 220, labelY: 50, sub: 'Hyderabad City Access' },
      { id: 'udithyal', name: 'Udithyal Link Road', path: 'M 480 330 L 320 330', width: 7, color: '#00a2e8', labelX: 335, labelY: 320, sub: 'Direct Project Frontage Road' },
    ],
    landmarks: [
      {
        id: 'site-balaji',
        name: 'Sri Balaji County (PROJECT SITE)',
        category: 'site',
        time: 'PROJECT SITE',
        dist: 'Udithyal Road, Balanagar',
        x: 380,
        y: 330,
        isSite: true,
        pillWidth: 230,
        desc: '10 Acres Phase 1 & 10 Acres Phase 2 gated community with underground electricity, modern entrance arch, 100% Vasthu East & West facing plots.'
      },
      {
        id: 'balanagar-town',
        name: 'Balanagar Town Junction',
        category: 'corridor',
        time: '02 min drive',
        dist: '2.5 km',
        x: 480,
        y: 330,
        pillWidth: 170,
        desc: 'Primary commercial intersection connecting Bengaluru Highway NH-44 and Regional Ring Road (RRR).'
      },
      {
        id: 'rajapur-sez',
        name: 'Rajapur / Polepally SEZ & RRR',
        category: 'industry',
        time: '05 min drive',
        dist: '4.5 km',
        x: 230,
        y: 400,
        pillWidth: 195,
        desc: 'Major industrial growth zone hosting pharmaceutical giants and export manufacturing hubs along the RRR.'
      },
      {
        id: 'nims-university',
        name: 'NIMS University (90-Acre Campus)',
        category: 'education',
        time: '06 min drive',
        dist: '5.5 km',
        x: 180,
        y: 270,
        pillWidth: 215,
        desc: 'Sprawling 90-acre educational institution and medical research university campus.'
      },
      {
        id: 'heritage-valley',
        name: 'Heritage Valley International School',
        category: 'education',
        time: '20 min drive',
        dist: '18.0 km',
        x: 260,
        y: 200,
        pillWidth: 225,
        desc: 'Renowned residential ICSE/IB international school campus along the growth corridor.'
      },
      {
        id: 'symbiosis',
        name: 'Symbiosis International University',
        category: 'education',
        time: '30 min drive',
        dist: '28.0 km',
        x: 740,
        y: 190,
        pillWidth: 215,
        desc: 'Premier university campus offering management, law, and liberal arts programs.'
      },
      {
        id: 'rgia-airport',
        name: 'RGIA Airport Shamshabad',
        category: 'corridor',
        time: '35 min drive',
        dist: '40.0 km',
        x: 480,
        y: 95,
        pillWidth: 175,
        desc: 'Hyderabad International Airport and upcoming Metro Rail interchange terminal.'
      },
      {
        id: 'jadcherla-sez',
        name: 'Jadcherla IT & Pharma SEZ',
        category: 'industry',
        time: '18 min drive',
        dist: '16.0 km',
        x: 480,
        y: 530,
        pillWidth: 180,
        desc: 'State-sponsored special economic zones supporting high-tech manufacturing and pharmaceuticals.'
      },
      {
        id: 'amazon-dc',
        name: 'Amazon Development Centre',
        category: 'industry',
        time: '12 min drive',
        dist: '11.0 km',
        x: 350,
        y: 140,
        pillWidth: 190,
        desc: 'Mega fulfillment operations center and regional technology logistics network.'
      },
      {
        id: 'statue-equality',
        name: 'Statue of Equality (Muchintal)',
        category: 'landmark',
        time: '28 min drive',
        dist: '32.0 km',
        x: 680,
        y: 120,
        pillWidth: 200,
        desc: 'Major spiritual destination and iconic cultural landmark in South Hyderabad.'
      },
      {
        id: 'shadnagar-town',
        name: 'Shadnagar Municipality Hub',
        category: 'corridor',
        time: '12 min drive',
        dist: '10.0 km',
        x: 580,
        y: 240,
        pillWidth: 185,
        desc: 'Rapidly expanding municipality with railway station, bus terminus, and shopping districts.'
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // 2. RRR SREE SREENIVASA COUNTY (Brochure Page 2)
  // ─────────────────────────────────────────────────────────────
  'rrr-sree-sreenivasa-county': {
    projectId: 'rrr-sree-sreenivasa-county',
    projectName: 'RRR Sree Sreenivasa County',
    corridorTitle: 'Regional Ring Road (RRR) Direct Frontage Corridor',
    locationText: 'Balanagar, Shadnagar, RRR Growth Corridor, Telangana',
    approvalsTag: 'HMDA Approved · TLP: 018631/HMDA/04590/SWDL/SKP1/2026',
    pricingTag: 'Residential: ₹18,000 / yd · Commercial: ₹20,000 / yd',
    siteCoord: { x: 590, y: 315 },
    viewBox: '0 0 960 620',
    highways: [
      { id: 'rrr-main', name: 'Regional Ring Road (RRR Direct Frontage)', path: 'M 40 340 C 260 300, 700 300, 920 340', width: 15, color: '#ef4444', labelX: 60, labelY: 325, sub: '₹17,000 Cr Corridor with Direct Alignment' },
      { id: 'nh44-main', name: 'Bengaluru Highway (NH-44 6-Lane Expressway)', path: 'M 480 30 L 480 590', width: 14, color: '#f59e0b', labelX: 495, labelY: 65, sub: '6-Lane Economic Corridor' },
      { id: 'orr-rrr', name: 'Outer Ring Road (ORR Shamshabad)', path: 'M 80 140 C 320 110, 640 110, 880 140', width: 10, color: '#3b82f6', labelX: 100, labelY: 125, sub: 'Expressway Interchange' },
      { id: 'irr-rrr', name: 'Inner Ring Road (City Core)', path: 'M 200 60 C 380 45, 580 45, 760 60', width: 6, color: '#64748b', labelX: 220, labelY: 50, sub: 'Central Transit Route' },
      { id: 'udithyal-rrr', name: 'Project Link Road to NH-44', path: 'M 480 325 L 590 320', width: 7, color: '#00a2e8', labelX: 500, labelY: 315, sub: 'Direct Frontage Alignment' }
    ],
    landmarks: [
      {
        id: 'site-rrr',
        name: 'RRR Sree Sreenivasa County (PROJECT SITE)',
        category: 'site',
        time: 'PROJECT SITE',
        dist: 'Direct Frontage on RRR',
        x: 590,
        y: 315,
        isSite: true,
        pillWidth: 260,
        desc: '50-Acre landmark plotted layout across Phases I, II & III with direct frontage on the proposed ₹17,000 Cr Regional Ring Road (RRR) and Phase 2 luxury clubhouse.'
      },
      {
        id: 'nh44-junc',
        name: 'NH-44 Bengaluru Highway Interchange',
        category: 'corridor',
        time: '04 min drive',
        dist: '3.5 km',
        x: 480,
        y: 325,
        pillWidth: 235,
        desc: 'Direct signal-free interchange connecting the RRR to the 6-lane national highway.'
      },
      {
        id: 'rajapur-rrr',
        name: 'Rajapur / Polepally SEZ',
        category: 'industry',
        time: '05 min drive',
        dist: '4.2 km',
        x: 240,
        y: 380,
        pillWidth: 170,
        desc: 'Immediate proximity to leading industrial corridors, aerospace parts, and pharma export parks.'
      },
      {
        id: 'nims-rrr',
        name: 'NIMS University (90-Acre Campus)',
        category: 'education',
        time: '06 min drive',
        dist: '5.5 km',
        x: 180,
        y: 280,
        pillWidth: 215,
        desc: '90-acre medical science and multidisciplinary education center.'
      },
      {
        id: 'heritage-rrr',
        name: 'Heritage Valley International School',
        category: 'education',
        time: '15 min drive',
        dist: '14.5 km',
        x: 280,
        y: 210,
        pillWidth: 225,
        desc: 'Prestigious international boarding and day school campus.'
      },
      {
        id: 'rgia-rrr',
        name: 'RGIA Airport Shamshabad',
        category: 'corridor',
        time: '30 min drive',
        dist: '38.0 km',
        x: 480,
        y: 95,
        pillWidth: 175,
        desc: 'Direct highway drive to Hyderabad International Airport.'
      },
      {
        id: 'symbiosis-rrr',
        name: 'Symbiosis International University',
        category: 'education',
        time: '25 min drive',
        dist: '24.0 km',
        x: 740,
        y: 190,
        pillWidth: 215,
        desc: 'Acclaimed university campus with law, management, and design faculties.'
      },
      {
        id: 'biz-school',
        name: 'Premium BIZ School',
        category: 'education',
        time: '10 min drive',
        dist: '9.0 km',
        x: 680,
        y: 240,
        pillWidth: 155,
        desc: 'Top-tier business academy and executive educational institution.'
      },
      {
        id: 'temple-rrr',
        name: 'Ramalingeswara Swamy Temple',
        category: 'landmark',
        time: '10 min drive',
        dist: '8.0 km',
        x: 780,
        y: 260,
        pillWidth: 200,
        desc: 'Historic religious landmark attracting weekend visitors and spiritual seekers.'
      },
      {
        id: 'jadcherla-pharma',
        name: 'Jadcherla IT & Pharma Hub',
        category: 'industry',
        time: '15 min drive',
        dist: '15.0 km',
        x: 480,
        y: 530,
        pillWidth: 180,
        desc: 'Key state development zone housing hundreds of pharmaceutical export facilities.'
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // 3. SREE LAXMI BALAJI TOWNSHIP (Brochure Page 8 & Page 9)
  // ─────────────────────────────────────────────────────────────
  'sree-laxmi-balaji-township': {
    projectId: 'sree-laxmi-balaji-township',
    projectName: 'Sree Laxmi Balaji Township',
    corridorTitle: 'Shadnagar Town Municipal & Regional Ring Road Corridor',
    locationText: 'Adjacent to Shadnagar Market Yard, Municipal Limits, Telangana 509216',
    approvalsTag: 'DTCP Approved · TLP: 130/2024/H · TG RERA: P02400009778',
    pricingTag: 'Delivered & Completed Gated Township · 46 Acres · 578 Villa Plots',
    siteCoord: { x: 570, y: 290 },
    viewBox: '0 0 960 620',
    highways: [
      { id: 'nh44-slb', name: '6-Lane Bangalore Highway (NH-44)', path: 'M 480 30 L 480 590', width: 14, color: '#f59e0b', labelX: 495, labelY: 65, sub: 'Just 2 Minutes from Project' },
      { id: 'old-hwy', name: 'Old Highway (Shadnagar Central)', path: 'M 540 30 L 540 590', width: 9, color: '#64748b', labelX: 555, labelY: 100, sub: 'Shadnagar Town Main Arterial' },
      { id: 'rrr-slb', name: 'Regional Ring Road (RRR)', path: 'M 40 330 C 260 290, 700 290, 920 330', width: 14, color: '#ef4444', labelX: 60, labelY: 315, sub: 'Close Proximity to Proposed RRR' },
      { id: 'orr-slb', name: 'Outer Ring Road (ORR Shamshabad)', path: 'M 80 140 C 320 110, 640 110, 880 140', width: 10, color: '#3b82f6', labelX: 100, labelY: 125, sub: 'Expressway Route to Financial District' },
    ],
    landmarks: [
      {
        id: 'site-slb',
        name: 'Sree Laxmi Balaji Township (PROJECT SITE)',
        category: 'site',
        time: 'COMPLETED & DELIVERED',
        dist: 'Adjacent Market Yard',
        x: 570,
        y: 290,
        isSite: true,
        pillWidth: 275,
        desc: '46-Acre grand gated township delivered with 578 ready-to-construct villa plots, swimming pool, luxury clubhouse, and primary school reservation.'
      },
      {
        id: 'nh44-entry',
        name: '6-Lane Bangalore Highway (NH-44)',
        category: 'corridor',
        time: '02 min drive',
        dist: '1.2 km',
        x: 480,
        y: 290,
        pillWidth: 220,
        desc: 'Instant access to NH-44 express corridor to Shamshabad and Gachibowli.'
      },
      {
        id: 'nrsc-center',
        name: 'National Remote Sensing Centre (NRSC)',
        category: 'industry',
        time: '04 min drive',
        dist: '2.5 km',
        x: 690,
        y: 220,
        pillWidth: 245,
        desc: 'ISRO Indian Space Research Organisation satellite earth observation station.'
      },
      {
        id: 'ms-dc',
        name: 'Microsoft Mega Data Center',
        category: 'industry',
        time: '05 min drive',
        dist: '3.5 km',
        x: 770,
        y: 300,
        pillWidth: 200,
        desc: 'Hyperscale Microsoft cloud data center facility driving high property appreciation.'
      },
      {
        id: 'shadnagar-stn',
        name: 'Shadnagar Railway & Bus Station',
        category: 'corridor',
        time: '03 min drive',
        dist: '2.0 km',
        x: 530,
        y: 220,
        pillWidth: 220,
        desc: 'Connected railway station with regular local MMTS trains to Secunderabad.'
      },
      {
        id: 'market-yard',
        name: 'Shadnagar Agricultural Market Yard',
        category: 'landmark',
        time: '01 min walk',
        dist: 'Adjacent',
        x: 600,
        y: 360,
        pillWidth: 235,
        desc: 'Directly adjacent to the venture for daily groceries, provisions, and retail.'
      },
      {
        id: 'rgia-slb',
        name: 'RGIA Airport Shamshabad',
        category: 'corridor',
        time: '20 min drive',
        dist: '28.0 km',
        x: 480,
        y: 95,
        pillWidth: 175,
        desc: 'Quick 20-minute signal-free highway drive to Hyderabad International Airport.'
      },
      {
        id: 'symbiosis-slb',
        name: 'Symbiosis International University',
        category: 'education',
        time: '18 min drive',
        dist: '14.0 km',
        x: 730,
        y: 160,
        pillWidth: 215,
        desc: 'Premier university campus with world-class residential faculties.'
      },
      {
        id: 'pg-jnj',
        name: 'P&G and Johnson & Johnson Hub',
        category: 'industry',
        time: '15 min drive',
        dist: '12.0 km',
        x: 340,
        y: 360,
        pillWidth: 220,
        desc: 'Major multinational manufacturing plants employing thousands of professionals.'
      }
    ]
  }
};

export default function StrategicProjectMap({ 
  projectId = 'sree-laxmi-balaji-township',
  locationMapImage,
  masterPlanImage,
  googleMapUrl,
  embedMapSrc,
  projectName = 'GEM Group Development',
  className = ''
}) {
  const mapData = PROJECT_STRATEGIC_MAPS[projectId] || PROJECT_STRATEGIC_MAPS['sree-laxmi-balaji-township'];
  const [selectedLandmark, setSelectedLandmark] = useState(mapData.landmarks.find(l => l.isSite) || mapData.landmarks[0]);
  const [activeCategory, setActiveCategory] = useState('all');
  // Default to blueprint view so users immediately see the authentic brochure map, or switch to interactive
  const [activeTab, setActiveTab] = useState(locationMapImage ? 'blueprint' : 'interactive');
  const [zoomLevel, setZoomLevel] = useState(1);

  const filteredLandmarks = mapData.landmarks.filter(l => {
    if (activeCategory === 'all') return true;
    return l.category === activeCategory;
  });

  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.25, 2));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 0.25, 0.85));
  const handleReset = () => {
    setZoomLevel(1);
    setSelectedLandmark(mapData.landmarks.find(l => l.isSite) || mapData.landmarks[0]);
    setActiveCategory('all');
  };

  const hasMasterPlan = (projectId === 'sree-laxmi-balaji-township' || projectId.includes('balaji')) && masterPlanImage;

  return (
    <div className={`strategic-project-map-wrap ${className}`}>
      {/* Top Navigation Bar: High-contrast View Mode Switcher */}
      <div className="spm-nav-bar">
        <div className="spm-tabs-row">
          {locationMapImage && (
            <button 
              className={`spm-tab ${activeTab === 'blueprint' ? 'active' : ''}`}
              onClick={() => setActiveTab('blueprint')}
            >
              <FileText size={16} /> Official Brochure Blueprint
            </button>
          )}

          <button 
            className={`spm-tab ${activeTab === 'interactive' ? 'active' : ''}`}
            onClick={() => setActiveTab('interactive')}
          >
            <Compass size={16} /> Interactive Strategic Corridor Map
          </button>

          {hasMasterPlan && (
            <button 
              className={`spm-tab ${activeTab === 'masterplan' ? 'active' : ''}`}
              onClick={() => setActiveTab('masterplan')}
            >
              <Layers size={16} /> 46-Acre Master Layout Plan (578 Plots)
            </button>
          )}

          {embedMapSrc && (
            <button 
              className={`spm-tab ${activeTab === 'satellite' ? 'active' : ''}`}
              onClick={() => setActiveTab('satellite')}
            >
              <Navigation size={16} /> Live GPS Satellite
            </button>
          )}
        </div>

        {googleMapUrl && (
          <a 
            href={googleMapUrl} 
            target="_blank" 
            rel="noreferrer" 
            className="btn btn-sm btn-spm-directions"
          >
            <Car size={14} /> Open Live GPS Directions <ArrowUpRight size={13} />
          </a>
        )}
      </div>

      {/* ─────────────────────────────────────────────────────────────
          VIEW 1: OFFICIAL BROCHURE LOCATION BLUEPRINT (DEFAULT)
      ───────────────────────────────────────────────────────────── */}
      {activeTab === 'blueprint' && locationMapImage && (
        <div className="spm-blueprint-viewer">
          <div className="spm-bp-header">
            <div>
              <span className="spm-id-tag"><CheckCircle2 size={13} /> Verified Official Document</span>
              <h4>{mapData.projectName} — Official Brochure Location Blueprint</h4>
              <p>Exact strategic connectivity map printed in the official developer brochure. High-resolution authentic archive.</p>
            </div>
            <a 
              href={locationMapImage} 
              target="_blank" 
              rel="noreferrer"
              className="btn btn-sm btn-primary"
            >
              <Maximize2 size={14} /> Inspect Full Resolution
            </a>
          </div>

          <div className="spm-bp-body-grid">
            <div className="spm-bp-img-wrap" onClick={() => window.open(locationMapImage, '_blank')}>
              <Img 
                src={locationMapImage} 
                alt={`${projectName} Official Location Blueprint Map`} 
                loading="eager"
              />
              <div className="spm-zoom-overlay">
                <Maximize2 size={20} /> Click to Open Full High-Resolution Blueprint
              </div>
            </div>

            {/* Quick Strategic Distance Radar Sidebar */}
            <div className="spm-bp-sidebar">
              <span className="spm-sidebar-heading">Verified Corridor Distances</span>
              <p className="spm-sidebar-sub">Brochure documented travel times from {mapData.projectName}:</p>
              
              <div className="spm-bp-distance-list">
                {mapData.landmarks.filter(l => !l.isSite).slice(0, 7).map(lm => {
                  const cat = MAP_CATEGORIES[lm.category] || MAP_CATEGORIES.landmark;
                  return (
                    <div key={lm.id} className="spm-bp-dist-row">
                      <div className="spm-bp-dist-info">
                        <span className="spm-bp-cat-pill" style={{ color: cat.color }}>
                          {cat.label}
                        </span>
                        <b>{lm.name}</b>
                      </div>
                      <div className="spm-bp-dist-badge">
                        <span>{lm.time}</span>
                        <small>{lm.dist}</small>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="spm-bp-sidebar-footer">
                <span className="spm-verified-tag">
                  <ShieldCheck size={15} /> 100% Genuine Project Brochure Data
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          VIEW 2: INTERACTIVE STRATEGIC VECTOR CORRIDOR RADAR
      ───────────────────────────────────────────────────────────── */}
      {activeTab === 'interactive' && (
        <div className="spm-interactive-container">
          {/* Header Info */}
          <div className="spm-map-header">
            <div>
              <div className="spm-id-tag">
                <span className="spm-dot" />
                <span>{mapData.projectName} Strategic Corridor Radar</span>
              </div>
              <h3 className="spm-title">{mapData.corridorTitle}</h3>
              <p className="spm-sub">{mapData.locationText}</p>
            </div>
            
            <div className="spm-controls">
              <button onClick={handleZoomIn} aria-label="Zoom In" title="Zoom In"><ZoomIn size={16} /></button>
              <button onClick={handleZoomOut} aria-label="Zoom Out" title="Zoom Out"><ZoomOut size={16} /></button>
              <button onClick={handleReset} aria-label="Reset View" title="Reset View"><RotateCcw size={16} /></button>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="spm-category-bar">
            <span className="spm-cat-lbl">Filter Landmarks:</span>
            <button 
              className={`spm-pill ${activeCategory === 'all' ? 'active' : ''}`}
              onClick={() => setActiveCategory('all')}
            >
              All Landmarks ({mapData.landmarks.length})
            </button>
            {Object.entries(MAP_CATEGORIES).map(([catKey, cat]) => {
              const count = mapData.landmarks.filter(l => l.category === catKey).length;
              if (count === 0) return null;
              const IconComp = cat.icon;
              return (
                <button
                  key={catKey}
                  className={`spm-pill ${activeCategory === catKey ? 'active' : ''}`}
                  onClick={() => setActiveCategory(catKey)}
                >
                  <IconComp size={12} style={{ color: cat.color }} /> {cat.label} ({count})
                </button>
              );
            })}
          </div>

          {/* Map Canvas + Selected Landmark Drawer Grid (Side-by-Side) */}
          <div className="spm-canvas-drawer-grid">
            <div className="spm-canvas-viewport">
              <svg 
                viewBox={mapData.viewBox} 
                className="spm-svg" 
                style={{ transform: `scale(${zoomLevel})`, transformOrigin: '50% 50%', transition: 'transform 0.3s ease' }}
              >
                <defs>
                  {/* Subtle Grid Pattern */}
                  <pattern id="spm-grid-pattern" width="50" height="50" patternUnits="userSpaceOnUse">
                    <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
                  </pattern>
                  {/* Radial site aura */}
                  <radialGradient id="site-aura" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#00A2E8" stopOpacity="0.6" />
                    <stop offset="60%" stopColor="#00A2E8" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#00A2E8" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* Background Map Surface */}
                <rect width="100%" height="100%" fill="#071728" />
                <rect width="100%" height="100%" fill="url(#spm-grid-pattern)" />

                {/* Render Road Network */}
                <g className="spm-roads-group">
                  {mapData.highways.map(h => (
                    <g key={h.id}>
                      <path 
                        d={h.path} 
                        stroke={h.color} 
                        strokeWidth={h.width} 
                        strokeLinecap="round" 
                        fill="none" 
                        opacity="0.9" 
                      />
                      {/* Road Center Stripe */}
                      <path 
                        d={h.path} 
                        stroke="#ffffff" 
                        strokeWidth="1.5" 
                        strokeDasharray="8 6" 
                        strokeLinecap="round" 
                        fill="none" 
                        opacity="0.45" 
                      />
                      {/* Road Text Label with High-Contrast Pill Backing */}
                      {h.labelX && h.labelY && (
                        <g>
                          <rect 
                            x={h.labelX - 6} 
                            y={h.labelY - 14} 
                            width={h.name.length * 6.5 + 16} 
                            height="20" 
                            rx="5" 
                            fill="#061424" 
                            stroke={h.color} 
                            strokeWidth="1" 
                            opacity="0.92"
                          />
                          <text 
                            x={h.labelX + 2} 
                            y={h.labelY} 
                            fill="#ffffff" 
                            fontSize="10" 
                            fontWeight="700" 
                            letterSpacing="0.04em"
                          >
                            {h.name}
                          </text>
                        </g>
                      )}
                    </g>
                  ))}
                </g>

                {/* Site Pulsing Aura */}
                <circle 
                  cx={mapData.siteCoord.x} 
                  cy={mapData.siteCoord.y} 
                  r="65" 
                  fill="url(#site-aura)" 
                  className="site-pulse-aura"
                />

                {/* Landmark Markers with Crisp Backing Pills and White Text */}
                <g className="spm-markers-group">
                  {filteredLandmarks.map(lm => {
                    const isSelected = selectedLandmark?.id === lm.id;
                    const catInfo = MAP_CATEGORIES[lm.category] || MAP_CATEGORIES.landmark;
                    const pillW = lm.pillWidth || (lm.name.length * 6.8 + 26);
                    
                    if (lm.isSite) {
                      return (
                        <g 
                          key={lm.id} 
                          className="spm-site-marker" 
                          onClick={() => setSelectedLandmark(lm)} 
                          cursor="pointer"
                        >
                          <circle cx={lm.x} cy={lm.y} r="26" fill="#00A2E8" opacity="0.3" />
                          <circle cx={lm.x} cy={lm.y} r="18" fill="#00A2E8" stroke="#ffffff" strokeWidth="3" />
                          <circle cx={lm.x} cy={lm.y} r="8" fill="#ffffff" />
                          
                          {/* Site Pill Label */}
                          <rect 
                            x={lm.x - pillW / 2} 
                            y={lm.y - 48} 
                            width={pillW} 
                            height="28" 
                            rx="14" 
                            fill="#061424" 
                            stroke="#38bdf8" 
                            strokeWidth="2" 
                          />
                          <text 
                            x={lm.x} 
                            y={lm.y - 30} 
                            textAnchor="middle" 
                            fill="#38bdf8" 
                            fontSize="11.5" 
                            fontWeight="800" 
                            letterSpacing="0.03em"
                          >
                            ★ {lm.name}
                          </text>
                        </g>
                      );
                    }

                    // Standard Landmark Marker with Pill Badge
                    const labelX = lm.x + 14;
                    const labelY = lm.y - 11;

                    return (
                      <g 
                        key={lm.id} 
                        className={`spm-marker ${isSelected ? 'selected' : ''}`}
                        onClick={() => setSelectedLandmark(lm)}
                        cursor="pointer"
                      >
                        {/* Dot */}
                        <circle 
                          cx={lm.x} 
                          cy={lm.y} 
                          r={isSelected ? 13 : 9} 
                          fill={catInfo.color} 
                          stroke="#ffffff" 
                          strokeWidth={isSelected ? 3 : 2} 
                          opacity="1"
                        />
                        {/* High-contrast Pill Badge */}
                        <rect 
                          x={labelX} 
                          y={labelY} 
                          width={pillW} 
                          height="22" 
                          rx="6" 
                          fill={isSelected ? '#00a2e8' : 'rgba(6, 20, 36, 0.92)'} 
                          stroke={isSelected ? '#ffffff' : 'rgba(255, 255, 255, 0.25)'} 
                          strokeWidth={isSelected ? '1.5' : '1'} 
                        />
                        <text 
                          x={labelX + 8} 
                          y={labelY + 15} 
                          fill="#ffffff" 
                          fontSize="10.5" 
                          fontWeight={isSelected ? '700' : '600'}
                          letterSpacing="0.02em"
                        >
                          {lm.name}
                        </text>
                      </g>
                    );
                  })}
                </g>
              </svg>

              <div className="spm-canvas-hint">
                <Sparkles size={13} /> Click any pin to inspect verified distance &amp; travel times
              </div>
            </div>

            {/* Selected Landmark Detail Side Drawer (Guaranteed High Contrast Pure White Text) */}
            <div className="spm-landmark-detail-panel">
              {selectedLandmark ? (
                <div className="spm-detail-card">
                  <div className="spm-dc-header">
                    <span 
                      className="spm-dc-badge"
                      style={{ 
                        background: MAP_CATEGORIES[selectedLandmark.category]?.color || '#00A2E8',
                        color: '#ffffff'
                      }}
                    >
                      {MAP_CATEGORIES[selectedLandmark.category]?.label || 'Landmark'}
                    </span>
                    <span className="spm-dc-time">
                      <Clock size={14} /> {selectedLandmark.time}
                    </span>
                  </div>

                  <h4 className="spm-dc-title">{selectedLandmark.name}</h4>
                  
                  <div className="spm-dc-meta-row">
                    <span className="spm-dc-dist">
                      <Car size={15} /> Travel Distance: <b>{selectedLandmark.dist}</b>
                    </span>
                  </div>

                  <p className="spm-dc-desc">{selectedLandmark.desc}</p>

                  <div className="spm-dc-footer">
                    <span className="spm-dc-verified">
                      <ShieldCheck size={15} className="text-emerald" /> Verified Brochure Data
                    </span>
                    {googleMapUrl && (
                      <a 
                        href={googleMapUrl} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="btn btn-sm btn-spm-navigate"
                      >
                        Navigate via GPS <ArrowUpRight size={13} />
                      </a>
                    )}
                  </div>
                </div>
              ) : (
                <div className="spm-detail-empty">
                  <Compass size={36} className="text-cyan" />
                  <p>Click any pin on the map to inspect verified brochure connectivity details.</p>
                </div>
              )}

              {/* Connectivity Category Legend */}
              <div className="spm-legend-box">
                <span className="spm-legend-title">Connectivity Legend:</span>
                <div className="spm-legend-items">
                  {Object.entries(MAP_CATEGORIES).map(([catKey, cat]) => (
                    <div key={catKey} className="spm-li">
                      <span className="spm-li-dot" style={{ background: cat.color }} />
                      <span className="spm-li-label">{cat.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          VIEW 3: 46-ACRE MASTER LAYOUT PLAN INSPECTOR (Sree Laxmi Balaji)
      ───────────────────────────────────────────────────────────── */}
      {activeTab === 'masterplan' && hasMasterPlan && (
        <div className="spm-masterplan-viewer">
          <div className="spm-bp-header">
            <div>
              <span className="spm-id-tag" style={{ background: '#059669', color: '#ffffff' }}>DTCP &amp; TG RERA Approved</span>
              <h4>46-Acre Township Master Layout Plan (578 Villa Plots)</h4>
              <p>Examine plot zoning, 40’ &amp; 33’ CC avenues, Ac. 1.50 Cents Primary School reservation, and survey boundaries.</p>
            </div>
            <a 
              href={masterPlanImage} 
              target="_blank" 
              rel="noreferrer"
              className="btn btn-sm btn-primary"
            >
              <Maximize2 size={14} /> Full Resolution Layout Inspector
            </a>
          </div>
          <div className="spm-bp-img-wrap masterplan-frame" onClick={() => window.open(masterPlanImage, '_blank')}>
            <Img 
              src={masterPlanImage} 
              alt={`${projectName} Approved Master Layout Plan`} 
            />
            <div className="spm-zoom-overlay">
              <Maximize2 size={20} /> Click to Open Full High-Resolution Masterplan
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          VIEW 4: LIVE GPS SATELLITE GOOGLE MAP
      ───────────────────────────────────────────────────────────── */}
      {activeTab === 'satellite' && embedMapSrc && (
        <div className="spm-satellite-viewer">
          <div className="spm-bp-header">
            <div>
              <span className="spm-id-tag"><Navigation size={13} /> Live GPS Satellite</span>
              <h4>Turn-by-Turn Satellite Navigation &amp; Pinpoint</h4>
              <p>Interactive satellite road map powered by Google Maps.</p>
            </div>
            {googleMapUrl && (
              <a 
                href={googleMapUrl} 
                target="_blank" 
                rel="noreferrer" 
                className="btn btn-sm btn-primary"
              >
                Open Google Maps App <ExternalLink size={13} />
              </a>
            )}
          </div>
          <div className="spm-satellite-viewport">
            <iframe 
              src={embedMapSrc} 
              className="spm-satellite-iframe"
              title={`${projectName} Live Satellite Map`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      )}
    </div>
  );
}

import { useState, useRef } from 'react';
import { 
  MapPin, CheckCircle2, ShieldCheck, Download, ExternalLink, ArrowUpRight, 
  Car, Clock, Phone, Building2, Trees, Route, Zap, Droplets, Waves, Landmark,
  Shield, Maximize2, Compass, FileText, Send, MessageCircle, Eye, GraduationCap,
  Activity, Award, Sparkles, Navigation as NavIcon
} from 'lucide-react';
import { Img, Lightbox } from './ui';
import { LINKS } from './data';
// StrategicProjectMap removed as per strict instruction for all projects

const ICON_MAP = {
  Landmark: Landmark,
  Route: Route,
  Trees: Trees,
  Baby: Building2,
  ShieldCheck: ShieldCheck,
  Zap: Zap,
  Droplets: Droplets,
  Waves: Waves,
  Building2: Building2,
  Fence: Shield,
  GraduationCap: GraduationCap,
  Activity: Activity,
};

export default function ProjectDetail({ project, onBookSiteVisit }) {
  const [lightboxItem, setLightboxItem] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeFacilityTab, setActiveFacilityTab] = useState('highways');
  const [enquirySent, setEnquirySent] = useState(false);
  const [selectedDestMarker, setSelectedDestMarker] = useState(null);
  const enquiryRef = useRef(null);

  if (!project) return null;

  const isCompleted = project.status === 'Completed';

  // Gallery categories
  const categories = ['All', ...new Set(project.gallery.map(g => g.cat))];
  const filteredGallery = activeCategory === 'All' 
    ? project.gallery 
    : project.gallery.filter(g => g.cat === activeCategory);

  const scrollToEnquiry = () => {
    enquiryRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleEnquirySubmit = (e) => {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const name = d.get('name') || '';
    const phone = d.get('phone') || '';
    const email = d.get('email') || '';
    const message = d.get('message') || '';

    const waText = encodeURIComponent(
      `*GEM Group - Project Availability & Pricing Enquiry*\n` +
      `*Project:* ${project.name}\n` +
      `*Name:* ${name}\n` +
      `*Mobile:* ${phone}\n` +
      (email ? `*Email:* ${email}\n` : '') +
      (message ? `*Message:* ${message}\n` : '') +
      `_Sent directly via GEM Group project page_`
    );

    const waUrl = `https://wa.me/919989256633?text=${waText}`;
    window.open(waUrl, '_blank') || (window.location.href = waUrl);
    setEnquirySent(true);
  };

  const whatsappMessage = encodeURIComponent(
    `Hello GEM Group, I am interested in ${project.name}. Please share current availability, plot pricing and brochure.`
  );

  return (
    <article className="project-detail-page">
      {/* ─────────────────────────────────────────────────────────
          1. PROJECT HERO
      ───────────────────────────────────────────────────────── */}
      <section className="pd-hero">
        <div className="pd-hero-bg">
          <Img src={project.heroImage} alt={project.name} loading="eager" />
          <div className="pd-hero-overlay" />
        </div>

        <div className="wrap pd-hero-content">
          {project.logo && (
            <div className="pd-hero-logo-highlight">
              <img src={project.logo} alt={`${project.name} Official Logo`} className="pd-brand-logo" />
            </div>
          )}

          <div className="pd-badge-row">
            <span className={`pd-status-pill ${isCompleted ? 'completed' : 'ongoing'}`}>
              {isCompleted ? <><CheckCircle2 size={14} /> Completed Project</> : <><span className="pulse-indicator" /> Ongoing Project</>}
            </span>
            <span className="pd-approvals-pill">
              <ShieldCheck size={14} /> {project.approvals}
            </span>
            <span className="pd-tlp-pill">
              {project.tlp}
            </span>
          </div>

          <h1 className="pd-main-title">
            {project.id === 'rrr-sree-sreenivasa-county' ? (
              <>Own Your Piece of the <span style={{ color: '#dc2626', fontWeight: 800 }}>RRR</span></>
            ) : (
              project.name
            )}
          </h1>
          <p className="pd-tagline">
            {project.subTagline || project.tagline}
          </p>

          {/* Quick Metrics Bar from Live Reference Site */}
          <div className="pd-hero-pills-grid">
            <div className="pd-pill-box">
              <b>{project.area}</b>
              <span>{project.city}</span>
            </div>
            <div className="pd-pill-box">
              <b>{project.plotSizes}</b>
              <span>Plot Sizes</span>
            </div>
            <div className="pd-pill-box">
              <b>{project.type}</b>
              <span>Plot Options</span>
            </div>
            <div className="pd-pill-box">
              <b>100% Vasthu</b>
              <span>East &amp; West Facing</span>
            </div>
            <div className="pd-pill-box">
              <b>Bank Loans</b>
              <span>Pre-Approved Loans</span>
            </div>
          </div>

          <div className="pd-hero-actions">
            <a href="#layout" className="btn btn-primary">
              <Maximize2 size={16} /> Explore Master Plan
            </a>
            <a href="#location-map" className="btn ghost">
              <MapPin size={16} /> View Location
            </a>
            <a 
              href={project.brochurePdf} 
              download={project.brochureFileName}
              className="btn ghost"
              title={`Download ${project.name} Brochure`}
            >
              <Download size={16} /> Download Brochure (PDF)
            </a>
            <button className="btn ghost" onClick={scrollToEnquiry}>
              Enquire Now <ArrowUpRight size={15} />
            </button>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────
          2. ABOUT THE PROJECT (Exact from geminfinity.co.in/#about)
      ───────────────────────────────────────────────────────── */}
      <section className="section light pd-about-section" id="about">
        <div className="wrap">
          <div className="pd-about-card-container">
            <div className="pd-about-header">
              <span className="section-eyebrow">Project Profile</span>
              <h2 className="section-heading">About the Project</h2>
              <p className="pd-about-lead-text">
                {project.description}
              </p>
            </div>

            {/* Triad Key Metrics matching official site */}
            <div className="pd-about-triad-grid">
              <div className="pd-triad-item">
                <span className="pd-triad-num">
                  {project.approvals.includes('DTCP') ? 'DTCP & Rera' : 'HMDA & Rera'}
                </span>
                <span className="pd-triad-lbl">Approved</span>
              </div>
              <div className="pd-triad-item">
                <span className="pd-triad-num">
                  {project.area.replace(/\s*Acres.*$/i, '').trim()}
                </span>
                <span className="pd-triad-lbl">Acres</span>
              </div>
              <div className="pd-triad-item">
                <span className="pd-triad-num">
                  {(project.units.match(/\d+\+?/) || [project.units])[0]}
                </span>
                <span className="pd-triad-lbl">Units</span>
              </div>
            </div>

            {/* Official Highlights / Layout Blueprint Graphic */}
            {project.highlightsImage && (
              <div className="pd-about-highlights-banner">
                <div 
                  className="pd-highlights-media-frame"
                  onClick={() => setLightboxItem({ 
                    src: project.highlightsImage, 
                    title: `${project.name} - Approved Master Layout Plan & Specifications` 
                  })}
                >
                  <img 
                    src={project.highlightsImage} 
                    alt={`${project.name} - Approved Master Layout Plan`} 
                    className="pd-highlights-media-img"
                    loading="lazy"
                  />
                  <div className="pd-highlights-enlarge-cue">
                    <Maximize2 size={16} /> Click to view approved layout blueprint in full-screen HD
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────
          3. PROJECT OVERVIEW
      ───────────────────────────────────────────────────────── */}
      <section className="section light pd-overview-section" id="overview">
        <div className="wrap">
          <div className="section-header-left">
            <span className="section-eyebrow">Project Specifications</span>
            <h2 className="section-heading">Development Overview</h2>
            <p className="section-sub">
              Verified land acreage, government approvals, plot sizes, and institutional civil infrastructure.
            </p>
          </div>

          <div className="pd-specs-dashboard-grid">
            <div className="pd-spec-box">
              <span className="psb-label">Total Land Area</span>
              <b className="psb-value">{project.area}</b>
              <small className="psb-sub">{isCompleted ? 'Delivered Community' : 'Phases I, II & III'}</small>
            </div>

            <div className="pd-spec-box">
              <span className="psb-label">Project Type</span>
              <b className="psb-value">{project.type}</b>
              <small className="psb-sub">Gated Plotted Layout</small>
            </div>

            <div className="pd-spec-box">
              <span className="psb-label">Plot Quantities &amp; Sizes</span>
              <b className="psb-value">{project.units}</b>
              <small className="psb-sub">{project.plotSizes}</small>
            </div>

            <div className="pd-spec-box">
              <span className="psb-label">Government Approvals</span>
              <b className="psb-value highlight">{project.approvals}</b>
              <small className="psb-sub">{project.tlp}</small>
            </div>

            <div className="pd-spec-box">
              <span className="psb-label">Vasthu Orientation</span>
              <b className="psb-value">{project.facing}</b>
              <small className="psb-sub">Corner Plots Available</small>
            </div>

            <div className="pd-spec-box">
              <span className="psb-label">Internal Road Widths</span>
              <b className="psb-value">{project.roads}</b>
              <small className="psb-sub">Heavy-Duty Cement Concrete</small>
            </div>
          </div>

          {/* Pre-Approved Banking Partners */}
          <div className="pd-banks-bar">
            <div className="pbb-label">
              <CheckCircle2 size={16} className="text-emerald" />
              <b>Pre-Approved Bank Loan Facility Available:</b>
            </div>
            <div className="pbb-chips">
              {project.banks.map((bank, i) => (
                <span key={i} className="bank-chip">{bank}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────
          3. PROJECT HIGHLIGHTS
      ───────────────────────────────────────────────────────── */}
      <section className="section warm pd-highlights-section" id="highlights">
        <div className="wrap">
          <div className="section-header-center">
            <span className="section-eyebrow">Key Strengths</span>
            <h2 className="section-heading">Project Highlights</h2>
            <p className="section-sub">
              Every detail engineered to maximize quality of living, legal safety, and capital growth.
            </p>
          </div>

          <div className="pd-highlights-grid">
            {project.highlights.map((h, i) => (
              <div key={i} className="pd-highlight-card">
                <div className="phc-icon-badge">
                  <CheckCircle2 size={20} className="text-blue" />
                </div>
                <div className="phc-text">
                  <h3 className="phc-title">{h.label}</h3>
                  <p className="phc-desc">{h.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────
          4. AMENITIES GRID WITH PHOTOGRAPHS & ICONS
      ───────────────────────────────────────────────────────── */}
      <section className="section light pd-amenities-section" id="amenities">
        <div className="wrap">
          <div className="section-header-center">
            <span className="section-eyebrow">World-Class Infrastructure</span>
            <h2 className="section-heading">Township Amenities &amp; Features</h2>
            <p className="section-sub">
              Modern leisure, security, and underground utilities built to uncompromising engineering standards.
            </p>
          </div>

          <div className="pd-amenities-grid">
            {project.amenities.map((amen, idx) => {
              const IconComp = ICON_MAP[amen.icon] || Landmark;
              return (
                <div key={idx} className="pd-amenity-card">
                  {amen.image && (
                    <div 
                      className="pac-image-wrap"
                      onClick={() => setLightboxItem({ src: amen.image, title: amen.name })}
                    >
                      <Img src={amen.image} alt={amen.name} />
                      <span className="pac-zoom-icon"><Eye size={13} /></span>
                    </div>
                  )}
                  <div className="pac-body">
                    <div className="pac-title-row">
                      <div className="pac-icon"><IconComp size={18} /></div>
                      <h4 className="pac-name">{amen.name}</h4>
                    </div>
                    <p className="pac-desc">{amen.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────
          5. MASTER PLAN / LAYOUT (ORIGINAL BROCHURE PLAN)
      ───────────────────────────────────────────────────────── */}
      <section className="section warm pd-layout-section" id="layout">
        <div className="wrap">
          <div className="pd-layout-header-card">
            <div>
              <span className="section-eyebrow">Approved Drawing</span>
              <h2 className="section-heading" style={{ margin: '4px 0 8px' }}>Master Layout Plan</h2>
              <p className="section-sub" style={{ margin: 0 }}>
                Examine plot numbering, 60’, 40’ &amp; 33’ CC avenue roads, park reservations, commercial zones, and Vasthu alignments.
              </p>
            </div>
            <div className="pd-layout-actions">
              <button 
                className="btn btn-secondary"
                onClick={() => setLightboxItem({ src: project.layoutImage, title: `${project.name} - Official Master Layout Plan` })}
              >
                <Maximize2 size={16} /> Full-Screen Zoom
              </button>
              <a 
                href={project.brochurePdf} 
                download={project.brochureFileName} 
                className="btn ghost"
              >
                <Download size={15} /> Download Layout (PDF)
              </a>
            </div>
          </div>

          <div 
            className="pd-masterplan-visual"
            onClick={() => setLightboxItem({ src: project.layoutImage, title: `${project.name} - Official Master Layout Plan` })}
          >
            <Img src={project.layoutImage} alt={`${project.name} Approved Master Plan Layout`} />
            <div className="masterplan-overlay-cue">
              <Maximize2 size={20} />
              <span>Click anywhere to inspect individual plots in full-screen zoom</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────
          6. PROJECT GALLERY
      ───────────────────────────────────────────────────────── */}
      <section className="section light pd-gallery-section" id="gallery">
        <div className="wrap">
          <div className="section-header-center">
            <span className="section-eyebrow">Visual Tour</span>
            <h2 className="section-heading">Project Photographs &amp; Renders</h2>
            <p className="section-sub">
              Actual architectural renders, entrance arches, internal avenues, and clubhouse leisure facilities.
            </p>

            <div className="pd-gallery-filter-bar">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`filter-pill ${activeCategory === cat ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="pd-gallery-grid">
            {filteredGallery.map((item, idx) => (
              <div 
                key={idx} 
                className="pd-gallery-item"
                onClick={() => setLightboxItem(item)}
              >
                <div className="pgi-img-wrap">
                  <Img src={item.src} alt={item.title} />
                  <span className="pgi-zoom-btn"><Eye size={16} /></span>
                </div>
                <div className="pgi-caption">
                  <span className="pgi-cat">{item.cat}</span>
                  <b className="pgi-title">{item.title}</b>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────
          7. OFFICIAL BROCHURE LOCATION MAP & CONNECTIVITY
      ───────────────────────────────────────────────────────── */}
      <section className="section warm pd-map-section" id="location-map">
        <div className="wrap">
          <div className="section-header-center">
            <span className="section-eyebrow">Location Intelligence</span>
            <h2 className="section-heading">Official Brochure Location Map &amp; Connectivity</h2>
            <p className="section-sub">
              Authentic high-resolution connectivity blueprint extracted directly from the verified project brochure.
            </p>
          </div>

          <div className="pd-brochure-map-card">
            <div 
              className="pbmc-visual"
              onClick={() => setLightboxItem({ src: project.locationMapImage, title: `${project.name} - Official Location Blueprint Map` })}
            >
              <Img src={project.locationMapImage} alt={`${project.name} Official Location Map`} />
              <div className="pbmc-zoom-overlay">
                <Maximize2 size={22} />
                <span>Click to view official brochure location map in full-screen HD</span>
              </div>
            </div>

            <div className="pbmc-sidebar">
              <div className="pbmc-header">
                <span className="pbmc-tag"><MapPin size={14} /> Official Brochure Map</span>
                <h3 className="pbmc-title">{project.name} Corridor Connectivity</h3>
                <p className="pbmc-desc">
                  Certified strategic connectivity along major growth arteries, industrial clusters, and educational institutions as published in the official approved brochure.
                </p>
              </div>

              <div className="pbmc-specs">
                <div className="pbmc-spec-item">
                  <div className="pbmc-spec-ico text-copper"><Clock size={16} /></div>
                  <div className="pbmc-spec-info">
                    <b>{project.distances[0]?.time}</b>
                    <span>To {project.distances[0]?.destination}</span>
                  </div>
                </div>

                <div className="pbmc-spec-item">
                  <div className="pbmc-spec-ico text-blue"><Route size={16} /></div>
                  <div className="pbmc-spec-info">
                    <b>{project.corridor}</b>
                    <span>Growth Corridor</span>
                  </div>
                </div>

                <div className="pbmc-spec-item">
                  <div className="pbmc-spec-ico text-emerald"><ShieldCheck size={16} /></div>
                  <div className="pbmc-spec-info">
                    <b>{project.approvals}</b>
                    <span>Approvals: {project.tlp}</span>
                  </div>
                </div>
              </div>

              <div className="pbmc-actions">
                {project.googleMapUrl && (
                  <a 
                    href={project.googleMapUrl} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="btn btn-primary btn-pbmc"
                  >
                    <NavIcon size={15} /> Open Live GPS Directions <ArrowUpRight size={14} />
                  </a>
                )}
                <a 
                  href={project.brochurePdf} 
                  download={project.brochureFileName} 
                  className="btn ghost btn-pbmc"
                >
                  <Download size={14} /> Download Map &amp; Brochure (PDF)
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────
          8. NEARBY FACILITIES & CONNECTIVITY RADAR
      ───────────────────────────────────────────────────────── */}
      <section className="section light pd-facilities-section" id="connectivity">
        <div className="wrap">
          <div className="section-header-center">
            <span className="section-eyebrow">Regional Infrastructure</span>
            <h2 className="section-heading">Verified Nearby Facilities &amp; Travel Times</h2>
            <p className="section-sub">
              Exact travel times and distances directly derived from the official project brochure.
            </p>
          </div>

          <div className="distances-grid">
            {project.distances.map((d, i) => (
              <div key={i} className={`dist-card ${d.highlight ? 'featured' : ''}`}>
                <div className="dist-left">
                  <div className="dist-time-badge">
                    <Clock size={16} />
                    <b>{d.time}</b>
                  </div>
                  <span className="dist-km">{d.dist}</span>
                </div>
                <div className="dist-right">
                  <span className="dist-category">{d.category}</span>
                  <b className="dist-name">{d.destination}</b>
                  {d.highlight && <span className="dist-hi-tag">High-Growth Corridor Landmark</span>}
                </div>
              </div>
            ))}
          </div>

          {/* Categorized Facilities Breakdown */}
          {project.facilities && (
            <div className="facilities-categorized-card">
              <h3 className="fcc-title">Surrounding Infrastructure Catalog</h3>
              <div className="fcc-tabs">
                <button 
                  className={`fcc-tab ${activeFacilityTab === 'highways' ? 'active' : ''}`}
                  onClick={() => setActiveFacilityTab('highways')}
                >
                  Highways &amp; Transit
                </button>
                <button 
                  className={`fcc-tab ${activeFacilityTab === 'education' ? 'active' : ''}`}
                  onClick={() => setActiveFacilityTab('education')}
                >
                  Educational Institutions
                </button>
                <button 
                  className={`fcc-tab ${activeFacilityTab === 'industry' ? 'active' : ''}`}
                  onClick={() => setActiveFacilityTab('industry')}
                >
                  IT, SEZ &amp; Industry
                </button>
                <button 
                  className={`fcc-tab ${activeFacilityTab === 'healthcare' ? 'active' : ''}`}
                  onClick={() => setActiveFacilityTab('healthcare')}
                >
                  Hospitals &amp; Healthcare
                </button>
                <button 
                  className={`fcc-tab ${activeFacilityTab === 'landmarks' ? 'active' : ''}`}
                  onClick={() => setActiveFacilityTab('landmarks')}
                >
                  Key Landmarks
                </button>
              </div>

              <div className="fcc-tab-content">
                <ul>
                  {(project.facilities[activeFacilityTab] || []).map((item, idx) => (
                    <li key={idx}>
                      <CheckCircle2 size={16} className="text-emerald" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────
          9. PROJECT ENQUIRY (PRESELECTED PROJECT)
      ───────────────────────────────────────────────────────── */}
      <section className="section warm pd-enquiry-section" id="enquiry" ref={enquiryRef}>
        <div className="wrap enquiry-wrap-grid">
          <div className="enquiry-copy-side">
            <span className="section-eyebrow">Direct Developer Consultation</span>
            <h2 className="section-heading">Enquire About {project.name}</h2>
            <p className="lead-text">
              Speak directly with our senior property advisory team. We assist with spot registration, Vasthu compliance verification, plot selection, and bank loan sanctioning up to 80%.
            </p>

            <div className="enquiry-fast-facts">
              <div className="eff-row">
                <b>Project Status:</b>
                <span>{project.statusBadge}</span>
              </div>
              <div className="eff-row">
                <b>Approval &amp; TLP:</b>
                <span>{project.tlp}</span>
              </div>
              <div className="eff-row">
                <b>Pricing:</b>
                <span>{project.price}</span>
              </div>
              <div className="eff-row">
                <b>Direct Advisor:</b>
                <a href={`tel:${LINKS.phone}`} className="eff-phone" title="Call Advisory Directly" aria-label="Call Advisory Directly">
                  <Phone size={14} /> Call Advisory
                </a>
              </div>
            </div>

            <div className="whatsapp-quick-action">
              <a 
                href={`https://wa.me/919989256633?text=${whatsappMessage}`}
                target="_blank" 
                rel="noreferrer" 
                className="btn btn-wa-direct"
              >
                <MessageCircle size={18} /> Chat Directly on WhatsApp
              </a>
            </div>
          </div>

          <div className="enquiry-form-side">
            <div className="enquiry-form-card">
              <h3>Request Pricing &amp; Availability</h3>
              <p>Fill out the form below to receive immediate brochure details and personalized plot advice.</p>

              {enquirySent ? (
                <div className="form-success-box">
                  <CheckCircle2 size={40} className="text-emerald" />
                  <h4>Thank You for Your Enquiry!</h4>
                  <p>Your enquiry for <b>{project.name}</b> has been received. Our senior property advisor will call you promptly.</p>
                  <button 
                    className="btn btn-sm" 
                    onClick={() => setEnquirySent(false)} 
                    style={{ marginTop: 14 }}
                  >
                    Send Another Enquiry
                  </button>
                </div>
              ) : (
                <form className="p-form" onSubmit={handleEnquirySubmit}>
                  <div className="form-group">
                    <label>Selected Project</label>
                    <input 
                      type="text" 
                      value={`${project.name} (${project.statusBadge})`} 
                      readOnly 
                      className="form-input-readonly" 
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Your Full Name *</label>
                      <input name="name" required placeholder="Full name" />
                    </div>
                    <div className="form-group">
                      <label>Mobile Number *</label>
                      <input name="phone" type="tel" required placeholder="10-digit mobile" />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Email Address</label>
                    <input name="email" type="email" placeholder="Email address" />
                  </div>

                  <div className="form-group">
                    <label>Message / Specific Plot Requirements</label>
                    <textarea 
                      name="message" 
                      rows="3" 
                      placeholder="e.g. Interested in 200 Sq. Yds. East-facing plot or site visit this weekend..." 
                    />
                  </div>

                  <button type="submit" className="btn btn-full btn-primary">
                    <Send size={15} /> Submit Enquiry for {project.shortName}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────
          10. FINAL CONTACT CTA
      ───────────────────────────────────────────────────────── */}
      <section className="pd-final-cta-section">
        <div className="wrap pd-final-cta-card">
          <div className="pfcc-content">
            <span className="pfcc-tag">Complimentary Site Tour</span>
            <h2>Experience {project.shortName} in Person</h2>
            <p>
              We provide free AC cab pickup and drop from anywhere in Hyderabad. Tour the layout roads, inspect plot demarcations, and verify legal documents on-site.
            </p>
            <div className="pfcc-actions">
              <button 
                className="btn btn-primary"
                onClick={() => onBookSiteVisit ? onBookSiteVisit(project) : window.open(`tel:${LINKS.phone}`)}
              >
                <Car size={16} /> Schedule Free AC Cab Pickup Tour
              </button>
              <a href={`tel:${LINKS.phone}`} className="btn ghost" title="Call Property Advisor" aria-label="Call Property Advisor">
                <Phone size={15} /> Call Property Advisor
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Full-Screen Lightbox */}
      <Lightbox item={lightboxItem} onClose={() => setLightboxItem(null)} />
    </article>
  );
}

import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, X, ArrowUpRight, Mail, MapPin, Download, Phone, ChevronUp, 
  Car, Calendar, ShieldCheck, CheckCircle2, MessageCircle, Clock, Sparkles
} from 'lucide-react';
import { Img } from './ui';
import { IMG, LINKS, SOCIAL } from './data';
import { PROJECTS_DATA } from './projectsData';

/* ─────────────────────────────────────────────────────────────
   GLOBAL HEADER: Clean, Professional, International Luxury Style
───────────────────────────────────────────────────────────── */
export function Header({ onSiteVisit }) {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const f = () => setSolid(window.scrollY > 30);
    f(); 
    window.addEventListener('scroll', f, { passive: true });
    return () => window.removeEventListener('scroll', f);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const nav = [
    ['Home', '/'],
    ['About Us', '/about'],
    ['Projects', '/projects'],
    ['Gallery', '/gallery'],
    ['Blogs', '/blogs'],
    ['Contact Us', '/contact'],
  ];

  const go = () => setOpen(false);

  return (
    <header className={`header ${solid ? 'solid' : ''}`}>
      <div className="header-in">
        <Link to="/" className="logos" aria-label="GEM Group Home">
          <Img src={IMG.gemLogo} alt="GEM Group - Leading you Home" loading="eager" />
        </Link>

        <nav className={`nav ${open ? 'open' : ''}`}>
          {nav.map(([label, href]) => {
            const isExternal = href.startsWith('http');
            if (isExternal) {
              return (
                <a 
                  key={label} 
                  href={href}
                  className="" 
                  onClick={go}
                >
                  {label}
                </a>
              );
            }
            const isActive = pathname === href || (href !== '/' && pathname.startsWith(href));
            return (
              <Link 
                key={label} 
                to={href} 
                className={isActive ? 'active-nav-link' : ''} 
                onClick={go}
              >
                {label}
              </Link>
            );
          })}

          <div className="nav-action-btns">
            <Link to="/contact" className="btn btn-sm btn-enquire" onClick={go}>
              Enquire Now <ArrowUpRight size={14} />
            </Link>
            <a href={`tel:${LINKS.phone}`} className="btn btn-sm btn-call" title="Call Property Advisor" aria-label="Call Property Advisor">
              <Phone size={14} /> <span>Call Us</span>
            </a>
          </div>
        </nav>

        <button 
          className="burger" 
          onClick={() => setOpen(!open)} 
          aria-label="Toggle Navigation Menu" 
          aria-expanded={open}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>
    </header>
  );
}

/* ─────────────────────────────────────────────────────────────
   GLOBAL FOOTER: Clean, Informative, Premium Corporate Footer
───────────────────────────────────────────────────────────── */
export function Footer({ onSiteVisit }) {
  return (
    <footer className="footer">
      <div className="wrap footer-grid">
        {/* Brand Info */}
        <div className="f-brand">
          <div className="logos">
            <Img src={IMG.gemLogo} alt="GEM Group" />
          </div>
          <p className="f-desc">
            <b>GEM Group (Gem Infinity Estates LLP)</b> – Leading you Home. Developing master-planned, legally transparent plotted townships and gated communities along Hyderabad’s highest-growth infrastructure corridors.
          </p>
          <div className="f-trust-chips">
            <span><ShieldCheck size={14} className="text-blue" /> 100% Legal Clear Titles</span>
            <span><CheckCircle2 size={14} className="text-emerald" /> DTCP &amp; HMDA Approved</span>
            <span><Sparkles size={14} className="text-copper" /> TG-RERA Compliant</span>
          </div>
          <div className="social">
            {SOCIAL.map(([n, g, u]) => (
              <a key={n} href={u} aria-label={n} target="_blank" rel="noreferrer">
                {g}
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="f-col">
          <h4>Navigation</h4>
          <Link to="/">Home</Link>
          <Link to="/about">About Us</Link>
          <Link to="/projects">Our Projects</Link>
          <Link to="/gallery">Photo Gallery</Link>
          <Link to="/blogs">Blogs</Link>
          <Link to="/contact">Contact Us</Link>
          <Link to="/contact#visit">Schedule Site Visit</Link>
        </div>

        {/* Corporate Office & Contact Details */}
        <div className="f-col">
          <h4>Corporate Office</h4>
          <p className="ico">
            <MapPin size={17} className="f-ico" /> 
            <span>3rd Floor, G-Square Building, Survey No. 79/P, beside Raidurgam Police Station, Madhura Nagar Colony, Gachibowli, Hyderabad, Telangana 500032</span>
          </p>
          <p className="ico">
            <Phone size={17} className="f-ico" /> 
            <a href={`tel:${LINKS.phone}`} className="phone-cta-link" title="Call Advisory Directly">
              Call Advisory Directly
            </a>
          </p>
          <p className="ico">
            <Mail size={17} className="f-ico" /> 
            <a href={`mailto:${LINKS.support}`}>{LINKS.support}</a>
          </p>
          <div className="f-cta-row">
            <Link to="/contact" className="btn btn-sm">
              Contact Advisory <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      </div>

      <div className="wrap footer-base">
        <span>© {new Date().getFullYear()} GEM Group (Gem Infinity Estates LLP). All Rights Reserved.</span>
        <span>Premium DTCP, HMDA &amp; TG-RERA Approved Plotted Communities · Telangana</span>
      </div>
    </footer>
  );
}

/* ─────────────────────────────────────────────────────────────
   BROCHURE DOWNLOAD MODAL (MANDATORY DIRECT PDF DOWNLOAD)
───────────────────────────────────────────────────────────── */
export function BrochureModal({ open, project, onClose }) {
  if (!open || !project) return null;

  const pdfUrl = project.brochurePdf || '/brochures/rrr-sree-sreenivasa-county-leaflet.pdf';
  const fileName = project.brochureFileName || `${project.shortName}-Brochure.pdf`;

  return (
    <div className="lightbox" onClick={onClose} role="dialog" aria-modal="true">
      <div 
        className="modal-card brochure-modal-card" 
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        <div className="modal-head">
          <span className="modal-tag">Official Document Download</span>
          <h3>{project.name}</h3>
          <p className="modal-sub">
            Download the complete verified project brochure with master layout, government approval details, and connectivity information.
          </p>
        </div>

        <div className="brochure-preview-box">
          <div className="bpb-meta">
            <b>{fileName}</b>
            <span>Format: Original High-Resolution PDF Document</span>
            <span className="bpb-tlp">{project.approvals} · {project.tlp}</span>
          </div>

          <div className="bpb-actions">
            <a 
              href={pdfUrl} 
              download={fileName}
              className="btn btn-download-primary"
              onClick={() => setTimeout(onClose, 1000)}
            >
              <Download size={16} /> Download Official PDF Brochure
            </a>
            
            <a 
              href={`https://wa.me/919989256633?text=${encodeURIComponent(`Hello GEM Group, please share the brochure and current pricing for ${project.name}.`)}`}
              target="_blank" 
              rel="noreferrer" 
              className="btn ghost btn-wa-modal"
            >
              <MessageCircle size={16} /> Get Brochure via WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   FREE SITE VISIT MODAL (CAB PICKUP & TOUR)
───────────────────────────────────────────────────────────── */
export function SiteVisitModal({ open, project, onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [proj, setProj] = useState(project?.name || PROJECTS_DATA[0].name);

  useEffect(() => {
    if (project?.name) setProj(project.name);
    if (!open) setSubmitted(false);
  }, [open, project]);

  if (!open) return null;

  const submit = (e) => {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const name = d.get('name') || '';
    const phone = d.get('phone') || '';
    const date = d.get('date') || '';
    const pickup = d.get('pickup') || '';

    const waText = encodeURIComponent(
      `*GEM Group - Free Site Visit Booking*\n` +
      `*Project:* ${proj}\n` +
      `*Name:* ${name}\n` +
      `*Mobile:* ${phone}\n` +
      (date ? `*Preferred Date:* ${date}\n` : '') +
      (pickup ? `*Pickup Location:* ${pickup}\n` : '') +
      `_Booked directly via GEM Group website_`
    );

    const waUrl = `https://wa.me/919989256633?text=${waText}`;
    window.open(waUrl, '_blank') || (window.location.href = waUrl);
    setSubmitted(true);
  };

  return (
    <div className="lightbox" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        <div className="modal-head">
          <span className="modal-tag">Complimentary Facility</span>
          <h3>Schedule a Free Site Visit</h3>
          <p className="modal-sub">
            We provide complimentary AC cab pickup and drop from anywhere in Hyderabad for your on-site layout tour.
          </p>
        </div>

        {submitted ? (
          <div className="modal-success-box">
            <CheckCircle2 size={44} className="text-emerald" />
            <h4>Site Visit Request Prepared!</h4>
            <p>Our senior property consultant will confirm your cab pickup time and coordinate the tour.</p>
            <button className="btn btn-sm" onClick={onClose} style={{ marginTop: 14 }}>
              Close Window
            </button>
          </div>
        ) : (
          <form className="modal-form" onSubmit={submit}>
            <div className="form-group">
              <label>Select Project</label>
              <select 
                value={proj} 
                onChange={(e) => setProj(e.target.value)}
                className="form-select"
              >
                {PROJECTS_DATA.map(p => (
                  <option key={p.id} value={p.name}>
                    {p.name} ({p.status === 'Completed' ? 'Completed' : 'Ongoing'})
                  </option>
                ))}
              </select>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Your Full Name *</label>
                <input name="name" required placeholder="Enter your name" />
              </div>
              <div className="form-group">
                <label>Phone Number *</label>
                <input name="phone" type="tel" required placeholder="Mobile number" />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Preferred Date</label>
                <input name="date" type="date" />
              </div>
              <div className="form-group">
                <label>Pickup Location</label>
                <input name="pickup" placeholder="e.g. Gachibowli, Kukatpally" />
              </div>
            </div>

            <button type="submit" className="btn btn-full">
              <Car size={16} /> Confirm Free Cab Pickup Request
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   FLOATING ACTION BUTTONS (WHATSAPP, CALL, TOP)
───────────────────────────────────────────────────────────── */
export function FloatActions() {
  const [up, setUp] = useState(false);

  useEffect(() => {
    const f = () => setUp(window.scrollY > 400);
    window.addEventListener('scroll', f, { passive: true });
    return () => window.removeEventListener('scroll', f);
  }, []);

  const whatsappMessage = encodeURIComponent(
    "Hello GEM Group, I am interested in your DTCP & RERA approved plotted projects in Hyderabad. Please share pricing and brochures."
  );

  return (
    <aside className="float" aria-label="Quick Actions">
      <a 
        className="wa-btn" 
        href={`https://wa.me/919989256633?text=${whatsappMessage}`}
        target="_blank" 
        rel="noreferrer" 
        aria-label="Chat on WhatsApp"
        title="Chat with GEM Group on WhatsApp"
      >
        <MessageCircle size={24} />
      </a>

      <a 
        className="ring" 
        href={`tel:${LINKS.phone}`} 
        aria-label="Call GEM Group"
        title="Call GEM Group Directly"
      >
        <Phone size={20} />
      </a>

      {up && (
        <button 
          className="ring" 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
          aria-label="Scroll to top"
          title="Scroll to Top"
        >
          <ChevronUp size={22} />
        </button>
      )}
    </aside>
  );
}

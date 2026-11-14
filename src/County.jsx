import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, MapPin, Download, Maximize2, ExternalLink, ChevronDown, ChevronUp, Landmark, Route, TreePine, Baby, Video, Zap, Waves, Car, Phone, Compass } from 'lucide-react';
const ICONS = { Entrance: Landmark, Roads: Route, Greenery: TreePine, 'Children’s Area': Baby, Safety: Video, Utilities: Zap, Water: Waves, Drainage: Waves };
import { Link } from 'react-router-dom';
import { PlotField } from './scenes';
import { Heading, Fade, Tilt, Parallax, Marquee, Lightbox, Img, Counter, PageHero, Spotlight } from './ui';
import { Header, Footer, BrochureModal, SiteVisitModal } from './chrome';
import { IMG, AMENITIES, GALLERY, CONNECT, LINKS, TLP } from './data';
import { PROJECTS_DATA } from './projectsData';

function Hero({ onBrochure }) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], [0, 200]);
  const o = useTransform(scrollY, [0, 650], [1, 0]);
  const facts = [
    ['50 Acres in 3 phases', 'Balanagar, Shadnagar'],
    ['150 To 500 Sq. Yds.', 'Plot sizes'],
    ['Residential & Commercial', 'Plot options'],
    ['East & West Facing', 'Vasthu-compliant options'],
    ['Bank Loans Available', 'ICICI, PNB Housing-As per eligibility'],
  ];
  return (
    <section className="hero county-hero" id="top">
      <motion.div className="hero-bg" style={{ y }}><Img src={IMG.stv} alt="RRR Sree Sreenivasa County street view" loading="eager" /></motion.div>
      <div className="hero-shade" />
      <motion.div className="wrap hero-copy" style={{ opacity: o }}>
        <motion.div className="badges" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
          <Img src={IMG.hmdaLogo} alt="HMDA" loading="eager" /><Img src={IMG.reraLogo} alt="TG RERA" loading="eager" />
        </motion.div>
        <Heading as="h1" lines={['Own Your Piece', '~of the RRR']} delay={0.5} className="hero-title" />
        <motion.p className="hero-sub" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>
          A well-planned plotted project in Balanagar, Shadnagar, spread across 50 acres in 3 phases with modern infrastructure, bank loan facility, and East &amp; West facing plot options.
        </motion.p>
        <motion.div className="hero-cta" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.8 }}>
          <Link className="btn" to="/sree-sreenivasa-county/layout">Explore Master Plan <ArrowUpRight size={17} /></Link>
          <Link className="btn ghost" to="/sree-sreenivasa-county/location">View Location</Link>
        </motion.div>
      </motion.div>
      <motion.div className="hero-facts" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.1, duration: 1 }}>
        {facts.map(([a, b]) => (<div key={a}><b>{a}</b><span>{b}</span></div>))}
      </motion.div>
    </section>
  );
}

function About({ onBrochure }) {
  return (
    <section className="section light" id="about">
      <div className="wrap about">
        <div>
          <Fade className="tag"><span>About The Project</span></Fade>
          <Heading lines={['A Well-Planned Address', '~in Balanagar, Shadnagar']} />
          <Fade delay={0.2}><p className="lead">RRR Sree Sreenivasa County by GEM Group is a premium plotted project in Balanagar, Shadnagar, planned across 50 acres in 3 phases. The project offers residential and commercial premium villa plots with modern infrastructure and lifestyle amenities.</p></Fade>
          <Fade delay={0.3}><p>The project is positioned along the Regional Ring Road corridor and offers 150–500 Sq. Yds. plot options, East &amp; West facing choices, CC roads, underground electricity, drainage, street lighting, parks and other planned amenities.</p></Fade>
          <Fade delay={0.4} className="row-btns">
            <button className="btn" onClick={onBrochure}>Download Brochure <Download size={17} /></button>
            <Link className="btn ghost dark-ghost" to="/sree-sreenivasa-county/location">View Location</Link>
          </Fade>
        </div>
        <Fade delay={0.2}>
          <Tilt className="about-visual" max={6}>
            <Img src={IMG.render} alt="Grand entrance gateway" />
            <div className="about-badge"><b>50-Acre Premium Villa Plots in 3 phases</b><span>Balanagar, Shadnagar</span></div>
          </Tilt>
        </Fade>
      </div>
    </section>
  );
}

function Amenities() {
  const [all, setAll] = useState(false);
  const shown = all ? AMENITIES : AMENITIES.slice(0, 4);
  return (
    <section className="section dark" id="amenities">
      <div className="wrap center-head">
        <Fade className="tag"><span>Project Amenities</span></Fade>
        <Heading lines={['Thoughtfully Planned', '~Amenities & Infrastructure']} />
        <Fade delay={0.2}><p className="lead">A thoughtfully planned 50-acre in 3 phases project with essential infrastructure, leisure facilities and everyday conveniences.</p></Fade>
      </div>
      <div className="wrap amen-grid">
        <AnimatePresence initial={false}>
        {shown.map(([cat, title, desc, src], i) => (
          <motion.div key={title} layout initial={{ opacity: 0, y: 50, rotateX: -12 }} whileInView={{ opacity: 1, y: 0, rotateX: 0 }} exit={{ opacity: 0, scale: 0.9 }} viewport={{ once: true, margin: '0px 0px -8% 0px' }} transition={{ duration: 0.8, delay: (i % 4) * 0.1, ease: [0.16, 1, 0.3, 1] }}>
            <Tilt className="amen" max={12}>
              <div className="amen-img"><Img src={src} alt={title} /></div>
              <div className="amen-body"><small>{cat}</small><h3>{(() => { const Ic = ICONS[cat] || MapPin; return <Ic size={20} />; })()}{title}</h3><p>{desc}</p></div>
            </Tilt>
          </motion.div>
        ))}
        </AnimatePresence>
      </div>
      <div className="wrap see-more">
        <button className="btn outline" onClick={() => setAll(!all)} aria-expanded={all}>{all ? 'See Less' : 'See More'} {all ? <ChevronUp size={17} /> : <ChevronDown size={17} />}</button>
      </div>
    </section>
  );
}

function Gallery() {
  const [lb, setLb] = useState(null);
  const items = GALLERY.map(([cat, title, src]) => ({ cat, title, src }));
  return (
    <section className="gallery" id="gallery">
      <div className="wrap center-head">
        <Fade className="tag"><span>Project Gallery</span></Fade>
        <Heading lines={['See the Vision of', '~RRR Sree Sreenivasa County']} />
        <Fade delay={0.2}><p className="lead">Explore project visuals and architecture designs of the entrance, villa concepts, greenery and infrastructure planned for Balanagar, Shadnagar.</p></Fade>
      </div>
      <Spotlight items={items} onOpen={(it) => setLb({ src: it.src, title: `${it.cat} — ${it.title}` })} />
      <p className="disclaimer wrap">Architecture designs and visuals are artistic impressions for representation purposes only.</p>
      <Lightbox item={lb} onClose={() => setLb(null)} />
    </section>
  );
}

function Layout() {
  const [lb, setLb] = useState(null);
  return (
    <section className="section light layout" id="layout">
      <div className="wrap center-head">
        <Fade className="tag"><span>Project Layout</span></Fade>
        <Heading lines={['Master Plan Across', '~50 Acres in 3 phases']} />
        <Fade delay={0.2}><p className="lead">Residential and commercial plots ranging from 150 to 500 Sq. Yds., with East &amp; West facing options and planned project infrastructure.</p></Fade>
      </div>
      <div className="wrap plot-stage">
        <PlotField />
        <div className="legend"><span><i style={{ background: '#1f9fdc' }} />Phase 1</span><span><i style={{ background: '#6cc6f0' }} />Phase 2</span><span><i style={{ background: '#d1283b' }} />Phase 3</span><em>Move your cursor over the plots</em></div>
      </div>
      <div className="wrap layout-img">
        <Fade>
          <button className="zoom" onClick={() => setLb({ src: IMG.layout, title: 'Project Master Plan' })}>
            <Img src={IMG.layout} alt="Sree Sreenivasa plot layout" />
            <span><Maximize2 size={16} /> Click to Enlarge Layout</span>
          </button>
        </Fade>
      </div>
      <Lightbox item={lb} onClose={() => setLb(null)} />
    </section>
  );
}

function Qr() {
  const [src, setSrc] = useState('');
  useEffect(() => { import('qrcode').then((m) => (m.default || m).toDataURL(LINKS.hmda, { width: 256, margin: 1 }).then(setSrc)); }, []);
  return src ? <a className="hmda-qr" href={LINKS.hmda} target="_blank" rel="noreferrer"><img src={src} alt="QR code for the HMDA layout drawing" /><small>Scan to view layout</small></a> : null;
}

function Location() {
  const [lb, setLb] = useState(null);
  return (
    <section className="section dark" id="location">
      <div className="wrap center-head">
        <Fade className="tag"><span>Project Location</span></Fade>
        <Heading lines={['Explore The Location', '~Connectivities']} />
        <Fade delay={0.2}><p className="lead">A detailed view of the plotted development, internal roads, open spaces and surrounding connectivity.</p></Fade>
      </div>
      <div className="wrap loc-grid">
        <div className="conn">
          {CONNECT.map(([a, b], i) => (
            <Fade key={a} delay={i * 0.08} y={20}>
              <div className="conn-row"><span className="dot" /><div><b>{a}</b><small>{b}</small></div></div>
            </Fade>
          ))}
          <Fade delay={0.5}><p className="loc-line"><MapPin size={17} /> Balanagar, Shadnagar — Regional Ring Road corridor · Shadnagar · Telangana</p></Fade>
        </div>
        <Fade delay={0.2}>
          <Tilt className="map-card" max={5}>
            <button className="zoom" onClick={() => setLb({ src: IMG.map, title: 'RRR Sree Sreenivasa County — Detailed Map' })}>
              <Img src={IMG.map} alt="RRR Sree Sreenivasa County detailed map" />
              <span><Maximize2 size={16} /> Click to Enlarge</span>
            </button>
            <div className="map-foot"><div><b>RRR Sree Sreenivasa County</b><small>Detailed Map • Balanagar, Shadnagar</small></div>
              <a className="btn btn-sm" href={LINKS.rrrMap} target="_blank" rel="noreferrer">Open in Maps <ArrowUpRight size={15} /></a></div>
          </Tilt>
        </Fade>
      </div>
      <div className="wrap center-head" style={{ marginTop: 70 }}>
        <Fade className="tag"><span>GPS Satellite & Road Network</span></Fade>
        <Heading lines={['Interactive GPS Navigation', '~Direct Location Map']} />
        <Fade delay={0.2}><p className="lead">Navigate directly to RRR Sree Sreenivasa County with live Google Maps GPS directions, terrain inspection, and route guidance.</p></Fade>
      </div>
      <div className="wrap" style={{ marginBottom: 40 }}>
        <div className="clean-project-map-box">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3816.2798181314142!2d78.146171!3d16.960781!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcbcd001583c185%3A0xb3b7855a2d2e4fdc!2sRRR%20Sree%20sreenivasa%20County%20GEM%20GROUP!5e0!3m2!1sen!2sin!4v1793009983533!5m2!1sen!2sin" 
            className="clean-map-iframe"
            title="RRR Sree Sreenivasa County Live GPS Location Map"
            loading="lazy"
          />
          <div className="clean-map-footer">
            <div className="cmf-info">
              <MapPin size={18} className="text-copper" />
              <div>
                <b>RRR Sree Sreenivasa County (Ongoing Project)</b>
                <span>Balanagar, Shadnagar, Regional Ring Road (RRR) Corridor · GPS: 16.960781, 78.146171</span>
              </div>
            </div>
            <a href={LINKS.rrrMap} target="_blank" rel="noreferrer" className="btn btn-sm">
              <Compass size={15} /> Open in Google Maps (Turn-by-Turn GPS) <ArrowUpRight size={15} />
            </a>
          </div>
        </div>
      </div>
      <div className="wrap hmda">
        <Fade>
          <div className="hmda-card">
            <div>
              <h3 className="display">HMDA TLP &amp; Layout Reference</h3>
              <p>SSC TLP No.: <b>{TLP}</b></p>
              <p className="muted">Scan the QR code to view the layout drawing hosted on the Telangana BuildNow portal.</p>
            </div>
            <a className="btn" href={LINKS.hmdaPdf} target="_blank" rel="noreferrer">View HMDA Drawing <ExternalLink size={16} /></a>
            <Qr />
          </div>
        </Fade>
      </div>
      <Lightbox item={lb} onClose={() => setLb(null)} />
    </section>
  );
}

function Contact({ onBrochure, onSiteVisit }) {
  return (
    <section className="section cta" id="contact">
      <div className="cta-orb" />
      <div className="wrap center-head">
        <Fade className="tag"><span>Contact & Site Office</span></Fade>
        <Heading lines={['Own Your Piece', '~of the RRR']} />
        <Fade delay={0.2}><p className="lead">Balanagar, Shadnagar - Telangana.<br /><a href={`mailto:${LINKS.email}`}>{LINKS.email}</a></p></Fade>
        <Fade delay={0.3} className="row-btns center">
          <button className="btn" onClick={onBrochure}>Download Brochure <Download size={17} /></button>
          {onSiteVisit && (
            <button className="btn ghost" onClick={onSiteVisit}><Car size={16} /> Book Free Cab Site Visit</button>
          )}
          <a className="btn ghost" href={LINKS.rrrMap} target="_blank" rel="noreferrer">Open in Maps</a>
        </Fade>
      </div>
    </section>
  );
}

function Shell({ tag, children }) {
  const [modal, setModal] = useState(false);
  const [visitModal, setVisitModal] = useState(false);
  const open = () => setModal(true);
  const openVisit = () => setVisitModal(true);
  const countyProj = PROJECTS_DATA.find(p => p.id === 'sree-sreenivasa-county');

  return (
    <>
      <Header variant="county" onBrochure={open} onSiteVisit={openVisit} />
      <main>
        {tag && <PageHero red tag={tag} lines={['RRR Sree', '~Sreenivasa County']} />}
        {children(open, openVisit)}
      </main>
      <Footer variant="county" onBrochure={open} onSiteVisit={openVisit} />
      <button className="side-tab" onClick={open}>Download Brochure</button>
      <BrochureModal open={modal} project={countyProj} onClose={() => setModal(false)} />
      <SiteVisitModal open={visitModal} project={countyProj} onClose={() => setVisitModal(false)} />
    </>
  );
}
const TICKER = ['Regional Ring Road Corridor', 'HMDA & TG-RERA Approved', 'Residential Plots @ ₹18,000 / Sq. Yd', 'Commercial Plots @ ₹20,000 / Sq. Yd', 'East & West Facing', 'Bank Loan Facility Available', '150–500 Sq. Yds.'];
export const CountyHome = () => <Shell>{(o, v) => <><Hero onBrochure={o} /><Marquee speed={55} items={TICKER} /><About onBrochure={o} /><Contact onBrochure={o} onSiteVisit={v} /></>}</Shell>;
export const CountyAmenities = () => <Shell tag="Project Amenities">{(o, v) => <><Amenities /><Contact onBrochure={o} onSiteVisit={v} /></>}</Shell>;
export const CountyGallery = () => <Shell tag="Project Gallery">{(o, v) => <><Gallery /><Contact onBrochure={o} onSiteVisit={v} /></>}</Shell>;
export const CountyLayout = () => <Shell tag="Project Layout">{(o, v) => <><Layout /><Contact onBrochure={o} onSiteVisit={v} /></>}</Shell>;
export const CountyLocation = () => <Shell tag="Project Location">{(o, v) => <><Location /><Contact onBrochure={o} onSiteVisit={v} /></>}</Shell>;

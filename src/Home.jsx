import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowUpRight, MapPin, ShieldCheck, CheckCircle2, Sparkles, 
  Car, Download, Phone, Clock, Trees, Route, ChevronRight, Eye,
  Building, Layers, Box, ChevronDown, ChevronUp, MessageCircle
} from 'lucide-react';
import { Heading, Fade, Img, Lightbox, ImageMarquee } from './ui';
import { Header, Footer, SiteVisitModal, BrochureModal } from './chrome';
import { IMG, LINKS } from './data';
import { PROJECTS_DATA, WHY_GEM_GROUP, COMPANY_HERITAGE, ONGOING_PROJECTS, DYNAMIC_METRICS } from './projectsData';

/* ─────────────────────────────────────────────────────────────
   A. PREMIUM HERO SECTION WITH CLASSY ARCHITECTURAL CROSSFADE
───────────────────────────────────────────────────────────── */
const CLASSY_HERO_SLIDES = [
  {
    src: 'https://sreesreenivasacounty.geminfinity.co.in/assets/images/sree/rrr_render.jpg',
    fallback: '/images/rrr-sree-sreenivasa-map.jpg',
    alt: 'Regional Ring Road (RRR) Corridor 3D Township Layout'
  },
  {
    src: 'https://sreesreenivasacounty.geminfinity.co.in/assets/images/sree/lifestyle.jpg',
    fallback: '/images/sree-laxmi-balaji/img_7.jpg',
    alt: 'Master-Planned Gated Community Living & Landscaped Lawns'
  },
  {
    src: 'https://sreesreenivasacounty.geminfinity.co.in/assets/images/g-2-1200x800.jpg',
    fallback: '/images/rrr-sree-sreenivasa/img_6.jpg',
    alt: 'Wide 40’ Cement Concrete Avenue & Landscaped Walkways'
  },
  {
    src: '/images/sri-balaji-county-entrance.jpg',
    fallback: '/images/sri-balaji-county-masterplan.jpg',
    alt: 'Sri Balaji County Gated Community Entrance Gateway'
  }
];

function Hero({ onSiteVisit }) {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % CLASSY_HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="home-hero">
      <div className="home-hero-bg">
        {CLASSY_HERO_SLIDES.map((slide, idx) => (
          <div 
            key={idx} 
            className={`home-hero-slide ${idx === activeSlide ? 'active' : ''}`}
          >
            <Img 
              src={slide.src} 
              fallback={slide.fallback}
              alt={slide.alt} 
              loading={idx === 0 ? 'eager' : 'lazy'}
            />
          </div>
        ))}
        <div className="home-hero-overlay" />

        <div className="hero-slide-indicators">
          {CLASSY_HERO_SLIDES.map((s, idx) => (
            <button 
              key={idx} 
              className={`hsi-dot ${idx === activeSlide ? 'active' : ''}`}
              onClick={() => setActiveSlide(idx)}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      <div className="wrap home-hero-content">
        <div className="hero-trust-tag">
          <ShieldCheck size={16} className="text-copper" />
          <span>With Decades of Experience and Proven Excellence</span>
        </div>

        <h1 className="hero-main-title">
          Building Dreams,<br />
          <span className="hero-title-accent">Creating Futures.</span>
        </h1>

        <p className="hero-tagline-sub">
          A Perfect Blend of Luxury &amp; Serenity
        </p>

        <p className="hero-description">
          Discover why thousands trust Gem Group for their home and investment across Telangana’s prime growth corridors.
        </p>

        <div className="hero-action-buttons">
          <Link to="/projects" className="btn btn-primary">
            Explore Our Projects <ArrowUpRight size={17} />
          </Link>
          <Link to="/contact" className="btn ghost">
            Get In Touch
          </Link>
        </div>

        <div className="hero-metric-strip">
          <div className="hms-item">
            <b>{DYNAMIC_METRICS.completedAcres}+</b>
            <span>Acres Developed</span>
          </div>
          <div className="hms-item">
            <b>{DYNAMIC_METRICS.approvalsTitle}</b>
            <span>{DYNAMIC_METRICS.approvalsSub}</span>
          </div>
          <div className="hms-item">
            <b>{DYNAMIC_METRICS.ongoingCountFormatted}</b>
            <span>{DYNAMIC_METRICS.ongoingLabel}</span>
          </div>
          <div className="hms-item">
            <b>{DYNAMIC_METRICS.completedUnits}+</b>
            <span>Happy Families</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   B. COMPANY INTRODUCTION (About Us)
   Exact content from geminfinity.co.in/home/
   "At Gem Infinity, we bring together decades of real-estate expertise,
    unmatched commitment, and a vision to build lasting communities —
    not just buildings..."
───────────────────────────────────────────────────────────── */
function CompanyIntro() {
  return (
    <section className="section light home-intro-section" id="about-gem">
      <div className="wrap intro-grid">
        <div className="intro-copy">
          <span className="section-eyebrow">About Us</span>
          <h2 className="section-heading">
            Decades of Excellence in <span className="text-blue">Plotted Communities</span>
          </h2>
          <p className="lead-text" style={{ fontSize: '1.12rem', lineHeight: '1.75', color: '#1e293b' }}>
            At Gem Infinity, we bring together decades of real-estate expertise, unmatched commitment, and a vision to build lasting communities — not just buildings. Over the years, we have successfully delivered numerous residential apartments and open-plot developments, always upholding quality, transparency and customer satisfaction.
          </p>

          <div className="intro-stats-quad">
            <div className="isq-item">
              <span className="isq-num">{DYNAMIC_METRICS.approvalsTitle}</span>
              <span className="isq-label">{DYNAMIC_METRICS.approvalsSub}</span>
            </div>
            <div className="isq-item">
              <span className="isq-num">{DYNAMIC_METRICS.completedAcres}+</span>
              <span className="isq-label">Acres Developed</span>
            </div>
            <div className="isq-item">
              <span className="isq-num">{DYNAMIC_METRICS.ongoingCountFormatted}</span>
              <span className="isq-label">{DYNAMIC_METRICS.ongoingLabel}</span>
            </div>
            <div className="isq-item">
              <span className="isq-num">{DYNAMIC_METRICS.completedUnits}+</span>
              <span className="isq-label">Happy Families</span>
            </div>
          </div>

          <div className="intro-checklist" style={{ marginTop: 24 }}>
            <div className="ic-item">
              <CheckCircle2 size={18} className="text-emerald" />
              <span>100% TG-RERA compliance and government-sanctioned layouts</span>
            </div>
            <div className="ic-item">
              <CheckCircle2 size={18} className="text-emerald" />
              <span>Pre-approved by State Bank of India, HDFC, ICICI &amp; PNB Housing</span>
            </div>
            <div className="ic-item">
              <CheckCircle2 size={18} className="text-emerald" />
              <span>100% Vasthu-compliant East and West facing plot alignments</span>
            </div>
          </div>

          <div className="intro-cta-row">
            <Link to="/about" className="btn btn-secondary">
              Read Our Full Story <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>

        <div className="intro-visual">
          <div className="intro-image-frame">
            <Img 
              src="/images/sree-laxmi-balaji-entrance.jpg" 
              alt="GEM Group Master-Planned Plotted Communities" 
            />
            <div className="intro-image-badge">
              <b>100% Institutional Quality Infrastructure</b>
              <span>Master-Planned Gated Communities · Telangana</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   C. ONGOING DEVELOPMENTS — COMPACT INTERACTIVE PROJECT CARDS
   Small, clean, interactive cards so users can quickly explore ongoing projects
───────────────────────────────────────────────────────────── */
function HomeOngoingProjects() {
  return (
    <section className="section light home-ongoing-section" id="ongoing-projects">
      <div className="wrap">
        <div className="section-header-center hoc-header">
          <span className="section-eyebrow ongoing">Ongoing Developments</span>
          <h2 className="section-heading">Featured Landmark Projects</h2>
          <p className="section-sub">
            Master-planned plotted townships on the NH-44 Bangalore Highway and Regional Ring Road.
          </p>
        </div>

        <div className="home-ongoing-grid">
          {ONGOING_PROJECTS.map((project) => (
            <Link 
              key={project.id} 
              to={`/projects/${project.slug}`}
              className="home-ongoing-card"
              title={`View ${project.name} Details`}
            >
              <div className="hoc-img-box">
                <Img src={project.heroImage} alt={project.name} />
                <span className="hoc-badge">
                  <span className="pulse-indicator" /> Ongoing
                </span>
                <span className="hoc-price-pill">{project.price}</span>
              </div>

              <div className="hoc-body">
                <div className="hoc-top-meta">
                  <span className="hoc-approval">
                    <ShieldCheck size={13} className="text-emerald" /> {project.approvals}
                  </span>
                  <span className="hoc-tlp">{project.tlp}</span>
                </div>

                <h3 className="hoc-title">{project.name}</h3>
                
                <p className="hoc-loc">
                  <MapPin size={13} className="text-blue" />
                  <span>{project.location}</span>
                </p>

                <div className="hoc-footer-row">
                  <span className="hoc-area-pill">{project.area} Layout</span>
                  <span className="hoc-link-text">
                    View Project <ArrowUpRight size={14} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="hoc-bottom-cta">
          <Link to="/projects" className="btn ghost btn-sm">
            View All Developments (Including Completed) <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}


/* ─────────────────────────────────────────────────────────────
   D. AUTOMATIC MOVING TOWNSHIP PHOTO SHOWCASE
   Full-color real estate photographs moving automatically edge-to-edge
───────────────────────────────────────────────────────────── */
function TownshipMarquee({ onLightbox }) {
  const MARQUEE_ITEMS = [
    {
      src: 'https://sreesreenivasacounty.geminfinity.co.in/assets/images/g-1-1200x800.jpg',
      title: 'Phase 2 Community Clubhouse & Fitness Gym',
      cat: 'Clubhouse'
    },
    {
      src: 'https://sreesreenivasacounty.geminfinity.co.in/assets/images/amenities/cc-roads.jpg',
      title: 'Wide 40’ Cement Concrete Avenue & Curbing',
      cat: 'Civil Infrastructure'
    },
    {
      src: 'https://sreesreenivasacounty.geminfinity.co.in/assets/images/sreenivasaavenueplantation.jpg',
      title: 'Lush Avenue Plantations & Open Green Spaces',
      cat: 'Landscaping'
    },
    {
      src: '/images/sree-laxmi-balaji/img_10.jpg',
      title: 'Children’s Play Park & Recreational Gazebos',
      cat: 'Delivered Amenities'
    },
    {
      src: 'https://sreesreenivasacounty.geminfinity.co.in/assets/images/sree/png/stv-d.png',
      title: 'Plotted Community Villa Streetscape & Paved Driveways',
      cat: 'Architecture'
    },
    {
      src: '/images/sree-laxmi-balaji/img_5.jpg',
      title: 'Landscaped Green Parks & Scenic Walkways',
      cat: 'Parks & Gardens'
    },
    {
      src: 'https://sreesreenivasacounty.geminfinity.co.in/assets/images/amenities/play_area.jpg',
      title: 'Family Recreation & Children Play Zone',
      cat: 'Amenities'
    },
    {
      src: 'https://sreesreenivasacounty.geminfinity.co.in/assets/images/Srinivasa_PLOT_LAYOUT.jpg',
      title: 'Approved Plot Layout Blueprint · RRR Sree Sreenivasa County',
      cat: 'Layout Blueprint'
    },
  ];

  return (
    <section className="home-marquee-section">
      <div className="wrap">
        <div className="section-header-center" style={{ marginBottom: 28 }}>
          <span className="section-eyebrow">Township Portfolio</span>
          <h2 className="section-heading">Delivered Infrastructure &amp; Community Living</h2>
          <p className="section-sub">
            Actual on-ground photography across our landmark plotted communities in Shadnagar and Balanagar.
          </p>
        </div>
      </div>

      {/* Edge-to-edge full width without white side gutters, moves automatically */}
      <ImageMarquee images={MARQUEE_ITEMS} onOpen={onLightbox} />
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   E. WHY CHOOSE GEM GROUP
   Verified company strengths in a clean visual layout
───────────────────────────────────────────────────────────── */
function WhyChooseSection() {
  return (
    <section className="section warm home-why-section">
      <div className="wrap">
        <div className="section-header-center">
          <span className="section-eyebrow">The GEM Advantage</span>
          <h2 className="section-heading">Why Discerning Buyers Choose GEM Group</h2>
          <p className="section-sub">
            Built on institutional transparency, rigorous legal compliance, and strategic high-appreciation corridor selection.
          </p>
        </div>

        <div className="why-grid">
          {WHY_GEM_GROUP.map((item, idx) => (
            <div key={idx} className="why-card">
              <div className="why-stat-box">
                <b>{item.stat}</b>
                <span>{item.statLabel}</span>
              </div>
              <h3 className="why-title">{item.title}</h3>
              <p className="why-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   E. FEATURED GALLERY
   Unique full-color real estate photographs (Reduced to 4 curated highlights)
───────────────────────────────────────────────────────────── */
function FeaturedGallery() {
  const [lightboxItem, setLightboxItem] = useState(null);

  const FEATURED_PHOTOS = [
    { 
      title: 'Monumental Gated Community Entrance Gateway · Balanagar', 
      src: '/images/rrr-sree-sreenivasa-entrance.jpg', 
      cat: 'Entrance Architecture' 
    },
    { 
      title: 'Resort Swimming Pool & Leisure Clubhouse · Sree Laxmi Balaji', 
      src: '/images/sree-laxmi-balaji-clubhouse.jpg', 
      cat: 'Delivered Amenities' 
    },
    { 
      title: '3D Aerial Perspective & Master-Planned Community Vista', 
      src: 'https://sreesreenivasacounty.geminfinity.co.in/assets/images/sree/png/dvf-d.png', 
      cat: 'Masterplan Vista' 
    },
    { 
      title: '46-Acre Approved Master Layout Blueprint · Sree Laxmi Balaji', 
      src: '/images/sree-laxmi-balaji-masterplan.jpg', 
      cat: 'Masterplan Blueprint' 
    },
  ];

  return (
    <section className="section light home-gallery-section">
      <div className="wrap">
        <div className="section-header-center">
          <span className="section-eyebrow">Visual Excellence</span>
          <h2 className="section-heading">Actual Project Photography</h2>
          <p className="section-sub">
            Inspect our architectural entrance gateways, resort clubhouse, and approved master layout blueprint.
          </p>
        </div>

        <div className="featured-gallery-grid">
          {FEATURED_PHOTOS.map((photo, i) => (
            <div 
              key={i} 
              className="featured-photo-card"
              onClick={() => setLightboxItem(photo)}
            >
              <div className="fpc-img-wrap">
                <Img src={photo.src} alt={photo.title} />
                <div className="fpc-overlay">
                  <span className="fpc-cat">{photo.cat}</span>
                  <b className="fpc-title">{photo.title}</b>
                  <span className="fpc-zoom-cue"><Eye size={14} /> Click to Enlarge</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="gallery-view-more">
          <Link to="/gallery" className="btn btn-secondary">
            View Complete Photo Gallery ({FEATURED_PHOTOS.length}+ Photos) <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>

      <Lightbox item={lightboxItem} onClose={() => setLightboxItem(null)} />
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   F. FREQUENTLY ASKED QUESTIONS (FAQ) SECTION
   Interactive accordion addressing approvals, bank loans, locations, Vasthu & visits
───────────────────────────────────────────────────────────── */
function FAQSection() {
  const [openIdx, setOpenIdx] = useState(0);

  const FAQS = [
    {
      q: 'What government approvals do GEM Group plotted developments hold?',
      a: 'Every GEM Group plotted township holds 100% statutory approvals from the Directorate of Town and Country Planning (DTCP) or HMDA, along with verified Telangana State Real Estate Regulatory Authority (TG-RERA) registration numbers (such as TG RERA: P02400009778 for Sree Laxmi Balaji Township). All titles are 100% clear with freehold ownership, immediate spot registration, and legal due diligence certificates.'
    },
    {
      q: 'Can I obtain a bank loan for purchasing an open plot in GEM Group projects?',
      a: 'Yes. Our developments are pre-approved by India’s premier banking and financial institutions, including the State Bank of India (SBI), HDFC Bank, ICICI Bank, and PNB Housing Finance. Eligible buyers can secure bank loan financing up to 80% of the plot valuation with competitive interest rates and transparent processing.'
    },
    {
      q: 'Where are GEM Group’s ongoing developments located?',
      a: 'Our active ongoing projects are strategically situated along the 6-Lane NH-44 Bengaluru Highway corridor and the proposed ₹17,000 Cr Regional Ring Road (RRR). RRR Sree Sreenivasa County features direct frontage on the RRR corridor at Shadnagar, while Sri Balaji County is located at the Balanagar industrial and SEZ corridor.'
    },
    {
      q: 'Are all residential villa plots designed according to Vasthu Shastra?',
      a: 'Yes. All GEM Group layouts are 100% Vasthu-compliant. We offer exclusively East-facing and West-facing rectangular plots with optimal dimensional ratios, zero road thrusts (Veethi Shula), and aligned cardinal orientation for healthy, prosperous community living.'
    },
    {
      q: 'What civic infrastructure is delivered within the townships?',
      a: 'Townships are engineered with heavy-duty 40-foot and 33-foot Cement Concrete (CC) internal avenues, underground drainage networks, concealed electrical ducting, avenue tree plantations, rainwater harvesting pits, 24/7 security with CCTV surveillance, and clubhouse amenities.'
    },
    {
      q: 'How can I book a site visit to inspect the projects?',
      a: 'GEM Group provides complimentary site visit tours with free AC cab pickup and drop across all major hubs in Hyderabad (Gachibowli, Kukatpally, Banjara Hills, etc.). You can schedule a visit directly using our website form or by messaging our advisory team on WhatsApp at +91 9989256633.'
    }
  ];

  return (
    <section className="section warm home-faq-section" id="faq">
      <div className="wrap">
        <div className="section-header-center">
          <span className="section-eyebrow">Frequently Asked Questions</span>
          <h2 className="section-heading">Everything You Need to Know</h2>
          <p className="section-sub">
            Transparent, verified answers about layout approvals, bank loans, locations, and infrastructure.
          </p>
        </div>

        <div className="faq-accordion">
          {FAQS.map((faq, i) => {
            const isOpen = openIdx === i;
            return (
              <div key={i} className={`faq-item ${isOpen ? 'open' : ''}`}>
                <button 
                  className="faq-question-btn" 
                  onClick={() => setOpenIdx(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                >
                  <span className="faq-q-text">{faq.q}</span>
                  <span className="faq-icon-toggle">
                    {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </span>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div 
                      className="faq-answer-panel"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <p>{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        <div className="faq-footer-card">
          <div className="ffc-copy">
            <h4>Still have questions about our plotted townships?</h4>
            <p>Speak directly with our senior investment advisors or get immediate answers via WhatsApp.</p>
          </div>
          <div className="ffc-action">
            <a 
              href="https://wa.me/919989256633?text=Hello%20GEM%20Group%2C%20I%20have%20a%20few%20questions%20regarding%20your%20DTCP%20%26%20RERA%20plotted%20projects." 
              target="_blank" 
              rel="noreferrer" 
              className="btn btn-primary"
            >
              <MessageCircle size={16} /> Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   G. SUNSET CTA SECTION (Matching Screenshot 7 from live website)
   "Gem Group"
   "Ready to invest in your future property?"
   "Get in touch with us today! Let's help you find the perfect property that fits your needs & aspirations."
   "Contact Us!" button
───────────────────────────────────────────────────────────── */
function ContactCTA() {
  return (
    <section className="home-sunset-cta">
      <div className="home-sunset-cta-bg">
        <Img 
          src="https://sreesreenivasacounty.geminfinity.co.in/assets/images/sree/png/cfs-d.png" 
          fallback="/images/sree-laxmi-balaji/img_6.jpg"
          alt="GEM Group Plotted Township Future Investment"
        />
        <div className="home-sunset-cta-tint" />
      </div>

      <div className="wrap home-sunset-cta-content">
        <span className="hs-eyebrow">Gem Group</span>
        <h2 className="hs-heading">Ready to invest in your future property?</h2>
        <p className="hs-sub">
          Get in touch with us today! Let’s help you find the perfect property that fits your needs &amp; aspirations.
        </p>
        <div className="hs-action">
          <Link to="/contact" className="btn btn-sunset-contact">
            Contact Us! <ArrowUpRight size={17} />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   HOMEPAGE MAIN COMPONENT
───────────────────────────────────────────────────────────── */
export default function Home() {
  const [visitModalOpen, setVisitModalOpen] = useState(false);
  const [brochureModalOpen, setBrochureModalOpen] = useState(false);
  const [modalProject, setModalProject] = useState(PROJECTS_DATA[0]);
  const [marqueeLightbox, setMarqueeLightbox] = useState(null);

  return (
    <>
      <Header onSiteVisit={() => setVisitModalOpen(true)} />
      
      <main>
        <Hero onSiteVisit={() => setVisitModalOpen(true)} />
        <CompanyIntro />
        <HomeOngoingProjects />
        <TownshipMarquee onLightbox={(item) => setMarqueeLightbox(item)} />
        <WhyChooseSection />
        <FeaturedGallery />
        <FAQSection />
        <ContactCTA />
      </main>

      <Footer onSiteVisit={() => setVisitModalOpen(true)} />

      {/* Marquee Lightbox */}
      <Lightbox item={marqueeLightbox} onClose={() => setMarqueeLightbox(null)} />

      {/* Modals */}
      <SiteVisitModal 
        open={visitModalOpen} 
        project={modalProject}
        onClose={() => setVisitModalOpen(false)} 
      />
      <BrochureModal 
        open={brochureModalOpen} 
        project={modalProject} 
        onClose={() => setBrochureModalOpen(false)} 
      />
    </>
  );
}

import { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Phone, MapPin, Mail, Download, Calendar, Car, ArrowUpRight, 
  CheckCircle2, ShieldCheck, Sparkles, Filter, Layers, Clock, Users, Award,
  ChevronLeft, ChevronRight, Maximize2, Compass, MessageCircle, Send,
  Building2, Eye, FileText, Target, Milestone, X, Search, BookOpen, Share2,
  ExternalLink
} from 'lucide-react';
import { PageHero, Heading, Fade, Img, Lightbox, ImageMarquee } from './ui';
import { LINKS, IMG } from './data';
import { Header, Footer, SiteVisitModal, BrochureModal } from './chrome';
import { 
  PROJECTS_DATA, COMPLETED_PROJECTS, ONGOING_PROJECTS, 
  WHY_GEM_GROUP, COMPANY_HERITAGE, getProjectById, DYNAMIC_METRICS 
} from './projectsData';
import ProjectDetail from './ProjectDetail';
import { PlotField } from './scenes';
// Removed StrategicProjectMap for all projects as requested

/* Helper layout wrapper */
const Page = ({ hero, children, onBrochure, onSiteVisit }) => (
  <>
    <Header onSiteVisit={onSiteVisit} />
    <main>
      <PageHero {...hero} />
      {children}
    </main>
    <Footer onSiteVisit={onSiteVisit} />
  </>
);

/* ─────────────────────────────────────────────────────────────
   7. PROJECTS PAGE
   Exactly 3 projects.
   Clearly separated sections:
   - SECTION A: COMPLETED PROJECTS (Sree Laxmi Balaji Township)
   - SECTION B: ONGOING PROJECTS (RRR Sree Sreenivasa County & Sri Balaji County)
───────────────────────────────────────────────────────────── */
export const ProjectsPage = () => {
  const [activeTab, setActiveTab] = useState('ongoing'); // Always default to 'ongoing'
  const [siteVisitOpen, setSiteVisitOpen] = useState(false);
  const [selectedModalProject, setSelectedModalProject] = useState(PROJECTS_DATA[0]);
  const [selectedLightbox, setSelectedLightbox] = useState(null);

  const handleOpenVisit = (proj) => {
    setSelectedModalProject(proj);
    setSiteVisitOpen(true);
  };

  const displayedProjects = activeTab === 'ongoing' ? ONGOING_PROJECTS : COMPLETED_PROJECTS;

  return (
    <Page 
      hero={{ 
        tag: 'GEM Group Portfolio', 
        lines: ['Our Landmark Plotted', '~Communities in Telangana'],
        text: 'Explore our portfolio of DTCP, HMDA, and TG-RERA approved plotted developments along the Regional Ring Road (RRR) and National Highways in Hyderabad.',
        bgImage: 'https://sreesreenivasacounty.geminfinity.co.in/assets/images/sree/rrr_render.jpg'
      }}
      onSiteVisit={() => setSiteVisitOpen(true)}
    >
      <section className="section light projects-page-section" id="projects-directory">
        <div className="wrap">
          {/* Two Tabs: Ongoing (Default) & Completed */}
          <div className="projects-status-tabs-container">
            <div className="projects-status-tabs">
              <button 
                className={`pst-tab ${activeTab === 'ongoing' ? 'active' : ''}`}
                onClick={() => setActiveTab('ongoing')}
              >
                <span className="pst-dot ongoing" />
                <span>Ongoing Developments ({ONGOING_PROJECTS.length})</span>
              </button>
              <button 
                className={`pst-tab ${activeTab === 'completed' ? 'active' : ''}`}
                onClick={() => setActiveTab('completed')}
              >
                <span className="pst-dot completed" />
                <span>Completed Developments ({COMPLETED_PROJECTS.length})</span>
              </button>
            </div>
          </div>

          <div className="section-header-left" style={{ marginTop: 24, marginBottom: 28 }}>
            <span className={`section-eyebrow ${activeTab === 'ongoing' ? 'ongoing' : 'completed'}`}>
              {activeTab === 'ongoing' ? 'Active Capital Investments' : 'Delivered Excellence'}
            </span>
            <h2 className="section-heading">
              {activeTab === 'ongoing' 
                ? `Ongoing Developments (${ONGOING_PROJECTS.length} Project${ONGOING_PROJECTS.length === 1 ? '' : 's'})` 
                : `Completed Developments (${COMPLETED_PROJECTS.length} Project${COMPLETED_PROJECTS.length === 1 ? '' : 's'})`}
            </h2>
            <p className="section-sub">
              {activeTab === 'ongoing' 
                ? 'High-growth residential and commercial villa plots directly fronting the Regional Ring Road (RRR) economic growth corridor and national highways.' 
                : 'Fully delivered gated township with 100% infrastructure handover, clubhouse amenities, spot registration, and active community living.'}
            </p>
          </div>

          {/* Projects Grid: 2-column on ongoing, single on completed */}
          <div className={`projects-grid-directory ${activeTab === 'ongoing' ? 'two-col' : ''}`}>
            {displayedProjects.map((project) => (
              <div key={project.id} className={`project-card-premium ${project.status === 'Completed' ? 'completed-card' : 'ongoing-card'}`}>
                <div className="pcp-img-box">
                  <Img src={project.heroImage} alt={project.name} />
                  <span className={`pcp-badge ${project.status === 'Completed' ? 'completed' : 'ongoing'}`}>
                    {project.status === 'Completed' ? (
                      <><CheckCircle2 size={14} /> Completed Project</>
                    ) : (
                      <><span className="pulse-indicator" /> Ongoing Project</>
                    )}
                  </span>
                  <span className="pcp-price-tag">{project.price}</span>
                </div>

                <div className="pcp-body">
                  {project.logo && (
                    <div className="pcp-logo-highlight">
                      <img src={project.logo} alt={`${project.name} Official Logo`} className="pcp-brand-logo" />
                    </div>
                  )}

                  <div className="pcp-header-row">
                    <span className="pcp-approvals">
                      <ShieldCheck size={14} /> {project.approvals}
                    </span>
                    <span className="pcp-tlp-tag">{project.tlp}</span>
                  </div>

                  <h3 className="pcp-title">{project.name}</h3>
                  
                  <p className="pcp-location">
                    <MapPin size={16} className="text-blue" />
                    <span>{project.location}</span>
                  </p>

                  <p className="pcp-desc">
                    {project.description}
                  </p>

                  <div className="pcp-specs-grid">
                    <div className="pcp-spec">
                      <b>{project.area}</b>
                      <span>Total Land</span>
                    </div>
                    <div className="pcp-spec">
                      <b>{project.units}</b>
                      <span>Plot Count</span>
                    </div>
                    <div className="pcp-spec">
                      <b>{project.plotSizes}</b>
                      <span>Plot Sizes</span>
                    </div>
                    <div className="pcp-spec">
                      <b>{project.roads}</b>
                      <span>Internal Roads</span>
                    </div>
                  </div>

                  <div className="pcp-dist-highlight">
                    <Clock size={15} className="text-copper" />
                    <span><b>{project.distances[0]?.time}</b> to {project.distances[0]?.destination}</span>
                  </div>

                  <div className="pcp-actions">
                    <Link to={`/projects/${project.slug}`} className="btn btn-primary">
                      View Project Details <ArrowUpRight size={16} />
                    </Link>
                    <a 
                      href={project.brochurePdf} 
                      download={project.brochureFileName}
                      className="btn ghost btn-download-card"
                      title={`Download ${project.name} Brochure`}
                    >
                      <Download size={15} /> Download Brochure (PDF)
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* On-ground site developments & customer handover marquee */}
      <section className="home-marquee-section">
        <div className="wrap">
          <div className="section-header-center" style={{ marginBottom: 28 }}>
            <span className="section-eyebrow">Delivered Sites &amp; Customer Moments</span>
            <h2 className="section-heading">Verified On-Ground Community Progress</h2>
            <p className="section-sub">
              Delivered heavy CC roads, grand entrance gateways, children’s play parks, and proud plot owner handovers across Telangana.
            </p>
          </div>
        </div>

        {/* Full-width edge-to-edge auto-moving track */}
        <ImageMarquee 
          images={[
            { src: '/images/sree-laxmi-balaji-clubhouse.jpg', title: 'Resort Swimming Pool · Sree Laxmi Balaji', cat: 'Clubhouse' },
            { src: 'https://sreesreenivasacounty.geminfinity.co.in/assets/images/amenities/cc-roads.jpg', title: '40’ Concrete Avenue & Walkways', cat: 'Infrastructure' },
            { src: '/images/sree-laxmi-balaji/img_10.jpg', title: 'Children’s Play Park & Green Open Spaces', cat: 'Amenities' },
            { src: '/images/rrr-sree-sreenivasa/img_4.jpg', title: 'Avenue Plantation & Green Parks', cat: 'Greenery' },
            { src: 'https://sreesreenivasacounty.geminfinity.co.in/assets/images/sree/png/stv-d.png', title: 'Plotted Community Street View', cat: 'Architecture' },
            { src: 'https://sreesreenivasacounty.geminfinity.co.in/assets/images/sree/png/cfs-d.png', title: 'Clubhouse Front Elevation & Sports Zone', cat: 'Clubhouse' },
            { src: 'https://sreesreenivasacounty.geminfinity.co.in/assets/images/g-1-1200x800.jpg', title: 'Phase 2 Clubhouse & Gym', cat: 'Clubhouse' },
            { src: '/images/sree-laxmi-balaji/img_5.jpg', title: '40’ & 33’ Heavy-Duty Cement Concrete Roads', cat: 'Civil Infrastructure' },
            { src: '/images/rrr-sree-sreenivasa-map.jpg', title: 'Regional Ring Road Strategic Location Map', cat: 'Connectivity' },
            { src: 'https://sreesreenivasacounty.geminfinity.co.in/assets/images/sree/png/dvf-d.png', title: 'Serene Community Living & Aerial Vista', cat: 'Master Planning' },
            { src: '/images/sri-balaji-county/img_7.jpg', title: 'Internal Roads & Streetlight Infrastructure', cat: 'Infrastructure' },
            { src: '/images/sree-laxmi-balaji/img_4.jpg', title: 'Avenue Plantation & Green Landscaping', cat: 'Greenery' },
          ]} 
          onOpen={(item) => setSelectedLightbox(item)} 
        />
      </section>

      {/* Lightbox */}
      <Lightbox item={selectedLightbox} onClose={() => setSelectedLightbox(null)} />

      {/* Free Site Visit Cab Modal */}
      <SiteVisitModal 
        open={siteVisitOpen} 
        project={selectedModalProject}
        onClose={() => setSiteVisitOpen(false)} 
      />
    </Page>
  );
};

/* ─────────────────────────────────────────────────────────────
   8. DEDICATED INDIVIDUAL PROJECT DETAIL PAGE ROUTE
───────────────────────────────────────────────────────────── */
export const ProjectDetailPageWrapper = () => {
  const { projectId } = useParams();
  const [siteVisitOpen, setSiteVisitOpen] = useState(false);
  
  const project = getProjectById(projectId);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [projectId]);

  if (!project) {
    return (
      <Page hero={{ tag: 'Project Not Found', lines: ['Requested Project', '~Not Found'] }}>
        <div className="wrap" style={{ padding: '80px 0', textAlign: 'center' }}>
          <p>Please browse our verified portfolio of plotted developments.</p>
          <Link to="/projects" className="btn btn-primary">
            View All Projects
          </Link>
        </div>
      </Page>
    );
  }

  return (
    <>
      <Header onSiteVisit={() => setSiteVisitOpen(true)} />
      
      <main>
        <ProjectDetail 
          project={project} 
          onBookSiteVisit={() => setSiteVisitOpen(true)}
        />
      </main>

      <Footer onSiteVisit={() => setSiteVisitOpen(true)} />

      <SiteVisitModal 
        open={siteVisitOpen} 
        project={project} 
        onClose={() => setSiteVisitOpen(false)} 
      />
    </>
  );
};

/* ─────────────────────────────────────────────────────────────
   6. ABOUT US PAGE
   Heritage, Journey, Vision, Verified Leadership, Completed Developments
───────────────────────────────────────────────────────────── */
export const AboutPage = () => {
  const [siteVisitOpen, setSiteVisitOpen] = useState(false);

  return (
    <Page 
      hero={{ 
        tag: 'Company Profile & Heritage', 
        lines: ['Decades of Expertise,', '~Building Lasting Communities'],
        text: 'A trusted real estate development group creating high-value residential plotted townships and gated communities across Telangana.',
        bgImage: 'https://sreesreenivasacounty.geminfinity.co.in/assets/images/sreenivasaavenueplantation.jpg'
      }}
      onSiteVisit={() => setSiteVisitOpen(true)}
    >
      {/* Section 1: Company Introduction & Heritage */}
      <section className="section light about-intro-section">
        <div className="wrap intro-grid">
          <div className="intro-copy">
            <span className="section-eyebrow">About Us</span>
            <h2 className="section-heading">
              Decades of Expertise, <span className="text-blue">Building Lasting Communities</span>
            </h2>
            <p className="lead-text" style={{ fontSize: '1.14rem', lineHeight: '1.75', color: '#1e293b' }}>
              At Gem Infinity, we bring together decades of real-estate expertise, unmatched commitment, and a vision to build lasting communities — not just buildings. Over the years, we have successfully delivered numerous residential apartments and open-plot developments, always upholding quality, transparency and customer satisfaction.
            </p>
            <p className="body-text">
              Headquartered at G-Square Gachibowli, Hyderabad, our development philosophy revolves around identifying high-growth corridors early—such as the ₹17,000 Cr Regional Ring Road (RRR) and National Highway 44 (Bangalore Highway)—and executing comprehensive gated townships with heavy cement concrete roads, underground utilities, and dedicated social recreation spaces.
            </p>

            <div className="heritage-metrics-row">
              <div className="hmr-box">
                <b>{DYNAMIC_METRICS.approvalsTitle}</b>
                <span>{DYNAMIC_METRICS.approvalsSub}</span>
              </div>
              <div className="hmr-box">
                <b>{DYNAMIC_METRICS.completedAcres}+</b>
                <span>Acres Developed</span>
              </div>
              <div className="hmr-box">
                <b>{DYNAMIC_METRICS.ongoingCountFormatted}</b>
                <span>{DYNAMIC_METRICS.ongoingLabel}</span>
              </div>
              <div className="hmr-box">
                <b>{DYNAMIC_METRICS.completedUnits}+</b>
                <span>Happy Families</span>
              </div>
            </div>
          </div>

          <div className="intro-visual">
            <div className="about-visual-frame">
              <Img 
                src="/images/sree-laxmi-balaji-entrance.jpg" 
                fallback="https://www.geminfinity.co.in/wp-content/uploads/2025/08/Entrance-Gate-1024x808.png"
                alt="GEM Group Delivered Township" 
              />
              <div className="about-visual-caption">
                <b>Delivered Township Excellence</b>
                <span>Sree Laxmi Balaji Township · Shadnagar Town</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Vision, Mission & Core Values */}
      <section className="section warm vision-mission-section">
        <div className="wrap">
          <div className="vm-grid">
            <div className="vm-card">
              <div className="vm-icon"><Target size={24} className="text-blue" /></div>
              <h3>Our Vision</h3>
              <p>
                To be Telangana's most trusted plotted development company, renowned for absolute legal integrity, sustainable urban infrastructure, and delivering exponential long-term wealth creation for every property owner.
              </p>
            </div>

            <div className="vm-card">
              <div className="vm-icon"><Milestone size={24} className="text-copper" /></div>
              <h3>Our Mission</h3>
              <p>
                To transform strategic land parcels into fully integrated, Vasthu-compliant living communities equipped with durable CC roads, underground services, and recreational open spaces—delivered on time with transparent spot registration.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Leadership & Management Team */}
      <section className="section light leadership-section">
        <div className="wrap">
          <div className="section-header-center">
            <span className="section-eyebrow">Executive Governance</span>
            <h2 className="section-heading">Leadership &amp; Management Team</h2>
            <p className="section-sub">
              Decades of combined expertise in land acquisition, civil engineering, regulatory compliance, and customer service.
            </p>
          </div>

          <div className="leadership-cards-grid">
            {COMPANY_HERITAGE.directors.map((leader, i) => (
              <div key={i} className="leader-profile-card">
                <div className="lpc-header">
                  <div className="lpc-avatar">
                    <Img src={leader.image} alt={leader.name} />
                  </div>
                  <div className="lpc-meta">
                    <h3 className="lpc-name">{leader.name}</h3>
                    <span className="lpc-desig">{leader.designation}</span>
                    <span className="lpc-role">{leader.role}</span>
                  </div>
                </div>
                <div className="lpc-bio">
                  <p>{leader.bio}</p>
                </div>
                <div className="lpc-footer">
                  <span className="lpc-badge"><ShieldCheck size={14} /> Verified Governance</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Completed Developments & Track Record */}
      <section className="section warm completed-developments-section">
        <div className="wrap">
          <div className="section-header-center">
            <span className="section-eyebrow">Proven Execution</span>
            <h2 className="section-heading">Completed Developments</h2>
            <p className="section-sub">
              Tangible proof of our execution capability and infrastructure delivery.
            </p>
          </div>

          <div className="completed-highlight-card">
            <div className="chc-visual">
              <Img src="/images/sree-laxmi-balaji-masterplan.jpg" alt="Sree Laxmi Balaji Masterplan" />
            </div>
            <div className="chc-content">
              <span className="pcp-badge completed">Completed &amp; Delivered</span>
              <h3>Sree Laxmi Balaji Township</h3>
              <p className="chc-location"><MapPin size={15} /> Shadnagar Town, Farooqnagar Mandal</p>
              <p className="chc-desc">
                A landmark 46-acre master-planned gated township featuring 578 villa plots, DTCP &amp; TG-RERA approvals (TLP. NO: 130/2024/H | TG RERA: P02400009778), an active clubhouse with resort swimming pool, school land reservation, and 40’ &amp; 33’ CC roads. All plots ready for house construction.
              </p>

              <div className="chc-specs-row">
                <div><b>46 Acres</b><span>Area</span></div>
                <div><b>578 Plots</b><span>Units</span></div>
                <div><b>DTCP &amp; RERA</b><span>Approvals</span></div>
                <div><b>Clubhouse</b><span>Delivered</span></div>
              </div>

              <div className="chc-actions">
                <Link to="/projects/sree-laxmi-balaji-township" className="btn btn-primary">
                  View Completed Project Page <ArrowUpRight size={15} />
                </Link>
                <a 
                  href="/brochures/sree-laxmi-balaji-township-brochure.pdf" 
                  download="Sree-Laxmi-Balaji-Township-Brochure.pdf"
                  className="btn ghost"
                >
                  <Download size={14} /> Download Brochure
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Why Choose GEM Group */}
      <section className="section light why-choose-about-section">
        <div className="wrap">
          <div className="section-header-center">
            <span className="section-eyebrow">Unmatched Value</span>
            <h2 className="section-heading">Why Choose GEM Group</h2>
            <p className="section-sub">
              Three fundamental pillars that protect your investment and build generational wealth.
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

          <div className="about-final-cta-box">
            <div>
              <h3>Looking for Verified Plotted Communities in Hyderabad?</h3>
              <p>Schedule a personal consultation or book a complimentary site tour with AC cab pickup.</p>
            </div>
            <Link to="/contact" className="btn btn-primary">
              Contact Us Today <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <SiteVisitModal open={siteVisitOpen} onClose={() => setSiteVisitOpen(false)} />
    </Page>
  );
};

/* ─────────────────────────────────────────────────────────────
   11. GALLERY PAGE
   Project-based image filtering, large premium photographs,
   editorial masonry grid, full-screen lightbox viewing
───────────────────────────────────────────────────────────── */
export const GalleryPage = () => {
  const [selectedProject, setSelectedProject] = useState('All');
  const [lightboxItem, setLightboxItem] = useState(null);

  // Aggregate all high-resolution photos across the 3 projects
  const ALL_PHOTOS = PROJECTS_DATA.flatMap(p => 
    p.gallery.map(g => ({ ...g, projectName: p.name, projectId: p.id, projectShort: p.shortName }))
  );

  const filteredPhotos = selectedProject === 'All' 
    ? ALL_PHOTOS 
    : ALL_PHOTOS.filter(photo => photo.projectId === selectedProject || photo.projectShort === selectedProject);

  return (
    <Page 
      hero={{ 
        tag: 'Visual Portfolio', 
        lines: ['GEM Group Project', '~Photo Gallery'], 
        text: 'Explore actual site developments, architectural renders, grand entrance gateways, heavy CC avenues, and clubhouse leisure facilities across our communities.',
        bgImage: 'https://sreesreenivasacounty.geminfinity.co.in/assets/images/g-2-1200x800.jpg'
      }}
    >
      <section className="section light gallery-page-section">
        <div className="wrap">
          <div className="gallery-filter-toolbar">
            <div className="gft-left">
              <span className="gft-label"><Filter size={15} /> Filter by Project:</span>
              <div className="gft-pills">
                <button 
                  className={`filter-pill ${selectedProject === 'All' ? 'active' : ''}`}
                  onClick={() => setSelectedProject('All')}
                >
                  All Developments ({ALL_PHOTOS.length})
                </button>
                {PROJECTS_DATA.map(p => (
                  <button 
                    key={p.id}
                    className={`filter-pill ${selectedProject === p.id ? 'active' : ''}`}
                    onClick={() => setSelectedProject(p.id)}
                  >
                    {p.shortName} ({p.status === 'Completed' ? 'Completed' : 'Ongoing'})
                  </button>
                ))}
              </div>
            </div>

            <div className="gft-right">
              <span className="gft-count">Showing {filteredPhotos.length} Photographs</span>
            </div>
          </div>

          <div className="editorial-gallery-grid">
            {filteredPhotos.map((photo, i) => (
              <motion.div 
                key={`${selectedProject}-${photo.src}-${i}`} 
                className="gallery-item-card"
                onClick={() => setLightboxItem(photo)}
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: Math.min(i * 0.04, 0.35), ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -6 }}
              >
                <div className="gic-img-wrap">
                  <Img src={photo.src} alt={photo.title} />
                  <span className="gic-zoom"><Eye size={16} /></span>
                </div>
                <div className="gic-info">
                  <span className="gic-project">{photo.projectShort} · {photo.cat}</span>
                  <h4 className="gic-title">{photo.title}</h4>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Lightbox item={lightboxItem} onClose={() => setLightboxItem(null)} />
    </Page>
  );
};

/* ─────────────────────────────────────────────────────────────
   12. CONTACT US PAGE
   Two columns: Left: info & Google Map. Right: Enquiry Form.
───────────────────────────────────────────────────────────── */
export const ContactPage = () => {
  const [searchParams] = useSearchParams();
  const initialProject = searchParams.get('project') || PROJECTS_DATA[0].name;
  const [selectedProject, setSelectedProject] = useState(initialProject);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const name = d.get('name') || '';
    const phone = d.get('phone') || '';
    const email = d.get('email') || '';
    const date = d.get('date') || '';
    const message = d.get('message') || '';

    const waText = encodeURIComponent(
      `*GEM Group - Website Enquiry*\n` +
      `*Project:* ${selectedProject}\n` +
      `*Name:* ${name}\n` +
      `*Mobile:* ${phone}\n` +
      (email ? `*Email:* ${email}\n` : '') +
      (date ? `*Preferred Site Visit Date:* ${date}\n` : '') +
      (message ? `*Requirements:* ${message}\n` : '') +
      `_Sent directly via GEM Group website enquiry form_`
    );

    const waUrl = `https://wa.me/919989256633?text=${waText}`;
    window.open(waUrl, '_blank') || (window.location.href = waUrl);
    setSubmitted(true);
  };

  const whatsappMessage = encodeURIComponent(
    `Hello GEM Group, I would like to enquire about ${selectedProject}. Please share pricing and arrange a site visit.`
  );

  return (
    <Page 
      hero={{ 
        tag: 'Connect With Our Property Advisors', 
        lines: ['Let’s Find Your Ideal', '~Property Together'],
        text: 'Reach out to our senior investment consultants. Schedule a free AC cab site tour or visit our corporate headquarters in Gachibowli, Hyderabad.',
        bgImage: 'https://sreesreenivasacounty.geminfinity.co.in/assets/images/sree/rrr_hero.jpg'
      }}
    >
      <section className="section light contact-page-section">
        <div className="wrap contact-two-column-grid">
          {/* Left Column: Company Info & Corporate Map */}
          <div className="contact-info-column">
            <span className="section-eyebrow">Corporate Headquarters</span>
            <h2 className="section-heading" style={{ fontSize: '2rem' }}>Visit Our Office</h2>
            <p className="lead-text" style={{ fontSize: '1rem', marginBottom: 24 }}>
              Our senior property advisors are available 7 days a week to guide you through legal documentation, Vasthu plots, and bank loan sanctions.
            </p>

            <div className="contact-cards-stack">
              <div className="contact-info-card">
                <div className="cic-icon"><MapPin size={22} className="text-blue" /></div>
                <div className="cic-text">
                  <b>Corporate Office Address</b>
                  <p>3rd Floor, G-Square Building, Survey No. 79/P, beside Raidurgam Police Station, Madhura Nagar Colony, Gachibowli, Hyderabad, Telangana 500032</p>
                </div>
              </div>

              <div className="contact-info-card">
                <div className="cic-icon"><Phone size={22} className="text-blue" /></div>
                <div className="cic-text">
                  <b>Direct Telephone Line</b>
                  <p style={{ marginTop: 6 }}>
                    <a href={`tel:${LINKS.phone}`} className="btn btn-sm btn-primary phone-cta-btn" title="Tap to Call Directly" aria-label="Tap to Call Directly">
                      <Phone size={14} /> Tap to Call Direct
                    </a>
                  </p>
                  <small>Available 9:00 AM – 7:30 PM (Mon to Sun)</small>
                </div>
              </div>

              <div className="contact-info-card">
                <div className="cic-icon"><Mail size={22} className="text-blue" /></div>
                <div className="cic-text">
                  <b>Official Email Contacts</b>
                  <p><a href={`mailto:${LINKS.support}`} className="email-link">{LINKS.support}</a></p>
                  <p><a href={`mailto:${LINKS.email}`} className="email-link">{LINKS.email}</a></p>
                </div>
              </div>
            </div>

            <div className="contact-wa-action">
              <a 
                href={`https://wa.me/919989256633?text=${whatsappMessage}`}
                target="_blank" 
                rel="noreferrer" 
                className="btn btn-wa-direct"
              >
                <MessageCircle size={18} /> Chat with Advisory on WhatsApp
              </a>
            </div>

            {/* Corporate Office Google Map */}
            <div className="contact-map-frame">
              <div className="cmf-head">
                <MapPin size={16} className="text-blue" />
                <b>GEM Infinity Corporate Office Location</b>
              </div>
              <iframe 
                className="c-map" 
                title="GEM Infinity Corporate Office - G Square Gachibowli" 
                loading="lazy" 
                src="https://maps.google.com/maps?q=G%20Square%2C%20Madhura%20Nagar%20Colony%20Gachibowli&t=m&z=15&output=embed&iwloc=near" 
              />
            </div>
          </div>

          {/* Right Column: Enquiry Form */}
          <div className="contact-form-column" id="visit">
            <div className="contact-form-container">
              <div className="cf-head">
                <span className="cf-tag">Personalized Assistance</span>
                <h3>Send Us an Enquiry</h3>
                <p>Submit your details to receive instant plot availability, pricing, and book a free AC cab pickup.</p>
              </div>

              {submitted ? (
                <div className="form-success-box">
                  <CheckCircle2 size={44} className="text-emerald" />
                  <h4>Thank You for Reaching Out!</h4>
                  <p>Your enquiry for <b>{selectedProject}</b> has been received. Our senior property advisor will contact you promptly.</p>
                  <button 
                    className="btn btn-sm btn-primary" 
                    onClick={() => setSubmitted(false)}
                    style={{ marginTop: 14 }}
                  >
                    Submit Another Query
                  </button>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label>Interested Project *</label>
                    <select 
                      value={selectedProject} 
                      onChange={(e) => setSelectedProject(e.target.value)}
                      className="form-select"
                      required
                    >
                      {PROJECTS_DATA.map(p => (
                        <option key={p.id} value={p.name}>
                          {p.name} ({p.status === 'Completed' ? 'Completed' : 'Ongoing'})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Full Name *</label>
                    <input name="name" required placeholder="Enter your full name" />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Mobile Number *</label>
                      <input name="phone" type="tel" required placeholder="10-digit mobile number" />
                    </div>
                    <div className="form-group">
                      <label>Email Address</label>
                      <input name="email" type="email" placeholder="name@example.com" />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Preferred Site Visit Date (Optional)</label>
                    <input name="date" type="date" />
                  </div>

                  <div className="form-group">
                    <label>Message / Plot Requirements</label>
                    <textarea 
                      name="message" 
                      rows="4" 
                      placeholder="Please share your preferred plot size (e.g. 150, 200, 300 Sq. Yds.), Vasthu preference, or free cab pickup location..."
                    />
                  </div>

                  <button type="submit" className="btn btn-full btn-primary">
                    <Send size={16} /> Submit Property Enquiry
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </Page>
  );
};

/* ─────────────────────────────────────────────────────────────
   13. OFFICIAL REAL ESTATE BLOGS & MARKET INSIGHTS
   Native React page with official Header, PageHero, category filters,
   search, article cards, full reading modal, and Footer.
───────────────────────────────────────────────────────────── */
export const BLOG_POSTS = [
  {
    id: 1,
    slug: 'why-shadnagar-is-hyderabads-next-big-real-estate-hub',
    title: 'Why Shadnagar Is Hyderabad’s Next Big Real Estate Hub',
    url: 'https://www.geminfinity.co.in/why-shadnagar-is-hyderabads-next-big-real-estate-hub-2/',
    category: 'Updates',
    date: 'February 26, 2026',
    readTime: '4 min read',
    author: 'Digiadmin',
    image: 'https://sreesreenivasacounty.geminfinity.co.in/assets/images/sree/lifestyle.jpg',
    fallback: '/images/sree-laxmi-balaji/img_9.jpg',
    excerpt: 'Hyderabad’s real estate market is expanding rapidly beyond the city limits, and Shadnagar has emerged as one of the most promising investment destinations. Strategically located, well-connected, and backed by major infrastructure developments, it offers immense potential for property buyers and investors alike.',
    takeaways: [
      'Prime location along the 6-Lane Hyderabad-Bangalore Highway (NH-44)',
      'Seamless 25-30 minute transit to Rajiv Gandhi International Airport (RGIA)',
      'Direct frontage to the upcoming ₹17,000 Cr Regional Ring Road (RRR) Southern Arc',
      'Surrounded by Amazon Fulfillment, Polepally SEZ, and Symbiosis International University'
    ],
    sections: [
      {
        heading: '1. Strategic Geographic & Highway Connectivity',
        body: 'Shadnagar is strategically situated along the high-speed NH-44 Bengaluru Highway corridor, serving as the gateway to South Hyderabad’s massive industrial and residential expansion. Its direct signal-free access to the Outer Ring Road (ORR) and Shamshabad Airport ensures effortless commutes for working professionals.'
      },
      {
        heading: '2. Regional Ring Road (RRR) Strategic Growth Catalyst',
        body: 'With direct alignment along the proposed ₹17,000 Cr Regional Ring Road (RRR) Southern Arc, Shadnagar links seamlessly to satellite growth nodes across Telangana without passing through inner-city bottlenecks. Properties along major RRR interchanges are recording unprecedented appreciation rates.'
      },
      {
        heading: '3. Master-Planned Plotted Townships with Clear Titles',
        body: 'Unlike congested city apartments, master-planned gated layouts such as Sree Laxmi Balaji Township and RRR Sree Sreenivasa County offer DTCP & TG-RERA approvals, 40’ & 33’ CC concrete avenues, underground drainage, and 100% Vasthu compliance, ensuring lifelong capital growth.'
      }
    ]
  },
  {
    id: 2,
    slug: 'shadnagar-next-big-real-estate-destination-near-hyderabad',
    title: 'Why Shadnagar is the Next Big Real Estate Destination Near Hyderabad',
    url: 'https://www.geminfinity.co.in/shadnagar-real-estate/',
    category: 'Shadnagar Real Estate',
    date: 'July 23, 2025',
    readTime: '5 min read',
    author: 'Digiadmin',
    image: 'https://www.geminfinity.co.in/wp-content/uploads/2025/07/blog-image.jpg',
    fallback: '/images/rrr-sree-sreenivasa-entrance.jpg',
    excerpt: 'If you’re planning to invest in real estate near Hyderabad, Shadnagar should be on top of your list. Located along the bustling Hyderabad-Bangalore Highway (NH-44), this rapidly growing town is transforming into a prime real estate hub.',
    takeaways: [
      'Transforming from a suburban satellite into a self-sustaining luxury residential ecosystem',
      'Surrounded by world-class institutions: Symbiosis International University & NIMS medical campus',
      'Strong rental and capital yield driven by industrial corridors and pharma tech parks',
      '100% clear title DTCP approved layouts with ready spot registration and bank loan approvals'
    ],
    sections: [
      {
        heading: '1. Rapid Industrial & Commercial Expansion',
        body: 'Shadnagar is flanked by multinational logistics giants, the world’s largest Amazon Fulfillment Center, pharmaceutical manufacturing leaders like Natco Pharma and MSN Labs, and the booming Polepally SEZ, creating strong demand for residential villa plots.'
      },
      {
        heading: '2. Educational, Healthcare & Lifestyle Hub',
        body: 'Families are increasingly choosing Shadnagar due to top-tier educational institutions such as Symbiosis International Deemed University and Heritage Valley International School, coupled with the state-of-the-art 90-acre NIMS health campus.'
      },
      {
        heading: '3. High Capital Appreciation for Early Investors',
        body: 'Land along the NH-44 and Regional Ring Road corridor continues to outperform other investment classes, providing investors with reliable double-digit annual appreciation and clear legal title protection.'
      }
    ]
  },
  {
    id: 3,
    slug: 'bangalore-highway-open-plots-gateway-to-smart-investments',
    title: 'Bangalore Highway Open Plots: Your Gateway to Smart Investments',
    url: 'https://www.geminfinity.co.in/bangalore-highway-plots/',
    category: 'Bangalore Highway Plots',
    date: 'December 7, 2024',
    readTime: '5 min read',
    author: 'Digiadmin',
    image: 'https://www.geminfinity.co.in/wp-content/uploads/2024/12/Bangalore-Highway-Open-Plots.jpg',
    fallback: '/images/sri-balaji-county-entrance.jpg',
    excerpt: 'We are excited to announce the launch of our new project, "Bangalore Highway". Located along the booming NH-44 investment corridor, this development offers excellent connectivity, high appreciation, and verified approvals.',
    takeaways: [
      'Direct access from the 6-Lane NH-44 Bengaluru Highway corridor',
      'Institutional civil standards: 40’ & 33’ CC roads, underground drainage & concealed electricity',
      '100% DTCP and TG-RERA approved layouts with clear marketability and mortgage clearance',
      'Proximity to Balanagar industrial cluster, SEZs, and planned transit hubs'
    ],
    sections: [
      {
        heading: '1. The Booming NH-44 Growth Vector',
        body: 'The Bangalore Highway (NH-44) corridor is South India’s premier development corridor, connecting Hyderabad directly to Bengaluru. It combines swift highway commuting with deep industrial and logistics employment clusters.'
      },
      {
        heading: '2. GEM Group’s Infrastructure Commitment',
        body: 'Every plotted development by GEM Group features reinforced cement concrete internal roads, landscaped park reserves, rainwater harvesting, overhead water storage, and 24/7 gated security with designer entrance arches.'
      },
      {
        heading: '3. Hassle-Free Spot Registration & Bank Financing',
        body: 'Our projects come with completed legal due diligence, title scrutiny reports, and approvals from premier national and private banks for up to 75% plot purchase and villa construction loans.'
      }
    ]
  },
  {
    id: 4,
    slug: 'hyderabad-to-bangalore-highway-investments-golden-opportunity',
    title: 'Hyderabad to Bangalore Highway Investments: A Golden Opportunity',
    url: 'https://www.geminfinity.co.in/hyderabad-to-bangalore-highway-investments-a-golden-opportunity/',
    category: 'Bangalore Highway Plots',
    date: 'November 27, 2024',
    readTime: '6 min read',
    author: 'Digiadmin',
    image: 'https://www.geminfinity.co.in/wp-content/uploads/2024/11/Hyderabad-to-Bangalore-Highway.jpg',
    fallback: '/images/sree-laxmi-balaji/img_11.jpg',
    excerpt: 'The Hyderabad to Bangalore highway is emerging as a hotspot for real estate investments. With massive infrastructure expansion, industrial corridors, SEZs, and regional connectivity, open plots here are yielding remarkable capital returns.',
    takeaways: [
      'Unmatched South Hyderabad highway expansion driven by government and private capital',
      'Sustained compounding land value growth compared to depreciating built-up apartments',
      'Strategic convergence with the upcoming Regional Ring Road and outer logistics hubs',
      'Pure freehold land ownership offering complete freedom for custom luxury villa design'
    ],
    sections: [
      {
        heading: '1. Massive Regional Infrastructure Inflow',
        body: 'Multi-crore investments into road widening, radial connectivity, and industrial corridors have transformed the Hyderabad-Bangalore stretch into Telangana’s primary wealth creation highway.'
      },
      {
        heading: '2. The Financial Logic of Plotted Land Ownership',
        body: 'Unlike apartment units that depreciate as structures age, open plots represent 100% freehold ownership of the underlying land. Plots along NH-44 require zero recurring maintenance costs while appreciating steadily year over year.'
      },
      {
        heading: '3. Ideal for Living & Generational Wealth',
        body: 'With clean air, expansive greenery, Vasthu compliance, and modern gated community amenities, these plotted layouts provide the perfect foundation for peaceful living and legacy family wealth.'
      }
    ]
  },
  {
    id: 5,
    slug: 'real-estate-future-vision-in-hyderabad-promising-outlook',
    title: 'Real Estate Future Vision in Hyderabad: A Promising Outlook',
    url: 'https://www.geminfinity.co.in/real-estate-hyderabad/',
    category: 'Hyderabad Real Estate',
    date: 'November 27, 2024',
    readTime: '6 min read',
    author: 'Digiadmin',
    image: 'https://www.geminfinity.co.in/wp-content/uploads/2024/11/Real-Estate-Future-Vision-in-Hyderabad.jpg',
    fallback: '/images/sree-laxmi-balaji/img_7.jpg',
    excerpt: 'Hyderabad, one of India’s rapidly growing cities, has long been a hub for business, technology, and culture. The city\'s master plan and southward growth along NH-44 and the Regional Ring Road offer unprecedented expansion potential.',
    takeaways: [
      'Hyderabad Master Plan 2031 prioritizing planned satellite townships and arterial expressways',
      'Southward expansion towards Shamshabad Airport, Shadnagar, and the Regional Ring Road',
      'Rising preference for low-density, sustainable gated communities with clubhouses and parks',
      'Proven track record of GEM Group with fully delivered gated townships in Telangana'
    ],
    sections: [
      {
        heading: '1. Strategic Master Plan & Economic Momentum',
        body: 'Hyderabad continues to lead Indian metros in infrastructure quality, job creation, and economic resilience. The government’s master planning emphasizes decentralized satellite cities connected via express highways.'
      },
      {
        heading: '2. The Shift Towards Plotted Luxury Living',
        body: 'Homeowners are seeking healthier environments with open skies, tree-lined boulevards, dedicated children’s parks, and independent villa living, moving away from dense, congested urban cores.'
      },
      {
        heading: '3. GEM Group: Building Communities for the Future',
        body: 'With landmark delivered townships like Sree Laxmi Balaji Township and high-growth developments like RRR Sree Sreenivasa County and Sri Balaji County, GEM Group leads the plotted real estate sector with unyielding commitment to legal transparency and engineering quality.'
      }
    ]
  }
];

export const BlogsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeArticle, setActiveArticle] = useState(null);
  const [siteVisitOpen, setSiteVisitOpen] = useState(false);

  const categories = ['All', 'Updates', 'Shadnagar Real Estate', 'Bangalore Highway Plots', 'Hyderabad Real Estate'];

  const filteredPosts = BLOG_POSTS.filter(post => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch = searchQuery.trim() === '' || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <Page 
      hero={{ 
        tag: 'Official Insights & News', 
        lines: ['Real Estate Insights,', '~Market Trends & News'],
        text: 'Official articles and investment updates directly from GEM Group, covering Shadnagar, the Bangalore Highway (NH-44) corridor, and the future of plotted real estate in Hyderabad.',
        bgImage: 'https://www.geminfinity.co.in/wp-content/uploads/2025/07/Why-Invest-In-Plots.jpg'
      }}
      onSiteVisit={() => setSiteVisitOpen(true)}
    >
      <section className="section light blogs-page-section">
        <div className="wrap">
          {/* Header Controls: Categories & Search */}
          <div className="blogs-controls-header">
            <div className="blogs-categories-bar">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`blogs-cat-pill ${selectedCategory === cat ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="blogs-search-box">
              <Search size={16} className="text-blue" />
              <input 
                type="text" 
                placeholder="Search Shadnagar, Bangalore Highway, Digiadmin..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="blogs-search-input"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="blogs-search-clear"
                  aria-label="Clear search"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>

          {/* Results Count */}
          <div className="blogs-meta-bar">
            <span>Showing <b>{filteredPosts.length}</b> verified WordPress blog articles</span>
            {selectedCategory !== 'All' && (
              <span className="blogs-filter-indicator">
                Filtered by: <b>{selectedCategory}</b>
                <button onClick={() => setSelectedCategory('All')}>Clear Filter</button>
              </span>
            )}
          </div>

          {/* Blog Articles Grid */}
          <div className="blogs-grid">
            {filteredPosts.map((post) => (
              <article key={post.id} className="blog-card">
                <div className="bc-img-wrap" onClick={() => setActiveArticle(post)}>
                  <Img src={post.image} fallback={post.fallback} alt={post.title} />
                  <span className="bc-cat-tag">{post.category}</span>
                  <span className="bc-read-time"><Clock size={13} /> {post.readTime}</span>
                </div>

                <div className="bc-body">
                  <div className="bc-meta-row">
                    <span className="bc-date"><Calendar size={13} /> {post.date}</span>
                    <span className="bc-author"><ShieldCheck size={13} className="text-emerald" /> {post.author}</span>
                  </div>

                  <h3 className="bc-title" onClick={() => setActiveArticle(post)}>
                    {post.title}
                  </h3>

                  <p className="bc-excerpt">{post.excerpt}</p>

                  {/* Key Takeaways */}
                  <div className="bc-takeaways">
                    <b>Key Insights:</b>
                    <ul>
                      {post.takeaways.slice(0, 2).map((point, idx) => (
                        <li key={idx}>
                          <CheckCircle2 size={13} className="text-emerald" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bc-footer">
                    <button 
                      className="btn btn-sm btn-primary bc-read-btn"
                      onClick={() => setActiveArticle(post)}
                    >
                      <BookOpen size={14} /> Read Article
                    </button>
                    
                    <a 
                      href={post.url}
                      target="_blank"
                      rel="noreferrer"
                      className="btn ghost btn-sm bc-orig-link"
                      title="View original article on geminfinity.co.in"
                    >
                      <ExternalLink size={13} /> Original
                    </a>

                    <a 
                      href={`https://wa.me/919989256633?text=${encodeURIComponent(`Hello GEM Group, I read your article "${post.title}" and would like to consult your advisory team.`)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="btn ghost btn-sm bc-wa-btn"
                      title="Consult Advisory on WhatsApp"
                    >
                      <MessageCircle size={14} /> WhatsApp
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* External WordPress Archive Gateway Card */}
          <div className="blogs-wp-archive-card">
            <div className="bwa-copy">
              <span className="section-eyebrow">Official WordPress Source</span>
              <h3>Explore Our Complete WordPress Blog &amp; Media Coverage</h3>
              <p>
                Browse the original articles, historical updates, and official press publications on our primary portal at <b>geminfinity.co.in</b>.
              </p>
            </div>
            <div className="bwa-action">
              <a 
                href="https://www.geminfinity.co.in/blog/" 
                target="_blank" 
                rel="noreferrer" 
                className="btn btn-primary"
              >
                Open WordPress Blog Archive <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Full Article Reader Lightbox Modal */}
      {activeArticle && (
        <div className="lightbox blog-modal-lightbox" onClick={() => setActiveArticle(null)} role="dialog" aria-modal="true">
          <div className="blog-reader-modal" onClick={(e) => e.stopPropagation()}>
            <button 
              className="modal-close" 
              onClick={() => setActiveArticle(null)} 
              aria-label="Close article"
            >
              <X size={20} />
            </button>

            <div className="brm-header">
              <div className="brm-badge-row">
                <span className="bc-cat-tag">{activeArticle.category}</span>
                <span className="brm-time"><Clock size={14} /> {activeArticle.readTime}</span>
                <span className="brm-date"><Calendar size={14} /> {activeArticle.date}</span>
              </div>
              <h2 className="brm-title">{activeArticle.title}</h2>
              <div className="brm-byline">
                <ShieldCheck size={16} className="text-emerald" />
                <span>Written by <b>{activeArticle.author}</b> · GEM Group Official Blog</span>
              </div>
            </div>

            <div className="brm-hero-img">
              <Img src={activeArticle.image} fallback={activeArticle.fallback} alt={activeArticle.title} />
            </div>

            <div className="brm-body">
              {/* Takeaways Callout Box */}
              <div className="brm-takeaways-card">
                <h4>Executive Summary &amp; Key Takeaways</h4>
                <ul>
                  {activeArticle.takeaways.map((point, idx) => (
                    <li key={idx}>
                      <CheckCircle2 size={16} className="text-emerald" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Formatted Sections */}
              <div className="brm-prose">
                {activeArticle.sections.map((sec, idx) => (
                  <div key={idx} className="brm-section">
                    <h3>{sec.heading}</h3>
                    <p>{sec.body}</p>
                  </div>
                ))}
              </div>

              {/* Article Footer Advisory Card */}
              <div className="brm-footer-cta">
                <div>
                  <h4>Interested in verified plotted communities in Telangana?</h4>
                  <p>Speak directly with our senior investment advisors or schedule a free site visit with AC cab pickup.</p>
                </div>
                <div className="brm-cta-btns">
                  <a 
                    href={activeArticle.url}
                    target="_blank"
                    rel="noreferrer"
                    className="btn ghost"
                  >
                    <ExternalLink size={15} /> View on geminfinity.co.in
                  </a>
                  <a 
                    href={`https://wa.me/919989256633?text=${encodeURIComponent(`Hello GEM Group, I am reading "${activeArticle.title}" and would like to learn about available plots and pricing.`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-primary"
                  >
                    <MessageCircle size={16} /> Consult on WhatsApp
                  </a>
                  <button 
                    className="btn ghost"
                    onClick={() => {
                      setActiveArticle(null);
                      setSiteVisitOpen(true);
                    }}
                  >
                    <Car size={16} /> Free Cab Site Visit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Free Site Visit Cab Modal */}
      <SiteVisitModal 
        open={siteVisitOpen} 
        onClose={() => setSiteVisitOpen(false)} 
      />
    </Page>
  );
};

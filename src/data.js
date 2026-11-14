// All copy, figures and image sources are taken from the two live Gem Infinity sites.
const GEM = 'https://www.geminfinity.co.in/wp-content/uploads/';
const SUB = 'https://sreesreenivasacounty.geminfinity.co.in/assets/images/';

export const LINKS = {
  site: 'https://www.geminfinity.co.in',
  blog: 'https://www.geminfinity.co.in/blog/',
  shadnagar: 'https://www.geminfinity.co.in/plots-in-shadnagar',
  rrrMap: 'https://maps.app.goo.gl/KRUAmUkoBVcHJsQF9',
  hmda: 'https://cdn.buildnow.telangana.gov.in/prod/drawing_pdfs/f547e3f4-5e30-4dbd-b7bf-45da39eecb40.pdf',
  email: 'info@geminfinity.co.in',
  support: 'support@geminfinity.co.in',
  phone: '+91 9989 25 6633',
  address: '3rd Floor, G- Square Building, beside Raidurgam police station, Madhura Nagar Colony, Gachibowli, Hyderabad, Telangana 500104',
  hmdaPdf: '/hmda-layout.pdf',
};

export const IMG = {
  gemLogo: GEM + '2025/07/Logo.png',
  balajiLogo: GEM + '2025/08/Sree-Laxmi-Balaji-Logo-Dark.png',
  gate: GEM + '2025/08/Entrance-Gate-1024x808.png',
  groupLogo: SUB + 'sree/gem-group-logo.png',
  countyLogo: SUB + 'sree/RRR-Sree-Sreenivasa-county-logo.png',
  hmdaLogo: SUB + 'sree/hmda_logo.png',
  reraLogo: SUB + 'sree/ts_rera_logo.png',
  stv: SUB + 'sree/png/stv-d.png',
  render: SUB + 'sree/rrr_render.jpg',
  hero: SUB + 'sree/rrr_render.jpg',
  layout: SUB + 'Srinivasa_PLOT_LAYOUT.jpg',
  map: SUB + 'Sree-Sreenivasa-county-map-new.png',
};

export const HOME_NAV = [
  ['Home', '/'],
  ['About Us', '/about'],
  ['Projects', '/projects'],
  ['Gallery', '/gallery'],
  ['Blog', LINKS.blog],
  ['Contact Us', '/contact'],
];

const C = '/sree-sreenivasa-county';
export const COUNTY_NAV = [
  ['About Project', C],
  ['Amenities', C + '/amenities'],
  ['Gallery', C + '/gallery'],
  ['Layout', C + '/layout'],
  ['Location', C + '/location'],
  ['Contact', C + '#contact'],
];

export const AMENITIES = [
  ['Entrance', 'Grand Entrance Gateway', 'A welcoming entrance designed to create a clear identity for the project.', SUB + 'sree/rrr_render.jpg'],
  ['Roads', 'CC Roads', 'Cement concrete roads planned for smooth internal movement.', SUB + 'amenities/cc-roads.jpg'],
  ['Greenery', 'Avenue Plantation', 'Green spaces and avenue plantation for a pleasant project setting.', SUB + 'amenities/greenery.jpg'],
  ['Children’s Area', 'Children’s Play Area', 'A dedicated play area for children and family recreation.', SUB + 'amenities/play_area.jpg'],
  ['Safety', '24x7 CCTV Surveillance', 'CCTV surveillance for added peace of mind.', SUB + 'amenities/safety.jpg'],
  ['Utilities', 'Underground Electrical Lines', 'Electrical lines planned below ground for a clean project environment.', SUB + 'amenities/Electrical_Lines.jpg'],
  ['Water', 'Water & Sewage Tanks', 'Water and sewage tanks planned as part of the project infrastructure.', SUB + 'amenities/water.jpg'],
  ['Drainage', 'Underground Drainage', 'Underground drainage planned as part of the project infrastructure.', SUB + 'amenities/drainage.jpg'],
];

export const GALLERY = [
  ['Entrance', 'Grand Gateway with Project Branding', SUB + 'sree/rrr_render.jpg'],
  ['Architecture', 'A Future-Ready Plotted Community Villa View', SUB + 'sree/png/stv-d.png'],
  ['Gym - Club House', 'Club House in Phase 2', SUB + 'g-1-1200x800.jpg'],
  ['Avenue', 'Wide Roads & Landscaped Walkways', SUB + 'amenities/cc-roads.jpg'],
  ['Parks', 'Open Green Spaces & Serene Living', SUB + 'sreenivasaavenueplantation.jpg'],
  ['Architecture Design', 'Aerial View – Front (Day)', SUB + 'sree/png/dvf-d.png'],
  ['Architecture Design', 'Aerial View – Front (Night)', SUB + 'sree/png/dvf-n.png'],
  ['Architecture Design', 'Aerial View – Rear (Day)', SUB + 'sree/png/dvr-d.png'],
  ['Architecture Design', 'Aerial View – Rear (Night)', SUB + 'sree/png/dvr-n.png'],
  ['Architecture Design', 'Aerial View – Side (Day)', SUB + 'sree/png/dvl-d.png'],
  ['Architecture Design', 'Aerial View – Side (Night)', SUB + 'sree/png/dvl-n.png'],
  ['Architecture Design', 'Street View (Day)', SUB + 'sree/png/stv-d.png'],
  ['Architecture Design', 'Street View (Night)', SUB + 'sree/png/stv-n.png'],
];

export const CONNECT = [
  ['Regional Ring Road Connectivity', 'Key road connectivity'],
  ['5 Mins to Rajapur / Polepally SEZ', 'Nearby destination'],
  ['6 Mins to NIMS University', 'Nearby destination'],
  ['30 Mins to RGI Airport, Shamshabad', 'Airport connectivity'],
  ['15 Mins to Delhi Public School', 'Nearby destination'],
  ['25 Mins to Symbiosis International University', 'Nearby destination'],
];

export const TLP = 'TLP: 018631/HMDA/04590/SWDL/SKP1/2026';

export const HOME_FOOTER = [
  ['About Us', '/about'],
  ['Projects', '/projects'],
  ['Gallery', '/gallery'],
  ['Blog', 'https://www.geminfinity.co.in/blog/'],
  ['Site Visit', 'https://www.geminfinity.co.in/site-visit/'],
];
// The live site shows these four icons without destinations. Add the profile URLs here.
export const SOCIAL = [['Facebook', 'f', '#'], ['Twitter', '\u{1D54F}', '#'], ['Tumblr', 't', '#'], ['Instagram', '\u25CE', '#']];

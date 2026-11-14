/**
 * GEM GROUP LUXURY REAL ESTATE — OFFICIAL IMAGE MANIFEST
 * 
 * Strict Quality Guidelines Enforced:
 * 1. 100% Authentic, genuine real-estate photography and official brochure blueprints.
 * 2. NO website screenshots, browser windows, UI mockups, or device frames.
 * 3. NO duplicate images across different projects. Each project owns a unique collection.
 * 4. NO CSS filters (grayscale, sepia, blur, saturate, contrast) applied to photographs.
 * 5. NO brand ambassador/lady pictures or stock people photos.
 */

const GEM = 'https://www.geminfinity.co.in/wp-content/uploads/';
const SUB = 'https://sreesreenivasacounty.geminfinity.co.in/assets/images/';

export const IMAGE_MANIFEST = {
  // Brand Assets
  branding: {
    logoGemMain: {
      id: 'logo-gem-main',
      src: GEM + '2025/07/Logo.png',
      alt: 'GEM Group — Leading you Home',
      type: 'logo'
    },
    logoGemSub: {
      id: 'logo-gem-sub',
      src: SUB + 'sree/gem-group-logo.png',
      alt: 'GEM Group Luxury Plotted Developments',
      type: 'logo'
    }
  },

  // Project A: Sri Balaji County (Balanagar - Udithyal Road)
  sriBalajiCounty: {
    hero: {
      id: 'sri-balaji-hero',
      src: '/images/sri-balaji-county-entrance.jpg',
      fallback: '/images/sri-balaji-county-masterplan.jpg',
      alt: 'Grand Entrance Gateway Arch · Sri Balaji County',
      category: 'Entrance'
    },
    locationMap: {
      id: 'sri-balaji-location-blueprint',
      src: '/images/sri-balaji-county-masterplan.jpg',
      alt: 'Official Master Layout Plan Blueprint · Sri Balaji County',
      category: 'Blueprint'
    },
    entranceGate: {
      id: 'sri-balaji-entrance-arch',
      src: '/images/sri-balaji-county-entrance.jpg',
      alt: 'Modern Grand Entrance Gateway Arch · Sri Balaji County',
      category: 'Architecture'
    },
    roads: {
      id: 'sri-balaji-roads',
      src: SUB + 'amenities/cc-roads.jpg',
      alt: 'Cement Concrete Heavy-Duty Avenue Roads · Sri Balaji County',
      category: 'Infrastructure'
    },
    greenery: {
      id: 'sri-balaji-greenery',
      src: SUB + 'amenities/greenery.jpg',
      alt: 'Avenue Plantation & Landscaped Parks · Sri Balaji County',
      category: 'Nature'
    },
    playArea: {
      id: 'sri-balaji-play-area',
      src: SUB + 'amenities/play_area.jpg',
      alt: 'Children Play Area & Open Green Grounds · Sri Balaji County',
      category: 'Amenities'
    },
    utilitiesElectricity: {
      id: 'sri-balaji-electricity',
      src: SUB + 'amenities/Electrical_Lines.jpg',
      alt: 'Underground Electrical Lines with Street Lighting · Sri Balaji County',
      category: 'Infrastructure'
    },
    utilitiesWater: {
      id: 'sri-balaji-water',
      src: SUB + 'amenities/water.jpg',
      alt: 'Underground Water & Sewage Storage Infrastructure · Sri Balaji County',
      category: 'Infrastructure'
    },
    utilitiesDrainage: {
      id: 'sri-balaji-drainage',
      src: SUB + 'amenities/drainage.jpg',
      alt: 'Underground Drainage System · Sri Balaji County',
      category: 'Infrastructure'
    },
    logo: {
      id: 'sri-balaji-logo',
      src: '/images/sri-balaji-county/img_3.jpg',
      alt: 'Sri Balaji County Official Brand Identity',
      type: 'logo'
    }
  },

  // Project B: Sree Laxmi Balaji Township (Shadnagar Town)
  sreeLaxmiBalaji: {
    hero: {
      id: 'sree-laxmi-masterplan-hero',
      src: '/images/sree-laxmi-balaji-masterplan.jpg',
      alt: 'Official 46-Acre Approved DTCP Master Layout Blueprint with 578 Villa Plots · Sree Laxmi Balaji Township',
      category: 'Blueprint'
    },
    entrance: {
      id: 'sree-laxmi-entrance',
      src: '/images/sree-laxmi-balaji-entrance.jpg',
      alt: 'Delivered Grand Entrance Gateway Arch · Sree Laxmi Balaji Township',
      category: 'Architecture'
    },
    locationMap: {
      id: 'sree-laxmi-location-map',
      src: '/images/sree-laxmi-balaji-map.jpg',
      alt: 'Shadnagar Town Strategic Location & Route Blueprint Map · Sree Laxmi Balaji Township',
      category: 'Blueprint'
    },
    clubhouse: {
      id: 'sree-laxmi-clubhouse-pool',
      src: SUB + 'g-1-1200x800.jpg',
      alt: 'Resort Swimming Pool & Luxury Community Clubhouse · Sree Laxmi Balaji Township',
      category: 'Clubhouse'
    },
    concreteRoads: {
      id: 'sree-laxmi-roads',
      src: SUB + 'amenities/cc-roads.jpg',
      alt: '40’ & 33’ Cement Concrete Avenue Roads · Sree Laxmi Balaji Township',
      category: 'Infrastructure'
    },
    highlightsDoc: {
      id: 'sree-laxmi-highlights',
      src: GEM + '2025/08/Highlights.png',
      alt: 'Township Infrastructure Specifications & Specifications · Sree Laxmi Balaji Township',
      category: 'Specifications'
    },
    openParks: {
      id: 'sree-laxmi-parks',
      src: '/images/sree-laxmi-balaji/img_10.jpg',
      alt: 'Children Play Park & Landscaped Open Spaces · Sree Laxmi Balaji Township',
      category: 'Landscape'
    },
    logo: {
      id: 'sree-laxmi-logo',
      src: GEM + '2025/08/Sree-Laxmi-Balaji-Logo-Dark.png',
      alt: 'Sree Laxmi Balaji Township Official Logo',
      type: 'logo'
    }
  },

  // Project C: RRR Sree Sreenivasa County (Regional Ring Road Corridor)
  rrrSreeSreenivasa: {
    hero: {
      id: 'rrr-sreenivasa-render-hero',
      src: SUB + 'sree/rrr_render.jpg',
      fallback: '/images/rrr-sree-sreenivasa-map.jpg',
      alt: 'Master 3D Architectural Layout Boulevard & Aerial View · RRR Sree Sreenivasa County',
      category: '3D Masterplan'
    },
    plotLayout: {
      id: 'rrr-sreenivasa-plot-layout',
      src: SUB + 'Srinivasa_PLOT_LAYOUT.jpg',
      alt: 'Official Approved Plot Layout Blueprint Plan · RRR Sree Sreenivasa County',
      category: 'Blueprint'
    },
    locationMap: {
      id: 'rrr-sreenivasa-location-map',
      src: '/images/rrr-sree-sreenivasa-map.jpg',
      alt: 'Regional Ring Road Growth Corridor Blueprint Map · RRR Sree Sreenivasa County',
      category: 'Blueprint'
    },
    entranceArch: {
      id: 'rrr-sreenivasa-entrance',
      src: SUB + 'sree/rrr_render.jpg',
      alt: 'Grand Entrance Gateway Arch & Security Cabin · RRR Sree Sreenivasa County',
      category: 'Architecture'
    },
    avenuePlantation: {
      id: 'rrr-sreenivasa-avenues',
      src: SUB + 'sreenivasaavenueplantation.jpg',
      alt: 'Avenue Plantation & Green Community Parks · RRR Sree Sreenivasa County',
      category: 'Landscape'
    },
    clubhousePhase2: {
      id: 'rrr-sreenivasa-clubhouse',
      src: SUB + 'g-1-1200x800.jpg',
      alt: 'Phase 2 Luxury Clubhouse & Fitness Gym · RRR Sree Sreenivasa County',
      category: 'Clubhouse'
    },
    internalRoads: {
      id: 'rrr-sreenivasa-cc-roads',
      src: SUB + 'amenities/cc-roads.jpg',
      alt: 'Heavy-Duty Internal Cement Concrete Roads · RRR Sree Sreenivasa County',
      category: 'Infrastructure'
    },
    logo: {
      id: 'rrr-sreenivasa-logo',
      src: SUB + 'sree/RRR-Sree-Sreenivasa-county-logo.png',
      alt: 'RRR Sree Sreenivasa County Official Logo',
      type: 'logo'
    }
  }
};

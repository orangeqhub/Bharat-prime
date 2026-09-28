/* =========================================================================
 * DEFAULT WEBSITE CONTENT — single source of truth for Bharat Prime Enterprises
 * Content is sourced from the official business presentation.
 * Overrides made in the Admin CMS are persisted on top of this object.
 * ========================================================================= */

const A = '/assets';

export const defaultContent = {
  site: {
    companyName: 'BHARAT PRIME ENTERPRISES',
    shortName: 'Bharat Prime',
    logo: {
      image: '/assets/logo.png.png',
    },
    tagline: 'We Buy Scrap • We Sell Steel • We Fabricate Metal.',
    phoneNumbers: ['+91 76608 67114', '+91 80994 21176'],
    email: 'bharatprime114@gmail.com',
    location: 'Guntur, Andhra Pradesh',
    whatsappNumber: '+917660867114',
    mapsUrl: 'https://maps.google.com/?q=Guntur,+Andhra+Pradesh',
    mapsEmbedUrl:
      'https://maps.google.com/maps?q=Guntur%2C%20Andhra%20Pradesh&t=&z=12&ie=UTF8&iwloc=&output=embed',
    footerText:
      'Make Scrap the Foundation, Steel the Trading Engine, and Fabrication the Value Addition.',
    social: {
      facebook: '',
      instagram: '',
      linkedin: '',
      whatsapp: 'https://wa.me/917660867114',
    },
    adminUser: {
      username: 'admin',
      password: 'admin123',
    },
  },

  cta: {
    sellScrap: 'Sell Your Scrap',
    services: 'Explore Our Services',
    callUs: 'Call Us',
    enquireSteel: 'Enquire About Steel',
    requestFabrication: 'Request Fabrication',
  },

  hero: {
    eyebrow: 'Guntur, Andhra Pradesh',
    headingLines: ['WE BUY SCRAP.', 'WE SELL STEEL.', 'WE FABRICATE METAL.'],
    subtitle:
      'Your Trusted Partner for Scrap Trading, Steel Trading and Custom Metal Fabrication.',
    image: `${A}/ferrous-scrap.jpg`,
    imageAlt: 'Scrap metal and steel materials handled by Bharat Prime Enterprises',
    badgeImage: `${A}/brand-card-front.jpg`,
    badgeAlt: 'Bharat Prime Enterprises business card',
  },

  about: {
    eyebrow: 'Who We Are',
    heading: 'About Bharat Prime Enterprises',
    story:
      'Bharat Prime Enterprises is a complete metal business based in Guntur, Andhra Pradesh. We are building a business where every customer can handle every metal need under one roof.',
    missionIntro: 'To build Bharat Prime Enterprises into a complete metal business where customers can:',
    list: [
      'Sell their scrap',
      'Buy iron and steel materials',
      'Order grills and gates',
      'Get fabrication work done',
      'Grow with us',
    ],
    highlight: 'One Trusted Business for Multiple Metal Needs',
    heroImage: `${A}/about-2.jpg`,
    heroImageAlt: 'Bharat Prime Enterprises workspace in Guntur',
    image: `${A}/about-1.jpg`,
    imageAlt: 'Metal materials at Bharat Prime Enterprises yard in Guntur',
    imageCard: `${A}/about-3.jpg`,
    imageCardAlt: 'Bharat Prime Enterprises team and operations',
    stats: [
      { value: 3, suffix: '', label: 'Core Business Divisions' },
      { value: 6, suffix: '', label: 'Fabrication Services' },
      { value: 120, suffix: '+', label: 'Customers Target (First 90 Days)' },
      { value: 4, suffix: '', label: 'Non-Ferrous Materials' },
    ],
  },

  divisions: {
    eyebrow: 'What We Do',
    heading: 'Core Business Divisions',
    subheading:
      'Three connected divisions, one complete metal business — your scrap, our steel, and fabrication that finishes the job.',
    items: [
      {
        id: 'scrap-trading',
        title: 'Scrap Trading',
        icon: 'recycle',
        image: `${A}/scrap-portrait.jpg`,
        imageAlt: 'Scrap collection and sorting at Bharat Prime Enterprises',
        description:
          'Responsible collection, smart sorting and valuable recovery of ferrous, non-ferrous and recyclable materials.',
        exploreLabel: 'Explore Scrap Trading',
        route: '/scrap',
      },
      {
        id: 'steel-trading',
        title: 'Iron & Steel Trading',
        icon: 'coil',
        image: `${A}/steel-trading.jpg`,
        imageAlt: 'Iron and steel rods and pipes sold by Bharat Prime Enterprises',
        description:
          'We buy scrap — we also sell steel. MS / TMT rods, pipes, angles, flats, channels and MS sheets.',
        exploreLabel: 'Explore Steel Trading',
        route: '/steel-trading',
      },
      {
        id: 'fabrication',
        title: 'Grills & Metal Fabrication',
        icon: 'wrench',
        image: `${A}/fabrication.jpg`,
        imageAlt: 'Custom metal fabrication and grill work by Bharat Prime Enterprises',
        description:
          'Window and balcony grills, gates, stair railings, sheds and small industrial works — made to measure.',
        exploreLabel: 'Explore Fabrication',
        route: '/fabrication',
      },
    ],
  },

  scrap: {
    eyebrow: 'Scrap Business',
    heading: 'SCRAP TRADING',
    subheading: 'Responsible Collection. Smart Sorting. Valuable Recovery.',
    intro:
      'Bharat Prime Enterprises handles scrap across three divisions — every material collected, sorted and recovered for further use.',
    divisions: [
      {
        id: 'ferrous',
        title: 'Ferrous Scrap',
        icon: 'layers',
        image: `${A}/ferrous-scrap.jpg`,
        imageAlt: 'Ferrous scrap — iron, MS and structural steel scrap materials',
        secondaryImage: `${A}/ferrous-2.jpg`,
        secondaryImageAlt: 'Sorted ferrous scrap materials ready for trading and recycling',
        description:
          'Ferrous scrap forms an important part of the business. It includes MS scrap, heavy iron, cast iron, machinery and structural steel scrap. These materials are collected from industrial and commercial sources and can be recovered for further use.',
        materials: [
          'Iron Scrap',
          'MS Scrap',
          'Cast Iron',
          'Machinery Scrap',
          'Motor Scrap',
          'Structural Steel Scrap',
        ],
        process: ['Collect', 'Sort', 'Trade', 'Recycle'],
      },
      {
        id: 'non-ferrous',
        title: 'Non-Ferrous Scrap',
        icon: 'sparkles',
        image: `${A}/non-ferrous.jpg`,
        imageAlt: 'Non-ferrous scrap — aluminium, copper, brass and stainless steel',
        secondaryImage: `${A}/non-ferrous-2.jpg`,
        secondaryImageAlt: 'Separated non-ferrous metals ready for recycling',
        description:
          'Along with ferrous materials, Bharat Prime Enterprises also handles valuable non-ferrous materials such as aluminium, copper, brass and stainless steel. These materials form another important division of the scrap business.',
        materials: ['Aluminium', 'Copper', 'Brass', 'Stainless Steel'],
        highlights: [
          'Valuable recyclable materials',
          'Used across industries',
          'Supports material recovery',
          'Creates additional business opportunities',
        ],
      },
      {
        id: 'others',
        title: 'Other Recyclable Materials',
        icon: 'package',
        image: `${A}/recyclables.jpg`,
        imageAlt: 'Other recyclable materials — PET bottles, plastic, paper and e-waste',
        secondaryImage: `${A}/about-1.jpg`,
        secondaryImageAlt:
          'Sorted recyclable materials collected at the Bharat Prime Enterprises yard',
        description:
          'Apart from metal scrap, the business also includes other recyclable materials such as PET bottles, plastic, paper and e-waste. These materials are important because proper collection and recycling can help reduce unnecessary waste.',
        materials: ['PET Bottles', 'Plastic', 'Paper', 'E-Waste'],
        focus: 'Collection → Sorting → Responsible Recycling',
      },
    ],
  },

  whyRecycling: {
    eyebrow: 'Environment',
    heading: 'WHY RECYCLING IS IMPORTANT?',
    intro:
      'Improper waste disposal can cause serious damage. Here is what can happen when waste is not handled responsibly:',
    pollution: [
      {
        title: 'Air Pollution',
        icon: 'wind',
        image: `${A}/pollution-1.jpg`,
        imageAlt: 'Industrial air pollution caused by improper waste handling',
      },
      {
        title: 'Water Pollution',
        icon: 'droplets',
        image: `${A}/pollution-2.jpg`,
        imageAlt: 'Water contamination caused by unmanaged waste',
      },
      {
        title: 'Land & Soil Pollution',
        icon: 'mountain',
        image: `${A}/pollution-2.jpg`,
        imageAlt: 'Land and soil degradation from unmanaged waste dumping',
      },
      {
        title: 'Damage to Ecosystems',
        icon: 'leaf',
        image: `${A}/mining-vs-recycling.jpg`,
        imageAlt: 'Natural resources damaged by mining and unchecked waste',
      },
      {
        title: 'Environmental Damage',
        icon: 'globe',
        image: `${A}/mining-vs-recycling.jpg`,
        imageAlt: 'Environmental harm caused by extracting and discarding resources',
      },
      {
        title: 'Contamination of Land and Water',
        icon: 'alert',
        image: `${A}/pollution-2.jpg`,
        imageAlt: 'Contaminated land and water near unmanaged waste',
      },
      {
        title: 'Increasing Waste Accumulation',
        icon: 'trash',
        image: `${A}/recyclables.jpg`,
        imageAlt: 'Piles of recyclable waste waiting to be collected and processed',
      },
      {
        title: 'Loss of Reusable Materials',
        icon: 'recycle',
        image: `${A}/ferrous-scrap.jpg`,
        imageAlt: 'Reusable metal materials lost when waste is not recycled',
      },
      {
        title: 'Harm to Natural Ecosystems',
        icon: 'trees',
        image: `${A}/non-ferrous.jpg`,
        imageAlt: 'Valuable non-ferrous materials lost to unmanaged waste',
      },
    ],
    pollutionImages: [
      {
        image: `${A}/pollution-1.jpg`,
        imageAlt: 'Industrial air pollution caused by improper waste handling',
      },
      {
        image: `${A}/pollution-2.jpg`,
        imageAlt: 'Polluted land and water affected by unmanaged waste',
      },
    ],
    statement: 'RECYCLE TODAY FOR A BETTER TOMORROW',
    image: `${A}/recyclables.jpg`,
    imageAlt: 'Recyclable materials — plastic, bottles, paper and e-waste — collected for responsible recycling',
  },

  steel: {
    eyebrow: 'Iron & Steel Trading',
    heading: 'WE BUY SCRAP — WE ALSO SELL STEEL',
    subheading: 'Iron & Steel Trading',
    intro:
      'From the scrap we collect and process, we also trade the steel materials our customers need every day.',
    products: [
      {
        title: 'MS / TMT Rods',
        icon: 'bars',
        image: `${A}/steel-trading.jpg`,
        imageAlt: 'MS and TMT steel rods supplied by Bharat Prime Enterprises',
      },
      {
        title: 'Square & Rectangular Pipes',
        icon: 'square',
        image: `${A}/ferrous-2.jpg`,
        imageAlt: 'Sorted steel sections and pipes ready for supply',
      },
      {
        title: 'MS Angles & Flats',
        icon: 'angle',
        image: `${A}/about-1.jpg`,
        imageAlt: 'MS angles and flats at the Bharat Prime Enterprises yard',
      },
      {
        title: 'Channels & MS Sheets',
        icon: 'sheet',
        image: `${A}/ferrous-scrap.jpg`,
        imageAlt: 'Channels and MS sheets sourced and traded by Bharat Prime Enterprises',
      },
    ],
    strategy:
      'Focus on fast-moving products and buy according to customer requirements.',
    image: `${A}/steel-trading.jpg`,
    imageAlt: 'Steel rods, pipes and structural steel traded by Bharat Prime Enterprises',
  },

  fabrication: {
    eyebrow: 'Grills & Fabrication',
    heading: 'CUSTOM METAL FABRICATION',
    subheading: 'Grills, Gates, Railings & More — Built to Measure.',
    intro:
      'Custom metal fabrication for homes, businesses and industrial spaces — designed, welded and installed by our team.',
    products: [
      {
        title: 'Window & Balcony Grills',
        icon: 'grid',
        image: `${A}/fabrication.jpg`,
        imageAlt: 'Custom window and balcony grill work fabricated by Bharat Prime Enterprises',
      },
      {
        title: 'Main & Compound Gates',
        icon: 'gate',
        image: `${A}/about-1.jpg`,
        imageAlt: 'Metal gates and frames prepared at the Bharat Prime Enterprises yard',
      },
      {
        title: 'Staircase Railings',
        icon: 'stairs',
        image: `${A}/about-3.jpg`,
        imageAlt: 'Staircase railing fabrication by the Bharat Prime Enterprises team',
      },
      {
        title: 'Safety Grills',
        icon: 'shield',
        image: `${A}/scrap-portrait.jpg`,
        imageAlt: 'Safety grill sections stacked ready for installation',
      },
      {
        title: 'Shed Fabrication',
        icon: 'shed',
        image: `${A}/companies.jpg`,
        imageAlt: 'Industrial premises where shed fabrication work is carried out',
      },
      {
        title: 'Small Industrial Works',
        icon: 'factory',
        image: `${A}/companies-2.jpg`,
        imageAlt: 'Small industrial fabrication work handled by Bharat Prime Enterprises',
      },
    ],
    workflow: [
      'Enquiry',
      'Measurement',
      'Quotation',
      '50% Advance',
      'Fabrication',
      'Installation',
    ],
    image: `${A}/fabrication.jpg`,
    imageAlt: 'Custom metal fabrication and grill work by Bharat Prime Enterprises',
  },

  miningVsRecycling: {
    eyebrow: 'Education',
    heading: 'MINING VS RECYCLING',
    statement: 'Mining takes resources from nature. Recycling gives resources a second life.',
    mining: {
      title: 'Mining',
      points: [
        'Extracts new natural resources',
        'Requires more energy and land',
        'Can increase environmental pollution',
      ],
    },
    recycling: {
      title: 'Recycling',
      points: [
        'Reuses existing materials',
        'Saves natural resources',
        'Reduces waste and pollution',
      ],
    },
    global: {
      title: 'Global Material Use',
      rows: [
        { label: 'Virgin / New Materials', value: '93.1%', note: '' },
        { label: 'Recycled / Secondary Materials', value: '6.9%', note: '' },
      ],
      caption: 'Most of the materials used in the world are still virgin materials.',
    },
    india: {
      title: 'India',
      rows: [
        {
          label: 'Mining & Quarrying',
          value: '~2% of India\'s GVA',
          note: '',
        },
        {
          label: 'Recycling',
          value: 'Growing rapidly',
          note: 'Across metals, plastic, paper and e-waste.',
        },
      ],
    },
    image: `${A}/mining-vs-recycling.jpg`,
    imageAlt: 'Comparison of mining natural resources versus recycling materials',
  },

  companies: {
    eyebrow: 'B2B Scrap Purchase',
    heading: 'WE BUY SCRAP FROM COMPANIES',
    subheading: 'Turn Your Industrial Scrap Into Value',
    intro: 'At Bharat Prime Enterprises, we purchase scrap materials from:',
    sources: [
      'Industries & Factories',
      'Workshops & Fabrication Units',
      'Construction Companies',
      'Commercial Establishments',
      'Demolition Contractors',
    ],
    materials:
      'Iron Scrap • MS Scrap • Machinery Scrap • Aluminium • Copper • Brass • Stainless Steel • Plastic • PET Bottles • Paper & E-Waste',
    process: ['Company Scrap', 'Collection', 'Sorting', 'Recycling / Trading'],
    mainStatement: 'Your Scrap Has Value — We Buy It.',
    image: `${A}/companies.jpg`,
    imageAlt: 'Industrial scrap collected by Bharat Prime Enterprises from companies',
  },

  businessCycle: {
    eyebrow: 'Business Growth Strategy',
    heading: 'ONE CUSTOMER — MULTIPLE BUSINESS OPPORTUNITIES',
    intro:
      'The Bharat Prime business cycle — every customer grows with us, again and again.',
    steps: [
      { id: 'scrap', label: 'SCRAP CUSTOMER' },
      { id: 'steel', label: 'STEEL CUSTOMER' },
      { id: 'fabrication', label: 'FABRICATION CUSTOMER' },
      { id: 'again', label: 'SCRAP CUSTOMER AGAIN' },
    ],
    image: `${A}/brand-card-back.png`,
  },

  growthPlan: {
    eyebrow: 'Business Roadmap',
    heading: 'OUR FIRST 90 DAYS',
    intro:
      'A focused three-phase plan for building the business with real customer connections.',
    phases: [
      {
        id: 'p1',
        days: 'DAY 1–30',
        title: 'Customer Development',
        icon: 'users',
        points: [
          'Meet 120+ potential customers',
          'Understand demand',
          'Build customer connections',
        ],
      },
      {
        id: 'p2',
        days: 'DAY 31–60',
        title: 'Business Expansion',
        icon: 'trending',
        points: [
          'Increase steel quotations',
          'Focus on pipe sales',
          'Develop grill and gate orders',
        ],
      },
      {
        id: 'p3',
        days: 'DAY 61–90',
        title: 'Performance Analysis',
        icon: 'chart',
        points: [
          'Identify top 5 profitable products',
          'Identify top 10 loyal customers',
        ],
      },
    ],
    image: `${A}/companies-2.jpg`,
  },

  contact: {
    eyebrow: 'Get In Touch',
    heading: 'Get In Touch',
    subheading:
      'Whether you want to sell scrap, buy steel or order fabrication work — talk to us.',
    image: `${A}/contact-1.jpg`,
    imageAlt: 'Bharat Prime Enterprises team ready to take your enquiry in Guntur',
    formLabels: {
      name: 'Name *',
      phone: 'Phone *',
      company: 'Company',
      requirementType: 'Requirement Type',
      material: 'Material / Service',
      message: 'Message',
      submit: 'Send Enquiry',
      submitted: 'Thank you!',
      submittedNote:
        'Your enquiry has been received. Bharat Prime Enterprises will get back to you shortly.',
    },
  },
};

/* CMS statistics derived from the content structure */
export const siteSections = [
  'Hero',
  'About',
  'Core Business Divisions',
  'Scrap Trading',
  'Why Recycling',
  'Iron & Steel Trading',
  'Grills & Fabrication',
  'Mining vs Recycling',
  'We Buy Scrap from Companies',
  'Business Cycle',
  '90-Day Growth Plan',
  'Contact',
];

export const serviceCount = () => defaultContent.fabrication.products.length;

export default defaultContent;
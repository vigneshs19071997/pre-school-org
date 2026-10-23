import type { Brand } from '../schema';

/**
 * Real school onboarding in progress. Name, address, city/state/postal code
 * and phone/WhatsApp below are confirmed. Everything marked PLACEHOLDER is a
 * generic value chosen only so the schema validates - replace before launch.
 */
const brand: Brand = {
  slug: 'v-pre-school',

  identity: {
    name: 'V Pre School & Play School',
    // PLACEHOLDER - confirm the registered legal entity name.
    legalName: 'V Pre School & Play School',
    // PLACEHOLDER - replace with the school's actual tagline.
    tagline: 'A joyful place to learn and play',
    description:
      'A preschool and play school in Thenkiranur, Kallakurichi, Tamil Nadu for young children.',
    // PLACEHOLDER - confirm the year the school was established.
    establishedYear: 2025,
  },

  assets: {
    // PLACEHOLDER - swap in the real logo/mark/social share image.
    logo: '/tenants/v-pre-school/logo.svg',
    mark: '/tenants/v-pre-school/mark.svg',
    ogImage: '/tenants/v-pre-school/og.png',
    heroImages: [
      '/tenants/little-stars/16.jpg',
      '/tenants/little-stars/pre-school-2.jpeg',
      '/tenants/little-stars/pre-school-1.jpg',
      '/tenants/little-stars/pre-school-3.png',
      '/tenants/little-stars/pre-school-4.jpg',
      '/tenants/little-stars/pre-school-5.jpg',
      '/tenants/little-stars/pre-school-7.jpeg',
    ],
  },

  theme: {
    // PLACEHOLDER - pick colours that match the school's real branding.
    primary: '#1D6FA5',
    primaryDark: '#154F78',
    accent: '#F2A83B',
    accentAlt: '#5FB57B',
    ink: '#1B2530',
    inkSoft: '#59677A',
    paper: '#FDFEFF',
    surface: '#EEF4F9',
    displayFont: 'quicksand',
    radius: 20,
  },

  contact: {
    phone: '+91 78451 72311',
    whatsapp: '+917845172311',
    // PLACEHOLDER - confirm the school's real contact email.
    email: 'hello@vpreschool.example',
    addressLines: [
      '12C/A3/3A, Yamuna Street',
      'Behind Siva Sakthi Gas Agency, Rajambal Nagar',
      'Anna Nagar, Thenkiranur',
    ],
    city: 'Kallakurichi',
    state: 'Tamil Nadu',
    postalCode: '606202',
    country: 'IN',
    // PLACEHOLDER - approximate coordinates for Kallakurichi town centre.
    // Replace with the exact pin from the school's Google Maps listing.
    geo: { lat: 11.7382, lng: 78.9601 },
    // PLACEHOLDER - confirm real opening hours.
    openingHours: 'Mon-Fri 9:00am - 4:00pm',
  },

  social: {},

  // PLACEHOLDER - confirm the age groups/programs this school actually runs.
  programs: [
    {
      slug: 'playgroup',
      name: 'Playgroup',
      ageRange: '2 - 3 years',
      hours: '9:00am - 11:30am',
      summary: 'A gentle first step into school, built around play.',
      tone: 'accent',
    },
    {
      slug: 'nursery',
      name: 'Nursery',
      ageRange: '3 - 4 years',
      hours: '9:00am - 12:30pm',
      summary: 'Early friendships and first stories.',
      tone: 'primary',
    },
    {
      slug: 'lkg',
      name: 'LKG',
      ageRange: '4 - 5 years',
      hours: '8:45am - 1:00pm',
      summary: 'Letters and numbers introduced through games.',
      tone: 'accentAlt',
    },
    {
      slug: 'ukg',
      name: 'UKG',
      ageRange: '5 - 6 years',
      hours: '8:45am - 1:30pm',
      summary: 'Reading, early writing, and getting ready for big school.',
      tone: 'primary',
    },
  ],

  // PLACEHOLDER - confirm the school's actual daily schedule.
  daySchedule: [
    { time: '9:00', label: 'Arrival', detail: 'Welcome circle and morning song' },
    { time: '10:00', label: 'Learning time', detail: 'Activities and structured play' },
    { time: '11:30', label: 'Snack', detail: 'Children eat together' },
    { time: '12:30', label: 'Home time', detail: 'Handover to parents' },
  ],

  // PLACEHOLDER - replace with real numbers before launch.
  proofPoints: [
    { value: 1, suffix: ':1', label: 'Personal attention' },
    { value: 1, suffix: '+', label: 'Years serving Kallakurichi' },
  ],

  // PLACEHOLDER - confirm which features this school actually offers.
  features: {
    parentPortal: false,
    kidsZone: true,
    onlineFees: false,
    blog: false,
    transport: false,
  },

  legal: {
    // PLACEHOLDER - confirm affiliation and registration details.
    affiliation: 'Independent preschool',
    privacyContactEmail: 'hello@vpreschool.example',
  },

  integrations: {},
};

export default brand;

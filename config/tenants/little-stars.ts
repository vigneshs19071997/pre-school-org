import type { Brand } from '../schema';

const brand: Brand = {
  slug: 'little-stars',

  identity: {
    name: 'Little Stars Preschool',
    legalName: 'Little Stars Early Learning Pvt Ltd',
    tagline: 'Where the day starts with a song',
    description:
      'A play-based preschool in Adyar, Chennai for children aged 2 to 6, with small groups and open classrooms.',
    establishedYear: 2014,
  },

  assets: {
    logo: '/tenants/little-stars/logo.svg',
    mark: '/tenants/little-stars/mark.svg',
    ogImage: '/tenants/little-stars/og.png',
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
    primary: '#22305C',
    primaryDark: '#141D38',
    accent: '#FFC233',
    accentAlt: '#FF8A75',
    accentGreen: '#5FBF77',
    accentPurple: '#B49CE3',
    ink: '#1E2A44',
    inkSoft: '#5B6B85',
    paper: '#FFFBF2',
    surface: '#FFF6E8',
    displayFont: 'fredoka',
    radius: 24,
  },

  contact: {
    phone: '+91 44 4210 8800',
    whatsapp: '+919597524553',
    email: 'hello@littlestars.example',
    addressLines: ['3rd Cross Street, Kasturba Nagar', 'Adyar'],
    city: 'Chennai',
    state: 'Tamil Nadu',
    postalCode: '600020',
    country: 'IN',
    geo: { lat: 13.0067, lng: 80.2567 },
    openingHours: 'Mon-Fri 8:00am - 4:00pm',
  },

  social: {
    instagram: 'https://instagram.com/littlestars',
  },

  programs: [
    {
      slug: 'early-childhood',
      name: 'Early Childhood',
      ageRange: '2 - 3 years',
      hours: '9:00am - 11:30am',
      summary: 'Half days built around sand, water, music and one adult for every five children.',
      tone: 'accentAlt',
      illustration: '/tenants/little-stars/programs/early-childhood.png',
    },
    {
      slug: 'nursery',
      name: 'Nursery',
      ageRange: '3 - 4 years',
      hours: '9:00am - 12:30pm',
      summary: 'First friendships, first stories, and learning to pour your own water.',
      tone: 'accent',
      illustration: '/tenants/little-stars/programs/nursery.png',
    },
    {
      slug: 'junior-kg',
      name: 'Junior KG',
      ageRange: '4 - 5 years',
      hours: '8:45am - 1:00pm',
      summary: 'Letters and numbers arrive through games, not worksheets.',
      tone: 'accentGreen',
      illustration: '/tenants/little-stars/programs/junior-kg.png',
    },
    {
      slug: 'senior-kg',
      name: 'Senior KG',
      ageRange: '5 - 6 years',
      hours: '8:45am - 1:30pm',
      summary: 'Reading, early writing, and the confidence to walk into big school.',
      tone: 'accentPurple',
      illustration: '/tenants/little-stars/programs/senior-kg.png',
    },
  ],

  daySchedule: [
    { time: '8:45', label: 'Arrival circle', detail: 'Name song, weather chart, who is here today' },
    { time: '9:30', label: 'Free choice', detail: 'Blocks, water table, dress-up, art corner' },
    { time: '10:30', label: 'Snack together', detail: 'Children serve themselves and clear their own plates' },
    { time: '11:00', label: 'Outdoor play', detail: 'Garden, sandpit, climbing frame, running' },
    { time: '12:00', label: 'Story and rest', detail: 'Lights low, one book, quiet mats' },
    { time: '1:00', label: 'Home time', detail: 'Handover to parents with the day card' },
  ],

  proofPoints: [
    { value: 6, suffix: ':1', label: 'Children per teacher' },
    { value: 11, suffix: ' yrs', label: 'Open in Adyar' },
    { value: 240, suffix: '+', label: 'Families so far' },
    { value: 100, suffix: '%', label: 'Rooms with CCTV' },
  ],

  features: {
    parentPortal: true,
    kidsZone: true,
    onlineFees: true,
    blog: false,
    transport: true,
  },

  legal: {
    affiliation: 'Play-way curriculum, independent',
    registrationNumber: 'U80101TN2014PTC000000',
    privacyContactEmail: 'privacy@littlestars.example',
  },

  integrations: {},
};

export default brand;

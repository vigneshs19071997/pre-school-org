import type { Brand } from '../schema';

/**
 * Second tenant. Exists to prove the white-label layer actually works.
 *
 * Run `TENANT_SLUG=sunshine-sprouts npm run dev` and the entire site
 * re-themes: colours, fonts, copy, programs, schedule, and which
 * features are switched on. Not one component file changes.
 *
 * Note this school bought a smaller package - no parent portal,
 * no online fees - so those routes 404 and the nav links disappear.
 */
const brand: Brand = {
  slug: 'sunshine-sprouts',

  identity: {
    name: 'Sunshine Sprouts',
    legalName: 'Sunshine Sprouts Learning LLP',
    tagline: 'Small hands, big mornings',
    description:
      'A Montessori-inspired preschool in Koramangala, Bengaluru for children aged 18 months to 5 years.',
    establishedYear: 2019,
  },

  assets: {
    logo: '/tenants/sunshine-sprouts/logo.svg',
    mark: '/tenants/sunshine-sprouts/mark.svg',
    ogImage: '/tenants/sunshine-sprouts/og.png',
  },

  theme: {
    primary: '#6D4AC4',
    primaryDark: '#4F3494',
    accent: '#3FB6E8',
    accentAlt: '#FF7A5C',
    ink: '#2A2140',
    inkSoft: '#6E668A',
    paper: '#FDFBFF',
    surface: '#F3EFFB',
    displayFont: 'fredoka',
    radius: 16,
  },

  contact: {
    phone: '+91 80 4110 2200',
    whatsapp: '+919845567890',
    email: 'hello@sunshinesprouts.example',
    addressLines: ['12th Main, 5th Block', 'Koramangala'],
    city: 'Bengaluru',
    state: 'Karnataka',
    postalCode: '560095',
    country: 'IN',
    geo: { lat: 12.9352, lng: 77.6245 },
    openingHours: 'Mon-Fri 8:30am - 3:30pm',
  },

  social: {
    instagram: 'https://instagram.com/sunshinesprouts',
    facebook: 'https://facebook.com/sunshinesprouts',
  },

  programs: [
    {
      slug: 'toddlers',
      name: 'Toddler Room',
      ageRange: '18m - 2.5 years',
      hours: '9:00am - 11:00am',
      summary: 'Two hours of movement, mess and one familiar face throughout.',
      tone: 'accent',
    },
    {
      slug: 'primary',
      name: 'Primary',
      ageRange: '2.5 - 4 years',
      hours: '9:00am - 12:30pm',
      summary: 'Mixed-age Montessori floor with practical life and sensorial work.',
      tone: 'primary',
    },
    {
      slug: 'kindergarten',
      name: 'Kindergarten',
      ageRange: '4 - 5 years',
      hours: '9:00am - 1:30pm',
      summary: 'The third year, where children lead work cycles and mentor younger friends.',
      tone: 'accentAlt',
    },
  ],

  daySchedule: [
    { time: '9:00', label: 'Soft start', detail: 'Children arrive over 20 minutes, no bell' },
    { time: '9:20', label: 'Work cycle', detail: 'Uninterrupted choice from the shelves' },
    { time: '11:00', label: 'Snack and garden', detail: 'Rolling snack, then outdoors' },
    { time: '12:00', label: 'Group time', detail: 'Songs, story, show and tell' },
    { time: '1:30', label: 'Home time', detail: 'Handover with a short note' },
  ],

  proofPoints: [
    { value: 8, suffix: ':1', label: 'Children per guide' },
    { value: 3, suffix: ' hrs', label: 'Uninterrupted work cycle' },
    { value: 90, suffix: '+', label: 'Families so far' },
  ],

  features: {
    parentPortal: false,
    kidsZone: true,
    onlineFees: false,
    blog: true,
    transport: false,
  },

  legal: {
    affiliation: 'Montessori-inspired, independent',
    privacyContactEmail: 'privacy@sunshinesprouts.example',
  },

  integrations: {},
};

export default brand;

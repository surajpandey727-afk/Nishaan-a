export const site = {
  name: 'Nishaan-a',
  legalName: 'Nishaan-a',
  tagline: 'Brand strategy practice',
  description:
    'Nishaan-a is a brand strategy practice. We work upstream on clarity, positioning and the systems a business is run on. Execution is coordinated through specialist partners.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://nishaan-a.com',
  locale: 'en_GB',
  email: 'team@nishaan-a.com',
  phone: '+91 91678 90823',
  phoneHref: '+919167890823',
  address: { city: 'Mumbai', country: 'India', box: 'P.O. Box 11812' },
  social: { linkedin: 'https://www.linkedin.com/company/nishaan-a' },
} as const

export const primaryNav = [
  { label: 'About', href: '/about' },
  { label: 'Methodology', href: '/methodology' },
  { label: 'Case studies', href: '/case-studies' },
  { label: 'Insights', href: '/insights' },
] as const

/** Home page chapters, in scroll order. Drives the navigation indicator. */
export const homeSections = [
  { id: 'who-we-are', label: 'Who we are' },
  { id: 'philosophy', label: 'Philosophy' },
  { id: 'chakravaat', label: 'Chakravaat' },
  { id: 'industries', label: 'Agnostic' },
  { id: 'methodology', label: 'Method' },
  { id: 'clients', label: 'Clients' },
  { id: 'thinking', label: 'Insights' },
] as const

export const footerNav = [
  {
    heading: 'Practice',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Methodology', href: '/methodology' },
      { label: 'Industry agnostic', href: '/industries' },
    ],
  },
  {
    heading: 'Thinking',
    links: [
      { label: 'Research', href: '/research' },
      { label: 'Insights', href: '/insights' },
      { label: 'Case studies', href: '/case-studies' },
    ],
  },
  {
    heading: 'Contact',
    links: [
      { label: 'Start a conversation', href: '/contact' },
      { label: 'team@nishaan-a.com', href: 'mailto:team@nishaan-a.com' },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/company/nishaan-a' },
    ],
  },
] as const

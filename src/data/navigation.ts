export interface SiteRoute {
  label: string;
  href: string;
  live: boolean;
}

// This is the implementation route register. Future routes retain their agreed
// destinations here but are rendered as non-links until a real page exists.
export const primaryNavigation: SiteRoute[] = [
  { label: 'Home', href: '/', live: true },
  { label: 'About Us', href: '/about', live: true },
  { label: 'Our Focus', href: '/our-focus', live: true },
  { label: 'Capabilities', href: '/capabilities', live: true },
  { label: 'Leadership', href: '/leadership', live: false },
  { label: 'Partnerships', href: '/partnerships', live: true },
  { label: 'Responsibility', href: '/responsibility', live: true },
];

export const contactRoute: SiteRoute = {
  label: 'Contact',
  href: '/contact',
  live: true,
};

export const plannedCtaRoutes = {
  meetLeadership: '/leadership',
  discussOpportunity: '/contact?enquiry=opportunity',
  discussCollaboration: '/contact?enquiry=partnership',
  startConversation: '/contact',
} as const;

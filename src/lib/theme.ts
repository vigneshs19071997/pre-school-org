import type { Brand } from '@config/index';

/** "#RRGGBB" -> "R G B", the space-separated form Tailwind's
 *  `rgb(var(--x) / <alpha-value>)` pattern needs to support opacity
 *  modifiers (`bg-brand/10`) on a CSS-variable-backed colour. */
function toRgbChannels(hex: string): string {
  const n = parseInt(hex.slice(1), 16);
  return `${(n >> 16) & 255} ${(n >> 8) & 255} ${n & 255}`;
}

/**
 * Turns the brand config into the CSS custom properties that every Tailwind
 * token points at. Injected once on <html> by the root layout, so a colour
 * change is a config edit and nothing else.
 *
 * Each colour is emitted twice: once as a plain hex value (for raw `var()`
 * use in SVG `fill`/inline styles) and once as space-separated RGB channels
 * under a `-rgb` suffix (what the Tailwind config's colour tokens resolve
 * through, so `/opacity` modifiers like `bg-brand/10` actually work).
 */
export function themeVars(brand: Brand): Record<string, string> {
  const t = brand.theme;
  const colors = {
    primary: t.primary,
    'primary-dark': t.primaryDark,
    accent: t.accent,
    'accent-alt': t.accentAlt,
    'accent-green': t.accentGreen ?? t.accentAlt,
    'accent-purple': t.accentPurple ?? t.accentAlt,
    ink: t.ink,
    'ink-soft': t.inkSoft,
    paper: t.paper,
    surface: t.surface,
  };

  const vars: Record<string, string> = { '--brand-radius': `${t.radius}px` };
  for (const [key, hex] of Object.entries(colors)) {
    vars[`--brand-${key}`] = hex;
    vars[`--brand-${key}-rgb`] = toRgbChannels(hex);
  }
  return vars;
}

/** Schema.org Preschool block. Drives local SEO, which is the growth channel. */
export function schoolJsonLd(brand: Brand, siteUrl: string) {
  const c = brand.contact;
  return {
    '@context': 'https://schema.org',
    '@type': 'Preschool',
    name: brand.identity.name,
    legalName: brand.identity.legalName,
    description: brand.identity.description,
    url: siteUrl,
    logo: `${siteUrl}${brand.assets.logo}`,
    image: `${siteUrl}${brand.assets.ogImage}`,
    telephone: c.phone,
    email: c.email,
    foundingDate: String(brand.identity.establishedYear),
    address: {
      '@type': 'PostalAddress',
      streetAddress: c.addressLines.join(', '),
      addressLocality: c.city,
      addressRegion: c.state,
      postalCode: c.postalCode,
      addressCountry: c.country,
    },
    geo: { '@type': 'GeoCoordinates', latitude: c.geo.lat, longitude: c.geo.lng },
    openingHours: c.openingHours,
    sameAs: Object.values(brand.social).filter(Boolean),
  };
}

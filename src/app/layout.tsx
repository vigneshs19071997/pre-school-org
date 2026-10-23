import type { Metadata, Viewport } from 'next';
import { brand } from '@config/index';
import { themeVars } from '@/lib/theme';
import { body, displayFont } from '@/lib/fonts';
import './globals.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

/** Every piece of metadata is tenant-driven. Nothing is hardcoded. */
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${brand.identity.name} — ${brand.identity.tagline}`,
    template: `%s — ${brand.identity.name}`,
  },
  description: brand.identity.description,
  openGraph: {
    type: 'website',
    siteName: brand.identity.name,
    title: brand.identity.name,
    description: brand.identity.description,
    images: [brand.assets.ogImage],
    locale: 'en_IN',
  },
  icons: { icon: brand.assets.mark },
  verification: brand.integrations.searchConsoleVerification
    ? { google: brand.integrations.searchConsoleVerification }
    : undefined,
};

export const viewport: Viewport = {
  themeColor: brand.theme.primary,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const display = displayFont(brand.theme.displayFont);

  return (
    <html
      lang="en-IN"
      className={`${display.variable} ${body.variable}`}
      style={themeVars(brand) as React.CSSProperties}
    >
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}

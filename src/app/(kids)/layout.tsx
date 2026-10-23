import type { Metadata } from 'next';
import { brand } from '@config/index';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Play corner',
  description: 'Games for young children. No sign-in, no ads, nothing collected.',
  robots: { index: false },
};

/**
 * The Kids Zone gets its own root layout on purpose.
 *
 * Nothing third-party loads in here: no analytics, no tag manager, no embeds,
 * no outbound links, no site header or footer. That isolation is only clean
 * because this is a separate route group with its own layout tree.
 */
export default function KidsLayout({ children }: { children: React.ReactNode }) {
  if (!brand.features.kidsZone) notFound();
  return <div className="min-h-[100dvh] bg-surface">{children}</div>;
}

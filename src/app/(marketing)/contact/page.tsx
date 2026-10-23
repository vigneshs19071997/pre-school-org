import type { Metadata } from 'next';
import { brand } from '@config/index';
import { Container, Eyebrow } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { telLink, waLink } from '@/lib/utils';

export const metadata: Metadata = { title: 'Contact' };

export default function ContactPage() {
  const c = brand.contact;
  const maps = `https://www.google.com/maps/search/?api=1&query=${c.geo.lat},${c.geo.lng}`;

  return (
    <section className="py-16 sm:py-24">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <Eyebrow>Contact</Eyebrow>
            <h1 className="mt-4 font-display text-title font-extrabold">Come and find us</h1>
            <address className="mt-8 space-y-1 not-italic text-lg leading-relaxed text-ink-soft">
              {c.addressLines.map((l) => (
                <span key={l} className="block">{l}</span>
              ))}
              <span className="block">{c.city}, {c.state} {c.postalCode}</span>
            </address>

            <dl className="mt-9 space-y-5">
              <div>
                <dt className="text-sm font-semibold">Phone</dt>
                <dd className="mt-1"><a className="text-lg text-brand" href={telLink(c.phone)}>{c.phone}</a></dd>
              </div>
              <div>
                <dt className="text-sm font-semibold">WhatsApp</dt>
                <dd className="mt-1"><a className="text-lg text-brand" href={waLink(c.whatsapp)}>Send a message</a></dd>
              </div>
              <div>
                <dt className="text-sm font-semibold">Email</dt>
                <dd className="mt-1"><a className="text-lg text-brand" href={`mailto:${c.email}`}>{c.email}</a></dd>
              </div>
              <div>
                <dt className="text-sm font-semibold">Office hours</dt>
                <dd className="mt-1 text-ink-soft">{c.openingHours}</dd>
              </div>
            </dl>
          </Reveal>

          <Reveal delay={120}>
            <a
              href={maps}
              rel="noopener"
              className="block overflow-hidden rounded-card bg-surface p-8 shadow-paper transition-shadow hover:shadow-lift"
            >
              <svg viewBox="0 0 400 300" className="w-full rounded-[calc(var(--brand-radius)-12px)]">
                <rect width="400" height="300" fill="var(--brand-surface)" />
                <path d="M0,180 L400,150" stroke="var(--brand-ink)" strokeWidth="14" opacity="0.08" />
                <path d="M140,0 L170,300" stroke="var(--brand-ink)" strokeWidth="10" opacity="0.08" />
                <circle cx="196" cy="158" r="34" fill="var(--brand-primary)" opacity="0.16" />
                <circle cx="196" cy="158" r="11" fill="var(--brand-primary)" />
              </svg>
              <p className="mt-6 font-semibold">Open in Google Maps &rarr;</p>
              <p className="mt-2 text-sm text-ink-soft">
                Nearest landmark is the park at the end of the street. Parking is on the road.
              </p>
            </a>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

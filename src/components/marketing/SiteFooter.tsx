import Link from 'next/link';
import { brand } from '@config/index';
import { Container } from '@/components/ui/Section';
import { Logo } from './Logo';
import { telLink, waLink } from '@/lib/utils';

export function SiteFooter() {
  const { identity, contact, social, legal, features } = brand;
  const year = new Date().getFullYear();

  const explore = [
    { href: '/about', label: 'About us' },
    { href: '/programs', label: 'Programs' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/admissions', label: 'Admissions' },
    ...(features.transport ? [{ href: '/transport', label: 'Transport' }] : []),
    ...(features.kidsZone ? [{ href: '/kids', label: 'Play corner' }] : []),
    ...(features.parentPortal ? [{ href: '/portal', label: 'Parent login' }] : []),
  ];

  return (
    <footer className="border-t border-ink/10 bg-surface pt-16">
      <Container>
        <div className="grid gap-12 pb-14 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Logo alwaysShowText />
            <p className="mt-5 max-w-sm leading-relaxed text-ink-soft">
              {identity.description}
            </p>
            <p className="mt-6 text-sm font-semibold text-ink-soft">{legal.affiliation}</p>
          </div>

          <div>
            <h2 className="text-eyebrow font-bold uppercase text-ink-soft">Explore</h2>
            <ul className="mt-5 space-y-3">
              {explore.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="font-medium hover:text-brand">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-eyebrow font-bold uppercase text-ink-soft">Visit us</h2>
            <address className="mt-5 space-y-1 not-italic leading-relaxed text-ink-soft">
              {contact.addressLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
              <span className="block">
                {contact.city} {contact.postalCode}
              </span>
            </address>
            <ul className="mt-5 space-y-2.5">
              <li>
                <a href={telLink(contact.phone)} className="font-semibold hover:text-brand">
                  {contact.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${contact.email}`} className="hover:text-brand">
                  {contact.email}
                </a>
              </li>
              <li>
                <a href={waLink(contact.whatsapp)} className="font-semibold text-brand">
                  WhatsApp us
                </a>
              </li>
            </ul>
            {Object.keys(social).length > 0 && (
              <ul className="mt-5 flex gap-4 text-sm font-semibold">
                {Object.entries(social).map(([k, v]) =>
                  v ? (
                    <li key={k}>
                      <a href={v} className="capitalize hover:text-brand" rel="noopener">
                        {k}
                      </a>
                    </li>
                  ) : null
                )}
              </ul>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-ink/10 py-7 text-sm text-ink-soft sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} {identity.legalName}
            {legal.registrationNumber ? ` · CIN ${legal.registrationNumber}` : ''}
          </p>
          <p className="flex gap-5">
            <Link href="/privacy" className="hover:text-brand">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-brand">
              Terms
            </Link>
          </p>
        </div>
      </Container>
    </footer>
  );
}

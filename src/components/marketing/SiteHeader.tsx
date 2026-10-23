'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { brand } from '@config/index';
import { Container } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { Logo } from './Logo';
import { CalendarIcon, ArrowRightIcon } from '@/components/ui/icons';
import { cn } from '@/lib/utils';

/** Feature flags decide the nav. School B without a portal never sees the link. */
function navLinks() {
  const links = [
    { href: '/about', label: 'About' },
    { href: '/programs', label: 'Programs' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/admissions', label: 'Admissions' },
  ];
  if (brand.features.kidsZone) links.push({ href: '/kids', label: 'Play corner' });
  if (brand.features.blog) links.push({ href: '/blog', label: 'Journal' });
  links.push({ href: '/contact', label: 'Contact' });
  return links;
}

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const links = navLinks();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Stop the page scrolling behind the open mobile sheet
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 transition-all duration-300',
        scrolled ? 'bg-paper/85 shadow-paper backdrop-blur-md' : 'bg-transparent'
      )}
    >
      <Container>
        <div className="flex h-[4.5rem] items-center justify-between gap-4">
          <Link href="/" aria-label={brand.identity.name}>
            <Logo />
          </Link>

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Main">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-[0.95rem] font-semibold text-ink-soft transition-colors hover:text-brand"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button href="/admissions#book" variant="accent" className="hidden px-5 py-3 sm:inline-flex">
              <CalendarIcon className="h-4 w-4" />
              Book a visit
              <ArrowRightIcon className="h-4 w-4" />
            </Button>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="grid h-11 w-11 place-items-center rounded-full bg-white shadow-paper lg:hidden"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
                {open ? (
                  <path
                    d="M6 6l12 12M18 6L6 18"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                  />
                ) : (
                  <path
                    d="M4 7h16M4 12h16M4 17h16"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </Container>

      {open && (
        <div className="border-t border-ink/10 bg-paper lg:hidden">
          <Container>
            <nav className="flex flex-col py-4" aria-label="Mobile">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-ink/5 py-3.5 font-display text-lg font-bold"
                >
                  {l.label}
                </Link>
              ))}
              <Button href="/admissions#book" variant="accent" className="mt-5">
                <CalendarIcon className="h-4 w-4" />
                Book a visit
                <ArrowRightIcon className="h-4 w-4" />
              </Button>
            </nav>
          </Container>
        </div>
      )}
    </header>
  );
}

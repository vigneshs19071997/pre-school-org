'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { brand } from '@config/index';
import { Container, Eyebrow } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { Button } from '@/components/ui/Button';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';
import { waLink, telLink } from '@/lib/utils';

/* ------------------------------------------------------------ proof points */

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setN(to);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();

        const duration = 1400;
        const start = performance.now();
        let frame = 0;

        const tick = (now: number) => {
          const p = Math.min((now - start) / duration, 1);
          // easeOutExpo - fast then settles, feels less mechanical
          const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
          setN(Math.round(eased * to));
          if (p < 1) frame = requestAnimationFrame(tick);
        };

        frame = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(frame);
      },
      { threshold: 0.5 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [to]);

  return (
    <span ref={ref} className="tabular-nums">
      {n}
      {suffix}
    </span>
  );
}

export function ProofPoints() {
  return (
    <section className="bg-brand py-16 text-white sm:py-20">
      <Container>
        <ul className="grid gap-10 text-center sm:grid-cols-2 lg:grid-cols-4">
          {brand.proofPoints.map((p, i) => (
            <Reveal as="li" key={p.label} delay={i * 80}>
              <p className="font-display text-5xl font-extrabold sm:text-6xl">
                <Counter to={p.value} suffix={p.suffix} />
              </p>
              <p className="mt-3 text-sm font-semibold uppercase tracking-wider text-white/75">
                {p.label}
              </p>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}

/* -------------------------------------------------------------- kids teaser */

export function KidsTeaser() {
  if (!brand.features.kidsZone) return null;

  return (
    <section className="py-20 sm:py-28">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-card bg-surface px-6 py-14 text-center sm:px-14">
            {/* Bouncing shapes, gentle enough not to distract from the copy */}
            <div className="pointer-events-none absolute inset-0" aria-hidden>
              {[
                { l: '8%', t: '18%', c: 'var(--brand-accent)', s: 26, d: '0s' },
                { l: '88%', t: '26%', c: 'var(--brand-primary)', s: 18, d: '-1.2s' },
                { l: '16%', t: '72%', c: 'var(--brand-accent-alt)', s: 22, d: '-2.4s' },
                { l: '80%', t: '68%', c: 'var(--brand-accent)', s: 14, d: '-0.6s' },
              ].map((b, i) => (
                <span
                  key={i}
                  className="absolute animate-bob rounded-full opacity-50"
                  style={{
                    left: b.l,
                    top: b.t,
                    width: b.s,
                    height: b.s,
                    background: b.c,
                    animationDelay: b.d,
                  }}
                />
              ))}
            </div>

            <div className="relative mx-auto max-w-xl">
              <Eyebrow>For the children</Eyebrow>
              <h2 className="mt-4 font-display text-title font-extrabold">
                A play corner they can use on their own
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-ink-soft">
                Every question is read aloud, the pictures are big, and there is no wrong
                answer &mdash; only another try. No sign-in, no ads, nothing collected about
                your child.
              </p>
              <div className="mt-8 flex justify-center">
                <Button href="/kids" variant="accent">
                  Open the play corner
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------ testimonials */

const fallbackQuotes = [
  {
    quote:
      'She used to cry at the gate for the first week. Now she waves us off before we have parked.',
    parentName: 'Divya R.',
    relation: 'Mother of a nursery child',
  },
  {
    quote:
      'The afternoon note tells me what he ate and what he made. I stopped worrying by the second month.',
    parentName: 'Karthik S.',
    relation: 'Father of a playgroup child',
  },
  {
    quote:
      'They let us walk in unannounced. That told us more than any brochure could have.',
    parentName: 'Anitha M.',
    relation: 'Mother of an LKG child',
  },
];

export function Testimonials({ items = fallbackQuotes }: { items?: typeof fallbackQuotes }) {
  return (
    <section className="bg-surface py-20 sm:py-28">
      <Container>
        <Reveal className="max-w-2xl">
          <Eyebrow>From parents</Eyebrow>
          <h2 className="mt-4 font-display text-title font-extrabold">
            What the first month actually felt like
          </h2>
        </Reveal>

        <ul className="mt-14 grid gap-6 lg:grid-cols-3">
          {items.map((t, i) => (
            <Reveal as="li" key={t.parentName} delay={i * 100}>
              <figure
                className="paper-card flex h-full flex-col rounded-card bg-white p-7 shadow-paper"
                style={{ transform: `rotate(${i % 2 ? 1.4 : -1.6}deg)` }}
              >
                <span className="font-display text-5xl leading-none text-brand-accent" aria-hidden>
                  &ldquo;
                </span>
                <blockquote className="mt-2 flex-1 text-[1.05rem] leading-relaxed">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-6 border-t border-ink/10 pt-4">
                  <span className="block font-semibold">{t.parentName}</span>
                  <span className="block text-sm text-ink-soft">{t.relation}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}

/* -------------------------------------------------------------------- CTA */

export function CtaBand() {
  const { contact, identity } = brand;
  return (
    <section className="bg-surface py-20 sm:py-28">
      <Container>
        <Reveal>
          <div className="rounded-card bg-brand-dark px-6 py-14 text-center text-white sm:px-14 sm:py-20">
            <h2 className="mx-auto max-w-2xl font-display text-title font-extrabold">
              Come and see a normal morning
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-white/70">
              No staged tour. Turn up between 9:30 and 11, watch a session, ask the teachers
              anything. Visits take about forty minutes.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Button href="/admissions#book" variant="accent">
                Book a visit
              </Button>
              <Button
                href={waLink(contact.whatsapp, `Hi! I'd like to visit ${identity.name}.`)}
                className="border-2 border-white/25 bg-transparent text-white hover:border-white hover:text-white"
                variant="outline"
              >
                <WhatsAppIcon className="h-4 w-4" />
                Message on WhatsApp
              </Button>
            </div>
            <p className="mt-8 text-sm text-white/55">
              Or just call{' '}
              <a href={telLink(contact.phone)} className="font-semibold text-white underline underline-offset-4">
                {contact.phone}
              </a>
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

/* ----------------------------------------------------------------- gallery */

export function GalleryStrip({ images = [] as { url: string; alt: string }[] }) {
  // Falls back to flat illustrated tiles until the school uploads real photos
  // through the admin console. Placeholder greys would look worse than this.
  const tones = ['var(--brand-primary)', 'var(--brand-accent)', 'var(--brand-accent-alt)', 'var(--brand-primary-dark)'];

  return (
    <section className="pb-20 sm:pb-28">
      <Container>
        <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <Eyebrow>Around the school</Eyebrow>
            <h2 className="mt-4 font-display text-title font-extrabold">Our rooms</h2>
          </div>
          <Link href="/gallery" className="font-semibold text-brand underline underline-offset-4">
            See the full gallery
          </Link>
        </Reveal>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {(images.length ? images : tones.map((t) => ({ url: '', alt: '', tone: t }))).map(
            (item: any, i: number) => (
              <Reveal key={i} delay={i * 80}>
                <div
                  className="paper-card aspect-[4/5] overflow-hidden rounded-card shadow-paper"
                  style={{
                    transform: `rotate(${i % 2 ? 1.2 : -1.2}deg)`,
                    background: item.tone ?? 'var(--brand-surface)',
                  }}
                >
                  {item.url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={item.url} alt={item.alt} className="h-full w-full object-cover" />
                  ) : (
                    <svg viewBox="0 0 100 125" className="h-full w-full opacity-30">
                      <circle cx="50" cy="45" r="18" fill="white" />
                      <path d="M18,125 C18,95 32,80 50,80 C68,80 82,95 82,125 Z" fill="white" />
                    </svg>
                  )}
                </div>
              </Reveal>
            )
          )}
        </div>
      </Container>
    </section>
  );
}

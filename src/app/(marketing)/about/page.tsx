import type { Metadata } from 'next';
import { brand } from '@config/index';
import { Container, Eyebrow } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';

export const metadata: Metadata = { title: 'About' };

export default function AboutPage() {
  const years = new Date().getFullYear() - brand.identity.establishedYear;

  return (
    <section className="py-16 sm:py-24">
      <Container>
        <Reveal className="max-w-2xl">
          <Eyebrow>About</Eyebrow>
          <h1 className="mt-4 font-display text-title font-extrabold">
            {years} years on the same street
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-ink-soft">
            {brand.identity.description} We opened in {brand.identity.establishedYear} with two
            rooms and eleven children. The building has grown; the ratio has not.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-8 sm:grid-cols-3">
          {[
            {
              h: 'Play is the curriculum',
              p: 'Children this age learn through their hands. Worksheets can wait for big school.',
            },
            {
              h: 'Doors stay open',
              p: 'Parents can walk in during session hours. We have never needed a reason to say no.',
            },
            {
              h: 'The same faces',
              p: 'Low teacher turnover matters more than facilities. Most of our staff have been here over five years.',
            },
          ].map((c, i) => (
            <Reveal key={c.h} delay={i * 90}>
              <div className="h-full rounded-card bg-surface p-7">
                <h2 className="font-display text-xl font-bold">{c.h}</h2>
                <p className="mt-3 leading-relaxed text-ink-soft">{c.p}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

import type { Metadata } from 'next';
import { brand } from '@config/index';
import { Container, Eyebrow } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Programs',
  description: `Age groups and timings at ${brand.identity.name}.`,
};

const toneClass: Record<string, string> = {
  primary: 'bg-brand text-white',
  accent: 'bg-brand-accent text-ink',
  accentAlt: 'bg-brand-alt text-ink',
  accentGreen: 'bg-brand-green text-ink',
  accentPurple: 'bg-brand-purple text-ink',
};

export default function ProgramsPage() {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <Reveal className="max-w-2xl">
          <Eyebrow>Programs</Eyebrow>
          <h1 className="mt-4 font-display text-title font-extrabold">
            Rooms grouped by what children can do
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-ink-soft">
            Age is a guide, not a rule. If your child sits between two groups we will suggest
            the one that fits after the trial mornings.
          </p>
        </Reveal>

        <div className="mt-16 space-y-8">
          {brand.programs.map((p, i) => (
            <Reveal key={p.slug} delay={i * 80}>
              <article
                id={p.slug}
                className="scroll-mt-24 rounded-card bg-surface p-7 sm:p-10"
              >
                <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2">
                  <h2 className="font-display text-3xl font-extrabold">{p.name}</h2>
                  <span
                    className={`rounded-pill px-3.5 py-1.5 text-xs font-bold ${toneClass[p.tone]}`}
                  >
                    {p.ageRange}
                  </span>
                </div>
                <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">{p.summary}</p>
                <p className="mt-6 font-semibold">{p.hours}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-14 flex justify-center">
          <Button href="/admissions#book">Book a visit</Button>
        </Reveal>
      </Container>
    </section>
  );
}

import { brand } from '@config/index';
import { Container } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { ProgramIllustration } from './ProgramIllustration';
import { HeartDoodle, ShootingStar } from './Doodles';
import { ChevronRightIcon } from '@/components/ui/icons';
import Link from 'next/link';

const toneBg: Record<string, string> = {
  primary: 'bg-brand',
  accent: 'bg-brand-accent',
  accentAlt: 'bg-brand-alt',
  accentGreen: 'bg-brand-green',
  accentPurple: 'bg-brand-purple',
};

/* Tailwind's JIT scanner needs the full class string literally present
 * somewhere in source - `${toneBg[p.tone]}/25` at runtime won't generate
 * the rule, so the tint variant is spelled out in full per tone instead. */
const toneTint: Record<string, string> = {
  primary: 'bg-brand/25',
  accent: 'bg-brand-accent/25',
  accentAlt: 'bg-brand-alt/25',
  accentGreen: 'bg-brand-green/25',
  accentPurple: 'bg-brand-purple/25',
};

const toneEmoji: Record<string, string> = {
  primary: '⭐',
  accent: '🧩',
  accentAlt: '🧸',
  accentGreen: '📚',
  accentPurple: '🎒',
};

/** `primary` stays a dark brand colour across tenants, so it needs a light
 *  icon; the other tones are the pastel/playful ones and need a dark icon. */
const toneIcon: Record<string, string> = {
  primary: 'text-white',
  accent: 'text-ink',
  accentAlt: 'text-ink',
  accentGreen: 'text-ink',
  accentPurple: 'text-ink',
};

export function Programs() {
  return (
    <section id="programs" className="relative overflow-hidden bg-surface py-20 sm:py-28">
      <Container className="relative">
        <Reveal className="relative max-w-2xl">
          <span className="inline-flex rounded-pill bg-brand-green/15 px-4 py-1.5 text-sm font-bold text-brand-green">
            Our Programs
          </span>
          <ShootingStar className="absolute right-0 top-0 hidden h-10 w-14 text-brand-accent sm:block" />
          <h2 className="mt-4 font-display text-title font-extrabold text-ink">
            A strong start for every stage
          </h2>
          <HeartDoodle className="absolute left-60 top-1 hidden h-7 w-7 text-brand-accent/70 lg:block" />
          <p className="mt-5 text-lg leading-relaxed text-ink-soft">
            We offer age-appropriate programs that build confidence, curiosity and a love for
            learning.
          </p>
        </Reveal>

        <ul className="mt-14 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {brand.programs.map((p, i) => (
            <Reveal as="li" key={p.slug} delay={i * 90}>
              <Link
                href={`/programs#${p.slug}`}
                className="paper-card group relative flex h-full flex-col rounded-card bg-white p-4 shadow-paper hover:shadow-lift"
              >
                <div className="relative">
                  <ProgramIllustration
                    src={p.illustration}
                    toneClass={toneTint[p.tone]}
                    fallbackEmoji={toneEmoji[p.tone]}
                    alt=""
                  />
                  <span
                    className={`absolute -bottom-3 right-3 grid h-9 w-9 place-items-center rounded-full shadow-paper transition-transform duration-200 group-hover:translate-x-1 ${toneBg[p.tone]} ${toneIcon[p.tone]}`}
                    aria-hidden
                  >
                    <ChevronRightIcon className="h-4 w-4" />
                  </span>
                </div>
                <h3 className="mt-4 px-1 font-display text-lg font-bold text-ink">{p.name}</h3>
                <p className="mt-1 px-1 text-sm text-ink-soft">{p.ageRange}</p>
              </Link>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}

/**
 * Scrolling band of what actually happens in a day. Duplicated once so the
 * -50% translate loops seamlessly; the copy is aria-hidden.
 */
export function ValuesMarquee() {
  const words = [
    'sand and water',
    'reading corner',
    'garden time',
    'clay and dough',
    'songs in two languages',
    'building blocks',
    'painting with hands',
    'story circle',
  ];

  return (
    <div className="border-y border-ink/10 bg-paper py-5">
      <div className="marquee-mask overflow-hidden">
        <div className="marquee-track">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0" aria-hidden={copy === 1}>
              {words.map((w) => (
                <span
                  key={`${copy}-${w}`}
                  className="flex items-center gap-6 whitespace-nowrap px-6 font-display text-xl font-bold text-ink-soft sm:text-2xl"
                >
                  {w}
                  <span className="text-brand-accent">&#9679;</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * The daily rhythm. Numbered markers would be decoration here - the times
 * themselves already encode the sequence, so the times ARE the markers.
 */
export function DayTimeline() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <Reveal>
            <span className="inline-flex rounded-pill bg-brand-alt/15 px-4 py-1.5 text-sm font-bold text-brand-alt">
              A day here
            </span>
            <h2 className="mt-4 font-display text-title font-extrabold text-ink">
              The whole day, before you ask
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink-soft">
              No mystery about what your child does between drop-off and pickup. This is the
              rhythm, and it barely changes week to week &mdash; which is exactly what small
              children need.
            </p>
          </Reveal>

          <ol className="relative">
            {/* The spine the whole schedule hangs from */}
            <span
              className="absolute left-[4.75rem] top-2 hidden h-[calc(100%-1rem)] w-0.5 bg-ink/10 sm:block"
              aria-hidden
            />
            {brand.daySchedule.map((slot, i) => (
              <Reveal as="li" key={slot.time} delay={i * 70} className="relative">
                <div className="flex gap-5 pb-8 sm:gap-8">
                  <span className="w-14 shrink-0 pt-1 text-right font-display text-lg font-bold text-brand sm:w-16">
                    {slot.time}
                  </span>
                  <span
                    className="relative z-10 mt-2 hidden h-3 w-3 shrink-0 rounded-full bg-brand-accent ring-4 ring-paper sm:block"
                    aria-hidden
                  />
                  <span className="min-w-0">
                    <span className="block font-display text-xl font-bold text-ink">{slot.label}</span>
                    <span className="mt-1.5 block text-[0.95rem] leading-relaxed text-ink-soft">
                      {slot.detail}
                    </span>
                  </span>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}

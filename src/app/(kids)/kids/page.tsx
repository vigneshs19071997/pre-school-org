'use client';

import { useState } from 'react';
import Link from 'next/link';
import { activityLibrary, ageBands, type AgeBand } from '@/lib/kids-content';

const toneBg: Record<string, string> = {
  primary: 'bg-brand text-white',
  accent: 'bg-brand-accent text-ink',
  accentAlt: 'bg-brand-alt text-white',
};

/**
 * Activity picker.
 *
 * The age band is chosen by the adult who opens the page, then the child taps
 * a tile. Tiles are icon-first because the labels are unreadable to the user.
 */
export default function KidsHome() {
  const [band, setBand] = useState<AgeBand>('toddler');
  const activities = activityLibrary.filter((a) => a.ageBand === band);

  return (
    <div className="mx-auto max-w-4xl px-5 py-8">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-3xl font-extrabold sm:text-4xl">Play corner</h1>
        {/* Parent gate: the only way out, and worded for an adult. */}
        <Link href="/" className="text-sm font-semibold text-ink-soft underline underline-offset-4">
          Back to the school site
        </Link>
      </header>

      <fieldset className="mt-8">
        <legend className="mb-3 text-sm font-semibold text-ink-soft">
          How old is your child?
        </legend>
        <div className="flex flex-wrap gap-3">
          {ageBands.map((b) => (
            <button
              key={b.key}
              onClick={() => setBand(b.key)}
              aria-pressed={band === b.key}
              className={`rounded-pill px-5 py-3 text-base font-bold transition-colors ${
                band === b.key ? 'bg-brand text-white' : 'bg-white text-ink shadow-paper'
              }`}
            >
              <span className="mr-2" aria-hidden>{b.icon}</span>
              {b.label}
            </button>
          ))}
        </div>
        <p className="mt-3 text-sm text-ink-soft">
          {ageBands.find((b) => b.key === band)?.hint}
        </p>
      </fieldset>

      <ul className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-3">
        {activities.map((a) => (
          <li key={a.slug}>
            <Link
              href={`/kids/play/${a.slug}`}
              className="flex aspect-square flex-col items-center justify-center gap-3 rounded-card bg-white p-4 text-center shadow-paper transition-transform active:scale-95"
            >
              <span className="text-[3.5rem] leading-none" aria-hidden>{a.icon}</span>
              <span className="font-display text-lg font-bold leading-tight">{a.title}</span>
              <span className={`rounded-pill px-3 py-1 text-[0.7rem] font-bold ${toneBg[a.tone]}`}>
                {a.items.length} questions
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <p className="mt-12 rounded-card bg-white p-6 text-sm leading-relaxed text-ink-soft">
        <strong className="font-semibold text-ink">For grown-ups.</strong> Every question is read
        aloud, so your child does not need to read. There is no timer and no score shown to them
        — a wrong tap just asks for another try. Nothing is collected about your child and there
        are no ads or outside links in this section.
      </p>
    </div>
  );
}

'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import type { Activity } from '@/lib/kids-content';

/**
 * The quiz engine.
 *
 * Design constraints for 2-6 year olds, all deliberate:
 *   - Prompts are spoken. Children cannot read; text is for the adult nearby.
 *   - Tap targets are enormous. No drag precision, no keyboard, no typing.
 *   - There is no timer, no score shown to the child, and no losing.
 *     A wrong tap wobbles and lets them try again.
 *   - Every round ends in a sticker regardless of how many tries it took.
 *
 * Progress is written to localStorage only. Nothing identifying a child is
 * ever collected here - no account, no name, no analytics in this route group.
 */

type Phase = 'playing' | 'finished';

const toneBg: Record<string, string> = {
  primary: 'bg-brand',
  accent: 'bg-brand-accent',
  accentAlt: 'bg-brand-alt',
};

/** Web Speech API. Silently no-ops where unsupported rather than blocking play. */
function useSpeech() {
  const enabled = useRef(false);

  useEffect(() => {
    enabled.current = typeof window !== 'undefined' && 'speechSynthesis' in window;
    return () => {
      if (enabled.current) window.speechSynthesis.cancel();
    };
  }, []);

  return useCallback((text: string) => {
    if (!enabled.current) return;
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.rate = 0.85; // slower than default; small children need the gap
    utter.pitch = 1.15;
    utter.lang = 'en-IN';
    window.speechSynthesis.speak(utter);
  }, []);
}

export function QuizPlayer({ activity }: { activity: Activity }) {
  const [index, setIndex] = useState(0);
  const [wrongId, setWrongId] = useState<string | null>(null);
  const [correct, setCorrect] = useState(false);
  const [phase, setPhase] = useState<Phase>('playing');
  const [firstTry, setFirstTry] = useState(0);
  const [triedThisItem, setTriedThisItem] = useState(false);

  const speak = useSpeech();
  const item = activity.items[index];
  const total = activity.items.length;

  // Read each question aloud as it appears
  useEffect(() => {
    if (phase === 'playing' && item) speak(item.promptText);
  }, [index, phase, item, speak]);

  function handleTap(optionId: string) {
    if (correct) return;

    if (optionId === item.correctOptionId) {
      setCorrect(true);
      setWrongId(null);
      if (!triedThisItem) setFirstTry((n) => n + 1);
      speak('Yes! Well done.');

      window.setTimeout(() => {
        if (index + 1 < total) {
          setIndex((i) => i + 1);
          setCorrect(false);
          setTriedThisItem(false);
        } else {
          setPhase('finished');
          saveProgress();
        }
      }, 1300);
    } else {
      setTriedThisItem(true);
      setWrongId(optionId);
      speak('Try another one.');
      window.setTimeout(() => setWrongId(null), 600);
    }
  }

  function saveProgress() {
    try {
      const raw = window.localStorage.getItem('kids-stickers');
      const stickers: string[] = raw ? JSON.parse(raw) : [];
      if (!stickers.includes(activity.slug)) {
        window.localStorage.setItem('kids-stickers', JSON.stringify([...stickers, activity.slug]));
      }
    } catch {
      // Private browsing or storage full. Not worth interrupting a child over.
    }
  }

  function restart() {
    setIndex(0);
    setCorrect(false);
    setWrongId(null);
    setFirstTry(0);
    setTriedThisItem(false);
    setPhase('playing');
  }

  /* ------------------------------------------------------------- finished */

  if (phase === 'finished') {
    return (
      <div className="mx-auto max-w-lg px-5 py-16 text-center">
        <div className="animate-bob text-[7rem] leading-none" aria-hidden>
          ⭐
        </div>
        <h1 className="mt-6 font-display text-4xl font-extrabold">You did it!</h1>
        <p className="mt-4 text-xl text-ink-soft">A new sticker for your book.</p>

        {/* The only place a number appears, and it is aimed at the adult. */}
        <p className="mt-8 text-sm text-ink-soft/70">
          For grown-ups: {firstTry} of {total} answered on the first try.
        </p>

        <div className="mt-10 flex flex-col gap-3">
          <button
            onClick={restart}
            className="rounded-pill bg-brand px-8 py-5 text-xl font-bold text-white active:scale-[0.97]"
          >
            Play again
          </button>
          <Link
            href="/kids"
            className="rounded-pill border-2 border-ink/15 px-8 py-5 text-xl font-bold active:scale-[0.97]"
          >
            Pick another game
          </Link>
        </div>
      </div>
    );
  }

  /* -------------------------------------------------------------- playing */

  return (
    <div className="mx-auto flex min-h-[100dvh] max-w-3xl flex-col px-5 py-6">
      <div className="flex items-center gap-4">
        <Link
          href="/kids"
          aria-label="Back to games"
          className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-white text-2xl shadow-paper active:scale-95"
        >
          ←
        </Link>

        {/* Dots, not a percentage. A progress bar means nothing at this age. */}
        <div className="flex flex-1 gap-2" aria-label={`Question ${index + 1} of ${total}`}>
          {activity.items.map((_, i) => (
            <span
              key={i}
              className={`h-2.5 flex-1 rounded-full transition-colors ${
                i <= index ? toneBg[activity.tone] : 'bg-ink/10'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-center py-8">
        <div className="flex items-center justify-center gap-4">
          <h1 className="text-center font-display text-3xl font-extrabold sm:text-4xl">
            {item.promptText}
          </h1>
          <button
            onClick={() => speak(item.promptText)}
            aria-label="Say the question again"
            className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-white text-2xl shadow-paper active:scale-95"
          >
            🔊
          </button>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-3">
          {item.options.map((o) => {
            const isCorrect = correct && o.id === item.correctOptionId;
            const isWrong = wrongId === o.id;
            return (
              <button
                key={o.id}
                onClick={() => handleTap(o.id)}
                aria-label={o.label}
                className={[
                  'grid aspect-square place-items-center rounded-card bg-white text-[4.5rem] shadow-paper',
                  'transition-transform duration-200 active:scale-95 sm:text-[5rem]',
                  isCorrect && 'ring-8 ring-brand scale-105',
                  isWrong && 'animate-[drift_0.4s_ease-in-out] ring-4 ring-brand-alt',
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                <span aria-hidden>{o.emoji}</span>
              </button>
            );
          })}
        </div>

        {/* Encouragement only. Never the word "wrong". */}
        <p
          className="mt-10 text-center text-xl font-semibold text-ink-soft"
          aria-live="polite"
        >
          {correct ? 'Yes! Well done 🎉' : wrongId ? 'Nearly — try another one' : '\u00A0'}
        </p>
      </div>
    </div>
  );
}

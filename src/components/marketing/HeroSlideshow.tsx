'use client';

import { useEffect, useState } from 'react';

const INTERVAL_MS = 10_000;
const FADE_MS = 1200;

/**
 * Cross-fading hero photo. Every consented gallery photo is pre-rendered and
 * stacked; only opacity moves, so there is no layout shift or flash between
 * frames.
 *
 * `contained` renders it to fill whatever box it's placed in (the blob photo
 * frame) with no scrim - used when the copy sits beside the photo rather than
 * on top of it. Without it, it fills an absolutely-positioned ancestor as a
 * full-bleed background with a scrim protecting any text placed over it.
 */
export function HeroSlideshow({
  images,
  contained = false,
}: {
  images: { url: string; alt: string }[];
  contained?: boolean;
}) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (images.length < 2) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const id = setInterval(() => {
      setActive((i) => (i + 1) % images.length);
    }, INTERVAL_MS);

    return () => clearInterval(id);
  }, [images.length]);

  if (images.length === 0) return null;

  return (
    <div className={contained ? 'absolute inset-0' : 'absolute inset-0 overflow-hidden'} aria-hidden>
      {images.map((img, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={img.url}
          src={img.url}
          alt=""
          loading={i === 0 ? 'eager' : 'lazy'}
          className="absolute inset-0 h-full w-full object-cover ease-in-out"
          style={{ opacity: i === active ? 1 : 0, transitionProperty: 'opacity', transitionDuration: `${FADE_MS}ms` }}
        />
      ))}
      {!contained && (
        <>
          {/* Scrim so copy on the left stays readable over any photo. The
              solid zone runs well past where the headline sits, so a busy
              photo never fights with the text sitting on top of it. */}
          <div className="absolute inset-0 bg-gradient-to-r from-paper from-0% via-paper via-[55%] to-paper/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-paper via-transparent to-transparent" />
        </>
      )}
    </div>
  );
}

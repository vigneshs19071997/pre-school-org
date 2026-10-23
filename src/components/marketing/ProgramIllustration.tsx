'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * The character illustration inside a program card. Tries the real artwork
 * first; if it 404s (or none was configured) it falls back to a big emoji on
 * the tone colour rather than a broken-image icon, so the card still looks
 * finished before the real asset exists.
 *
 * A fast 404 can resolve before React hydrates and attaches `onError` -
 * the browser fires the native error event into a void with no listener
 * yet, so the hydrated handler never sees it. The mount-time check on
 * `img.complete && naturalWidth === 0` catches that case too.
 */
export function ProgramIllustration({
  src,
  toneClass,
  fallbackEmoji,
  alt,
}: {
  src?: string;
  toneClass: string;
  fallbackEmoji: string;
  alt: string;
}) {
  const [failed, setFailed] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const showFallback = !src || failed;

  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth === 0) {
      setFailed(true);
    }
  }, [src]);

  return (
    <div className={`blob-frame relative grid aspect-[5/4] w-full place-items-center overflow-hidden ${toneClass}`}>
      {!showFallback && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          className="h-full w-full object-contain p-4"
          onError={() => setFailed(true)}
        />
      )}
      {showFallback && (
        <span className="text-5xl" aria-hidden>
          {fallbackEmoji}
        </span>
      )}
    </div>
  );
}

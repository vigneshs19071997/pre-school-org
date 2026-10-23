'use client';

import { createElement, useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

type RevealTag = 'div' | 'li' | 'section' | 'article' | 'figure';

/**
 * Scroll reveal via IntersectionObserver rather than a motion library.
 * Keeps the bundle small, and prefers-reduced-motion releases the .reveal
 * class in CSS so nothing is ever stuck invisible.
 *
 * Polymorphic so it can render as <li> inside a <ul> without breaking
 * semantics - a wrapper <div> there would be invalid markup.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  as = 'div',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: RevealTag;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return createElement(
    as,
    {
      ref,
      style: { '--reveal-delay': `${delay}ms` } as React.CSSProperties,
      className: cn('reveal', shown && 'is-visible', className),
    },
    children
  );
}

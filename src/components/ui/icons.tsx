/**
 * Small inline icon set for the hero/trust row/program cards. Flat,
 * currentColor-filled so each one can be recoloured per brand token with a
 * plain text-* class, rather than shipping a fixed-palette image.
 */

export function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden>
      <rect x="3.5" y="5" width="17" height="15" rx="3" stroke="currentColor" strokeWidth="1.8" />
      <path d="M3.5 9.5h17" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8 3v3.5M16 3v3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="8.2" cy="13.5" r="1.1" fill="currentColor" />
      <circle cx="12" cy="13.5" r="1.1" fill="currentColor" />
      <circle cx="8.2" cy="16.8" r="1.1" fill="currentColor" />
    </svg>
  );
}

export function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={className} fill="none" aria-hidden>
      <path
        d="M4 10h12M11 5l5 5-5 5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ChevronRightIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={className} fill="none" aria-hidden>
      <path
        d="M7.5 4.5l6 5.5-6 5.5"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PeopleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <circle cx="9" cy="7.5" r="3.2" />
      <circle cx="17" cy="9" r="2.4" opacity="0.7" />
      <path d="M2.5 20c0-4 3-6.5 6.5-6.5s6.5 2.5 6.5 6.5v.5h-13z" />
      <path d="M15.5 14.2c2.6.3 4.5 2.3 4.5 5.3v.5h-3.6" opacity="0.7" />
    </svg>
  );
}

export function HeartIcon({ className, outline = false }: { className?: string; outline?: boolean }) {
  if (outline) {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden>
        <path
          d="M12 20.3S3 15.1 3 9.1C3 6 5.4 4 8 4c1.7 0 3.2.9 4 2.3C12.8 4.9 14.3 4 16 4c2.6 0 5 2 5 5.1 0 6-9 11.2-9 11.2z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M12 20.3S3 15.1 3 9.1C3 6 5.4 4 8 4c1.7 0 3.2.9 4 2.3C12.8 4.9 14.3 4 16 4c2.6 0 5 2 5 5.1 0 6-9 11.2-9 11.2z" />
    </svg>
  );
}

export function LeafIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M20.5 3.5c.6 7-2 12-6.7 14.9C9 21.3 4 20.6 3.5 20c-.5-.6.2-5.6 3.2-10 2.9-4.3 7.9-6.8 13.8-6.5z" />
      <path
        d="M19 5.3C13.8 9 9.6 13 6.3 18.3"
        stroke="var(--brand-paper)"
        strokeWidth="1.3"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export function MegaphoneIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M3 10.5v3a1.5 1.5 0 001.5 1.5h.6l1.1 4.2a1 1 0 00.97.8h1a1 1 0 00.95-1.3L8.2 15h.3l9 4V6.5l-9 4H4.5A1.5 1.5 0 003 10.5z" />
      <path d="M19.5 9v7.5a2.25 2.25 0 000-7.5z" />
    </svg>
  );
}

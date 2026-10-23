/**
 * Hand-drawn accent marks - sparkles, a shooting star, an outline heart.
 * Pure decoration, scattered near headlines the way a kid would annotate a
 * page with a pencil. All currentColor so each placement picks its own tint.
 */

export function SparkleCross({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M12 0c.6 4.8 1.6 8.2 3 9.6 1.4 1.4 4.8 2.4 9 3-4.2.6-7.6 1.6-9 3-1.4 1.4-2.4 4.8-3 9.6-.6-4.8-1.6-8.2-3-9.6-1.4-1.4-4.8-2.4-9-3 4.2-.6 7.6-1.6 9-3 1.4-1.4 2.4-4.8 3-9.6z" />
    </svg>
  );
}

export function ShootingStar({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 48" className={className} fill="none" aria-hidden>
      <path
        d="M4 44C16 34 24 24 30 10"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeDasharray="0.5 7"
      />
      <path
        d="M40 2c.9 3.6 2 6 3.6 7.6 1.6 1.6 4 2.7 7.6 3.6-3.6.9-6 2-7.6 3.6-1.6 1.6-2.7 4-3.6 7.6-.9-3.6-2-6-3.6-7.6-1.6-1.6-4-2.7-7.6-3.6 3.6-.9 6-2 7.6-3.6C38 8 39.1 5.6 40 2z"
        fill="currentColor"
      />
    </svg>
  );
}

export function HeartDoodle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 28" className={className} fill="none" aria-hidden>
      <path
        d="M16 25.8S2.8 18.3 2.8 10.4C2.8 5.9 6.2 3 10 3c2.4 0 4.6 1.3 6 3.3C17.4 4.3 19.6 3 22 3c3.8 0 7.2 2.9 7.2 7.4 0 7.9-13.2 15.4-13.2 15.4z"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ScribbleUnderline({ className, color = 'currentColor' }: { className?: string; color?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 220 20"
      preserveAspectRatio="none"
      aria-hidden
    >
      <path
        className="scribble-path"
        pathLength={1}
        d="M3,12 C40,4 74,17 110,9 C146,1 174,15 217,8"
        fill="none"
        stroke={color}
        strokeWidth="6"
        strokeLinecap="round"
      />
    </svg>
  );
}

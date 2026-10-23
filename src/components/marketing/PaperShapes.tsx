/**
 * Ambient background for the hero: soft, oversized blobs bleeding in from
 * the top-right corner, plus a few scattered sparkle dots. Everything here
 * is decorative and sits well behind the copy and photo.
 */
export function PaperShapes() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <svg
        className="absolute -right-10 -top-16 h-72 w-72 animate-drift-slow opacity-[0.55] sm:h-96 sm:w-96"
        viewBox="0 0 200 200"
      >
        <path
          fill="var(--brand-accent)"
          d="M104,6 C152,14 190,50 194,96 C198,142 168,182 122,192 C76,202 32,178 14,138 C-4,98 8,50 42,26 C76,2 88,3 104,6 Z"
        />
      </svg>

      <svg
        className="absolute -right-24 top-24 h-64 w-64 animate-drift opacity-[0.45] sm:h-80 sm:w-80"
        viewBox="0 0 200 200"
      >
        <path
          fill="var(--brand-accent-green)"
          d="M97,12 C140,8 176,38 186,78 C196,118 178,160 140,180 C102,200 56,192 30,162 C4,132 6,86 26,52 C46,18 60,16 97,12 Z"
        />
      </svg>

      <svg
        className="absolute -left-20 bottom-10 h-48 w-48 animate-drift opacity-[0.3] sm:h-60 sm:w-60"
        viewBox="0 0 200 200"
        style={{ animationDelay: '-6s' }}
      >
        <path
          fill="var(--brand-accent-alt)"
          d="M100,10 C146,4 184,44 190,90 C196,136 166,178 120,188 C74,198 28,172 12,130 C-4,88 14,44 52,22 C72,10 84,12 100,10 Z"
        />
      </svg>

      {/* Scattered sparkle dots, like paper punch-outs on a table */}
      <svg className="absolute inset-0 h-full w-full opacity-[0.4]" viewBox="0 0 800 500">
        {[
          [70, 120, 'var(--brand-accent)'],
          [180, 380, 'var(--brand-accent-green)'],
          [640, 90, 'var(--brand-accent-alt)'],
          [720, 300, 'var(--brand-accent)'],
          [420, 60, 'var(--brand-accent-purple)'],
          [300, 440, 'var(--brand-accent-alt)'],
        ].map(([cx, cy, fill], i) => (
          <circle
            key={i}
            cx={cx as number}
            cy={cy as number}
            r={i % 2 ? 4 : 6}
            fill={fill as string}
            className="animate-bob"
            style={{ animationDelay: `${i * 0.6}s` }}
          />
        ))}
      </svg>
    </div>
  );
}

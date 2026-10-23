import { cn } from '@/lib/utils';

export function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={cn('mx-auto w-full max-w-6xl px-5 sm:px-8', className)}>{children}</div>;
}

export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={cn('text-eyebrow font-bold uppercase text-brand', className)}>
      {children}
    </p>
  );
}

/**
 * Torn-paper divider. The collage motif that runs through the page - each
 * section is a sheet of paper laid on the one below, not a rectangle.
 */
export function TornEdge({ fill = 'var(--brand-surface)', flip = false }: { fill?: string; flip?: boolean }) {
  return (
    <div className={cn('pointer-events-none -mb-px w-full leading-[0]', flip && 'rotate-180')} aria-hidden>
      <svg viewBox="0 0 1440 48" preserveAspectRatio="none" className="h-8 w-full sm:h-12">
        <path
          fill={fill}
          d="M0,24 C60,10 110,38 180,30 C250,22 300,6 380,14 C460,22 510,44 590,38 C670,32 720,10 800,16 C880,22 930,42 1010,36 C1090,30 1140,8 1220,14 C1300,20 1350,40 1440,28 L1440,48 L0,48 Z"
        />
      </svg>
    </div>
  );
}

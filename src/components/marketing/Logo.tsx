import { brand } from '@config/index';
import { cn } from '@/lib/utils';

/**
 * The mark plus wordmark. Little Stars gets the two-line "Name / PRESCHOOL"
 * lockup; other tenants fall back to a single line so this doesn't need a
 * new config field just to render a word that may not apply to them.
 */
export function Logo({
  className,
  iconClassName,
  alwaysShowText = false,
}: {
  className?: string;
  iconClassName?: string;
  alwaysShowText?: boolean;
}) {
  const { identity, assets, slug } = brand;
  const textVisibility = alwaysShowText ? 'flex' : 'hidden sm:flex';
  const textVisibilityInline = alwaysShowText ? 'inline' : 'hidden sm:inline';

  return (
    <span className={cn('flex items-center gap-2.5', className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={assets.mark}
        alt=""
        aria-hidden
        className={cn('h-10 w-10 shrink-0 sm:h-11 sm:w-11', iconClassName)}
      />
      {slug === 'little-stars' ? (
        <span className={cn('flex-col leading-none', textVisibility)}>
          <span className="font-display text-xl font-extrabold text-ink">Little Stars</span>
          <span className="mt-1 text-[0.62rem] font-bold uppercase tracking-[0.22em] text-ink-soft">
            Preschool
          </span>
        </span>
      ) : (
        <span className={cn('font-display text-xl font-extrabold text-ink', textVisibilityInline)}>
          {identity.name}
        </span>
      )}
    </span>
  );
}

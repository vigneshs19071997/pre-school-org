import Link from 'next/link';
import { cn } from '@/lib/utils';

type Variant = 'solid' | 'outline' | 'accent';

const styles: Record<Variant, string> = {
  solid: 'bg-brand text-white hover:bg-brand-dark shadow-paper',
  accent: 'bg-brand-accent text-ink hover:brightness-95 shadow-paper',
  outline: 'border-2 border-ink/15 text-ink hover:border-brand hover:text-brand bg-transparent',
};

const base =
  'inline-flex items-center justify-center gap-2 rounded-pill px-7 py-3.5 font-semibold ' +
  'transition-all duration-200 active:scale-[0.97] text-[0.95rem]';

export function Button({
  href,
  variant = 'solid',
  className,
  children,
  ...rest
}: {
  href?: string;
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const cls = cn(base, styles[variant], className);
  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  );
}

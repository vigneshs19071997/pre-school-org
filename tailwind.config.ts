import type { Config } from 'tailwindcss';

/**
 * No tenant colours appear in this file.
 *
 * Every token points at a CSS custom property that the root layout injects
 * from the active brand config. That is the whole white-label mechanism:
 * `bg-brand` in a component resolves to whichever school is deployed.
 */
const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // rgb(var(--x-rgb) / <alpha-value>) rather than a bare var() so that
        // opacity modifiers (bg-brand/10, border-ink/15, ...) actually work -
        // Tailwind can only inject alpha into a colour it can see the RGB
        // channels of, not an opaque `var(--brand-primary)` string.
        brand: {
          DEFAULT: 'rgb(var(--brand-primary-rgb) / <alpha-value>)',
          dark: 'rgb(var(--brand-primary-dark-rgb) / <alpha-value>)',
          accent: 'rgb(var(--brand-accent-rgb) / <alpha-value>)',
          alt: 'rgb(var(--brand-accent-alt-rgb) / <alpha-value>)',
          green: 'rgb(var(--brand-accent-green-rgb) / <alpha-value>)',
          purple: 'rgb(var(--brand-accent-purple-rgb) / <alpha-value>)',
        },
        ink: {
          DEFAULT: 'rgb(var(--brand-ink-rgb) / <alpha-value>)',
          soft: 'rgb(var(--brand-ink-soft-rgb) / <alpha-value>)',
        },
        paper: 'rgb(var(--brand-paper-rgb) / <alpha-value>)',
        surface: 'rgb(var(--brand-surface-rgb) / <alpha-value>)',
      },
      borderRadius: {
        card: 'var(--brand-radius)',
        pill: '999px',
      },
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        eyebrow: ['0.75rem', { lineHeight: '1', letterSpacing: '0.16em' }],
        display: ['clamp(2.25rem, 4.6vw, 3.75rem)', { lineHeight: '1.1', letterSpacing: '-0.01em' }],
        title: ['clamp(1.9rem, 4.5vw, 3rem)', { lineHeight: '1.08', letterSpacing: '-0.015em' }],
      },
      boxShadow: {
        paper: '0 1px 2px rgba(23,50,58,0.04), 0 12px 28px -12px rgba(23,50,58,0.18)',
        lift: '0 2px 4px rgba(23,50,58,0.05), 0 24px 48px -20px rgba(23,50,58,0.28)',
      },
      keyframes: {
        drift: {
          '0%, 100%': { transform: 'translate3d(0,0,0) rotate(0deg)' },
          '33%': { transform: 'translate3d(14px,-22px,0) rotate(4deg)' },
          '66%': { transform: 'translate3d(-10px,14px,0) rotate(-3deg)' },
        },
        bob: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        draw: {
          from: { strokeDashoffset: '340' },
          to: { strokeDashoffset: '0' },
        },
        riseIn: {
          from: { opacity: '0', transform: 'translateY(22px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        drift: 'drift 18s ease-in-out infinite',
        'drift-slow': 'drift 26s ease-in-out infinite',
        bob: 'bob 4s ease-in-out infinite',
        marquee: 'marquee 32s linear infinite',
        draw: 'draw 1.1s cubic-bezier(0.65,0,0.35,1) 0.45s forwards',
        'rise-in': 'riseIn 0.7s cubic-bezier(0.16,1,0.3,1) forwards',
      },
    },
  },
  plugins: [],
};

export default config;

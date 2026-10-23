import { Baloo_2, Fredoka, Quicksand, Plus_Jakarta_Sans } from 'next/font/google';
import type { Brand } from '@config/index';

/**
 * next/font requires static imports, so an arbitrary family name from config
 * cannot be loaded. Instead the config picks from this registry by key.
 * Adding a font is a code change - which is fine, it happens rarely.
 */

const baloo = Baloo_2({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-display',
  display: 'swap',
});

const fredoka = Fredoka({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
});

const quicksand = Quicksand({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-display',
  display: 'swap',
});

export const body = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
});

const displayRegistry = { baloo, fredoka, quicksand };

export function displayFont(key: Brand['theme']['displayFont']) {
  return displayRegistry[key];
}

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** +91 98400 12345 -> 919840012345, for wa.me links */
export function waLink(number: string, message?: string) {
  const digits = number.replace(/\D/g, '');
  const q = message ? `?text=${encodeURIComponent(message)}` : '';
  return `https://wa.me/${digits}${q}`;
}

export function telLink(number: string) {
  return `tel:${number.replace(/[^\d+]/g, '')}`;
}

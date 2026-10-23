import { z } from 'zod';

/**
 * The white-label contract.
 *
 * Everything that differs between one school and another lives here and is
 * validated at import time. If a tenant file is missing a logo or has a
 * malformed hex colour, the BUILD fails - not the homepage.
 *
 * Rule of thumb for what belongs in this file vs .env:
 *   - Would it be a security problem in a public git repo?  -> .env
 *   - Is it just wrong for a different school?              -> here
 *   - Does school staff need to edit it without a deploy?   -> database
 */

const hex = z
  .string()
  .regex(/^#([0-9a-fA-F]{6})$/, 'Must be a 6-digit hex colour, e.g. #0E9384');

/** Only fonts registered in src/lib/fonts.ts can be selected. */
export const FONT_KEYS = ['baloo', 'fredoka', 'quicksand'] as const;

export const brandSchema = z.object({
  /** Must match the folder name and TENANT_SLUG. */
  slug: z.string().min(2).regex(/^[a-z0-9-]+$/),

  identity: z.object({
    name: z.string().min(2),
    legalName: z.string().min(2),
    tagline: z.string().min(4),
    /** One sentence. Used for meta description and the footer. */
    description: z.string().min(20).max(180),
    establishedYear: z.number().int().min(1900).max(2100),
  }),

  assets: z.object({
    logo: z.string(),
    logoDark: z.string().optional(),
    /** Square mark only, for favicons and the app icon. */
    mark: z.string(),
    ogImage: z.string(),
    /**
     * Hero background slideshow. Fallback for schools without any consented
     * `media` rows yet (no admin console to upload/consent photos exists
     * currently) - once the DB has consented gallery photos, those win.
     */
    heroImages: z.array(z.string()).optional(),
  }),

  theme: z.object({
    /** Anchor colour. Buttons, links, primary surfaces. */
    primary: hex,
    primaryDark: hex,
    /** The playful one. Highlights, the crayon underline, badges. */
    accent: hex,
    /** Third colour, used sparingly on cards and paper shapes. */
    accentAlt: hex,
    /** Optional fourth and fifth colours, for schools with more than three
     *  program tones to tell apart. Falls back to accentAlt when unset. */
    accentGreen: hex.optional(),
    accentPurple: hex.optional(),
    /** Body and heading text. Should be very dark, not pure black. */
    ink: hex,
    inkSoft: hex,
    /** Page background. */
    paper: hex,
    /** Raised cards and alternating bands. */
    surface: hex,
    displayFont: z.enum(FONT_KEYS),
    /** Corner rounding in px for cards. Playful schools go higher. */
    radius: z.number().int().min(0).max(40),
  }),

  contact: z.object({
    phone: z.string().min(6),
    whatsapp: z.string().min(6),
    email: z.string().email(),
    addressLines: z.array(z.string()).min(1),
    city: z.string(),
    state: z.string(),
    postalCode: z.string(),
    country: z.string().default('IN'),
    geo: z.object({ lat: z.number(), lng: z.number() }),
    /** Shown on the contact page and in JSON-LD. */
    openingHours: z.string(),
  }),

  social: z
    .object({
      instagram: z.string().url().optional(),
      facebook: z.string().url().optional(),
      youtube: z.string().url().optional(),
    })
    .default({}),

  /** Only the age bands this school actually runs. Drives the programs page. */
  programs: z
    .array(
      z.object({
        slug: z.string(),
        name: z.string(),
        ageRange: z.string(),
        hours: z.string(),
        /** One line a parent would actually find useful. */
        summary: z.string(),
        /** Which of the theme colours this program card uses. */
        tone: z.enum(['primary', 'accent', 'accentAlt', 'accentGreen', 'accentPurple']),
        /** Optional character illustration for the program card. Falls back
         *  to an emoji placeholder on the tone colour when unset or missing. */
        illustration: z.string().optional(),
      })
    )
    .min(1),

  /** The daily rhythm shown on the home page timeline. */
  daySchedule: z
    .array(z.object({ time: z.string(), label: z.string(), detail: z.string() }))
    .min(3),

  /** Numbers parents care about. Animated on the home page. */
  proofPoints: z
    .array(z.object({ value: z.number(), suffix: z.string(), label: z.string() }))
    .min(2),

  /** Commercial switches. School B might buy only the marketing site. */
  features: z.object({
    parentPortal: z.boolean(),
    kidsZone: z.boolean(),
    onlineFees: z.boolean(),
    blog: z.boolean(),
    transport: z.boolean(),
  }),

  legal: z.object({
    affiliation: z.string(),
    registrationNumber: z.string().optional(),
    privacyContactEmail: z.string().email(),
  }),

  integrations: z
    .object({
      googleAnalyticsId: z.string().optional(),
      googleMapsPlaceId: z.string().optional(),
      searchConsoleVerification: z.string().optional(),
    })
    .default({}),
});

export type Brand = z.infer<typeof brandSchema>;
export type Program = Brand['programs'][number];

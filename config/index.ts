import { brandSchema, type Brand } from './schema';
import littleStars from './tenants/little-stars';
import sunshineSprouts from './tenants/sunshine-sprouts';
import vPreSchool from './tenants/v-pre-school';

/**
 * Tenant registry.
 *
 * Static imports on purpose. A dynamic `import(./tenants/${slug})` would
 * defeat tree-shaking and stop the build from catching a bad slug, so every
 * tenant is registered here explicitly. Adding a school is one line.
 */
const registry: Record<string, Brand> = {
  'little-stars': littleStars,
  'sunshine-sprouts': sunshineSprouts,
  'v-pre-school': vPreSchool,
};

function resolveBrand(): Brand {
  const slug = process.env.TENANT_SLUG ?? process.env.NEXT_PUBLIC_TENANT_SLUG;

  if (!slug) {
    throw new Error(
      'TENANT_SLUG is not set. Copy .env.example to .env.local and set it to one of: ' +
        Object.keys(registry).join(', ')
    );
  }

  const candidate = registry[slug];
  if (!candidate) {
    throw new Error(
      `Unknown TENANT_SLUG "${slug}". Registered tenants: ${Object.keys(registry).join(', ')}`
    );
  }

  // Fail loudly at build time rather than rendering a broken page.
  const parsed = brandSchema.safeParse(candidate);
  if (!parsed.success) {
    throw new Error(
      `Tenant config "${slug}" is invalid:\n` +
        parsed.error.issues.map((i) => `  - ${i.path.join('.')}: ${i.message}`).join('\n')
    );
  }

  if (parsed.data.slug !== slug) {
    throw new Error(
      `Tenant config "${slug}" declares slug "${parsed.data.slug}". These must match.`
    );
  }

  return parsed.data;
}

export const brand = resolveBrand();
export const tenantSlug = brand.slug;
export type { Brand, Program } from './schema';

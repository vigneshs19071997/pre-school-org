import { and, eq, desc } from 'drizzle-orm';
import { brand, tenantSlug } from '@config/index';
import { db, schema } from '@/db';
import { publicUrl } from '@/lib/r2';
import { Hero } from '@/components/marketing/Hero';
import { Programs, ValuesMarquee, DayTimeline } from '@/components/marketing/Programs';
import {
  ProofPoints,
  KidsTeaser,
  Testimonials,
  CtaBand,
  GalleryStrip,
} from '@/components/marketing/Sections';

/**
 * Home page. Section order follows how a parent decides:
 *   what is this -> what are the options -> what happens all day ->
 *   can I trust the numbers -> what does it look like -> what do others say -> book
 *
 * Revalidated hourly rather than force-static so the hero slideshow picks up
 * newly consented gallery photos without a full redeploy.
 */
export const revalidate = 3600;

export default async function HomePage() {
  /**
   * Same media-consent gate as /gallery: a photo only reaches the hero or
   * the "Our rooms" strip once every child in the frame has consent on
   * file. Never widen this filter.
   */
  let heroImages: { url: string; alt: string }[] = [];
  try {
    const photos = await db
      .select({ id: schema.media.id, key: schema.media.key, alt: schema.media.alt })
      .from(schema.media)
      .where(
        and(
          eq(schema.media.tenantId, tenantSlug),
          eq(schema.media.collection, 'gallery'),
          eq(schema.media.publicOk, true)
        )
      )
      .orderBy(desc(schema.media.createdAt))
      .limit(6);

    heroImages = photos.map((p) => ({ url: publicUrl(p.key), alt: p.alt ?? '' }));
  } catch {
    // DB not provisioned yet - fall through to the static fallback below.
  }

  // No consented photos in the DB yet (no admin console to upload/consent
  // through exists currently) - use the tenant's static fallback images.
  if (heroImages.length === 0 && brand.assets.heroImages) {
    heroImages = brand.assets.heroImages.map((url) => ({ url, alt: '' }));
  }

  return (
    <>
      <Hero images={heroImages} />
      <ValuesMarquee />
      <Programs />
      <DayTimeline />
      <ProofPoints />
      <GalleryStrip images={heroImages.slice(0, 4)} />
      <KidsTeaser />
      <Testimonials />
      <CtaBand />
    </>
  );
}

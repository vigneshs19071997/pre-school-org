import type { Metadata } from 'next';
import { and, eq, desc } from 'drizzle-orm';
import { brand, tenantSlug } from '@config/index';
import { db, schema } from '@/db';
import { publicUrl } from '@/lib/r2';
import { Container, Eyebrow } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';

export const metadata: Metadata = { title: 'Gallery' };
export const revalidate = 3600;

export default async function GalleryPage() {
  /**
   * publicOk is the media-consent gate. A photo only reaches this page once
   * every child in the frame has consent on file. Never widen this filter.
   */
  let photos: { id: string; url: string; alt: string | null }[] = [];
  try {
    const rows = await db
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
      .limit(24);

    photos = rows.map((r) => ({ id: r.id, url: publicUrl(r.key), alt: r.alt }));
  } catch {
    // DB not provisioned yet - fall through to the static fallback below.
  }

  // No consented photos in the DB yet (no admin console to upload/consent
  // through exists currently) - use the tenant's static fallback images.
  if (photos.length === 0 && brand.assets.heroImages) {
    photos = brand.assets.heroImages.map((url, i) => ({ id: `fallback-${i}`, url, alt: null }));
  }

  return (
    <section className="py-16 sm:py-24">
      <Container>
        <Reveal className="max-w-2xl">
          <Eyebrow>Gallery</Eyebrow>
          <h1 className="mt-4 font-display text-title font-extrabold">Ordinary days</h1>
          <p className="mt-5 text-lg leading-relaxed text-ink-soft">
            Every photo here is published with written consent from that child&rsquo;s parents.
            You can withdraw consent at any time and we will take the photo down.
          </p>
        </Reveal>

        {photos.length === 0 ? (
          <p className="mt-14 rounded-card bg-surface p-10 text-center text-ink-soft">
            No photos published yet. Upload from the admin console and mark them consented.
          </p>
        ) : (
          <ul className="mt-14 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {photos.map((p, i) => (
              <Reveal as="li" key={p.id} delay={(i % 4) * 70}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.url}
                  alt={p.alt ?? `A day at ${brand.identity.name}`}
                  loading="lazy"
                  className="paper-card aspect-[4/5] w-full rounded-card object-cover shadow-paper"
                  style={{ transform: `rotate(${i % 2 ? 1.1 : -1.1}deg)` }}
                />
              </Reveal>
            ))}
          </ul>
        )}
      </Container>
    </section>
  );
}

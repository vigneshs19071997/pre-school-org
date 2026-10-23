import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { tenantSlug } from '@config/index';

/**
 * Cloudflare R2 over the S3 API.
 *
 * Two access paths on purpose:
 *   - Public assets (gallery, marketing images) go through R2_PUBLIC_BASE_URL,
 *     a bucket domain or custom domain. Cacheable, no signing.
 *   - Private assets (a class photo feed) get short-lived signed URLs. That
 *     TTL is the actual security. Disabling right-click is not.
 */

const accountId = process.env.R2_ACCOUNT_ID;
const bucket = process.env.R2_BUCKET;

export const r2 = new S3Client({
  region: 'auto',
  endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID ?? '',
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY ?? '',
  },
});

/** All objects are namespaced by tenant so one bucket serves every school. */
export function tenantKey(collection: string, filename: string) {
  const safe = filename.replace(/[^a-zA-Z0-9._-]/g, '-').toLowerCase();
  return `tenants/${tenantSlug}/${collection}/${Date.now()}-${safe}`;
}

/** Public URL for a non-sensitive object. */
export function publicUrl(key: string) {
  const base = process.env.R2_PUBLIC_BASE_URL?.replace(/\/$/, '');
  if (!base) throw new Error('R2_PUBLIC_BASE_URL is not set.');
  return `${base}/${key}`;
}

/** Browser uploads straight to R2. The file never touches your server. */
export async function presignUpload(key: string, contentType: string, expiresIn = 300) {
  return getSignedUrl(
    r2,
    new PutObjectCommand({ Bucket: bucket, Key: key, ContentType: contentType }),
    { expiresIn }
  );
}

export async function deleteObject(key: string) {
  await r2.send(new DeleteObjectCommand({ Bucket: bucket, Key: key }));
}

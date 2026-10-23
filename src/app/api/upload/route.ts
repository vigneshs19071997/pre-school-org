import { NextResponse } from 'next/server';
import { z } from 'zod';
import { presignUpload, tenantKey } from '@/lib/r2';

/**
 * Hands the browser a short-lived signed URL so the file uploads straight to
 * R2 and never passes through the server. Keeps the function fast and off
 * Vercel's request body limit.
 *
 * IMPORTANT: this route must sit behind staff auth before you ship. Right now
 * anyone who finds it can mint an upload URL.
 */

const ALLOWED = ['image/jpeg', 'image/png', 'image/webp', 'audio/mpeg', 'audio/ogg'];

const bodySchema = z.object({
  filename: z.string().min(1).max(200),
  contentType: z.string().refine((v) => ALLOWED.includes(v), 'Unsupported file type'),
  collection: z.enum(['gallery', 'diary', 'staff', 'brand', 'activity']),
});

export async function POST(request: Request) {
  // if (!(await requireStaff(request))) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 });

  const parsed = bodySchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid upload request.' }, { status: 422 });
  }

  const { filename, contentType, collection } = parsed.data;
  const key = tenantKey(collection, filename);

  try {
    const url = await presignUpload(key, contentType);
    return NextResponse.json({ url, key });
  } catch (error) {
    console.error('[upload] presign failed', error);
    return NextResponse.json({ error: 'Could not prepare the upload.' }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import { z } from 'zod';
import { brand, tenantSlug } from '@config/index';
import { db, schema } from '@/db';
import { sendLeadNotificationEmail } from '@/lib/email';

/**
 * Lead capture for the tour form.
 *
 * Validated again here - client-side checks are for the person filling the
 * form, not for trusting the payload.
 *
 * Next step for production: send an OTP before writing the row, and only
 * mark phoneVerified once it is confirmed. That single change removes most
 * junk leads from the admin CRM.
 */

const programSlugs = brand.programs.map((p) => p.slug) as [string, ...string[]];

const leadSchema = z.object({
  parentName: z.string().trim().min(2).max(80),
  phone: z
    .string()
    .transform((v) => v.replace(/\D/g, ''))
    .refine((v) => v.length >= 10 && v.length <= 13, 'Invalid phone number'),
  email: z.string().email().optional().or(z.literal('')),
  childName: z.string().max(80).optional().or(z.literal('')),
  childDob: z.string().optional().or(z.literal('')),
  programSlug: z.enum(programSlugs),
  preferredDate: z.string().optional().or(z.literal('')),
  message: z.string().max(1000).optional().or(z.literal('')),
  source: z.string().max(40).optional(),
});

const empty = (v?: string) => (v && v.length ? v : null);

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: 'Expected JSON.' }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Some details were not valid.', issues: parsed.error.flatten().fieldErrors },
      { status: 422 }
    );
  }

  const d = parsed.data;

  try {
    const [lead] = await db
      .insert(schema.leads)
      .values({
        tenantId: tenantSlug,
        parentName: d.parentName,
        phone: d.phone,
        email: empty(d.email),
        childName: empty(d.childName),
        childDob: empty(d.childDob),
        programSlug: d.programSlug,
        preferredDate: empty(d.preferredDate),
        message: empty(d.message),
        source: d.source ?? 'organic',
        status: 'new',
      })
      .returning({ id: schema.leads.id });

    // TODO: fire the WhatsApp confirmation template here. Parents in India
    // read WhatsApp, not email - this is the notification that matters.

    try {
      await sendLeadNotificationEmail({ id: lead.id, ...d });
    } catch (error) {
      // The lead is safely in the DB either way - a broken mailbox should
      // not turn into a failed submission for the parent.
      console.error('[leads] notification email failed', error);
    }

    return NextResponse.json({ ok: true, id: lead.id }, { status: 201 });
  } catch (error) {
    console.error('[leads] insert failed', error);
    return NextResponse.json({ error: 'Could not save the request.' }, { status: 500 });
  }
}

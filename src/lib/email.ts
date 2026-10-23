import nodemailer from 'nodemailer';

/**
 * SMTP notifications for staff. Parents get WhatsApp (see the TODO in
 * /api/leads); this is purely "a lead came in, go look at the CRM."
 *
 * Failing to send must never fail the request that triggered it - the lead
 * is already in the DB by the time this runs, so a broken mailbox should
 * only be logged, not surfaced to the parent submitting the form.
 */

let transporter: ReturnType<typeof nodemailer.createTransport> | null = null;

function getTransporter() {
  if (transporter) return transporter;

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    throw new Error('SMTP_HOST, SMTP_PORT, SMTP_USER and SMTP_PASS must all be set.');
  }

  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: Number(SMTP_PORT) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  return transporter;
}

export async function sendLeadNotificationEmail(lead: {
  id: string;
  parentName: string;
  phone: string;
  email?: string | null;
  childName?: string | null;
  childDob?: string | null;
  programSlug: string;
  preferredDate?: string | null;
  message?: string | null;
}) {
  const to = process.env.LEADS_NOTIFY_EMAIL;
  if (!to) throw new Error('LEADS_NOTIFY_EMAIL is not set.');

  const rows: [string, string][] = [
    ['Parent', lead.parentName],
    ['Phone', lead.phone],
    ['Email', lead.email || '-'],
    ['Child', lead.childName || '-'],
    ['Child DOB', lead.childDob || '-'],
    ['Group', lead.programSlug],
    ['Preferred visit date', lead.preferredDate || '-'],
    ['Message', lead.message || '-'],
  ];

  const text = rows.map(([k, v]) => `${k}: ${v}`).join('\n');
  const html =
    '<table cellpadding="6" style="border-collapse:collapse;font-family:sans-serif;font-size:14px">' +
    rows
      .map(
        ([k, v]) =>
          `<tr><td style="color:#5A7078;white-space:nowrap"><strong>${k}</strong></td><td>${v}</td></tr>`
      )
      .join('') +
    '</table>';

  await getTransporter().sendMail({
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to,
    subject: `New tour request - ${lead.parentName}`,
    text,
    html,
  });
}

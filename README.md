# Preschool platform

A white-label preschool website built for one client but structured so the same
codebase can be handed to other schools without touching a component.

Next.js 15 (App Router) · Tailwind · Neon Postgres (Drizzle) · Cloudflare R2

---

## Quick start

```bash
npm install
cp .env.example .env.local     # fill in DATABASE_URL and the R2 keys
npm run dev
```

Open http://localhost:3000

To see the white-label layer work, change one line in `.env.local`:

```bash
TENANT_SLUG=sunshine-sprouts
NEXT_PUBLIC_TENANT_SLUG=sunshine-sprouts
```

Restart. The whole site re-themes: colours, display font, school name, copy,
programs, daily schedule, and which features exist at all. Sunshine Sprouts has
no parent portal, so that nav link disappears on its own.

---

## The white-label model

Three tiers. Putting everything in `.env` is the mistake to avoid — env vars are
untyped strings with no git history, and logos are files.

| Tier | Lives in | Holds | Changed by |
|---|---|---|---|
| Secrets + selector | `.env.local` | `TENANT_SLUG`, DB URL, R2 keys, API tokens | You, per deployment |
| Brand | `config/tenants/<slug>.ts` | Name, colours, logos, programs, schedule, feature flags | You, in a PR |
| Content | Neon Postgres | Gallery, staff, events, testimonials, announcements | School staff, in the admin console |

**Rule of thumb.** Would it be a security problem in a public repo? → env. Is it
just *wrong for a different school*? → config. Does school staff need to change
it without a deploy? → database.

### How theming reaches the pixels

`config/tenants/<slug>.ts` → validated by Zod in `config/index.ts` → converted to
CSS custom properties by `src/lib/theme.ts` → injected on `<html>` in the root
layout → consumed by Tailwind tokens in `tailwind.config.ts`.

No component contains a hex value. `bg-brand` resolves to whichever school is
deployed. A bad hex or a missing logo **fails the build**, not the homepage.

Fonts are the one exception: `next/font` needs static imports, so
`src/lib/fonts.ts` is a small registry and config picks from it by key. Adding a
font is a code change — that is fine, it happens rarely.

---

## Adding school number two

1. Create `config/tenants/<slug>.ts` and fill it. Zod tells you what is missing.
2. Register it in the `registry` object in `config/index.ts` (one line).
3. Drop `logo.svg`, `mark.svg`, `og.png` into `public/tenants/<slug>/`.
4. Create a Neon branch, run `npm run db:push`, then `npm run db:seed`.
5. New Vercel project, set the env vars, attach the domain.

If any step needs you to edit a component, something leaked out of config into
code. That is the signal to fix it.

---

## Architecture

Four route groups, each with its own layout tree and rendering strategy.

```
src/app/
  (marketing)/   Static + ISR. SEO, JSON-LD, the admission funnel.
  (kids)/        Client-heavy, prerendered. No analytics, no third parties.
  (portal)/      Not built yet. Auth-gated RSC for enrolled parents.
  (admin)/       Not built yet. Role-gated staff console.
```

The Kids Zone having its own root layout is deliberate, not tidiness. It is the
only clean way to guarantee no analytics script, tag manager, or embed loads on
a page children use.

### Database

`src/db/schema.ts`. Every table carries `tenant_id`, even though you deploy one
school per instance today. It costs nothing now and retrofitting it across
twenty tables plus every query later is genuinely painful. It is also what lets
you flip to shared-database multi-tenancy (hostname → tenant in middleware, plus
row level security) without a schema migration.

```bash
npm run db:push      # push schema to Neon
npm run db:seed      # shared kids-zone activity library + sample rows
npm run db:studio    # browse the data
```

Two columns worth knowing about:

- `students.media_consent` — gate every publish workflow on this. A photo of a
  child on a public page without written parental consent is the fastest way for
  a preschool to get into real trouble.
- `media.public_ok` — only true once *every* child in the frame has consent.
  The gallery page filters on it. Never widen that filter.

### Cloudflare R2

`src/lib/r2.ts`. Two access paths:

- **Public** (gallery, marketing) → `R2_PUBLIC_BASE_URL`, cacheable, unsigned.
- **Private** (a class photo feed) → short-lived signed URLs. That TTL *is* the
  security. Disabling right-click is not.

Browser uploads go straight to R2 via a presigned URL from `/api/upload`, so
files never pass through the server. Objects are namespaced `tenants/<slug>/…`
so one bucket serves every school.

---

## The Kids Zone

The constraint that shapes everything: **your players cannot read.** A
three-year-old cannot parse "Tap the correct answer."

So: every prompt is spoken via the Web Speech API, tap targets are enormous, and
there is no keyboard, no typing, no drag precision. No timer, no score shown to
the child, and no losing — a wrong tap wobbles and asks for another try. Every
round ends in a sticker regardless of how many attempts it took. The only number
on screen is labelled "for grown-ups".

Activities are **content, not code**. `src/lib/kids-content.ts` defines the
shared library; the seed script writes it as `is_global` rows so a school can add
its own activities without duplicating the whole question bank. Five reusable
question types are in the schema; `pick_one` and `audio_match` are implemented in
`QuizPlayer.tsx`, and the other three plug into the same shape.

Privacy is architectural, not a policy page: no accounts for children, no text
input, no chat, no uploads, no ads, no outbound links, no analytics. Anonymous
progress lives in `localStorage`. Nothing identifying a child is collected.

---

## Home page design

Paper-collage direction — layered construction-paper shapes with irregular cut
edges, cards tilted as if taped down, and a crayon stroke that draws itself under
the headline on load. That underline is the signature moment; everything else
stays quiet so it lands.

Motion is deliberately budgeted: one orchestrated load sequence, ambient drift on
the background shapes, `IntersectionObserver` reveals on scroll, and hover lifts
that straighten the tilt. All of it collapses under `prefers-reduced-motion`.

Animation uses CSS keyframes and one small observer component rather than a
motion library — the home page ships 132 kB of JS total.

---

## What is built vs. stubbed

**Working end to end**

- Marketing site: home, about, programs, admissions, gallery, contact
- Tour booking form → validated `/api/leads` → Neon
- Kids Zone: age bands, six activities, full quiz engine, sticker progress
- R2 presigned uploads
- Full white-label layer, verified against two tenants
- JSON-LD `Preschool` block for local SEO

**Deliberately left as the next phase**

- Parent portal and admin console (route groups are scaffolded)
- OTP verification on the tour form. Add this before launch — it removes most
  junk leads on its own. `otp_codes` is already in the schema.
- Auth. `/api/upload` is currently unprotected; put it behind staff auth
  before shipping. The `requireStaff` call site is marked with a comment.
- Razorpay checkout and the WhatsApp send. Both env slots exist.

---

## Deployment

One Vercel project per school. Separate Neon database per school (branching makes
this cheap), one shared R2 bucket namespaced by tenant, custom domain each.

This is single-tenant *deployment* of a multi-tenant-*shaped* codebase: you get
isolation, no noisy-neighbour risk, no cross-tenant leak bugs, and clean
per-school billing — while keeping the option to consolidate later.

Set every variable from `.env.example` in the Vercel project. `TENANT_SLUG` is
the one that decides which school this deployment is.

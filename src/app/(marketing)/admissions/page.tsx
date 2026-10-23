import type { Metadata } from 'next';
import { brand } from '@config/index';
import { Container, Eyebrow } from '@/components/ui/Section';
import { TourForm } from '@/components/marketing/TourForm';
import { Reveal } from '@/components/ui/Reveal';

export const metadata: Metadata = {
  title: 'Admissions',
  description: `How to join ${brand.identity.name}, what it costs, and how to book a visit.`,
};

const steps = [
  { title: 'Book a visit', body: 'Fill the form or WhatsApp us. Visits run weekday mornings and take about forty minutes.' },
  { title: 'See a normal session', body: 'Not a staged tour. You watch a real morning and talk to the teacher your child would have.' },
  { title: 'Trial mornings', body: 'Three short sessions so your child can try the room before anyone commits.' },
  { title: 'Confirm the place', body: 'Paperwork, medical form, media consent, and the first term fee.' },
];

export default function AdmissionsPage() {
  return (
    <>
      <section className="py-16 sm:py-20">
        <Container>
          <Reveal className="max-w-2xl">
            <Eyebrow>Admissions</Eyebrow>
            <h1 className="mt-4 font-display text-title font-extrabold">
              Four steps, no application fee
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-ink-soft">
              We keep groups small, so places are limited. Visiting early in the year gives you
              the most choice of days and timings.
            </p>
          </Reveal>

          {/* Numbered here because this genuinely is a sequence - the order
              carries information the parent needs. */}
          <ol className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 90}>
                <div className="h-full rounded-card bg-surface p-6">
                  <span className="font-display text-3xl font-extrabold text-brand-accent">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h2 className="mt-3 font-display text-xl font-bold">{s.title}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-ink-soft">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      <section id="book" className="scroll-mt-24 pb-20 sm:pb-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
            <Reveal>
              <Eyebrow>Book a visit</Eyebrow>
              <h2 className="mt-4 font-display text-title font-extrabold">
                Tell us a little, and we will call
              </h2>
              <p className="mt-5 leading-relaxed text-ink-soft">
                We only need enough to know which room to show you. The office calls within one
                working day.
              </p>
              <dl className="mt-9 space-y-5 text-sm">
                <div>
                  <dt className="font-semibold">Visiting hours</dt>
                  <dd className="mt-1 text-ink-soft">Weekdays 9:30am to 11:00am</dd>
                </div>
                <div>
                  <dt className="font-semibold">Where</dt>
                  <dd className="mt-1 text-ink-soft">
                    {brand.contact.addressLines.join(', ')}, {brand.contact.city}
                  </dd>
                </div>
              </dl>
            </Reveal>

            <Reveal delay={120}>
              <div className="rounded-card bg-surface p-6 sm:p-9">
                <TourForm />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}

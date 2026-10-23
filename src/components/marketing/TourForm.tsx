'use client';

import { useEffect, useState } from 'react';
import { brand } from '@config/index';
import { cn } from '@/lib/utils';

type Errors = Partial<Record<string, string>>;

const field =
  'w-full rounded-[14px] border-2 border-ink/10 bg-white px-4 py-3.5 text-[0.95rem] ' +
  'outline-none transition-colors placeholder:text-ink-soft/60 focus:border-brand';

const label = 'mb-2 block text-sm font-semibold';

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

export function TourForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'failed'>('idle');
  // Set after mount so the server-rendered markup and first client render
  // match - a date picker limit computed from `new Date()` can otherwise
  // differ by a day between server and browser clocks.
  const [today, setToday] = useState<string>();

  useEffect(() => setToday(todayISO()), []);

  function validate(data: FormData): Errors {
    const e: Errors = {};
    const name = String(data.get('parentName') ?? '').trim();
    const phone = String(data.get('phone') ?? '').replace(/\D/g, '');
    const childDob = String(data.get('childDob') ?? '');
    const preferredDate = String(data.get('preferredDate') ?? '');
    const now = todayISO();

    if (name.length < 2) e.parentName = 'Enter your name so we know who to expect.';
    if (phone.length !== 10) e.phone = 'Enter a 10-digit mobile number.';
    if (!data.get('programSlug')) e.programSlug = 'Pick the group closest to your child’s age.';
    if (!childDob) e.childDob = 'Enter your child’s date of birth.';
    else if (childDob > now) e.childDob = 'Date of birth cannot be in the future.';
    if (!preferredDate) e.preferredDate = 'Choose a preferred visit date.';
    else if (preferredDate < now) e.preferredDate = 'Pick a date from today onwards.';
    return e;
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const found = validate(data);
    setErrors(found);
    if (Object.keys(found).length) return;

    setState('sending');
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(data)),
      });
      if (!res.ok) throw new Error(String(res.status));
      setState('done');
      form.reset();
    } catch {
      setState('failed');
    }
  }

  if (state === 'done') {
    return (
      <div className="rounded-card bg-brand/10 p-8 text-center">
        <p className="font-display text-2xl font-bold">Request received</p>
        <p className="mx-auto mt-3 max-w-sm leading-relaxed text-ink-soft">
          Someone from the office will call you within one working day to fix a time. If it is
          urgent, WhatsApp is faster.
        </p>
        <button
          type="button"
          onClick={() => setState('idle')}
          className="mt-6 font-semibold text-brand underline underline-offset-4"
        >
          Book another visit
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <div>
        <label className={label} htmlFor="parentName">
          Your name
        </label>
        <input
          id="parentName"
          name="parentName"
          required
          className={cn(field, errors.parentName && 'border-brand-alt')}
          placeholder="Divya Ramesh"
          onChange={() => setErrors((e) => ({ ...e, parentName: undefined }))}
        />
        {errors.parentName && <p className="mt-2 text-sm text-brand-alt">{errors.parentName}</p>}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="phone">
            Mobile number
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            inputMode="numeric"
            maxLength={10}
            required
            className={cn(field, errors.phone && 'border-brand-alt')}
            placeholder="98400 12345"
            onChange={(event) => {
              event.target.value = event.target.value.replace(/\D/g, '').slice(0, 10);
              setErrors((e) => ({ ...e, phone: undefined }));
            }}
          />
          {errors.phone && <p className="mt-2 text-sm text-brand-alt">{errors.phone}</p>}
        </div>
        <div>
          <label className={label} htmlFor="childDob">
            Child&rsquo;s date of birth
          </label>
          <input
            id="childDob"
            name="childDob"
            type="date"
            max={today}
            required
            className={cn(field, errors.childDob && 'border-brand-alt')}
            onChange={() => setErrors((e) => ({ ...e, childDob: undefined }))}
          />
          {errors.childDob && <p className="mt-2 text-sm text-brand-alt">{errors.childDob}</p>}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="programSlug">
            Which group
          </label>
          <select
            id="programSlug"
            name="programSlug"
            defaultValue=""
            required
            className={cn(field, errors.programSlug && 'border-brand-alt')}
            onChange={() => setErrors((e) => ({ ...e, programSlug: undefined }))}
          >
            <option value="" disabled>
              Choose a group
            </option>
            {brand.programs.map((p) => (
              <option key={p.slug} value={p.slug}>
                {p.name} · {p.ageRange}
              </option>
            ))}
          </select>
          {errors.programSlug && (
            <p className="mt-2 text-sm text-brand-alt">{errors.programSlug}</p>
          )}
        </div>
        <div>
          <label className={label} htmlFor="preferredDate">
            Preferred visit date
          </label>
          <input
            id="preferredDate"
            name="preferredDate"
            type="date"
            min={today}
            required
            className={cn(field, errors.preferredDate && 'border-brand-alt')}
            onChange={() => setErrors((e) => ({ ...e, preferredDate: undefined }))}
          />
          {errors.preferredDate && (
            <p className="mt-2 text-sm text-brand-alt">{errors.preferredDate}</p>
          )}
        </div>
      </div>

      <div>
        <label className={label} htmlFor="message">
          Anything we should know <span className="font-normal text-ink-soft">(optional)</span>
        </label>
        <textarea id="message" name="message" rows={3} className={field} />
      </div>

      {state === 'failed' && (
        <p className="rounded-[14px] bg-brand-alt/10 px-4 py-3 text-sm text-brand-alt">
          That did not go through. Check your connection and try again, or call the office.
        </p>
      )}

      <button
        type="submit"
        disabled={state === 'sending'}
        className="w-full rounded-pill bg-brand px-7 py-4 font-semibold text-white shadow-paper transition-all hover:bg-brand-dark active:scale-[0.98] disabled:opacity-60"
      >
        {state === 'sending' ? 'Sending…' : 'Request a visit'}
      </button>

      <p className="text-center text-sm text-ink-soft">
        We use your number to arrange the visit and nothing else.
      </p>
    </form>
  );
}

import { brand } from '@config/index';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Section';
import { PaperShapes } from './PaperShapes';
import { HeroSlideshow } from './HeroSlideshow';
import { ScribbleUnderline, SparkleCross, ShootingStar, HeartDoodle } from './Doodles';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';
import { CalendarIcon, ArrowRightIcon, ChevronRightIcon, PeopleIcon, HeartIcon, LeafIcon, MegaphoneIcon } from '@/components/ui/icons';
import { waLink } from '@/lib/utils';

const trustRow = [
  { Icon: PeopleIcon, tone: 'text-brand-alt', title: 'Small groups', detail: '6:1 child–teacher ratio' },
  { Icon: HeartIcon, tone: 'text-brand-accent', title: 'Caring educators', detail: 'Individual attention' },
  { Icon: LeafIcon, tone: 'text-brand-green', title: 'Playful learning', detail: 'Through exploration' },
];

/** A small white "glass" card that floats on the corner of the hero photo. */
function FloatingCard({
  thumbnail,
  iconTone,
  title,
  subtitle,
  className,
}: {
  thumbnail?: string;
  iconTone?: string;
  title: string;
  subtitle: string;
  className?: string;
}) {
  return (
    <div
      className={`paper-card flex items-center gap-3 rounded-2xl bg-white p-3 shadow-lift ${className ?? ''}`}
    >
      {thumbnail ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={thumbnail} alt="" className="h-11 w-11 shrink-0 rounded-xl object-cover" aria-hidden />
      ) : (
        <span
          className={`grid h-11 w-11 shrink-0 place-items-center rounded-full bg-surface ${iconTone ?? 'text-brand'}`}
        >
          <PeopleIcon className="h-5 w-5" />
        </span>
      )}
      <span className="min-w-0 flex-1">
        <span className="block truncate font-display text-sm font-bold text-ink">{title}</span>
        <span className="block text-xs leading-snug text-ink-soft">{subtitle}</span>
      </span>
      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-surface text-ink-soft" aria-hidden>
        <ChevronRightIcon className="h-3.5 w-3.5" />
      </span>
    </div>
  );
}

export function Hero({ images = [] }: { images?: { url: string; alt: string }[] }) {
  const { identity, contact } = brand;

  return (
    <section className="relative overflow-hidden pb-16 pt-10 sm:pb-24 sm:pt-16">
      <PaperShapes />

      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
          {/* ---------------------------------------------------- copy */}
          <div>
            <div className="animate-rise-in opacity-0" style={{ animationDelay: '80ms' }}>
              <span className="inline-flex items-center gap-2 rounded-pill bg-brand-alt/15 px-4 py-2 text-sm font-semibold text-brand-alt">
                <MegaphoneIcon className="h-4 w-4" />
                Admissions open for {new Date().getFullYear()}&ndash;
                {String(new Date().getFullYear() + 1).slice(2)}
              </span>
            </div>

            <h1
              className="relative mt-6 animate-rise-in font-display text-display font-extrabold text-ink opacity-0"
              style={{ animationDelay: '180ms' }}
            >
              A little place to
              <br />
              grow,{' '}
              <span className="relative inline-block">
                <HeartDoodle className="absolute -left-5 -top-4 hidden h-5 w-5 text-brand-alt sm:block" />
                <SparkleCross className="absolute -right-2 -top-5 h-5 w-5 text-brand-accent sm:-right-3 sm:-top-6 sm:h-6 sm:w-6" />
                <span className="text-brand-accent">play</span>
              </span>{' '}
              &amp;
              <br />
              <span className="relative inline-block whitespace-nowrap text-brand-green">
                belong.
                <ScribbleUnderline className="absolute -bottom-3 left-0 h-4 w-[90%] text-brand-accent sm:-bottom-4 sm:h-5" />
              </span>
            </h1>

            <p
              className="mt-7 max-w-xl animate-rise-in text-lg leading-relaxed text-ink-soft opacity-0"
              style={{ animationDelay: '300ms' }}
            >
              {identity.name} is a safe, nurturing and joyful space where children learn, explore
              and build their bright future &mdash; one happy day at a time.
            </p>

            <div
              className="mt-8 flex animate-rise-in flex-wrap gap-3 opacity-0"
              style={{ animationDelay: '400ms' }}
            >
              <Button href="/admissions#book" variant="accent">
                <CalendarIcon className="h-4 w-4" />
                Book a visit
                <ArrowRightIcon className="h-4 w-4" />
              </Button>
              <Button
                href={waLink(contact.whatsapp, `Hi! I'd like to know more about ${identity.name}.`)}
                variant="outline"
              >
                <WhatsAppIcon className="h-4 w-4" />
                Ask on WhatsApp
              </Button>
            </div>

            {/* Trust row - the three things every parent asks first */}
            <ul
              className="mt-10 flex animate-rise-in flex-wrap gap-x-8 gap-y-5 opacity-0"
              style={{ animationDelay: '500ms' }}
            >
              {trustRow.map(({ Icon, tone, title, detail }) => (
                <li key={title} className="flex items-center gap-3">
                  <Icon className={`h-7 w-7 shrink-0 ${tone}`} />
                  <span>
                    <span className="block text-sm font-bold text-ink">{title}</span>
                    <span className="block text-sm text-ink-soft">{detail}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* ------------------------------------------------- hero photo */}
          <div
            className="relative mx-auto aspect-[4/5] w-full max-w-sm animate-rise-in opacity-0 lg:mx-0 lg:max-w-none"
            style={{ animationDelay: '280ms' }}
          >
            <div className="blob-frame relative h-full w-full overflow-hidden bg-surface shadow-lift">
              <HeroSlideshow images={images} contained />
            </div>

            <ShootingStar className="absolute -right-4 -top-6 h-10 w-16 text-brand-accent sm:-right-8 sm:-top-8 sm:h-14 sm:w-20" />

            {images[1] && (
              <FloatingCard
                thumbnail={images[1].url}
                title="Fun Activities"
                subtitle="Creative play & hands-on learning"
                className="absolute -left-2 top-8 w-60 sm:-left-4 sm:top-10 sm:w-60 sm:-rotate-2"
              />
            )}

            <FloatingCard
              iconTone="text-brand-alt"
              title="Parent Updates"
              subtitle="Stay connected with your child's journey"
              className="absolute -bottom-5 -right-2 w-60 rotate-1 sm:-right-6 sm:w-60"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}

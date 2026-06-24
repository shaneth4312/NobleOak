import { CtaButton } from "@/components/ui/CtaButton";
import { Reveal } from "@/components/motion/Reveal";
import { bodyMuted, eyebrowLabel } from "@/lib/brand";
import type { ServiceItem, ServicesSection } from "@/lib/types";
import { sectionInsetX } from "@/lib/sectionLayout";

type ServicesBlockProps = Omit<ServicesSection, "type">;

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      className="size-3.5 shrink-0 transition-transform duration-300 group-hover:translate-x-1"
      aria-hidden="true"
    >
      <path
        d="M4 10h12M11 5l5 5-5 5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ServiceCard({ title, description, link }: ServiceItem) {
  return (
    <article className="group relative flex min-h-[320px] w-full flex-col justify-between overflow-hidden border border-navy/10 bg-white p-10 transition-colors duration-300 hover:border-gold/60">
      {/* Thin gold rule — top accent */}
      <div className="absolute left-0 top-0 h-px w-0 bg-gold transition-all duration-500 group-hover:w-full" aria-hidden="true" />

      <div className="flex flex-col gap-4">
        {/* Corner ornament */}
        <span className="mb-2 inline-block h-px w-10 bg-gold/60" aria-hidden="true" />
        <h3 className="font-brand text-[1.375rem] font-semibold leading-[1.2] text-navy">
          {title}
        </h3>
        <p className={`text-base leading-[1.6] ${bodyMuted}`}>{description}</p>
      </div>

      {link ? (
        link.href ? (
          <a
            className="group mt-8 inline-flex items-center gap-2 font-sans text-[12px] font-medium leading-none tracking-[0.5px] text-navy transition-colors duration-300 hover:text-gold"
            href={link.href}
          >
            {link.label}
            <ArrowIcon />
          </a>
        ) : (
          <span className="mt-8 inline-flex items-center gap-2 font-sans text-[12px] font-medium leading-none tracking-[0.5px] text-navy">
            {link.label}
          </span>
        )
      ) : null}
    </article>
  );
}

export function ServicesBlock({
  eyebrow,
  title,
  seeAllLink,
  cta,
  items,
}: ServicesBlockProps) {
  return (
    <section id="services" className="relative w-full overflow-hidden bg-surface text-navy">
      <div className={`relative z-10 ${sectionInsetX} py-16 lg:pb-[120px] lg:pt-[120px]`}>
        {/* Section header — "—— EYEBROW ——" + heading */}
        <div className="flex w-full flex-col items-center gap-5 text-center">
          {eyebrow ? (
            <div className="rule-ornament w-full max-w-sm">
              <p className={eyebrowLabel}>{eyebrow}</p>
            </div>
          ) : null}

          <h2 className="w-full max-w-3xl font-brand text-3xl font-semibold leading-[1.15] sm:text-4xl lg:text-[44px]">
            {title}
          </h2>
        </div>

        {/* Staggered cards */}
        <div className="mt-14 grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:mt-16">
          {items.map((item, i) => (
            <Reveal key={item.title} delay={i * 100}>
              <ServiceCard {...item} />
            </Reveal>
          ))}
        </div>

        {/* Lead-gen CTA */}
        {cta || seeAllLink ? (
          <div className="mt-14 flex w-full flex-col items-center gap-5 lg:mt-16">
            {cta ? <CtaButton cta={cta} variant="primary" /> : null}
            {seeAllLink ? (
              <CtaButton cta={seeAllLink} variant="link" />
            ) : null}
          </div>
        ) : null}
      </div>
    </section>
  );
}

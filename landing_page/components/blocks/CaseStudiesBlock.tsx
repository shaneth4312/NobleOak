import { CtaButton } from "@/components/ui/CtaButton";
import { Reveal } from "@/components/motion/Reveal";
import { resolveImageSrc, SECTION_IMAGES } from "@/lib/placeholderImage";
import { bodyMuted, eyebrowLabel } from "@/lib/brand";
import type { CaseStudyItem, CaseStudiesSection, HeroCta } from "@/lib/types";
import { sectionInsetX } from "@/lib/sectionLayout";

type CaseStudiesBlockProps = Omit<CaseStudiesSection, "type">;

const CASE_STUDY_FALLBACKS = [
  SECTION_IMAGES.caseStudySuccession,
  SECTION_IMAGES.caseStudyExit,
] as const;

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

function DarkLink({ link }: { link: HeroCta }) {
  const cls = "group link-draw inline-flex items-center gap-2 font-sans text-[12px] font-medium leading-none tracking-[0.5px] text-gold transition-colors duration-300 hover:text-surface";
  const content = (
    <>
      {link.label}
      <ArrowIcon />
    </>
  );

  if (link.href) {
    return <a className={cls} href={link.href}>{content}</a>;
  }
  return <span className={cls}>{content}</span>;
}

function CaseStudyCard({
  title,
  description,
  link,
  image,
  fallback,
}: CaseStudyItem & { fallback: string }) {
  return (
    <article className="group relative flex min-h-[380px] w-full flex-col justify-between overflow-hidden border border-gold/20 bg-navy p-10 lg:p-14">
      {/* Background image with zoom on hover */}
      <img
        src={resolveImageSrc(image?.src, fallback)}
        alt=""
        className="card-img absolute inset-0 h-full w-full object-cover opacity-20"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-navy/95 via-navy/85 to-forest/80" aria-hidden="true" />

      {/* Corner accents */}
      <span className="pointer-events-none absolute left-3 top-3 z-10 h-6 w-6 border-l border-t border-gold/40" aria-hidden="true" />
      <span className="pointer-events-none absolute right-3 top-3 z-10 h-6 w-6 border-r border-t border-gold/40" aria-hidden="true" />

      <div className="relative flex w-full flex-col gap-4 z-10">
        <div className="gold-bar" aria-hidden="true" />
        <h3 className="font-brand text-2xl font-semibold leading-[1.2] text-surface lg:text-[28px]">
          {title}
        </h3>
        <p className="text-base leading-[1.6] text-surface/65">{description}</p>
      </div>

      {link ? (
        <div className="relative z-10 mt-8">
          <DarkLink link={link} />
        </div>
      ) : null}
    </article>
  );
}

export function CaseStudiesBlock({
  eyebrow,
  title,
  items,
  footerText,
  seeAllLink,
}: CaseStudiesBlockProps) {
  return (
    <section id="case-studies" className="relative w-full overflow-hidden bg-white text-navy">
      <div className={`relative z-10 ${sectionInsetX} py-16 lg:pb-[120px] lg:pt-[120px]`}>
        <div className="flex w-full flex-col items-start gap-5">
          {eyebrow ? (
            <>
              <div className="gold-bar" aria-hidden="true" />
              <p className={eyebrowLabel}>{eyebrow}</p>
            </>
          ) : null}
          {title ? (
            <h2 className="mt-1 w-full font-brand text-3xl font-semibold leading-[1.15] text-navy sm:text-4xl lg:text-[40px]">
              {title}
            </h2>
          ) : null}
        </div>

        <div className="mt-10 grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:mt-12">
          {items.map((item, i) => (
            <Reveal key={item.title} delay={i * 120}>
              <CaseStudyCard
                {...item}
                fallback={CASE_STUDY_FALLBACKS[i] ?? SECTION_IMAGES.caseStudySuccession}
              />
            </Reveal>
          ))}
        </div>

        {footerText || seeAllLink ? (
          <div className="mt-12 flex w-full flex-col gap-6 lg:mt-16 lg:flex-row lg:items-center lg:justify-between">
            {footerText ? (
              <p className={`w-full text-xl font-medium leading-[1.6] lg:flex-1 ${bodyMuted}`}>
                {footerText}
              </p>
            ) : (
              <div />
            )}
            {seeAllLink ? <CtaButton cta={seeAllLink} variant="primary" /> : null}
          </div>
        ) : null}
      </div>
    </section>
  );
}

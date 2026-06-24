import { BrandBackgroundShapes } from "@/components/BrandBackgroundShapes";
import { CtaButton } from "@/components/ui/CtaButton";
import { FramedImage } from "@/components/ui/FramedImage";
import { resolveImageSrc, SECTION_IMAGES } from "@/lib/placeholderImage";
import { bodyMuted, eyebrowLabel } from "@/lib/brand";
import type { AboutSection } from "@/lib/types";
import {
  aboutTextColumn,
  sectionGrid,
  sectionInsetLeft,
  sectionInsetRight,
} from "@/lib/sectionLayout";

type AboutBlockProps = Omit<AboutSection, "type">;

function CheckIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="size-4 text-gold" aria-hidden="true">
      <path
        d="M4 10.5L8 14.5L16 6.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function AboutBlock({
  eyebrow,
  title,
  introPrimary,
  introSecondary,
  features,
  closingText,
  link,
  image,
}: AboutBlockProps) {
  return (
    <section id="about" className="relative w-full overflow-hidden bg-white text-navy">
      <BrandBackgroundShapes
        letter="N"
        corner="bottom-left"
        scope="section"
        side="left"
        className="!z-[15]"
      />
      <div className={`relative z-10 ${sectionGrid} items-stretch py-16 lg:py-[120px]`}>
        {/* ── Left column: eyebrow + heading + framed image ── */}
        <div className={`flex w-full flex-col gap-12 self-stretch ${sectionInsetLeft}`}>
          <div className="relative z-20 flex w-full flex-col gap-5">
            {eyebrow ? (
              <>
                <div className="gold-bar" aria-hidden="true" />
                <p className={eyebrowLabel}>{eyebrow}</p>
              </>
            ) : null}

            <h2 className="w-full font-brand text-[2.25rem] font-semibold leading-[1.1] sm:text-5xl lg:text-[46px]">
              {title}
            </h2>
          </div>

          <FramedImage
            src={resolveImageSrc(image?.src, SECTION_IMAGES.about)}
            alt={image?.alt ?? "About section image"}
            className="relative z-10 h-[440px] w-full bg-forest/10"
            gradient="from-navy/20 via-transparent to-transparent"
          />
        </div>

        {/* ── Right column: body copy + features + CTA ── */}
        <div className={`flex w-full flex-col justify-center ${sectionInsetRight} ${aboutTextColumn}`}>
          <div className="flex w-full flex-col gap-5">
            <p className="w-full text-xl leading-[1.6] text-navy">{introPrimary}</p>
            <p className={`w-full text-base leading-[1.6] ${bodyMuted}`}>{introSecondary}</p>
          </div>

          {features.length > 0 ? (
            <ul className="mt-10 flex w-full flex-col gap-5">
              {features.map((feature) => (
                <li key={feature.label} className="flex w-full items-center gap-4">
                  <span className="flex size-8 shrink-0 items-center justify-center border border-gold/40 bg-surface/50">
                    <CheckIcon />
                  </span>
                  <span className="text-lg leading-[1.4] text-navy">{feature.label}</span>
                </li>
              ))}
            </ul>
          ) : null}

          <div className="gold-rule mt-10" />
          <p className={`mt-8 w-full text-base leading-[1.6] ${bodyMuted}`}>{closingText}</p>

          {link ? (
            <div className="mt-10">
              <CtaButton cta={link} variant="primary" />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

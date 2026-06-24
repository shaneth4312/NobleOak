import { BrandBackgroundShapes } from "@/components/BrandBackgroundShapes";
import { CtaButton } from "@/components/ui/CtaButton";
import { resolveImageSrc, SECTION_IMAGES } from "@/lib/placeholderImage";
import { eyebrowLabelOnDark } from "@/lib/brand";
import type { CtaSection } from "@/lib/types";
import { sectionInsetX } from "@/lib/sectionLayout";

type CtaBlockProps = Omit<CtaSection, "type">;

export function CtaBlock({
  badge,
  title,
  description,
  primaryCta,
  secondaryCta,
  image,
}: CtaBlockProps) {
  return (
    <section className="relative w-full overflow-hidden text-surface">
      <img
        src={resolveImageSrc(image?.src, SECTION_IMAGES.cta)}
        alt={image?.alt ?? ""}
        className="absolute inset-0 h-full w-full object-cover"
        aria-hidden={!image?.alt}
      />
      <div
        className="absolute inset-0 bg-gradient-to-br from-navy/96 via-navy/92 to-forest/88"
        aria-hidden="true"
      />
      <BrandBackgroundShapes
        letter="O"
        corner="bottom-left"
        scope="section"
        side="left"
        className="!z-[15]"
      />

      <div
        className={`relative z-10 flex min-h-[520px] w-full flex-col items-center justify-center py-20 ${sectionInsetX} lg:min-h-[680px] lg:py-[120px]`}
      >
        <div className="flex w-full max-w-4xl flex-col items-center gap-6 text-center">
          {badge ? (
            <div className="rule-ornament w-full max-w-sm">
              <p className={eyebrowLabelOnDark}>{badge}</p>
            </div>
          ) : null}

          <h2 className="w-full font-brand text-[2.5rem] font-semibold leading-[1.1] sm:text-5xl lg:text-[54px]">
            {title}
          </h2>

          {description ? (
            <p className="w-full max-w-2xl text-lg leading-[1.6] text-surface/72 lg:text-xl">
              {description}
            </p>
          ) : null}
        </div>

        {primaryCta || secondaryCta ? (
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row lg:mt-12">
            {primaryCta ? <CtaButton cta={primaryCta} variant="primary" /> : null}
            {secondaryCta ? (
              <CtaButton cta={secondaryCta} variant="secondaryOnDark" />
            ) : null}
          </div>
        ) : null}

        {/* Ornamental bottom rule */}
        <div className="gold-rule mt-14 w-full max-w-xs lg:mt-16" />
      </div>
    </section>
  );
}

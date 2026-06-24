import { BrandBackgroundShapes } from "@/components/BrandBackgroundShapes";
import { CtaButton } from "@/components/ui/CtaButton";
import { HeroStats } from "@/components/motion/HeroStats";
import { ParallaxLayer } from "@/components/motion/ParallaxLayer";
import { resolveImageSrc, SECTION_IMAGES } from "@/lib/placeholderImage";
import { eyebrowLabelOnDark } from "@/lib/brand";
import type { HeroSection } from "@/lib/types";
import { heroMinHeight, heroTextColumn, sectionGrid, sectionInsetLeft } from "@/lib/sectionLayout";

type HeroBlockProps = Omit<HeroSection, "type">;

/** Highlight "NobleOak" in the headline with the brand gold */
function HighlightedHeadline({ headline }: { headline: string }) {
  const parts = headline.split(/(\bNobleOak\b)/);
  return (
    <>
      {parts.map((part, i) =>
        part === "NobleOak" ? (
          <span key={i} className="text-gold">
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </>
  );
}

export function HeroBlock({
  eyebrow,
  headline,
  subheading,
  primaryCta,
  secondaryCta,
  stats = [],
  image,
}: HeroBlockProps) {
  return (
    <section className="relative w-full overflow-hidden bg-navy text-surface">
      <div className={`relative z-10 ${sectionGrid} ${heroMinHeight}`}>
        {/* ── Text column ── */}
        <div
          className={`flex min-h-0 w-full flex-col justify-between border-r border-gold/20 bg-navy py-16 lg:pb-[80px] lg:pt-[160px] ${sectionInsetLeft} ${heroMinHeight}`}
        >
          <div className={`flex flex-col items-start gap-6 ${heroTextColumn}`}>
            {eyebrow ? (
              <div className="rule-ornament">
                <p className={eyebrowLabelOnDark}>{eyebrow}</p>
              </div>
            ) : null}

            <h1 className="w-full font-brand text-[2.75rem] font-semibold leading-[1.1] text-surface sm:text-5xl lg:text-[58px]">
              <HighlightedHeadline headline={headline} />
            </h1>

            <p className="w-full text-lg leading-[1.6] text-surface/70 lg:text-xl">
              {subheading}
            </p>

            {primaryCta || secondaryCta ? (
              <div className="mt-2 flex flex-wrap items-center gap-4">
                {primaryCta ? <CtaButton cta={primaryCta} variant="primary" /> : null}
                {secondaryCta ? (
                  <CtaButton cta={secondaryCta} variant="secondaryOnDark" />
                ) : null}
              </div>
            ) : null}
          </div>

          {/* Stats with count-up animation */}
          {stats.length > 0 ? (
            <div className={`mt-16 w-full lg:mt-0 ${heroTextColumn}`}>
              <HeroStats stats={stats} mutedClassName="text-surface/65" />
            </div>
          ) : null}
        </div>

        {/* ── Image column — framed with gold border + parallax ── */}
        <div className={`relative min-h-[420px] w-full overflow-hidden ${heroMinHeight}`}>
          {/* Thin gold inner-edge rule — echoes the left border of the text column */}
          <div className="pointer-events-none absolute inset-0 z-20 border-l border-gold/20" />
          {/* Corner bracket accents */}
          <span className="pointer-events-none absolute left-4 top-4 z-20 h-8 w-8 border-l border-t border-gold/60" aria-hidden="true" />
          <span className="pointer-events-none absolute right-4 top-4 z-20 h-8 w-8 border-r border-t border-gold/60" aria-hidden="true" />
          <span className="pointer-events-none absolute bottom-4 left-4 z-20 h-8 w-8 border-b border-l border-gold/60" aria-hidden="true" />
          <span className="pointer-events-none absolute bottom-4 right-4 z-20 h-8 w-8 border-b border-r border-gold/60" aria-hidden="true" />

          <ParallaxLayer strength={0.28} className="absolute inset-0 z-0">
            <div
              className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-tl from-navy/40 via-transparent to-gold/10"
              aria-hidden="true"
            />
            <img
              src={resolveImageSrc(image?.src, SECTION_IMAGES.hero)}
              alt={image?.alt ?? "Hero image"}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </ParallaxLayer>

          <BrandBackgroundShapes letter="O" corner="bottom-right" scope="column" />
        </div>
      </div>
    </section>
  );
}

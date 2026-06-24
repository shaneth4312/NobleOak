import { BrandBackgroundShapes } from "@/components/BrandBackgroundShapes";
import { CtaButton } from "@/components/ui/CtaButton";
import { ParallaxLayer } from "@/components/motion/ParallaxLayer";
import { bodyMuted, eyebrowLabel } from "@/lib/brand";
import { resolveImageSrc, SECTION_IMAGES, SOCIAL_PROOF_LOGOS } from "@/lib/placeholderImage";
import type { WhyUsSection } from "@/lib/types";
import {
  sectionGrid,
  sectionInsetLeft,
  splitPanelMinHeight,
} from "@/lib/sectionLayout";

type WhyUsBlockProps = Omit<WhyUsSection, "type">;

function TrustLogoStrip({ logos }: { logos: readonly string[] }) {
  return (
    <div className="flex flex-wrap items-center gap-5">
      {logos.map((src) => (
        <img
          key={src}
          src={src}
          alt=""
          aria-hidden="true"
          className="h-6 w-auto max-w-[90px] object-contain opacity-40"
        />
      ))}
    </div>
  );
}

export function WhyUsBlock({
  eyebrow,
  title,
  items,
  cta,
  socialProof,
  image,
}: WhyUsBlockProps) {
  const trustLogos = socialProof?.logos ?? SOCIAL_PROOF_LOGOS;

  return (
    <section id="why-us" className="relative w-full overflow-hidden bg-white text-navy">
      <div className={`relative z-10 ${sectionGrid} items-stretch ${splitPanelMinHeight}`}>
        {/* ── Left column ── */}
        <div
          className={`flex w-full flex-col justify-between py-16 lg:py-[120px] ${sectionInsetLeft} ${splitPanelMinHeight}`}
        >
          <div className="flex w-full flex-col gap-5">
            {eyebrow ? (
              <>
                <div className="gold-bar" aria-hidden="true" />
                <p className={eyebrowLabel}>{eyebrow}</p>
              </>
            ) : null}

            <h2 className="w-full font-brand text-3xl font-semibold leading-[1.15] sm:text-4xl lg:text-[40px]">
              {title}
            </h2>
          </div>

          {items.length > 0 ? (
            <ul className="mt-10 flex w-full flex-col gap-8 lg:mt-12">
              {items.map((item) => (
                <li
                  key={item.number}
                  className="flex w-full flex-col gap-2 border-l border-gold/40 pl-5"
                >
                  <div className="flex items-start gap-3 text-lg leading-[1.4]">
                    <span className="shrink-0 font-brand text-base font-semibold text-gold">
                      {item.number}
                    </span>
                    <span className="font-brand font-medium">{item.title}</span>
                  </div>
                  <p className={`pl-8 text-base leading-[1.6] ${bodyMuted}`}>{item.description}</p>
                </li>
              ))}
            </ul>
          ) : null}

          <div className="mt-10 flex flex-col gap-6 lg:mt-12">
            {cta ? <CtaButton cta={cta} variant="primary" /> : null}

            {socialProof ? (
              <div className="flex flex-col gap-3">
                <TrustLogoStrip logos={trustLogos} />
                <p className="text-sm leading-[1.4] text-forest">{socialProof.label}</p>
              </div>
            ) : null}
          </div>
        </div>

        {/* ── Right column: full-height image with parallax ── */}
        <div
          className={`relative min-h-[360px] w-full overflow-hidden border-l border-gold/15 bg-navy/5 ${splitPanelMinHeight}`}
        >
          {/* Corner accents */}
          <span className="pointer-events-none absolute left-4 top-4 z-20 h-7 w-7 border-l border-t border-gold/50" aria-hidden="true" />
          <span className="pointer-events-none absolute right-4 top-4 z-20 h-7 w-7 border-r border-t border-gold/50" aria-hidden="true" />
          <span className="pointer-events-none absolute bottom-4 left-4 z-20 h-7 w-7 border-b border-l border-gold/50" aria-hidden="true" />
          <span className="pointer-events-none absolute bottom-4 right-4 z-20 h-7 w-7 border-b border-r border-gold/50" aria-hidden="true" />

          <ParallaxLayer strength={0.25} className="absolute inset-0 z-0">
            <div
              className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-navy/30 to-transparent"
              aria-hidden="true"
            />
            <img
              src={resolveImageSrc(image?.src, SECTION_IMAGES.whyUs)}
              alt={image?.alt ?? "Why choose us"}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </ParallaxLayer>

          <BrandBackgroundShapes letter="O" corner="bottom-right" scope="column" />
        </div>
      </div>
    </section>
  );
}

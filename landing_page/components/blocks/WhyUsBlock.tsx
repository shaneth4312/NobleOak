"use client";

import { handleAnchorClick } from "@/lib/scrollToSection";
import {
  resolveImageSrc,
  SECTION_IMAGES,
  SOCIAL_PROOF_LOGOS,
} from "@/lib/placeholderImage";
import type { WhyUsSection } from "@/lib/types";

type WhyUsBlockProps = Omit<WhyUsSection, "type">;

export function WhyUsBlock({
  eyebrow,
  title,
  items,
  cta,
  socialProof,
  image,
}: WhyUsBlockProps) {
  const imageSrc = resolveImageSrc(image?.src, SECTION_IMAGES.whyUs);
  const socialProofLogos = socialProof?.logos?.length
    ? socialProof.logos
    : SOCIAL_PROOF_LOGOS;

  return (
    <section id="why-us" className="bg-white py-16 text-navy lg:py-24">
      <div className="mx-auto max-w-7xl px-8 lg:px-16">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start lg:gap-16">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-3">
              {eyebrow ? (
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-forest">
                  {eyebrow}
                </p>
              ) : null}

              <h2 className="font-brand text-3xl font-semibold leading-tight sm:text-4xl">
                {title}
              </h2>
            </div>

            {items.length > 0 ? (
              <ul className="flex flex-col gap-6">
                {items.map((item) => (
                  <li
                    key={item.number}
                    className="border-l-2 border-gold/40 pl-4"
                  >
                    <div className="flex items-baseline gap-3">
                      <span className="font-brand text-sm font-semibold text-gold">
                        {item.number}
                      </span>
                      <h3 className="font-brand text-lg font-semibold text-navy">
                        {item.title}
                      </h3>
                    </div>
                    <p className="mt-2 text-base leading-relaxed text-charcoal/75">
                      {item.description}
                    </p>
                  </li>
                ))}
              </ul>
            ) : null}

            {cta || socialProof ? (
              <div className="flex flex-col gap-4">
                {cta ? (
                  cta.href ? (
                    <a
                      href={cta.href}
                      className="inline-flex w-fit items-center justify-center rounded bg-navy px-6 py-3 text-[13px] font-semibold tracking-wide text-surface transition-colors hover:bg-forest"
                      onClick={(e) => handleAnchorClick(e, cta.href)}
                    >
                      {cta.label}
                    </a>
                  ) : (
                    <span className="inline-flex w-fit rounded bg-navy px-6 py-3 text-[13px] font-semibold text-surface">
                      {cta.label}
                    </span>
                  )
                ) : null}

                {socialProof ? (
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-wrap items-center gap-4">
                      {socialProofLogos.map((logoSrc) => (
                        <img
                          key={logoSrc}
                          src={resolveImageSrc(logoSrc)}
                          alt=""
                          className="h-6 w-auto max-w-[90px] object-contain opacity-50"
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                    <p className="text-sm text-forest">{socialProof.label}</p>
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>

          <div className="overflow-hidden rounded-xl border border-navy/10 bg-surface shadow-lg shadow-navy/5">
            <img
              src={imageSrc}
              alt={image?.alt ?? "Lorem ipsum dolor sit amet"}
              className="aspect-[4/5] w-full object-cover sm:aspect-[5/6]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

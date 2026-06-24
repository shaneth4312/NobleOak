"use client";

import { handleAnchorClick } from "@/lib/scrollToSection";
import { resolveImageSrc, SECTION_IMAGES } from "@/lib/placeholderImage";
import type { CaseStudiesSection, CaseStudyItem } from "@/lib/types";

type CaseStudiesBlockProps = Omit<CaseStudiesSection, "type">;

function CaseStudyCard({
  title,
  description,
  link,
  image,
  fallbackImage,
}: CaseStudyItem & { fallbackImage: string }) {
  const imageSrc = resolveImageSrc(image?.src, fallbackImage);

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-lg border border-navy/10 bg-navy text-surface shadow-sm">
      <div className="relative h-48 overflow-hidden">
        <img
          src={imageSrc}
          alt={title}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/70 to-navy/20" />
      </div>

      <div className="flex flex-1 flex-col p-6 lg:p-8">
        <h3 className="font-brand text-xl font-semibold leading-snug">{title}</h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-surface/75 lg:text-base">
          {description}
        </p>

        {link ? (
          link.href ? (
            <a
              href={link.href}
              className="mt-6 inline-flex text-sm font-medium text-gold transition-colors hover:text-surface"
              onClick={(e) => handleAnchorClick(e, link.href)}
            >
              {link.label} →
            </a>
          ) : (
            <span className="mt-6 text-sm font-medium text-gold">{link.label}</span>
          )
        ) : null}
      </div>
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
  const caseStudyFallbacks = [
    SECTION_IMAGES.caseStudySuccession,
    SECTION_IMAGES.caseStudyExit,
  ];

  return (
    <section id="case-studies" className="bg-white py-16 text-navy lg:py-24">
      <div className="mx-auto max-w-7xl px-8 lg:px-16">
        <div className="max-w-2xl">
          {eyebrow ? (
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-forest">
              {eyebrow}
            </p>
          ) : null}

          {title ? (
            <h2 className="mt-3 font-brand text-3xl font-semibold leading-tight sm:text-4xl">
              {title}
            </h2>
          ) : null}
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:mt-14">
          {items.map((item, index) => (
            <CaseStudyCard
              key={item.title}
              {...item}
              fallbackImage={
                caseStudyFallbacks[index] ?? SECTION_IMAGES.caseStudySuccession
              }
            />
          ))}
        </div>

        {footerText || seeAllLink ? (
          <div className="mt-12 flex flex-col gap-4 lg:mt-14 lg:flex-row lg:items-center lg:justify-between">
            {footerText ? (
              <p className="max-w-2xl text-base leading-relaxed text-charcoal/75">
                {footerText}
              </p>
            ) : null}

            {seeAllLink ? (
              seeAllLink.href ? (
                <a
                  href={seeAllLink.href}
                  className="inline-flex w-fit items-center justify-center rounded bg-navy px-6 py-3 text-[13px] font-semibold tracking-wide text-surface transition-colors hover:bg-forest"
                  onClick={(e) => handleAnchorClick(e, seeAllLink.href)}
                >
                  {seeAllLink.label}
                </a>
              ) : (
                <span className="inline-flex w-fit rounded bg-navy px-6 py-3 text-[13px] font-semibold text-surface">
                  {seeAllLink.label}
                </span>
              )
            ) : null}
          </div>
        ) : null}
      </div>
    </section>
  );
}

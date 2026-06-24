"use client";

import { handleAnchorClick } from "@/lib/scrollToSection";
import { resolveImageSrc, SECTION_IMAGES } from "@/lib/placeholderImage";
import type { AboutSection } from "@/lib/types";

type AboutBlockProps = Omit<AboutSection, "type">;

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
  const imageSrc = resolveImageSrc(image?.src, SECTION_IMAGES.about);

  return (
    <section id="about" className="bg-surface py-16 text-navy lg:py-24">
      <div className="mx-auto max-w-7xl px-8 lg:px-16">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start lg:gap-16">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              {eyebrow ? (
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-forest">
                  {eyebrow}
                </p>
              ) : null}

              <h2 className="font-brand text-3xl font-semibold leading-tight sm:text-4xl lg:text-[2.75rem]">
                {title}
              </h2>
            </div>

            <div className="flex flex-col gap-4">
              <p className="text-lg leading-relaxed text-navy">{introPrimary}</p>
              <p className="text-base leading-relaxed text-charcoal/75">{introSecondary}</p>
            </div>

            {features.length > 0 ? (
              <ul className="flex flex-col gap-3">
                {features.map((feature) => (
                  <li key={feature.label} className="flex items-start gap-3">
                    <span
                      className="mt-2 size-1.5 shrink-0 rounded-full bg-gold"
                      aria-hidden="true"
                    />
                    <span className="text-base leading-snug text-navy">{feature.label}</span>
                  </li>
                ))}
              </ul>
            ) : null}

            <p className="border-l-2 border-gold/40 pl-4 text-base leading-relaxed text-charcoal/75">
              {closingText}
            </p>

            {link ? (
              link.href ? (
                <a
                  href={link.href}
                  className="inline-flex w-fit items-center text-sm font-semibold tracking-wide text-forest underline-offset-4 transition-colors hover:text-gold hover:underline"
                  onClick={(e) => handleAnchorClick(e, link.href)}
                >
                  {link.label} →
                </a>
              ) : (
                <span className="text-sm font-semibold text-forest">{link.label}</span>
              )
            ) : null}
          </div>

          <div className="lg:pt-8">
            <div className="overflow-hidden rounded-xl border border-navy/10 bg-white p-3 shadow-lg shadow-navy/5">
              <img
                src={imageSrc}
                alt={image?.alt ?? "Lorem ipsum dolor sit amet"}
                className="aspect-[4/5] w-full rounded-lg object-cover sm:aspect-[5/6]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

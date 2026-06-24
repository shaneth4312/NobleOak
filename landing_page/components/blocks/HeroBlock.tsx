"use client";

import { handleAnchorClick } from "@/lib/scrollToSection";
import { resolveImageSrc, SECTION_IMAGES } from "@/lib/placeholderImage";
import type { HeroSection } from "@/lib/types";

type HeroBlockProps = Omit<HeroSection, "type">;

type ActionLinkProps = {
  label: string;
  href?: string;
  variant: "primary" | "secondary";
};

function ActionLink({ label, href, variant }: ActionLinkProps) {
  const className =
    variant === "primary"
      ? "inline-flex items-center justify-center rounded bg-gold px-6 py-3 text-[13px] font-semibold tracking-wide text-navy transition-colors hover:bg-surface"
      : "inline-flex items-center justify-center rounded border border-surface/35 px-6 py-3 text-[13px] font-medium text-surface transition-colors hover:border-gold hover:text-gold";

  if (href) {
    return (
      <a href={href} className={className} onClick={(e) => handleAnchorClick(e, href)}>
        {label}
      </a>
    );
  }

  return <span className={className}>{label}</span>;
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
  const imageSrc = resolveImageSrc(image?.src, SECTION_IMAGES.hero);

  return (
    <section className="relative overflow-hidden bg-navy text-surface">
      <div className="mx-auto grid max-w-7xl gap-10 px-8 py-14 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-16 lg:py-20">
        <div className="order-2 flex flex-col gap-6 lg:order-1">
          {eyebrow ? (
            <p className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.2em] text-gold">
              <span className="size-1.5 rounded-full bg-gold" aria-hidden="true" />
              {eyebrow}
            </p>
          ) : null}

          <h1 className="font-brand text-4xl font-semibold leading-tight sm:text-5xl lg:text-[3.25rem] lg:leading-[1.12]">
            {headline}
          </h1>

          <p className="max-w-xl text-base leading-relaxed text-surface/75 lg:text-lg">
            {subheading}
          </p>

          {primaryCta || secondaryCta ? (
            <div className="flex flex-wrap items-center gap-3 pt-1">
              {primaryCta ? (
                <ActionLink
                  label={primaryCta.label}
                  href={primaryCta.href}
                  variant="primary"
                />
              ) : null}
              {secondaryCta ? (
                <ActionLink
                  label={secondaryCta.label}
                  href={secondaryCta.href}
                  variant="secondary"
                />
              ) : null}
            </div>
          ) : null}

          {stats.length > 0 ? (
            <dl className="mt-4 grid gap-6 border-t border-surface/15 pt-8 sm:grid-cols-3">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <dt className="font-brand text-2xl font-semibold text-gold sm:text-3xl">
                    {stat.value}
                  </dt>
                  <dd className="mt-1 text-sm leading-snug text-surface/60">{stat.label}</dd>
                </div>
              ))}
            </dl>
          ) : null}
        </div>

        <div className="order-1 lg:order-2">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-2xl shadow-black/30 sm:aspect-[5/6] lg:aspect-[4/5]">
            <img
              src={imageSrc}
              alt={image?.alt ?? "Lorem ipsum dolor sit amet"}
              className="h-full w-full object-cover"
            />
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/50 via-transparent to-transparent"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { handleAnchorClick } from "@/lib/scrollToSection";
import type { CtaSection } from "@/lib/types";

type CtaBlockProps = Omit<CtaSection, "type">;

type ActionLinkProps = {
  label: string;
  href?: string;
  variant: "primary" | "secondary";
};

function ActionLink({ label, href, variant }: ActionLinkProps) {
  const className =
    variant === "primary"
      ? "inline-flex items-center justify-center rounded bg-gold px-6 py-3 text-[13px] font-semibold tracking-wide text-navy transition-colors hover:bg-surface"
      : "inline-flex items-center justify-center rounded border border-surface/30 px-6 py-3 text-[13px] font-medium text-surface transition-colors hover:border-gold hover:text-gold";

  if (href) {
    return (
      <a
        href={href}
        className={className}
        onClick={(e) => handleAnchorClick(e, href)}
      >
        {label}
      </a>
    );
  }

  return <span className={className}>{label}</span>;
}

export function CtaBlock({
  badge,
  title,
  description,
  primaryCta,
  secondaryCta,
  image,
}: CtaBlockProps) {
  const imageSrc = image?.src ?? "/images/sections/cta-1.jpg";
  const hideImageFromAssistiveTech = !image?.alt;

  return (
    <section className="py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-8 lg:px-16">
        <div className="overflow-hidden rounded-2xl bg-navy text-surface shadow-xl shadow-navy/20 lg:grid lg:grid-cols-5">
          <div className="relative min-h-[220px] lg:col-span-2 lg:min-h-full">
            <img
              src={imageSrc}
              alt={image?.alt ?? ""}
              className="absolute inset-0 h-full w-full object-cover"
              aria-hidden={hideImageFromAssistiveTech}
            />
            <div
              className="absolute inset-0 bg-navy/30 lg:bg-gradient-to-r lg:from-transparent lg:to-navy/80"
              aria-hidden="true"
            />
          </div>

          <div className="flex flex-col justify-center gap-5 p-8 lg:col-span-3 lg:p-12">
            {badge ? (
              <span className="inline-flex w-fit rounded-full border border-gold/40 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.15em] text-gold">
                {badge}
              </span>
            ) : null}

            <h2 className="font-brand text-3xl font-semibold leading-tight sm:text-4xl">
              {title}
            </h2>

            {description ? (
              <p className="max-w-xl text-base leading-relaxed text-surface/75 lg:text-lg">
                {description}
              </p>
            ) : null}

            {primaryCta || secondaryCta ? (
              <div className="flex flex-wrap items-center gap-3 pt-2">
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
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { handleAnchorClick } from "@/lib/scrollToSection";
import type { ServiceItem, ServicesSection } from "@/lib/types";

type ServicesBlockProps = Omit<ServicesSection, "type">;

function ServiceCard({
  index,
  title,
  description,
  link,
}: ServiceItem & { index: number }) {
  return (
    <article className="group flex h-full flex-col rounded-lg border border-navy/10 bg-surface p-6 shadow-sm transition-shadow hover:shadow-md lg:p-8">
      <span className="font-brand text-sm font-semibold text-gold">
        {String(index + 1).padStart(2, "0")}
      </span>

      <h3 className="mt-4 font-brand text-xl font-semibold leading-snug text-navy">
        {title}
      </h3>

      <p className="mt-3 flex-1 text-sm leading-relaxed text-charcoal/75 lg:text-base">
        {description}
      </p>

      {link ? (
        link.href ? (
          <a
            href={link.href}
            className="mt-6 inline-flex text-sm font-medium text-forest transition-colors hover:text-gold"
            onClick={(e) => handleAnchorClick(e, link.href)}
          >
            {link.label}
          </a>
        ) : (
          <span className="mt-6 text-sm font-medium text-forest">{link.label}</span>
        )
      ) : null}
    </article>
  );
}

export function ServicesBlock({
  eyebrow,
  title,
  seeAllLink,
  cta,
  items,
}: ServicesBlockProps) {
  return (
    <section id="services" className="bg-white py-16 text-navy lg:py-24">
      <div className="mx-auto max-w-7xl px-8 lg:px-16">
        <div className="flex max-w-2xl flex-col gap-3">
          {eyebrow ? (
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold">
              {eyebrow}
            </p>
          ) : null}

          <h2 className="font-brand text-3xl font-semibold leading-tight sm:text-4xl">
            {title}
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-6">
          {items.map((item, index) => (
            <ServiceCard key={item.title} index={index} {...item} />
          ))}
        </div>

        {cta || seeAllLink ? (
          <div className="mt-12 flex flex-wrap items-center gap-4 lg:mt-14">
            {cta ? (
              cta.href ? (
                <a
                  href={cta.href}
                  className="inline-flex items-center justify-center rounded bg-navy px-6 py-3 text-[13px] font-semibold tracking-wide text-surface transition-colors hover:bg-forest"
                  onClick={(e) => handleAnchorClick(e, cta.href)}
                >
                  {cta.label}
                </a>
              ) : (
                <span className="inline-flex rounded bg-navy px-6 py-3 text-[13px] font-semibold text-surface">
                  {cta.label}
                </span>
              )
            ) : null}

            {seeAllLink ? (
              seeAllLink.href ? (
                <a
                  href={seeAllLink.href}
                  className="text-sm font-medium text-charcoal/70 underline-offset-4 transition-colors hover:text-navy hover:underline"
                  onClick={(e) => handleAnchorClick(e, seeAllLink.href)}
                >
                  {seeAllLink.label}
                </a>
              ) : (
                <span className="text-sm font-medium text-charcoal/70">{seeAllLink.label}</span>
              )
            ) : null}
          </div>
        ) : null}
      </div>
    </section>
  );
}

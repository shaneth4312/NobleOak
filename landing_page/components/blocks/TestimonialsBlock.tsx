"use client";

import { useCallback, useState } from "react";
import { BrandBackgroundShapes } from "@/components/BrandBackgroundShapes";
import { CtaButton } from "@/components/ui/CtaButton";
import { ParallaxLayer } from "@/components/motion/ParallaxLayer";
import { resolveImageSrc, SECTION_IMAGES } from "@/lib/placeholderImage";
import { eyebrowLabel } from "@/lib/brand";
import type { Testimonial, TestimonialsSection } from "@/lib/types";
import { sectionGridImageLeft, sectionInsetRight, splitPanelMinHeight } from "@/lib/sectionLayout";

type TestimonialsBlockProps = Omit<TestimonialsSection, "type">;

function QuoteIcon() {
  return (
    <svg viewBox="0 0 34 24" fill="currentColor" className="h-5 w-[30px] rotate-180 text-gold" aria-hidden="true">
      <path d="M13.5 0H8.7C3.9 0 0 3.9 0 8.7V24h8.7V12H4.3C4.3 7.7 7.7 4.3 12 4.3V0h1.5Zm20.3 0h-4.8C24.2 0 20.3 3.9 20.3 8.7V24H29V12h-4.4c0-4.3 3.4-7.7 7.7-7.7V0Z" />
    </svg>
  );
}

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-1" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }, (_, i) => (
        <svg key={i} viewBox="0 0 14 14" fill="currentColor" className="size-3 text-gold" aria-hidden="true">
          <path d="M7 1.5l1.55 3.14 3.47.5-2.51 2.45.59 3.45L7 9.4l-3.1 1.64.59-3.45-2.51-2.45 3.47-.5L7 1.5Z" />
        </svg>
      ))}
    </div>
  );
}

function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="size-4" aria-hidden="true">
      <path
        d={direction === "left" ? "M12 4L6 10l6 6" : "M8 4l6 6-6 6"}
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TestimonialNavButton({
  direction,
  onClick,
  label,
}: {
  direction: "left" | "right";
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="inline-flex size-10 items-center justify-center border border-gold/35 bg-white text-navy transition-colors duration-300 hover:border-gold hover:bg-gold hover:text-navy"
    >
      <ChevronIcon direction={direction} />
    </button>
  );
}

function TestimonialContent({ testimonial, slideKey }: { testimonial: Testimonial; slideKey: number }) {
  const authorLabel = [testimonial.authorName, testimonial.authorRole].filter(Boolean).join(", ");

  return (
    <div key={slideKey} className="testimonial-fade-in flex w-full flex-col items-end gap-5">
      <blockquote className="w-full font-sans text-xl font-light leading-[1.7] italic text-navy">
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>

      <div className="flex items-center gap-4">
        <div className="flex flex-col items-end gap-2">
          <StarRating count={testimonial.rating} />
          <p className="font-sans text-[12px] font-medium leading-none tracking-[0.5px] text-forest">
            {authorLabel}
          </p>
        </div>

        {testimonial.avatar ? (
          <div className="relative size-[46px] shrink-0 overflow-hidden border border-gold/30 bg-white">
            <img
              src={resolveImageSrc(testimonial.avatar)}
              alt={testimonial.authorName}
              className="absolute inset-0 size-full object-cover"
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}

export function TestimonialsBlock({
  eyebrow,
  title,
  testimonials,
  seeAllLink,
  image,
}: TestimonialsBlockProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [slideKey, setSlideKey] = useState(0);
  const total = testimonials.length;
  const activeTestimonial = testimonials[activeIndex];

  const goToPrevious = useCallback(() => {
    setSlideKey((k) => k + 1);
    setActiveIndex((i) => (i === 0 ? total - 1 : i - 1));
  }, [total]);

  const goToNext = useCallback(() => {
    setSlideKey((k) => k + 1);
    setActiveIndex((i) => (i === total - 1 ? 0 : i + 1));
  }, [total]);

  if (!activeTestimonial) return null;

  return (
    <section id="testimonials" className="relative w-full overflow-hidden text-navy">
      <div className={`relative z-10 ${sectionGridImageLeft} ${splitPanelMinHeight}`}>
        {/* ── Left: full-height image with parallax ── */}
        <div className={`relative min-h-[320px] w-full overflow-hidden bg-forest ${splitPanelMinHeight}`}>
          {/* Corner accents */}
          <span className="pointer-events-none absolute left-4 top-4 z-20 h-7 w-7 border-l border-t border-gold/60" aria-hidden="true" />
          <span className="pointer-events-none absolute right-4 top-4 z-20 h-7 w-7 border-r border-t border-gold/60" aria-hidden="true" />
          <span className="pointer-events-none absolute bottom-4 left-4 z-20 h-7 w-7 border-b border-l border-gold/60" aria-hidden="true" />
          <span className="pointer-events-none absolute bottom-4 right-4 z-20 h-7 w-7 border-b border-r border-gold/60" aria-hidden="true" />

          <ParallaxLayer strength={0.3} className="absolute inset-0 z-0">
            <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-tr from-navy/50 to-transparent" aria-hidden="true" />
            <img
              src={resolveImageSrc(image?.src, SECTION_IMAGES.testimonials)}
              alt={image?.alt ?? "Client testimonial"}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </ParallaxLayer>

          <BrandBackgroundShapes letter="N" corner="bottom-left" scope="column" />
        </div>

        {/* ── Right: testimonial content ── */}
        <div
          className={`flex w-full flex-col bg-surface py-16 lg:py-[120px] ${sectionInsetRight} ${splitPanelMinHeight}`}
        >
          <div className="flex w-full flex-col gap-5">
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

          <div className="mt-12 flex w-full flex-col items-end gap-5 lg:mt-14">
            {/* Quote icon + gold rule */}
            <div className="flex w-full items-center gap-4">
              <div className="flex size-16 shrink-0 items-center justify-center border border-gold/30 bg-white">
                <QuoteIcon />
              </div>
              <div className="gold-rule flex-1" aria-hidden="true" />
            </div>

            {/* Cross-fade testimonial */}
            <div aria-live="polite" aria-atomic="true" className="w-full">
              <TestimonialContent testimonial={activeTestimonial} slideKey={slideKey} />
            </div>

            {/* Navigation */}
            {total > 1 ? (
              <div className="flex w-full items-center justify-between gap-4 pt-2">
                <p className="font-sans text-[12px] font-medium tracking-[0.5px] text-forest">
                  {activeIndex + 1}&thinsp;/&thinsp;{total}
                </p>
                <div className="flex items-center gap-3">
                  <TestimonialNavButton direction="left" onClick={goToPrevious} label="Previous testimonial" />
                  <TestimonialNavButton direction="right" onClick={goToNext} label="Next testimonial" />
                </div>
              </div>
            ) : null}
          </div>

          {seeAllLink ? (
            <div className="mt-12 lg:mt-auto lg:pt-[60px]">
              <CtaButton cta={seeAllLink} variant="primary" />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

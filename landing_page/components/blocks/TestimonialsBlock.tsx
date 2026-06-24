"use client";

import { useCallback, useState } from "react";
import { handleAnchorClick } from "@/lib/scrollToSection";
import { PLACEHOLDER_IMAGE_SRC, resolveImageSrc, SECTION_IMAGES } from "@/lib/placeholderImage";
import type { Testimonial, TestimonialsSection } from "@/lib/types";

type TestimonialsBlockProps = Omit<TestimonialsSection, "type">;

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-1" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }, (_, index) => (
        <span key={index} className="text-gold" aria-hidden="true">
          ★
        </span>
      ))}
    </div>
  );
}

function TestimonialSlide({ testimonial }: { testimonial: Testimonial }) {
  const avatarSrc = resolveImageSrc(testimonial.avatar, PLACEHOLDER_IMAGE_SRC);

  return (
    <figure className="flex flex-col gap-5">
      <blockquote className="text-lg leading-relaxed text-navy sm:text-xl">
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>

      <figcaption className="flex items-center gap-4">
        <img
          src={avatarSrc}
          alt={testimonial.authorName}
          className="size-12 rounded-full border border-gold/30 object-cover"
        />

        <div className="flex flex-col gap-1">
          <StarRating count={testimonial.rating} />
          <p className="text-sm font-medium text-navy">{testimonial.authorName}</p>
          <p className="text-sm text-charcoal/70">{testimonial.authorRole}</p>
        </div>
      </figcaption>
    </figure>
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
  const total = testimonials.length;
  const activeTestimonial = testimonials[activeIndex];

  const goToPrevious = useCallback(() => {
    setActiveIndex((index) => (index === 0 ? total - 1 : index - 1));
  }, [total]);

  const goToNext = useCallback(() => {
    setActiveIndex((index) => (index === total - 1 ? 0 : index + 1));
  }, [total]);

  if (!activeTestimonial) {
    return null;
  }

  const imageSrc = resolveImageSrc(image?.src, SECTION_IMAGES.testimonials);

  return (
    <section id="testimonials" className="bg-surface py-16 text-navy lg:py-24">
      <div className="mx-auto max-w-7xl px-8 lg:px-16">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div className="overflow-hidden rounded-xl border border-navy/10 bg-white shadow-lg shadow-navy/5">
            <img
              src={imageSrc}
              alt={image?.alt ?? "Lorem ipsum dolor sit amet"}
              className="aspect-[4/3] w-full object-cover lg:aspect-[5/4]"
            />
          </div>

          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-3">
              {eyebrow ? (
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold">
                  {eyebrow}
                </p>
              ) : null}

              <h2 className="font-brand text-3xl font-semibold leading-tight sm:text-4xl">
                {title}
              </h2>
            </div>

            <div aria-live="polite" aria-atomic="true">
              <TestimonialSlide testimonial={activeTestimonial} />
            </div>

            {total > 1 ? (
              <div className="flex items-center justify-between gap-4">
                <p className="text-sm text-charcoal/70">
                  {activeIndex + 1} / {total}
                </p>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={goToPrevious}
                    aria-label="Previous testimonial"
                    className="rounded border border-navy/20 px-3 py-2 text-sm transition-colors hover:border-forest hover:text-forest"
                  >
                    Prev
                  </button>
                  <button
                    type="button"
                    onClick={goToNext}
                    aria-label="Next testimonial"
                    className="rounded border border-navy/20 px-3 py-2 text-sm transition-colors hover:border-forest hover:text-forest"
                  >
                    Next
                  </button>
                </div>
              </div>
            ) : null}

            {seeAllLink ? (
              seeAllLink.href ? (
                <a
                  href={seeAllLink.href}
                  className="inline-flex w-fit text-sm font-semibold text-forest underline-offset-4 transition-colors hover:text-gold hover:underline"
                  onClick={(e) => handleAnchorClick(e, seeAllLink.href)}
                >
                  {seeAllLink.label} →
                </a>
              ) : (
                <span className="text-sm font-semibold text-forest">
                  {seeAllLink.label}
                </span>
              )
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

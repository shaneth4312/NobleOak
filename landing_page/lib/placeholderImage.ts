export const PLACEHOLDER_IMAGE_SRC = "/images/placeholder.png";

export const BRAND_IMAGES = {
  horizontal: "/images/brand/logo-horizontal.png",
  mark: "/images/brand/logo-mark.png",
} as const;

export const SECTION_IMAGES = {
  hero: "/images/sections/Hero.jpg",
  about: "/images/sections/About.jpg",
  whyUs: "/images/sections/Whyus.jpg",
  cta: "/images/sections/cta-1.jpg",
  testimonials: "/images/sections/test-2.jpg",
  caseStudySuccession: "/images/sections/case-study-succession.jpg",
  caseStudyExit: "/images/sections/case-study-exit.jpg",
} as const;

export const SOCIAL_PROOF_LOGOS = [
  "/images/logos/logoipsum-334.png",
  "/images/logos/logoipsum-358.png",
  "/images/logos/logoipsum-391.png",
  "/images/logos/logoipsum-410.png",
] as const;

export function resolveImageSrc(
  src: string | undefined,
  fallback: string = PLACEHOLDER_IMAGE_SRC,
): string {
  const trimmed = src?.trim();
  return trimmed || fallback;
}

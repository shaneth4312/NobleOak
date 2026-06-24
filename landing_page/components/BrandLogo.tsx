import { BRAND } from "@/lib/brand";
import { resolveImageSrc } from "@/lib/placeholderImage";

type BrandLogoProps = {
  variant?: "horizontal" | "mark";
  className?: string;
  priority?: boolean;
};

export function BrandLogo({
  variant = "horizontal",
  className = "",
  priority = false,
}: BrandLogoProps) {
  const src = resolveImageSrc(
    variant === "mark" ? BRAND.logos.mark : BRAND.logos.horizontal,
  );
  const heightClass =
    variant === "mark"
      ? "h-24 sm:h-28 lg:h-32 xl:h-36 2xl:h-40"
      : "h-11 sm:h-12 lg:h-14 xl:h-16 2xl:h-[4.5rem]";

  return (
    <img
      src={src}
      alt={BRAND.name}
      className={`w-auto object-contain object-left ${heightClass} ${className}`}
      fetchPriority={priority ? "high" : undefined}
    />
  );
}

import { BRAND } from "@/lib/brand";

type BrandLogoProps = {
  className?: string;
  priority?: boolean;
};

export function BrandLogo({ className = "", priority = false }: BrandLogoProps) {
  return (
    <img
      src={BRAND.logos.horizontal}
      alt={BRAND.name}
      className={`h-10 w-auto object-contain object-left sm:h-11 ${className}`}
      fetchPriority={priority ? "high" : undefined}
    />
  );
}

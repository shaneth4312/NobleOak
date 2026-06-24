import { PLACEHOLDER_IMAGE_SRC, resolveImageSrc } from "@/lib/placeholderImage";
import type { LogoPartnersSection } from "@/lib/types";

type LogoPartnersBlockProps = Omit<LogoPartnersSection, "type">;

export function LogoPartnersBlock({ title, partners }: LogoPartnersBlockProps) {
  if (partners.length === 0) return null;

  return (
    <section className="border-y border-navy/10 bg-surface py-12 lg:py-14">
      <div className="mx-auto max-w-7xl px-8 lg:px-16">
        {title ? (
          <p className="mb-10 text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-charcoal/60">
            {title}
          </p>
        ) : null}

        <ul className="grid grid-cols-2 place-items-center gap-x-8 gap-y-10 sm:grid-cols-3 lg:grid-cols-4 lg:gap-x-12">
          {partners.map((partner) => (
            <li key={partner.name} className="flex items-center justify-center">
              <img
                src={resolveImageSrc(partner.src, PLACEHOLDER_IMAGE_SRC)}
                alt={partner.name}
                width={partner.width}
                height={partner.height}
                className="h-auto max-h-8 w-auto max-w-[140px] object-contain opacity-40 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
                draggable={false}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

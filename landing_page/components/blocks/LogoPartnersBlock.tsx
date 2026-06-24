import { LogoMarquee } from "@/components/motion/LogoMarquee";
import { eyebrowLabel } from "@/lib/brand";
import type { LogoPartnersSection } from "@/lib/types";
import { sectionInsetX } from "@/lib/sectionLayout";

type LogoPartnersBlockProps = Omit<LogoPartnersSection, "type">;

export function LogoPartnersBlock({ title, partners }: LogoPartnersBlockProps) {
  if (partners.length === 0) return null;

  return (
    <section className="relative w-full overflow-hidden border-y border-navy/8 bg-white text-navy">
      <div className={`relative z-10 ${sectionInsetX} pt-10 pb-4 lg:pt-12 lg:pb-4`}>
        {/* "—— Trusted by industry leaders ——" ornament row */}
        <div className="rule-ornament">
          <p className={eyebrowLabel}>{title ?? "Trusted by industry leaders"}</p>
        </div>
      </div>

      <div className="relative z-10">
        <LogoMarquee partners={partners} />
      </div>
    </section>
  );
}

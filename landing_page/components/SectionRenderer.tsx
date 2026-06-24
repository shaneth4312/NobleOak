import { AboutBlock } from "@/components/blocks/AboutBlock";
import { HeaderBlock } from "@/components/blocks/HeaderBlock";
import { HeroBlock } from "@/components/blocks/HeroBlock";
import type { Section } from "@/lib/types";

type SectionRendererProps = {
  section: Section;
};

export function SectionRenderer({ section }: SectionRendererProps) {
  switch (section.type) {
    case "header":
      return <HeaderBlock {...section} />;
    case "hero":
      return <HeroBlock {...section} />;
    case "about":
      return <AboutBlock {...section} />;
    default:
      return null;
  }
}

import { HeaderBlock } from "@/components/blocks/HeaderBlock";
import type { Section } from "@/lib/types";

type SectionRendererProps = {
  section: Section;
};

export function SectionRenderer({ section }: SectionRendererProps) {
  switch (section.type) {
    case "header":
      return <HeaderBlock {...section} />;
    default:
      return null;
  }
}

import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { AboutBlock } from "@/components/blocks/AboutBlock";
import { CaseStudiesBlock } from "@/components/blocks/CaseStudiesBlock";
import { ContactFormBlock } from "@/components/blocks/ContactFormBlock";
import { CtaBlock } from "@/components/blocks/CtaBlock";
import { FooterBlock } from "@/components/blocks/FooterBlock";
import { HeaderBlock } from "@/components/blocks/HeaderBlock";
import { HeroBlock } from "@/components/blocks/HeroBlock";
import { LogoPartnersBlock } from "@/components/blocks/LogoPartnersBlock";
import { ServicesBlock } from "@/components/blocks/ServicesBlock";
import { TestimonialsBlock } from "@/components/blocks/TestimonialsBlock";
import { WhyUsBlock } from "@/components/blocks/WhyUsBlock";
import type { Section } from "@/lib/types";

type SectionRendererProps = {
  section: Section;
};

const REVEAL_SECTIONS = new Set<Section["type"]>([
  "about",
  "services",
  "whyUs",
  "logoPartners",
  "testimonials",
  "caseStudies",
  "cta",
  "contactForm",
  "footer",
]);

function withReveal(type: Section["type"], content: ReactNode) {
  if (!REVEAL_SECTIONS.has(type)) return content;
  return <Reveal>{content}</Reveal>;
}

export function SectionRenderer({ section }: SectionRendererProps) {
  switch (section.type) {
    case "header":
      return <HeaderBlock {...section} />;
    case "hero":
      return <HeroBlock {...section} />;
    case "about":
      return withReveal("about", <AboutBlock {...section} />);
    case "services":
      return withReveal("services", <ServicesBlock {...section} />);
    case "whyUs":
      return withReveal("whyUs", <WhyUsBlock {...section} />);
    case "logoPartners":
      return withReveal("logoPartners", <LogoPartnersBlock {...section} />);
    case "testimonials":
      return withReveal("testimonials", <TestimonialsBlock {...section} />);
    case "caseStudies":
      return withReveal("caseStudies", <CaseStudiesBlock {...section} />);
    case "cta":
      return withReveal("cta", <CtaBlock {...section} />);
    case "contactForm":
      return withReveal("contactForm", <ContactFormBlock {...section} />);
    case "footer":
      return withReveal("footer", <FooterBlock {...section} />);
    default:
      return null;
  }
}

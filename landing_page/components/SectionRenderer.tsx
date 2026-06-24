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

export function SectionRenderer({ section }: SectionRendererProps) {
  switch (section.type) {
    case "header":
      return <HeaderBlock {...section} />;
    case "hero":
      return <HeroBlock {...section} />;
    case "about":
      return <AboutBlock {...section} />;
    case "services":
      return <ServicesBlock {...section} />;
    case "whyUs":
      return <WhyUsBlock {...section} />;
    case "cta":
      return <CtaBlock {...section} />;
    case "logoPartners":
      return <LogoPartnersBlock {...section} />;
    case "testimonials":
      return <TestimonialsBlock {...section} />;
    case "caseStudies":
      return <CaseStudiesBlock {...section} />;
    case "contactForm":
      return <ContactFormBlock {...section} />;
    case "footer":
      return <FooterBlock {...section} />;
    default:
      return null;
  }
}

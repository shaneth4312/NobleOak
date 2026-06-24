export type HeaderNavLink = {
  label: string;
  href?: string;
};

export type HeaderSection = {
  id: string;
  type: "header";
  navLinks?: HeaderNavLink[];
  cta?: {
    label: string;
    href?: string;
  };
};

export type HeroStat = {
  value: string;
  label: string;
};

export type HeroSection = {
  id: string;
  type: "hero";
  eyebrow?: string;
  headline: string;
  subheading: string;
  primaryCta?: {
    label: string;
    href?: string;
  };
  secondaryCta?: {
    label: string;
    href?: string;
  };
  stats?: HeroStat[];
  image?: {
    src?: string;
    alt: string;
  };
};

export type AboutFeature = {
  label: string;
};

export type AboutSection = {
  id: string;
  type: "about";
  eyebrow?: string;
  title: string;
  introPrimary: string;
  introSecondary: string;
  features: AboutFeature[];
  closingText: string;
  link?: {
    label: string;
    href?: string;
  };
  image?: {
    src?: string;
    alt: string;
  };
};

export type ServiceItem = {
  title: string;
  description: string;
  link?: {
    label: string;
    href?: string;
  };
};

export type ServicesSection = {
  id: string;
  type: "services";
  eyebrow?: string;
  title: string;
  seeAllLink?: {
    label: string;
    href?: string;
  };
  cta?: {
    label: string;
    href?: string;
  };
  items: ServiceItem[];
};

export type CtaSection = {
  id: string;
  type: "cta";
  badge?: string;
  title: string;
  description?: string;
  primaryCta?: {
    label: string;
    href?: string;
  };
  secondaryCta?: {
    label: string;
    href?: string;
  };
  image?: {
    src?: string;
    alt: string;
  };
};

export type LogoPartner = {
  name: string;
  src: string;
  width?: number;
  height?: number;
};

export type LogoPartnersSection = {
  id: string;
  type: "logoPartners";
  title?: string;
  partners: LogoPartner[];
};

export type WhyUsItem = {
  number: string;
  title: string;
  description: string;
};

export type WhyUsSection = {
  id: string;
  type: "whyUs";
  eyebrow?: string;
  title: string;
  items: WhyUsItem[];
  cta?: {
    label: string;
    href?: string;
  };
  socialProof?: {
    avatarCount: number;
    label: string;
    logos?: string[];
  };
  image?: {
    src?: string;
    alt: string;
  };
};

export type Testimonial = {
  quote: string;
  authorName: string;
  authorRole: string;
  rating: number;
  avatar?: string;
};

export type TestimonialsSection = {
  id: string;
  type: "testimonials";
  eyebrow?: string;
  title: string;
  testimonials: Testimonial[];
  seeAllLink?: {
    label: string;
    href?: string;
  };
  image?: {
    src?: string;
    alt: string;
  };
};

export type CaseStudyItem = {
  title: string;
  description: string;
  link?: {
    label: string;
    href?: string;
  };
  image?: { src: string };
};

export type CaseStudiesSection = {
  id: string;
  type: "caseStudies";
  eyebrow?: string;
  title?: string;
  items: CaseStudyItem[];
  footerText?: string;
  seeAllLink?: {
    label: string;
    href?: string;
  };
};

export type ContactFormSection = {
  id: string;
  type: "contactForm";
  eyebrow?: string;
  title: string;
  description?: string;
  phone?: string;
  submitLabel?: string;
  serviceOptions?: string[];
};

export type ContactFormSubmission = {
  name: string;
  email: string;
  businessName?: string;
  message: string;
  service: string;
};

export type FooterLink = {
  label: string;
  href?: string;
};

export type FooterLinkGroup = {
  title: string;
  links: FooterLink[];
};

export type FooterSection = {
  id: string;
  type: "footer";
  description?: string;
  phone?: string;
  email?: string;
  linkGroups?: FooterLinkGroup[];
  newsletter?: {
    title: string;
    description?: string;
    emailLabel?: string;
    submitLabel?: string;
  };
  copyrightLeft?: string;
  copyrightRight?: string;
};

export type Section =
  | HeaderSection
  | HeroSection
  | AboutSection
  | ServicesSection
  | WhyUsSection
  | CtaSection
  | LogoPartnersSection
  | TestimonialsSection
  | CaseStudiesSection
  | ContactFormSection
  | FooterSection;

export type Page = {
  slug: string;
  title: string;
  sections: Section[];
};

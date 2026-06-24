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
  
  export type Section = HeaderSection | HeroSection | AboutSection;
  
  export type Page = {
    slug: string;
    title: string;
    sections: Section[];
  };
  
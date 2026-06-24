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
  
  export type Section = HeaderSection;
  
  export type Page = {
    slug: string;
    title: string;
    sections: Section[];
  };
  
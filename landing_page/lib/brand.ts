import { BRAND_IMAGES } from "./placeholderImage";

export const BRAND = {
  name: "NobleOak Partners",
  colors: {
    navy: "#0F2744",
    forest: "#1F3A34",
    gold: "#C5A46D",
    surface: "#FAF7F0",
    charcoal: "#2B2B2B",
  },
  logos: BRAND_IMAGES,
} as const;

const btnBase =
  "group inline-flex shrink-0 items-center justify-center gap-3 px-8 py-4 font-sans text-[12px] font-medium uppercase leading-none tracking-[2px] transition-colors duration-300";

export const btnPrimary = `${btnBase} bg-gold text-navy hover:bg-navy hover:text-surface`;

export const btnSecondary = `${btnBase} border border-navy/25 bg-transparent text-navy hover:border-gold hover:bg-gold hover:text-navy`;

export const btnSecondaryOnDark = `${btnBase} border border-gold/40 bg-transparent text-surface hover:border-gold hover:bg-gold hover:text-navy`;

export const navLink =
  "font-sans text-[clamp(16px,1.2vw,18px)] font-medium leading-none text-charcoal/80 transition-colors duration-200 hover:text-gold";

export const sectionPanelNavy = "bg-navy text-surface";
export const sectionPanelForest = "bg-forest text-surface";
export const sectionPanelSurface = "bg-surface text-navy";
export const sectionPanelWhite = "bg-white text-navy";

export const textLink =
  "link-draw inline-flex items-center gap-2 font-sans text-[12px] font-medium leading-none tracking-[0.5px] text-navy transition-colors duration-300 hover:text-forest";

export const textLinkOnDark =
  "link-draw inline-flex items-center gap-2 font-sans text-[12px] font-medium leading-none tracking-[0.5px] text-surface transition-colors duration-300 hover:text-gold";

export const eyebrowDot = "size-1.5 shrink-0 rounded-full bg-gold";

export const eyebrowLabel =
  "font-brand text-[10px] uppercase leading-none tracking-[3px] text-forest";

export const eyebrowLabelOnDark =
  "font-brand text-[10px] uppercase leading-none tracking-[3px] text-gold";

export const headingStyle = "font-brand text-navy";

export const bodyMuted = "text-charcoal/70";

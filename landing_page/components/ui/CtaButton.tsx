"use client";

import { btnPrimary, btnSecondary, btnSecondaryOnDark, textLink, textLinkOnDark } from "@/lib/brand";
import { handleAnchorClick } from "@/lib/scrollToSection";
import type { HeroCta } from "@/lib/types";

type CtaVariant = "primary" | "secondary" | "secondaryOnDark" | "link" | "linkOnDark";

const VARIANT_CLASS: Record<CtaVariant, string> = {
  primary: btnPrimary,
  secondary: btnSecondary,
  secondaryOnDark: btnSecondaryOnDark,
  link: textLink,
  linkOnDark: textLinkOnDark,
};

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      className="size-3.5 shrink-0 transition-transform duration-300 group-hover:translate-x-1"
      aria-hidden="true"
    >
      <path
        d="M4 10h12M11 5l5 5-5 5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type CtaButtonProps = {
  cta: HeroCta;
  variant?: CtaVariant;
  withArrow?: boolean;
  className?: string;
};

export function CtaButton({
  cta,
  variant = "primary",
  withArrow,
  className = "",
}: CtaButtonProps) {
  const showArrow = withArrow ?? (variant !== "link" && variant !== "linkOnDark");
  const classNames = `${VARIANT_CLASS[variant]} ${className}`.trim();

  const content = (
    <>
      <span>{cta.label}</span>
      {showArrow ? <ArrowIcon /> : null}
    </>
  );

  if (cta.href) {
    return (
      <a
        className={classNames}
        href={cta.href}
        onClick={(e) => handleAnchorClick(e, cta.href)}
      >
        {content}
      </a>
    );
  }

  return <span className={classNames}>{content}</span>;
}

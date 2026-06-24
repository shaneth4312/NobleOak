"use client";

import { BrandLogo } from "@/components/BrandLogo";
import { CtaButton } from "@/components/ui/CtaButton";
import { BRAND, navLink } from "@/lib/brand";
import { handleAnchorClick } from "@/lib/scrollToSection";
import type { HeaderNavLink, HeaderSection } from "@/lib/types";
import { sectionInsetX } from "@/lib/sectionLayout";
import { useLayoutEffect } from "react";

type HeaderBlockProps = Omit<HeaderSection, "type">;

function NavLink({ link }: { link: HeaderNavLink }) {
  if (link.href) {
    return (
      <a
        className={navLink}
        href={link.href}
        onClick={(e) => handleAnchorClick(e, link.href)}
      >
        {link.label}
      </a>
    );
  }

  return <span className={navLink}>{link.label}</span>;
}

export function HeaderBlock({ navLinks = [], cta }: HeaderBlockProps) {
  useLayoutEffect(() => {
    const header = document.querySelector("header");
    if (!(header instanceof HTMLElement)) return;

    const updateOffset = () => {
      document.documentElement.style.setProperty(
        "--header-offset",
        `${header.offsetHeight}px`,
      );
    };

    updateOffset();
    const observer = new ResizeObserver(updateOffset);
    observer.observe(header);
    window.addEventListener("resize", updateOffset);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateOffset);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-navy/10 bg-white text-navy shadow-sm shadow-navy/5">
      <div
        className={`${sectionInsetX} flex items-center justify-between gap-6 py-[30px] lg:gap-10`}
      >
        <div className="flex min-w-0 flex-1 items-center gap-8 lg:gap-[60px]">
          <a
            href="#"
            className="shrink-0"
            aria-label={`${BRAND.name} home`}
            onClick={(e) => handleAnchorClick(e, "#")}
          >
            <BrandLogo priority />
          </a>

          {navLinks.length > 0 ? (
            <nav aria-label="Main navigation">
              <ul className="hidden items-center gap-[30px] md:flex">
                {navLinks.map((link) => (
                  <li key={link.label}>
                    <NavLink link={link} />
                  </li>
                ))}
              </ul>
            </nav>
          ) : null}
        </div>

        {cta ? <CtaButton cta={cta} variant="primary" withArrow={false} /> : null}
      </div>
    </header>
  );
}

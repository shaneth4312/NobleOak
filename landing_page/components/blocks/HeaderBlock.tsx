"use client";

import { BrandLogo } from "@/components/BrandLogo";
import { handleAnchorClick } from "@/lib/scrollToSection";
import type { HeaderNavLink, HeaderSection } from "@/lib/types";
import { useLayoutEffect } from "react";

type HeaderBlockProps = Omit<HeaderSection, "type">;

function NavLink({ link }: { link: HeaderNavLink }) {
  if (link.href) {
    return (
      <a
        href={link.href}
        className="relative pb-0.5 text-[15px] font-medium text-navy/75 transition-colors hover:text-navy after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-gold after:transition-all hover:after:w-full"
        onClick={(e) => handleAnchorClick(e, link.href)}
      >
        {link.label}
      </a>
    );
  }

  return <span className="text-[15px] font-medium text-navy/75">{link.label}</span>;
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
    <header className="sticky top-0 z-50 w-full border-b-2 border-gold/25 bg-surface/95 text-navy backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-8 py-5 lg:gap-12 lg:px-16">
        <div className="flex min-w-0 flex-1 items-center gap-10 lg:gap-14">
          <a
            href="#"
            className="shrink-0"
            aria-label="NobleOak Partners home"
            onClick={(e) => handleAnchorClick(e, "#")}
          >
            <BrandLogo priority />
          </a>

          {navLinks.length > 0 ? (
            <nav aria-label="Main navigation">
              <ul className="hidden items-center gap-8 lg:flex">
                {navLinks.map((link) => (
                  <li key={link.label}>
                    <NavLink link={link} />
                  </li>
                ))}
              </ul>
            </nav>
          ) : null}
        </div>

        {cta ? (
          cta.href ? (
            <a
              href={cta.href}
              className="shrink-0 rounded border border-navy/20 px-5 py-2.5 text-[13px] font-semibold tracking-wide text-navy transition-colors hover:border-navy hover:bg-navy hover:text-surface"
              onClick={(e) => handleAnchorClick(e, cta.href)}
            >
              {cta.label}
            </a>
          ) : (
            <span className="shrink-0 rounded border border-navy/20 px-5 py-2.5 text-[13px] font-semibold tracking-wide text-navy">
              {cta.label}
            </span>
          )
        ) : null}
      </div>
    </header>
  );
}

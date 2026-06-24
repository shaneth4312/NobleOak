"use client";

import { useEffect, useState } from "react";
import { PLACEHOLDER_IMAGE_SRC, resolveImageSrc } from "@/lib/placeholderImage";
import type { LogoPartner } from "@/lib/types";

type LogoMarqueeProps = {
  partners: LogoPartner[];
};

function MarqueeItem({ partner }: { partner: LogoPartner }) {
  return (
    <li className="flex shrink-0 items-center px-10 lg:px-14">
      <img
        src={resolveImageSrc(partner.src, PLACEHOLDER_IMAGE_SRC)}
        alt={partner.name}
        width={partner.width}
        height={partner.height}
        className="h-auto max-h-9 w-auto max-w-[180px] object-contain opacity-50 mix-blend-multiply"
        draggable={false}
      />
    </li>
  );
}

export function LogoMarquee({ partners }: LogoMarqueeProps) {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  if (partners.length === 0) return null;

  if (reduceMotion) {
    return (
      <div className="w-full py-12">
        <ul className="flex w-full flex-wrap items-center justify-center gap-10 lg:gap-14">
          {partners.map((p) => (
            <MarqueeItem key={p.name} partner={p} />
          ))}
        </ul>
      </div>
    );
  }

  const minItems = 12;
  const repeated: LogoPartner[] = [];
  while (repeated.length < minItems) repeated.push(...partners);
  const loop = [...repeated, ...repeated];

  return (
    <div className="marquee-container relative w-full overflow-hidden py-12 lg:py-14">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-white to-transparent lg:w-28" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-white to-transparent lg:w-28" />

      <ul className="marquee-track flex w-max items-center">
        {loop.map((partner, index) => (
          <MarqueeItem key={`${partner.name}-${index}`} partner={partner} />
        ))}
      </ul>
    </div>
  );
}

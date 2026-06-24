"use client";

import { type ReactNode, useEffect, useRef } from "react";

type ParallaxLayerProps = {
  children: ReactNode;
  strength?: number;
  className?: string;
};

export function ParallaxLayer({
  children,
  strength = 0.25,
  className = "",
}: ParallaxLayerProps) {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;

    const section = outer.closest("section, footer") as HTMLElement | null;

    const update = () => {
      const rect = (section ?? outer).getBoundingClientRect();
      const viewH = window.innerHeight;
      const progress = (viewH - rect.top) / (viewH + rect.height);
      const centered = progress - 0.5;
      inner.style.transform = `translateY(${centered * 120 * strength}px)`;
    };

    const onScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, [strength]);

  return (
    <div ref={outerRef} className={`overflow-hidden ${className}`}>
      <div ref={innerRef} className="parallax-inner absolute inset-[-8%]">
        {children}
      </div>
    </div>
  );
}

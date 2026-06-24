"use client";

import {
  type CSSProperties,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { bodyMuted } from "@/lib/brand";
import type { HeroStat } from "@/lib/types";

type ParsedStat = {
  prefix: string;
  target: number;
  suffix: string;
  decimals: number;
};

function parseStatValue(value: string): ParsedStat | null {
  const match = value.trim().match(/^(\D*)(\d+(?:\.\d+)?)(.*)$/);
  if (!match) return null;
  const numericPart = match[2];
  return {
    prefix: match[1],
    target: Number(numericPart),
    suffix: match[3],
    decimals: numericPart.includes(".") ? numericPart.split(".")[1].length : 0,
  };
}

function formatValue(parsed: ParsedStat, current: number): string {
  const clamped = Math.min(current, parsed.target);
  const rounded =
    parsed.decimals > 0 ? clamped.toFixed(parsed.decimals) : String(Math.round(clamped));
  return `${parsed.prefix}${rounded}${parsed.suffix}`;
}

function AnimatedValue({
  value,
  active,
  delay,
}: {
  value: string;
  active: boolean;
  delay: number;
}) {
  const parsed = useMemo(() => parseStatValue(value), [value]);
  const [display, setDisplay] = useState(value);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!active || startedRef.current) return;
    startedRef.current = true;

    if (!parsed) {
      setDisplay(value);
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(value);
      return;
    }

    setDisplay(formatValue(parsed, 0));

    const duration = 1800;
    const startAt = performance.now() + delay;
    let frameId = 0;

    const tick = (now: number) => {
      const elapsed = now - startAt;
      if (elapsed < 0) {
        frameId = requestAnimationFrame(tick);
        return;
      }
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      setDisplay(formatValue(parsed, parsed.target * eased));
      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      } else {
        setDisplay(value);
      }
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [active, delay, parsed, value]);

  return (
    <span className="tabular-nums" aria-label={value}>
      {display}
    </span>
  );
}

type HeroStatsProps = {
  stats: HeroStat[];
  mutedClassName?: string;
};

export function HeroStats({ stats, mutedClassName = bodyMuted }: HeroStatsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const triggeredRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const trigger = () => {
      if (triggeredRef.current) return;
      triggeredRef.current = true;
      setActive(true);
    };

    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.95) {
      trigger();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          trigger();
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (stats.length === 0) return null;

  const colClass =
    stats.length === 2 ? "sm:grid-cols-2" : stats.length >= 3 ? "sm:grid-cols-3" : "";

  return (
    <div ref={ref} className="w-full border-t border-gold/30 pt-8">
      <dl className={`grid w-full grid-cols-1 gap-8 ${colClass}`}>
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            data-active={active}
            className="stat-item flex w-full flex-col gap-2.5"
            style={{ "--stat-delay": `${index * 160}ms` } as CSSProperties}
          >
            <dt className="font-brand text-[2.75rem] font-semibold leading-[1.1] text-gold lg:text-5xl">
              <AnimatedValue value={stat.value} active={active} delay={index * 160} />
            </dt>
            <dd className={`w-full text-base leading-[1.5] ${mutedClassName}`}>{stat.label}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

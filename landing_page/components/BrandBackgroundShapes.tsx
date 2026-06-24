import type { CSSProperties } from "react";

export type LetterCorner = "top-left" | "top-right" | "bottom-left" | "bottom-right";
export type LetterSide = "left" | "right" | "full";

export type BrandBackgroundShapesProps = {
  letter: "N" | "O";
  corner: LetterCorner;
  scope?: "column" | "section";
  side?: LetterSide;
  className?: string;
};

type CornerConfig = { anchor: CSSProperties; nShift: string; oShift: string };

const SECTION_CORNER: Record<LetterCorner, CornerConfig> = {
  "top-left": { anchor: { top: 0, left: 0 }, nShift: "translate(-38%, -28%)", oShift: "translate(-44%, -44%)" },
  "top-right": { anchor: { top: 0, right: 0 }, nShift: "translate(38%, -28%)", oShift: "translate(44%, -44%)" },
  "bottom-left": { anchor: { bottom: 0, left: 0 }, nShift: "translate(-38%, 28%)", oShift: "translate(-44%, 44%)" },
  "bottom-right": { anchor: { bottom: 0, right: 0 }, nShift: "translate(38%, 28%)", oShift: "translate(44%, 44%)" },
};

const SECTION_SIDE_CLASS: Record<LetterSide, string> = {
  left: "absolute inset-y-0 left-0 w-1/2",
  right: "absolute inset-y-0 right-0 w-1/2",
  full: "absolute inset-0",
};

const FONT_SIZE = {
  column: "clamp(500px, 88vw, 2400px)",
  sectionHalf: "clamp(500px, 88vw, 2400px)",
  sectionFull: "clamp(560px, 110vw, 2800px)",
} as const;

export function BrandBackgroundShapes({
  letter,
  corner,
  scope = "section",
  side = "full",
  className = "",
}: BrandBackgroundShapesProps) {
  const cornerConfig = SECTION_CORNER[corner];
  const shift = letter === "N" ? cornerConfig.nShift : cornerConfig.oShift;

  const positionClass =
    scope === "column" ? "absolute inset-0" : SECTION_SIDE_CLASS[side];

  const zClass = scope === "column" ? "z-[15]" : "z-[8]";

  const fontSize =
    scope === "column"
      ? FONT_SIZE.column
      : side === "full"
        ? FONT_SIZE.sectionFull
        : FONT_SIZE.sectionHalf;

  return (
    <div
      className={`pointer-events-none overflow-hidden ${positionClass} ${zClass} ${className}`}
      aria-hidden="true"
    >
      <div className="absolute" style={cornerConfig.anchor}>
        <span
          data-letter-mark={letter}
          className="block origin-center whitespace-nowrap font-brand text-[1em] font-semibold leading-none text-gold"
          style={{
            fontSize,
            transform: shift,
            opacity: 0.34,
            WebkitTextFillColor: "#C5A46D",
            color: "#C5A46D",
          }}
        >
          {letter}
        </span>
      </div>
    </div>
  );
}

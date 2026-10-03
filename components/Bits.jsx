"use client";

import { useEffect, useRef, useState } from "react";

/* ---------------------------------------------------------
   Reveal — one shared IntersectionObserver-based fade up.
   --------------------------------------------------------- */
export function Reveal({ children, delay = 0, as: Tag = "div", className = "", ...rest }) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      style={{ "--reveal-delay": `${delay}ms` }}
      className={`reveal ${seen ? "is-in" : ""} ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/* ---------------------------------------------------------
   Eyebrow — a mini answer row. The filled bubble marks
   which section you are in, exactly like an answer key.
   --------------------------------------------------------- */
const EYEBROW_TONES = {
  ink: {
    empty: "border-ink/25 text-ink-40",
    full: "border-ink bg-ink text-transparent",
    text: "text-ink-40",
  },
  paper: {
    empty: "border-paper/30 text-paper/45",
    full: "border-leaf-400 bg-leaf-400 text-transparent",
    text: "text-paper/70",
  },
  marigold: {
    empty: "border-marigold/35 text-marigold/60",
    full: "border-marigold bg-marigold text-transparent",
    text: "text-haldi/85",
  },
};

export function Eyebrow({ children, filled = 1, tone = "ink" }) {
  const t = EYEBROW_TONES[tone] ?? EYEBROW_TONES.ink;

  return (
    <div className="flex items-center gap-3">
      <span className="flex items-center gap-1" aria-hidden="true">
        {["A", "B", "C", "D"].map((letter, i) => (
          <span
            key={letter}
            className={`inline-flex h-[17px] w-[17px] flex-none items-center justify-center rounded-full border-[1.5px] font-mono text-[0.55rem] leading-none ${
              i === filled ? t.full : t.empty
            }`}
          >
            {letter}
          </span>
        ))}
      </span>
      <span className={`font-mono text-[0.68rem] uppercase tracking-[0.22em] ${t.text}`}>
        {children}
      </span>
    </div>
  );
}

/* ---------------------------------------------------------
   SectionHeading
   --------------------------------------------------------- */
export function SectionHeading({ eyebrow, filled = 1, title, lead, tone = "ink", align = "left" }) {
  const titleTone = tone === "paper" ? "text-paper" : tone === "marigold" ? "text-haldi" : "text-ink";
  const leadTone = tone === "paper" ? "text-paper/65" : tone === "marigold" ? "text-haldi/85" : "text-ink-70";

  return (
    <div className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      <Reveal className={align === "center" ? "flex justify-center" : ""}>
        <Eyebrow filled={filled} tone={tone}>
          {eyebrow}
        </Eyebrow>
      </Reveal>
      <Reveal delay={60}>
        <h2 className={`mt-5 text-[2rem] leading-[1.08] sm:text-[2.6rem] lg:text-[3.1rem] ${titleTone}`}>
          {title}
        </h2>
      </Reveal>
      {lead ? (
        <Reveal delay={120}>
          <p className={`mt-4 text-[1.02rem] leading-relaxed sm:text-[1.09rem] ${leadTone}`}>{lead}</p>
        </Reveal>
      ) : null}
    </div>
  );
}

/* ---------------------------------------------------------
   SpecChip — mono, for GSM / size / page count
   --------------------------------------------------------- */
export function SpecChip({ children, tone = "ink" }) {
  const tones = {
    ink: "border-ink/12 bg-paper text-ink-70",
    leaf: "border-leaf-600/20 bg-leaf-50 text-leaf-700",
    paper: "border-paper/20 bg-paper/5 text-paper/70",
    marigold: "border-marigold/25 bg-marigold-50 text-haldi",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 font-mono text-[0.66rem] tracking-wide ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

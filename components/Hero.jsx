"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { ArrowUpRight, ArrowDown } from "lucide-react";
import { Eyebrow, Reveal } from "./Bits";
import { STORE_URL } from "../lib/content";

const TOTAL_SECONDS = 864; // 14:24 — the slice of a full paper spent only circling
const SLIDE_MS = 3400;      // how long each page stays up
const FLIP_MS = 680;        // how long the flip itself takes

function pad(n) {
  return String(n).padStart(2, "0");
}

/* ---------------------------------------------------------
   Three faces the slider flips between — same paper
   language as the rest of the site, no photos.
   --------------------------------------------------------- */

function MiniBubbleRow({ answer }) {
  const letters = ["A", "B", "C", "D"];
  return (
    <span className="flex gap-[5px]">
      {letters.map((l, i) => (
        <span
          key={l}
          className={`bubble h-[13px] w-[13px] text-[0.42rem] ${
            i === answer ? "bubble-filled" : ""
          }`}
        >
          {l}
        </span>
      ))}
    </span>
  );
}

function AnswerSheetFace() {
  const key = [2, 0, 3, 1, 1, 2, 0, 3, 3, 1, 2, 0];
  return (
    <div className="relative flex h-full flex-col">
      <div aria-hidden="true" className="spiral h-6 flex-none border-b border-ink/8 bg-paper-2" />
      <div aria-hidden="true" className="absolute bottom-0 left-9 top-6 w-px bg-marker/45" />
      <div className="relative flex-1 py-5 pl-12 pr-5 sm:pl-14 sm:pr-7">
        <p className="font-mono text-[0.58rem] uppercase tracking-[0.2em] text-ink-40">
          Practice answer sheet
        </p>
        <p
          className="mt-1 text-[1rem] leading-none text-ink"
          style={{ fontFamily: "var(--font-display)", fontVariationSettings: '"SOFT" 40, "WONK" 1' }}
        >
          180 MCQ · full length
        </p>
        <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-[7px]">
          {key.map((a, q) => (
            <div key={q} className="flex items-center gap-2">
              <span className="w-4 text-right font-mono text-[0.58rem] text-ink-40">{q + 1}</span>
              <MiniBubbleRow answer={a} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function OmrFace() {
  const answers = [1, 3, 0, 2];
  return (
    <div className="flex h-full flex-col">
      <div aria-hidden="true" className="spiral h-6 flex-none border-b border-ink/8 bg-leaf-50" />
      <div className="flex items-center justify-between px-6 pt-4">
        <p className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-leaf-700">OMR sheet</p>
        <p className="font-mono text-[0.6rem] text-ink-40">100 MCQ</p>
      </div>
      <div className="grid flex-1 grid-cols-2 gap-x-8 gap-y-[7px] px-6 pt-4">
        {Array.from({ length: 12 }).map((_, q) => (
          <div key={q} className="flex items-center gap-2">
            <span className="w-4 text-right font-mono text-[0.58rem] text-ink-40">{q + 1}</span>
            <MiniBubbleRow answer={answers[q % 4]} />
          </div>
        ))}
      </div>
    </div>
  );
}

// function NaamFace() {
//   const cols = 6;
//   const rows = 6;
//   return (
//     <div className="flex h-full flex-col bg-marigold-50">
//       <div aria-hidden="true" className="spiral h-6 flex-none border-b border-marigold/15 bg-marigold-100" />
//       <div className="flex items-baseline justify-between px-6 pt-4">
//         <p className="font-mono text-[0.62rem] tracking-wide text-haldi">नाम लेखन</p>
//         <p className="font-mono text-[0.6rem] text-marigold">1,00,000 बार</p>
//       </div>
//       <div
//         className="grid flex-1 content-start gap-[3px] px-6 pt-4"
//         style={{ gridTemplateColumns: `repeat(${cols}, minmax(0,1fr))` }}
//       >
//         {Array.from({ length: cols * rows }).map((_, i) => (
//           <span
//             key={i}
//             className={`grid h-[20px] place-items-center rounded-[3px] border border-marigold/25 font-deva text-[0.6rem] leading-none ${
//               i < cols * rows * 0.4 ? "bg-marigold-100 text-marigold" : "text-transparent"
//             }`}
//           >
//             राम
//           </span>
//         ))}
//       </div>
//     </div>
//   );
// }

const SLIDES = [
  { key: "answer", label: "Answer sheet", letter: "A", Face: AnswerSheetFace },
  { key: "omr", label: "OMR sheet", letter: "B", Face: OmrFace },
  // { key: "naam", label: "Naam Lekhan", letter: "C", Face: NaamFace },
];

/* ---------------------------------------------------------
   PageFlipSlider — the signature element. Pages flip up
   from the spiral like a desk notepad, looping through
   the three things amBlitz actually prints, with the
   stopwatch counting the same 15 minutes across the loop.
   --------------------------------------------------------- */
function PageFlipSlider() {
  const n = SLIDES.length;
  const [active, setActive] = useState(0);
  const [flipping, setFlipping] = useState(false);
  const [seconds, setSeconds] = useState(0);

  const activeRef = useRef(0);
  const pausedRef = useRef(false);
  const reducedRef = useRef(false);
  const flipTimeout = useRef(null);
  const secondsFrame = useRef(null);

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  useEffect(() => {
    reducedRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  const goTo = useCallback(
    (next) => {
      if (next === activeRef.current) return;
      if (reducedRef.current) {
        setActive(next);
        return;
      }
      setFlipping(true);
      clearTimeout(flipTimeout.current);
      flipTimeout.current = setTimeout(() => {
        setActive(next);
        setFlipping(false);
      }, FLIP_MS);
    },
    []
  );

  // autoplay
  useEffect(() => {
    const id = setInterval(() => {
      if (pausedRef.current) return;
      goTo((activeRef.current + 1) % n);
    }, SLIDE_MS);
    return () => clearInterval(id);
  }, [goTo, n]);

  // stopwatch — glides to the target for this page each time it changes
  useEffect(() => {
    const target = Math.round(((active + 1) / n) * TOTAL_SECONDS);
    const from = seconds;
    if (reducedRef.current) {
      setSeconds(target);
      return;
    }
    const duration = 900;
    let start;
    const step = (t) => {
      if (!start) start = t;
      const p = Math.min((t - start) / duration, 1);
      const eased = p * (2 - p);
      setSeconds(Math.round(from + (target - from) * eased));
      if (p < 1) secondsFrame.current = requestAnimationFrame(step);
    };
    cancelAnimationFrame(secondsFrame.current);
    secondsFrame.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(secondsFrame.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, n]);

  return (
    <div
      className="relative"
      onMouseEnter={() => (pausedRef.current = true)}
      onMouseLeave={() => (pausedRef.current = false)}
    >
      <div
        className="relative"
        style={{ perspective: "1400px" }}
      >
        <div className="relative aspect-[4/5] w-full max-w-[380px]">
          {SLIDES.map((slide, idx) => {
            const offset = (idx - active + n) % n; // 0 = front, 1/2 = peeking behind
            const isFront = offset === 0;
            const isFlippingFront = isFront && flipping;
            const isIncoming = offset === 1 && flipping;

            const peek = { x: offset * 6, y: offset * 8, r: offset * 1.6 };

            let transform;
            let transition = "none";
            if (isFlippingFront) {
              transform = "rotateX(-172deg) translateZ(0)";
              transition = `transform ${FLIP_MS}ms cubic-bezier(.4,0,.2,1)`;
            } else if (isIncoming) {
              transform = "rotateX(0deg) translate(0px,0px) rotate(0deg)";
              transition = `transform ${FLIP_MS}ms cubic-bezier(.4,0,.2,1)`;
            } else {
              transform = `rotateX(0deg) translate(${peek.x}px, ${peek.y}px) rotate(${peek.r}deg)`;
              transition = "none";
            }

            const Face = slide.Face;

            return (
              <div
                key={slide.key}
                aria-hidden={!isFront}
                className="absolute inset-0 overflow-hidden rounded-[18px] border border-ink/12 bg-white shadow-sheet"
                style={{
                  zIndex: n - offset,
                  transformOrigin: "top center",
                  transformStyle: "preserve-3d",
                  backfaceVisibility: "hidden",
                  transform,
                  transition,
                }}
              >
                <Face />
              </div>
            );
          })}
        </div>
      </div>

      {/* dots — same A/B/C bubble language as the eyebrow */}
      <div className="mt-5 flex items-center justify-center gap-2.5">
        {SLIDES.map((slide, idx) => (
          <button
            key={slide.key}
            type="button"
            onClick={() => goTo(idx)}
            aria-label={`Show ${slide.label}`}
            className={`inline-flex h-[22px] w-[22px] items-center justify-center rounded-full border-[1.5px] font-mono text-[0.62rem] leading-none transition-colors duration-300 ${
              idx === active
                ? "border-leaf-600 bg-leaf-600 text-transparent"
                : "border-ink/25 text-ink-40 hover:border-ink/45"
            }`}
          >
            {slide.letter}
          </button>
        ))}
      </div>

      {/* the stopwatch — the thesis, made countable, now shared across pages */}
      <div className="absolute -bottom-7 -left-3 rounded-2xl border border-ink/12 bg-ink px-5 py-3.5 text-paper shadow-lift sm:-left-8">
        <p className="font-mono text-[0.58rem] uppercase tracking-[0.18em] text-paper/55">
          Time spent only on circling
        </p>
        <p className="mt-1 flex items-baseline gap-1.5 font-mono text-[1.9rem] leading-none tabular-nums text-leaf-300">
          {pad(Math.floor(seconds / 60))}:{pad(seconds % 60)}
          <span className="font-sans text-[0.7rem] font-normal tracking-wide text-paper/50">
            of your paper
          </span>
        </p>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------
   Section 3 — Hero
   --------------------------------------------------------- */
export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pb-28 pt-10 sm:pb-32 sm:pt-16 lg:pb-40">
      {/* atmosphere: a mango wash behind the sheet, faint ruled paper below */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-24 h-[34rem] w-[34rem] rounded-full bg-mango-200/40 blur-[90px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-52 top-40 h-[30rem] w-[30rem] rounded-full bg-leaf-100/60 blur-[100px]"
      />

      <div className="mx-auto grid max-w-[1240px] items-center gap-14 px-5 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:px-8">
        <div className="relative">
          <Reveal>
            <Eyebrow filled={1}>Ambition + Blitz</Eyebrow>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="mt-6 text-[2.7rem] leading-[0.98] sm:text-[3.6rem] lg:text-[4.15rem]">
              Fifteen minutes of your exam go into{" "}
              <span className="relative inline-block text-leaf-600">
                <span className="underline-pen">filling circles</span>
              </span>
              .
            </h1>
          </Reveal>

          <Reveal delay={150}>
            <p className="mt-6 max-w-xl text-[1.06rem] leading-relaxed text-ink-70 sm:text-[1.15rem]">
              Nobody practises that part. amBlitz makes the paper you practise it on — OMR sheets in
              the real layout, answer notebooks with printed margins, and Naam Lekhan pustikas with
              broad boxes. 70 GSM, spiral bound, priced like a student is paying.
            </p>
          </Reveal>

          <Reveal delay={210}>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href={STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-fill group inline-flex items-center gap-2.5 rounded-full bg-ink px-7 py-4 text-[0.98rem] font-medium text-paper transition-transform duration-300 hover:-translate-y-0.5"
              >
                <span className="relative flex h-4 w-4 flex-none items-center justify-center rounded-full border-[1.5px] border-paper/60">
                  <span className="h-2 w-2 scale-0 rounded-full bg-paper transition-transform duration-300 group-hover:scale-100" />
                </span>
                Shop the full range
                <ArrowUpRight size={16} strokeWidth={2.2} />
              </a>
              <a
                href="#range"
                className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-7 py-4 text-[0.98rem] font-medium text-ink transition-colors duration-300 hover:border-ink/40 hover:bg-ink/5"
              >
                What we make
                <ArrowDown size={15} strokeWidth={2.2} />
              </a>
            </div>
          </Reveal>

          <Reveal delay={280}>
            <dl className="mt-11 grid max-w-lg grid-cols-2 gap-x-6 gap-y-5 border-t border-ink/10 pt-7 sm:grid-cols-4">
              {[
                ["70 GSM", "thick paper"],
                ["A4 / B5", "true sizes"],
                ["Spiral", "lies flat"],
                ["Amazon", "fulfilled"],
              ].map(([big, small]) => (
                <div key={big}>
                  <dt className="font-mono text-[0.95rem] text-ink">{big}</dt>
                  <dd className="mt-0.5 text-[0.82rem] text-ink-40">{small}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <Reveal delay={120} className="lg:pl-4">
          <PageFlipSlider />
        </Reveal>
      </div>
    </section>
  );
}
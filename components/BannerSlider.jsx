"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const SLIDE_MS = 5000;  // how long each banner stays up
const FLIP_MS = 900;    // how long the page-turn itself takes

const SLIDES = [
  { key: "s1", src: "/banner-1.png", alt: "amBlitz — notebooks that inspire success" },
  { key: "s2", src: "/banner-2.png", alt: "amBlitz — quality notebooks, smarter learning" },
];

export default function BannerSlider() {
  const n = SLIDES.length;
  const [active, setActive] = useState(0);
  const [flipping, setFlipping] = useState(false);

  const activeRef = useRef(0);
  const pausedRef = useRef(false);
  const reducedRef = useRef(false);
  const flipTimeout = useRef(null);

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  useEffect(() => {
    reducedRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  const goTo = useCallback(
    (next) => {
      const target = ((next % n) + n) % n;
      if (target === activeRef.current || flipping) return;
      if (reducedRef.current) {
        setActive(target);
        return;
      }
      setFlipping(true);
      clearTimeout(flipTimeout.current);
      flipTimeout.current = setTimeout(() => {
        setActive(target);
        setFlipping(false);
      }, FLIP_MS);
    },
    [n, flipping]
  );

  useEffect(() => {
    const id = setInterval(() => {
      if (pausedRef.current) return;
      goTo(activeRef.current + 1);
    }, SLIDE_MS);
    return () => clearInterval(id);
  }, [goTo]);

  return (
    <section
      className="relative w-full overflow-hidden bg-paper-2"
      onMouseEnter={() => (pausedRef.current = true)}
      onMouseLeave={() => (pausedRef.current = false)}
    >
      <div
        className="relative aspect-[2.3/1] w-full"
        style={{ perspective: "2200px" }}
      >
        {SLIDES.map((slide, idx) => {
          const offset = (idx - active + n) % n; // 0 = front/open page
          const isFront = offset === 0;
          const leaving = isFront && flipping;
          const entering = offset === 1 && flipping;

          let style;
          if (leaving) {
            style = {
              transform: "rotateY(-78deg) scale(0.985)",
              opacity: 0,
              transition: `transform ${FLIP_MS}ms cubic-bezier(.22,.61,.36,1), opacity ${FLIP_MS * 0.8}ms ease-in`,
              zIndex: 2,
            };
          } else if (entering) {
            style = {
              transform: "rotateY(0deg) scale(1)",
              opacity: 1,
              transition: `transform ${FLIP_MS}ms cubic-bezier(.22,.61,.36,1) ${FLIP_MS * 0.12}ms, opacity ${FLIP_MS * 0.7}ms ease-out ${FLIP_MS * 0.25}ms`,
              zIndex: 1,
            };
          } else {
            style = {
              transform: "rotateY(0deg) scale(1)",
              opacity: isFront ? 1 : 0,
              transition: "none",
              zIndex: isFront ? 2 : 0,
            };
          }

          return (
            <div
              key={slide.key}
              aria-hidden={!isFront}
              className="absolute inset-0"
              style={{
                transformOrigin: "left center",
                transformStyle: "preserve-3d",
                backfaceVisibility: "hidden",
                willChange: "transform, opacity",
                ...style,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={slide.src}
                alt={slide.alt}
                className="h-full w-full object-cover"
                draggable={false}
              />
            </div>
          );
        })}
      </div>

      <div className="absolute inset-x-0 bottom-4 z-20 flex items-center justify-center gap-2.5">
        {SLIDES.map((slide, idx) => (
          <button
            key={slide.key}
            type="button"
            onClick={() => goTo(idx)}
            aria-label={`Show slide ${idx + 1}`}
            className={`h-[7px] rounded-full transition-all duration-300 ${
              idx === active ? "w-6 bg-ink" : "w-[7px] bg-ink/25 hover:bg-ink/45"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
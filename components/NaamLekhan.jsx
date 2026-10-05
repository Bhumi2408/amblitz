"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Reveal, Eyebrow } from "./Bits";

const COLS = 12;
const ROWS = 9; // 12 × 9 = 108, the traditional count in one section

const SIZES = [
  { count: "22,000", note: "Beginner pack · 3 books", href: "https://www.amazon.in/amblitz-Pustika-Beginners-Notebooks-Organised/dp/B0CLVNJM2Y" },
  { count: "51,000", note: "51,840 boxes · the popular one", href: "https://www.amazon.in/Amblitz-51000-Naam-Lekhan-Pustika/dp/B08D3T4DCB" },
  { count: "1,00,000", note: "310 pages · one lakh naam", href: "https://www.amazon.in/amblitz-Lekhan-Pustika-Organised-Spiral/dp/B0CLVQVN1V" },
  { count: "1,51,000", note: "468 pages · the full sankalp", href: "https://www.amazon.in/amblitz-Lekhan-Pustika-Organised-Spiral/dp/B0CLVQVN1V" },
  { count: "2,00,000", note: "Two lakh naam · beyond one mala", href: "https://www.amazon.in/amblitz-Pustika-Notebook-Devoted-Meditation/dp/B0HJM7R325/ref=ast_sto_dp_puis" },
];

const NOTES = [
  {
    head: "Broad boxes, 18 x 5.5 MM",
    body: "Wide enough for an unhurried hand. This is the single thing people write in to thank us about — a seventy-year-old finishes a section without her glasses sliding down.",
  },
  {
    head: "108 boxes to a section",
    body: "The count a mala already knows. You finish a section, you have finished a round, and the book keeps the tally for you.",
  },
  {
    head: "No deity image on the cover",
    body: "Deliberate. A plain cover can be kept anywhere in the house, and when the book is full it can be offered or disposed without hesitation.",
  },
  {
    head: "Any naam, not only Ram",
    body: "The boxes are blank. Om Sai Ram, Om Namah Shivay, Jai Shri Shyam, Jai Mata Di — whatever your ghar follows fits the same page.",
  },
];

function NaamSection() {
  const ref = useRef(null);
  const [written, setWritten] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setWritten(COLS * ROWS);
      return;
    }

    let raf;
    let start;
    const DURATION = 4600;
    const TOTAL = COLS * ROWS;

    const step = (t) => {
      if (!start) start = t;
      const p = Math.min((t - start) / DURATION, 1);
      setWritten(Math.round(p * TOTAL));
      if (p < 1) raf = requestAnimationFrame(step);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          raf = requestAnimationFrame(step);
          io.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    io.observe(el);

    return () => {
      io.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={ref} className="relative">
      <div
        aria-hidden="true"
        className="absolute inset-0 translate-x-3 translate-y-4 rotate-[1.4deg] rounded-[20px] border border-marigold/20 bg-marigold-100/60"
      />

      <div className="relative overflow-hidden rounded-[20px] border border-marigold/25 bg-white shadow-sheet">
        <div aria-hidden="true" className="spiral h-6 border-b border-marigold/15 bg-marigold-50" />

        <div className="p-5 sm:p-6">
          <div className="flex items-baseline justify-between border-b border-dashed border-marigold/30 pb-3">
            <p className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-haldi/85">
              Section · 108 boxes
            </p>
            <p className="font-mono text-[0.6rem] tabular-nums text-haldi">
              {String(written).padStart(3, "0")} / 108
            </p>
          </div>

          <div className="mt-4 grid grid-cols-6 gap-[3px] sm:grid-cols-12">
            {Array.from({ length: COLS * ROWS }).map((_, i) => (
              <span
                key={i}
                data-written={i < written}
                className="naam-box aspect-3/1 rounded-[3px] text-[0.7rem] leading-none sm:text-[0.62rem]"
              >
                राम
              </span>
            ))}
          </div>

          <p className="mt-4 border-t border-dashed border-marigold/30 pt-3 font-mono text-[0.58rem] uppercase tracking-[0.14em] text-haldi/80">
            B5 · 185 × 240 mm · 70 GSM · spiral bound
          </p>
        </div>
      </div>
    </div>
  );
}

/* Section 10 — Naam Lekhan */
export default function NaamLekhan() {
  return (
    <section
      id="naam"
      className="relative scroll-mt-24 overflow-hidden border-y border-marigold/20 bg-marigold-50 py-14 sm:py-16 lg:py-20"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-10 h-[30rem] w-[30rem] rounded-full bg-marigold/10 blur-[100px]"
      />

      <div className="relative mx-auto max-w-[1240px] px-5 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:gap-16">
          <div>
            <Reveal>
              <Eyebrow filled={1} tone="marigold">
                Naam Lekhan
              </Eyebrow>
            </Reveal>

            <Reveal delay={70}>
              <h2 className="mt-5 text-[2.1rem] leading-[1.06] text-haldi sm:text-[2.7rem] lg:text-[3.15rem]">
                A different kind of practice book.
              </h2>
            </Reveal>

            <Reveal delay={120}>
              <p className="mt-3 font-deva text-[1.35rem] leading-relaxed text-marigold sm:text-[1.5rem]">
                एक नाम, एक बॉक्स, एक साँस।
              </p>
            </Reveal>

            <Reveal delay={170}>
              <p className="mt-5 max-w-xl text-[1.02rem] leading-relaxed text-haldi/80 sm:text-[1.08rem]">
                The same care that goes into an exam sheet goes into these. Wide boxes, honest paper,
                a cover you can keep anywhere in the house, and a format that counts your rounds so
                you don&apos;t have to.
              </p>
            </Reveal>

            <div className="mt-10 grid gap-x-8 gap-y-7 sm:grid-cols-2">
              {NOTES.map((n, i) => (
                <Reveal key={n.head} delay={200 + i * 70}>
                  <div className="border-t border-marigold/25 pt-4">
                    <h3
                      className="text-[1.05rem] leading-snug text-haldi"
                      style={{ fontVariationSettings: '"SOFT" 26, "WONK" 1, "opsz" 22' }}
                    >
                      {n.head}
                    </h3>
                    <p className="mt-2 text-[0.9rem] leading-relaxed text-haldi/85">{n.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal delay={140}>
            <NaamSection />
          </Reveal>
        </div>

        {/* the size ladder */}
        <Reveal delay={120}>
          <div className="mt-16 lg:mt-20">
            <p className="font-mono text-[0.66rem] uppercase tracking-[0.2em] text-haldi/80">
              Choose your sankalp
            </p>
            <div className="mt-5 grid gap-px overflow-hidden rounded-card border border-marigold/25 bg-marigold/20 sm:grid-cols-2 lg:grid-cols-5">
              {SIZES.map((s) => (
                <a
                  key={s.count}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-4 bg-marigold-50 p-6 transition-colors duration-300 hover:bg-white"
                >
                  <div>
                    <p
                      className="text-[1.6rem] leading-none text-haldi"
                      style={{ fontFamily: "var(--font-display)", fontVariationSettings: '"SOFT" 40, "WONK" 1' }}
                    >
                      {s.count}
                    </p>
                    <p className="mt-2 text-[0.82rem] text-haldi/80">{s.note}</p>
                  </div>
                  <ArrowUpRight
                    size={17}
                    strokeWidth={2}
                    className="flex-none text-marigold/50 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-marigold"
                  />
                </a>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

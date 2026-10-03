"use client"
import { useRef } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Reveal, SectionHeading, SpecChip } from "./Bits";
import { bestsellers, STORE_URL } from "../lib/content";

/* Section 6 — bestsellers */
export default function Bestsellers() {
  const scrollerRef = useRef(null);

  const scrollByCard = (dir) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector("[data-card]");
    const amount = card ? card.offsetWidth + 20 : 320;
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  return (
    <section
      id="bestsellers"
      className="relative scroll-mt-24 border-y border-ink/10 bg-paper-2 py-16"
    >
      <div className="mx-auto px-5 lg:px-24">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Bought most"
            filled={1}
            title="The product that keep going out of stock."
            lead="Live prices sit on Amazon, where they change with the season. Everything below ships fulfilled by Amazon."
          />
          <Reveal delay={140}>
            <div className="flex items-center gap-3 self-start lg:self-end">
              <a
                href={STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full border border-ink/15 px-6 py-3.5 text-[0.92rem] font-medium text-ink transition-colors hover:border-ink/40 hover:bg-ink/5"
              >
                See all listings
                <ArrowUpRight
                  size={15}
                  strokeWidth={2.2}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>

              <div className="hidden items-center gap-2 sm:flex">
                <button
                  type="button"
                  onClick={() => scrollByCard(-1)}
                  aria-label="Scroll left"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 text-ink transition-colors hover:border-ink/40 hover:bg-ink/5"
                >
                  <ChevronLeft size={17} strokeWidth={2.2} />
                </button>
                <button
                  type="button"
                  onClick={() => scrollByCard(1)}
                  aria-label="Scroll right"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 text-ink transition-colors hover:border-ink/40 hover:bg-ink/5"
                >
                  <ChevronRight size={17} strokeWidth={2.2} />
                </button>
              </div>
            </div>
          </Reveal>
        </div>

        <div
          ref={scrollerRef}
          className="mt-5 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 lg:mt-16 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {bestsellers.map((p, i) => (
            <Reveal
              key={p.name}
              delay={(i % 4) * 80}
              data-card
              className="w-[78%] shrink-0 snap-start sm:w-[45%] lg:w-[24%]"
            >
<a
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col rounded-card border border-ink/10 bg-paper p-3.5 shadow-paper transition-all duration-400 hover:-translate-y-1.5 hover:border-ink/25 hover:shadow-lift"
              >
                <div className="relative aspect-4/5 w-full overflow-hidden rounded-[12px] border border-ink/10 bg-white">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.image}
                    alt={p.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    loading="lazy"
                  />
                  <span className="absolute left-2.5 top-2.5 rounded-full bg-ink/90 px-2.5 py-1 font-mono text-[0.58rem] tracking-wide text-paper">
                    {p.tag}
                  </span>
                </div>

                <div className="flex flex-1 flex-col px-1.5 pb-1 pt-4">
                  <h3
                    className="text-[1.06rem] leading-[1.2] text-ink"
                    style={{ fontVariationSettings: '"SOFT" 26, "WONK" 1, "opsz" 24' }}
                  >
                    {p.name}
                  </h3>
                  <p className="mt-1.5 text-[0.84rem] leading-snug text-ink-40">{p.sub}</p>

                  <div className="mt-3.5 flex flex-wrap gap-1.5">
                    {p.specs.map((s) => (
                      <SpecChip key={s}>{s}</SpecChip>
                    ))}
                  </div>

                  <span className="mt-auto flex items-center gap-1.5 pt-5 text-[0.86rem] font-medium text-leaf-700">
                    View on Amazon
                    <ArrowUpRight
                      size={14}
                      strokeWidth={2.4}
                      className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
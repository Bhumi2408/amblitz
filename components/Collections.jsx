"use client";

import { useState } from "react";
import { ArrowUpRight, ImageOff } from "lucide-react";
import { Reveal, SectionHeading, SpecChip } from "./Bits";
import { collections } from "../lib/content";

/* Section 7 — collections */
export default function Collections() {
  const [active, setActive] = useState(collections[0].id);
  const activeCollection =
    collections.find((c) => c.id === active) ?? collections[0];

  return (
    <section
      id="collections"
      className="relative scroll-mt-24 border-y border-ink/10 bg-paper py-24"
    >
      <div className="mx-auto px-5 lg:px-24">
        <SectionHeading
          eyebrow="Browse by type"
          filled={1}
          title="Every category, in one place."
          lead="Pick a category to see what's in it — everything ships fulfilled by Amazon."
        />

        {/* Tabs — horizontal scroll on mobile, wraps on desktop */}
        <Reveal delay={100}>
          <div className="mt-10 -mx-5 px-5 lg:mx-0 lg:px-0">
            <div className="flex gap-2 overflow-x-auto pb-3 lg:flex-wrap lg:overflow-visible lg:pb-0 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {collections.map((c) => {
                const isActive = c.id === active;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setActive(c.id)}
                    className={`shrink-0 whitespace-nowrap rounded-full border px-4 py-2.5 text-[0.86rem] font-medium transition-all duration-300 ${
                      isActive
                        ? "border-ink bg-ink text-paper"
                        : "border-ink/15 text-ink/70 hover:border-ink/35 hover:text-ink"
                    }`}
                  >
                    {c.label}
                  </button>
                );
              })}
            </div>
          </div>
        </Reveal>

        {/* Product grid for active tab */}
        <div className="mt-10">
          {activeCollection.products.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-2 rounded-card border border-dashed border-ink/15 bg-paper-2 py-16 text-center">
              <p className="text-[0.95rem] text-ink-40">
                Products coming soon for “{activeCollection.label}”.
              </p>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {activeCollection.products.map((p, i) => (
                // href is globally unique across every category — safer key than name,
                // which can repeat and confuse React into reusing a stale card.
                <Reveal key={p.href} delay={(i % 4) * 80} className="h-full">
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex h-full flex-col rounded-card border border-ink/10 bg-paper p-3.5 shadow-paper transition-all duration-400 hover:-translate-y-1.5 hover:border-ink/25 hover:shadow-lift"
                  >
                    <div className="relative aspect-4/5 w-full overflow-hidden rounded-[12px] border border-ink/10 bg-paper-2">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={p.image}
                        alt={p.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                        loading={i < 4 ? "eager" : "lazy"}
                        decoding="async"
                        onError={(e) => {
                          // Missing/broken image → hide the broken icon and show a clean placeholder
                          e.currentTarget.style.display = "none";
                          e.currentTarget.parentElement
                            .querySelector("[data-fallback]")
                            ?.classList.remove("hidden");
                        }}
                      />
                      <div
                        data-fallback
                        className="absolute inset-0 hidden flex-col items-center justify-center gap-2 bg-paper-2 text-ink-40"
                      >
                        <ImageOff size={22} strokeWidth={1.6} />
                        <span className="px-3 text-center text-[0.7rem] leading-snug">
                          Image coming soon
                        </span>
                      </div>
                      {p.tag && (
                        <span className="absolute left-2.5 top-2.5 rounded-full bg-ink/90 px-2.5 py-1 font-mono text-[0.58rem] tracking-wide text-paper">
                          {p.tag}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-1 flex-col px-1.5 pb-1 pt-4">
                      <h3
                        className="text-[1.06rem] leading-[1.2] text-ink"
                        style={{
                          fontVariationSettings:
                            '"SOFT" 26, "WONK" 1, "opsz" 24',
                        }}
                      >
                        {p.name}
                      </h3>
                      <p className="mt-1.5 text-[0.84rem] leading-snug text-ink-40">
                        {p.sub}
                      </p>

                      {p.specs?.length > 0 && (
                        <div className="mt-3.5 flex flex-wrap gap-1.5">
                          {p.specs.map((s) => (
                            <SpecChip key={s}>{s}</SpecChip>
                          ))}
                        </div>
                      )}

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
          )}
        </div>
      </div>
    </section>
  );
}
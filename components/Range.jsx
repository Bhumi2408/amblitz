import { ArrowRight } from "lucide-react";
import { Reveal, SectionHeading, SpecChip } from "./Bits";
import { categories } from "../lib/content";

const TONES = {
  leaf: {
    card: "bg-leaf-50 border-leaf-600/15 hover:border-leaf-600/40",
    dot: "bg-leaf-500",
    hindi: "text-leaf-700/70",
    chip: "leaf",
  },
  mango: {
    card: "bg-mango-100 border-mango-500/20 hover:border-mango-500/50",
    dot: "bg-mango-400",
    hindi: "text-mango-500",
    chip: "ink",
  },
  ink: {
    card: "bg-paper-2 border-ink/12 hover:border-ink/35",
    dot: "bg-ink",
    hindi: "text-ink-40",
    chip: "ink",
  },
  marigold: {
    card: "bg-marigold-50 border-marigold/20 hover:border-marigold/50",
    dot: "bg-marigold",
    hindi: "text-haldi/70",
    chip: "marigold",
  },
};

/* Section 5 — what amBlitz actually makes */
export default function Range() {
  return (
    <section id="range" className="relative bg-paper-2 scroll-mt-24 py-14 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-[1240px] px-5 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="The range"
            filled={0}
            title="Four things, made properly."
            lead="Everything here started as something a student couldn't find in a shop. There is no fifth category, and there won't be one until something is missing again."
          />
          <Reveal delay={140}>
            <p className="max-w-xs font-mono text-[0.72rem] leading-relaxed uppercase tracking-[0.14em] text-ink-40 lg:text-right">
              amBlitz is Ambition + Blitz.
              <br />
              Notebooks for a student,
              <br />
              from a student.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {categories.map((cat, i) => {
            const t = TONES[cat.tone];
            return (
              <Reveal key={cat.id} delay={i * 90} className="h-full">
                <a
                  href={cat.href}
                  className={`group relative flex h-full flex-col justify-between overflow-hidden rounded-card border p-6 transition-all duration-400 hover:-translate-y-1.5 ${t.card}`}
                >
                  {/* spiral binding along the top edge of the card */}
                  <span aria-hidden="true" className="spiral absolute inset-x-6 top-0 h-4 opacity-25" />

                  <div className="pt-4">
                    <div className="flex items-center gap-2">
                      <span className={`h-2 w-2 rounded-full ${t.dot}`} />
                      <span className={`font-deva text-[0.85rem] ${t.hindi}`}>{cat.hindi}</span>
                    </div>

                    <h3
                      className="mt-4 text-[1.42rem] leading-[1.12] text-ink"
                      style={{ fontVariationSettings: '"SOFT" 30, "WONK" 1, "opsz" 30' }}
                    >
                      {cat.name}
                    </h3>

                    <p className="mt-3 text-[0.93rem] leading-relaxed text-ink-70">{cat.line}</p>
                  </div>

                  <div className="mt-7">
                    <div className="flex flex-wrap gap-1.5">
                      {cat.specs.map((s) => (
                        <SpecChip key={s} tone={t.chip}>
                          {s}
                        </SpecChip>
                      ))}
                    </div>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-[0.86rem] font-medium text-ink">
                      See these
                      <ArrowRight
                        size={15}
                        strokeWidth={2.2}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </span>
                  </div>
                </a>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

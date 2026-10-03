import { ArrowUpRight } from "lucide-react";
import { Reveal, SectionHeading } from "./Bits";
import { stats, buyingChannels } from "../lib/content";

/* Section 11 — the numbers that actually mean something */
export function Numbers() {
  return (
    <section aria-label="amBlitz in numbers" className="py-16 sm:py-20">
      <div className="mx-auto max-w-[1240px] px-5 lg:px-8">
        <div className="grid gap-px overflow-hidden rounded-card border border-ink/12 bg-ink/10 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 80} className="h-full">
              <div className="h-full bg-paper p-7">
                <p className="flex items-baseline gap-1.5">
                  <span
                    className="text-[2.5rem] leading-none text-leaf-600"
                    style={{ fontFamily: "var(--font-display)", fontVariationSettings: '"SOFT" 40, "WONK" 1' }}
                  >
                    {s.value}
                  </span>
                  {s.unit ? (
                    <span className="font-mono text-[0.8rem] text-ink-40">{s.unit}</span>
                  ) : null}
                </p>
                <p className="mt-3 text-[0.9rem] leading-snug text-ink-70">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* Section 12 — where to buy */
export function Channels() {
  return (
    <section className="pb-24 sm:pb-28 lg:pb-32">
      <div className="mx-auto max-w-[1240px] px-5 lg:px-8">
        <SectionHeading
          eyebrow="Where to buy"
          filled={2}
          title="Three ways to get a stack on your desk."
          lead="Everyday orders go through Amazon. Anything above a few dozen copies is better handled directly."
        />

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {buyingChannels.map((c, i) => (
            <Reveal key={c.name} delay={i * 90} className="h-full">
              <a
                href={c.href}
                target={c.href.startsWith("#") ? undefined : "_blank"}
                rel={c.href.startsWith("#") ? undefined : "noopener noreferrer"}
                className="group flex h-full flex-col justify-between rounded-card border border-ink/12 bg-paper p-7 transition-all duration-400 hover:-translate-y-1 hover:border-leaf-600/40 hover:bg-leaf-50"
              >
                <div>
                  <h3
                    className="text-[1.3rem] leading-tight text-ink"
                    style={{ fontVariationSettings: '"SOFT" 30, "WONK" 1, "opsz" 28' }}
                  >
                    {c.name}
                  </h3>
                  <p className="mt-3 text-[0.94rem] leading-relaxed text-ink-70">{c.line}</p>
                </div>
                <span className="mt-8 inline-flex items-center gap-1.5 text-[0.88rem] font-medium text-leaf-700">
                  {c.cta}
                  <ArrowUpRight
                    size={14}
                    strokeWidth={2.4}
                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

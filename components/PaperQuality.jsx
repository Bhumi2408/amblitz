import { Reveal, SectionHeading } from "./Bits";

function Swatch({ gsm, caption, ghost, highlight }) {
  return (
    <div
      className={`relative overflow-hidden rounded-card border p-5 transition-colors ${
        highlight ? "border-leaf-600/35 bg-white" : "border-ink/12 bg-paper-2"
      }`}
    >
      <div className="flex items-baseline justify-between">
        <p className="font-mono text-[0.95rem] text-ink">{gsm}</p>
        {highlight ? (
          <span className="rounded-full bg-leaf-600 px-2.5 py-0.5 font-mono text-[0.58rem] uppercase tracking-wide text-paper">
            Amblitz Brand
          </span>
        ) : (
          <span className="font-mono text-[0.58rem] uppercase tracking-wide text-ink-40">Other Brands</span>
        )}
      </div>

      {/* the page: writing on top, the reverse side showing through or not */}
      <div className="relative mt-4 h-32 overflow-hidden rounded-lg border border-ink/10 bg-white">
        <div className="ruled-tight absolute inset-0 opacity-60" />

        {/* ghost of the reverse side */}
        <p
          aria-hidden="true"
          className={`absolute inset-x-4 top-1 -scale-x-100 text-[0.82rem] leading-[26px] text-ink blur-[0.4px] ${
            ghost ? "opacity-25" : "opacity-0"
          }`}
        >
          reverse side bleeding through the sheet
        </p>

        <p className="absolute inset-x-4 top-[30px] text-[0.86rem] leading-[26px] text-ink">
          Answer 14 — the pen stays put
        </p>
      </div>

      <p className="mt-4 text-[0.85rem] leading-relaxed text-ink-70">{caption}</p>
    </div>
  );
}

/* Section 9 — paper */
export default function PaperQuality() {
  return (
    <section className="relative py-12 sm:py-14 lg:py-16">
      <div className="mx-auto max-w-[1240px] px-5 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="The paper"
              filled={0}
              title="70 GSM, because 55 shows through."
              lead="Cheap practice paper is a false economy. You write on one side, the other side becomes unusable, and half your notebook is gone before the syllabus is."
            />

            <Reveal delay={160}>
              <dl className="mt-10 divide-y divide-ink/10 border-y border-ink/10">
                {[
                  ["Weight", "70 GSM white, uncoated"],
                  ["Binding", "Spiral, opens flat at 180°"],
                  ["Sizes", "A4 for exams, B5"],
                  ["Print", "Fine Offset Printing"],
                ].map(([k, v]) => (
                  <div key={k} className="flex items-baseline justify-between gap-6 py-4">
                    <dt className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-ink-40">
                      {k}
                    </dt>
                    <dd className="text-right text-[0.98rem] text-ink">{v}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:pt-6">
            <Reveal delay={80}>
              <Swatch
                gsm="55 GSM"
                ghost
                caption="Thin stock. Ballpoint pressure carries to the reverse, so the back of every page is noise you have to write around."
              />
            </Reveal>
            <Reveal delay={160}>
              <Swatch
                gsm="70 GSM"
                highlight
                caption="Thick enough that both sides stay usable, and heavy enough that a spiral notebook survives a year of being shoved into a bag."
              />
            </Reveal>
            <Reveal delay={240} className="sm:col-span-2">
              <div className="rounded-card border border-mango-500/25 bg-mango-100 p-6">
                <p className="text-[1.02rem] leading-relaxed text-ink">
                  A notebook is a year-long object. It gets carried, dropped, rained on, and opened
                  four hundred times. Every spec here is chosen for month eleven, not day one.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

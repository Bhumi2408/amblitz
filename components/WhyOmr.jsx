import { Reveal, SectionHeading } from "./Bits";

const POINTS = [
  {
    label: "The clock",
    title: "Circling is not free",
    body: "About five seconds per question, and a NEET paper has a hundred and eighty of them. That is a quarter of an hour you never budgeted for, discovered on the worst possible day.",
  },
  {
    label: "The scanner",
    title: "A machine reads this, not a teacher",
    body: "Blue or black ballpoint, filled edge to edge, no stray marks. Gel ink that bleeds and pencil that smudges both fail quietly — better to find that out on a practice sheet.",
  },
  {
    label: "The layout",
    title: "Your hand learns the geography",
    body: "Same bubble size, same pitch, same column breaks. After a dozen sheets you stop hunting for question 94 and your eyes go straight to it.",
  },
];

/* A time budget bar: 180 minutes of paper, ~14.4 of it spent on circling */
function TimeBudget() {
  return (
    <div className="rounded-card border border-ink/12 bg-paper p-6 shadow-paper sm:p-8">
      <div className="flex items-baseline justify-between gap-4">
        <p className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-ink-40">
          One NEET paper · 180 minutes
        </p>
        <p className="font-mono text-[0.66rem] text-ink-40">180 Q</p>
      </div>

      <div className="mt-5 flex h-14 overflow-hidden rounded-lg border border-ink/12">
        <div className="graph relative flex-[92] bg-white">
          <span className="absolute inset-0 grid place-items-center px-2 text-center font-mono text-[0.62rem] uppercase tracking-[0.14em] text-ink-40">
            Reading · thinking · solving
          </span>
        </div>
        <div className="relative flex-[8] border-l border-ink/20 bg-ink">
          <span className="absolute inset-0 grid place-items-center font-mono text-[0.6rem] text-leaf-300">
            14:24
          </span>
        </div>
      </div>

      <div className="mt-3 flex items-start justify-between gap-4">
        <p className="text-[0.84rem] text-ink-40">
          The dark sliver is pen-on-paper circling time. It is the only part of the paper you can
          rehearse away completely.
        </p>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-4 border-t border-ink/10 pt-5">
        {[
          ["~4.8 s", "per bubble"],
          ["180", "bubbles"],
          ["8%", "of the paper"],
        ].map(([big, small]) => (
          <div key={small}>
            <p className="font-mono text-[1.15rem] text-ink">{big}</p>
            <p className="mt-0.5 text-[0.78rem] text-ink-40">{small}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* Section 7 — why practise on an OMR sheet at all */
export default function WhyOmr() {
  return (
    <section className="relative bg-paper-2 py-24 sm:py-10 lg:py-12">
      <div className="mx-auto max-w-[1240px] px-5 lg:px-8">
        <SectionHeading
          eyebrow="The case for practising"
          filled={2}
          title="You already know the answer. The question is how fast your pen agrees."
          lead="This is the part of exam prep nobody sells a course for, because it isn't knowledge. It's a motor habit, and it takes about a dozen sheets to build."
        />

        <div className="mt-14 grid gap-10 lg:mt-16 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
          <div className="flex flex-col gap-px overflow-hidden rounded-card border border-ink/12 bg-ink/8">
            {POINTS.map((p, i) => (
              <Reveal key={p.label} delay={i * 90}>
                <div className="group bg-paper p-6 transition-colors duration-300 hover:bg-leaf-50 sm:p-7">
                  <div className="flex items-center gap-2.5">
                    <span className="bubble bubble-leaf" aria-hidden="true" />
                    <span className="font-mono text-[0.64rem] uppercase tracking-[0.2em] text-ink-40">
                      {p.label}
                    </span>
                  </div>
                  <h3
                    className="mt-3.5 text-[1.32rem] leading-tight text-ink"
                    style={{ fontVariationSettings: '"SOFT" 30, "WONK" 1, "opsz" 28' }}
                  >
                    {p.title}
                  </h3>
                  <p className="mt-2.5 text-[0.95rem] leading-relaxed text-ink-70">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={120} className="lg:pt-2">
            <TimeBudget />
            <p className="mt-6 border-l-2 border-marker/40 pl-5 text-[0.95rem] leading-relaxed text-ink-70">
              These sheets are specimens, not reprints of any board&apos;s paper. Read the
              instructions printed on your real sheet on exam day — every board designs its own.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

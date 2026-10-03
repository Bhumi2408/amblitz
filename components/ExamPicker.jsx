import { ArrowUpRight } from "lucide-react";
import { Reveal, SectionHeading } from "./Bits";
import { exams } from "@/lib/content";

/* Section 8 — pick by exam */
export default function ExamPicker() {
  return (
    <section
      id="exams"
      className="relative scroll-mt-24 overflow-hidden border-y border-ink/10 bg-board py-24 text-paper sm:py-28 lg:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-1/3 h-[26rem] w-[26rem] rounded-full bg-leaf-600/20 blur-[100px]"
      />

      <div className="relative mx-auto max-w-[1240px] px-5 lg:px-8">
        <SectionHeading
          eyebrow="Pick by exam"
          filled={3}
          tone="paper"
          title="Tell us what you're sitting for."
          lead="Different papers, different bubble counts. Here is the shortest path from your exam to the right sheet."
        />

        <div className="mt-14 grid gap-px overflow-hidden rounded-card border border-paper/12 bg-paper/12 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {exams.map((exam, i) => (
            <Reveal key={exam.code} delay={(i % 3) * 80} className="h-full">
              <a
                href={exam.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col bg-board p-7 transition-colors duration-400 hover:bg-board-2"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p
                      className="text-[2rem] leading-none text-leaf-300"
                      style={{ fontFamily: "var(--font-display)", fontVariationSettings: '"SOFT" 40, "WONK" 1' }}
                    >
                      {exam.code}
                    </p>
                    <p className="mt-2 text-[0.86rem] text-paper/55">{exam.full}</p>
                  </div>
                  <ArrowUpRight
                    size={17}
                    strokeWidth={2}
                    className="mt-1 flex-none text-paper/35 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-leaf-300"
                  />
                </div>

                <div className="mt-6 border-t border-paper/12 pt-5">
                  <p className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-paper/40">
                    {exam.mcq}
                  </p>
                  <p className="mt-2.5 text-[1.02rem] leading-snug text-paper">{exam.pick}</p>
                  <p className="mt-2.5 text-[0.88rem] leading-relaxed text-paper/50">{exam.note}</p>
                </div>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <p className="mt-8 text-center font-mono text-[0.68rem] uppercase tracking-[0.16em] text-paper/40">
            Sitting for something not listed? Any 100 MCQ sheet covers most state and staff-selection papers.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

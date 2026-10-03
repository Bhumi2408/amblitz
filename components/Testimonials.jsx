import { Reveal, SectionHeading } from "./Bits";
import { testimonials } from "../lib/content";

const TONES = {
  leaf: "bg-leaf-50 border-leaf-600/15",
  mango: "bg-mango-100 border-mango-500/20",
  marigold: "bg-marigold-50 border-marigold/20",
  ink: "bg-paper-2 border-ink/12",
};

const TILT = ["-0.6deg", "0.7deg", "-0.4deg", "0.5deg"];

/* Section 14 — what people write back */
export default function Testimonials() {
  return (
    <section className="py-14 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-[1240px] px-5 lg:px-8">
        <SectionHeading
          eyebrow="What comes back"
          filled={0}
          align="center"
          title="Four notes we kept."
          lead="Illustrative of the feedback we hear most often — the circling clock, the printed margin, and the width of a box."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {testimonials.map((t, i) => (
            <Reveal key={t.who} delay={i * 90} className="h-full">
              <figure
                className={`flex h-full rotate-[var(--tilt)] flex-col justify-between rounded-card border p-6 transition-transform duration-500 hover:rotate-0 ${TONES[t.tone]}`}
                style={{ "--tilt": TILT[i % TILT.length] }}
              >
                <blockquote className="text-[0.98rem] leading-relaxed text-ink">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-7 border-t border-ink/10 pt-4">
                  <p className="text-[0.92rem] font-medium text-ink">{t.who}</p>
                  <p className="mt-0.5 font-mono text-[0.66rem] uppercase tracking-[0.14em] text-ink-40">
                    {t.role}
                  </p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

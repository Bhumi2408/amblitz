import Image from "next/image";
import { Reveal, Eyebrow } from "./Bits";

/* Section 15 — the name, and where it comes from */
export default function Story() {
  return (
    <section className="relative overflow-hidden border-y border-ink/10 py-14 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-[1240px] px-5 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <Reveal className="order-2 lg:order-1">
            <div className="relative mx-auto max-w-[25rem]">
              <div
                aria-hidden="true"
                className="absolute -inset-6 rounded-full bg-leaf-100/70 blur-[50px]"
              />
              <div className="relative rounded-slab border border-ink/10 bg-paper p-9 shadow-paper">
                <span aria-hidden="true" className="spiral absolute inset-x-8 top-0 h-4 opacity-30" />
                <Image
                  src="/about-image.png"
                  alt="The amBlitz mascot: a tree with a face, above the wordmark and the line Get into Action"
                  width={688}
                  height={600}
                  className="h-auto w-full"
                />
              </div>
            </div>
          </Reveal>

          <div className="order-1 lg:order-2">
            <Reveal>
              <Eyebrow filled={2}>The name</Eyebrow>
            </Reveal>

            <Reveal delay={70}>
              <h2 className="mt-5 text-[2.1rem] leading-[1.06] sm:text-[2.7rem] lg:text-[3.1rem]">
                Ambition, and the speed to act on it.
              </h2>
            </Reveal>

            <Reveal delay={130}>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                {["Ambition", "+", "Blitz", "=", "amBlitz"].map((word, i) => (
                  <span
                    key={i}
                    className={`font-mono text-[0.9rem] ${
                      word === "+" || word === "=" ? "text-ink-20" : "rounded-full border border-ink/12 bg-paper px-4 py-2 text-ink"
                    }`}
                  >
                    {word}
                  </span>
                ))}
              </div>
            </Reveal>

            <Reveal delay={190}>
              <div className="mt-8 max-w-xl space-y-5 text-[1.02rem] leading-relaxed text-ink-70 sm:text-[1.07rem]">
                <p>
                  It started with a problem nobody would solve: a student wanted OMR sheets to
                  practise on and could only find photocopies with the bubbles in the wrong places.
                  So the first batch got printed properly, for a batch of friends.
                </p>
                <p>
                  That&apos;s still the brief. Notebooks for a student, from a student — premium
                  paper at a price a student is actually paying, not the one a stationery brand
                  wishes they were.
                </p>
                <p>
                  The tree on the cover is doing the same thing you are: growing, roots planted,
                  looking slightly amused about the whole business.
                </p>
              </div>
            </Reveal>

            <Reveal delay={250}>
              <div className="mt-10 grid max-w-lg grid-cols-2 gap-6 border-t border-ink/10 pt-7 sm:grid-cols-3">
                {[
                  ["Printed", "in India"],
                  ["Priced", "for students"],
                  ["Made", "for month eleven"],
                ].map(([a, b]) => (
                  <div key={a}>
                    <p className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-ink-40">{a}</p>
                    <p className="mt-1 text-[0.98rem] text-ink">{b}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

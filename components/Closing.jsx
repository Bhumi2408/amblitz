import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "./Bits";
import { nav, categories, STORE_URL } from "../lib/content";
import Link from "next/link";

/* Section 17 — closing call to action */
export function FinalCta() {
  return (
    <section className="px-5 pb-20 lg:px-8">
      <div className="relative mx-auto max-w-[1240px] overflow-hidden rounded-slab border border-ink/12 bg-ink px-6 py-16 text-center sm:px-12 sm:py-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-leaf-600/25 blur-[80px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-28 -right-16 h-72 w-72 rounded-full bg-mango-400/20 blur-[80px]"
        />

        {/* a row of bubbles, all filled — the sheet is finished */}
        <Reveal>
          <div className="flex justify-center gap-1.5" aria-hidden="true">
            {Array.from({ length: 9 }).map((_, i) => (
              <span
                key={i}
                className="h-2.5 w-2.5 rounded-full"
                style={{
                  background: i % 3 === 1 ? "var(--color-mango-300)" : "var(--color-leaf-400)",
                  opacity: 0.35 + (i / 9) * 0.65,
                }}
              />
            ))}
          </div>
        </Reveal>

        <Reveal delay={80}>
          <h2 className="relative mx-auto mt-8 max-w-2xl text-[2.2rem] leading-[1.05] text-paper sm:text-[3rem] lg:text-[3.4rem]">
            Start the sheet today, finish the paper on time.
          </h2>
        </Reveal>

        <Reveal delay={140}>
          <p className="relative mx-auto mt-5 max-w-xl text-[1.03rem] leading-relaxed text-paper/60">
            The whole range is on the amBlitz Amazon store — OMR sheets, answer notebooks, ruled
            spirals and Naam Lekhan pustikas, fulfilled by Amazon.
          </p>
        </Reveal>

        <Reveal delay={200}>
          <div className="relative mt-10 flex flex-wrap items-center justify-center gap-3">
            <a
              href={STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 rounded-full bg-leaf-500 px-7 py-4 text-[0.98rem] font-medium text-board transition-all duration-300 hover:-translate-y-0.5 hover:bg-leaf-400"
            >
              Open the amBlitz store
              <ArrowUpRight
                size={16}
                strokeWidth={2.4}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
            <a
              href="#bulk"
              className="inline-flex items-center gap-2 rounded-full border border-paper/25 px-7 py-4 text-[0.98rem] font-medium text-paper transition-colors duration-300 hover:bg-paper/10"
            >
              Ordering in bulk
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* Section 18 — footer */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-ink/10 bg-paper-2">
      <div className="mx-auto max-w-[1240px] px-5 py-16 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr_1fr]">
          <div>
            <Image
              src="/amblitz-logo.png"
              alt="amBlitz"
              width={688}
              height={544}
              className="h-auto w-44"
            />
            <p className="mt-5 max-w-sm text-[0.95rem] leading-relaxed text-ink-70">
              Practice stationery made by a student, for students. Premium paper at prices a student
              is actually paying.
            </p>
          </div>

          <div>
            <p className="font-mono text-[0.64rem] uppercase tracking-[0.2em] text-ink-40">
              What we make
            </p>
            <ul className="mt-5 space-y-3">
              {categories.map((c) => (
                <li key={c.id}>
                  <a
                    href={c.href}
                    className="text-[0.95rem] text-ink-70 transition-colors hover:text-ink"
                  >
                    {c.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-[0.64rem] uppercase tracking-[0.2em] text-ink-40">
              On this page
            </p>
            <ul className="mt-5 space-y-3">
              {nav.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    className="text-[0.95rem] text-ink-70 transition-colors hover:text-ink"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-ink/10 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-ink-40">
            © {year} amBlitz | Powered By <Link href="https://www.cybertricksmedia.com/" target="_blank" className="text-[#1d4e0c]">Cybertricksmedia Pvt Ltd</Link>
          </p>
          <p className="max-w-xl text-[0.78rem] leading-relaxed text-ink-40">
            OMR sheets sold here are practice specimens. Exam boards design their own answer sheets —
            always read the instructions printed on your actual paper.
          </p>
        </div>
      </div>
    </footer>
  );
}

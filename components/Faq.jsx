"use client";

import { useState } from "react";
import { SectionHeading } from "./Bits";
import { faqs } from "../lib/content";

/* Section 16 — FAQ. The toggle is a bubble that fills when you answer it. */
export default function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="scroll-mt-24 py-12 sm:py-14 lg:py-16">
      <div className="mx-auto max-w-[1240px] px-5 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Asked often"
              filled={1}
              title="Before you order."
              lead="Mostly about paper, pens and how many naam fit in a book."
            />
          </div>

          <div className="lg:pt-4">
            <ul className="divide-y divide-ink/12 border-y border-ink/12">
              {faqs.map((item, i) => {
                const isOpen = open === i;
                return (
                  <li key={item.q}>
                    <h3>
                      <button
                        type="button"
                        onClick={() => setOpen(isOpen ? -1 : i)}
                        aria-expanded={isOpen}
                        aria-controls={`faq-panel-${i}`}
                        className="group flex w-full items-start gap-4 py-5 text-left"
                      >
                        <span
                          aria-hidden="true"
                          className={`mt-1 flex h-[18px] w-[18px] flex-none items-center justify-center rounded-full border-[1.5px] transition-all duration-300 ${
                            isOpen
                              ? "border-leaf-600 bg-leaf-500"
                              : "border-ink/25 bg-transparent group-hover:border-leaf-600"
                          }`}
                        >
                          <span
                            className={`h-2 w-2 rounded-full bg-paper transition-transform duration-300 ${
                              isOpen ? "scale-100" : "scale-0"
                            }`}
                          />
                        </span>
                        <span
                          className={`flex-1 text-[1.06rem] leading-snug transition-colors duration-300 sm:text-[1.13rem] ${
                            isOpen ? "text-ink" : "text-ink-70 group-hover:text-ink"
                          }`}
                          style={{
                            fontFamily: "var(--font-display)",
                            fontVariationSettings: '"SOFT" 26, "WONK" 1, "opsz" 22',
                          }}
                        >
                          {item.q}
                        </span>
                      </button>
                    </h3>

                    <div
                      id={`faq-panel-${i}`}
                      className={`grid transition-[grid-template-rows,opacity] duration-400 ease-out ${
                        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="pb-6 pl-[34px] pr-2 text-[0.97rem] leading-relaxed text-ink-70">
                          {item.a}
                        </p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            <p className="mt-7 text-[0.92rem] text-ink-40">
              Something else on your mind? The bulk form above reaches the same inbox — it takes
              ordinary questions too.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

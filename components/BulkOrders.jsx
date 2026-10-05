"use client";

import { useState } from "react";
import { Send, Check } from "lucide-react";
import { Reveal, Eyebrow } from "./Bits";

const QUOTE_EMAIL = "ship.amblitz@gmail.com";

const WHO = [
  { title: "Coaching centres", line: "Weekend mocks for a full batch. Loose sheets, correct bubble pitch." },
  { title: "Schools & colleges", line: "Ruled spirals and answer booklets, delivered before the session starts." },
  { title: "Temples & satsang groups", line: "Naam Lekhan pustikas in quantity, for distribution or for a naam bank." },
  { title: "Libraries & NGOs", line: "Mixed cartons of practice material for reading rooms and free coaching drives." },
];

/* Section 13 — bulk & institutional */
export default function BulkOrders() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", org: "", contact: "", need: "" });

  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    const subject = `Bulk quote request — ${form.org}`;
    const body = `Name: ${form.name}\nInstitution: ${form.org}\nContact: ${form.contact}\n\nWhat we need:\n${form.need}`;
    window.location.href = `mailto:${QUOTE_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <section
      id="bulk"
      className="relative scroll-mt-24 overflow-hidden border-y border-ink/10 bg-leaf-800 py-16 text-paper sm:py-20 lg:py-24"
    >
      <div aria-hidden="true" className="ruled pointer-events-none absolute inset-0 opacity-[0.06]" />

      <div className="relative mx-auto max-w-[1240px] px-5 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
          <div>
            <Reveal>
              <Eyebrow filled={3} tone="paper">
                Bulk & institutional
              </Eyebrow>
            </Reveal>
            <Reveal delay={70}>
              <h2 className="mt-5 text-[2.1rem] leading-[1.06] text-paper sm:text-[2.7rem] lg:text-[3.1rem]">
                Ordering in Bulk
              </h2>
            </Reveal>
            <Reveal delay={130}>
              <p className="mt-5 max-w-lg text-[1.03rem] leading-relaxed text-paper/65">
                Institutional quantities ship direct, with a quote and a delivery date before you
                commit. Tell us the format and the headcount — that&apos;s usually enough to price it.
              </p>
            </Reveal>

            <div className="mt-11 grid gap-x-8 gap-y-6 sm:grid-cols-2">
              {WHO.map((w, i) => (
                <Reveal key={w.title} delay={180 + i * 70}>
                  <div className="border-t border-paper/15 pt-4">
                    <h3
                      className="text-[1.05rem] text-paper"
                      style={{ fontVariationSettings: '"SOFT" 26, "WONK" 1, "opsz" 22' }}
                    >
                      {w.title}
                    </h3>
                    <p className="mt-2 text-[0.89rem] leading-relaxed text-paper/55">{w.line}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal delay={160}>
            <div className="rounded-card border border-paper/15 bg-board p-6 sm:p-8">
              {sent ? (
                <div className="flex min-h-[22rem] flex-col items-start justify-center">
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-leaf-500 text-board">
                    <Check size={22} strokeWidth={2.6} />
                  </span>
                  <h3 className="mt-6 text-[1.5rem] text-paper">Request noted.</h3>
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-paper/60">
                    A quote with quantities and a delivery date comes back to {form.contact || "you"} within
                    two working days. Nothing is confirmed until you reply to it.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSent(false)}
                    className="mt-7 text-[0.88rem] font-medium text-leaf-300 underline underline-offset-4"
                  >
                    Send another request
                  </button>
                </div>
              ) : (
                <form onSubmit={submit} className="flex flex-col gap-5">
                  <p className="font-mono text-[0.64rem] uppercase tracking-[0.2em] text-paper/45">
                    Ask for a quote
                  </p>

                  {[
                    { k: "name", label: "Your name", type: "text", ph: "Rajesh Nair" },
                    { k: "org", label: "Institution", type: "text", ph: "Sunrise Coaching, Kochi" },
                    { k: "contact", label: "Email or phone", type: "text", ph: "you@example.com" },
                  ].map((f) => (
                    <label key={f.k} className="block">
                      <span className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-paper/45">
                        {f.label}
                      </span>
                      <input
                        type={f.type}
                        required
                        value={form[f.k]}
                        onChange={update(f.k)}
                        placeholder={f.ph}
                        className="mt-2 w-full rounded-xl border border-paper/15 bg-board-2 px-4 py-3 text-[0.95rem] text-paper placeholder:text-paper/25 focus:border-leaf-400 focus:outline-none"
                      />
                    </label>
                  ))}

                  <label className="block">
                    <span className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-paper/45">
                      What you need
                    </span>
                    <textarea
                      required
                      rows={3}
                      value={form.need}
                      onChange={update("need")}
                      placeholder="400 loose OMR sheets, 100 MCQ format, needed by 12 September"
                      className="mt-2 w-full resize-none rounded-xl border border-paper/15 bg-board-2 px-4 py-3 text-[0.95rem] text-paper placeholder:text-paper/25 focus:border-leaf-400 focus:outline-none"
                    />
                  </label>

                  <button
                    type="submit"
                    className="mt-1 inline-flex items-center justify-center gap-2 rounded-full bg-leaf-500 px-6 py-3.5 text-[0.95rem] font-medium text-board transition-colors duration-300 hover:bg-leaf-400"
                  >
                    Send the request
                    <Send size={15} strokeWidth={2.2} />
                  </button>

                  <p className="text-[0.78rem] leading-relaxed text-paper/40">
                    You get a quote back, not an invoice. Nothing ships until you say yes to it. Or
                    email us directly at{" "}
                    <a href={`mailto:${QUOTE_EMAIL}`} className="text-leaf-300 underline underline-offset-4">
                      {QUOTE_EMAIL}
                    </a>
                    .
                  </p>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

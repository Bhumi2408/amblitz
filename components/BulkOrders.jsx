"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Send } from "lucide-react";
import { Reveal, Eyebrow } from "./Bits";

// Each enquiry is submitted once per key, so both Web3Forms inboxes get a copy.
// Paste the two access keys from web3forms.com here.
const WEB3FORMS_KEYS = ["d01b840f-738d-49ea-8bd1-7c9c6cfc451c", "9e8e7d69-b7ff-4161-99bd-40143db2d11f"];

const WHO = [
  { title: "Coaching centres", line: "Weekend mocks for a full batch. Loose sheets, correct bubble pitch." },
  { title: "Schools & colleges", line: "Ruled spirals and answer booklets, delivered before the session starts." },
  { title: "Temples & satsang groups", line: "Naam Lekhan pustikas in quantity, for distribution or for a naam bank." },
  { title: "Libraries & NGOs", line: "Mixed cartons of practice material for reading rooms and free coaching drives." },
];

/* Section 13 — bulk & institutional */
export default function BulkOrders() {
  const router = useRouter();
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", org: "", contact: "", need: "" });

  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setSending(true);
    setError("");

    const fields = {
      subject: `Bulk quote request — ${form.org}`,
      from_name: "amBlitz website",
      Name: form.name,
      Institution: form.org,
      "Email or phone": form.contact,
      "What they need": form.need,
    };

    const results = await Promise.allSettled(
      WEB3FORMS_KEYS.map((access_key) =>
        fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ access_key, ...fields }),
        }).then((r) => r.json())
      )
    );

    // Count it as sent if at least one inbox received it.
    if (results.some((r) => r.status === "fulfilled" && r.value.success)) {
      router.push("/thank-you");
    } else {
      setSending(false);
      setError("Could not send right now. Please try again, or message us on WhatsApp.");
    }
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
                    disabled={sending}
                    className="mt-1 inline-flex items-center justify-center gap-2 rounded-full bg-leaf-500 px-6 py-3.5 text-[0.95rem] font-medium text-board transition-colors duration-300 hover:bg-leaf-400 disabled:cursor-wait disabled:opacity-60"
                  >
                    {sending ? "Sending…" : "Send the request"}
                    <Send size={15} strokeWidth={2.2} />
                  </button>

                  {error && <p className="text-[0.85rem] text-mango-300">{error}</p>}

                  <p className="text-[0.78rem] leading-relaxed text-paper/40">
                    You get a quote back, not an invoice. Nothing ships until you say yes to it. 
                  </p>
                </form>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

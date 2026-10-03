const ITEMS = [
  "70 GSM thick paper",
  "Spiral bound, lies flat",
  "A4 & B5 true sizes",
  "Scanner-safe bubble pitch",
  "Pre-printed UPSC margins",
  "108 boxes per section",
  "No deity image on the cover",
  "Printed in India",
  "Fulfilled by Amazon",
  "Student pricing, always",
];

/* Section 4 — a running spec ribbon between the hero and the range */
export default function SpecMarquee() {
  return (
    <section aria-label="What every amBlitz product ships with" className="border-y border-ink/10 bg-leaf-800 py-4">
      <div className="edge-fade relative flex overflow-hidden">
        <ul className="flex w-max min-w-full shrink-0 animate-marquee items-center gap-10 pr-10">
          {[...ITEMS, ...ITEMS].map((item, i) => (
            <li key={i} className="flex flex-none items-center gap-10">
              <span className="font-mono text-[0.72rem] uppercase tracking-[0.2em] whitespace-nowrap text-leaf-100/85">
                {item}
              </span>
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-mango-300" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

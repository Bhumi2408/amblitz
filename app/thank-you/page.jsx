import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import { STORE_URL, WHATSAPP_URL } from "../../lib/content";

export const metadata = {
  title: "Thank you",
  robots: { index: false },
};

export default function ThankYou() {
  return (
    <main className="relative flex min-h-screen items-center overflow-hidden bg-paper px-5 py-16">
      <div aria-hidden="true" className="ruled pointer-events-none absolute inset-0 opacity-[0.35]" />

      <div className="relative mx-auto w-full max-w-xl">
        <Link href="/" aria-label="amBlitz home">
          <Image src="/amblitz-logo.png" alt="amBlitz" width={688} height={544} className="h-auto w-32" />
        </Link>

        <div className="mt-10 rounded-card border border-ink/10 bg-white p-7 shadow-sm sm:p-10">
          <span className="grid h-14 w-14 place-items-center rounded-full bg-leaf-500 text-white">
            <Check size={26} strokeWidth={2.6} />
          </span>

          <p className="mt-7 font-mono text-[0.64rem] uppercase tracking-[0.2em] text-ink-40">
            Request received
          </p>
          <h1 className="mt-3 text-[2rem] leading-[1.08] text-ink sm:text-[2.5rem]">
            Thank you. Your quote is on its way.
          </h1>
          <p className="mt-4 text-[1rem] leading-relaxed text-ink-70">
            We&apos;ll come back with quantities, pricing and a delivery date within two working
            days. Nothing is confirmed until you reply to the quote.
          </p>
          <p className="mt-3 text-[1rem] leading-relaxed text-ink-70">
            Need it sooner? Message us on WhatsApp and we&apos;ll pick it up right away.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-3.5 text-[0.95rem] font-medium text-paper transition-colors hover:bg-leaf-800"
            >
              <ArrowLeft size={16} strokeWidth={2.2} />
              Back to home
            </Link>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 text-[0.95rem] font-medium text-white transition-opacity hover:opacity-90"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>

        <a
          href={STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-1.5 text-[0.9rem] font-medium text-leaf-700 underline underline-offset-4"
        >
          Meanwhile, browse the amBlitz store on Amazon
          <ArrowUpRight size={15} strokeWidth={2.2} />
        </a>
      </div>
    </main>
  );
}

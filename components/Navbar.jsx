"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Menu, X, ArrowUpRight, ArrowRight } from "lucide-react";
import { nav, STORE_URL } from "../lib/content";

/* Section 1 — the strip above everything */
export function AnnouncementStrip() {
  return (
    <div className="relative z-50 bg-ink text-paper">
      <div className="mx-auto flex max-w-[1240px] items-center justify-center gap-x-6 gap-y-1 px-5 py-2.5 text-center">
        <p className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-paper/75">
          Printed in India
          <span className="mx-2 text-leaf-400">·</span>
          Fulfilled by Amazon
          <span className="mx-2 hidden text-leaf-400 sm:inline">·</span>
          <span className="hidden sm:inline">70 GSM paper across the range</span>
        </p>
      </div>
    </div>
  );
}

/* Section 2 — navigation */
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [stuck, setStuck] = useState(false);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-40 transition-[background-color,box-shadow,border-color] duration-500 ${
        stuck
          ? "border-b border-ink/8 bg-paper/85 shadow-[0_8px_30px_-24px_rgba(20,35,26,.6)] backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-[1240px] items-center justify-between gap-6 px-5 py-3.5 lg:px-8">
        <a href="/" className="flex items-center gap-2.5" aria-label="amBlitz home">
          <Image
            src="/amblitz-logo.png"
            alt=""
            width={267}
            height={272}
            priority
            className="h-10 w-auto sm:h-16"
          />
        </a>

        <ul className="hidden items-center gap-7 lg:flex">
          {nav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="group relative text-[0.92rem] text-ink-70 transition-colors duration-200 hover:text-ink"
              >
                {item.label}
                <span className="absolute -bottom-1.5 left-0 h-[2px] w-0 rounded-full bg-leaf-500 transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2.5">
          <a
            href={STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-fill hidden items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-[0.88rem] font-medium text-paper transition-transform duration-300 hover:-translate-y-0.5 sm:inline-flex"
          >
            Shop on Amazon
            <ArrowUpRight size={15} strokeWidth={2.2} />
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink/12 text-ink transition-colors hover:bg-ink/5 lg:hidden"
          >
            {open ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </nav>

      {/* mobile sheet */}
      <div
        className={`absolute inset-x-0 top-full z-40 origin-top overflow-hidden border-b border-ink/10 bg-paper transition-[max-height,opacity] duration-400 lg:hidden ${
          open ? "max-h-[32rem] opacity-100" : "pointer-events-none max-h-0 opacity-0"
        }`}
      >
        <ul className="ruled px-6 py-4">
          {nav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={() => setOpen(false)}
                className="group flex items-center justify-between py-3.5 text-[1.15rem] text-ink"
              >
                <span className="font-display" style={{ fontVariationSettings: '"SOFT" 30, "WONK" 1' }}>
                  {item.label}
                </span>
                <ArrowRight
                  size={16}
                  strokeWidth={2}
                  className="text-ink-40 transition-transform duration-300 group-hover:translate-x-1"
                />
              </a>
            </li>
          ))}
          <li className="pt-3 pb-5">
            <a
              href={STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-full bg-leaf-600 px-6 py-3.5 text-[0.95rem] font-medium text-paper"
            >
              Shop on Amazon
              <ArrowUpRight size={16} strokeWidth={2.2} />
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}

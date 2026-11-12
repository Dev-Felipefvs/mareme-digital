"use client";

import { useEffect, useState } from "react";
import { Logo } from "../Logo";
import { site, contactLink } from "@/data/site";
import { WA_MSG } from "./ui";

/** Topo enxuto de página de vendas: marca + uma ação. */
export function LandingHeader() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-500 ${scrolled ? "border-b border-paper/10 bg-ink/85 backdrop-blur-md" : "border-b border-transparent"}`}>
      <div className="container-x flex h-[72px] items-center justify-between gap-4">
        <a href="#inicio" aria-label="MAREME Digital — início"><Logo /></a>
        <a
          href={contactLink(WA_MSG)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-10 items-center rounded-[6px] border border-lime/60 px-4 font-display text-[13px] font-bold uppercase tracking-[0.04em] text-lime transition-colors hover:bg-lime hover:text-ink"
        >
          Quero meu site
        </a>
      </div>
    </header>
  );
}

export function LandingFooter() {
  return (
    <footer className="border-t border-paper/10 py-10">
      <div className="container-x flex flex-col items-start justify-between gap-6 text-[14px] text-paper/55 sm:flex-row sm:items-center">
        <Logo />
        <p>© {new Date().getFullYear()} MAREME Digital · Maceió — AL</p>
        <div className="flex gap-5">
          <a href={contactLink()} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-paper">WhatsApp</a>
          <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-paper">Instagram</a>
        </div>
      </div>
    </footer>
  );
}

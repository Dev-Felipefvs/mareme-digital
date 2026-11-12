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
    <header className={`fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top)] transition-[background-color,backdrop-filter] duration-500 ${scrolled ? "bg-ink/60 backdrop-blur-xl backdrop-saturate-150 [@media(prefers-reduced-transparency:reduce)]:bg-ink [@media(prefers-reduced-transparency:reduce)]:backdrop-blur-none" : ""}`}>
      <div aria-hidden="true" className={`pointer-events-none absolute inset-x-0 top-full h-6 bg-gradient-to-b from-ink/50 to-transparent transition-opacity duration-500 ${scrolled ? "opacity-100" : "opacity-0"}`} />
      <div className="container-x flex h-[72px] items-center justify-between gap-4">
        <a href="#inicio" aria-label="MAREME Digital — início"><Logo /></a>
        <a
          href={contactLink(WA_MSG)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-11 items-center rounded-[6px] border border-lime/60 px-4 font-display text-[13px] font-bold uppercase tracking-[0.04em] text-lime transition-[background-color,color,transform] duration-200 hover:bg-lime hover:text-ink active:scale-[0.97] active:duration-75"
        >
          Quero meu site
        </a>
      </div>
    </header>
  );
}

export function LandingFooter() {
  return (
    <footer className="border-t border-paper/10 pb-[calc(2.5rem+env(safe-area-inset-bottom))] pt-10">
      <div className="container-x flex flex-col items-start justify-between gap-6 text-[14px] text-paper/55 sm:flex-row sm:items-center">
        <Logo />
        <p suppressHydrationWarning>© {new Date().getFullYear()} MAREME Digital · Maceió — AL</p>
        <div className="-m-2 flex gap-2">
          <a href={contactLink()} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center px-2 transition-colors hover:text-paper">WhatsApp</a>
          <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center px-2 transition-colors hover:text-paper">Instagram</a>
        </div>
      </div>
    </footer>
  );
}

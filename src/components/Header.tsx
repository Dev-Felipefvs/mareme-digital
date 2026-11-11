"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { nav, site, contactLink, contactChannel } from "@/data/site";
import { ArrowUpRight } from "./MagneticButton";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      setHidden(y > 600 && y > last + 4 ? true : y < last - 4 ? false : (h) => h);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const ids = nav.map((n) => n.href.slice(1));
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    ids.forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => { window.removeEventListener("scroll", onScroll); io.disconnect(); };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[transform,background-color,border-color] duration-500 ease-out-expo ${
          hidden && !open ? "-translate-y-full" : "translate-y-0"
        } ${scrolled && !open ? "glass border-b border-line" : "border-b border-transparent"}`}
      >
        <div className="container-x flex h-[76px] items-center justify-between gap-6">
          <a href="#inicio" aria-label="MAREME Digital — início" className="relative z-[60]">
            <Logo />
          </a>

          <nav aria-label="Navegação principal" className="hidden lg:block">
            <ul className="flex items-center gap-1 rounded-full border border-line bg-white/[0.03] p-1">
              {nav.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    className={`relative block rounded-full px-4 py-2 text-[14px] transition-colors ${
                      active === n.href.slice(1) ? "text-white" : "text-mist hover:text-white"
                    }`}
                  >
                    {active === n.href.slice(1) && (
                      <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-full bg-white/[0.08]" transition={{ type: "spring", stiffness: 380, damping: 32 }} />
                    )}
                    <span className="relative">{n.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#contato"
              className="border-gradient hidden h-11 items-center gap-2 rounded-full px-5 text-[14px] font-medium transition-transform duration-300 hover:-translate-y-0.5 sm:inline-flex"
            >
              Solicitar orçamento <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="menu-mobile"
              aria-label={open ? "Fechar menu" : "Abrir menu"}
              className="relative z-[60] grid h-11 w-11 place-items-center rounded-full border border-line bg-white/[0.04] lg:hidden"
            >
              <span className="relative block h-3 w-5">
                <span className={`absolute left-0 h-[1.5px] w-5 bg-white transition-all duration-500 ease-out-expo ${open ? "top-1.5 rotate-45" : "top-0"}`} />
                <span className={`absolute left-0 h-[1.5px] w-5 bg-white transition-all duration-500 ease-out-expo ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
              </span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="menu-mobile"
            className="fixed inset-0 z-[55] flex flex-col justify-between overflow-y-auto bg-ink px-6 pb-10 pt-28 lg:hidden"
            initial={{ clipPath: "circle(0% at calc(100% - 44px) 38px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 44px) 38px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 44px) 38px)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          >
            <div aria-hidden="true" className="pointer-events-none absolute -right-40 top-20 h-96 w-96 rounded-full bg-violet/25 blur-[120px]" />
            <div aria-hidden="true" className="pointer-events-none absolute -left-40 bottom-10 h-96 w-96 rounded-full bg-electric/20 blur-[120px]" />
            <nav aria-label="Navegação mobile" className="relative">
              <ul>
                {nav.map((n, i) => (
                  <li key={n.href} className="overflow-hidden border-b border-line">
                    <motion.a
                      href={n.href}
                      onClick={() => setOpen(false)}
                      className="flex items-baseline justify-between py-4 text-[clamp(34px,10vw,52px)] font-medium tracking-tight"
                      initial={{ y: "100%" }}
                      animate={{ y: "0%" }}
                      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.25 + i * 0.05 }}
                    >
                      {n.label}
                      <span className="text-xs tracking-[0.2em] text-mist">0{i + 1}</span>
                    </motion.a>
                  </li>
                ))}
              </ul>
            </nav>
            <motion.div
              className="relative mt-10 grid gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <a href={contactLink("Olá! Vim pelo site da MAREME Digital e quero um orçamento.")} target="_blank" rel="noopener noreferrer"
                className="bg-brand flex h-14 items-center justify-center rounded-full font-medium">
                Falar pelo {contactChannel}
              </a>
              <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className="text-center text-sm text-mist">
                {site.instagram.handle}
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

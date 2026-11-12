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
      if (y < 240) setActive("");
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
        } ${scrolled && !open ? "border-b border-line bg-ink/80 backdrop-blur-md" : "border-b border-transparent"}`}
      >
        <div className="container-x flex h-[76px] items-center justify-between gap-6">
          <a href="#inicio" aria-label="MAREME Digital — início" className="relative z-[60]">
            <Logo />
          </a>

          <nav aria-label="Navegação principal" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {nav.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    className={`relative block rounded-md px-3.5 py-2 text-[14px] transition-colors ${
                      active === n.href.slice(1) ? "text-white" : "text-mist hover:text-white"
                    }`}
                  >
                    {active === n.href.slice(1) && (
                      <motion.span layoutId="nav-pill" className="absolute inset-x-3.5 -bottom-[19px] h-px bg-paper" transition={{ type: "spring", stiffness: 380, damping: 32 }} />
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
              className="hidden h-10 items-center gap-2 rounded-lg bg-lime px-4 text-[14px] font-medium text-ink transition-[filter] duration-300 hover:brightness-105 sm:inline-flex"
            >
              Solicitar orçamento <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="menu-mobile"
              aria-label={open ? "Fechar menu" : "Abrir menu"}
              className="relative z-[60] grid h-10 w-10 place-items-center rounded-lg border border-line lg:hidden"
            >
              <span className="relative block h-3 w-5">
                <span className={`burger-line absolute left-0 h-[1.5px] w-5 bg-white transition-all duration-500 ease-out-expo ${open ? "top-1.5 rotate-45" : "top-0"}`} />
                <span className={`burger-line absolute left-0 h-[1.5px] w-5 bg-white transition-all duration-500 ease-out-expo ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
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
            <nav aria-label="Navegação mobile" className="relative">
              <ul>
                {nav.map((n, i) => (
                  <li key={n.href} className="overflow-hidden border-b border-line">
                    <motion.a
                      href={n.href}
                      onClick={() => setOpen(false)}
                      className="flex items-baseline justify-between py-4 text-[clamp(34px,10vw,52px)] font-semibold tracking-[-0.03em]"
                      initial={{ y: "100%" }}
                      animate={{ y: "0%" }}
                      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.25 + i * 0.05 }}
                    >
                      {n.label}
                      
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
                className="flex h-14 items-center justify-center rounded-lg bg-lime font-medium text-ink">
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

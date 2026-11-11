"use client";

import { useRef } from "react";
import { MagneticButton, ArrowIcon } from "./MagneticButton";
import { INTRO_EVENT } from "./Preloader";
import { gsap, useGSAP } from "@/lib/gsap";

const LINE_1 = "Seu próximo cliente pode estar procurando".split(" ");
const ACCENT = "por você agora.".split(" ");

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ paused: true, defaults: { ease: "power4.out" } });
        tl.from(".hero-word", { yPercent: 115, rotate: 4, duration: 1.2, stagger: 0.045 })
          .from(".hero-fade", { opacity: 0, y: 24, duration: 1, stagger: 0.12 }, "-=0.75")
          .from(".hero-bg", { opacity: 0, duration: 1.6, ease: "power2.out" }, 0);

        const play = () => tl.play();
        if (document.documentElement.dataset.intro === "done") play();
        else window.addEventListener(INTRO_EVENT, play, { once: true });

        // Conteúdo se afasta suavemente ao rolar
        gsap.to(".hero-content", {
          yPercent: -12,
          opacity: 0.2,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
        });
        return () => window.removeEventListener(INTRO_EVENT, play);
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} id="inicio" className="relative isolate flex min-h-[100svh] items-end overflow-hidden pb-14 pt-32 sm:items-center sm:pb-24">
      {/* Fundo estático: brilho sutil, sem partículas nem movimento */}
      <div aria-hidden="true" className="hero-bg absolute inset-0 -z-10">
        <div className="absolute -right-[10%] -top-[20%] h-[70vh] w-[70vh] rounded-full bg-lime/[0.07] blur-[140px]" />
        <div className="absolute -left-[15%] bottom-[5%] h-[50vh] w-[50vh] rounded-full bg-white/[0.035] blur-[120px]" />
      </div>
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-b from-transparent to-ink" />

      <div className="hero-content container-x relative">
        <p className="hero-fade eyebrow mb-8">
          <span className="h-px w-10 bg-accent" /> MAREME Digital — Sites que valorizam negócios
        </p>

        <h1 className="max-w-[16ch] text-[clamp(42px,7.2vw,116px)] font-medium leading-[0.95] tracking-[-0.045em]">
          <span className="sr-only">Seu próximo cliente pode estar procurando por você agora.</span>
          <span aria-hidden="true">
            {LINE_1.map((w, i) => (
              <span key={i} className="word-mask mr-[0.22em]">
                <span className="hero-word inline-block">{w}</span>
              </span>
            ))}
            {ACCENT.map((w, i) => (
              <span key={w} className={`word-mask ${i < ACCENT.length - 1 ? "mr-[0.22em]" : ""}`}>
                <span className="hero-word text-accent inline-block pr-[0.06em] font-serif italic tracking-[-0.02em]">{w}</span>
              </span>
            ))}
          </span>
        </h1>

        <div className="mt-10 grid gap-10 md:grid-cols-[minmax(0,520px)_1fr] md:items-end">
          <div className="hero-fade max-w-[520px] text-[clamp(16px,1.35vw,19px)] leading-relaxed">
            <p className="font-medium text-white">Quando alguém pesquisa sua empresa, o que encontra?</p>
            <p className="mt-3 text-mist">
              Na MAREME Digital, criamos sites modernos e personalizados para apresentar seu trabalho, fortalecer sua credibilidade e transformar visitas em oportunidades de negócio.
            </p>
          </div>
          <div className="hero-fade flex flex-wrap gap-3 md:justify-end">
            <MagneticButton href="#contato">
              Quero destacar minha empresa <ArrowIcon />
            </MagneticButton>
            <MagneticButton href="#projetos" variant="ghost">
              Ver nosso portfólio
            </MagneticButton>
          </div>
        </div>

        <div className="hero-fade mt-16 hidden items-center justify-between border-t border-line pt-6 text-xs tracking-[0.2em] text-mist sm:flex">
          <span>SITES · LANDING PAGES · PORTFÓLIOS</span>
          <a href="#projetos" className="group inline-flex items-center gap-3 uppercase">
            Role para explorar
            <span className="relative h-8 w-[1px] overflow-hidden bg-white/15">
              <span className="absolute inset-x-0 top-0 h-1/2 animate-[scrollcue_2s_ease-in-out_infinite] bg-accent" />
            </span>
          </a>
        </div>
      </div>
      <style>{`@keyframes scrollcue { 0% { transform: translateY(-100%); } 100% { transform: translateY(200%); } }`}</style>
    </section>
  );
}

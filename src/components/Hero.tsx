"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { INTRO_EVENT } from "./Preloader";
import { gsap, useGSAP } from "@/lib/gsap";
import { projects } from "@/data/projects";
import { asset } from "@/lib/asset";
import { ArrowIcon } from "./MagneticButton";

const host = (url: string) => url.replace(/^https?:\/\//, "").replace(/\/$/, "");

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const p = projects[i];

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setI((n) => (n + 1) % projects.length), 4200);
    return () => clearInterval(t);
  }, [paused]);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ paused: true, defaults: { ease: "expo.out", duration: 0.9 } });
        tl.from(".hero-line", { yPercent: 105, stagger: 0.08, duration: 1.1 })
          .from(".hero-fade", { opacity: 0, y: 16, stagger: 0.07 }, "-=0.75")
          .from(".hero-frame", { opacity: 0, y: 28, duration: 1.2 }, 0.15);
        const play = () => tl.play();
        if (document.documentElement.dataset.intro === "done") play();
        else window.addEventListener(INTRO_EVENT, play, { once: true });
        return () => window.removeEventListener(INTRO_EVENT, play);
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} id="inicio" className="relative border-b border-line pt-[76px]">
      <div className="container-x grid grid-cols-1 gap-14 pb-20 pt-14 sm:pt-20 lg:grid-cols-12 lg:items-start lg:gap-10 lg:pb-28 lg:pt-24">
        <div className="min-w-0 lg:col-span-7">
          <h1 className="text-balance text-[clamp(40px,4.9vw,78px)] font-semibold leading-[0.98] tracking-[-0.04em]">
            <span className="sr-only">Seu próximo cliente pode estar procurando por você agora.</span>
            <span aria-hidden="true">
              <span className="block overflow-hidden pb-[0.06em]"><span className="hero-line block">Seu próximo cliente</span></span>
              <span className="block overflow-hidden pb-[0.06em]"><span className="hero-line block">pode estar procurando</span></span>
              <span className="block overflow-hidden pb-[0.06em]"><span className="hero-line block text-paper/40">por você agora.</span></span>
            </span>
          </h1>

          <p className="hero-fade mt-8 max-w-[520px] text-[clamp(17px,1.35vw,19px)] leading-relaxed text-mist">
            <span className="text-paper">Quando alguém pesquisa sua empresa, o que encontra?</span> Na MAREME Digital, criamos sites modernos e personalizados para apresentar seu trabalho, fortalecer sua credibilidade e transformar visitas em oportunidades de negócio.
          </p>

          <div className="hero-fade mt-10 flex flex-wrap items-center gap-3">
            <a
              href="#contato"
              className="inline-flex h-12 items-center gap-2.5 rounded-lg bg-lime px-6 text-[15px] font-medium text-ink transition-[filter,transform] duration-300 hover:brightness-105 active:translate-y-px"
            >
              Quero destacar minha empresa <ArrowIcon />
            </a>
            <a
              href="#projetos"
              className="inline-flex h-12 items-center rounded-lg border border-line px-6 text-[15px] font-medium text-paper transition-colors duration-300 hover:border-paper/30 hover:bg-paper/[0.04]"
            >
              Ver nosso portfólio
            </a>
          </div>

          <p className="hero-fade mt-8 flex max-w-[520px] items-start gap-3 text-[clamp(18px,1.45vw,21px)] font-medium leading-snug tracking-[-0.01em] text-paper">
            <span className="mt-[0.55em] h-2 w-2 shrink-0 rounded-full bg-lime" aria-hidden="true" />
            Você vê o site da sua empresa pronto e funcionando antes de fechar qualquer coisa.
          </p>
        </div>

        {/* Navegador com os sites reais do portfólio */}
        <div
          className="hero-frame relative min-w-0 lg:col-span-5 lg:self-center"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="relative">
          <div className="relative overflow-hidden rounded-xl border border-line bg-graphite shadow-[0_40px_80px_-30px_rgb(0_0_0/0.8)]">
            <div className="flex h-11 items-center gap-3 border-b border-line px-4">
              <span className="flex gap-1.5" aria-hidden="true">
                <i className="h-2.5 w-2.5 rounded-full bg-paper/15" />
                <i className="h-2.5 w-2.5 rounded-full bg-paper/15" />
                <i className="h-2.5 w-2.5 rounded-full bg-paper/15" />
              </span>
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-w-0 flex-1 items-center gap-2 rounded-md bg-ink/60 px-3 py-1.5 font-mono text-[12px] text-mist transition-colors hover:text-paper"
              >
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-lime" aria-hidden="true" />
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={p.slug}
                    className="truncate"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.3 }}
                  >
                    {host(p.url)}
                  </motion.span>
                </AnimatePresence>
              </a>
            </div>
            <div className="relative aspect-[16/10] bg-ink">
              <AnimatePresence initial={false}>
                <motion.img
                  key={p.slug}
                  src={asset(p.desktop)}
                  alt={`Página inicial do site ${p.name}, feito pela MAREME`}
                  width={1440}
                  height={900}
                  fetchPriority={i === 0 ? "high" : "auto"}
                  className="absolute inset-0 h-full w-full object-cover object-top"
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                />
              </AnimatePresence>
            </div>
          </div>
          {/* Celular sobreposto */}
          <div className="absolute -bottom-8 right-4 w-[20%] max-w-[118px] sm:right-6">
            <div className="overflow-hidden rounded-[18px] border border-paper/15 bg-ink p-[3px] shadow-[0_24px_48px_-12px_rgb(0_0_0/0.85)]">
              <div className="relative aspect-[390/844] overflow-hidden rounded-[15px]">
                <AnimatePresence initial={false}>
                  <motion.img
                    key={p.slug}
                    src={asset(p.mobile)}
                    alt=""
                    width={780}
                    height={1688}
                    className="absolute inset-0 h-full w-full object-cover object-top"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.9, delay: 0.08 }}
                  />
                </AnimatePresence>
              </div>
            </div>
          </div>

          </div>

          {/* Seletor dos projetos */}
          <div className="mt-12 flex flex-col items-start gap-3 sm:mt-6 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:pr-[calc(20%+2.5rem)]">
            <p className="min-w-0 text-[14px] leading-snug">
              <span className="block text-paper">{p.name}</span>
              <span className="block font-mono text-[12px] text-mist">{p.category}</span>
            </p>
            <div className="flex shrink-0 gap-1.5" role="tablist" aria-label="Projetos em destaque">
              {projects.map((q, n) => (
                <button
                  key={q.slug}
                  type="button"
                  role="tab"
                  aria-selected={n === i}
                  aria-label={q.name}
                  onClick={() => { setI(n); setPaused(true); }}
                  className="group grid h-6 w-5 place-items-center"
                >
                  <span className={`block h-[3px] rounded-full transition-all duration-500 ${n === i ? "w-5 bg-lime" : "w-2.5 bg-paper/20 group-hover:bg-paper/45"}`} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


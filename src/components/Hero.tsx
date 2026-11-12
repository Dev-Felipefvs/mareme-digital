"use client";

import { useRef } from "react";
import { MagneticButton, ArrowIcon, ArrowUpRight } from "./MagneticButton";
import { INTRO_EVENT } from "./Preloader";
import { gsap, useGSAP } from "@/lib/gsap";
import { site, contactLink } from "@/data/site";
import { asset } from "@/lib/asset";

const LINE_1 = "Seu próximo cliente pode estar procurando".split(" ");
const MUTED = "por você agora.".split(" ");

/** Números reais e verificáveis — edite à vontade. */
const STATS = [
  { n: "6", l: "Projetos publicados" },
  { n: "100%", l: "Sites sob medida" },
  { n: "1:1", l: "Atendimento direto" },
];

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ paused: true, defaults: { ease: "power4.out" } });
        tl.from(".hero-card", { opacity: 0, y: 40, duration: 1.2 })
          .from(".hero-photo", { opacity: 0, scale: 1.06, duration: 1.6, ease: "power2.out" }, 0.1)
          .from(".hero-word", { yPercent: 115, rotate: 3, duration: 1.15, stagger: 0.04 }, 0.2)
          .from(".hero-fade", { opacity: 0, y: 22, duration: 0.9, stagger: 0.1 }, "-=0.7")
          .from(".hero-float", { opacity: 0, y: 30, duration: 1 }, "-=0.6");

        const play = () => tl.play();
        if (document.documentElement.dataset.intro === "done") play();
        else window.addEventListener(INTRO_EVENT, play, { once: true });

        return () => window.removeEventListener(INTRO_EVENT, play);
      });
      // Afastamento suave ao rolar (apenas desktop)
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.to(".hero-card", {
          yPercent: -6,
          opacity: 0.35,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
        });
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} id="inicio" className="relative isolate bg-paper pb-12 pt-28 text-ink sm:pb-16 sm:pt-32">
      <div className="container-x">
        <div className="hero-card relative flex flex-col overflow-hidden rounded-[32px] bg-cloud lg:block lg:min-h-[min(640px,calc(100svh-150px))]">
          {/* Foto (direita no desktop, abaixo do texto no mobile) */}
          <div className="hero-photo relative order-2 aspect-[4/5] w-full overflow-hidden sm:aspect-[16/11] lg:absolute lg:inset-y-0 lg:right-0 lg:aspect-auto lg:w-[50%]">
            <img
              src={asset(site.founder.photo)}
              alt={`${site.founder.name}, fundador da MAREME Digital`}
              width={821}
              height={1556}
              fetchPriority="high"
              className="absolute inset-0 h-full w-full object-cover object-[50%_22%] grayscale contrast-[1.05]"
            />
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-cloud via-transparent to-transparent lg:bg-gradient-to-r lg:from-cloud lg:via-cloud/30 lg:via-25% lg:to-transparent" />
          </div>

          {/* Texto */}
          <div className="relative z-10 order-1 px-6 pb-10 pt-10 sm:px-12 sm:pb-14 sm:pt-14 lg:max-w-[58%] lg:px-16 lg:py-16 xl:px-20">
            <h1 className="font-serif text-[clamp(42px,5.2vw,78px)] font-normal leading-[0.98] tracking-[-0.02em]">
              <span className="sr-only">Seu próximo cliente pode estar procurando por você agora.</span>
              <span aria-hidden="true">
                {LINE_1.map((w, i) => (
                  <span key={i} className="word-mask mr-[0.22em]">
                    <span className="hero-word inline-block">{w}</span>
                  </span>
                ))}
                {MUTED.map((w, i) => (
                  <span key={`m${i}`} className={`word-mask ${i < MUTED.length - 1 ? "mr-[0.22em]" : ""}`}>
                    <span className="hero-word inline-block text-ink/40">{w}</span>
                  </span>
                ))}
              </span>
            </h1>

            <div className="hero-fade mt-7 max-w-[500px] text-[clamp(16px,1.3vw,18px)] leading-relaxed text-ink/65">
              <p className="font-medium text-ink">Quando alguém pesquisa sua empresa, o que encontra?</p>
              <p className="mt-2">
                Na MAREME Digital, criamos sites modernos e personalizados para apresentar seu trabalho, fortalecer sua credibilidade e transformar visitas em oportunidades de negócio.
              </p>
            </div>

            <div className="hero-fade mt-9 flex flex-wrap gap-3">
              <MagneticButton href="#contato" tone="light">
                Quero destacar minha empresa <ArrowIcon />
              </MagneticButton>
              <MagneticButton href="#projetos" variant="ghost" tone="light">
                Ver nosso portfólio
              </MagneticButton>
            </div>

            <dl className="hero-fade mt-10 flex flex-wrap gap-x-12 gap-y-6 lg:mt-12">
              {STATS.map((s) => (
                <div key={s.l}>
                  <dt className="sr-only">{s.l}</dt>
                  <dd className="font-serif text-[clamp(34px,3vw,44px)] leading-none">{s.n}</dd>
                  <dd className="mt-2 text-[14px] text-ink/60">{s.l}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Cartão flutuante */}
          <a
            href={contactLink("Olá! Vim pelo site da MAREME Digital e quero conversar sobre um projeto.")}
            target="_blank"
            rel="noopener noreferrer"
            className="hero-float group absolute bottom-5 right-5 z-20 flex max-w-[360px] items-end gap-5 rounded-[22px] border border-white/15 bg-ink/55 p-5 text-white backdrop-blur-xl transition-colors duration-500 hover:border-lime/50 sm:bottom-8 sm:right-8 sm:p-6 max-lg:left-5 max-lg:max-w-none"
          >
            <span className="flex-1">
              <span className="block text-[12.5px] text-mist">Novo projeto</span>
              <span className="mt-1 block text-[18px] font-medium">Disponível para projetos</span>
              <span className="mt-1.5 block text-[13.5px] leading-snug text-white/75">
                Envie alguns detalhes e eu retorno com uma direção clara.
              </span>
            </span>
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-white text-ink transition-colors duration-300 group-hover:bg-lime">
              <ArrowUpRight />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}

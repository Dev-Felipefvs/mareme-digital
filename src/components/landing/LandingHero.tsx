"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { INTRO_EVENT } from "../Preloader";
import { site } from "@/data/site";
import { asset } from "@/lib/asset";
import { CtaButton } from "./ui";
import { LiveFeed } from "./LiveFeed";
import { Logo } from "../Logo";

const BULLETS = ["Site pronto antes de você fechar", "Feito sob medida para o seu negócio", "WhatsApp e Google no lugar certo"];

/** Emerson recortado (sem fundo), em cor natural, com luz verde de contorno — como o retrato da referência. */
function GreenPortrait({ className = "", priority = false }: { className?: string; priority?: boolean }) {
  return (
    <div className={`pointer-events-none ${className}`} aria-hidden="true">
      <div className="absolute inset-0 [mask-image:linear-gradient(to_bottom,black_58%,transparent_96%)]">
        <img
          src={asset("/images/fundador-recorte.png")}
          alt=""
          width={821}
          height={1556}
          fetchPriority={priority ? "high" : "auto"}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-top [filter:drop-shadow(0_0_28px_rgb(0_177_1/0.75))_drop-shadow(0_0_2px_rgb(82_255_0/0.6))_contrast(1.05)_saturate(0.92)]"
        />
        {/* luz verde batendo de trás */}
        <div className="absolute inset-0 bg-[radial-gradient(45%_35%_at_55%_22%,rgb(82_255_0/0.18),transparent_70%)] mix-blend-screen" />
      </div>
    </div>
  );
}

export function LandingHero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ paused: true, defaults: { ease: "expo.out", duration: 1 } });
        tl.from(".lh-light", { opacity: 0, duration: 2, ease: "power2.out" })
          .from(".lh-photo", { opacity: 0, scale: 1.05, duration: 1.8, ease: "power3.out" }, 0)
          .from(".lh-in", { opacity: 0, y: 22, stagger: 0.07 }, 0.2)
          .from(".lh-feed", { opacity: 0, y: 24, duration: 1.1 }, 0.5);
        const play = () => tl.play();
        if (document.documentElement.dataset.intro === "done") play();
        else window.addEventListener(INTRO_EVENT, play, { once: true });
        return () => window.removeEventListener(INTRO_EVENT, play);
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} id="inicio" className="relative isolate">
      {/* Luz verde da referência + raios, contínua até a próxima seção */}
      <div aria-hidden="true" className="lh-light pointer-events-none absolute inset-x-0 top-0 -z-20 h-[135%] overflow-hidden [mask-image:linear-gradient(to_bottom,black_70%,transparent_100%)]">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#000000_0%,#041000_35%,#0a1300_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(42%_46%_at_50%_30%,#00b101_0%,#007e00_32%,#003900_62%,transparent_100%)] opacity-90 lg:bg-[radial-gradient(32%_46%_at_70%_28%,#00b101_0%,#007e00_34%,#003900_64%,transparent_100%)]" />
        <div className="absolute inset-0 opacity-[0.16] [background:repeating-conic-gradient(from_0deg_at_50%_30%,#52ff00_0deg_0.6deg,transparent_0.6deg_9deg)] [mask-image:radial-gradient(50%_55%_at_50%_30%,black,transparent)] lg:[background:repeating-conic-gradient(from_0deg_at_70%_30%,#52ff00_0deg_0.6deg,transparent_0.6deg_9deg)] lg:[mask-image:radial-gradient(45%_60%_at_70%_30%,black,transparent)]" />
      </div>

      {/* Desktop: retrato grande à direita, descendo para a próxima seção */}
      <GreenPortrait priority className="lh-photo absolute right-[6%] top-[4%] -z-10 hidden h-[112%] w-[40%] lg:block" />

      <div className="container-x relative grid gap-10 pb-10 pt-10 lg:min-h-[100svh] lg:grid-cols-12 lg:items-center lg:pb-24 lg:pt-16">
        <div className="lg:col-span-6">
          <Logo className="lh-in" />

          <h1 className="lh-in mt-10 text-balance font-display text-[clamp(34px,4vw,58px)] font-extrabold leading-[1.04] tracking-[-0.02em] [font-stretch:112%] lg:mt-14">
            Seu próximo cliente pode estar <span className="text-degrade">procurando por você agora.</span>
          </h1>

          <p className="lh-in mt-6 max-w-[480px] text-[17px] leading-relaxed text-paper/80">
            Quando alguém pesquisa a sua empresa, o que encontra? Eu crio sites modernos e personalizados que apresentam o seu trabalho e transformam visitas em clientes.
          </p>

          <ul className="lh-in mt-6 grid gap-1.5">
            {BULLETS.map((b) => (
              <li key={b} className="flex items-center gap-2.5 text-[15.5px] font-semibold text-paper">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-lime" aria-hidden="true" />
                {b}
              </li>
            ))}
          </ul>

          <div className="lh-in mt-9">
            <CtaButton className="w-full sm:w-[400px]">Quero meu site</CtaButton>
            <p className="mt-3.5 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[13.5px] text-paper/70">
              <span className="inline-flex items-center gap-1.5">
                <svg viewBox="0 0 24 24" className="h-4 w-4 text-lime" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M20 12a8 8 0 1 1-3.2-6.4M20 4v4h-4" strokeLinecap="round" strokeLinejoin="round" /></svg>
                Resposta pelo WhatsApp
              </span>
              <span className="inline-flex items-center gap-1.5">
                <svg viewBox="0 0 24 24" className="h-4 w-4 text-lime" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M8 12.5l2.5 2.5L16 9.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                Atendimento direto com o Emerson
              </span>
            </p>
          </div>
        </div>

        {/* Desktop: pilha de avisos sobre o retrato */}
        <div className="lh-feed relative hidden lg:col-span-5 lg:col-start-8 lg:block lg:pt-24" aria-label="Sites publicados pela MAREME">
          <LiveFeed count={4} className="mr-auto max-w-[350px]" />
        </div>

        {/* Mobile: o retrato continua a mesma cena, sem moldura */}
        <div className="relative -mx-5 h-[124vw] max-h-[660px] lg:hidden" aria-label="Emerson e sites publicados pela MAREME">
          <GreenPortrait className="lh-photo absolute inset-x-[8%] inset-y-0" />
          <LiveFeed count={3} compact className="lh-feed absolute inset-x-5 bottom-[6%]" />
        </div>
      </div>
    </section>
  );
}

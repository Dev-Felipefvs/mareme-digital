"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { Em } from "./SectionHeading";

const STEPS = [
  { t: "Descoberta", d: "Conversa sobre o seu negócio, público, concorrência e objetivos. Entendemos o que o site precisa resolver." },
  { t: "Estratégia", d: "Definimos estrutura, conteúdo, chamadas para ação e a jornada ideal de quem visita o site." },
  { t: "Design", d: "Criamos a direção de arte e as telas — tipografia, cores, imagens e microinterações com a cara da marca." },
  { t: "Desenvolvimento", d: "Transformamos o design em código rápido, responsivo, acessível e otimizado para o Google." },
  { t: "Publicação", d: "Domínio, hospedagem, testes finais e o site no ar, pronto para receber visitas." },
  { t: "Acompanhamento", d: "Ajustes, atualizações e suporte contínuo para o site evoluir junto com o seu negócio." },
];

export function Process() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      // Desktop: rolagem horizontal fixada
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const el = track.current!;
        const distance = () => el.scrollWidth - window.innerWidth + 48;
        const tween = gsap.to(el, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        });
        gsap.to(".process-bar", {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: () => `+=${distance()}`, scrub: true },
        });
        gsap.utils.toArray<HTMLElement>(".process-card").forEach((card) => {
          gsap.from(card.querySelector(".process-num"), {
            yPercent: 60, opacity: 0, duration: 1, ease: "expo.out",
            scrollTrigger: { trigger: card, containerAnimation: tween, start: "left 85%" },
          });
        });
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} id="processo" className="relative overflow-hidden py-28 sm:py-36 lg:flex lg:h-[100svh] lg:items-center lg:py-0">
      <div aria-hidden="true" className="pointer-events-none absolute left-1/3 top-1/2 h-[420px] w-[620px] -translate-y-1/2 rounded-full bg-lime/[0.04] blur-[140px]" />
      <div className="w-full">
        <div className="container-x mb-12 flex flex-wrap items-end justify-between gap-6 lg:mb-14">
          <div>
            <p className="eyebrow mb-6">
              <span className="font-serif text-base italic tracking-normal text-white/80">05</span>
              <span className="h-px w-8 bg-white/20" />Processo de trabalho
            </p>
            <h2 className="text-[clamp(38px,5.6vw,84px)] font-medium leading-[0.98] tracking-[-0.04em]">
              Do briefing ao <Em>site no ar</Em>
            </h2>
          </div>
          <div className="hidden w-64 lg:block">
            <div className="h-px w-full bg-white/10">
              <div className="process-bar bg-accent h-full origin-left scale-x-0" />
            </div>
            <p className="mt-3 text-[12px] uppercase tracking-[0.2em] text-mist">Role para avançar →</p>
          </div>
        </div>

        <div ref={track} className="container-x flex flex-col gap-4 lg:w-max lg:max-w-none lg:flex-row lg:gap-5 lg:pr-[10vw]">
          {STEPS.map((s, i) => (
            <article
              key={s.t}
              className="process-card group relative flex flex-col justify-between overflow-hidden rounded-[26px] border border-line bg-ink-2 p-7 lg:h-[52vh] lg:min-h-[380px] lg:w-[400px] lg:p-9"
            >
              <div className="flex items-center justify-between">
                <span className="process-num text-accent font-serif text-[clamp(64px,7vw,104px)] italic leading-none">0{i + 1}</span>
                {i < STEPS.length - 1 && <span aria-hidden="true" className="hidden text-2xl text-white/25 lg:block">→</span>}
              </div>
              <div className="mt-10">
                <h3 className="text-[clamp(24px,2.2vw,32px)] font-medium tracking-tight">{s.t}</h3>
                <p className="mt-3 text-[15.5px] leading-relaxed text-mist">{s.d}</p>
              </div>
              <div aria-hidden="true" className="bg-accent absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 transition-transform duration-700 ease-out-expo group-hover:scale-x-100" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

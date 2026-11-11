"use client";

import { useRef, type MouseEvent } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { Reveal } from "./Reveal";

const STATEMENT =
  "A MAREME Digital é um estúdio especializado em experiências digitais e presença online. Cada projeto nasce do zero: pensado para a sua marca, o seu público e o resultado que você precisa alcançar.";

const PILLARS = [
  { n: "01", t: "Design autoral", d: "Nada de templates prontos. Cada layout é desenhado para a identidade e o momento da sua marca." },
  { n: "02", t: "Performance de verdade", d: "Sites leves, rápidos e otimizados para o Google — porque velocidade também é experiência." },
  { n: "03", t: "Pensado para converter", d: "Chamadas claras, WhatsApp e formulários no lugar certo para transformar visitas em contatos." },
  { n: "04", t: "Acompanhamento próximo", d: "Você participa de cada etapa e conta com suporte depois da publicação." },
];

function spot(e: MouseEvent<HTMLElement>) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
}

export function Agency() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ".agency-word",
          { opacity: 0.14 },
          {
            opacity: 1,
            stagger: 0.08,
            ease: "none",
            scrollTrigger: { trigger: ".agency-statement", start: "top 78%", end: "bottom 45%", scrub: 0.6 },
          }
        );
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} id="agencia" className="relative py-28 sm:py-36">
      <div className="container-x">
        <Reveal>
          <p className="eyebrow mb-10">
            <span className="font-serif text-base italic tracking-normal text-white/80">03</span>
            <span className="h-px w-8 bg-white/20" />Sobre a agência
          </p>
        </Reveal>
        <p className="agency-statement max-w-[22ch] text-[clamp(32px,4.8vw,72px)] font-medium leading-[1.05] tracking-[-0.035em] sm:max-w-[24ch]">
          {STATEMENT.split(" ").map((w, i) => (
            <span key={i} className="agency-word">
              {w === "experiências" || w === "digitais" ? <span className="text-gradient font-serif italic font-normal">{w}</span> : w}{" "}
            </span>
          ))}
        </p>

        <div className="mt-20 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((p, i) => (
            <Reveal key={p.n} delay={i * 0.08}>
              <article onMouseMove={spot} className="spotlight group h-full rounded-[24px] border border-line bg-ink-2 p-7 transition-colors duration-500 hover:border-white/20">
                <span className="font-serif text-[40px] italic leading-none text-white/25 transition-colors duration-500 group-hover:text-white/70">{p.n}</span>
                <h3 className="mt-14 text-[22px] font-medium tracking-tight">{p.t}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-mist">{p.d}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-6 flex flex-col items-start justify-between gap-6 rounded-[24px] border border-line bg-gradient-to-r from-electric/10 via-transparent to-violet/10 p-7 sm:flex-row sm:items-center">
            <p className="max-w-2xl text-[17px] leading-relaxed text-white/80">
              <span className="font-medium text-white">Metodologia própria:</span> descoberta, estratégia, design, desenvolvimento, publicação e acompanhamento — um caminho claro do briefing ao site no ar.
            </p>
            <a href="#processo" className="inline-flex shrink-0 items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-[14px] hover:border-white/40">
              Ver o processo ↓
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

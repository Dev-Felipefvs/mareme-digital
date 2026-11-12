"use client";

import { useRef } from "react";
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
    <section ref={root} id="agencia" className="relative border-b border-line py-28 sm:py-36">
      <div className="container-x">
        <p className="agency-statement max-w-[28ch] text-balance text-[clamp(28px,3.6vw,52px)] font-normal leading-[1.15] tracking-[-0.025em] text-mist">
          {STATEMENT.split(" ").map((w, i, all) => {
            const lead = all.indexOf("Cada");
            return (
              <span key={i} className={`agency-word ${i >= lead ? "text-paper" : ""}`}>{w} </span>
            );
          })}
        </p>

        <div className="mt-20 grid border-t border-line sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((p, i) => (
            <Reveal
              key={p.n}
              delay={i * 0.06}
              className={`border-b border-line py-8 ${i % 2 === 0 ? "sm:border-r sm:pr-6" : "sm:pl-6"} lg:border-b-0 lg:px-6 ${i === 0 ? "lg:pl-0" : ""} ${i < 3 ? "lg:border-r" : "lg:border-r-0 lg:pr-0"}`}
            >
              <h3 className="text-[20px] font-semibold tracking-[-0.02em]">{p.t}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-mist">{p.d}</p>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-14 flex flex-col items-start justify-between gap-6 border-y border-line py-8 sm:flex-row sm:items-center">
            <p className="max-w-2xl text-[17px] leading-relaxed text-paper/75">
              <span className="font-medium text-paper">Metodologia própria:</span> descoberta, estratégia, design, desenvolvimento, publicação e acompanhamento — um caminho claro do briefing ao site no ar.
            </p>
            <a href="#processo" className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-line px-5 py-3 text-[14px] transition-colors hover:border-paper/30 hover:bg-paper/[0.04]">
              Ver o processo
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

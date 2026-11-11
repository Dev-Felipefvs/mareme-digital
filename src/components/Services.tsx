"use client";

import type { MouseEvent, ReactNode } from "react";
import { Reveal } from "./Reveal";
import { SectionHeading, Em } from "./SectionHeading";

const ic = (d: ReactNode) => (
  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{d}</svg>
);

const SERVICES = [
  { t: "Sites institucionais", d: "Presença digital completa para apresentar sua empresa com autoridade, do primeiro clique ao contato.", i: ic(<><rect x="3" y="4" width="18" height="14" rx="2" /><path d="M3 8h18M8 21h8" /></>) },
  { t: "Landing pages", d: "Páginas focadas em um objetivo — vender, captar ou lançar — com narrativa e chamadas que convertem.", i: ic(<><path d="M4 20V10l8-6 8 6v10" /><path d="M9 20v-6h6v6" /></>) },
  { t: "Portfólios profissionais", d: "Vitrines elegantes para profissionais e estúdios mostrarem o melhor do seu trabalho.", i: ic(<><rect x="3" y="3" width="8" height="8" rx="1.5" /><rect x="13" y="3" width="8" height="5" rx="1.5" /><rect x="13" y="10" width="8" height="11" rx="1.5" /><rect x="3" y="13" width="8" height="8" rx="1.5" /></>) },
  { t: "Cardápios digitais", d: "Menus bonitos, rápidos e fáceis de atualizar, acessados por QR Code e integrados ao WhatsApp.", i: ic(<><path d="M7 3v18M7 3c-2 0-3 2-3 5s1 4 3 4" /><path d="M14 3h6v6a3 3 0 0 1-6 0V3zM17 12v9" /></>) },
  { t: "Design responsivo", d: "Experiências impecáveis em qualquer tela — celular, tablet ou desktop.", i: ic(<><rect x="2" y="5" width="13" height="10" rx="1.5" /><rect x="17" y="8" width="5" height="11" rx="1.2" /><path d="M6 19h5" /></>) },
  { t: "Integrações", d: "WhatsApp, formulários, mapas, redes sociais, analytics e as ferramentas que o seu negócio já usa.", i: ic(<><circle cx="6" cy="6" r="3" /><circle cx="18" cy="18" r="3" /><path d="M9 6h4a5 5 0 0 1 5 5v4M15 18h-4a5 5 0 0 1-5-5V9" /></>) },
  { t: "Manutenção e suporte", d: "Atualizações, ajustes e acompanhamento contínuo para o seu site seguir rápido e seguro.", i: ic(<><path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.4-.6-.6-2.4z" /></>) },
];

function spot(e: MouseEvent<HTMLElement>) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
}

export function Services() {
  return (
    <section id="servicos" className="relative py-28 sm:py-36">
      <div aria-hidden="true" className="pointer-events-none absolute right-0 top-40 h-[480px] w-[480px] rounded-full bg-violet/15 blur-[150px]" />
      <div className="container-x">
        <SectionHeading
          index="04"
          eyebrow="Serviços"
          title={<>O que criamos <Em>para você</Em></>}
          text="Soluções digitais sob medida — do primeiro site ao projeto mais completo, sempre com o mesmo padrão de qualidade."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <Reveal key={s.t} delay={(i % 3) * 0.08} className={i === 0 ? "lg:col-span-2" : ""}>
              <article
                onMouseMove={spot}
                className="spotlight group flex h-full min-h-[260px] flex-col justify-between overflow-hidden rounded-[24px] border border-line bg-ink-2 p-7 transition-[border-color,transform] duration-500 ease-out-expo hover:-translate-y-1 hover:border-white/20"
              >
                <div className="flex items-start justify-between">
                  <span className="grid h-14 w-14 place-items-center rounded-2xl border border-line bg-white/[0.03] text-white transition-colors duration-500 group-hover:border-transparent group-hover:bg-brand">
                    {s.i}
                  </span>
                  <span className="font-serif text-lg italic text-white/30">0{i + 1}</span>
                </div>
                <div className="mt-12">
                  <h3 className="text-[24px] font-medium tracking-tight">{s.t}</h3>
                  <p className="mt-3 max-w-md text-[15px] leading-relaxed text-mist">{s.d}</p>
                </div>
              </article>
            </Reveal>
          ))}
          <Reveal delay={0.16}>
            <a
              href="#contato"
              className="bg-brand group flex h-full min-h-[260px] flex-col justify-between rounded-[24px] p-7 transition-transform duration-500 ease-out-expo hover:-translate-y-1"
            >
              <span className="text-[13px] uppercase tracking-[0.2em] text-white/80">Tem outra ideia?</span>
              <span className="text-[28px] font-medium leading-tight tracking-tight">
                Vamos conversar sobre o seu projeto <span className="inline-block transition-transform duration-500 group-hover:translate-x-2">→</span>
              </span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

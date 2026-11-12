"use client";

import type { ReactNode } from "react";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const ic = (d: ReactNode) => (
  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{d}</svg>
);

const SERVICES = [
  { t: "Sites institucionais", d: "Presença digital completa para apresentar sua empresa com autoridade, do primeiro clique ao contato.", i: ic(<><rect x="3" y="4" width="18" height="14" rx="2" /><path d="M3 8h18M8 21h8" /></>) },
  { t: "Landing pages", d: "Páginas focadas em um objetivo — vender, captar ou lançar — com narrativa e chamadas que convertem.", i: ic(<><path d="M4 20V10l8-6 8 6v10" /><path d="M9 20v-6h6v6" /></>) },
  { t: "Portfólios profissionais", d: "Vitrines elegantes para profissionais e estúdios mostrarem o melhor do seu trabalho.", i: ic(<><rect x="3" y="3" width="8" height="8" rx="1.5" /><rect x="13" y="3" width="8" height="5" rx="1.5" /><rect x="13" y="10" width="8" height="11" rx="1.5" /><rect x="3" y="13" width="8" height="8" rx="1.5" /></>) },
  { t: "Design responsivo", d: "Experiências impecáveis em qualquer tela — celular, tablet ou desktop.", i: ic(<><rect x="2" y="5" width="13" height="10" rx="1.5" /><rect x="17" y="8" width="5" height="11" rx="1.2" /><path d="M6 19h5" /></>) },
  { t: "Integrações", d: "WhatsApp, formulários, mapas, redes sociais, analytics e as ferramentas que o seu negócio já usa.", i: ic(<><circle cx="6" cy="6" r="3" /><circle cx="18" cy="18" r="3" /><path d="M9 6h4a5 5 0 0 1 5 5v4M15 18h-4a5 5 0 0 1-5-5V9" /></>) },
  { t: "Manutenção e suporte", d: "Atualizações, ajustes e acompanhamento contínuo para o seu site seguir rápido e seguro.", i: ic(<><path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.4-.6-.6-2.4z" /></>) },
];

export function Services() {
  return (
    <section id="servicos" className="relative border-b border-line py-28 sm:py-36">
      <div className="container-x">
        <SectionHeading
          title="O que criamos para você"
          text="Soluções digitais sob medida — do primeiro site ao projeto mais completo, sempre com o mesmo padrão de qualidade."
        />
        <ul className="border-t border-line">
          {SERVICES.map((s) => (
            <li key={s.t} className="group grid items-start gap-3 border-b border-line py-8 sm:grid-cols-[48px_1fr] md:grid-cols-[48px_minmax(0,5fr)_minmax(0,6fr)] md:gap-8 md:py-10">
              <span className="pt-1 text-mist transition-colors duration-300 group-hover:text-paper">{s.i}</span>
              <h3 className="text-[clamp(24px,2.6vw,36px)] font-semibold leading-tight tracking-[-0.03em]">{s.t}</h3>
              <p className="max-w-[52ch] text-[16px] leading-relaxed text-mist sm:col-start-2 md:col-start-auto md:pt-1.5">{s.d}</p>
            </li>
          ))}
        </ul>
        <Reveal>
          <a
            href="#contato"
            className="group flex flex-col items-start justify-between gap-6 border-b border-line py-10 transition-colors sm:flex-row sm:items-center"
          >
            <span className="text-[clamp(24px,2.6vw,36px)] font-semibold leading-tight tracking-[-0.03em]">Tem outra ideia? Vamos conversar sobre o seu projeto.</span>
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-lime text-ink transition-transform duration-500 ease-out-expo group-hover:translate-x-1.5">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}

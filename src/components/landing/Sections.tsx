"use client";

import { Reveal } from "../Reveal";
import { PhoneMockup } from "../DeviceMockup";
import { projects, statusLabel } from "@/data/projects";
import { site } from "@/data/site";
import { asset } from "@/lib/asset";
import { CtaButton, Hi, Rich } from "./ui";

const host = (url: string) => url.replace(/^https?:\/\//, "").replace(/\/$/, "");

/* ---------- 1. O diferencial: o site pronto antes de fechar ---------- */
export function DemoProof() {
  const phones = [projects[0], projects[1], projects[4]];
  return (
    <section id="como" className="relative isolate overflow-hidden py-24 sm:py-32">
      <div aria-hidden="true" className="absolute left-[-10%] top-1/2 -z-10 h-[620px] w-[620px] -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgb(197_242_119/0.16),transparent_65%)]" />
      <div className="container-x grid items-center gap-16 lg:grid-cols-12 lg:gap-10">
        <Reveal className="relative mx-auto h-[460px] w-full max-w-[460px] sm:h-[540px] lg:col-span-5 lg:mx-0">
          <div className="absolute left-0 top-[10%] w-[38%] -rotate-[10deg] opacity-50 blur-[1.5px]">
            <PhoneMockup src={phones[1].mobile} alt="" />
          </div>
          <div className="absolute right-0 top-[14%] w-[38%] rotate-[9deg] opacity-50 blur-[1.5px]">
            <PhoneMockup src={phones[2].mobile} alt="" />
          </div>
          <div className="absolute left-1/2 top-0 w-[50%] -translate-x-1/2 -rotate-[4deg] drop-shadow-[0_0_60px_rgb(197_242_119/0.28)]">
            <PhoneMockup src={phones[0].mobile} alt={`Versão para celular do site ${phones[0].name}`} />
          </div>
        </Reveal>

        <div className="lg:col-span-6 lg:col-start-7">
          <Reveal>
            <h2 className="font-display text-[clamp(30px,3.6vw,50px)] font-extrabold leading-[1.08] tracking-[-0.015em] [font-stretch:110%]">
              Antes de fechar, você já vê <Hi>o site da sua empresa funcionando.</Hi>
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="mt-7 grid max-w-[58ch] gap-4 text-[17px] leading-relaxed text-paper/75">
              <p>
                Eu pesquiso o seu negócio, monto uma demonstração com as suas informações reais e te envio o link. Você navega pelo celular, mostra para quem quiser e <span className="font-semibold text-paper">só depois decide</span>.
              </p>
              <p>Sem pagar para ver um rascunho. Sem imaginar como vai ficar.</p>
            </div>
          </Reveal>
          <Reveal delay={0.14}>
            <ol className="mt-9 grid gap-3 sm:grid-cols-3">
              {["Você me conta sobre o negócio", "Eu monto o seu site", "Você aprova e publicamos"].map((t, i) => (
                <li key={t} className="rounded-[10px] border border-paper/10 bg-paper/[0.03] p-4">
                  <span className="font-display text-[22px] font-extrabold text-lime">{i + 1}</span>
                  <p className="mt-1.5 text-[14.5px] font-medium leading-snug text-paper/85">{t}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------- 2. O que você recebe (cartões em zigue-zague) ---------- */
const ic = (d: React.ReactNode) => (
  <svg viewBox="0 0 48 48" className="h-12 w-12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{d}</svg>
);
const BENEFITS = [
  {
    t: "Site sob medida para a sua marca",
    d: "Layout criado do zero para a identidade do seu negócio. Nada de template pronto.",
    i: ic(<><rect x="6" y="9" width="36" height="26" rx="3" /><path d="M6 16h36M17 41h14M24 35v6" /><path d="M14 23h10M14 28h16" /></>),
  },
  {
    t: "Feito para gerar contatos",
    d: "WhatsApp, mapa e formulário no lugar certo para transformar visitas em clientes.",
    i: ic(<><path d="M24 6c-9.9 0-18 7.6-18 17 0 3.4 1.1 6.6 2.9 9.2L7 42l9.4-2.6A18.6 18.6 0 0 0 24 40c9.9 0 18-7.6 18-17S33.9 6 24 6Z" /><path d="M17 21c0 6 4 10 10 10l2.5-2.5-4-2-1.5 1.5c-2-1-3.5-2.5-4.5-4.5l1.5-1.5-2-4L17 21Z" /></>),
  },
  {
    t: "Publicação e acompanhamento",
    d: "Domínio, hospedagem, testes finais e suporte para o site seguir rápido e seguro.",
    i: ic(<><path d="M24 6l14 6v10c0 9-6 16-14 20-8-4-14-11-14-20V12l14-6Z" /><path d="M17 24l5 5 9-10" /></>),
  },
];

export function Benefits() {
  return (
    <section id="beneficios" className="relative isolate overflow-hidden py-24 sm:py-32">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 -z-10 h-full bg-[radial-gradient(50%_40%_at_50%_45%,rgb(197_242_119/0.10),transparent_75%)]" />
      <div className="container-x">
        <Reveal>
          <h2 className="mx-auto max-w-[18ch] text-center font-display text-[clamp(30px,3.6vw,50px)] font-extrabold leading-[1.08] tracking-[-0.015em] [font-stretch:110%]">
            O que você <Hi>recebe</Hi> com a MAREME?
          </h2>
        </Reveal>

        <div className="relative mx-auto mt-16 max-w-[980px]">
          {/* Conectores (desktop) */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden lg:block">
            <div className="absolute right-[2%] top-[56px] h-[150px] w-[16%] rounded-tr-[4px] border-r-2 border-t-2 border-lime/70" />
            <div className="absolute right-[2%] top-[203px] h-0 w-0 border-x-[7px] border-t-[10px] border-x-transparent border-t-lime/70" style={{ transform: "translateX(6px)" }} />
            <div className="absolute left-[2%] top-[262px] h-[150px] w-[16%] rounded-tl-[4px] border-l-2 border-t-2 border-lime/70" />
            <div className="absolute left-[2%] top-[409px] h-0 w-0 border-x-[7px] border-t-[10px] border-x-transparent border-t-lime/70" style={{ transform: "translateX(-6px)" }} />
          </div>

          <ul className="relative grid gap-5 lg:gap-12">
            {BENEFITS.map((b, i) => (
              <li
                key={b.t}
                className={`lg:w-[64%] ${i === 0 ? "lg:mr-auto lg:ml-[6%]" : i === 1 ? "lg:mx-auto lg:translate-x-[8%]" : "lg:ml-auto lg:mr-[6%]"}`}
              >
                <Reveal delay={i * 0.08} className="flex flex-col items-center gap-5 rounded-[12px] border border-paper/10 bg-[#161616]/90 p-7 text-center shadow-[0_30px_60px_-30px_rgb(0_0_0/0.9)] sm:flex-row sm:items-center sm:text-left">
                  <span className="shrink-0 text-lime">{b.i}</span>
                  <div>
                    <h3 className="font-display text-[clamp(19px,1.6vw,22px)] font-bold leading-snug">{b.t}</h3>
                    <p className="mt-1.5 text-[15.5px] leading-relaxed text-paper/65">{b.d}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>

        <Reveal className="mt-14 flex justify-center">
          <CtaButton className="w-full sm:w-auto sm:min-w-[340px]">Quero meu site</CtaButton>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- 3. Prova: sites que já estão no ar ---------- */
export function Works() {
  return (
    <section id="projetos" className="relative py-24 sm:py-32">
      <div className="container-x">
        <Reveal>
          <h2 className="text-center font-display text-[clamp(30px,3.6vw,50px)] font-extrabold leading-[1.08] tracking-[-0.015em] [font-stretch:110%]">
            Sites que <Hi>já estão no ar</Hi>
          </h2>
          <p className="mx-auto mt-5 max-w-[52ch] text-center text-[17px] leading-relaxed text-paper/70">
            Cada um foi desenhado do zero para a marca, o público e o objetivo do negócio. Toque para visitar.
          </p>
        </Reveal>

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <li key={p.slug} className="min-w-0">
              <Reveal delay={(i % 3) * 0.06}>
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block overflow-hidden rounded-[12px] border border-paper/10 bg-[#161616] transition-[border-color,transform] duration-500 ease-out-expo hover:-translate-y-1 hover:border-lime/50"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={asset(p.desktop)}
                      alt={`Página inicial do site ${p.name}`}
                      width={1440}
                      height={900}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover object-top transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.04]"
                    />
                    <span className="absolute left-3 top-3 rounded-full bg-ink/80 px-3 py-1 text-[11.5px] font-medium text-paper/80 backdrop-blur-sm">{statusLabel[p.status]}</span>
                  </div>
                  <div className="flex items-center justify-between gap-4 p-5">
                    <div className="min-w-0">
                      <h3 className="truncate font-display text-[18px] font-bold">{p.name}</h3>
                      <p className="mt-1 truncate text-[13.5px] text-paper/55">{host(p.url)}</p>
                    </div>
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-paper/15 text-paper/70 transition-colors duration-300 group-hover:border-transparent group-hover:bg-lime group-hover:text-ink">
                      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M7 17L17 7M8 7h9v9" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </span>
                  </div>
                </a>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------- 4. Conheça quem cria o seu site ---------- */
export function Mentor() {
  const f = site.founder;
  const text = [f.story[0], f.story[2], f.story[4], f.story[5]];
  const thumbs = [projects[3], projects[2], projects[5]];
  return (
    <section id="sobre" className="relative isolate overflow-hidden pt-24 sm:pt-32">
      <div aria-hidden="true" className="absolute bottom-0 right-[10%] -z-10 h-[700px] w-[700px] rounded-full bg-[radial-gradient(circle,rgb(197_242_119/0.18),transparent_65%)]" />
      <div className="container-x grid items-end gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="pb-0 lg:col-span-5 lg:pb-28">
          <Reveal>
            <p className="text-[18px] text-paper/70">Conheça quem vai criar o seu site:</p>
            <h2 className="mt-1 font-display text-[clamp(40px,4.6vw,64px)] font-extrabold leading-none tracking-[-0.02em] text-lime [font-stretch:112%]">
              {f.name}
            </h2>
            <p className="mt-3 text-[15px] text-paper/60">{f.role}</p>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="mt-8 grid max-w-[54ch] gap-4 text-[16.5px] leading-relaxed text-paper/75">
              {text.map((t, i) => <p key={i}><Rich text={t} /></p>)}
            </div>
          </Reveal>
          <Reveal delay={0.14}>
            <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex items-center gap-2 text-[15px] font-medium text-paper underline decoration-lime decoration-2 underline-offset-[6px] hover:text-lime">
              Acompanhe no Instagram {site.instagram.handle}
            </a>
          </Reveal>
        </div>

        <div className="relative lg:col-span-7">
          <div className="relative mx-auto aspect-[4/5] max-w-[520px] lg:mr-[22%]">
            <div className="absolute inset-0 [mask-image:linear-gradient(to_top,transparent_0%,black_22%)]">
              <img
                src={asset(f.photo)}
                alt={`${f.name}, fundador da MAREME Digital`}
                width={821}
                height={1556}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover object-[50%_12%] grayscale contrast-[1.1]"
              />
              <div className="absolute inset-0 bg-lime mix-blend-multiply opacity-45" />
            </div>
          </div>
          <ul className="absolute right-0 top-[6%] hidden w-[20%] gap-3 lg:grid" aria-hidden="true">
            {thumbs.map((p) => (
              <li key={p.slug} className="overflow-hidden rounded-[10px] border border-paper/15 shadow-[0_20px_40px_-20px_rgb(0_0_0/0.9)]">
                <img src={asset(p.desktop)} alt="" width={1440} height={900} loading="lazy" className="aspect-[4/3] w-full object-cover object-top grayscale-[0.4]" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ---------- 5. Fechamento ---------- */
export function FinalCta() {
  return (
    <section id="contato" className="relative border-t border-lime/40 bg-[linear-gradient(180deg,rgb(197_242_119/0.07),transparent_70%)] py-20 sm:py-24">
      <div className="container-x grid items-center gap-10 lg:grid-cols-2">
        <Reveal>
          <h2 className="font-display text-[clamp(32px,3.8vw,54px)] font-extrabold uppercase leading-[1] tracking-[-0.01em] [font-stretch:112%]">
            Sua empresa pronta <br className="hidden sm:block" /><Hi>para ser encontrada</Hi>
          </h2>
          <p className="mt-5 max-w-[46ch] text-[17px] leading-relaxed text-paper/75">
            Clique no botão e me conte sobre o seu negócio. Eu respondo pelo WhatsApp com os próximos passos.
          </p>
        </Reveal>
        <Reveal delay={0.08} className="lg:justify-self-center">
          <CtaButton className="w-full sm:min-w-[380px]">Falar no WhatsApp</CtaButton>
          <p className="mt-4 text-center text-[14px] text-paper/60">
            ou no Instagram{" "}
            <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className="text-paper underline decoration-paper/30 underline-offset-4 hover:decoration-lime">{site.instagram.handle}</a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}

"use client";

import { Reveal } from "../Reveal";
import { PhoneStack, Connector, TiltCard } from "./Interactive";
import { projects, statusLabel } from "@/data/projects";
import { site } from "@/data/site";
import { asset } from "@/lib/asset";
import { CtaButton, Hi, Rich } from "./ui";

const host = (url: string) => url.replace(/^https?:\/\//, "").replace(/\/$/, "");

/* ---------- 1. O diferencial: o site pronto antes de fechar ---------- */
export function DemoProof() {
  const phones = [projects[0], projects[1], projects[4]];
  return (
    <section id="como" className="relative isolate scroll-mt-6 overflow-x-clip py-24 sm:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute left-[-8%] top-1/2 -z-10 h-[680px] w-[680px] -translate-y-1/2 bg-[radial-gradient(closest-side,#003900,transparent)]" />
      <div className="container-x grid items-center gap-16 lg:grid-cols-12 lg:gap-10">
        <PhoneStack front={phones[0]} left={phones[1]} right={phones[2]} />

        <div className="lg:col-span-6 lg:col-start-7">
          <Reveal>
            <h2 className="text-balance font-display text-[clamp(30px,3.6vw,50px)] font-extrabold leading-[1.08] tracking-[-0.015em] [font-stretch:110%]">
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
            <ol className="mt-8 grid gap-2 text-[15.5px] font-semibold text-paper">
              {["Você me conta sobre o seu negócio", "Eu monto o seu site com as suas informações", "Você aprova e publicamos"].map((t, i) => (
                <li key={t} className="flex items-baseline gap-3">
                  <span className="font-display text-[15px] font-extrabold text-lime">{i + 1}.</span>
                  {t}
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
    <section id="beneficios" className="relative isolate scroll-mt-6 overflow-x-clip py-24 sm:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute -inset-y-24 inset-x-0 -z-10 [mask-image:linear-gradient(to_bottom,transparent_0%,black_22%,black_78%,transparent_100%)]">
      <div className="absolute inset-0 bg-[radial-gradient(55%_45%_at_50%_55%,#003900,transparent_80%)]" />
      <div className="absolute inset-0 opacity-[0.22] [background:repeating-conic-gradient(from_0deg_at_50%_62%,#52ff00_0deg_0.35deg,transparent_0.35deg_6deg)] [mask-image:radial-gradient(60%_55%_at_50%_62%,transparent_12%,black_45%,transparent_95%)]" />
      </div>
      <div className="container-x">
        <Reveal>
          <h2 className="mx-auto max-w-[18ch] text-balance text-center font-display text-[clamp(30px,3.6vw,50px)] font-extrabold leading-[1.08] tracking-[-0.015em] [font-stretch:110%]">
            O que você <Hi>recebe</Hi> com a MAREME?
          </h2>
        </Reveal>

        <div className="relative mx-auto mt-16 max-w-[980px]">
          {/* Conectores (desktop) */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden lg:block">
            <Connector from="left" className="absolute right-[2%] top-[56px] h-[150px] w-[16%] border-r-2 border-t-2 border-lime" />
            <div className="absolute right-[2%] top-[203px] h-0 w-0 border-x-[7px] border-t-[10px] border-x-transparent border-t-lime" style={{ transform: "translateX(6px)" }} />
            <Connector from="right" className="absolute left-[2%] top-[262px] h-[150px] w-[16%] border-l-2 border-t-2 border-lime" />
            <div className="absolute left-[2%] top-[409px] h-0 w-0 border-x-[7px] border-t-[10px] border-x-transparent border-t-lime" style={{ transform: "translateX(-6px)" }} />
          </div>

          <ul className="relative grid gap-5 lg:gap-12">
            {BENEFITS.map((b, i) => (
              <li
                key={b.t}
                className={`lg:w-[64%] ${i === 0 ? "lg:mr-auto lg:ml-[6%]" : i === 1 ? "lg:mx-auto lg:translate-x-[8%]" : "lg:ml-auto lg:mr-[6%]"}`}
              >
                <Reveal delay={i * 0.08} className="flex flex-col items-center gap-5 rounded-[4px] bg-card/95 p-7 text-center sm:flex-row sm:items-center sm:gap-7 sm:text-left">
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
    <section id="projetos" className="relative scroll-mt-6 py-24 sm:py-32">
      <div className="container-x">
        <Reveal>
          <h2 className="text-balance text-center font-display text-[clamp(30px,3.6vw,50px)] font-extrabold leading-[1.08] tracking-[-0.015em] [font-stretch:110%]">
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
                <TiltCard>
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block overflow-hidden rounded-[4px] bg-card outline outline-1 -outline-offset-1 outline-transparent transition-[outline-color] duration-500 [@media(hover:hover)]:hover:outline-lime/60"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={asset(p.desktop)}
                      alt={`Página inicial do site ${p.name}`}
                      width={1440}
                      height={900}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover object-top transition-transform duration-[1.2s] ease-out-expo [@media(hover:hover)]:group-hover:scale-[1.04]"
                    />
                    <span className="absolute left-3 top-3 rounded-[3px] bg-ink/85 px-2.5 py-1 text-[11.5px] font-semibold text-paper/85">{statusLabel[p.status]}</span>
                  </div>
                  <div className="flex items-center justify-between gap-4 p-5">
                    <div className="min-w-0">
                      <h3 className="truncate font-display text-[18px] font-bold">{p.name}</h3>
                      <p className="mt-1 truncate text-[13.5px] text-paper/55"><span className="sm:hidden">{p.segment} · {p.category}</span><span className="hidden sm:inline">{host(p.url)}</span></p>
                    </div>
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-[3px] bg-paper/[0.06] text-paper/70 transition-colors duration-300 group-hover:bg-degrade group-hover:text-ink">
                      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M7 17L17 7M8 7h9v9" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </span>
                  </div>
                </a>
                </TiltCard>
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
    <section id="sobre" className="relative isolate scroll-mt-6 overflow-x-clip pt-20 sm:pt-28">
      {/* luz verde atrás do retrato */}
      <div aria-hidden="true" className="pointer-events-none absolute -inset-y-24 inset-x-0 -z-20 bg-[radial-gradient(38%_50%_at_62%_55%,#007e00_0%,#003900_45%,transparent_80%)] max-lg:bg-[radial-gradient(70%_32%_at_50%_74%,#007e00_0%,#003900_45%,transparent_85%)] [mask-image:linear-gradient(to_bottom,transparent_0%,black_22%,black_78%,transparent_100%)]" />

      <div className="container-x relative grid lg:min-h-[720px] lg:grid-cols-12">
        <div className="relative z-10 lg:col-span-5 lg:self-center lg:pb-16">
          <Reveal>
            <p className="text-[18px] text-paper/75">Conheça quem vai criar o seu site:</p>
            <h2 className="mt-1 font-display text-[clamp(38px,4.4vw,60px)] font-extrabold leading-none tracking-[-0.02em] [font-stretch:112%]">
              <span className="text-degrade">{f.name}</span>
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="mt-7 grid max-w-[50ch] gap-4 text-[16.5px] leading-relaxed text-paper/80">
              {text.map((t, i) => <p key={i}><Rich text={t} /></p>)}
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex min-h-11 items-center gap-2 text-[15px] font-semibold text-lime underline decoration-lime/40 decoration-2 underline-offset-[6px] hover:decoration-lime">
              {site.instagram.handle} no Instagram
            </a>
          </Reveal>
        </div>

        {/* Retrato sem moldura: some na luz e no fundo, como na referência */}
        <div className="relative -mx-5 mt-6 h-[115vw] max-h-[620px] lg:absolute lg:inset-y-0 lg:right-[10%] lg:mx-0 lg:mt-0 lg:h-auto lg:max-h-none lg:w-[44%]">
          <div aria-hidden="true" className="absolute inset-0 [mask-image:linear-gradient(to_bottom,black_55%,transparent_95%)]">
            <img
              src={asset("/images/fundador-recorte.png")}
              alt={`${f.name}, fundador da MAREME Digital`}
              width={821}
              height={1556}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover object-top [filter:drop-shadow(0_0_28px_rgb(0_177_1/0.7))_contrast(1.05)_saturate(0.92)]"
            />
          </div>
          <ul className="absolute right-3 top-[12%] grid w-[30%] gap-2.5 sm:right-6 lg:-right-[16%] lg:w-[34%]" aria-hidden="true">
            {thumbs.map((p) => (
              <li key={p.slug} className="overflow-hidden rounded-[4px]">
                <img src={asset(p.desktop)} alt="" width={1440} height={900} loading="lazy" decoding="async" className="aspect-[4/3] w-full object-cover object-top grayscale" />
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
    <section id="contato" className="relative scroll-mt-6 py-16 sm:py-20">
      <div className="container-x grid items-center gap-10 lg:grid-cols-2">
        <Reveal>
          <h2 className="text-balance font-display text-[clamp(32px,3.8vw,54px)] font-extrabold uppercase leading-[1] tracking-[-0.01em] [font-stretch:112%]">
            Sua empresa pronta <br className="hidden sm:block" /><span className="text-degrade">para ser encontrada</span>
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

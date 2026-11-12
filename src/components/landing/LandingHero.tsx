"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { INTRO_EVENT } from "../Preloader";
import { site } from "@/data/site";
import { projects } from "@/data/projects";
import { asset } from "@/lib/asset";
import { CtaButton, Hi, IconCheck } from "./ui";
import { LogoMark } from "../Logo";

const BULLETS = [
  "Site pronto antes de você fechar",
  "Feito sob medida para o seu negócio",
  "WhatsApp e Google no lugar certo",
];

export function LandingHero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ paused: true, defaults: { ease: "expo.out", duration: 1 } });
        tl.from(".lh-photo", { opacity: 0, scale: 1.06, duration: 1.8, ease: "power2.out" })
          .from(".lh-in", { opacity: 0, y: 26, stagger: 0.08 }, 0.15)
          .from(".lh-note", { opacity: 0, x: 40, stagger: 0.12, duration: 0.9 }, 0.5);
        const play = () => tl.play();
        if (document.documentElement.dataset.intro === "done") play();
        else window.addEventListener(INTRO_EVENT, play, { once: true });
        return () => window.removeEventListener(INTRO_EVENT, play);
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} id="inicio" className="relative isolate overflow-hidden">
      {/* Luz verde de fundo */}
      <div aria-hidden="true" className="absolute inset-0 -z-20 bg-[radial-gradient(70%_80%_at_72%_30%,rgb(197_242_119/0.30),rgb(60_90_20/0.18)_40%,transparent_75%),radial-gradient(60%_60%_at_10%_100%,rgb(197_242_119/0.10),transparent_70%)]" />

      {/* Foto do fundador com tratamento verde */}
      <div className="lh-photo pointer-events-none absolute inset-y-0 right-0 -z-10 hidden w-[58%] lg:block">
        <div className="absolute inset-0 [mask-image:linear-gradient(to_right,transparent_0%,black_38%)]">
          <img
            src={asset(site.founder.photo)}
            alt=""
            width={821}
            height={1556}
            fetchPriority="high"
            className="absolute inset-0 h-full w-full object-cover object-[50%_18%] grayscale contrast-[1.4] brightness-[0.8]"
          />
          <div className="absolute inset-0 bg-lime mix-blend-multiply opacity-90" />
          <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_60%_25%,rgb(197_242_119/0.35),transparent_70%)] mix-blend-screen" />
        </div>
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink to-transparent" />
        <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-ink/80 to-transparent" />
      </div>

      <div className="container-x relative grid items-center gap-12 pb-16 pt-28 lg:min-h-[100svh] lg:grid-cols-12 lg:pb-24 lg:pt-36">
        <div className="lg:col-span-6">
          <p className="lh-in inline-flex items-center gap-2.5 rounded-full border border-lime/30 bg-ink/60 px-4 py-2 text-[13px] font-medium text-paper/85 backdrop-blur-sm">
            <span className="h-2 w-2 rounded-full bg-lime shadow-[0_0_12px_rgb(197_242_119)]" aria-hidden="true" />
            Criação de sites em Maceió — AL
          </p>

          <h1 className="lh-in mt-7 text-balance font-display text-[clamp(36px,4.5vw,66px)] font-extrabold leading-[1.02] tracking-[-0.02em] [font-stretch:110%]">
            Seu próximo cliente pode estar <Hi>procurando por você agora.</Hi>
          </h1>

          <p className="lh-in mt-6 max-w-[520px] text-[clamp(17px,1.35vw,19px)] leading-relaxed text-paper/80">
            Quando alguém pesquisa a sua empresa, o que encontra? Eu crio sites modernos e personalizados que apresentam o seu trabalho e transformam visitas em clientes.
          </p>

          <ul className="lh-in mt-7 grid gap-3">
            {BULLETS.map((b) => (
              <li key={b} className="flex items-center gap-3 text-[16px] font-medium text-paper">
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-lime text-ink"><IconCheck className="h-3.5 w-3.5" /></span>
                {b}
              </li>
            ))}
          </ul>

          <div className="lh-in mt-10">
            <CtaButton className="w-full sm:w-auto sm:min-w-[380px]">Quero meu site</CtaButton>
            <p className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[14px] text-paper/70 sm:justify-start">
              <span className="inline-flex items-center gap-2"><IconCheck className="h-4 w-4 text-lime" />Atendimento direto com o Emerson</span>
              <span className="inline-flex items-center gap-2"><IconCheck className="h-4 w-4 text-lime" />Resposta pelo WhatsApp</span>
            </p>
          </div>
        </div>

        {/* Mobile: foto + avisos de sites publicados */}
        <figure className="lh-in relative -mx-5 lg:hidden" aria-label="Emerson e sites publicados pela MAREME">
          <div className="relative aspect-[4/5] overflow-hidden [mask-image:linear-gradient(to_top,transparent_0%,black_28%,black_80%,transparent_100%)]">
            <img
              src={asset(site.founder.photo)}
              alt={`${site.founder.name}, fundador da MAREME Digital`}
              width={821}
              height={1556}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover object-[50%_16%] grayscale contrast-[1.4] brightness-[0.8]"
            />
            <div className="absolute inset-0 bg-lime mix-blend-multiply opacity-90" />
          </div>
          <ul className="absolute inset-x-5 bottom-2 grid gap-2.5">
            {projects.slice(0, 2).map((p, i) => (
              <li key={p.slug} className={`flex items-center gap-3 rounded-[14px] border border-paper/10 bg-ink/80 p-3 backdrop-blur-md ${i ? "ml-6 opacity-80" : "mr-6"}`}>
                <LogoMark className="h-9 w-9 shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13px] font-semibold text-paper">{p.name}</p>
                  <p className="truncate text-[12px] text-paper/60">Site publicado · {p.segment}</p>
                </div>
              </li>
            ))}
          </ul>
        </figure>

        {/* Notificações: sites reais publicados */}
        <div className="relative hidden lg:col-span-5 lg:col-start-8 lg:block" aria-label="Sites publicados pela MAREME">
          <ul className="ml-auto grid max-w-[360px] gap-3">
            {projects.slice(0, 4).map((p, i) => (
              <li
                key={p.slug}
                className="lh-note flex items-center gap-3 rounded-[14px] border border-paper/10 bg-ink/70 p-3.5 shadow-[0_20px_40px_-20px_rgb(0_0_0/0.9)] backdrop-blur-md"
                style={{ opacity: 1 - i * 0.18, transform: `translateX(${i % 2 ? 28 : 0}px)` }}
              >
                <LogoMark className="h-10 w-10 shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="flex items-center justify-between gap-3 text-[13px] font-semibold text-paper">
                    <span className="truncate">{p.name}</span> <span className="shrink-0 text-[11px] font-normal text-paper/45">agora</span>
                  </p>
                  <p className="truncate text-[12.5px] text-paper/60">Site publicado · {p.segment}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

"use client";

import { Fragment, useRef } from "react";
import { site } from "@/data/site";
import { asset } from "@/lib/asset";
import { gsap, useGSAP } from "@/lib/gsap";
import { Reveal } from "./Reveal";

/** Converte **trecho** em negrito. */
function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split("**").map((part, i) =>
        i % 2 ? <strong key={i} className="font-medium text-white">{part}</strong> : <Fragment key={i}>{part}</Fragment>
      )}
    </>
  );
}

export function Founder() {
  const root = useRef<HTMLElement>(null);
  const f = site.founder;
  const [first, ...rest] = f.title.split(" sou ");

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ".founder-frame",
          { clipPath: "inset(100% 0% 0% 0% round 28px)" },
          {
            clipPath: "inset(0% 0% 0% 0% round 28px)", duration: 1.6, ease: "expo.out",
            scrollTrigger: { trigger: ".founder-frame", start: "top 85%" },
          }
        );
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} id="sobre" className="relative overflow-hidden py-28 sm:py-36">
      <div aria-hidden="true" className="pointer-events-none absolute -left-40 top-1/3 h-[520px] w-[520px] rounded-full bg-lime/[0.06] blur-[140px]" />
      <div className="container-x grid gap-14 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
        <div className="relative isolate mx-auto w-full max-w-[340px] self-start lg:sticky lg:top-28 lg:mx-0">
          {/* Foto de corpo inteiro: a moldura segue a proporção original da imagem (821×1931) */}
          <div className="founder-frame relative aspect-[821/1931] overflow-hidden rounded-[28px] border border-line bg-ink-3" style={{ clipPath: "inset(0% 0% 0% 0% round 28px)" }}>
            <img
              src={asset(f.photo)}
              alt={`${f.name}, ${f.role}`}
              width={821}
              height={1931}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/90 to-transparent" />
            <div className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-ink/50 px-4 py-3 backdrop-blur-xl">
              <div>
                <p className="text-[15px] font-medium">{f.name}</p>
                <p className="text-[12px] text-mist">Fundador · MAREME Digital</p>
              </div>
              <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/15 px-3 py-1.5 text-[12px] text-white/85 hover:border-white/40">
                {site.instagram.handle}
              </a>
            </div>
          </div>
          <div aria-hidden="true" className="bg-accent absolute -right-4 -top-4 -z-10 h-full w-full rounded-[32px] opacity-[0.12] blur-2xl" />
        </div>

        <div className="lg:pt-6">
          <Reveal>
            <p className="eyebrow mb-6">
              <span className="font-serif text-base italic tracking-normal text-white/80">02</span>
              <span className="h-px w-8 bg-white/20" />Sobre mim
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="text-[clamp(38px,5.2vw,76px)] font-medium leading-[0.98] tracking-[-0.04em]">
              {first} sou <em className="text-accent pr-[0.05em] font-serif font-normal italic tracking-[-0.01em]">{rest.join(" sou ")}</em>
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mt-6 text-[15px] uppercase tracking-[0.18em] text-mist">{f.role}</p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-8 grid gap-4 text-[17px] leading-relaxed text-white/75">
              {f.story.map((p, i) => <p key={i}><Rich text={p} /></p>)}
            </div>
          </Reveal>

          <Reveal delay={0.26}>
            <ul className="mt-10 flex flex-wrap gap-2" aria-label="Habilidades">
              {f.skills.map((s) => (
                <li key={s} className="rounded-full border border-line bg-white/[0.03] px-4 py-2 text-[14px] text-white/85">{s}</li>
              ))}
            </ul>
          </Reveal>

          <div className="mt-12 grid gap-4">
            {[f.vision, f.relation].map((block, i) => (
              <Reveal key={block.title} delay={0.1 + i * 0.08} className={i === 0 ? "card-accent rounded-[22px] p-6 sm:p-8" : "rounded-[22px] border border-line bg-ink-2 p-6 sm:p-8"}>
                <h3 className="eyebrow mb-5">{block.title}</h3>
                <div className="grid gap-3.5 text-[16px] leading-relaxed text-white/75">
                  {block.text.map((p, j) => <p key={j}><Rich text={p} /></p>)}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

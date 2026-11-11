"use client";

import { useRef } from "react";
import { site } from "@/data/site";
import { asset } from "@/lib/asset";
import { gsap, useGSAP } from "@/lib/gsap";
import { Reveal } from "./Reveal";
import { Em } from "./SectionHeading";

export function Founder() {
  const root = useRef<HTMLElement>(null);
  const f = site.founder;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(".founder-photo", { yPercent: 8 }, {
          yPercent: -8, ease: "none",
          scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true },
        });
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
      <div aria-hidden="true" className="pointer-events-none absolute -left-40 top-1/3 h-[520px] w-[520px] rounded-full bg-electric/15 blur-[140px]" />
      <div className="container-x grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div className="relative isolate mx-auto w-full max-w-[460px] lg:mx-0">
          <div className="founder-frame relative aspect-[4/5] overflow-hidden rounded-[28px] border border-line bg-ink-3" style={{ clipPath: "inset(0% 0% 0% 0% round 28px)" }}>
            <img
              src={asset(f.photo)}
              alt={`${f.name}, ${f.role}`}
              width={821}
              height={1931}
              loading="lazy"
              decoding="async"
              className="founder-photo absolute inset-x-0 -top-[8%] h-[116%] w-full object-cover object-[50%_28%]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" />
            <div className="absolute inset-x-5 bottom-5 flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-ink/50 px-4 py-3 backdrop-blur-xl">
              <div>
                <p className="text-[15px] font-medium">{f.name}</p>
                <p className="text-[12px] text-mist">Fundador · MAREME Digital</p>
              </div>
              <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/15 px-3 py-1.5 text-[12px] text-white/85 hover:border-white/40">
                {site.instagram.handle}
              </a>
            </div>
          </div>
          <div aria-hidden="true" className="bg-brand absolute -right-4 -top-4 -z-10 h-full w-full rounded-[32px] opacity-30 blur-2xl" />
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
              Por trás de cada projeto, <Em>um olhar dedicado.</Em>
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mt-6 text-[15px] uppercase tracking-[0.18em] text-mist">{f.name} — {f.role}</p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-8 grid gap-4 text-[17px] leading-relaxed text-white/75">
              {f.story.map((p, i) => <p key={i}>{p}</p>)}
            </div>
          </Reveal>

          <Reveal delay={0.26}>
            <ul className="mt-10 flex flex-wrap gap-2" aria-label="Habilidades">
              {f.skills.map((s) => (
                <li key={s} className="rounded-full border border-line bg-white/[0.03] px-4 py-2 text-[14px] text-white/85">{s}</li>
              ))}
            </ul>
          </Reveal>

          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            <Reveal delay={0.1} className="border-gradient rounded-[22px] p-6">
              <p className="eyebrow mb-3">Visão de trabalho</p>
              <p className="font-serif text-[22px] italic leading-snug text-white/90">{f.vision}</p>
            </Reveal>
            <Reveal delay={0.18} className="rounded-[22px] border border-line bg-ink-2 p-6">
              <p className="eyebrow mb-3">A MAREME e eu</p>
              <p className="text-[16px] leading-relaxed text-white/75">{f.relation}</p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

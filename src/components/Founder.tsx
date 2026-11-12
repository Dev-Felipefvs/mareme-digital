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
        i % 2 ? <strong key={i} className="font-medium text-paper">{part}</strong> : <Fragment key={i}>{part}</Fragment>
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
          { clipPath: "inset(100% 0% 0% 0% round 12px)" },
          {
            clipPath: "inset(0% 0% 0% 0% round 12px)", duration: 1.4, ease: "expo.out",
            scrollTrigger: { trigger: ".founder-frame", start: "top 85%" },
          }
        );
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} id="sobre" className="relative border-b border-line py-28 sm:py-36">
      <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <div className="founder-frame relative mx-auto aspect-[821/1556] max-w-[360px] overflow-hidden rounded-xl border border-line bg-graphite lg:mx-0" style={{ clipPath: "inset(0% 0% 0% 0% round 12px)" }}>
              <img
                src={asset(f.photo)}
                alt={`${f.name}, ${f.role}`}
                width={821}
                height={1556}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
            <div className="mx-auto mt-5 flex max-w-[360px] items-center justify-between gap-3 lg:mx-0">
              <div>
                <p className="text-[15px] font-medium">{f.name}</p>
                <p className="text-[14px] text-mist">Fundador · MAREME Digital</p>
              </div>
              <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className="rounded-md border border-line px-3 py-1.5 text-[13px] text-mist transition-colors hover:border-paper/30 hover:text-paper">
                {site.instagram.handle}
              </a>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 lg:col-start-6">
          <Reveal>
            <h2 className="text-[clamp(40px,5.4vw,76px)] font-semibold leading-[0.98] tracking-[-0.04em]">
              {first} sou {rest.join(" sou ")}
            </h2>
          </Reveal>
          <Reveal delay={0.06}>
            <p className="mt-5 text-[17px] text-mist">{f.role}</p>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="mt-10 grid max-w-[58ch] gap-5 text-[17px] leading-relaxed text-paper/75">
              {f.story.map((p, i) => <p key={i}><Rich text={p} /></p>)}
            </div>
          </Reveal>

          <Reveal delay={0.16}>
            <ul className="mt-10 flex flex-wrap gap-2" aria-label="Habilidades">
              {f.skills.map((s) => (
                <li key={s} className="rounded-md border border-line px-3 py-1.5 text-[14px] text-mist">{s}</li>
              ))}
            </ul>
          </Reveal>

          <div className="mt-16 grid border-t border-line">
            {[f.vision, f.relation].map((block) => (
              <Reveal key={block.title} className="grid gap-5 border-b border-line py-10 md:grid-cols-[200px_1fr] md:gap-10">
                <h3 className="text-[17px] font-medium text-paper">{block.title}</h3>
                <div className="grid max-w-[58ch] gap-4 text-[16px] leading-relaxed text-paper/70">
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

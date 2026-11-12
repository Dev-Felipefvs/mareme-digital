"use client";

import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { projects, statusLabel, type Project } from "@/data/projects";
import { asset } from "@/lib/asset";
import { DesktopMockup, PhoneMockup } from "./DeviceMockup";
import { ArrowUpRight } from "./MagneticButton";
import { SectionHeading, Em } from "./SectionHeading";

function ProjectCard({ p, index, featured, left, onOpen }: { p: Project; index: number; featured: boolean; left: boolean; onOpen: () => void }) {
  return (
    <motion.article
      className={`border-b border-line ${featured ? "md:col-span-2" : left ? "md:border-r" : ""}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: (index % 2) * 0.06 }}
    >
      <button
        type="button"
        onClick={onOpen}
        aria-label={`Ver detalhes do projeto ${p.name}`}
        className="group block w-full p-4 text-left transition-colors duration-500 hover:bg-paper/[0.025] sm:p-6"
      >
        <div className={`relative overflow-hidden rounded-lg border border-line bg-graphite ${featured ? "aspect-[16/9] md:aspect-[21/9]" : "aspect-[16/10]"}`}>
          <img
            src={asset(p.desktop)}
            alt={`Página inicial do site ${p.name}`}
            width={1440}
            height={900}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover object-top transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.025]"
          />
          <div className="absolute bottom-0 right-[5%] w-[20%] max-w-[150px] translate-y-[40%] transition-transform duration-700 ease-out-expo group-hover:translate-y-[14%] md:w-[14%]">
            <div className="rounded-[16px] border border-paper/15 bg-ink p-[3px] shadow-[0_20px_40px_-12px_rgb(0_0_0/0.8)]">
              <img src={asset(p.mobile)} alt="" width={780} height={1688} loading="lazy" decoding="async" className="aspect-[390/844] w-full rounded-[13px] object-cover object-top" />
            </div>
          </div>
        </div>
        <div className="flex items-start justify-between gap-6 pt-5">
          <div className="min-w-0">
            <h3 className={`font-semibold tracking-[-0.03em] ${featured ? "text-[clamp(26px,2.8vw,40px)]" : "text-[clamp(22px,2vw,28px)]"}`}>{p.name}</h3>
            <p className="mt-2 font-mono text-[12.5px] text-mist">{p.segment} · {p.category}</p>
          </div>
          <div className="flex shrink-0 items-center gap-4 pt-1.5">
            <span className="hidden rounded-md border border-line px-2.5 py-1 font-mono text-[11.5px] text-mist sm:inline-block">{statusLabel[p.status]}</span>
            <span className="grid h-9 w-9 place-items-center rounded-lg border border-line text-mist transition-colors duration-300 group-hover:border-transparent group-hover:bg-lime group-hover:text-ink">
              <ArrowUpRight />
            </span>
          </div>
        </div>
      </button>
    </motion.article>
  );
}

function ProjectModal({ p, onClose, onStep }: { p: Project; onClose: () => void; onStep: (d: number) => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onStep(1);
      if (e.key === "ArrowLeft") onStep(-1);
      if (e.key === "Tab" && panelRef.current) {
        const f = panelRef.current.querySelectorAll<HTMLElement>("a[href], button");
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      prev?.focus({ preventScroll: true });
    };
  }, [onClose, onStep]);

  useEffect(() => { panelRef.current?.scrollTo({ top: 0 }); }, [p.slug]);

  return (
    <motion.div
      className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-title"
    >
      <button type="button" aria-label="Fechar" tabIndex={-1} onClick={onClose} className="absolute inset-0 bg-ink/80 backdrop-blur-md" />
      <motion.div
        ref={panelRef}
        className="relative max-h-[92svh] w-full max-w-6xl overflow-y-auto rounded-t-xl border border-line bg-ink sm:rounded-xl"
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-line bg-ink/90 px-5 py-4 backdrop-blur-md sm:px-8">
          <p className="truncate text-[14px] text-mist">{p.segment} · {p.category} · <span className="tabular">{p.year}</span></p>
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => onStep(-1)} aria-label="Projeto anterior" className="grid h-10 w-10 place-items-center rounded-lg border border-line hover:bg-paper/5"><Chevron dir={-1} /></button>
            <button type="button" onClick={() => onStep(1)} aria-label="Próximo projeto" className="grid h-10 w-10 place-items-center rounded-lg border border-line hover:bg-paper/5"><Chevron dir={1} /></button>
            <button ref={closeRef} type="button" onClick={onClose} aria-label="Fechar detalhes" className="grid h-10 w-10 place-items-center rounded-lg bg-paper text-ink"><svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" /></svg></button>
          </div>
        </div>

        <div className="relative px-5 pb-10 pt-8 sm:px-8 sm:pb-12">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <span className="mb-4 inline-block rounded-md border border-line px-2.5 py-1 text-[12px] text-mist">{statusLabel[p.status]}</span>
              <h3 id="project-title" className="text-[clamp(34px,5vw,64px)] font-semibold leading-none tracking-[-0.04em]">{p.name}</h3>
            </div>
            <a href={p.url} target="_blank" rel="noopener noreferrer" className="inline-flex h-12 items-center gap-2 rounded-lg bg-lime px-6 text-[15px] font-medium text-ink transition-[filter] hover:brightness-105">
              Visitar o site <ArrowUpRight />
            </a>
          </div>

          <div className="relative mt-10 pb-6 pr-[14%] sm:pr-[18%]">
            <DesktopMockup src={p.desktop} alt={`Versão desktop do site ${p.name}`} url={p.url} />
            <PhoneMockup src={p.mobile} alt={`Versão mobile do site ${p.name}`} className="absolute bottom-0 right-0 w-[26%] max-w-[230px] sm:w-[22%]" />
          </div>

          <div className="mt-10 grid gap-10 md:grid-cols-[1.4fr_1fr]">
            <p className="text-[18px] leading-relaxed text-white/80">{p.description}</p>
            <div className="grid gap-8">
              <div>
                <h4 className="mb-4 text-[14px] font-medium text-paper">Destaques</h4>
                <ul className="grid gap-2.5">
                  {p.highlights.map((h) => (
                    <li key={h} className="flex gap-3 text-[15px] text-white/80">
                      <span className="mt-[9px] h-px w-3 shrink-0 bg-paper/40" />{h}
                    </li>
                  ))}
                </ul>
              </div>
              {p.technologies.length > 0 && (
                <div>
                  <h4 className="mb-4 text-[14px] font-medium text-paper">Tecnologias</h4>
                  <ul className="flex flex-wrap gap-2">
                    {p.technologies.map((t) => (
                      <li key={t} className="rounded-md border border-line px-2.5 py-1 text-[13px] text-mist">{t}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function Chevron({ dir }: { dir: 1 | -1 }) {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d={dir === 1 ? "M9 6l6 6-6 6" : "M15 6l-6 6 6 6"} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Portfolio() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const close = useCallback(() => setOpenIdx(null), []);
  const step = useCallback((d: number) => setOpenIdx((i) => (i === null ? i : (i + d + projects.length) % projects.length)), []);

  return (
    <section id="projetos" className="relative border-b border-line pt-28 sm:pt-36">
      <div className="container-x">
        <SectionHeading
          title={<>Projetos que <Em>impressionam</Em></>}
          text="Sites reais e demonstrações criados pela MAREME Digital — cada um pensado do zero para a marca, o público e o objetivo do negócio."
        />
        <div className="grid border-t border-line md:grid-cols-2">
          {(() => {
            let col = 0;
            return projects.map((p, i) => {
              const featured = i === 0 || (i === projects.length - 1 && (projects.length - 1) % 2 === 1);
              const left = !featured && col % 2 === 0;
              if (!featured) col++;
              return <ProjectCard key={p.slug} p={p} index={i} featured={featured} left={left} onOpen={() => setOpenIdx(i)} />;
            });
          })()}
        </div>
      </div>

      <AnimatePresence>
        {openIdx !== null && <ProjectModal key="modal" p={projects[openIdx]} onClose={close} onStep={step} />}
      </AnimatePresence>
    </section>
  );
}

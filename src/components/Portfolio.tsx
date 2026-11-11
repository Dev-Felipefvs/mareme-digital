"use client";

import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState, type MouseEvent } from "react";
import { projects, statusLabel, type Project } from "@/data/projects";
import { asset } from "@/lib/asset";
import { DesktopMockup, PhoneMockup } from "./DeviceMockup";
import { ArrowUpRight } from "./MagneticButton";
import { SectionHeading, Em } from "./SectionHeading";

function setSpot(e: MouseEvent<HTMLElement>) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
}

function ProjectCard({ p, index, featured, onOpen }: { p: Project; index: number; featured: boolean; onOpen: () => void }) {
  return (
    <motion.article
      className={featured ? "md:col-span-2" : ""}
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: (index % 2) * 0.08 }}
    >
      <button
        type="button"
        onClick={onOpen}
        onMouseMove={setSpot}
        data-cursor="Ver"
        aria-label={`Ver detalhes do projeto ${p.name}`}
        className="spotlight group block w-full rounded-[28px] border border-line bg-ink-2 p-3 text-left transition-[border-color,transform] duration-500 ease-out-expo hover:-translate-y-1 hover:border-white/20 sm:p-4"
      >
        <div className={`relative overflow-hidden rounded-[20px] bg-ink-3 ${featured ? "aspect-[16/9] md:aspect-[21/9]" : "aspect-[16/10]"}`}>
          <img
            src={asset(p.desktop)}
            alt={`Página inicial do site ${p.name}`}
            width={1440}
            height={900}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover object-top transition-transform duration-[1.4s] ease-out-expo group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-50" />
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-0 mix-blend-soft-light transition-opacity duration-700 group-hover:opacity-100"
            style={{ background: `radial-gradient(600px circle at 70% 120%, ${p.accent}, transparent 60%)` }}
          />
          {/* Mockup mobile que sobe no hover */}
          <div className="absolute bottom-0 right-[5%] w-[22%] max-w-[170px] translate-y-[38%] transition-transform duration-700 ease-out-expo group-hover:translate-y-[12%] md:w-[16%]">
            <div className="rounded-[18px] border border-white/20 bg-black p-[3px] shadow-2xl">
              <img src={asset(p.mobile)} alt="" width={780} height={1688} loading="lazy" decoding="async" className="aspect-[390/844] w-full rounded-[15px] object-cover object-top" />
            </div>
          </div>
          <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-ink/60 px-3 py-1 text-[11px] font-medium tracking-[0.12em] text-white/85 backdrop-blur-md">
            {statusLabel[p.status]}
          </span>
        </div>
        <div className="flex items-end justify-between gap-6 px-2 pb-2 pt-5">
          <div>
            <p className="text-[12px] uppercase tracking-[0.2em] text-mist">
              {p.segment} · {p.category}
            </p>
            <h3 className={`mt-2 font-medium tracking-[-0.03em] ${featured ? "text-[clamp(28px,3.2vw,44px)]" : "text-[clamp(24px,2.4vw,32px)]"}`}>{p.name}</h3>
          </div>
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-line transition-all duration-500 ease-out-expo group-hover:rotate-45 group-hover:border-transparent group-hover:bg-white group-hover:text-ink">
            <ArrowUpRight />
          </span>
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
        className="relative max-h-[92svh] w-full max-w-6xl overflow-y-auto rounded-t-[28px] border border-line bg-ink-2 sm:rounded-[28px]"
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full blur-[110px]" style={{ background: p.accent, opacity: 0.25 }} />
        <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-line bg-ink-2/85 px-5 py-4 backdrop-blur-xl sm:px-8">
          <p className="truncate text-[12px] uppercase tracking-[0.2em] text-mist">{p.segment} · {p.category} · {p.year}</p>
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => onStep(-1)} aria-label="Projeto anterior" className="grid h-10 w-10 place-items-center rounded-full border border-line hover:bg-white/5">‹</button>
            <button type="button" onClick={() => onStep(1)} aria-label="Próximo projeto" className="grid h-10 w-10 place-items-center rounded-full border border-line hover:bg-white/5">›</button>
            <button ref={closeRef} type="button" onClick={onClose} aria-label="Fechar detalhes" className="grid h-10 w-10 place-items-center rounded-full bg-white text-ink">✕</button>
          </div>
        </div>

        <div className="relative px-5 pb-10 pt-8 sm:px-8 sm:pb-12">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <span className="mb-4 inline-block rounded-full border border-line px-3 py-1 text-[11px] tracking-[0.12em] text-white/80">{statusLabel[p.status]}</span>
              <h3 id="project-title" className="text-[clamp(34px,5vw,64px)] font-medium leading-none tracking-[-0.04em]">{p.name}</h3>
            </div>
            <a href={p.url} target="_blank" rel="noopener noreferrer" className="bg-brand inline-flex h-12 items-center gap-2 rounded-full px-6 text-[15px] font-medium transition-transform hover:-translate-y-0.5">
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
                <h4 className="eyebrow mb-4">Destaques</h4>
                <ul className="grid gap-2.5">
                  {p.highlights.map((h) => (
                    <li key={h} className="flex gap-3 text-[15px] text-white/80">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />{h}
                    </li>
                  ))}
                </ul>
              </div>
              {p.technologies.length > 0 && (
                <div>
                  <h4 className="eyebrow mb-4">Tecnologias</h4>
                  <ul className="flex flex-wrap gap-2">
                    {p.technologies.map((t) => (
                      <li key={t} className="rounded-full border border-line bg-white/[0.03] px-3 py-1.5 text-[13px] text-white/80">{t}</li>
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

export function Portfolio() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const close = useCallback(() => setOpenIdx(null), []);
  const step = useCallback((d: number) => setOpenIdx((i) => (i === null ? i : (i + d + projects.length) % projects.length)), []);

  return (
    <section id="projetos" className="relative py-28 sm:py-36">
      <div className="container-x">
        <SectionHeading
          index="01"
          eyebrow="Portfólio"
          title={<>Projetos que <Em>impressionam</Em></>}
          text="Sites reais e demonstrações criados pela MAREME Digital — cada um pensado do zero para a marca, o público e o objetivo do negócio."
        />
        <div className="grid gap-5 md:grid-cols-2 md:gap-6">
          {projects.map((p, i) => (
            <ProjectCard
              key={p.slug}
              p={p}
              index={i}
              featured={i === 0 || (i === projects.length - 1 && (projects.length - 1) % 2 === 1)}
              onOpen={() => setOpenIdx(i)}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {openIdx !== null && <ProjectModal key="modal" p={projects[openIdx]} onClose={close} onStep={step} />}
      </AnimatePresence>
    </section>
  );
}

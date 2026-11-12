"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { projects } from "@/data/projects";
import { LogoMark } from "../Logo";
import { spring } from "@/lib/springs";

/**
 * Pilha de avisos "site publicado" com os projetos reais.
 * A cada poucos segundos um novo aviso chega no topo (mola com leve impulso), os outros
 * descem com `layout` e o último sai esmaecendo. Pausa ao passar o mouse e com movimento reduzido.
 */
export function LiveFeed({ count = 4, className = "", compact = false }: { count?: number; className?: string; compact?: boolean }) {
  const reduce = useReducedMotion();
  const [start, setStart] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reduce || paused) return;
    const t = window.setInterval(() => setStart((s) => (s - 1 + projects.length) % projects.length), 3200);
    return () => window.clearInterval(t);
  }, [reduce, paused]);

  const items = Array.from({ length: count }, (_, i) => projects[(start + i) % projects.length]);

  return (
    <ul
      className={`grid gap-2.5 ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <AnimatePresence initial={false} mode="popLayout">
        {items.map((p, i) => (
          <motion.li
            key={p.slug}
            layout
            initial={{ opacity: 0, y: -18, scale: 0.94, filter: "blur(6px)" }}
            animate={{ opacity: 1 - i * (compact ? 0.22 : 0.17), y: 0, scale: 1 - i * 0.015, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.92, filter: "blur(6px)", transition: spring.ui }}
            transition={{ ...spring.arrive, layout: spring.ui, opacity: spring.ui }}
            style={{ transformOrigin: "50% 0%" }}
            className={`flex items-center gap-3 rounded-[8px] bg-[#0a1300]/80 shadow-[0_20px_40px_-20px_rgb(0_0_0/0.9)] backdrop-blur-xl ${compact ? "p-3" : "p-3.5"} ${!compact && i % 2 ? "ml-7 -mr-7" : ""}`}
          >
            <LogoMark className={compact ? "h-9 w-9 shrink-0" : "h-10 w-10 shrink-0"} />
            <div className="min-w-0 flex-1">
              <p className="flex items-center justify-between gap-3 text-[13px] font-semibold text-paper">
                <span className="truncate">{p.name}</span>
                <span className="inline-flex shrink-0 items-center gap-1.5 text-[11px] font-normal text-paper/50"><i className="h-1.5 w-1.5 rounded-full bg-lime" aria-hidden="true" />no ar</span>
              </p>
              <p className="truncate text-[12.5px] text-paper/60">Site publicado · {p.segment}</p>
            </div>
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  );
}

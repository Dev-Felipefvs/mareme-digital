"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { contactLink } from "@/data/site";
import { spring } from "@/lib/springs";

export const WA_MSG = "Olá, Emerson! Vim pelo site da MAREME e quero um site para a minha empresa.";

/**
 * Botão principal: bloco lima, caixa alta, leva ao WhatsApp.
 * Resposta imediata ao apertar (no pointer-down) e molas interrompíveis no hover.
 */
export function CtaButton({ children, className = "", message = WA_MSG }: { children: ReactNode; className?: string; message?: string }) {
  return (
    <motion.a
      href={contactLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97, y: 0, transition: spring.press }}
      transition={spring.ui}
      className={`group relative inline-flex h-[58px] items-center justify-center gap-3 overflow-hidden rounded-[3px] bg-degrade px-10 font-display text-[15px] font-extrabold uppercase tracking-[0.02em] text-ink [@media(hover:hover)]:hover:brightness-105 ${className}`}
    >
      {/* Brilho que atravessa o botão no hover */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/60 to-transparent opacity-0 transition-[transform,opacity] duration-700 ease-out group-hover:translate-x-[420%] group-hover:opacity-100 motion-reduce:hidden"
      />
      <span className="relative">{children}</span>
      <svg viewBox="0 0 24 24" className="relative h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
        <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </motion.a>
  );
}

/** Destaque em verde-lima dentro de títulos e textos. */
export function Hi({ children }: { children: ReactNode }) {
  return <span className="text-lime">{children}</span>;
}

/** Converte **trecho** em destaque lima. */
export function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split("**").map((part, i) => (i % 2 ? <Hi key={i}>{part}</Hi> : <span key={i}>{part}</span>))}
    </>
  );
}

export function IconCheck({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
      <path d="M5 12.5l4.5 4.5L19 7.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

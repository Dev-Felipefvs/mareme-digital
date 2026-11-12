import type { ReactNode } from "react";
import { contactLink } from "@/data/site";

export const WA_MSG = "Olá, Emerson! Vim pelo site da MAREME e quero um site para a minha empresa.";

/** Botão principal da página: bloco lima, caixa alta, leva ao WhatsApp. */
export function CtaButton({ children, className = "", message = WA_MSG }: { children: ReactNode; className?: string; message?: string }) {
  return (
    <a
      href={contactLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative inline-flex h-[60px] items-center justify-center gap-3 overflow-hidden rounded-[6px] bg-gradient-to-b from-[#d6fb92] to-lime px-10 font-display text-[15px] font-extrabold uppercase tracking-[0.04em] text-ink shadow-[0_18px_50px_-14px_rgb(197_242_119/0.55)] transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_22px_60px_-12px_rgb(197_242_119/0.75)] active:translate-y-0 ${className}`}
    >
      <span className="relative">{children}</span>
      <svg viewBox="0 0 24 24" className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
        <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </a>
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

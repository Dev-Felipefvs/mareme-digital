"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useRef, type ReactNode, type MouseEvent } from "react";

type Props = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
  external?: boolean;
  cursor?: string;
  /** "light" = para fundos claros */
  tone?: "dark" | "light";
};

/** Botão com efeito magnético sutil (somente mouse). */
export function MagneticButton({ href, children, variant = "primary", className = "", external, cursor, tone = "dark" }: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 18, mass: 0.4 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 18, mass: 0.4 });

  const onMove = (e: MouseEvent<HTMLAnchorElement>) => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const r = ref.current!.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.25);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.35);
  };
  const reset = () => { x.set(0); y.set(0); };

  const base =
    "group relative inline-flex h-14 items-center justify-center gap-3 overflow-hidden rounded-full px-8 text-[15px] font-medium tracking-tight transition-colors duration-300";
  const styles =
    tone === "light"
      ? variant === "primary"
        ? "bg-ink text-white hover:text-ink"
        : "border border-ink/15 text-ink hover:border-ink/40"
      : variant === "primary"
        ? "bg-white text-ink hover:text-ink"
        : "border border-white/15 text-white hover:border-white/40";

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ x, y }}
      className={`${base} ${styles} ${className}`}
      data-cursor={cursor}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {variant === "primary" && (
        <span
          aria-hidden="true"
          className="absolute inset-0 -z-0 translate-y-full rounded-full bg-accent transition-transform duration-500 ease-out-expo group-hover:translate-y-0"
        />
      )}
      <span className="relative z-10 inline-flex items-center gap-3">{children}</span>
    </motion.a>
  );
}

export function ArrowIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ArrowUpRight({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M7 17L17 7M8 7h9v9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

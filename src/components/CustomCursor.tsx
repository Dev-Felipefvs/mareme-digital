"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Cursor personalizado — ativo apenas em dispositivos com mouse (pointer: fine)
 * e sem preferência por movimento reduzido.
 * Elementos com data-cursor="Texto" mostram um rótulo dentro do anel.
 */
export function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)");
    if (!mq.matches) return;
    setEnabled(true);
    document.documentElement.classList.add("has-cursor");

    let x = window.innerWidth / 2, y = window.innerHeight / 2;
    let rx = x, ry = y, raf = 0, visible = false;

    const move = (e: PointerEvent) => {
      x = e.clientX; y = e.clientY;
      if (!visible) { visible = true; rx = x; ry = y; ring.current?.classList.remove("opacity-0"); dot.current?.classList.remove("opacity-0"); }
      const target = (e.target as HTMLElement | null)?.closest<HTMLElement>("a, button, [data-cursor], input, textarea, select, label");
      const text = target?.dataset.cursor ?? "";
      setLabel(text);
      ring.current?.classList.toggle("is-hover", !!target && !text);
      ring.current?.classList.toggle("is-label", !!text);
    };
    const leave = () => { visible = false; ring.current?.classList.add("opacity-0"); dot.current?.classList.add("opacity-0"); };
    const down = () => ring.current?.classList.add("is-down");
    const up = () => ring.current?.classList.remove("is-down");

    const tick = () => {
      rx += (x - rx) * 0.18; ry += (y - ry) * 0.18;
      if (dot.current) dot.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      if (ring.current) ring.current.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
      document.documentElement.classList.remove("has-cursor");
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div ref={dot} aria-hidden="true" className="pointer-events-none fixed left-0 top-0 z-[90] -ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full bg-white opacity-0 mix-blend-difference" />
      <div ref={ring} aria-hidden="true" className="cursor-ring pointer-events-none fixed left-0 top-0 z-[89] opacity-0">
        <span className="cursor-ring__inner">{label && <span className="cursor-ring__label">{label}</span>}</span>
      </div>
      <style>{`
        .cursor-ring__inner { position: absolute; left: 0; top: 0; width: 38px; height: 38px; margin: -19px 0 0 -19px; border-radius: 999px;
          border: 1px solid rgb(250 250 247 / .35); display: grid; place-items: center;
          transition: width .45s cubic-bezier(.16,1,.3,1), height .45s cubic-bezier(.16,1,.3,1), margin .45s cubic-bezier(.16,1,.3,1), background-color .3s, border-color .3s; }
        .cursor-ring.is-hover .cursor-ring__inner { width: 58px; height: 58px; margin: -29px 0 0 -29px; border-color: rgb(197 242 119 / .9); background: rgb(197 242 119 / .08); }
        .cursor-ring.is-label .cursor-ring__inner { width: 96px; height: 96px; margin: -48px 0 0 -48px; border-color: transparent;
          background: #c5f277; }
        .cursor-ring.is-down .cursor-ring__inner { transform: scale(.85); }
        .cursor-ring__label { font-size: 11px; font-weight: 600; letter-spacing: .14em; text-transform: uppercase; color: #101010; }
      `}</style>
    </>
  );
}

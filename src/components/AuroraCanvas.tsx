"use client";

import { useEffect, useRef } from "react";

/**
 * Fundo cinematográfico do hero: auroras azul/roxo + plano de pontos em onda (perspectiva).
 * Canvas 2D leve — pausa fora da tela, em abas ocultas e respeita movimento reduzido.
 */
export function AuroraCanvas({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d", { alpha: false })!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0, h = 0, dpr = 1, raf = 0, running = true, t = 0;
    let mx = 0, my = 0, tmx = 0, tmy = 0;

    const blobs = [
      { x: 0.78, y: 0.28, r: 0.55, c: [0, 140, 255], sx: 0.13, sy: 0.17, p: 0 },
      { x: 0.62, y: 0.62, r: 0.5, c: [160, 32, 240], sx: 0.11, sy: 0.09, p: 2 },
      { x: 0.18, y: 0.15, r: 0.38, c: [70, 60, 255], sx: 0.08, sy: 0.12, p: 4 },
    ];

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.6);
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      mx += (tmx - mx) * 0.04; my += (tmy - my) * 0.04;
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = "#080810";
      ctx.fillRect(0, 0, w, h);

      // Auroras
      ctx.globalCompositeOperation = "lighter";
      const s = Math.max(w, h);
      for (const b of blobs) {
        const bx = (b.x + Math.sin(t * b.sx + b.p) * 0.08) * w + mx * 30;
        const by = (b.y + Math.cos(t * b.sy + b.p) * 0.07) * h + my * 20;
        const g = ctx.createRadialGradient(bx, by, 0, bx, by, b.r * s);
        g.addColorStop(0, `rgba(${b.c[0]},${b.c[1]},${b.c[2]},0.34)`);
        g.addColorStop(0.45, `rgba(${b.c[0]},${b.c[1]},${b.c[2]},0.09)`);
        g.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, w, h);
      }

      // Plano de pontos em onda
      ctx.globalCompositeOperation = "source-over";
      const cols = w < 700 ? 34 : 56, rows = 26;
      const horizon = h * 0.52, fov = h * 0.9, camY = 1.4;
      const spread = w < 700 ? 0.34 : 0.22;
      for (let z = rows; z >= 1; z--) {
        const depth = z * 0.55 + 1.2;
        const scale = fov / depth;
        const alpha = Math.max(0, 1 - z / rows) * 0.75;
        for (let i = 0; i < cols; i++) {
          const xw = (i - cols / 2) * spread;
          const wave = Math.sin(xw * 1.1 + t * 0.9 + z * 0.35) * 0.18 + Math.cos(z * 0.5 - t * 0.6) * 0.12;
          const px = w / 2 + (xw + mx * 0.4) * scale;
          const py = horizon + (camY - wave) * scale * 0.42 + my * 6;
          if (px < -10 || px > w + 10 || py > h + 10) continue;
          const mix = i / cols;
          const r = Math.round(0 + 160 * mix), gch = Math.round(140 - 108 * mix), bch = Math.round(255 - 15 * mix);
          ctx.fillStyle = `rgba(${r},${gch},${bch},${alpha})`;
          const size = Math.max(0.6, scale * 0.012);
          ctx.fillRect(px, py, size, size);
        }
      }

      // Vinheta
      const v = ctx.createLinearGradient(0, h * 0.55, 0, h);
      v.addColorStop(0, "rgba(8,8,16,0)");
      v.addColorStop(1, "rgba(8,8,16,1)");
      ctx.fillStyle = v;
      ctx.fillRect(0, h * 0.55, w, h * 0.45);
    };

    const loop = () => {
      if (!running) return;
      t += 0.012;
      draw();
      raf = requestAnimationFrame(loop);
    };

    const onMove = (e: PointerEvent) => {
      tmx = (e.clientX / window.innerWidth - 0.5) * 2;
      tmy = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    resize();
    draw();
    if (reduce) return;

    let inView = true;
    const sync = () => {
      const vis = inView && document.visibilityState === "visible";
      if (vis && !running) { running = true; loop(); }
      if (!vis && running) { running = false; cancelAnimationFrame(raf); }
    };
    const io = new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; sync(); });
    io.observe(canvas);
    const onVis = () => sync();
    const ro = new ResizeObserver(() => { resize(); draw(); });
    ro.observe(canvas);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("visibilitychange", onVis);
    loop();

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className={`block h-full w-full ${className}`} />;
}

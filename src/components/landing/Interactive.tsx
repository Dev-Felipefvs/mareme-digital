"use client";

import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { useEffect, useRef, useState, type ReactNode, type PointerEvent } from "react";
import { PhoneMockup } from "../DeviceMockup";
import type { Project } from "@/data/projects";
import { followSpring, spring } from "@/lib/springs";

function useFinePointer() {
  const [fine, setFine] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const on = () => setFine(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return fine;
}

/**
 * Três celulares: os de trás se abrem em leque conforme a seção entra na tela (ligado à rolagem, com mola),
 * e o da frente pode ser arrastado no desktop — segue o ponteiro 1:1, resiste nas bordas (rubber band)
 * e volta para o lugar herdando a velocidade do gesto.
 */
export function PhoneStack({ front, left, right }: { front: Project; left: Project; right: Project }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const fine = useFinePointer();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const p = useSpring(scrollYProgress, followSpring);
  const lx = useTransform(p, [0, 1], ["22%", "0%"]);
  const rx = useTransform(p, [0, 1], ["-22%", "0%"]);
  const lr = useTransform(p, [0, 1], [-2, -11]);
  const rr = useTransform(p, [0, 1], [2, 10]);
  const fy = useTransform(p, [0, 1], [40, 0]);

  return (
    <div ref={ref} className="relative mx-auto h-[420px] w-full max-w-[460px] sm:h-[540px] lg:col-span-5 lg:mx-0">
      <motion.div className="absolute left-0 top-[10%] w-[38%] opacity-50 blur-[1.5px]" style={reduce ? { rotate: -11 } : { x: lx, rotate: lr }}>
        <PhoneMockup src={left.mobile} alt="" />
      </motion.div>
      <motion.div className="absolute right-0 top-[14%] w-[38%] opacity-50 blur-[1.5px]" style={reduce ? { rotate: 10 } : { x: rx, rotate: rr }}>
        <PhoneMockup src={right.mobile} alt="" />
      </motion.div>
      <div className="absolute left-1/2 top-0 w-[50%] -translate-x-1/2">
        <motion.div style={reduce ? { rotate: -4 } : { y: fy, rotate: -4 }}>
        <motion.div
          drag={fine && !reduce}
          dragSnapToOrigin
          dragElastic={0.22}
          dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
          dragTransition={{ bounceStiffness: 260, bounceDamping: 22 }}
          whileDrag={{ scale: 1.04, rotate: 4, cursor: "grabbing" }}
          whileHover={fine ? { scale: 1.015 } : undefined}
          transition={spring.ui}
          className={`drop-shadow-[0_0_70px_rgb(0_177_1/0.45)] ${fine ? "cursor-grab touch-none" : ""}`}
        >
          <PhoneMockup src={front.mobile} alt={`Versão para celular do site ${front.name}`} />
        </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

/** Linha conectora que se desenha (clip) quando entra na tela. */
export function Connector({ className, from }: { className: string; from: "left" | "right" }) {
  const reduce = useReducedMotion();
  const hidden = from === "left" ? "inset(0 100% 100% 0)" : "inset(0 0 100% 100%)";
  return (
    <motion.div
      className={className}
      initial={reduce ? { opacity: 0 } : { clipPath: hidden }}
      whileInView={reduce ? { opacity: 1 } : { clipPath: "inset(0 0% 0% 0%)" }}
      viewport={{ once: true, margin: "0px 0px -20% 0px" }}
      transition={{ type: "spring", bounce: 0, visualDuration: 1.1 }}
    />
  );
}

/**
 * Cartão que inclina levemente na direção do ponteiro (molas X/Y independentes)
 * e afunda no toque. Sem inclinação em touch e com movimento reduzido.
 */
export function TiltCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  const fine = useFinePointer();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-6, 6]), followSpring);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [5, -5]), followSpring);
  const active = fine && !reduce;

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!active) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const reset = () => { mx.set(0); my.set(0); };

  return (
    <div className="[perspective:900px]">
      <motion.div
        onPointerMove={onMove}
        onPointerLeave={reset}
        style={active ? { rotateX, rotateY, transformStyle: "preserve-3d" } : undefined}
        whileHover={active ? { y: -4 } : undefined}
        whileTap={{ scale: 0.98, transition: spring.press }}
        transition={spring.ui}
        className={className}
      >
        {children}
      </motion.div>
    </div>
  );
}

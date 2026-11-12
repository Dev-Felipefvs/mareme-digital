"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "motion/react";
import { spring } from "@/lib/springs";

type Props = HTMLMotionProps<"div"> & { delay?: number; y?: number };

/**
 * Entrada ao rolar: o conteúdo "materializa" (desfoque + opacidade + subida) com mola sem overshoot.
 * Com movimento reduzido, vira um fade simples.
 */
export function Reveal({ delay = 0, y = 28, children, ...rest }: Props) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? { opacity: 0 } : { opacity: 0, y, filter: "blur(8px)" }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={reduce ? { duration: 0.25, delay } : { ...spring.reveal, delay, filter: { duration: 0.5, delay } }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

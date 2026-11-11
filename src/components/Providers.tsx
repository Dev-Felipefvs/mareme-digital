"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/** Respeita automaticamente a preferência do sistema por movimento reduzido. */
export function Providers({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { LogoMark } from "./Logo";

export const INTRO_EVENT = "mareme:intro-done";

function finishIntro() {
  document.documentElement.dataset.intro = "done";
  window.dispatchEvent(new Event(INTRO_EVENT));
}

/**
 * Abertura com animação da logomarca — exibida uma vez por sessão.
 * Visitantes com movimento reduzido (ou que já viram) pulam direto para o conteúdo
 * graças ao script inline em layout.tsx, que adiciona a classe `intro-skip`.
 */
export function Preloader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const skip = document.documentElement.classList.contains("intro-skip");
    if (skip) {
      setVisible(false);
      finishIntro();
      return;
    }
    try { sessionStorage.setItem("mareme-intro", "1"); } catch { /* sem storage */ }
    const t = window.setTimeout(() => {
      setVisible(false);
      finishIntro();
    }, 1650);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          className="preloader fixed inset-0 z-[100] grid place-items-center bg-ink"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          initial={{ clipPath: "inset(0 0 0% 0)" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          aria-hidden="true"
        >
          <div className="flex flex-col items-center gap-6">
            <LogoMark className="h-16 w-16" animated />
            <motion.div
              className="flex overflow-hidden text-sm font-medium tracking-[0.5em] text-white/80"
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.05, delayChildren: 0.5 } } }}
            >
              {"MAREME DIGITAL".split("").map((c, i) => (
                <motion.span
                  key={i}
                  variants={{ hidden: { y: "110%", opacity: 0 }, show: { y: "0%", opacity: 1 } }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="inline-block"
                >
                  {c === " " ? " " : c}
                </motion.span>
              ))}
            </motion.div>
            <div className="h-px w-40 overflow-hidden bg-white/10">
              <motion.div
                className="h-full bg-accent"
                initial={{ x: "-100%" }}
                animate={{ x: "0%" }}
                transition={{ duration: 1.4, ease: [0.65, 0, 0.35, 1] }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

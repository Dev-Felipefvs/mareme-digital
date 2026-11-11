import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

type Props = { index: string; eyebrow: string; title: ReactNode; text?: ReactNode; align?: "left" | "split" };

/** Cabeçalho padrão das seções: número + rótulo + título grande. */
export function SectionHeading({ index, eyebrow, title, text, align = "split" }: Props) {
  return (
    <div className={`mb-14 grid gap-8 md:mb-20 ${align === "split" ? "md:grid-cols-[1.3fr_1fr] md:items-end" : ""}`}>
      <div>
        <Reveal>
          <p className="eyebrow mb-6">
            <span className="font-serif text-base italic tracking-normal text-white/80">{index}</span>
            <span className="h-px w-8 bg-white/20" />
            {eyebrow}
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="text-[clamp(38px,5.6vw,84px)] font-medium leading-[0.98] tracking-[-0.04em]">{title}</h2>
        </Reveal>
      </div>
      {text && (
        <Reveal delay={0.16}>
          <p className="max-w-md text-[17px] leading-relaxed text-mist md:justify-self-end">{text}</p>
        </Reveal>
      )}
    </div>
  );
}

export function Em({ children }: { children: ReactNode }) {
  return <em className="text-gradient pr-[0.05em] font-serif font-normal italic tracking-[-0.01em]">{children}</em>;
}

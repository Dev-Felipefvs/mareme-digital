import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

type Props = { title: ReactNode; text?: ReactNode; id?: string };

/** Cabeçalho das seções: título forte + apoio opcional à direita. */
export function SectionHeading({ title, text, id }: Props) {
  return (
    <div className="mb-14 grid gap-6 md:mb-20 md:grid-cols-12 md:items-end">
      <Reveal className="md:col-span-7">
        <h2 id={id} className="text-balance text-[clamp(36px,4.8vw,68px)] font-semibold leading-[1] tracking-[-0.04em]">{title}</h2>
      </Reveal>
      {text && (
        <Reveal delay={0.08} className="md:col-span-4 md:col-start-9">
          <p className="max-w-md text-[17px] leading-relaxed text-mist">{text}</p>
        </Reveal>
      )}
    </div>
  );
}

/** Segunda parte do título em tom mais baixo (ênfase por contraste, não por cor). */
export function Em({ children }: { children: ReactNode }) {
  return <span className="text-paper/40">{children}</span>;
}

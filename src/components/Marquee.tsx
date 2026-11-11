const ITEMS = ["Sites institucionais", "Landing pages", "Portfólios", "Cardápios digitais", "Design responsivo", "Integrações", "Manutenção"];

/** Faixa infinita com os serviços. */
export function Marquee() {
  const row = [...ITEMS, ...ITEMS];
  return (
    <div className="relative overflow-hidden border-y border-line py-7" aria-hidden="true">
      <div className="flex w-max animate-marquee items-center gap-10 motion-reduce:animate-none">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-10 whitespace-nowrap text-[clamp(26px,3.4vw,46px)] font-medium tracking-tight text-white/85">
            {i % 2 ? <span className="font-serif italic text-white/60">{t}</span> : t}
            <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-lime" />
          </span>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-ink to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-ink to-transparent" />
    </div>
  );
}

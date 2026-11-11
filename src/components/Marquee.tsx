const ITEMS = ["Sites institucionais", "Landing pages", "Portfólios", "Cardápios digitais", "Design responsivo", "Integrações", "Manutenção"];

/** Faixa infinita com os serviços. */
export function Marquee() {
  const row = [...ITEMS, ...ITEMS];
  return (
    <div className="relative overflow-hidden border-y border-line py-7" aria-hidden="true">
      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient id="mq-grad" x1="0" x2="1"><stop offset="0" stopColor="#008CFF" /><stop offset="1" stopColor="#A020F0" /></linearGradient>
        </defs>
      </svg>
      <div className="flex w-max animate-marquee items-center gap-10 motion-reduce:animate-none">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-10 whitespace-nowrap text-[clamp(26px,3.4vw,46px)] font-medium tracking-tight text-white/85">
            {i % 2 ? <span className="font-serif italic text-white/60">{t}</span> : t}
            <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" fill="url(#mq-grad)">
              <path d="M12 0l2.6 9.4L24 12l-9.4 2.6L12 24l-2.6-9.4L0 12l9.4-2.6z" />
            </svg>
          </span>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-ink to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-ink to-transparent" />
    </div>
  );
}

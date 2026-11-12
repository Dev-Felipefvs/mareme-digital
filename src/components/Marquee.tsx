const ITEMS = ["Sites institucionais", "Landing pages", "Portfólios", "Design responsivo", "Integrações", "Manutenção"];

/** Faixa contínua com os serviços. */
export function Marquee() {
  const row = [...ITEMS, ...ITEMS];
  return (
    <div className="relative overflow-hidden border-b border-line py-6" aria-hidden="true">
      <div className="flex w-max animate-marquee items-center gap-16 motion-reduce:animate-none">
        {row.map((t, i) => (
          <span key={i} className="whitespace-nowrap text-[clamp(20px,2.2vw,30px)] font-medium tracking-[-0.02em] text-paper/55">
            {t}
          </span>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-ink to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-ink to-transparent" />
    </div>
  );
}

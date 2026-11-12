/**
 * Logomarca tipográfica provisória da MAREME Digital.
 * Quando houver a logomarca original, substitua o SVG/texto abaixo.
 */
type Props = { className?: string; animated?: boolean; compact?: boolean };

export function LogoMark({ className = "", animated = false }: { className?: string; animated?: boolean }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <rect x="1" y="1" width="62" height="62" rx="17" fill="#101010" stroke="rgb(250 250 247 / .14)" />
      <path
        d="M15 45V20l17 16 17-16v25"
        fill="none"
        stroke="var(--color-lime)"
        strokeWidth="5.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength={1}
        className={animated ? "logo-draw" : undefined}
      />
      <style>{`
        .logo-draw { stroke-dasharray: 1; stroke-dashoffset: 1; animation: logo-draw 1.4s cubic-bezier(.65,0,.35,1) .15s forwards; }
        @keyframes logo-draw { to { stroke-dashoffset: 0; } }
        @media (prefers-reduced-motion: reduce) { .logo-draw { stroke-dashoffset: 0; animation: none; } }
      `}</style>
    </svg>
  );
}

export function Logo({ className = "", animated = false, compact = false }: Props) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <LogoMark className="h-9 w-9 shrink-0" animated={animated} />
      {!compact && (
        <span className="flex flex-col leading-none">
          <span className="text-[17px] font-semibold tracking-[0.22em]">MAREME</span>
          <span className="mt-1 text-[9.5px] font-medium tracking-[0.5em] text-mist">DIGITAL</span>
        </span>
      )}
    </span>
  );
}

import { nav, site, contactLink, contactChannel } from "@/data/site";
import { Logo } from "./Logo";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden border-t border-line pt-20">
      <div className="container-x">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-6 max-w-xs text-[15px] leading-relaxed text-mist">
              Experiências digitais que valorizam negócios e transformam a presença online em vantagem competitiva.
            </p>
          </div>
          <nav aria-label="Rodapé">
            <h2 className="mb-5 text-[14px] font-medium text-paper">Navegação</h2>
            <ul className="grid gap-3 text-[15px]">
              {nav.map((n) => (
                <li key={n.href}><a href={n.href} className="text-mist transition-colors hover:text-paper">{n.label}</a></li>
              ))}
            </ul>
          </nav>
          <div>
            <h2 className="mb-5 text-[14px] font-medium text-paper">Contato</h2>
            <ul className="grid gap-3 text-[15px]">
              <li><a href={contactLink()} target="_blank" rel="noopener noreferrer" className="text-mist transition-colors hover:text-paper">{contactChannel}</a></li>
              {site.email && <li><a href={`mailto:${site.email}`} className="text-mist transition-colors hover:text-paper">{site.email}</a></li>}
              <li><a href="#contato" className="text-mist transition-colors hover:text-paper">Solicitar orçamento</a></li>
            </ul>
          </div>
          <div>
            <h2 className="mb-5 text-[14px] font-medium text-paper">Redes</h2>
            <ul className="grid gap-3 text-[15px]">
              <li><a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className="text-mist transition-colors hover:text-paper">Instagram · {site.instagram.handle}</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div aria-hidden="true" className="pointer-events-none mt-16 select-none overflow-hidden">
        <p className="-translate-x-[0.03em] whitespace-nowrap text-center text-[22vw] font-semibold leading-[0.8] tracking-[-0.06em] text-graphite">MAREME</p>
      </div>

      <div className="container-x relative -mt-[5vw]"><div className="flex flex-col items-start justify-between gap-3 border-t border-line py-7 text-[13px] text-mist sm:flex-row sm:items-center">
        <p>© {year} MAREME Digital. Todos os direitos reservados.</p>
        <a href="#inicio" className="transition-colors hover:text-paper">Voltar ao topo</a>
      </div></div>

    </footer>
  );
}

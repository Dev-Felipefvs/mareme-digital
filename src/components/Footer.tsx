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
            <h2 className="eyebrow mb-5">Navegação</h2>
            <ul className="grid gap-3 text-[15px]">
              {nav.map((n) => (
                <li key={n.href}><a href={n.href} className="text-white/75 transition-colors hover:text-white">{n.label}</a></li>
              ))}
            </ul>
          </nav>
          <div>
            <h2 className="eyebrow mb-5">Contato</h2>
            <ul className="grid gap-3 text-[15px]">
              <li><a href={contactLink()} target="_blank" rel="noopener noreferrer" className="text-white/75 hover:text-white">{contactChannel}</a></li>
              {site.email && <li><a href={`mailto:${site.email}`} className="text-white/75 hover:text-white">{site.email}</a></li>}
              <li><a href="#contato" className="text-white/75 hover:text-white">Solicitar orçamento</a></li>
            </ul>
          </div>
          <div>
            <h2 className="eyebrow mb-5">Redes</h2>
            <ul className="grid gap-3 text-[15px]">
              <li><a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className="text-white/75 hover:text-white">Instagram · {site.instagram.handle}</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div aria-hidden="true" className="pointer-events-none mt-16 select-none overflow-hidden">
        <p className="footer-word whitespace-nowrap text-center text-[25vw] font-semibold leading-[0.8] tracking-[-0.06em]">MAREME</p>
      </div>

      <div className="container-x relative -mt-[6vw] flex flex-col items-start justify-between gap-3 border-t border-line py-7 text-[13px] text-mist sm:flex-row sm:items-center">
        <p>© {year} MAREME Digital. Todos os direitos reservados.</p>
        <a href="#inicio" className="hover:text-white">Voltar ao topo ↑</a>
      </div>

      <style>{`
        .footer-word {
          background: linear-gradient(180deg, rgb(250 250 247 / .12), rgb(250 250 247 / 0) 85%);
          -webkit-background-clip: text; background-clip: text; color: transparent;
          -webkit-text-stroke: 1px rgb(250 250 247 / .06);
        }
      `}</style>
    </footer>
  );
}

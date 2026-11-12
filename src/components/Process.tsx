import { SectionHeading } from "./SectionHeading";

const STEPS = [
  { t: "Descoberta", d: "Conversa sobre o seu negócio, público, concorrência e objetivos. Entendemos o que o site precisa resolver." },
  { t: "Estratégia", d: "Definimos estrutura, conteúdo, chamadas para ação e a jornada ideal de quem visita o site." },
  { t: "Design", d: "Criamos a direção de arte e as telas — tipografia, cores, imagens e microinterações com a cara da marca." },
  { t: "Desenvolvimento", d: "Transformamos o design em código rápido, responsivo, acessível e otimizado para o Google." },
  { t: "Publicação", d: "Domínio, hospedagem, testes finais e o site no ar, pronto para receber visitas." },
  { t: "Acompanhamento", d: "Ajustes, atualizações e suporte contínuo para o site evoluir junto com o seu negócio." },
];

export function Process() {
  return (
    <section id="processo" className="relative border-b border-line py-28 sm:py-36">
      <div className="container-x">
        <SectionHeading
          title="Do briefing ao site no ar"
          text="Seis etapas, sempre com você por perto. Antes de fechar, você já vê o site da sua empresa funcionando."
        />
        <ol className="grid border-t border-line sm:grid-cols-2 lg:grid-cols-3">
          {STEPS.map((s, i) => (
            <li
              key={s.t}
              className={`border-b border-line py-10 ${i % 2 === 0 ? "sm:border-r sm:pr-8" : "sm:pl-8"} lg:px-8 ${i % 3 === 0 ? "lg:pl-0" : ""} ${i % 3 === 2 ? "lg:border-r-0 lg:pr-0" : "lg:border-r"} ${i >= 3 ? "lg:border-b-0" : ""}`}
            >
              <span className="tabular font-mono text-[13px] text-mist">{String(i + 1).padStart(2, "0")} / {String(STEPS.length).padStart(2, "0")}</span>
              <h3 className="mt-10 text-[clamp(24px,2.2vw,30px)] font-semibold tracking-[-0.03em]">{s.t}</h3>
              <p className="mt-3 max-w-[40ch] text-[15.5px] leading-relaxed text-mist">{s.d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

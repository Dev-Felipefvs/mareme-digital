/**
 * ============================================================
 *  PORTFÓLIO — adicione, edite ou remova projetos aqui
 * ============================================================
 *  Imagens em /public/images/projetos:
 *   - desktop: captura 1440×900 (também usada como capa)
 *   - mobile:  captura 390×844 em 2x (780×1688)
 *
 *  status:
 *   - "cliente"  → projeto entregue para um cliente
 *   - "conceito" → proposta/demonstração criada pela MAREME
 */

export type Project = {
  slug: string;
  name: string;
  category: string;
  segment: string;
  status: "cliente" | "conceito";
  year: number;
  desktop: string;
  mobile: string;
  description: string;
  highlights: string[];
  technologies: string[];
  url: string;
  /** cor de destaque usada no brilho do card */
  accent: string;
};

export const projects: Project[] = [
  {
    slug: "tania-gusmao",
    name: "Tânia Gusmão Arquitetura",
    category: "Site institucional",
    segment: "Arquitetura",
    status: "conceito",
    year: 2026,
    desktop: "/images/projetos/tania-desktop.jpg",
    mobile: "/images/projetos/tania-mobile.jpg",
    description:
      "Site editorial para escritório de arquitetura em Maceió, com portfólio de projetos em grid assimétrico, filtros por categoria e páginas de detalhe em modal.",
    highlights: ["Portfólio com filtros e modal de detalhes", "Avaliações reais do Google", "Formulário integrado ao WhatsApp"],
    technologies: ["HTML5", "CSS3", "JavaScript", "GitHub Pages"],
    url: "https://taniagusmaoarquitetura.com.br/",
    accent: "#C5B9A7",
  },
  {
    slug: "vitta-odontoclinic",
    name: "Vitta OdontoClínic",
    category: "Redesign de site",
    segment: "Odontologia",
    status: "conceito",
    year: 2026,
    desktop: "/images/projetos/vitta-desktop.jpg",
    mobile: "/images/projetos/vitta-mobile.jpg",
    description:
      "Redesign completo do site de uma clínica odontológica: identidade em tons de creme e dourado, tratamentos em lista interativa e galeria de resultados.",
    highlights: ["Lista interativa de tratamentos", "Carrossel de antes e depois com lightbox", "Galeria da clínica e avaliações do Google"],
    technologies: ["HTML5", "CSS3", "JavaScript", "GitHub Pages"],
    url: "https://dev-felipefvs.github.io/site-vitta-odontoclinic/",
    accent: "#B08A55",
  },
  {
    slug: "rosangela-santos",
    name: "Dra. Rosângela Santos",
    category: "Landing page",
    segment: "Odontologia estética",
    status: "conceito",
    year: 2026,
    desktop: "/images/projetos/rosangela-desktop.jpg",
    mobile: "/images/projetos/rosangela-mobile.jpg",
    description:
      "Landing page para especialista em lentes em resina, com casos reais de antes e depois, jornada do tratamento e dúvidas frequentes.",
    highlights: ["Casos de antes e depois com lightbox", "FAQ com 13 perguntas", "Formulário com escolha do que mudar no sorriso"],
    technologies: ["HTML5", "CSS3", "JavaScript", "GitHub Pages"],
    url: "https://dev-felipefvs.github.io/site-rosangela-lentes-em-resina/",
    accent: "#B87566",
  },
  {
    slug: "anailton-simiao",
    name: "Anailton Simião Arquiteto",
    category: "Site institucional",
    segment: "Arquitetura",
    status: "conceito",
    year: 2026,
    desktop: "/images/projetos/anailton-desktop.jpg",
    mobile: "/images/projetos/anailton-mobile.jpg",
    description:
      "Site para arquiteto residencial com portfólio de sobrados e casas térreas, filtros por tipologia e detalhes de cada projeto.",
    highlights: ["Filtro sobrados / térreas", "Imagens 3D em destaque", "Contato direto pelo WhatsApp"],
    technologies: ["HTML5", "CSS3", "JavaScript", "GitHub Pages"],
    url: "https://dev-felipefvs.github.io/site-anailton-simiao-arquiteto/",
    accent: "#8C7B66",
  },
  {
    slug: "luiz-ribeiro",
    name: "Luiz Ribeiro Corretor",
    category: "Site pessoal",
    segment: "Mercado imobiliário",
    status: "conceito",
    year: 2026,
    desktop: "/images/projetos/luiz-desktop.jpg",
    mobile: "/images/projetos/luiz-mobile.jpg",
    description:
      "Site para corretor de imóveis com galeria de entregas de chaves, serviços, processo de compra e avaliações reais de clientes.",
    highlights: ["Galeria de conquistas com filtros", "Avaliações reais do Google", "Formulário de interesse via WhatsApp"],
    technologies: ["HTML5", "CSS3", "JavaScript", "GitHub Pages"],
    url: "https://dev-felipefvs.github.io/site-luiz-ribeiro-corretor/",
    accent: "#9AA4B5",
  },
  {
    slug: "rafael-barros",
    name: "Rafael Barros Imóveis",
    category: "Site pessoal",
    segment: "Mercado imobiliário",
    status: "conceito",
    year: 2026,
    desktop: "/images/projetos/rafael-desktop.jpg",
    mobile: "/images/projetos/rafael-mobile.jpg",
    description:
      "Site para consultor imobiliário com vitrine de empreendimentos, diferenciais do atendimento e contato rápido.",
    highlights: ["Vitrine de empreendimentos", "Detalhes em modal com galeria", "Mapa e contato integrados"],
    technologies: ["HTML5", "CSS3", "JavaScript", "GitHub Pages"],
    url: "https://dev-felipefvs.github.io/site-rafael-barros-imoveis/",
    accent: "#7AA3C8",
  },
];

export const statusLabel: Record<Project["status"], string> = {
  cliente: "Projeto entregue",
  conceito: "Projeto conceito",
};

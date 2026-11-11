/**
 * ============================================================
 *  CONFIGURAÇÕES GERAIS DO SITE — edite aqui
 * ============================================================
 *  Tudo que aparece como contato, redes e textos do fundador
 *  vem deste arquivo. Campos marcados com "EDITAR" ainda são
 *  placeholders e devem ser preenchidos com seus dados reais.
 */

export const site = {
  name: "MAREME Digital",
  shortName: "MAREME",
  /** URL final do site (usada em SEO, Open Graph e sitemap). */
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://mareme.com.br",
  description:
    "MAREME Digital cria sites institucionais, landing pages e experiências digitais de alto padrão que valorizam negócios e transformam a presença online em vantagem competitiva.",

  instagram: { handle: "@mareme.mkt", url: "https://www.instagram.com/mareme.mkt/" },

  /**
   * EDITAR: WhatsApp com DDI + DDD, só números (ex.: "5582999999999").
   * Enquanto estiver vazio, os botões de contato abrem o Direct do Instagram.
   */
  whatsapp: "5582987797962",

  /** EDITAR: e-mail comercial. Vazio = não aparece no site. */
  email: "",

  /**
   * Endpoint que recebe o formulário (ex.: Formspree, Getform, Basin ou sua API).
   * Configure via variável NEXT_PUBLIC_FORM_ENDPOINT ou direto aqui.
   * Vazio = o formulário envia a mensagem pelo WhatsApp/Instagram.
   */
  formEndpoint: process.env.NEXT_PUBLIC_FORM_ENDPOINT || "",

  /**
   * Textos da seção "Sobre mim". Use **negrito** para destacar trechos.
   * Cada item das listas vira um parágrafo.
   */
  founder: {
    name: "Emerson",
    title: "Prazer, sou Emerson.",
    role: "Desenvolvedor Web e fundador da MAREME Digital.",
    photo: "/images/fundador.webp",
    story: [
      "Minha trajetória no mundo digital começou com a curiosidade de entender como a tecnologia poderia transformar ideias em negócios reais.",
      "Com o tempo, fui me aprofundando no desenvolvimento de sites, explorando ferramentas, estudando novas possibilidades e descobrindo como unir tecnologia, design e estratégia para criar experiências digitais.",
      "Foi dessa visão que nasceu a **MAREME Digital**, um projeto criado com o propósito de ajudar empresas e profissionais a construírem uma presença mais forte e profissional na internet.",
      "Hoje, trabalho no desenvolvimento de sites institucionais, landing pages, portfólios digitais e soluções personalizadas para diferentes tipos de negócios.",
      "Meu objetivo vai além de criar páginas bonitas. Busco desenvolver experiências que valorizem a identidade de cada empresa, transmitam credibilidade e facilitem a conexão com novos clientes.",
      "**Acredito que cada negócio tem uma história única. Meu trabalho é ajudar a contar essa história através do digital.**",
    ],
    skills: [
      "Direção de arte digital",
      "UX/UI design",
      "Desenvolvimento front-end",
      "Sites responsivos",
      "SEO técnico",
      "Performance web",
    ],
    vision: {
      title: "Minha visão de trabalho",
      text: [
        "Acredito que um site vai muito além de uma página na internet. Ele representa a identidade, a credibilidade e o potencial de um negócio.",
        "Minha visão é unir **tecnologia, criatividade e estratégia** para desenvolver experiências digitais que não apenas impressionem visualmente, mas que também tenham propósito e funcionalidade.",
        "Cada projeto é único. Por isso, busco entender a essência de cada marca, suas necessidades e seus objetivos, transformando ideias em soluções modernas, intuitivas e personalizadas.",
        "Na **MAREME Digital**, meu compromisso é entregar mais do que um site: é criar uma presença digital que transmita confiança, valorize cada negócio e abra portas para novas oportunidades.",
        "**Não desenvolvo apenas sites. Desenvolvo experiências que conectam marcas a pessoas.**",
      ],
    },
    relation: {
      title: "A MAREME Digital e eu",
      text: [
        "A **MAREME Digital** nasceu da minha vontade de transformar conhecimento, criatividade e tecnologia em soluções que realmente fazem a diferença para empresas e profissionais.",
        "Mais do que uma agência, a MAREME representa minha visão de futuro, minha dedicação e meu desejo de construir algo próprio, capaz de gerar valor para outras pessoas.",
        "Sou Emerson, fundador da MAREME Digital, e estou diretamente envolvido no desenvolvimento dos projetos, buscando unir design, tecnologia e estratégia para criar experiências digitais modernas e profissionais.",
        "Acredito que cada empresa merece uma presença digital à altura do seu potencial. Por isso, cada projeto é uma oportunidade de transformar ideias em realidade, valorizando a identidade de cada negócio.",
        "**A MAREME Digital não é apenas uma empresa que criei. É a materialização daquilo que acredito: que boas ideias, quando combinadas com tecnologia e dedicação, podem se transformar em grandes oportunidades.**",
      ],
    },
  },
} as const;

export const nav = [
  { href: "#projetos", label: "Projetos" },
  { href: "#sobre", label: "Sobre" },
  { href: "#agencia", label: "Agência" },
  { href: "#servicos", label: "Serviços" },
  { href: "#processo", label: "Processo" },
  { href: "#contato", label: "Contato" },
] as const;

/** Link de contato rápido: WhatsApp quando configurado, senão Direct do Instagram. */
export function contactLink(message?: string) {
  if (site.whatsapp) {
    const text = message ? `?text=${encodeURIComponent(message)}` : "";
    return `https://wa.me/${site.whatsapp}${text}`;
  }
  return "https://ig.me/m/mareme.mkt";
}

export const contactChannel = site.whatsapp ? "WhatsApp" : "Instagram";

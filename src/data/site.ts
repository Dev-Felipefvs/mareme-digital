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
  whatsapp: "",

  /** EDITAR: e-mail comercial. Vazio = não aparece no site. */
  email: "",

  /**
   * Endpoint que recebe o formulário (ex.: Formspree, Getform, Basin ou sua API).
   * Configure via variável NEXT_PUBLIC_FORM_ENDPOINT ou direto aqui.
   * Vazio = o formulário envia a mensagem pelo WhatsApp/Instagram.
   */
  formEndpoint: process.env.NEXT_PUBLIC_FORM_ENDPOINT || "",

  founder: {
    /** EDITAR: seu nome completo */
    name: "Seu Nome",
    role: "Fundador & diretor criativo da MAREME Digital",
    photo: "/images/fundador.webp",
    /** EDITAR: sua trajetória (cada item vira um parágrafo) */
    story: [
      "[Escreva aqui como começou sua trajetória — o que te levou ao design e ao desenvolvimento de sites.]",
      "[Conte o que você faz hoje, os tipos de projeto que mais gosta de criar e o que te diferencia.]",
    ],
    /** Habilidades — ajuste à vontade */
    skills: [
      "Direção de arte digital",
      "UX/UI design",
      "Desenvolvimento front-end",
      "Sites responsivos",
      "SEO técnico",
      "Performance web",
    ],
    /** EDITAR: sua visão de trabalho em uma frase */
    vision:
      "[Sua visão de trabalho em uma frase — por exemplo, o que um site precisa entregar para valer a pena.]",
    /** EDITAR: sua relação com a MAREME Digital */
    relation:
      "[Explique por que você criou a MAREME Digital e como participa de cada projeto.]",
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

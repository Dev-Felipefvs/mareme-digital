// Chatbot de IA da MAREME WEB DESIGNER — Cloudflare Worker
// Recebe { messages: [{role, content}] } do site e devolve { reply, whatsapp }.
// A chave da API fica só aqui (secret ANTHROPIC_API_KEY), nunca no site.
import Anthropic from "@anthropic-ai/sdk";

const ALLOWED_ORIGINS = ["https://mareme.com.br", "https://www.mareme.com.br", "http://localhost:5540"];

// Prompt fixo (fica em cache). Só fatos que estão na página — nada inventado.
const SYSTEM = `Você é o assistente virtual do site da MAREME WEB DESIGNER, de Emerson (desenvolvedor web e fundador, em Maceió, Alagoas). Responda em português do Brasil, com tom simpático, direto e humano, em no máximo 3 frases curtas. Sem markdown, sem listas longas, sem emojis em excesso.

Seu objetivo: tirar dúvidas e levar a pessoa a conversar com o Emerson pelo WhatsApp para solicitar um orçamento.

Use SOMENTE as informações abaixo. Se não souber, diga que o Emerson responde pessoalmente pelo WhatsApp. Nunca invente prazos, preços, descontos, garantias, números de clientes, depoimentos ou resultados. Nunca prometa primeira página do Google nem quantidade de clientes.

FATOS
- Site profissional: R$ 297, pagamento único pelo desenvolvimento no escopo apresentado.
- Inclui: design personalizado; layout para celular, tablet e computador; apresentação da empresa e dos serviços; botões de WhatsApp; localização e atendimento; links para redes sociais; formulário de contato quando previsto; configuração e publicação; domínio incluído no primeiro ano conforme condições; hospedagem incluída conforme condições acordadas.
- Funcionalidades adicionais, integrações complexas e necessidades específicas podem ter orçamento separado. Condições de domínio, hospedagem e renovação são informadas antes da contratação.
- Plano de suporte mensal opcional: R$ 97/mês. Inclui monitoramento do site, suporte para problemas técnicos, atualização de fotos, textos e informações, até 3 pequenas alterações mensais, verificação de links e botões e acompanhamento preventivo. Não inclui novas páginas, reformulações completas, funcionalidades adicionais e serviços de terceiros.
- Prazo: projetos simples podem ser feitos rapidamente; o prazo é confirmado antes do início, conforme as informações recebidas e o escopo.
- Processo: 1) a pessoa conta sobre a empresa; 2) Emerson desenvolve; 3) revisão, ajustes previstos e publicação.
- Não precisa ter fotos e textos prontos: Emerson ajuda a organizar o que a pessoa já tem.
- Alterações: ajustes previstos no escopo na etapa de revisão; mudanças maiores são avaliadas à parte.
- Google: o site pode ser preparado para indexação, mas posição nos resultados não é garantida.
- Atende Maceió e, de forma online, outras cidades.
- Pagamento: condições apresentadas antes da contratação.
- Atendimento direto com o Emerson, sem intermediários.
- O portfólio do site tem projetos conceito (demonstrações), não clientes.

Quando a pessoa demonstrar interesse em contratar, pedir orçamento ou fizer uma pergunta que você não consegue responder com os fatos acima, termine sua resposta exatamente com a marca [WHATSAPP].`;

function cors(origin) {
  return {
    "Access-Control-Allow-Origin": ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0],
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Vary": "Origin",
  };
}

const json = (body, status, headers) =>
  new Response(JSON.stringify(body), { status, headers: { ...headers, "Content-Type": "application/json" } });

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";
    const headers = cors(origin);
    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers });
    if (request.method !== "POST") return json({ error: "method" }, 405, headers);
    if (!ALLOWED_ORIGINS.includes(origin)) return json({ error: "origin" }, 403, headers);

    let body;
    try { body = await request.json(); } catch { return json({ error: "json" }, 400, headers); }

    // Limpa e limita a conversa vinda do navegador
    const messages = (Array.isArray(body?.messages) ? body.messages : [])
      .filter((m) => (m.role === "user" || m.role === "assistant") && typeof m.content === "string" && m.content.trim())
      .slice(-12)
      .map((m) => ({ role: m.role, content: m.content.slice(0, 800) }));
    while (messages.length && messages[0].role !== "user") messages.shift();
    if (!messages.length || messages[messages.length - 1].role !== "user") return json({ error: "messages" }, 400, headers);

    const client = new Anthropic({ apiKey: env.ANTHROPIC_API_KEY });
    try {
      const response = await client.beta.messages.create({
        model: "claude-opus-5-5",
        max_tokens: 2000,
        betas: ["server-side-fallback-2026-07-01"],
        fallbacks: "default",
        output_config: { effort: "low" },
        system: [{ type: "text", text: SYSTEM, cache_control: { type: "ephemeral" } }],
        messages,
      });

      if (response.stop_reason === "refusal") {
        return json({ reply: "Essa eu prefiro que o Emerson responda pessoalmente. Toque no botão abaixo para falar com ele no WhatsApp.", whatsapp: true }, 200, headers);
      }
      let text = response.content.filter((b) => b.type === "text").map((b) => b.text).join("").trim();
      const whatsapp = text.includes("[WHATSAPP]");
      text = text.replace("[WHATSAPP]", "").trim();
      if (!text) return json({ error: "empty" }, 502, headers);
      return json({ reply: text, whatsapp }, 200, headers);
    } catch (error) {
      if (error instanceof Anthropic.RateLimitError) return json({ error: "rate_limit" }, 429, headers);
      if (error instanceof Anthropic.AuthenticationError) return json({ error: "auth" }, 500, headers);
      if (error instanceof Anthropic.APIError) return json({ error: "api", status: error.status }, 502, headers);
      return json({ error: "unknown" }, 500, headers);
    }
  },
};

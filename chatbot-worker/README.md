# Chatbot de IA — MAREME WEB DESIGNER

O site (`/web`) já tem o assistente funcionando **sem IA**, respondendo com as perguntas frequentes da página.
Para ligar a IA (Claude), é preciso este pequeno servidor, que guarda a chave da API em segredo.

## O que você precisa (uma vez)
1. Conta na Anthropic com uma **chave da API** (console.anthropic.com → API Keys) e crédito.
2. Conta gratuita na **Cloudflare** (dash.cloudflare.com).

## Publicar o servidor
```bash
cd chatbot-worker
npm install
npx wrangler login
npx wrangler secret put ANTHROPIC_API_KEY
npx wrangler deploy
```
O último comando mostra um endereço como `https://mareme-chatbot.<sua-conta>.workers.dev`.

## Ligar no site
Em `web/index.html`, troque:
```js
window.MAREME_CHAT_ENDPOINT = window.MAREME_CHAT_ENDPOINT || '';
```
por:
```js
window.MAREME_CHAT_ENDPOINT = 'https://mareme-chatbot.<sua-conta>.workers.dev';
```
O selo do chat muda para "Assistente com IA". Se o servidor falhar, o chat volta sozinho para as respostas do FAQ.

## Segurança e custo
- Só aceita pedidos vindos de `mareme.com.br` (e `localhost:5540` para testes).
- Conversa limitada às 12 últimas mensagens, 800 caracteres cada.
- Modelo: `claude-opus-5-5` com esforço `low` (respostas curtas) e o prompt fixo em cache.
  Fallback automático do servidor ativado para recusas (`fallbacks: "default"`).
- Recomendado: definir um limite de gastos mensal no console da Anthropic.
- O texto que o assistente usa (preços, plano, condições) fica em `src/worker.js` → `SYSTEM`. Se mudar a oferta no site, mude lá também.

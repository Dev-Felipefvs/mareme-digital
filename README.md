# MAREME Digital — site oficial

Landing page premium da MAREME Digital: apresentação da agência, portfólio interativo e captação de clientes.

**Stack:** Next.js 15 (App Router, exportação estática) · React 19 · TypeScript · Tailwind CSS 4 · GSAP + ScrollTrigger · Motion

## Rodar localmente

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # gera a pasta /out (site estático pronto para publicar)
```

## Onde editar

| O quê | Arquivo |
|---|---|
| WhatsApp, e-mail, Instagram, textos do fundador | `src/data/site.ts` |
| Projetos do portfólio | `src/data/projects.ts` |
| Fotos dos projetos (1440×900 e 780×1688) | `public/images/projetos/` |
| Foto do fundador | `public/images/fundador.webp` |
| Imagem de compartilhamento (1200×630) | `public/og.jpg` |
| Cores, fontes e utilitários | `src/app/globals.css` |
| Logomarca (provisória, tipográfica) | `src/components/Logo.tsx` e `src/app/icon.svg` |

Campos marcados com **EDITAR** em `src/data/site.ts` ainda são placeholders.

### Adicionar um projeto
1. Salve as capturas em `public/images/projetos/` (`nome-desktop.jpg` e `nome-mobile.jpg`).
2. Copie um item de `src/data/projects.ts`, ajuste os campos e use `status: "cliente"` para projetos entregues ou `"conceito"` para demonstrações.

### Formulário de contato
- Sem configuração: o formulário monta a mensagem e abre o WhatsApp (ou o Direct do Instagram, enquanto o WhatsApp estiver vazio).
- Com endpoint: defina `NEXT_PUBLIC_FORM_ENDPOINT` (ex.: Formspree `https://formspree.io/f/xxxx`). O site envia `nome`, `empresa`, `whatsapp`, `tipo` e `mensagem` em JSON.

## Publicar

### GitHub Pages
O workflow `.github/workflows/deploy.yml` publica a cada push na `main`.
1. Em **Settings → Pages**, escolha **Source: GitHub Actions**.
2. Domínio próprio (ex.: `mareme.com.br`): adicione o domínio em Settings → Pages e deixe a variável `BASE_PATH` vazia.
3. Sem domínio (`usuario.github.io/repositorio`): crie a variável `BASE_PATH` com `/nome-do-repositorio`.

### Vercel / Netlify
Importe o repositório — comando `npm run build`, pasta de saída `out`.

## Acessibilidade e desempenho
- Respeita `prefers-reduced-motion` (sem abertura, parallax, cursor ou animações de rolagem).
- Cursor personalizado apenas com mouse (`pointer: fine`).
- Canvas do hero pausa fora da tela e em abas ocultas.
- Metadados, Open Graph, JSON-LD, `sitemap.xml` e `robots.txt` gerados no build.

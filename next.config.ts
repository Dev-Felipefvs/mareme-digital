import type { NextConfig } from "next";

/**
 * Exportação estática (pasta /out) — pronta para GitHub Pages, Netlify, Vercel ou qualquer hospedagem.
 * Em domínio próprio (ex.: mareme.com.br) deixe NEXT_PUBLIC_BASE_PATH vazio.
 * Em subpasta do GitHub Pages (ex.: usuario.github.io/mareme-digital) use NEXT_PUBLIC_BASE_PATH=/mareme-digital.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  reactStrictMode: true,
  images: { unoptimized: true },
  poweredByHeader: false,
};

export default nextConfig;

import type { Metadata, Viewport } from "next";
import { Inter_Tight, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { site } from "@/data/site";
import { Providers } from "@/components/Providers";
import { Preloader } from "@/components/Preloader";
import { ScrollProgress } from "@/components/ScrollProgress";
import { CustomCursor } from "@/components/CustomCursor";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const interTight = Inter_Tight({ subsets: ["latin"], variable: "--font-inter-tight", display: "swap" });
const instrument = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-instrument", display: "swap" });

const title = "MAREME Digital — Sites e experiências digitais de alto padrão";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: title, template: "%s · MAREME Digital" },
  description: site.description,
  keywords: ["criação de sites", "site institucional", "landing page", "portfólio", "cardápio digital", "agência digital", "MAREME Digital"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: site.name,
    title,
    description: site.description,
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "MAREME Digital" }],
  },
  twitter: { card: "summary_large_image", title, description: site.description, images: ["/og.jpg"] },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#080810",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.name,
  url: site.url,
  description: site.description,
  sameAs: [site.instagram.url],
  serviceType: ["Criação de sites", "Landing pages", "Portfólios", "Cardápios digitais"],
};

/** Pula a abertura para quem já a viu nesta sessão ou prefere movimento reduzido (evita flash). */
const introScript = `try{if(sessionStorage.getItem('mareme-intro')||/[?&]nointro/.test(location.search)||matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.classList.add('intro-skip')}}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${interTight.variable} ${instrument.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
        <style>{`html.intro-skip .preloader{display:none}`}</style>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        <a href="#conteudo" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-white focus:px-5 focus:py-3 focus:text-ink">
          Pular para o conteúdo
        </a>
        <Providers>
          <Preloader />
          <ScrollProgress />
          <CustomCursor />
          <Header />
          {children}
          <Footer />
        </Providers>
        <div className="grain" aria-hidden="true" />
      </body>
    </html>
  );
}

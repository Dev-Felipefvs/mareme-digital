import Link from "next/link";

export default function NotFound() {
  return (
    <main id="conteudo" className="container-x grid min-h-[80svh] place-content-center text-center">
      <p className="font-mono text-[13px] text-mist">404</p>
      <h1 className="mt-6 text-[clamp(40px,7vw,96px)] font-medium tracking-[-0.04em]">
        Página <span className="text-paper/40">não encontrada</span>
      </h1>
      <Link href="/" className="mx-auto mt-10 inline-flex h-14 items-center rounded-lg bg-lime px-8 font-medium text-ink">
        Voltar ao início
      </Link>
    </main>
  );
}

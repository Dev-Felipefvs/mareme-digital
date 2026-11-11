import Link from "next/link";

export default function NotFound() {
  return (
    <main id="conteudo" className="container-x grid min-h-[80svh] place-content-center text-center">
      <p className="eyebrow justify-center">Erro 404</p>
      <h1 className="mt-6 text-[clamp(40px,7vw,96px)] font-medium tracking-[-0.04em]">
        Página <em className="text-accent font-serif font-normal italic">não encontrada</em>
      </h1>
      <Link href="/" className="mx-auto mt-10 inline-flex h-14 items-center rounded-full bg-white px-8 font-medium text-ink">
        Voltar ao início
      </Link>
    </main>
  );
}

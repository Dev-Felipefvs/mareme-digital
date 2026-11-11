"use client";

import { useState, type FormEvent } from "react";
import { site, contactLink, contactChannel } from "@/data/site";
import { Reveal } from "./Reveal";
import { Em } from "./SectionHeading";
import { ArrowIcon } from "./MagneticButton";

const TYPES = ["Site institucional", "Landing page", "Portfólio", "Cardápio digital", "Outro"];

type Status = { kind: "idle" | "sending" | "ok" | "error"; msg?: string };

function maskPhone(v: string) {
  const d = v.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d;
  if (d.length <= 7) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, d.length - 4)}-${d.slice(-4)}`;
}

export function Contact() {
  const [type, setType] = useState(TYPES[0]);
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const nome = String(data.get("nome") || "").trim();
    const mensagem = String(data.get("mensagem") || "").trim();
    const err = { nome: nome.length < 2, whatsapp: phone.replace(/\D/g, "").length < 10, mensagem: mensagem.length < 5 };
    setErrors(err);
    if (Object.values(err).some(Boolean)) {
      setStatus({ kind: "error", msg: "Preencha nome, WhatsApp e mensagem para continuar." });
      return;
    }
    const payload = { nome, empresa: String(data.get("empresa") || "").trim(), whatsapp: phone, tipo: type, mensagem };

    // 1) Endpoint configurado (Formspree, Getform, API própria…)
    if (site.formEndpoint) {
      setStatus({ kind: "sending" });
      try {
        const res = await fetch(site.formEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error(String(res.status));
        form.reset(); setPhone("");
        setStatus({ kind: "ok", msg: "Mensagem enviada! Retornaremos em breve." });
        return;
      } catch {
        setStatus({ kind: "error", msg: `Não foi possível enviar agora. Tente pelo ${contactChannel}.` });
        return;
      }
    }

    // 2) Sem endpoint: abre a conversa com a mensagem pronta
    const lines = ["Olá! Vim pelo site da MAREME Digital e quero um orçamento.", "", `*Nome:* ${payload.nome}`];
    if (payload.empresa) lines.push(`*Empresa:* ${payload.empresa}`);
    lines.push(`*WhatsApp:* ${payload.whatsapp}`, `*Projeto:* ${payload.tipo}`, "", payload.mensagem);
    const text = lines.join("\n");
    window.open(contactLink(text), "_blank", "noopener");
    setStatus({ kind: "ok", msg: `Abrimos o ${contactChannel} com a sua mensagem pronta para enviar.` });
  }

  const field =
    "w-full rounded-2xl border bg-white/[0.03] px-5 py-4 text-[16px] text-white placeholder:text-white/30 outline-none transition-[border-color,background-color,box-shadow] duration-300 focus:border-lime focus:bg-white/[0.05] focus:shadow-[0_0_0_4px_rgb(197_242_119/0.15)]";
  const ok = (k: string) => (errors[k] ? "border-red-400/70" : "border-line");

  return (
    <section id="contato" className="relative overflow-hidden py-28 sm:py-36">
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-40 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-lime/[0.07] blur-[160px]" />
      <div className="container-x relative grid gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
        <div>
          <Reveal>
            <p className="eyebrow mb-6">
              <span className="font-serif text-base italic tracking-normal text-white/80">06</span>
              <span className="h-px w-8 bg-white/20" />Contato
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="text-[clamp(42px,6.4vw,100px)] font-medium leading-[0.95] tracking-[-0.045em]">
              Vamos criar algo que <Em>impressione?</Em>
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-8 max-w-md text-[17px] leading-relaxed text-mist">
              Conte um pouco sobre o seu projeto. Respondemos com os próximos passos e uma proposta pensada para o seu negócio.
            </p>
          </Reveal>
          <Reveal delay={0.22}>
            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href={contactLink("Olá! Vim pelo site da MAREME Digital e quero um orçamento.")}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex h-14 items-center gap-3 rounded-full px-7 font-medium transition-transform hover:-translate-y-0.5 ${
                  "bg-accent text-ink"
                }`}
              >
                {site.whatsapp ? (
                  <svg viewBox="0 0 32 32" className="h-5 w-5" fill="currentColor" aria-hidden="true"><path d="M16 3C9.4 3 4 8.3 4 14.9c0 2.3.7 4.5 1.8 6.3L4 29l8-1.8c1.3.4 2.6.7 4 .7 6.6 0 12-5.3 12-11.9C28 8.3 22.6 3 16 3Zm5.8 16.9c-.3.7-1.5 1.4-2.1 1.5-.6.1-1.2.1-2-.1-.5-.1-1-.3-1.8-.7-3.2-1.4-5.2-4.6-5.4-4.8-.2-.2-1.3-1.7-1.3-3.2s.8-2.3 1.1-2.6c.3-.3.6-.4.8-.4h.6c.2 0 .5-.1.7.5.3.6.9 2.2 1 2.3.1.2.1.4 0 .6-.1.2-.2.3-.3.5-.2.2-.3.4-.5.6-.2.2-.3.3-.1.6.2.3.8 1.3 1.8 2.2 1.2 1.1 2.2 1.4 2.5 1.6.3.2.5.1.7-.1.2-.2.8-.9 1-1.2.2-.3.4-.3.7-.2.3.1 1.8.9 2.2 1 .3.2.5.2.6.4.1.1.1.8-.2 1.5Z" /></svg>
                ) : (
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" /></svg>
                )}
                {site.whatsapp ? "Falar pelo WhatsApp" : "Chamar no Direct"}
              </a>
              {site.whatsapp && (
                <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className="inline-flex h-14 items-center rounded-full border border-white/15 px-7 hover:border-white/40">
                  {site.instagram.handle}
                </a>
              )}
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <form onSubmit={onSubmit} noValidate className="glass rounded-[30px] border border-line p-6 sm:p-9" aria-describedby="form-status">
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="grid gap-2">
                <span className="text-[13px] font-medium text-white/80">Nome *</span>
                <input name="nome" autoComplete="name" required placeholder="Seu nome" className={`${field} ${ok("nome")}`} aria-invalid={!!errors.nome} />
              </label>
              <label className="grid gap-2">
                <span className="text-[13px] font-medium text-white/80">Empresa</span>
                <input name="empresa" autoComplete="organization" placeholder="Nome do negócio" className={`${field} border-line`} />
              </label>
              <label className="grid gap-2 sm:col-span-2">
                <span className="text-[13px] font-medium text-white/80">WhatsApp *</span>
                <input
                  name="whatsapp"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(maskPhone(e.target.value))}
                  placeholder="(00) 00000-0000"
                  className={`${field} ${ok("whatsapp")}`}
                  aria-invalid={!!errors.whatsapp}
                />
              </label>
            </div>

            <fieldset className="mt-6">
              <legend className="mb-3 text-[13px] font-medium text-white/80">Tipo de projeto</legend>
              <div className="flex flex-wrap gap-2">
                {TYPES.map((t) => (
                  <label key={t} className="cursor-pointer">
                    <input type="radio" name="tipo" value={t} checked={type === t} onChange={() => setType(t)} className="peer sr-only" />
                    <span className="inline-block rounded-full border border-line px-4 py-2.5 text-[14px] text-white/75 transition-all duration-300 peer-checked:border-transparent peer-checked:bg-lime peer-checked:text-ink peer-focus-visible:ring-2 peer-focus-visible:ring-lime">
                      {t}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            <label className="mt-6 grid gap-2">
              <span className="text-[13px] font-medium text-white/80">Mensagem *</span>
              <textarea name="mensagem" rows={4} required placeholder="Conte o que você precisa, prazos e referências que gosta" className={`${field} resize-y ${ok("mensagem")}`} aria-invalid={!!errors.mensagem} />
            </label>

            <button
              type="submit"
              disabled={status.kind === "sending"}
              className="group relative mt-7 inline-flex h-14 w-full items-center justify-center gap-3 overflow-hidden rounded-full bg-white font-medium text-ink transition-colors duration-300 hover:text-ink disabled:opacity-60"
            >
              <span aria-hidden="true" className="bg-accent absolute inset-0 translate-y-full transition-transform duration-500 ease-out-expo group-hover:translate-y-0" />
              <span className="relative inline-flex items-center gap-3">
                {status.kind === "sending" ? "Enviando…" : "Enviar solicitação"} <ArrowIcon />
              </span>
            </button>
            <p id="form-status" role="status" aria-live="polite" className={`mt-4 min-h-[1.25em] text-center text-[14px] ${status.kind === "error" ? "text-red-300" : "text-mist"}`}>
              {status.msg}
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

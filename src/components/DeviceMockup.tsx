import { asset } from "@/lib/asset";

/** Moldura de notebook/navegador com captura desktop. */
export function DesktopMockup({ src, alt, url, className = "" }: { src: string; alt: string; url?: string; className?: string }) {
  const host = url ? url.replace(/^https?:\/\//, "").replace(/\/$/, "") : "";
  return (
    <div className={`overflow-hidden rounded-[14px] border border-white/10 bg-ink-2 shadow-[0_40px_120px_-40px_rgb(0_0_0/0.7)] ${className}`}>
      <div className="flex h-8 items-center gap-2 border-b border-white/[0.06] px-3">
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        {host && (
          <span className="mx-auto max-w-[70%] truncate rounded-md bg-white/[0.05] px-3 py-0.5 text-[10.5px] text-white/45">{host}</span>
        )}
      </div>
      <img src={asset(src)} alt={alt} width={1440} height={900} loading="lazy" decoding="async" className="block aspect-[16/10] w-full object-cover object-top" />
    </div>
  );
}

/** Moldura de smartphone com captura mobile. */
export function PhoneMockup({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return (
    <div className={`relative rounded-[34px] border border-white/15 bg-ink p-[7px] shadow-[0_40px_100px_-30px_rgb(0_0_0/0.7)] ${className}`}>
      <div className="absolute left-1/2 top-[13px] z-10 h-[18px] w-[30%] -translate-x-1/2 rounded-full bg-black" />
      <img src={asset(src)} alt={alt} width={780} height={1688} loading="lazy" decoding="async" className="block aspect-[390/844] w-full rounded-[28px] object-cover object-top" />
    </div>
  );
}

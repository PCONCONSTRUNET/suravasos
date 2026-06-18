import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Circle } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [{ title: "Entrar — SURA ERP" }] }),
  component: Login,
});

function Login() {
  const nav = useNavigate();
  return (
    <div className="min-h-screen grid lg:grid-cols-[1fr_1.1fr] bg-[#f5f3ee]">
      {/* LEFT — editorial form */}
      <div className="relative flex flex-col justify-between px-8 py-10 sm:px-14 lg:px-20 lg:py-14">
        {/* top meta bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <svg viewBox="0 0 32 32" className="h-7 w-7" fill="none">
              <path d="M10 14 C 9 8, 13 6, 13 12 Z" fill="#5a7a3a" />
              <path d="M15 13 C 14.3 7, 19 6, 17.5 12 Z" fill="#5a7a3a" />
              <path d="M19 14.5 C 19.7 9, 23 8.5, 21.5 13.5 Z" fill="#5a7a3a" />
              <path d="M8 17 L23 17 L21 27 L10 27 Z" fill="#a35a2a" />
              <path d="M3 20 Q 13 16, 22 19 T 30 18" stroke="#5a7a3a" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            </svg>
            <div>
              <p className="font-display text-xl leading-none text-[#3a2418] italic">sura<span className="not-italic font-sans font-semibold tracking-widest text-[10px] ml-1 text-[#5a7a3a]">/ERP</span></p>
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#a38b6b] mt-0.5">vasos · floreiras · jardim</p>
            </div>
          </div>
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#a38b6b]">v3.2.0 · BR-SP</span>
        </div>

        {/* form block */}
        <div className="max-w-md">
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#a35a2a] mb-6">
            <span className="inline-block w-6 h-px bg-[#a35a2a] align-middle mr-2" />Acesso operacional
          </p>
          <h1 className="font-display text-[64px] leading-[0.95] tracking-tight text-[#1f2b1a]">
            Bom dia, <span className="italic text-[#5a7a3a]">Marcos.</span>
          </h1>
          <p className="mt-5 text-[15px] leading-relaxed text-[#5a4a3a] max-w-sm">
            Sua operação registrou <span className="font-mono text-[#a35a2a]">42 pedidos</span> nas últimas 12h. Entre para acompanhar.
          </p>

          <form onSubmit={(e) => { e.preventDefault(); nav({ to: "/app/dashboard" }); }} className="mt-10 space-y-5">
            <div>
              <label className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#5a4a3a]">01 · Usuário</label>
              <Input
                defaultValue="marcos@suravasos.com.br"
                className="mt-2 h-12 rounded-none border-0 border-b border-[#3a2418]/30 bg-transparent px-0 text-[15px] font-medium text-[#1f2b1a] focus-visible:ring-0 focus-visible:border-[#5a7a3a] shadow-none"
              />
            </div>
            <div>
              <div className="flex items-end justify-between">
                <label className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#5a4a3a]">02 · Senha</label>
                <a href="#" className="font-mono text-[10px] uppercase tracking-[0.15em] text-[#a35a2a] hover:text-[#3a2418] underline underline-offset-4">recuperar</a>
              </div>
              <Input
                type="password"
                defaultValue="••••••••••••"
                className="mt-2 h-12 rounded-none border-0 border-b border-[#3a2418]/30 bg-transparent px-0 text-[15px] focus-visible:ring-0 focus-visible:border-[#5a7a3a] shadow-none"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <label className="flex items-center gap-2 text-[12px] text-[#5a4a3a]">
                <input type="checkbox" defaultChecked className="h-3.5 w-3.5 accent-[#5a7a3a]" />
                Manter sessão por 30 dias
              </label>
              <span className="font-mono text-[10px] text-[#a38b6b]">↵ enter</span>
            </div>

            <button
              type="submit"
              className="group mt-4 flex w-full items-center justify-between rounded-none border border-[#1f2b1a] bg-[#1f2b1a] px-6 py-4 text-left text-[#f5f3ee] transition-all hover:bg-[#5a7a3a] hover:border-[#5a7a3a]"
            >
              <span className="font-display text-2xl italic">Entrar no sistema</span>
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </button>

            <p className="text-[12px] text-[#5a4a3a]">
              Sem acesso ainda?{" "}
              <Link to="/" className="font-medium text-[#a35a2a] underline underline-offset-4 decoration-[#a35a2a]/40 hover:decoration-[#a35a2a]">Solicitar demonstração →</Link>
            </p>
          </form>
        </div>

        {/* footer */}
        <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-widest text-[#a38b6b]">
          <span>© SURA Vasos · Bauru/SP · CNPJ 12.345.678/0001-99</span>
          <span className="flex items-center gap-1.5">
            <Circle className="h-1.5 w-1.5 fill-[#5a7a3a] text-[#5a7a3a]" /> Todos os sistemas operacionais
          </span>
        </div>

        {/* hairline column */}
        <div className="hidden lg:block absolute right-0 top-0 h-full w-px bg-[#3a2418]/15" />
      </div>

      {/* RIGHT — operations terminal */}
      <div className="relative overflow-hidden bg-[#0e1410] text-[#e8e0d2]">
        {/* grid bg */}
        <div className="absolute inset-0 opacity-[0.06]" style={{
          backgroundImage: "linear-gradient(to right, #e8e0d2 1px, transparent 1px), linear-gradient(to bottom, #e8e0d2 1px, transparent 1px)",
          backgroundSize: "64px 64px"
        }} />
        {/* warm spot */}
        <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full" style={{
          background: "radial-gradient(circle, rgba(163,90,42,0.25), transparent 70%)"
        }} />

        <div className="relative flex h-full flex-col justify-between p-10 lg:p-14">
          {/* top status row */}
          <div className="grid grid-cols-3 gap-px border border-[#e8e0d2]/10 bg-[#e8e0d2]/10">
            {[
              { l: "SEFAZ-SP", v: "Online", ok: true },
              { l: "Backup", v: "03:00 ✓", ok: true },
              { l: "Latência", v: "42 ms", ok: true },
            ].map((s) => (
              <div key={s.l} className="bg-[#0e1410] p-4">
                <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#a38b6b]">{s.l}</p>
                <p className="mt-1 font-mono text-sm flex items-center gap-1.5">
                  <Circle className="h-1.5 w-1.5 fill-[#7fb069] text-[#7fb069]" /> {s.v}
                </p>
              </div>
            ))}
          </div>

          {/* big editorial copy */}
          <div className="max-w-2xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#7fb069] mb-8">
              ⸺ ed. 2026 / capítulo 03
            </p>
            <h2 className="font-display text-[88px] leading-[0.92] tracking-tighter text-[#f5f3ee]">
              Operação<br />
              em <span className="italic text-[#a35a2a]">vinte e três</span><br />
              estados.
            </h2>
            <p className="mt-8 max-w-md text-[15px] leading-relaxed text-[#e8e0d2]/70">
              Um único terminal para estoque, vendas, financeiro, logística e fiscal. Pensado para quem despacha milhares de vasos por mês — não para uma planilha bonita.
            </p>
          </div>

          {/* numbers ledger */}
          <div className="border-t border-[#e8e0d2]/15 pt-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-[#e8e0d2]/10">
              {[
                { k: "FATURAMENTO/MÊS", v: "R$ 386k", d: "+12,4%" },
                { k: "SKUS ATIVOS", v: "184", d: "+6" },
                { k: "ENTREGAS/MÊS", v: "2 412", d: "OTIF 94%" },
                { k: "CLIENTES B2B", v: "1 284", d: "+34" },
              ].map((s) => (
                <div key={s.k} className="bg-[#0e1410] py-5 pr-5">
                  <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#a38b6b]">{s.k}</p>
                  <p className="mt-3 font-display text-4xl text-[#f5f3ee] tabular-nums">{s.v}</p>
                  <p className="mt-1 font-mono text-[10px] text-[#7fb069]">{s.d}</p>
                </div>
              ))}
            </div>

            {/* ticker */}
            <div className="mt-6 flex items-center gap-3 border border-[#e8e0d2]/10 px-4 py-2.5 font-mono text-[11px] text-[#e8e0d2]/60 overflow-hidden">
              <span className="shrink-0 text-[#7fb069]">● LIVE</span>
              <span className="shrink-0 text-[#a38b6b]">10:42</span>
              <span className="truncate">NF-e #00012842 autorizada — Jardim Verde Ltda — R$ 4.820,00 — separação iniciada (CD Bauru)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

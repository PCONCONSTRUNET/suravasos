import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { SuraLogo } from "@/components/sura-logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Leaf, Shield, TrendingUp, Truck } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [{ title: "Entrar — SURA ERP" }] }),
  component: Login,
});

function Login() {
  const nav = useNavigate();
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
      {/* Green decorative shapes */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-[#22C55E]/8 -translate-y-1/2 translate-x-1/4 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-[#166534]/6 translate-y-1/3 -translate-x-1/4 blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[#22C55E]/4 blur-3xl" />

      {/* Thin green accent line at top */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#166534] via-[#22C55E] to-[#166534]" />

      {/* Login card */}
      <div className="relative z-10 w-full max-w-[420px] px-6">
        {/* Logo centered above card */}
        <div className="flex flex-col items-center mb-8">
          <svg viewBox="0 0 48 48" className="h-14 w-14" fill="none">
            <path d="M18 22 C 16 14, 22 10, 22 18 Z" fill="#22C55E" />
            <path d="M24 21 C 23 12, 30 10, 28 19 Z" fill="#22C55E" />
            <path d="M30 23 C 31 15, 36 14, 34 22 Z" fill="#22C55E" />
            <path d="M14 28 L34 28 L31 42 L17 42 Z" fill="#92400E" />
            <path d="M6 34 Q 20 28, 32 33 T 46 32" stroke="#22C55E" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          </svg>
          <div className="mt-3 text-center">
            <h1 className="font-display text-2xl font-extrabold tracking-tight text-[#166534]">
              SURA<span className="ml-1 text-[#22C55E]">ERP</span>
            </h1>
            <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-[#166534]/50 mt-0.5">
              vasos & jardim
            </p>
          </div>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl border border-[#166534]/10 shadow-[0_8px_40px_-12px_rgba(22,101,52,0.15)] p-8">
          <h2 className="text-center font-display text-lg font-semibold text-[#1a1a1a]">
            Acesso ao sistema
          </h2>
          <p className="text-center text-sm text-[#64748b] mt-1">
            Uso restrito a colaboradores autorizados
          </p>

          <form
            onSubmit={(e) => { e.preventDefault(); nav({ to: "/app/dashboard" }); }}
            className="mt-6 space-y-4"
          >
            <div className="space-y-1.5">
              <Label htmlFor="user" className="text-sm font-medium text-[#374151]">
                Matrícula ou E-mail
              </Label>
              <Input
                id="user"
                placeholder="usuario@suravasos.com.br"
                defaultValue="marcos@suravasos.com.br"
                className="h-11 border-[#e5e7eb] focus:border-[#22C55E] focus:ring-[#22C55E]/20"
              />
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="pass" className="text-sm font-medium text-[#374151]">Senha</Label>
                <a href="#" className="text-xs font-medium text-[#22C55E] hover:text-[#166534] hover:underline transition-colors">
                  Esqueceu?
                </a>
              </div>
              <Input
                id="pass"
                type="password"
                placeholder="••••••••"
                defaultValue="••••••••"
                className="h-11 border-[#e5e7eb] focus:border-[#22C55E] focus:ring-[#22C55E]/20"
              />
            </div>

            <label className="flex items-center gap-2 text-sm text-[#64748b]">
              <Checkbox className="border-[#d1d5db] data-[state=checked]:bg-[#22C55E] data-[state=checked]:border-[#22C55E]" />
              Lembrar este computador
            </label>

            <Button
              type="submit"
              size="lg"
              className="w-full h-11 bg-[#166534] hover:bg-[#14532d] text-white font-semibold shadow-lg shadow-[#166534]/25 transition-all"
            >
              Entrar
            </Button>
          </form>

          <div className="mt-6 pt-5 border-t border-[#f3f4f6]">
            <p className="text-center text-xs text-[#9ca3af]">
              Problemas para acessar? Contate o departamento de TI — ramal 220
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-[10px] text-[#9ca3af] tracking-wide">
          SURA Vasos Indústria e Comércio Ltda · Sistema Interno v2.4
        </p>
      </div>
    </div>
  );
}

import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import logoImg from "@/assets/vivaverde-logo.png";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [{ title: "Entrar — VIVAVERDE ERP" }] }),
  component: Login,
});

function Login() {
  const nav = useNavigate();
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
      {/* Green decorative shapes */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-[#4a7c2a]/8 -translate-y-1/2 translate-x-1/4 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-[#2d5a1e]/6 translate-y-1/3 -translate-x-1/4 blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[#6b8c42]/5 blur-3xl" />

      {/* Thin green accent line at top */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2d5a1e] via-[#4a7c2a] to-[#2d5a1e]" />

      {/* Login card */}
      <div className="relative z-10 w-full max-w-[420px] px-6">
        {/* Logo centered above card */}
        <div className="flex flex-col items-center mb-8">
          <img src={logoImg} alt="VIVAVERDE" className="h-32 w-auto object-contain" />
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl border border-[#2d5a1e]/10 shadow-[0_8px_40px_-12px_rgba(45,90,30,0.15)] p-8">
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
                placeholder="usuario@vivaverde.com.br"
                defaultValue="marcos@vivaverde.com.br"
                className="h-11 border-[#e5e7eb] focus:border-[#4a7c2a] focus:ring-[#4a7c2a]/20"
              />
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="pass" className="text-sm font-medium text-[#374151]">Senha</Label>
                <a href="#" className="text-xs font-medium text-[#4a7c2a] hover:text-[#2d5a1e] hover:underline transition-colors">
                  Esqueceu?
                </a>
              </div>
              <Input
                id="pass"
                type="password"
                placeholder="••••••••"
                defaultValue="••••••••"
                className="h-11 border-[#e5e7eb] focus:border-[#4a7c2a] focus:ring-[#4a7c2a]/20"
              />
            </div>

            <label className="flex items-center gap-2 text-sm text-[#64748b]">
              <Checkbox className="border-[#d1d5db] data-[state=checked]:bg-[#4a7c2a] data-[state=checked]:border-[#4a7c2a]" />
              Lembrar este computador
            </label>

            <Button
              type="submit"
              size="lg"
              className="w-full h-11 bg-[#2d5a1e] hover:bg-[#1f3f14] text-white font-semibold shadow-lg shadow-[#2d5a1e]/25 transition-all"
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
          VIVAVERDE Distribuidora de Vasos e Acessórios Ltda · Sistema Interno v2.4
        </p>
      </div>
    </div>
  );
}

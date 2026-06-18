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
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Form */}
      <div className="flex flex-col justify-center px-6 py-12 sm:px-12 lg:px-20">
        <div className="mx-auto w-full max-w-md">
          <SuraLogo />
          <div className="mt-10">
            <h1 className="font-display text-3xl font-bold tracking-tight">Acesso ao sistema</h1>
            <p className="mt-2 text-muted-foreground">Sistema interno de gestão — uso restrito a colaboradores autorizados.</p>
          </div>

          <form
            onSubmit={(e) => { e.preventDefault(); nav({ to: "/app/dashboard" }); }}
            className="mt-8 space-y-5"
          >
            <div className="space-y-1.5">
              <Label htmlFor="user">Matrícula ou E-mail corporativo</Label>
              <Input id="user" placeholder="usuario@suravasos.com.br" defaultValue="marcos@suravasos.com.br" />
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="pass">Senha</Label>
                <a href="#" className="text-xs font-medium text-primary hover:underline">Recuperar senha (TI)</a>
              </div>
              <Input id="pass" type="password" placeholder="••••••••" defaultValue="••••••••" />
            </div>
            <label className="flex items-center gap-2 text-sm text-muted-foreground">
              <Checkbox /> Lembrar este computador
            </label>
            <Button type="submit" size="lg" className="w-full bg-gradient-brand shadow-elevated text-primary-foreground hover:opacity-95">
              Entrar
            </Button>
            <p className="text-center text-xs text-muted-foreground">
              Problemas para acessar? Contate o departamento de TI — ramal 220.
            </p>
          </form>

          <p className="mt-12 text-xs text-muted-foreground text-center">
            SURA Vasos Indústria e Comércio Ltda · Sistema Interno v2.4
          </p>
        </div>
      </div>

      {/* Showcase */}
      <div className="relative hidden lg:flex flex-col justify-between overflow-hidden bg-gradient-sidebar p-12 text-sidebar-foreground">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: "radial-gradient(circle at 20% 20%, #22C55E 0, transparent 40%), radial-gradient(circle at 80% 70%, #92400E 0, transparent 45%)"
        }} />
        <div className="relative">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest backdrop-blur">
            <Leaf className="h-3.5 w-3.5" /> SURA Vasos · Matriz Bauru
          </div>
          <h2 className="mt-8 font-display text-4xl font-bold leading-tight text-balance">
            Sistema interno de gestão da distribuidora.
          </h2>
          <p className="mt-4 max-w-md text-sidebar-foreground/70">
            Plataforma de uso exclusivo dos setores comercial, fiscal, financeiro, expedição e logística da SURA.
          </p>
        </div>

        <div className="relative grid grid-cols-2 gap-4">
          {[
            { icon: TrendingUp, label: "+38% vendas", sub: "média dos clientes" },
            { icon: Truck, label: "2.4k entregas", sub: "rastreadas/mês" },
            { icon: Shield, label: "100% fiscal", sub: "NF-e, NFC-e, MDF-e" },
            { icon: Leaf, label: "180+ SKUs", sub: "catalogados" },
          ].map((s) => (
            <div key={s.label} className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur">
              <s.icon className="h-5 w-5 text-success" />
              <p className="mt-3 font-display text-lg font-bold">{s.label}</p>
              <p className="text-xs text-sidebar-foreground/60">{s.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

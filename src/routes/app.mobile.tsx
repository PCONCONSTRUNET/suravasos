import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/app-shell";
import { Card } from "@/components/ui/card";
import { LayoutDashboard, Package, Users, ShoppingCart, Wallet, Bell, Search } from "lucide-react";

export const Route = createFileRoute("/app/mobile")({
  head: () => ({ meta: [{ title: "App Mobile — SURA ERP" }] }),
  component: Mobile,
});

function Phone({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-[260px] rounded-[44px] bg-gradient-to-b from-zinc-800 to-zinc-900 p-2 shadow-elevated">
        <div className="absolute left-1/2 top-2 z-10 h-5 w-24 -translate-x-1/2 rounded-full bg-zinc-900" />
        <div className="relative h-[540px] overflow-hidden rounded-[36px] bg-background">
          {children}
        </div>
      </div>
      <p className="mt-3 font-semibold text-sm">{title}</p>
    </div>
  );
}

function Mobile() {
  return (
    <>
      <PageHeader title="Aplicativo Mobile" subtitle="SURA Vendedor — disponível para iOS e Android" />

      <div className="flex flex-wrap justify-center gap-8 py-6">
        {/* Dashboard */}
        <Phone title="Dashboard">
          <div className="bg-gradient-sidebar p-4 pt-8 text-sidebar-foreground">
            <p className="text-xs opacity-70">Bom dia</p>
            <p className="font-display text-lg font-bold">Marcos Silva</p>
            <div className="mt-3 rounded-2xl bg-white/10 p-4 backdrop-blur">
              <p className="text-xs opacity-70">Vendas do mês</p>
              <p className="font-display text-2xl font-extrabold">R$ 386.420</p>
              <p className="text-xs text-success mt-1">↑ 12,4% vs mês anterior</p>
            </div>
          </div>
          <div className="p-4 grid grid-cols-2 gap-3">
            {[
              { i: ShoppingCart, l: "Pedidos", v: "42", c: "text-primary" },
              { i: Package, l: "Estoque", v: "18.3k", c: "text-info" },
              { i: Users, l: "Clientes", v: "1.284", c: "text-success" },
              { i: Wallet, l: "Caixa", v: "R$ 248k", c: "text-terra" },
            ].map((k) => (
              <div key={k.l} className="rounded-xl border p-3">
                <k.i className={`h-4 w-4 ${k.c}`} />
                <p className="text-[10px] text-muted-foreground mt-1.5">{k.l}</p>
                <p className="font-bold text-sm">{k.v}</p>
              </div>
            ))}
          </div>
        </Phone>

        {/* Estoque */}
        <Phone title="Estoque">
          <div className="bg-card p-4 pt-8 border-b">
            <div className="flex items-center justify-between">
              <p className="font-display font-bold text-lg">Estoque</p>
              <Bell className="h-4 w-4" />
            </div>
            <div className="relative mt-3">
              <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
              <input className="w-full rounded-full bg-secondary py-2 pl-9 pr-3 text-xs" placeholder="Buscar produto" />
            </div>
          </div>
          <div className="p-3 space-y-2 overflow-y-auto">
            {[
              { n: "Vaso PL 17", q: 842, emoji: "🪴" },
              { n: "Floreira FT 40", q: 184, emoji: "🌷" },
              { n: "Cuia C17", q: 92, emoji: "🥣" },
              { n: "Prato 24", q: 524, emoji: "🟤" },
              { n: "Vaso VB 34", q: 1840, emoji: "🌵" },
            ].map((p) => (
              <div key={p.n} className="flex items-center gap-3 rounded-xl border p-2.5">
                <div className="h-10 w-10 rounded-lg bg-accent grid place-items-center text-lg">{p.emoji}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold truncate">{p.n}</p>
                  <p className="text-[10px] text-muted-foreground">{p.q} un</p>
                </div>
                <span className="text-xs font-bold text-primary">+</span>
              </div>
            ))}
          </div>
        </Phone>

        {/* Pedidos */}
        <Phone title="Pedidos">
          <div className="bg-gradient-brand p-4 pt-8 text-primary-foreground">
            <p className="text-xs opacity-80">Pedidos hoje</p>
            <p className="font-display text-3xl font-extrabold">42</p>
            <div className="mt-2 flex gap-2 text-[10px]">
              <span className="rounded-full bg-white/20 px-2 py-0.5">19 pagos</span>
              <span className="rounded-full bg-white/20 px-2 py-0.5">8 em rota</span>
            </div>
          </div>
          <div className="p-3 space-y-2">
            {[
              { n: "#10428", c: "Jardim Verde", v: "R$ 4.820", s: "Pago" },
              { n: "#10427", c: "Floricultura Rosa", v: "R$ 1.234", s: "Separando" },
              { n: "#10426", c: "Garden Center BH", v: "R$ 8.940", s: "Faturado" },
              { n: "#10425", c: "Sítio das Flores", v: "R$ 642", s: "Aguardando" },
            ].map((o) => (
              <div key={o.n} className="rounded-xl border p-3">
                <div className="flex justify-between text-xs">
                  <span className="font-mono">{o.n}</span>
                  <span className="font-bold text-primary">{o.v}</span>
                </div>
                <p className="text-[11px] mt-0.5 font-semibold truncate">{o.c}</p>
                <p className="text-[10px] text-muted-foreground">{o.s}</p>
              </div>
            ))}
          </div>
        </Phone>

        {/* Financeiro */}
        <Phone title="Financeiro">
          <div className="p-4 pt-8 bg-card border-b">
            <p className="font-display font-bold text-lg">Financeiro</p>
          </div>
          <div className="p-4 space-y-3">
            <div className="rounded-2xl bg-gradient-brand p-4 text-primary-foreground">
              <p className="text-xs opacity-80">Saldo atual</p>
              <p className="font-display text-2xl font-extrabold">R$ 248.420</p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-xl bg-success/15 p-3">
                <p className="text-[10px] text-success font-semibold">RECEITAS</p>
                <p className="font-bold text-sm">R$ 386k</p>
              </div>
              <div className="rounded-xl bg-destructive/10 p-3">
                <p className="text-[10px] text-destructive font-semibold">DESPESAS</p>
                <p className="font-bold text-sm">R$ 232k</p>
              </div>
            </div>
            <div className="space-y-1.5">
              {["Pedido #10428", "Folha junho", "Frete D-2"].map((x, i) => (
                <div key={x} className="flex justify-between text-xs border-b pb-1.5">
                  <span>{x}</span>
                  <span className={i === 1 ? "text-destructive font-bold" : "text-success font-bold"}>{i === 1 ? "- R$ 38k" : i === 0 ? "+ R$ 4.8k" : "- R$ 842"}</span>
                </div>
              ))}
            </div>
          </div>
        </Phone>
      </div>
    </>
  );
}

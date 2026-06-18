import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowDownLeft, ArrowUpRight, ClipboardList, Settings2, Package, AlertTriangle } from "lucide-react";

export const Route = createFileRoute("/app/estoque")({
  head: () => ({ meta: [{ title: "Estoque — VIVAVERDE ERP" }] }),
  component: Estoque,
});

const cats = [
  { l: "Total de Vasos", v: "12.420", c: "bg-primary/10 text-primary", pct: 78 },
  { l: "Total de Floreiras", v: "2.840", c: "bg-success/15 text-success", pct: 62 },
  { l: "Total de Cuias", v: "1.620", c: "bg-terra/10 text-terra", pct: 48 },
  { l: "Total de Pratos", v: "1.462", c: "bg-info/10 text-info", pct: 55 },
];

const moves = [
  { t: "Entrada", p: "Vaso PL 17", q: "+200", u: "Marcos", d: "Hoje, 09:42", neg: false },
  { t: "Saída", p: "Floreira FT 40", q: "-48", u: "Pedido #10428", d: "Hoje, 08:18", neg: true },
  { t: "Entrada", p: "Cuia C17", q: "+500", u: "NF 5.842 — Plasvale", d: "Ontem, 16:30", neg: false },
  { t: "Ajuste", p: "Prato 24", q: "-4", u: "Inventário Q2", d: "Ontem, 14:05", neg: true },
  { t: "Saída", p: "Vaso Adriana 25", q: "-12", u: "Pedido #10425", d: "Ontem, 11:22", neg: true },
];

const critical = [
  { p: "Cuia C17", est: 92, min: 200, pct: 46 },
  { p: "Suporte Triplo 30", est: 38, min: 100, pct: 38 },
  { p: "Vaso PL 30", est: 24, min: 80, pct: 30 },
  { p: "Floreira Quadra 50", est: 9, min: 60, pct: 15 },
];

function Estoque() {
  return (
    <>
      <PageHeader
        title="Estoque"
        subtitle="Movimentação consolidada — Centro de distribuição Bauru/SP"
        actions={
          <>
            <Button variant="outline"><ClipboardList className="mr-2 h-4 w-4" />Inventário</Button>
            <Button variant="outline"><Settings2 className="mr-2 h-4 w-4" />Ajuste</Button>
            <Button className="bg-success text-success-foreground hover:bg-success/90"><ArrowDownLeft className="mr-2 h-4 w-4" />Entrada</Button>
            <Button className="bg-gradient-brand text-primary-foreground"><ArrowUpRight className="mr-2 h-4 w-4" />Saída</Button>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        {cats.map((c) => (
          <Card key={c.l} className="shadow-card">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div className={`grid h-10 w-10 place-items-center rounded-lg ${c.c}`}><Package className="h-5 w-5" /></div>
                <Badge variant="secondary">{c.pct}% capacidade</Badge>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">{c.l}</p>
              <p className="mt-1 font-display text-2xl font-bold">{c.v}</p>
              <Progress value={c.pct} className="mt-3 h-1.5" />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2 shadow-card">
          <CardHeader><CardTitle>Últimas movimentações</CardTitle></CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {moves.map((m, i) => (
                <div key={i} className="grid grid-cols-[auto_1fr_auto] items-center gap-4 px-6 py-3">
                  <div className={`grid h-9 w-9 place-items-center rounded-lg ${m.neg ? "bg-destructive/10 text-destructive" : "bg-success/15 text-success"}`}>
                    {m.neg ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownLeft className="h-4 w-4" />}
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-sm truncate">{m.p}</p>
                    <p className="text-xs text-muted-foreground truncate">{m.t} · {m.u} · {m.d}</p>
                  </div>
                  <p className={`font-mono text-sm font-bold ${m.neg ? "text-destructive" : "text-success"}`}>{m.q}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-warning" /> Estoque crítico
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {critical.map((c) => (
              <div key={c.p}>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold">{c.p}</span>
                  <span className="text-muted-foreground">{c.est}/{c.min}</span>
                </div>
                <Progress value={c.pct} className="mt-1.5 h-2" />
              </div>
            ))}
            <Button variant="outline" className="w-full">Gerar pedido de compra</Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

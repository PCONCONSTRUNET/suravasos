import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Truck, MapPin, Clock, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/app/logistica")({
  head: () => ({ meta: [{ title: "Logística — VIVAVERDE ERP" }] }),
  component: Logistica,
});

const routes = [
  { v: "Veículo 01 — Iveco Daily", m: "Marcos Lima", e: 8, ok: 5, st: "Em rota", cor: "info" },
  { v: "Veículo 02 — VW Delivery", m: "João Pereira", e: 12, ok: 12, st: "Concluída", cor: "success" },
  { v: "Veículo 03 — Mercedes Accelo", m: "Pedro Souza", e: 6, ok: 2, st: "Em rota", cor: "info" },
  { v: "Veículo 04 — Ford Cargo", m: "Ana Ribeiro", e: 4, ok: 0, st: "Aguardando", cor: "warning" },
];

const cities = [
  { c: "São Paulo/SP", q: 12, x: "30%", y: "55%" },
  { c: "Campinas/SP", q: 6, x: "22%", y: "48%" },
  { c: "Bauru/SP", q: 4, x: "18%", y: "60%" },
  { c: "Sorocaba/SP", q: 5, x: "26%", y: "62%" },
  { c: "Ribeirão Preto/SP", q: 3, x: "32%", y: "40%" },
  { c: "BH/MG", q: 8, x: "52%", y: "35%" },
];

function Logistica() {
  const tones: Record<string, string> = {
    info: "bg-info/15 text-info border-0",
    success: "bg-success/15 text-success border-0",
    warning: "bg-warning/15 text-warning border-0",
  };
  return (
    <>
      <PageHeader title="Logística" subtitle="Frota, rotas e entregas" actions={
        <Button className="bg-gradient-brand text-primary-foreground"><Truck className="mr-2 h-4 w-4" />Nova rota</Button>
      } />

      <div className="grid gap-4 sm:grid-cols-4 mb-6">
        {[
          { l: "Entregas do dia", v: "30", i: Truck, c: "text-primary" },
          { l: "Concluídas", v: "19", i: CheckCircle2, c: "text-success" },
          { l: "Em rota", v: "8", i: Clock, c: "text-info" },
          { l: "Pendentes", v: "3", i: MapPin, c: "text-warning" },
        ].map((k) => (
          <Card key={k.l} className="shadow-card"><CardContent className="p-5 flex items-center gap-4">
            <k.i className={`h-8 w-8 ${k.c}`} />
            <div><p className="text-sm text-muted-foreground">{k.l}</p>
            <p className={`font-display text-2xl font-bold ${k.c}`}>{k.v}</p></div>
          </CardContent></Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2 shadow-card overflow-hidden">
          <CardHeader><CardTitle>Mapa de entregas</CardTitle></CardHeader>
          <CardContent>
            <div className="relative h-[420px] rounded-xl border bg-gradient-to-br from-accent/40 to-secondary overflow-hidden">
              <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full opacity-30">
                <path d="M10 40 Q 25 30, 40 45 T 70 38 Q 85 30, 95 50" stroke="#166534" strokeWidth="0.3" fill="none" />
                <path d="M15 70 Q 35 55, 55 65 T 90 60" stroke="#22C55E" strokeWidth="0.3" fill="none" />
                <path d="M5 25 Q 30 15, 50 30 T 95 20" stroke="#92400E" strokeWidth="0.3" fill="none" />
              </svg>
              {cities.map((c) => (
                <div key={c.c} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: c.x, top: c.y }}>
                  <div className="relative">
                    <div className="absolute inset-0 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/30 animate-ping" />
                    <div className="relative h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-brand text-primary-foreground grid place-items-center text-xs font-bold shadow-elevated">{c.q}</div>
                  </div>
                  <div className="absolute left-5 -top-2 whitespace-nowrap rounded-md bg-card border px-2 py-0.5 text-xs font-semibold shadow-card">{c.c}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader><CardTitle>Rotas do dia</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {routes.map((r) => (
              <div key={r.v} className="rounded-xl border p-4">
                <div className="flex items-start justify-between">
                  <div className="min-w-0">
                    <p className="font-semibold text-sm truncate">{r.v}</p>
                    <p className="text-xs text-muted-foreground">Motorista: {r.m}</p>
                  </div>
                  <Badge className={tones[r.cor]}>{r.st}</Badge>
                </div>
                <div className="mt-3">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-muted-foreground">Progresso</span>
                    <span className="font-semibold">{r.ok}/{r.e}</span>
                  </div>
                  <div className="h-2 rounded-full bg-secondary overflow-hidden">
                    <div className="h-full bg-gradient-brand" style={{ width: `${(r.ok / r.e) * 100}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </>
  );
}

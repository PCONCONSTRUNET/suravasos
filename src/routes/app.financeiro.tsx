import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/app-shell";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Wallet, TrendingUp, TrendingDown, PiggyBank } from "lucide-react";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export const Route = createFileRoute("/app/financeiro")({
  head: () => ({ meta: [{ title: "Financeiro — SURA ERP" }] }),
  component: Financeiro,
});

const flow = [
  { d: "Sem 1", e: 86000, s: 52000 },
  { d: "Sem 2", e: 94000, s: 61000 },
  { d: "Sem 3", e: 112000, s: 68000 },
  { d: "Sem 4", e: 124000, s: 74000 },
];

const rows = [
  { d: "18/06", desc: "Recebimento pedido #10428", c: "Receita", v: "+ R$ 4.820,00", neg: false },
  { d: "18/06", desc: "Combustível frota", c: "Despesa", v: "- R$ 842,00", neg: true },
  { d: "17/06", desc: "Recebimento pedido #10426", c: "Receita", v: "+ R$ 8.940,00", neg: false },
  { d: "17/06", desc: "Folha de pagamento", c: "Despesa", v: "- R$ 38.420,00", neg: true },
  { d: "16/06", desc: "Recebimento pedido #10424", c: "Receita", v: "+ R$ 12.380,00", neg: false },
  { d: "15/06", desc: "Plasvale NF 5.842", c: "Despesa", v: "- R$ 84.200,00", neg: true },
];

function Financeiro() {
  return (
    <>
      <PageHeader title="Financeiro" subtitle="Caixa, contas a pagar e receber" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        {[
          { i: Wallet, l: "Caixa atual", v: "R$ 248.420", c: "text-primary", bg: "bg-primary/10" },
          { i: TrendingUp, l: "Receitas (mês)", v: "R$ 386.420", c: "text-success", bg: "bg-success/15" },
          { i: TrendingDown, l: "Despesas (mês)", v: "R$ 232.180", c: "text-destructive", bg: "bg-destructive/10" },
          { i: PiggyBank, l: "Lucro líquido", v: "R$ 154.240", c: "text-info", bg: "bg-info/10" },
        ].map((k) => (
          <Card key={k.l} className="shadow-card"><CardContent className="p-5">
            <div className={`grid h-10 w-10 place-items-center rounded-lg ${k.bg}`}><k.i className={`h-5 w-5 ${k.c}`} /></div>
            <p className="mt-4 text-sm text-muted-foreground">{k.l}</p>
            <p className={`mt-1 font-display text-2xl font-bold ${k.c}`}>{k.v}</p>
          </CardContent></Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2 mb-6">
        <Card className="shadow-card">
          <CardHeader><CardTitle>Fluxo de caixa</CardTitle><CardDescription>Junho de 2026</CardDescription></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={flow}>
                <defs>
                  <linearGradient id="fe" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#22C55E" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#22C55E" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <XAxis dataKey="d" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `${v / 1000}k`} />
                <Tooltip contentStyle={{ borderRadius: 12 }} />
                <Area type="monotone" dataKey="e" stroke="#22C55E" strokeWidth={2.5} fill="url(#fe)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardHeader><CardTitle>Receitas × Despesas</CardTitle><CardDescription>Por semana</CardDescription></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={flow}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <XAxis dataKey="d" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `${v / 1000}k`} />
                <Tooltip contentStyle={{ borderRadius: 12 }} />
                <Bar dataKey="e" fill="#166534" radius={[6, 6, 0, 0]} />
                <Bar dataKey="s" fill="#92400E" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-card overflow-x-auto">
        <CardHeader><CardTitle>Lançamentos recentes</CardTitle></CardHeader>
        <Table>
          <TableHeader><TableRow>
            <TableHead>Data</TableHead><TableHead>Descrição</TableHead>
            <TableHead>Categoria</TableHead><TableHead className="text-right">Valor</TableHead>
          </TableRow></TableHeader>
          <TableBody>
            {rows.map((r, i) => (
              <TableRow key={i}>
                <TableCell>{r.d}</TableCell>
                <TableCell className="font-medium">{r.desc}</TableCell>
                <TableCell><Badge variant="secondary">{r.c}</Badge></TableCell>
                <TableCell className={`text-right font-bold ${r.neg ? "text-destructive" : "text-success"}`}>{r.v}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </>
  );
}

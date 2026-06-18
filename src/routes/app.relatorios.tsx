import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/app-shell";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { BarChart3, FileSpreadsheet, FileText, Download, Users, Package, DollarSign } from "lucide-react";

export const Route = createFileRoute("/app/relatorios")({
  head: () => ({ meta: [{ title: "Relatórios — SURA ERP" }] }),
  component: Relatorios,
});

const a = [{ m: "Jan", v: 142 }, { m: "Fev", v: 168 }, { m: "Mar", v: 154 }, { m: "Abr", v: 198 }, { m: "Mai", v: 224 }, { m: "Jun", v: 256 }];

function Relatorios() {
  const reports = [
    { i: DollarSign, t: "Relatório de Vendas", d: "Faturamento, ticket médio, comissões" },
    { i: BarChart3, t: "Relatório Financeiro", d: "DRE, fluxo de caixa, inadimplência" },
    { i: Package, t: "Relatório de Estoque", d: "Posição, giro, curva ABC" },
    { i: Users, t: "Relatório de Clientes", d: "Ativação, recompra, ranking" },
    { i: FileSpreadsheet, t: "Relatório de Produtos", d: "Mais vendidos, rentabilidade" },
    { i: FileText, t: "Relatório Fiscal", d: "Apuração ICMS, PIS, COFINS" },
  ];
  return (
    <>
      <PageHeader title="Relatórios" subtitle="Visões executivas e operacionais" />

      <div className="grid gap-6 lg:grid-cols-2 mb-6">
        <Card className="shadow-card">
          <CardHeader><CardTitle>Evolução de vendas</CardTitle><CardDescription>Mil reais — 1º semestre</CardDescription></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={a}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <XAxis dataKey="m" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ borderRadius: 12 }} />
                <Line type="monotone" dataKey="v" stroke="#166534" strokeWidth={3} dot={{ fill: "#166534", r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardHeader><CardTitle>Volume por categoria</CardTitle><CardDescription>Unidades vendidas</CardDescription></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={a}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <XAxis dataKey="m" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ borderRadius: 12 }} />
                <Bar dataKey="v" fill="#22C55E" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {reports.map((r) => (
          <Card key={r.t} className="shadow-card hover:shadow-elevated transition-shadow cursor-pointer group">
            <CardContent className="p-6">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-brand text-primary-foreground group-hover:scale-110 transition-transform">
                <r.i className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-display text-lg font-bold">{r.t}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{r.d}</p>
              <div className="mt-4 flex gap-2">
                <Button variant="outline" size="sm">Visualizar</Button>
                <Button variant="ghost" size="sm"><Download className="mr-1.5 h-3.5 w-3.5" />PDF</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}

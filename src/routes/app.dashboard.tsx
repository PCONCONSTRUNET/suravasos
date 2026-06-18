import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/app-shell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer,
  Tooltip, XAxis, YAxis,
} from "recharts";
import {
  ArrowDownRight, ArrowUpRight, DollarSign, Package, ShoppingCart, AlertTriangle,
  Users, Truck, TrendingUp, MoreHorizontal,
} from "lucide-react";

export const Route = createFileRoute("/app/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — SURA ERP" }] }),
  component: Dashboard,
});

const sales = [
  { m: "Jan", v: 142000, c: 98000 }, { m: "Fev", v: 168000, c: 112000 },
  { m: "Mar", v: 154000, c: 105000 }, { m: "Abr", v: 198000, c: 134000 },
  { m: "Mai", v: 224000, c: 148000 }, { m: "Jun", v: 256000, c: 162000 },
  { m: "Jul", v: 248000, c: 158000 }, { m: "Ago", v: 289000, c: 178000 },
  { m: "Set", v: 312000, c: 192000 }, { m: "Out", v: 298000, c: 184000 },
  { m: "Nov", v: 342000, c: 208000 }, { m: "Dez", v: 386000, c: 232000 },
];

const topProducts = [
  { name: "Vaso PL 17", v: 1840 },
  { name: "Vaso Adriana 25", v: 1432 },
  { name: "Floreira FT 40", v: 1124 },
  { name: "Cuia C17", v: 986 },
  { name: "Prato 24", v: 812 },
];

const mix = [
  { name: "Vasos", value: 48, color: "#166534" },
  { name: "Floreiras", value: 22, color: "#22C55E" },
  { name: "Cuias", value: 14, color: "#92400E" },
  { name: "Pratos", value: 10, color: "#2563EB" },
  { name: "Acessórios", value: 6, color: "#94a3b8" },
];

const recent = [
  { n: "#10428", c: "Jardim Verde Ltda", v: "R$ 4.820,00", s: "Pago" },
  { n: "#10427", c: "Floricultura Rosa", v: "R$ 1.234,50", s: "Em separação" },
  { n: "#10426", c: "Garden Center BH", v: "R$ 8.940,00", s: "Faturado" },
  { n: "#10425", c: "Sítio das Flores", v: "R$ 642,90", s: "Aguardando" },
  { n: "#10424", c: "Vivero Paulista", v: "R$ 12.380,00", s: "Pago" },
];

function KPI({ icon: Icon, label, value, delta, up = true, tone = "primary" }: any) {
  const tones: Record<string, string> = {
    primary: "bg-primary/10 text-primary",
    info: "bg-info/10 text-info",
    success: "bg-success/15 text-success",
    warning: "bg-warning/15 text-warning",
    terra: "bg-terra/10 text-terra",
    destructive: "bg-destructive/10 text-destructive",
  };
  return (
    <Card className="shadow-card">
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className={`grid h-10 w-10 place-items-center rounded-lg ${tones[tone]}`}>
            <Icon className="h-5 w-5" />
          </div>
          <Button size="icon" variant="ghost" className="h-7 w-7"><MoreHorizontal className="h-4 w-4" /></Button>
        </div>
        <p className="mt-4 text-sm text-muted-foreground">{label}</p>
        <p className="mt-1 font-display text-2xl font-bold tracking-tight">{value}</p>
        {delta && (
          <p className={`mt-2 flex items-center gap-1 text-xs font-medium ${up ? "text-success" : "text-destructive"}`}>
            {up ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
            {delta} <span className="text-muted-foreground font-normal">vs mês anterior</span>
          </p>
        )}
      </CardContent>
    </Card>
  );
}

function Dashboard() {
  return (
    <>
      <PageHeader
        title="Visão Geral"
        subtitle="Quarta-feira, 18 de junho de 2026 — bom dia, Marcos 👋"
        actions={
          <>
            <Button variant="outline">Exportar</Button>
            <Button asChild className="bg-gradient-brand text-primary-foreground">
              <Link to="/app/vendas">Novo Pedido</Link>
            </Button>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
        <KPI icon={DollarSign} label="Faturamento mensal" value="R$ 386.420" delta="+12,4%" tone="primary" />
        <KPI icon={ShoppingCart} label="Pedidos do dia" value="42" delta="+8 hoje" tone="info" />
        <KPI icon={Package} label="Produtos em estoque" value="18.342" delta="+312" tone="success" />
        <KPI icon={AlertTriangle} label="Produtos críticos" value="7" delta="+2" up={false} tone="warning" />
        <KPI icon={Users} label="Clientes ativos" value="1.284" delta="+34" tone="terra" />
        <KPI icon={Truck} label="Entregas pendentes" value="23" delta="-4" up={false} tone="destructive" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2 shadow-card">
          <CardHeader className="flex flex-row items-start justify-between">
            <div>
              <CardTitle>Vendas vs Compras</CardTitle>
              <CardDescription>Últimos 12 meses — em reais (R$)</CardDescription>
            </div>
            <div className="flex gap-2 text-xs">
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-primary" />Vendas</span>
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-terra" />Compras</span>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={sales}>
                <defs>
                  <linearGradient id="gv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#166534" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#166534" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gc" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#92400E" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#92400E" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <XAxis dataKey="m" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `${v / 1000}k`} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0" }} />
                <Area type="monotone" dataKey="v" stroke="#166534" strokeWidth={2.5} fill="url(#gv)" />
                <Area type="monotone" dataKey="c" stroke="#92400E" strokeWidth={2} fill="url(#gc)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Mix de Categorias</CardTitle>
            <CardDescription>Participação no faturamento</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={mix} dataKey="value" innerRadius={55} outerRadius={85} paddingAngle={2}>
                  {mix.map((e) => <Cell key={e.name} fill={e.color} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <ul className="mt-2 space-y-1.5 text-sm">
              {mix.map((m) => (
                <li key={m.name} className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-sm" style={{ background: m.color }} />
                    {m.name}
                  </span>
                  <span className="font-semibold">{m.value}%</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2 shadow-card">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Últimos pedidos</CardTitle>
              <CardDescription>5 mais recentes</CardDescription>
            </div>
            <Button variant="ghost" size="sm" asChild><Link to="/app/vendas">Ver tudo</Link></Button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {recent.map((r) => (
                <div key={r.n} className="flex items-center justify-between px-6 py-3">
                  <div className="min-w-0">
                    <p className="font-semibold text-sm">{r.n}</p>
                    <p className="text-xs text-muted-foreground truncate">{r.c}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold">{r.v}</p>
                    <Badge variant="secondary" className="mt-0.5 text-[10px]">{r.s}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Mais vendidos</CardTitle>
            <CardDescription>Top 5 do mês — em unidades</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={230}>
              <BarChart data={topProducts} layout="vertical" margin={{ left: 10 }}>
                <CartesianGrid horizontal={false} stroke="#e2e8f0" />
                <XAxis type="number" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis dataKey="name" type="category" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} width={110} />
                <Tooltip contentStyle={{ borderRadius: 12 }} />
                <Bar dataKey="v" fill="#22C55E" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-3">
        {[
          { title: "Margem líquida", value: "32,4%", icon: TrendingUp, tone: "text-success" },
          { title: "Ticket médio", value: "R$ 642,80", icon: DollarSign, tone: "text-primary" },
          { title: "OTIF (entregas no prazo)", value: "94,2%", icon: Truck, tone: "text-info" },
        ].map((s) => (
          <Card key={s.title} className="shadow-card">
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <p className="text-sm text-muted-foreground">{s.title}</p>
                <p className="mt-1 font-display text-2xl font-bold">{s.value}</p>
              </div>
              <s.icon className={`h-8 w-8 ${s.tone}`} />
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}

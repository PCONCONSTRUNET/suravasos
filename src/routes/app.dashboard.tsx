import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
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
  head: () => ({ meta: [{ title: "Dashboard — VIVAVERDE ERP" }] }),
  component: Dashboard,
});

// Gráficos serão dinamizados posteriormente. Por enquanto mostram arrays vazios após limpeza.

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
  const [stats, setStats] = useState({
    faturamento: 0,
    pedidosHoje: 0,
    produtosEstoque: 0,
    clientesAtivos: 0,
    entregasPendentes: 0,
    recent: [] as any[],
  });

  useEffect(() => {
    const loadData = async () => {
      const { data: vendasData } = await supabase.from('vendas').select('*').in('tipo', ['VENDA', 'PDV', 'Afiliado']);
      const { data: produtos } = await supabase.from('produtos').select('*');
      const { count: clientesCount } = await supabase.from('clientes').select('*', { count: 'exact', head: true });
      const { data: vendasRecentes } = await supabase.from('vendas')
        .select('*, clientes(nome)')
        .in('tipo', ['VENDA', 'PDV', 'Afiliado'])
        .order('created_at', { ascending: false })
        .limit(5);
      const { data: receitas } = await supabase.from('contas_receber').select('valor, status');
      const { data: despesas } = await supabase.from('contas_pagar').select('valor, status');
      const { data: compras } = await supabase.from('compras').select('valor_total, created_at, status');

      let fat = 0;
      let pedHoje = 0;
      let entPend = 0;
      let delivered = 0;
      const hoje = new Date().toISOString().split('T')[0];

      const monthlyVendas: Record<string, number> = {};
      const monthlyCompras: Record<string, number> = {};

      vendasData?.forEach(v => {
        if (v.status !== 'Cancelada' && v.status !== 'Rejeitada' && v.status_aprovacao !== 'Rejeitada') {
          fat += Number(v.valor_total || v.total || 0);
          const month = v.created_at ? v.created_at.substring(0, 7) : '2026-06';
          monthlyVendas[month] = (monthlyVendas[month] || 0) + Number(v.valor_total || v.total || 0);
        }
        if (v.created_at?.startsWith(hoje)) pedHoje++;
        if (v.status === 'PENDENTE' || v.status === 'Pendente' || v.status === 'EM_ROTA' || v.status === 'Em Transporte') entPend++;
        if (v.status === 'Entregue' || v.status === 'Concluída') delivered++;
      });

      compras?.forEach(c => {
        if (c.status !== 'Cancelado') {
          const month = c.created_at ? c.created_at.substring(0, 7) : '2026-06';
          monthlyCompras[month] = (monthlyCompras[month] || 0) + Number(c.valor_total || 0);
        }
      });

      const totalReceitas = receitas?.filter(r => r.status === 'Recebido').reduce((acc, r) => acc + Number(r.valor), 0) || 0;
      const totalDespesas = despesas?.filter(d => d.status === 'Pago').reduce((acc, d) => acc + Number(d.valor), 0) || 0;
      const margin = totalReceitas > 0 ? ((totalReceitas - totalDespesas) / totalReceitas) * 100 : 0;

      const totalVendasConcluidas = (vendasData?.length || 0) - entPend;
      const otif = totalVendasConcluidas > 0 ? (delivered / totalVendasConcluidas) * 100 : 100;
      const ticketMedio = (vendasData?.length || 0) > 0 ? fat / vendasData!.length : 0;

      const categoryMix: Record<string, number> = {};
      produtos?.forEach(p => {
        if (p.categoria) {
           categoryMix[p.categoria] = (categoryMix[p.categoria] || 0) + (Number(p.estoque || 0) * Number(p.valor || 0));
        }
      });

      const pieData = Object.entries(categoryMix).filter(([_, v]) => v > 0).map(([k, v]) => ({ name: k, value: v }));
      const COLORS = ['#22C55E', '#166534', '#84CC16', '#EAB308', '#F97316'];
      pieData.forEach((d, i) => { (d as any).fill = COLORS[i % COLORS.length]; });

      const topProducts = produtos?.sort((a, b) => Number(b.valor || 0) * Number(b.estoque || 0) - Number(a.valor || 0) * Number(a.estoque || 0)).slice(0, 5).map(p => ({
        name: p.nome.substring(0, 15) + "...",
        v: Number(p.estoque || 0)
      })) || [];

      // Generate last 6 months for chart
      const chartData = [];
      for (let i = 5; i >= 0; i--) {
        const d = new Date();
        d.setMonth(d.getMonth() - i);
        const mStr = d.toISOString().substring(0, 7);
        chartData.push({
          m: d.toLocaleDateString('pt-BR', { month: 'short' }),
          v: monthlyVendas[mStr] || 0,
          c: monthlyCompras[mStr] || 0
        });
      }

      setStats({
        faturamento: fat,
        pedidosHoje: pedHoje,
        produtosEstoque: produtos?.length || 0,
        clientesAtivos: clientesCount || 0,
        entregasPendentes: entPend,
        recent: vendasRecentes || [],
        critical: produtos?.filter(p => Number(p.estoque || 0) <= 10).length || 0,
        ticketMedio,
        margin,
        otif,
        chartData,
        pieData,
        topProducts
      } as any);
    }
    loadData();
  }, []);

  return (
    <>
      <PageHeader
        title="Visão Geral"
        subtitle={`${new Intl.DateTimeFormat('pt-BR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(new Date())} — bom dia, Douglas 👋`}
        actions={
          <>
            <Button variant="outline" onClick={async () => {
              const { data } = await supabase.from('vendas').select('*, clientes(nome)').order('created_at', { ascending: false }).limit(100);
              if (!data || data.length === 0) { alert("Nenhuma venda encontrada para exportar."); return; }
              const rows = [
                ["ID", "Cliente", "Tipo", "Status", "Valor Total", "Data"],
                ...data.map(v => [
                  v.id.slice(0,8).toUpperCase(),
                  v.clientes?.nome || "Consumidor Final",
                  v.tipo || "",
                  v.status || "",
                  `R$ ${Number(v.valor_total || 0).toFixed(2)}`,
                  new Date(v.created_at).toLocaleDateString('pt-BR')
                ])
              ];
              const csv = rows.map(r => r.map(c => `"${c}"`).join(";")).join("\n");
              const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url; a.download = `relatorio_vendas_${new Date().toISOString().split('T')[0]}.csv`;
              document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
            }}>Exportar CSV</Button>
            <Button asChild className="bg-gradient-brand text-primary-foreground">
              <Link to="/app/vendas">Novo Pedido</Link>
            </Button>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
        <KPI icon={DollarSign} label="Faturamento" value={`R$ ${stats.faturamento.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`} delta="" tone="primary" />
        <KPI icon={ShoppingCart} label="Pedidos do dia" value={stats.pedidosHoje.toString()} delta="" tone="info" />
        <KPI icon={Package} label="Produtos ativos" value={stats.produtosEstoque.toString()} delta="" tone="success" />
        <KPI icon={AlertTriangle} label="Produtos críticos" value={(stats as any).critical?.toString() || "0"} delta="" tone="warning" />
        <KPI icon={Users} label="Clientes ativos" value={stats.clientesAtivos.toString()} delta="" tone="terra" />
        <KPI icon={Truck} label="Entregas pendentes" value={stats.entregasPendentes.toString()} delta="" up={false} tone="destructive" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2 shadow-card">
          <CardHeader className="flex flex-row items-start justify-between">
            <div>
              <CardTitle>Vendas vs Compras</CardTitle>
              <CardDescription>Últimos 6 meses — em reais (R$)</CardDescription>
            </div>
            <div className="flex gap-2 text-xs">
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-primary" />Vendas</span>
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-terra" />Compras</span>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={(stats as any).chartData || []}>
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
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0" }} formatter={(value: number) => `R$ ${value.toFixed(2)}`} />
                <Area type="monotone" dataKey="v" name="Vendas" stroke="#166534" strokeWidth={2.5} fill="url(#gv)" />
                <Area type="monotone" dataKey="c" name="Compras" stroke="#92400E" strokeWidth={2} fill="url(#gc)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Mix de Categorias</CardTitle>
            <CardDescription>Participação em estoque (R$)</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={(stats as any).pieData || []} dataKey="value" nameKey="name" innerRadius={55} outerRadius={85} paddingAngle={2}>
                </Pie>
                <Tooltip formatter={(value: number) => `R$ ${value.toFixed(2)}`} />
              </PieChart>
            </ResponsiveContainer>
            <ul className="mt-2 space-y-1.5 text-sm text-center text-muted-foreground">
              {!(stats as any).pieData?.length && <li>Sem dados suficientes.</li>}
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
              {stats.recent.length === 0 ? (
                <div className="p-6 text-center text-sm text-muted-foreground">Nenhum pedido recente.</div>
              ) : stats.recent.map((r: any) => (
                <div key={r.id} className="flex items-center justify-between px-6 py-3">
                  <div className="min-w-0">
                    <p className="font-semibold text-sm">#{r.id?.toString().slice(0, 5)}</p>
                    <p className="text-xs text-muted-foreground truncate">{r.clientes?.nome || "Consumidor Final"}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold">R$ {Number(r.total || r.valor_total || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                    <Badge variant="secondary" className="mt-0.5 text-[10px]">{r.status}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Maior Valor de Estoque</CardTitle>
            <CardDescription>Top 5 — Unidades Atuais</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={230}>
              <BarChart data={(stats as any).topProducts || []} layout="vertical" margin={{ left: 10 }}>
                <CartesianGrid horizontal={false} stroke="#e2e8f0" />
                <XAxis type="number" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis dataKey="name" type="category" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} width={110} />
                <Tooltip contentStyle={{ borderRadius: 12 }} />
                <Bar dataKey="v" name="Unidades" fill="#22C55E" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-3">
        {[
          { title: "Margem líquida", value: `${((stats as any).margin || 0).toFixed(1)}%`, icon: TrendingUp, tone: "text-success" },
          { title: "Ticket médio", value: `R$ ${((stats as any).ticketMedio || 0).toFixed(2)}`, icon: DollarSign, tone: "text-primary" },
          { title: "Taxa de Entrega", value: `${((stats as any).otif || 0).toFixed(1)}%`, icon: Truck, tone: "text-info" },
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

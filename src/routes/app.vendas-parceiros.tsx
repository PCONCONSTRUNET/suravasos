import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Search, CheckCircle, Store, Banknote } from "lucide-react";

export const Route = createFileRoute("/app/vendas-parceiros")({
  head: () => ({ meta: [{ title: "Vendas Parceiros — VIVAVERDE ERP" }] }),
  component: VendasParceiros,
});

function VendasParceiros() {
  const [vendas, setVendas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState("");

  const fetchVendas = async () => {
    try {
      const { data, error } = await supabase
        .from('vendas')
        .select(`
          *,
          cliente:clientes(nome),
          vendedor:vendedores(nome)
        `)
        .not('vendedor_id', 'is', null)
        .order('created_at', { ascending: false });
        
      if (data) setVendas(data);
      if (error) console.error("Erro ao buscar vendas de parceiros:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVendas();
  }, []);

  const handlePagarComissao = async (id: string, vendedor_id: string, valorComissao: number) => {
    if (!confirm("Confirmar o pagamento desta comissão ao parceiro?")) return;
    try {
      const { error } = await supabase.from('vendas').update({ status_pagamento_comissao: 'Paga' }).eq('id', id);
      if (error) throw error;
      
      const { data: vendedor } = await supabase.from('vendedores').select('comissoes_pendentes').eq('id', vendedor_id).single();
      if (vendedor) {
        const novaComissaoPendente = Math.max(0, (vendedor.comissoes_pendentes || 0) - valorComissao);
        await supabase.from('vendedores').update({ comissoes_pendentes: novaComissaoPendente }).eq('id', vendedor_id);
      }
      
      fetchVendas();
    } catch (err: any) {
      alert("Erro ao pagar comissão: " + err.message);
    }
  };

  const vendasFiltradas = vendas.filter(v => 
    v.id.toLowerCase().includes(filtro.toLowerCase()) || 
    (v.vendedor?.nome || "").toLowerCase().includes(filtro.toLowerCase()) ||
    (v.cliente?.nome || "").toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <>
      <PageHeader 
        title="Vendas dos Parceiros" 
        subtitle="Auditoria geral de todas as vendas e comissões dos vendedores."
      />

      <Card className="shadow-card mb-6">
        <CardContent className="p-4 flex gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input 
              placeholder="Buscar por vendedor, cliente ou nº do pedido..." 
              value={filtro}
              onChange={e => setFiltro(e.target.value)}
              className="pl-9" 
            />
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-card overflow-hidden">
        <CardHeader>
          <CardTitle>Histórico de Vendas (Parceiros)</CardTitle>
        </CardHeader>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Pedido Nº / Data</TableHead>
              <TableHead>Parceiro</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Status Venda</TableHead>
              <TableHead className="text-right">Valor Venda</TableHead>
              <TableHead className="text-right">Comissão</TableHead>
              <TableHead className="text-center">Status Pagto.</TableHead>
              <TableHead className="text-right">Ação</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow><TableCell colSpan={8} className="text-center py-8">Carregando histórico...</TableCell></TableRow>
            ) : vendasFiltradas.length === 0 ? (
              <TableRow><TableCell colSpan={8} className="text-center py-8 text-muted-foreground">Nenhuma venda de parceiro encontrada.</TableCell></TableRow>
            ) : vendasFiltradas.map((v) => (
              <TableRow key={v.id}>
                <TableCell>
                  <p className="font-mono text-xs font-medium">#{v.id.substring(0,8).toUpperCase()}</p>
                  <p className="text-xs text-muted-foreground">{new Date(v.created_at).toLocaleDateString()}</p>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Store className="h-4 w-4 text-brand" />
                    <span className="font-semibold">{v.vendedor?.nome || 'Desconhecido'}</span>
                  </div>
                </TableCell>
                <TableCell>{v.cliente?.nome || 'Consumidor Final'}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={
                    v.status === 'Faturado' || v.status === 'Pago' || v.status === 'Entregue' ? 'border-success text-success bg-success/10' :
                    v.status === 'Pendente' || v.status === 'Aguardando Pagamento' ? 'border-warning text-warning bg-warning/10' :
                    v.status === 'Rejeitada' || v.status === 'Cancelado' ? 'border-destructive text-destructive bg-destructive/10' :
                    'border-info text-info bg-info/10'
                  }>
                    {v.status || v.status_aprovacao || 'Indefinido'}
                  </Badge>
                </TableCell>
                <TableCell className="text-right font-medium">
                  R$ {Number(v.valor_total).toFixed(2)}
                </TableCell>
                <TableCell className="text-right text-brand font-bold">
                  R$ {Number(v.valor_comissao || 0).toFixed(2)}
                </TableCell>
                <TableCell className="text-center">
                  {v.status_pagamento_comissao === 'Paga' ? (
                    <Badge variant="outline" className="border-success text-success bg-success/10">Paga</Badge>
                  ) : (
                    <Badge variant="outline" className="border-warning text-warning bg-warning/10">Pendente</Badge>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  {v.status_aprovacao === 'Aprovada' && v.status_pagamento_comissao !== 'Paga' && (
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="text-success border-success/30 hover:bg-success/10"
                      onClick={() => handlePagarComissao(v.id, v.vendedor_id, Number(v.valor_comissao))}
                    >
                      <Banknote className="h-4 w-4 mr-1" /> Pagar
                    </Button>
                  )}
                  {v.status_pagamento_comissao === 'Paga' && (
                    <span className="text-xs text-muted-foreground font-medium flex items-center justify-end gap-1"><CheckCircle className="h-3 w-3 text-success"/> Quitado</span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </>
  );
}

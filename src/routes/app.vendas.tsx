import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/app-shell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Calculator, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useConfirm } from "@/contexts/ConfirmContext";

export const Route = createFileRoute("/app/vendas")({
  head: () => ({ meta: [{ title: "Vendas — VIVAVERDE ERP" }] }),
  component: Vendas,
});

function Vendas() {
  const confirm = useConfirm();
  const [vendas, setVendas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchVendas = async () => {
    try {
      // Usando junção (join) com clientes para pegar o nome
      const { data, error } = await supabase
        .from('vendas')
        .select(`*, clientes (nome)`)
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      setVendas(data || []);
    } catch (err: any) {
      console.error(err);
      alert("Erro ao buscar vendas.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVendas();
  }, []);

  const handleDelete = async (id: string, tipo: string) => {
    if (!await confirm({ description: `Tem certeza que deseja excluir est${tipo === 'DAV' ? 'e orçamento' : 'a venda'}?`, variant: 'destructive' })) return;
    try {
      const { error } = await supabase.from('vendas').delete().eq('id', id);
      if (error) throw error;
      fetchVendas();
    } catch (err: any) {
      alert("Erro ao deletar: " + err.message);
    }
  };

  const getTone = (status: string) => {
    if (status === 'Pago' || status === 'Faturado') return "bg-success/15 text-success border-0";
    if (status === 'Aguardando Pagamento' || status === 'Aprovado') return "bg-warning/15 text-warning border-0";
    if (status === 'Rejeitado' || status === 'Cancelado') return "bg-destructive/10 text-destructive border-0";
    return "bg-info/15 text-info border-0"; // Orçamento ou Em separação
  };

  return (
    <>
      <PageHeader title="Vendas" subtitle="Pedidos, orçamentos e faturamento" actions={
        <>
          <Button variant="outline" asChild><Link to="/app/venda-nova"><Calculator className="mr-2 h-4 w-4" />Novo Orçamento (DAV)</Link></Button>
          <Button className="bg-gradient-brand text-primary-foreground" asChild><Link to="/app/venda-nova"><Plus className="mr-2 h-4 w-4" />Nova Venda</Link></Button>
        </>
      } />
      <Card className="shadow-card overflow-x-auto">
        <Table>
          <TableHeader><TableRow>
            <TableHead>Nº</TableHead><TableHead>Tipo</TableHead><TableHead>Cliente</TableHead>
            <TableHead>Data</TableHead><TableHead className="text-right">Valor</TableHead>
            <TableHead>Status</TableHead><TableHead className="text-right">Ações</TableHead>
          </TableRow></TableHeader>
          <TableBody>
            {loading ? (
              <TableRow><TableCell colSpan={7} className="text-center py-8">Carregando operações...</TableCell></TableRow>
            ) : vendas.length === 0 ? (
              <TableRow><TableCell colSpan={7} className="text-center py-8 text-muted-foreground">Nenhuma venda ou orçamento encontrado.</TableCell></TableRow>
            ) : vendas.map((v) => (
              <TableRow key={v.id}>
                <TableCell className="font-mono text-xs">{v.id.substring(0,8).toUpperCase()}</TableCell>
                <TableCell><Badge variant="outline">{v.tipo}</Badge></TableCell>
                <TableCell className="font-semibold">{v.clientes?.nome || "Cliente Removido"}</TableCell>
                <TableCell>{new Date(v.created_at).toLocaleDateString()}</TableCell>
                <TableCell className="text-right font-semibold">R$ {Number(v.valor_total).toFixed(2).replace('.', ',')}</TableCell>
                <TableCell><Badge className={getTone(v.status)}>{v.status}</Badge></TableCell>
                <TableCell className="text-right">
                   <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => handleDelete(v.id, v.tipo)}><Trash2 className="h-4 w-4" /></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </>
  );
}

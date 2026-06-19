import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/app-shell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, CheckCircle2, PackageCheck, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useConfirm } from "@/contexts/ConfirmContext";

export const Route = createFileRoute("/app/compras")({
  head: () => ({ meta: [{ title: "Compras — VIVAVERDE ERP" }] }),
  component: Compras,
});

function Compras() {
  const confirm = useConfirm();
  const [compras, setCompras] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCompras = async () => {
    try {
      const { data, error } = await supabase
        .from('compras')
        .select(`*, fornecedores (empresa)`)
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      setCompras(data || []);
    } catch (err: any) {
      console.error(err);
      alert("Erro ao buscar compras.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompras();
  }, []);

  const handleDelete = async (id: string) => {
    if (!await confirm({ description: "Tem certeza que deseja excluir esta compra?", variant: "destructive" })) return;
    try {
      const { error } = await supabase.from('compras').delete().eq('id', id);
      if (error) throw error;
      fetchCompras();
    } catch (err: any) {
      alert("Erro ao deletar: " + err.message);
    }
  };

  const getTone = (status: string) => {
    if (status === 'Recebido') return "bg-success/15 text-success border-0";
    if (status === 'Em trânsito') return "bg-info/15 text-info border-0";
    if (status === 'Aprovado') return "bg-primary/10 text-primary border-0";
    return "bg-warning/15 text-warning border-0"; // Pendente
  };

  return (
    <>
      <PageHeader title="Compras" subtitle="Pedidos de compra e recebimento de mercadorias" actions={
        <>
          <Button variant="outline"><CheckCircle2 className="mr-2 h-4 w-4" />Aprovar</Button>
          <Button className="bg-gradient-brand text-primary-foreground" asChild>
            <Link to="/app/compra-nova"><Plus className="mr-2 h-4 w-4" />Nova Compra</Link>
          </Button>
        </>
      } />
      <Card className="shadow-card overflow-x-auto">
        <Table>
          <TableHeader><TableRow>
            <TableHead>Nº</TableHead><TableHead>Fornecedor</TableHead>
            <TableHead>Data</TableHead><TableHead className="text-right">Valor</TableHead>
            <TableHead>Status</TableHead><TableHead className="text-right">Ações</TableHead>
          </TableRow></TableHeader>
          <TableBody>
            {loading ? (
              <TableRow><TableCell colSpan={6} className="text-center py-8">Carregando compras...</TableCell></TableRow>
            ) : compras.length === 0 ? (
              <TableRow><TableCell colSpan={6} className="text-center py-8 text-muted-foreground">Nenhuma compra registrada.</TableCell></TableRow>
            ) : compras.map((o) => (
              <TableRow key={o.id}>
                <TableCell className="font-mono text-xs">{o.id.substring(0,8).toUpperCase()}</TableCell>
                <TableCell className="font-semibold">{o.fornecedores?.empresa || "Fornecedor Removido"}</TableCell>
                <TableCell>{new Date(o.created_at).toLocaleDateString()}</TableCell>
                <TableCell className="text-right font-semibold">R$ {Number(o.valor_total).toFixed(2).replace('.', ',')}</TableCell>
                <TableCell><Badge className={getTone(o.status)}>{o.status}</Badge></TableCell>
                <TableCell className="text-right">
                   <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => handleDelete(o.id)}>
                     <Trash2 className="h-4 w-4" />
                   </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </>
  );
}

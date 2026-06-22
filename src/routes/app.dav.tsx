import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/app-shell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Printer, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useConfirm } from "@/contexts/ConfirmContext";

export const Route = createFileRoute("/app/dav")({
  head: () => ({ meta: [{ title: "Orçamentos (DAV) — VIVAVERDE ERP" }] }),
  validateSearch: (search: Record<string, unknown>) => ({
    id: search.id as string | undefined,
  }),
  component: DAVList,
});

function DAVList() {
  const confirm = useConfirm();
  const [davs, setDavs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDavs = async () => {
    try {
      const { data, error } = await supabase
        .from('davs')
        .select('*');

      if (error) throw error;
      // Ordena no cliente pelo campo que existir
      const sorted = (data || []).sort((a: any, b: any) => {
        const dateA = a.created_at || a.data || a.validade || "";
        const dateB = b.created_at || b.data || b.validade || "";
        return dateB.localeCompare(dateA);
      });
      setDavs(sorted);
    } catch (err: any) {
      console.error(err);
      alert("Erro ao buscar orçamentos: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDavs();
  }, []);

  const handleDelete = async (id: string) => {
    if (!await confirm({ description: "Tem certeza que deseja excluir este orçamento?", variant: "destructive" })) return;
    try {
      // Remover itens primeiro (FK)
      await supabase.from('dav_items').delete().eq('dav_id', id);
      const { error } = await supabase.from('davs').delete().eq('id', id);
      if (error) throw error;
      fetchDavs();
    } catch (err: any) {
      alert("Erro ao deletar: " + err.message);
    }
  };

  const getStatusTone = (status: string) => {
    if (status === 'Aprovado') return "bg-success/15 text-success border-0";
    if (status === 'Rejeitado') return "bg-destructive/10 text-destructive border-0";
    return "bg-info/15 text-info border-0";
  };

  return (
    <>
      <PageHeader title="Orçamentos (DAV)" subtitle="Documentos Auxiliares de Venda" actions={
        <Button className="bg-gradient-brand text-primary-foreground" asChild>
          <Link to="/app/dav-novo"><Plus className="mr-2 h-4 w-4" />Novo DAV</Link>
        </Button>
      } />
      <Card className="shadow-card overflow-x-auto">
        <Table>
          <TableHeader><TableRow>
            <TableHead>Nº</TableHead>
            <TableHead>Cliente</TableHead>
            <TableHead>Data</TableHead>
            <TableHead className="text-right">Valor</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow></TableHeader>
          <TableBody>
            {loading ? (
              <TableRow><TableCell colSpan={6} className="text-center py-8">Carregando DAVs...</TableCell></TableRow>
            ) : davs.length === 0 ? (
              <TableRow><TableCell colSpan={6} className="text-center py-8 text-muted-foreground">Nenhum orçamento encontrado.</TableCell></TableRow>
            ) : davs.map((d) => (
              <TableRow key={d.id}>
                <TableCell className="font-mono text-xs">{d.id.substring(0, 8).toUpperCase()}</TableCell>
                <TableCell className="font-semibold">{d.cliente_nome || "—"}</TableCell>
                <TableCell>{new Date(d.created_at).toLocaleDateString('pt-BR')}</TableCell>
                <TableCell className="text-right font-semibold">
                  R$ {Number(d.total || 0).toFixed(2).replace('.', ',')}
                </TableCell>
                <TableCell>
                  <Badge className={getStatusTone(d.status || 'Aberto')}>
                    {d.status || 'Aberto'}
                  </Badge>
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-primary">
                    <Printer className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => handleDelete(d.id)}>
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

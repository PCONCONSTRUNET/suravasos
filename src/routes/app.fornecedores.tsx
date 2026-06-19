import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/app-shell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Pencil, History, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useConfirm } from "@/contexts/ConfirmContext";

export const Route = createFileRoute("/app/fornecedores")({
  head: () => ({ meta: [{ title: "Fornecedores — VIVAVERDE ERP" }] }),
  component: Fornecedores,
});

function Fornecedores() {
  const confirm = useConfirm();
  const [fornecedores, setFornecedores] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchFornecedores = async () => {
    try {
      const { data, error } = await supabase.from('fornecedores').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      setFornecedores(data || []);
    } catch (err: any) {
      console.error(err);
      alert("Erro ao buscar fornecedores.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFornecedores();
  }, []);

  const handleDelete = async (id: string) => {
    if (!await confirm({ description: "Tem certeza que deseja excluir este fornecedor?", variant: "destructive" })) return;
    try {
      const { error } = await supabase.from('fornecedores').delete().eq('id', id);
      if (error) throw error;
      fetchFornecedores();
    } catch (err: any) {
      alert("Erro ao deletar: " + err.message);
    }
  };

  return (
    <>
      <PageHeader title="Fornecedores" subtitle={`${fornecedores.length} parceiros homologados`} actions={
        <Button asChild className="bg-gradient-brand text-primary-foreground">
          <Link to="/app/fornecedor-novo"><Plus className="mr-2 h-4 w-4" />Novo Fornecedor</Link>
        </Button>
      } />
      <Card className="shadow-card overflow-x-auto">
        <Table>
          <TableHeader><TableRow>
            <TableHead>Empresa</TableHead><TableHead>Contato</TableHead><TableHead>Cidade</TableHead>
            <TableHead>Última Compra</TableHead><TableHead className="text-right">Valor Movimentado</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow></TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">Carregando fornecedores...</TableCell>
              </TableRow>
            ) : fornecedores.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">Nenhum fornecedor cadastrado ainda.</TableCell>
              </TableRow>
            ) : fornecedores.map((d) => (
              <TableRow key={d.id}>
                <TableCell className="font-semibold">{d.empresa}</TableCell>
                <TableCell>{d.contato || "-"}</TableCell>
                <TableCell className="text-muted-foreground">{d.cidade || "-"}</TableCell>
                <TableCell>{d.ultima_compra ? new Date(d.ultima_compra).toLocaleDateString() : "-"}</TableCell>
                <TableCell className="text-right font-semibold">R$ {Number(d.valor_total).toFixed(2).replace('.', ',')}</TableCell>
                <TableCell className="text-right">
                  <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive" onClick={() => handleDelete(d.id)}>
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

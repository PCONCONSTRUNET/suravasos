import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/app-shell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Search, FileText, Download, Printer, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useConfirm } from "@/contexts/ConfirmContext";
import { FaWhatsapp } from "react-icons/fa";

export const Route = createFileRoute("/app/dav")({
  head: () => ({ meta: [{ title: "Orçamentos (DAV) — VIVAVERDE ERP" }] }),
  component: DAVList,
});

function DAVList() {
  const confirm = useConfirm();
  const [davs, setDavs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDavs = async () => {
    try {
      const { data, error } = await supabase
        .from('vendas')
        .select(`*, clientes (nome)`)
        .eq('tipo', 'DAV')
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      setDavs(data || []);
    } catch (err: any) {
      console.error(err);
      alert("Erro ao buscar orçamentos.");
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
      const { error } = await supabase.from('vendas').delete().eq('id', id);
      if (error) throw error;
      fetchDavs();
    } catch (err: any) {
      alert("Erro ao deletar: " + err.message);
    }
  };

  const handleShareWhatsApp = async (venda: any) => {
    try {
      const { data: itens } = await supabase.from('vendas_itens').select('*, produtos(nome)').eq('venda_id', venda.id);
      
      let msg = `*ORÇAMENTO - VIVAVERDE VASOS*\n`;
      msg += `Nº: ${venda.id.substring(0, 8).toUpperCase()}\n`;
      msg += `Data: ${new Date(venda.created_at).toLocaleDateString()}\n\n`;
      msg += `*ITENS DO ORÇAMENTO:*\n`;
      
      if (itens) {
        itens.forEach(item => {
           msg += `• ${item.quantidade}x ${item.produtos?.nome || 'Produto'} - R$ ${Number(item.subtotal).toFixed(2).replace('.', ',')}\n`;
        });
      }
      
      msg += `\n*TOTAL: R$ ${Number(venda.valor_total).toFixed(2).replace('.', ',')}*\n\n`;
      
      // Adiciona o link para visualização/PDF online (se estiver publicado, o cliente pode abrir)
      const linkPdf = `${window.location.origin}/app/imprimir-dav/${venda.id}`;
      msg += `📄 *Acesse o documento formal em PDF aqui:*\n${linkPdf}`;

      const url = `https://wa.me/?text=${encodeURIComponent(msg)}`;
      window.open(url, '_blank');
    } catch (err) {
      console.error(err);
      alert("Erro ao gerar mensagem do WhatsApp");
    }
  };

  const getTone = (status: string) => {
    if (status === 'Aprovado') return "bg-success/15 text-success border-0";
    if (status === 'Rejeitado') return "bg-destructive/10 text-destructive border-0";
    return "bg-info/15 text-info border-0"; // Orçamento Aberto
  };

  return (
    <>
      <PageHeader title="Orçamentos (DAV)" subtitle="Documentos Auxiliares de Venda" actions={
        <Button className="bg-gradient-brand text-primary-foreground" asChild>
          <Link to="/app/venda-nova"><Plus className="mr-2 h-4 w-4" />Novo DAV</Link>
        </Button>
      } />
      <Card className="shadow-card overflow-x-auto">
        <Table>
          <TableHeader><TableRow>
            <TableHead>Nº</TableHead><TableHead>Cliente</TableHead>
            <TableHead>Data</TableHead><TableHead className="text-right">Valor</TableHead>
            <TableHead>Status</TableHead><TableHead className="text-right">Ações</TableHead>
          </TableRow></TableHeader>
          <TableBody>
            {loading ? (
              <TableRow><TableCell colSpan={6} className="text-center py-8">Carregando DAVs...</TableCell></TableRow>
            ) : davs.length === 0 ? (
              <TableRow><TableCell colSpan={6} className="text-center py-8 text-muted-foreground">Nenhum orçamento encontrado.</TableCell></TableRow>
            ) : davs.map((v) => (
              <TableRow key={v.id}>
                <TableCell className="font-mono text-xs">{v.id.substring(0,8).toUpperCase()}</TableCell>
                <TableCell className="font-semibold">{v.clientes?.nome || "Cliente Removido"}</TableCell>
                <TableCell>{new Date(v.created_at).toLocaleDateString()}</TableCell>
                <TableCell className="text-right font-semibold">R$ {Number(v.valor_total).toFixed(2).replace('.', ',')}</TableCell>
                <TableCell><Badge className={getTone(v.status)}>{v.status}</Badge></TableCell>
                <TableCell className="text-right space-x-2">
                   <Button variant="ghost" size="icon" className="h-8 w-8 text-primary" onClick={() => handleShareWhatsApp(v)}>
                     <FaWhatsapp className="h-4 w-4 text-green-500" />
                   </Button>
                   <Button variant="ghost" size="icon" className="h-8 w-8 text-primary" asChild>
                     <Link to={`/app/imprimir-dav/${v.id}`} target="_blank"><Printer className="h-4 w-4" /></Link>
                   </Button>
                   <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => handleDelete(v.id)}>
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

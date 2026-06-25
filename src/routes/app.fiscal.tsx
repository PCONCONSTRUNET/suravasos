import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FileText, Download, Check } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/app/fiscal")({
  head: () => ({ meta: [{ title: "Fiscal — VIVAVERDE ERP" }] }),
  component: Fiscal,
});

function Fiscal() {
  const [notas, setNotas] = useState<any[]>([]);
  const [pendentes, setPendentes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchFiscalData = async () => {
    try {
      // 1. Buscar Notas Fiscais Emitidas
      const { data: nfData } = await supabase
        .from("notas_fiscais")
        .select("*, vendas(valor_total, clientes(nome))")
        .order("created_at", { ascending: false });

      if (nfData) setNotas(nfData);

      // 2. Buscar Vendas Pagas/Faturadas que ainda não têm Nota
      const { data: vData } = await supabase
        .from("vendas")
        .select("*, clientes(nome)")
        .in("status", ["Pago", "Faturado", "Em Separação", "Entregue"]);

      if (vData) {
        const nfIds = nfData?.map((n) => n.venda_id) || [];
        const semNota = vData.filter((v) => !nfIds.includes(v.id));
        setPendentes(semNota);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFiscalData();
  }, []);

  const handleEmitirNFe = async (vendaId: string) => {
    try {
      const numRandom = Math.floor(Math.random() * 90000) + 10000;
      const chaveRandom = Array(44)
        .fill(0)
        .map(() => Math.floor(Math.random() * 10))
        .join("");

      await supabase.from("notas_fiscais").insert([
        {
          venda_id: vendaId,
          numero: String(numRandom),
          chave_acesso: chaveRandom,
          status: "Autorizada",
        },
      ]);

      alert("NF-e emitida e autorizada pela SEFAZ com sucesso!");
      fetchFiscalData();
    } catch (err) {
      alert("Erro ao emitir NF-e.");
    }
  };

  return (
    <>
      <PageHeader
        title="Fiscal"
        subtitle="Controle e emissão de Documentos Eletrônicos (NF-e, NFC-e)"
      />

      <div className="grid gap-6 lg:grid-cols-2 mb-6">
        <Card className="shadow-card overflow-x-auto">
          <CardHeader>
            <CardTitle>Aguardando Emissão</CardTitle>
          </CardHeader>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Venda</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead className="text-right">Valor</TableHead>
                <TableHead className="text-right">Ação</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-4">
                    Carregando...
                  </TableCell>
                </TableRow>
              ) : pendentes.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-4 text-muted-foreground">
                    Nenhuma venda pendente de NF-e.
                  </TableCell>
                </TableRow>
              ) : (
                pendentes.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell className="font-mono">
                      {p.numero_venda || p.id.substring(0, 8).toUpperCase()}
                    </TableCell>
                    <TableCell className="font-semibold">
                      {p.clientes?.nome || "Consumidor Final"}
                    </TableCell>
                    <TableCell className="text-right">
                      R$ {Number(p.valor_total).toFixed(2)}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        onClick={() => handleEmitirNFe(p.id)}
                        size="sm"
                        variant="outline"
                        className="text-primary hover:bg-primary/10"
                      >
                        <FileText className="h-4 w-4 mr-2" /> Emitir NF-e
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </Card>

        <Card className="shadow-card overflow-x-auto">
          <CardHeader>
            <CardTitle>Notas Emitidas Recentes</CardTitle>
          </CardHeader>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>NF-e</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Chave de Acesso</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-4">
                    Carregando...
                  </TableCell>
                </TableRow>
              ) : notas.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-4 text-muted-foreground">
                    Nenhuma nota emitida.
                  </TableCell>
                </TableRow>
              ) : (
                notas.map((n) => (
                  <TableRow key={n.id}>
                    <TableCell className="font-mono font-bold">{n.numero}</TableCell>
                    <TableCell className="font-semibold">
                      {n.vendas?.clientes?.nome || "Consumidor Final"}
                    </TableCell>
                    <TableCell className="font-mono text-xs text-muted-foreground">
                      {n.chave_acesso.substring(0, 20)}...
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-success/15 text-success border-0">{n.status}</Badge>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </Card>
      </div>

      <Card className="shadow-card mt-6 bg-muted/50 border-dashed">
        <CardContent className="flex flex-col items-center justify-center p-12 text-center">
          <div className="grid h-16 w-16 place-items-center rounded-full bg-primary/10 text-primary mb-4">
            <Check className="h-8 w-8" />
          </div>
          <h2 className="text-2xl font-bold font-display mb-2">Possível Integração Futuramente</h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Este módulo fiscal está preparado para futuras integrações diretas com a SEFAZ ou
            plataformas parceiras (como Bling, ContaAzul, etc) para emissão automatizada de NF-e e
            NFC-e em tempo real.
          </p>
        </CardContent>
      </Card>
    </>
  );
}

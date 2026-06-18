import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/app-shell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, FileText, Calculator } from "lucide-react";

export const Route = createFileRoute("/app/vendas")({
  head: () => ({ meta: [{ title: "Vendas — VIVAVERDE ERP" }] }),
  component: Vendas,
});

const orders = [
  { n: "#10428", c: "Jardim Verde Ltda", d: "18/06/2026", v: "R$ 4.820,00", st: "Pago", tone: "success" },
  { n: "#10427", c: "Floricultura Rosa", d: "18/06/2026", v: "R$ 1.234,50", st: "Em separação", tone: "info" },
  { n: "#10426", c: "Garden Center BH", d: "17/06/2026", v: "R$ 8.940,00", st: "Faturado", tone: "primary" },
  { n: "#10425", c: "Sítio das Flores", d: "17/06/2026", v: "R$ 642,90", st: "Aguardando pgto", tone: "warning" },
  { n: "#10424", c: "Vivero Paulista", d: "16/06/2026", v: "R$ 12.380,00", st: "Pago", tone: "success" },
  { n: "#10423", c: "Verde & Vida", d: "16/06/2026", v: "R$ 982,40", st: "Cancelado", tone: "destructive" },
];

function Vendas() {
  const tones: Record<string, string> = {
    success: "bg-success/15 text-success border-0",
    info: "bg-info/15 text-info border-0",
    primary: "bg-primary/10 text-primary border-0",
    warning: "bg-warning/15 text-warning border-0",
    destructive: "bg-destructive/10 text-destructive border-0",
  };
  return (
    <>
      <PageHeader title="Vendas" subtitle="Pedidos, orçamentos e faturamento" actions={
        <>
          <Button variant="outline"><Calculator className="mr-2 h-4 w-4" />Novo Orçamento</Button>
          <Button variant="outline" asChild><Link to="/app/dav"><FileText className="mr-2 h-4 w-4" />Gerar DAV</Link></Button>
          <Button className="bg-gradient-brand text-primary-foreground"><Plus className="mr-2 h-4 w-4" />Novo Pedido</Button>
        </>
      } />
      <Card className="shadow-card overflow-x-auto">
        <Table>
          <TableHeader><TableRow>
            <TableHead>Pedido</TableHead><TableHead>Cliente</TableHead>
            <TableHead>Data</TableHead><TableHead className="text-right">Valor</TableHead>
            <TableHead>Status</TableHead>
          </TableRow></TableHeader>
          <TableBody>
            {orders.map((o) => (
              <TableRow key={o.n}>
                <TableCell className="font-mono">{o.n}</TableCell>
                <TableCell className="font-semibold">{o.c}</TableCell>
                <TableCell>{o.d}</TableCell>
                <TableCell className="text-right font-semibold">{o.v}</TableCell>
                <TableCell><Badge className={tones[o.tone]}>{o.st}</Badge></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </>
  );
}

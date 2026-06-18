import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/app-shell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, CheckCircle2, PackageCheck } from "lucide-react";

export const Route = createFileRoute("/app/compras")({
  head: () => ({ meta: [{ title: "Compras — SURA ERP" }] }),
  component: Compras,
});

const orders = [
  { n: "PC-2842", f: "Plasvale Indústria", d: "12/06/2026", v: "R$ 84.200,00", st: "Recebido", tone: "success" },
  { n: "PC-2841", f: "Nutriplan Vasos", d: "10/06/2026", v: "R$ 32.480,00", st: "Em trânsito", tone: "info" },
  { n: "PC-2840", f: "Cerâmica do Sul", d: "08/06/2026", v: "R$ 18.940,00", st: "Aprovado", tone: "primary" },
  { n: "PC-2839", f: "JardiPlast Brasil", d: "05/06/2026", v: "R$ 56.700,00", st: "Aguardando", tone: "warning" },
  { n: "PC-2838", f: "Flora Acessórios", d: "01/06/2026", v: "R$ 9.820,00", st: "Recebido", tone: "success" },
];

function Compras() {
  const tones: Record<string, string> = {
    success: "bg-success/15 text-success border-0",
    info: "bg-info/15 text-info border-0",
    primary: "bg-primary/10 text-primary border-0",
    warning: "bg-warning/15 text-warning border-0",
  };
  return (
    <>
      <PageHeader title="Compras" subtitle="Pedidos de compra e recebimento" actions={
        <>
          <Button variant="outline"><CheckCircle2 className="mr-2 h-4 w-4" />Aprovar</Button>
          <Button variant="outline"><PackageCheck className="mr-2 h-4 w-4" />Receber</Button>
          <Button className="bg-gradient-brand text-primary-foreground"><Plus className="mr-2 h-4 w-4" />Nova Compra</Button>
        </>
      } />
      <Card className="shadow-card overflow-x-auto">
        <Table>
          <TableHeader><TableRow>
            <TableHead>Pedido</TableHead><TableHead>Fornecedor</TableHead>
            <TableHead>Data</TableHead><TableHead className="text-right">Valor</TableHead>
            <TableHead>Status</TableHead>
          </TableRow></TableHeader>
          <TableBody>
            {orders.map((o) => (
              <TableRow key={o.n}>
                <TableCell className="font-mono">{o.n}</TableCell>
                <TableCell className="font-semibold">{o.f}</TableCell>
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

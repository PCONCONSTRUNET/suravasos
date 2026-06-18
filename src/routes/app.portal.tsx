import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, Truck, FileText, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/app/portal")({
  head: () => ({ meta: [{ title: "Portal do Cliente — SURA ERP" }] }),
  component: Portal,
});

const orders = [
  { n: "#10428", d: "18/06/2026", v: "R$ 4.820,00", s: "Em separação", step: 2 },
  { n: "#10410", d: "10/06/2026", v: "R$ 2.140,00", s: "Entregue", step: 4 },
  { n: "#10384", d: "28/05/2026", v: "R$ 6.890,00", s: "Entregue", step: 4 },
  { n: "#10342", d: "12/05/2026", v: "R$ 1.420,00", s: "Entregue", step: 4 },
];

const steps = ["Recebido", "Em separação", "Em rota", "Entregue"];

function Portal() {
  return (
    <>
      <PageHeader title="Portal do Cliente" subtitle="Visão como Jardim Verde Ltda" />

      <div className="grid gap-4 sm:grid-cols-3 mb-6">
        {[
          { l: "Pedidos no ano", v: "32", i: FileText, c: "text-primary" },
          { l: "Total comprado", v: "R$ 84.200", i: CheckCircle2, c: "text-success" },
          { l: "Em rota", v: "1", i: Truck, c: "text-info" },
        ].map((k) => (
          <Card key={k.l} className="shadow-card"><CardContent className="p-5 flex items-center gap-4">
            <k.i className={`h-8 w-8 ${k.c}`} />
            <div><p className="text-sm text-muted-foreground">{k.l}</p>
            <p className={`font-display text-2xl font-bold ${k.c}`}>{k.v}</p></div>
          </CardContent></Card>
        ))}
      </div>

      <Card className="shadow-card mb-6">
        <CardHeader><CardTitle>Acompanhar pedido #10428</CardTitle></CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            {steps.map((s, i) => (
              <div key={s} className="flex-1 flex items-center">
                <div className="flex flex-col items-center gap-2">
                  <div className={`grid h-10 w-10 place-items-center rounded-full text-sm font-bold ${i <= 1 ? "bg-gradient-brand text-primary-foreground" : "bg-secondary text-muted-foreground"}`}>
                    {i + 1}
                  </div>
                  <p className="text-xs font-medium text-center whitespace-nowrap">{s}</p>
                </div>
                {i < steps.length - 1 && (
                  <div className={`flex-1 h-1 mx-2 rounded-full ${i < 1 ? "bg-gradient-brand" : "bg-secondary"}`} />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-card overflow-x-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Meus pedidos</CardTitle>
        </CardHeader>
        <Table>
          <TableHeader><TableRow>
            <TableHead>Pedido</TableHead><TableHead>Data</TableHead>
            <TableHead className="text-right">Valor</TableHead><TableHead>Status</TableHead>
            <TableHead className="text-right">Nota Fiscal</TableHead>
          </TableRow></TableHeader>
          <TableBody>
            {orders.map((o) => (
              <TableRow key={o.n}>
                <TableCell className="font-mono">{o.n}</TableCell>
                <TableCell>{o.d}</TableCell>
                <TableCell className="text-right font-semibold">{o.v}</TableCell>
                <TableCell>
                  <Badge className={o.step === 4 ? "bg-success/15 text-success border-0" : "bg-info/15 text-info border-0"}>{o.s}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm"><Download className="mr-1.5 h-3.5 w-3.5" />XML/PDF</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </>
  );
}

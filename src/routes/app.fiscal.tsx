import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/app-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileText, Download } from "lucide-react";

export const Route = createFileRoute("/app/fiscal")({
  head: () => ({ meta: [{ title: "Fiscal — SURA ERP" }] }),
  component: Fiscal,
});

const docs = [
  { n: "00012842", c: "Jardim Verde Ltda", d: "18/06/2026", v: "R$ 4.820,00", st: "Autorizada", t: "success" },
  { n: "00012841", c: "Floricultura Rosa", d: "18/06/2026", v: "R$ 1.234,50", st: "Autorizada", t: "success" },
  { n: "00012840", c: "Garden Center BH", d: "17/06/2026", v: "R$ 8.940,00", st: "Autorizada", t: "success" },
  { n: "00012839", c: "Sítio das Flores", d: "17/06/2026", v: "R$ 642,90", st: "Rejeitada", t: "destructive" },
  { n: "00012838", c: "Vivero Paulista", d: "16/06/2026", v: "R$ 12.380,00", st: "Em processamento", t: "warning" },
];

function Fiscal() {
  const tones: Record<string, string> = {
    success: "bg-success/15 text-success border-0",
    destructive: "bg-destructive/10 text-destructive border-0",
    warning: "bg-warning/15 text-warning border-0",
  };
  return (
    <>
      <PageHeader title="Fiscal" subtitle="Documentos eletrônicos · SEFAZ-SP" actions={
        <Button className="bg-gradient-brand text-primary-foreground"><FileText className="mr-2 h-4 w-4" />Emitir NF-e</Button>
      } />

      <Tabs defaultValue="nfe">
        <TabsList>
          <TabsTrigger value="nfe">NF-e</TabsTrigger>
          <TabsTrigger value="nfce">NFC-e</TabsTrigger>
          <TabsTrigger value="mdfe">MDF-e</TabsTrigger>
        </TabsList>
        {["nfe", "nfce", "mdfe"].map((k) => (
          <TabsContent value={k} key={k} className="mt-4">
            <Card className="shadow-card overflow-x-auto">
              <Table>
                <TableHeader><TableRow>
                  <TableHead>Número</TableHead><TableHead>Cliente</TableHead>
                  <TableHead>Data</TableHead><TableHead className="text-right">Valor</TableHead>
                  <TableHead>Status</TableHead><TableHead className="text-right">Ações</TableHead>
                </TableRow></TableHeader>
                <TableBody>
                  {docs.map((d) => (
                    <TableRow key={d.n}>
                      <TableCell className="font-mono">{d.n}</TableCell>
                      <TableCell className="font-semibold">{d.c}</TableCell>
                      <TableCell>{d.d}</TableCell>
                      <TableCell className="text-right font-semibold">{d.v}</TableCell>
                      <TableCell><Badge className={tones[d.t]}>{d.st}</Badge></TableCell>
                      <TableCell className="text-right">
                        <Button size="icon" variant="ghost" className="h-8 w-8"><Download className="h-4 w-4" /></Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </>
  );
}

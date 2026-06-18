import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/app-shell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Pencil, History } from "lucide-react";

export const Route = createFileRoute("/app/fornecedores")({
  head: () => ({ meta: [{ title: "Fornecedores — SURA ERP" }] }),
  component: Fornecedores,
});

const data = [
  { e: "Plasvale Indústria", c: "Roberto Almeida", cd: "Joinville/SC", l: "12/06/2026", v: "R$ 84.200" },
  { e: "Nutriplan Vasos", c: "Mariana Costa", cd: "Holambra/SP", l: "08/06/2026", v: "R$ 32.480" },
  { e: "Cerâmica do Sul", c: "João Pereira", cd: "Caxias do Sul/RS", l: "01/06/2026", v: "R$ 18.940" },
  { e: "JardiPlast Brasil", c: "Carla Mendes", cd: "Bauru/SP", l: "28/05/2026", v: "R$ 56.700" },
  { e: "Flora Acessórios", c: "Lucas Dias", cd: "Atibaia/SP", l: "20/05/2026", v: "R$ 9.820" },
];

function Fornecedores() {
  return (
    <>
      <PageHeader title="Fornecedores" subtitle="48 parceiros homologados" actions={
        <Button className="bg-gradient-brand text-primary-foreground"><Plus className="mr-2 h-4 w-4" />Novo Fornecedor</Button>
      } />
      <Card className="shadow-card overflow-x-auto">
        <Table>
          <TableHeader><TableRow>
            <TableHead>Empresa</TableHead><TableHead>Contato</TableHead><TableHead>Cidade</TableHead>
            <TableHead>Última Compra</TableHead><TableHead className="text-right">Valor</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow></TableHeader>
          <TableBody>
            {data.map((d) => (
              <TableRow key={d.e}>
                <TableCell className="font-semibold">{d.e}</TableCell>
                <TableCell>{d.c}</TableCell>
                <TableCell className="text-muted-foreground">{d.cd}</TableCell>
                <TableCell>{d.l}</TableCell>
                <TableCell className="text-right font-semibold">{d.v}</TableCell>
                <TableCell className="text-right">
                  <Button size="icon" variant="ghost" className="h-8 w-8"><History className="h-4 w-4" /></Button>
                  <Button size="icon" variant="ghost" className="h-8 w-8"><Pencil className="h-4 w-4" /></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </>
  );
}

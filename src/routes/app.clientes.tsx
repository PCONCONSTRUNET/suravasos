import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/app-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Search, History, Pencil } from "lucide-react";

export const Route = createFileRoute("/app/clientes")({
  head: () => ({ meta: [{ title: "Clientes — VIVAVERDE ERP" }] }),
  component: Clientes,
});

const clients = [
  { n: "Jardim Verde Ltda", c: "São Paulo/SP", t: "(11) 98421-3344", lim: "R$ 25.000", last: "Hoje", st: "Ativo" },
  { n: "Floricultura Rosa", c: "Campinas/SP", t: "(19) 99812-4500", lim: "R$ 8.000", last: "Ontem", st: "Ativo" },
  { n: "Garden Center BH", c: "Belo Horizonte/MG", t: "(31) 98744-1212", lim: "R$ 60.000", last: "2 dias", st: "Premium" },
  { n: "Sítio das Flores", c: "Curitiba/PR", t: "(41) 99322-8800", lim: "R$ 12.000", last: "5 dias", st: "Ativo" },
  { n: "Vivero Paulista", c: "Sorocaba/SP", t: "(15) 98144-7711", lim: "R$ 80.000", last: "Hoje", st: "Premium" },
  { n: "Verde & Vida", c: "Ribeirão Preto/SP", t: "(16) 99244-3322", lim: "R$ 4.500", last: "12 dias", st: "Ativo" },
  { n: "Casa do Jardim", c: "Goiânia/GO", t: "(62) 98711-5544", lim: "R$ 18.000", last: "1 mês", st: "Inativo" },
];

function Clientes() {
  return (
    <>
      <PageHeader title="Clientes" subtitle="1.284 clientes ativos · 38 novos no mês" actions={
        <Button className="bg-gradient-brand text-primary-foreground"><Plus className="mr-2 h-4 w-4" />Novo Cliente</Button>
      } />
      <div className="grid gap-4 sm:grid-cols-4 mb-6">
        {[["Total", "1.284", "text-primary"], ["Premium", "84", "text-info"], ["Ativos", "1.124", "text-success"], ["Inadimplentes", "12", "text-destructive"]].map(([l, v, c]) => (
          <Card key={l} className="shadow-card"><CardContent className="p-5">
            <p className="text-sm text-muted-foreground">{l}</p>
            <p className={`mt-1 font-display text-2xl font-bold ${c}`}>{v}</p>
          </CardContent></Card>
        ))}
      </div>
      <Card className="shadow-card">
        <div className="flex flex-wrap gap-3 border-b p-4">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Buscar cliente…" className="pl-9" />
          </div>
          <Button variant="outline" size="sm">Cidade</Button>
          <Button variant="outline" size="sm">Status</Button>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader><TableRow>
              <TableHead>Nome</TableHead><TableHead>Cidade</TableHead><TableHead>Telefone</TableHead>
              <TableHead className="text-right">Limite de Crédito</TableHead><TableHead>Última Compra</TableHead>
              <TableHead>Status</TableHead><TableHead className="text-right">Ações</TableHead>
            </TableRow></TableHeader>
            <TableBody>
              {clients.map((c) => (
                <TableRow key={c.n}>
                  <TableCell><div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-gradient-brand grid place-items-center text-xs font-bold text-primary-foreground">{c.n.split(" ").map(x => x[0]).slice(0, 2).join("")}</div>
                    <span className="font-semibold">{c.n}</span>
                  </div></TableCell>
                  <TableCell className="text-muted-foreground">{c.c}</TableCell>
                  <TableCell className="font-mono text-sm">{c.t}</TableCell>
                  <TableCell className="text-right font-semibold">{c.lim}</TableCell>
                  <TableCell className="text-muted-foreground text-sm">{c.last}</TableCell>
                  <TableCell>
                    <Badge className={
                      c.st === "Premium" ? "bg-info/15 text-info border-0" :
                      c.st === "Ativo" ? "bg-success/15 text-success border-0" :
                      "bg-muted text-muted-foreground border-0"
                    }>{c.st}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button size="icon" variant="ghost" className="h-8 w-8"><History className="h-4 w-4" /></Button>
                    <Button size="icon" variant="ghost" className="h-8 w-8"><Pencil className="h-4 w-4" /></Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </>
  );
}

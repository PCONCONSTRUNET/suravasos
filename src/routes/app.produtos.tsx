import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/app-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Filter, Plus, Search, Pencil, Trash2, Package } from "lucide-react";

export const Route = createFileRoute("/app/produtos")({
  head: () => ({ meta: [{ title: "Produtos — SURA ERP" }] }),
  component: Produtos,
});

const products = [
  { cod: "VPL017", nome: "Vaso PL 17", cat: "Vasos Plásticos", est: 842, val: "R$ 8,90", st: "Ativo", emoji: "🪴" },
  { cod: "VPL020", nome: "Vaso PL 20", cat: "Vasos Plásticos", est: 612, val: "R$ 12,40", st: "Ativo", emoji: "🪴" },
  { cod: "VAD025", nome: "Vaso Adriana 25", cat: "Vasos Decorativos", est: 248, val: "R$ 28,90", st: "Ativo", emoji: "🌱" },
  { cod: "VVB034", nome: "Vaso VB 34", cat: "Vasos de Produção", est: 1840, val: "R$ 4,20", st: "Ativo", emoji: "🌵" },
  { cod: "FFT040", nome: "Floreira FT 40", cat: "Floreiras", est: 184, val: "R$ 42,80", st: "Ativo", emoji: "🌷" },
  { cod: "CC017", nome: "Cuia C17", cat: "Cuias", est: 92, val: "R$ 6,70", st: "Crítico", emoji: "🥣" },
  { cod: "PR024", nome: "Prato 24", cat: "Pratos", est: 524, val: "R$ 5,80", st: "Ativo", emoji: "🟤" },
  { cod: "SUP030", nome: "Suporte Triplo 30", cat: "Suportes", est: 38, val: "R$ 89,00", st: "Crítico", emoji: "🪜" },
  { cod: "ACS012", nome: "Kit Jardinagem 12pç", cat: "Acessórios", est: 156, val: "R$ 124,90", st: "Ativo", emoji: "🧰" },
];

function Produtos() {
  return (
    <>
      <PageHeader
        title="Produtos"
        subtitle="184 SKUs cadastrados — atualizado há 4 minutos"
        actions={
          <>
            <Button variant="outline"><Filter className="mr-2 h-4 w-4" />Filtros</Button>
            <Button className="bg-gradient-brand text-primary-foreground"><Plus className="mr-2 h-4 w-4" />Novo Produto</Button>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-4 mb-6">
        {[
          { l: "Total de itens", v: "184", c: "text-primary" },
          { l: "Ativos", v: "171", c: "text-success" },
          { l: "Estoque crítico", v: "7", c: "text-warning" },
          { l: "Inativos", v: "6", c: "text-muted-foreground" },
        ].map((s) => (
          <Card key={s.l} className="shadow-card"><CardContent className="p-5">
            <p className="text-sm text-muted-foreground">{s.l}</p>
            <p className={`mt-1 font-display text-2xl font-bold ${s.c}`}>{s.v}</p>
          </CardContent></Card>
        ))}
      </div>

      <Card className="shadow-card">
        <div className="flex flex-wrap items-center gap-3 border-b p-4">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Buscar por código ou nome…" className="pl-9" />
          </div>
          <Button variant="outline" size="sm">Categoria: Todas</Button>
          <Button variant="outline" size="sm">Status: Ativos</Button>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Código</TableHead>
                <TableHead>Produto</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead className="text-right">Estoque</TableHead>
                <TableHead className="text-right">Valor</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((p) => (
                <TableRow key={p.cod}>
                  <TableCell className="font-mono text-xs">{p.cod}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="grid h-10 w-10 place-items-center rounded-lg bg-accent text-lg">{p.emoji}</div>
                      <div>
                        <p className="font-semibold">{p.nome}</p>
                        <p className="text-xs text-muted-foreground">SKU interno</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell><Badge variant="secondary">{p.cat}</Badge></TableCell>
                  <TableCell className="text-right font-semibold">{p.est.toLocaleString("pt-BR")}</TableCell>
                  <TableCell className="text-right font-semibold">{p.val}</TableCell>
                  <TableCell>
                    {p.st === "Ativo"
                      ? <Badge className="bg-success/15 text-success hover:bg-success/20 border-0">Ativo</Badge>
                      : <Badge className="bg-warning/15 text-warning hover:bg-warning/20 border-0">Crítico</Badge>}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button size="icon" variant="ghost" className="h-8 w-8"><Pencil className="h-4 w-4" /></Button>
                    <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive"><Trash2 className="h-4 w-4" /></Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-between border-t p-4 text-sm text-muted-foreground">
          <span>Mostrando 1–9 de 184 produtos</span>
          <div className="flex gap-1">
            <Button variant="outline" size="sm">Anterior</Button>
            <Button variant="outline" size="sm" className="bg-primary text-primary-foreground">1</Button>
            <Button variant="outline" size="sm">2</Button>
            <Button variant="outline" size="sm">3</Button>
            <Button variant="outline" size="sm">Próximo</Button>
          </div>
        </div>
      </Card>
    </>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/app-shell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Printer, Send, Save } from "lucide-react";
import { VivaverdeLogo } from "@/components/vivaverde-logo";

export const Route = createFileRoute("/app/dav")({
  head: () => ({ meta: [{ title: "DAV — VIVAVERDE ERP" }] }),
  component: DAV,
});

const items = [
  { c: "VPL017", p: "Vaso PL 17", q: 200, u: "R$ 8,90", t: "R$ 1.780,00" },
  { c: "VAD025", p: "Vaso Adriana 25", q: 60, u: "R$ 28,90", t: "R$ 1.734,00" },
  { c: "FFT040", p: "Floreira FT 40", q: 24, u: "R$ 42,80", t: "R$ 1.027,20" },
  { c: "PR024", p: "Prato 24", q: 100, u: "R$ 5,80", t: "R$ 580,00" },
];

function DAV() {
  return (
    <>
      <PageHeader title="DAV — Documento Auxiliar de Venda" subtitle="DAV nº 10428 · 18/06/2026" actions={
        <>
          <Button variant="outline"><Save className="mr-2 h-4 w-4" />Salvar</Button>
          <Button variant="outline"><Send className="mr-2 h-4 w-4" />Enviar</Button>
          <Button className="bg-gradient-brand text-primary-foreground"><Printer className="mr-2 h-4 w-4" />Imprimir</Button>
        </>
      } />

      <Card className="shadow-card p-8 max-w-5xl mx-auto">
        <div className="flex items-start justify-between border-b pb-6">
          <VivaverdeLogo />
          <div className="text-right text-sm">
            <p className="font-bold text-lg">DAV Nº 10428</p>
            <p className="text-muted-foreground">Emissão: 18/06/2026</p>
            <p className="text-muted-foreground">Validade: 25/06/2026</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 py-6 border-b">
          <div>
            <p className="text-xs font-semibold uppercase text-muted-foreground tracking-wider mb-2">Dados do cliente</p>
            <p className="font-bold">Jardim Verde Ltda</p>
            <p className="text-sm text-muted-foreground">CNPJ: 12.345.678/0001-99</p>
            <p className="text-sm text-muted-foreground">Rua das Palmeiras, 482 — Vila Mariana</p>
            <p className="text-sm text-muted-foreground">São Paulo/SP — CEP 04101-300</p>
            <p className="text-sm text-muted-foreground">(11) 98421-3344</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase text-muted-foreground tracking-wider mb-2">Condições</p>
            <p className="text-sm"><strong>Vendedor:</strong> Marcos Silva</p>
            <p className="text-sm"><strong>Pagamento:</strong> 30/60/90 dias — Boleto</p>
            <p className="text-sm"><strong>Frete:</strong> CIF — Transportadora Verde Express</p>
            <p className="text-sm"><strong>Prazo de entrega:</strong> 3 dias úteis</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader><TableRow>
              <TableHead>Código</TableHead><TableHead>Produto</TableHead>
              <TableHead className="text-right">Qtd</TableHead>
              <TableHead className="text-right">Vlr Unit.</TableHead>
              <TableHead className="text-right">Total</TableHead>
            </TableRow></TableHeader>
            <TableBody>
              {items.map((i) => (
                <TableRow key={i.c}>
                  <TableCell className="font-mono text-xs">{i.c}</TableCell>
                  <TableCell className="font-semibold">{i.p}</TableCell>
                  <TableCell className="text-right">{i.q}</TableCell>
                  <TableCell className="text-right">{i.u}</TableCell>
                  <TableCell className="text-right font-semibold">{i.t}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="mt-6 ml-auto max-w-xs space-y-2 text-sm">
          <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>R$ 5.121,20</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Desconto (5%)</span><span className="text-destructive">- R$ 256,06</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Frete</span><span>R$ 180,00</span></div>
          <div className="flex justify-between border-t pt-2 text-lg font-bold">
            <span>Total</span><span className="text-primary">R$ 5.045,14</span>
          </div>
        </div>

        <div className="mt-8 border-t pt-4">
          <Label className="text-xs uppercase tracking-wider text-muted-foreground">Observações</Label>
          <p className="text-sm mt-2">Entrega no endereço acima de segunda a sexta, 8h às 17h. Mercadoria embalada em filme stretch.</p>
        </div>
      </Card>
    </>
  );
}

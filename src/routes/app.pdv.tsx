import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Trash2, CreditCard, Banknote, QrCode, Receipt } from "lucide-react";

export const Route = createFileRoute("/app/pdv")({
  head: () => ({ meta: [{ title: "PDV — VIVAVERDE ERP" }] }),
  component: PDV,
});

const cart = [
  { p: "Vaso PL 17", q: 12, u: 8.9, t: 106.8, emoji: "🪴" },
  { p: "Floreira FT 40", q: 4, u: 42.8, t: 171.2, emoji: "🌷" },
  { p: "Cuia C17", q: 8, u: 6.7, t: 53.6, emoji: "🥣" },
  { p: "Prato 24", q: 12, u: 5.8, t: 69.6, emoji: "🟤" },
];

const quick = ["Vaso PL 17", "Vaso PL 20", "Vaso Adriana 25", "Vaso VB 34", "Floreira FT 40", "Cuia C17", "Prato 24", "Suporte 30", "Kit Jardinagem", "Vaso Decorativo"];

function PDV() {
  const subtotal = cart.reduce((s, i) => s + i.t, 0);
  return (
    <>
      <PageHeader title="PDV — Frente de Caixa" subtitle="Operador: Marcos Silva · Caixa 01" />

      <div className="grid gap-6 lg:grid-cols-[1fr_400px]">
        <div className="space-y-4">
          <Card className="shadow-card">
            <CardContent className="p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Bipar código ou buscar produto…" className="h-14 pl-11 text-base" />
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {quick.map((q) => (
                  <Button key={q} variant="outline" size="sm" className="rounded-full">{q}</Button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader><CardTitle>Itens · {cart.length}</CardTitle></CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {cart.map((i, idx) => (
                  <div key={idx} className="grid grid-cols-[auto_1fr_auto_auto_auto] items-center gap-3 px-6 py-3">
                    <div className="grid h-12 w-12 place-items-center rounded-lg bg-accent text-2xl">{i.emoji}</div>
                    <div className="min-w-0">
                      <p className="font-semibold truncate">{i.p}</p>
                      <p className="text-xs text-muted-foreground">R$ {i.u.toFixed(2)} un</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button size="icon" variant="outline" className="h-8 w-8">−</Button>
                      <span className="w-8 text-center font-semibold">{i.q}</span>
                      <Button size="icon" variant="outline" className="h-8 w-8">+</Button>
                    </div>
                    <p className="font-bold text-primary">R$ {i.t.toFixed(2)}</p>
                    <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive"><Trash2 className="h-4 w-4" /></Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-elevated bg-card sticky top-24 h-fit">
          <CardHeader><CardTitle>Resumo da venda</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>R$ {subtotal.toFixed(2)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Desconto</span><span>R$ 0,00</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Acréscimo</span><span>R$ 0,00</span></div>
            </div>
            <div className="rounded-xl bg-gradient-brand p-5 text-primary-foreground">
              <p className="text-xs uppercase tracking-widest opacity-80">Total a pagar</p>
              <p className="font-display text-4xl font-extrabold mt-1">R$ {subtotal.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase text-muted-foreground tracking-wider mb-2">Forma de pagamento</p>
              <div className="grid grid-cols-3 gap-2">
                <Button variant="outline" className="h-16 flex-col gap-1"><Banknote className="h-5 w-5" /><span className="text-xs">Dinheiro</span></Button>
                <Button variant="outline" className="h-16 flex-col gap-1 ring-2 ring-primary"><CreditCard className="h-5 w-5" /><span className="text-xs">Cartão</span></Button>
                <Button variant="outline" className="h-16 flex-col gap-1"><QrCode className="h-5 w-5" /><span className="text-xs">Pix</span></Button>
              </div>
            </div>
            <Button size="lg" className="w-full bg-gradient-brand text-primary-foreground h-14 text-base font-bold">
              <Receipt className="mr-2 h-5 w-5" /> Finalizar Venda
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

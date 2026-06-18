import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/app-shell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Share2, Search, Heart, ShoppingCart } from "lucide-react";

export const Route = createFileRoute("/app/catalogo")({
  head: () => ({ meta: [{ title: "Catálogo Digital — SURA ERP" }] }),
  component: Catalogo,
});

const items = [
  { n: "Vaso PL 17", c: "VPL017", p: "R$ 8,90", e: 842, emoji: "🪴", bg: "from-emerald-100 to-green-200" },
  { n: "Vaso PL 20", c: "VPL020", p: "R$ 12,40", e: 612, emoji: "🌿", bg: "from-lime-100 to-emerald-200" },
  { n: "Vaso Adriana 25", c: "VAD025", p: "R$ 28,90", e: 248, emoji: "🌱", bg: "from-amber-100 to-orange-200" },
  { n: "Vaso VB 34", c: "VVB034", p: "R$ 4,20", e: 1840, emoji: "🌵", bg: "from-green-100 to-teal-200" },
  { n: "Floreira FT 40", c: "FFT040", p: "R$ 42,80", e: 184, emoji: "🌷", bg: "from-pink-100 to-rose-200" },
  { n: "Cuia C17", c: "CC017", p: "R$ 6,70", e: 92, emoji: "🥣", bg: "from-orange-100 to-amber-200" },
  { n: "Prato 24", c: "PR024", p: "R$ 5,80", e: 524, emoji: "🟤", bg: "from-stone-100 to-stone-200" },
  { n: "Suporte Triplo 30", c: "SUP030", p: "R$ 89,00", e: 38, emoji: "🪜", bg: "from-slate-100 to-zinc-200" },
];

function Catalogo() {
  return (
    <>
      <PageHeader title="Catálogo Digital" subtitle="Compartilhe seus produtos pelo WhatsApp, link público ou QR Code" actions={
        <Button className="bg-success text-success-foreground hover:bg-success/90"><Share2 className="mr-2 h-4 w-4" />Compartilhar catálogo</Button>
      } />

      <Card className="shadow-card p-4 mb-6">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Buscar no catálogo…" className="pl-9" />
          </div>
          {["Todos", "Vasos", "Floreiras", "Cuias", "Pratos", "Acessórios"].map((c, i) => (
            <Button key={c} variant={i === 0 ? "default" : "outline"} size="sm" className={i === 0 ? "bg-gradient-brand text-primary-foreground" : ""}>{c}</Button>
          ))}
        </div>
      </Card>

      <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {items.map((p) => (
          <Card key={p.c} className="overflow-hidden shadow-card hover:shadow-elevated transition-all group">
            <div className={`relative aspect-square bg-gradient-to-br ${p.bg} grid place-items-center text-7xl`}>
              {p.emoji}
              <button className="absolute top-3 right-3 grid h-9 w-9 place-items-center rounded-full bg-white/80 backdrop-blur hover:bg-white">
                <Heart className="h-4 w-4 text-destructive" />
              </button>
              {p.e < 100 && <Badge className="absolute top-3 left-3 bg-warning text-warning-foreground border-0">Últimas unidades</Badge>}
            </div>
            <div className="p-4">
              <p className="text-xs text-muted-foreground font-mono">{p.c}</p>
              <h3 className="font-display text-base font-bold mt-0.5 truncate">{p.n}</h3>
              <div className="mt-2 flex items-baseline justify-between">
                <p className="text-primary font-display text-xl font-extrabold">{p.p}</p>
                <span className="text-xs text-muted-foreground">{p.e} disp.</span>
              </div>
              <div className="mt-3 grid grid-cols-[1fr_auto] gap-2">
                <Button size="sm" className="bg-success text-success-foreground hover:bg-success/90"><Share2 className="mr-1.5 h-3.5 w-3.5" />WhatsApp</Button>
                <Button size="sm" variant="outline"><ShoppingCart className="h-3.5 w-3.5" /></Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}

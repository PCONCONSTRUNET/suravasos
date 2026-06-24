import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/app-shell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Check, ChevronsUpDown, Search, Heart, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { ColorDock } from "@/components/color-dock";

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
  </svg>
);

export const Route = createFileRoute("/app/catalogo")({
  head: () => ({ meta: [{ title: "Catálogo Digital — VIVAVERDE ERP" }] }),
  component: Catalogo,
});

function Catalogo() {
  const [produtos, setProdutos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [busca, setBusca] = useState("");
  const [categoria, setCategoria] = useState("Todos");
  const [openCategoria, setOpenCategoria] = useState(false);

  const fetchProdutos = async () => {
    try {
      const { data } = await supabase.from("produtos").select("*").eq("status", "Ativo");
      if (data) setProdutos(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProdutos();
  }, []);

  const handleShare = (nome: string) => {
    const text = encodeURIComponent(
      `Confira nosso produto: *${nome}* na VivaVerde!\nAcesse nosso catálogo: ${window.location.origin}/catalogo`,
    );
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  const handleShareCatalog = () => {
    const text = encodeURIComponent(
      `Veja nosso catálogo completo de produtos VivaVerde: ${window.location.origin}/catalogo`,
    );
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  const filtrados = produtos.filter((p) => {
    const matchBusca = p.nome.toLowerCase().includes(busca.toLowerCase());
    const matchCategoria = categoria === "Todos" || p.categoria === categoria;
    return matchBusca && matchCategoria;
  });

  const categoriasUnicas = [
    "Todos",
    ...Array.from(new Set(produtos.map((p) => p.categoria))).filter(Boolean),
  ] as string[];

  // Cores fixas para a vitrine para não precisar gravar background no banco
  const getGradient = (index: number) => {
    const gradients = [
      "from-emerald-100 to-green-200",
      "from-lime-100 to-emerald-200",
      "from-amber-100 to-orange-200",
      "from-green-100 to-teal-200",
      "from-pink-100 to-rose-200",
      "from-stone-100 to-stone-200",
      "from-slate-100 to-zinc-200",
    ];
    return gradients[index % gradients.length];
  };

  return (
    <>
      <PageHeader
        title="Catálogo Digital"
        subtitle="Compartilhe seus produtos pelo WhatsApp, link público ou QR Code"
        actions={
          <Button
            onClick={handleShareCatalog}
            className="bg-success text-success-foreground hover:bg-success/90"
          >
            <WhatsAppIcon className="mr-2 h-4 w-4" />
            Compartilhar catálogo
          </Button>
        }
      />

      <Card className="shadow-card p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar no catálogo…"
              className="pl-9 w-full"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          </div>
          <Popover open={openCategoria} onOpenChange={setOpenCategoria}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={openCategoria}
                className="w-full sm:w-[240px] justify-between"
              >
                {categoria}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full sm:w-[240px] p-0" align="end">
              <Command>
                <CommandInput placeholder="Buscar categoria..." />
                <CommandList>
                  <CommandEmpty>Nenhuma categoria encontrada.</CommandEmpty>
                  <CommandGroup>
                    {categoriasUnicas.map((c) => (
                      <CommandItem
                        key={c}
                        value={c}
                        onSelect={() => {
                          setCategoria(c);
                          setOpenCategoria(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            categoria === c ? "opacity-100" : "opacity-0",
                          )}
                        />
                        {c}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      </Card>

      <div className="grid grid-cols-2 gap-3 sm:gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {loading ? (
          <p className="col-span-full text-center text-muted-foreground py-8">
            Carregando catálogo...
          </p>
        ) : filtrados.length === 0 ? (
          <p className="col-span-full text-center text-muted-foreground py-8">
            Nenhum produto encontrado na busca.
          </p>
        ) : (
          filtrados.map((p, index) => (
            <Card
              key={p.id}
              className="overflow-hidden shadow-card hover:shadow-elevated transition-all group"
            >
              <div
                className={`relative aspect-square overflow-hidden bg-gradient-to-br ${getGradient(index)} grid place-items-center text-7xl`}
              >
                {p.imagem ? (
                  <img src={p.imagem} alt={p.nome} className="w-full h-full object-cover" />
                ) : (
                  p.emoji || "🪴"
                )}
                <button className="absolute top-3 right-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-white/80 backdrop-blur hover:bg-white">
                  <Heart className="h-4 w-4 text-destructive" />
                </button>
                {p.estoque < 10 && (
                  <Badge className="absolute top-3 left-3 bg-warning text-warning-foreground border-0">
                    Últimas unidades
                  </Badge>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-display text-base font-bold mt-0.5 truncate">{p.nome}</h3>

                <div className="mt-2 flex items-baseline justify-between border-b pb-2 mb-2">
                  <p className="text-primary font-display text-xl font-extrabold">
                    R$ {Number(p.valor).toFixed(2)}
                  </p>
                  <span className="text-xs text-muted-foreground">{p.estoque} disp.</span>
                </div>

                {/* Especificações Sura */}
                <div className="py-1 text-xs text-muted-foreground space-y-1 border-b pb-3 mb-3">
                  {p.numero && (
                    <p>
                      <span className="font-semibold text-foreground">Número:</span> {p.numero}
                    </p>
                  )}
                  {p.dimensao && (
                    <p>
                      <span className="font-semibold text-foreground">Dimensões:</span> {p.dimensao}
                    </p>
                  )}
                  {p.volume && (
                    <p>
                      <span className="font-semibold text-foreground">Volume:</span> {p.volume} L
                    </p>
                  )}
                  {p.comprimento && (
                    <p>
                      <span className="font-semibold text-foreground">Comprimento:</span>{" "}
                      {p.comprimento} cm
                    </p>
                  )}
                  {p.cores && p.cores.length > 0 && (
                    <div className="pt-2">
                      <p className="font-semibold text-foreground mb-1">Cores:</p>
                      <ColorDock colors={p.cores} />
                    </div>
                  )}
                </div>

                <div className="mt-3 grid grid-cols-[1fr_auto] gap-2">
                  <Button
                    onClick={() => handleShare(p.nome)}
                    size="sm"
                    className="bg-success text-success-foreground hover:bg-success/90"
                  >
                    <WhatsAppIcon className="mr-1.5 h-3.5 w-3.5" />
                    WhatsApp
                  </Button>
                  <Button size="sm" variant="outline">
                    <ShoppingCart className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </>
  );
}

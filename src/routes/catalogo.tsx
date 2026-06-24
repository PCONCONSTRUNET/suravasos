import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Check, ChevronsUpDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { VivaverdeLogo } from "@/components/vivaverde-logo";
import { ColorDock } from "@/components/color-dock";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/catalogo")({
  head: () => ({ meta: [{ title: "Catálogo — VivaVerde" }] }),
  component: PublicCatalogo,
});

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
  </svg>
);

function PublicCatalogo() {
  const [produtos, setProdutos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [busca, setBusca] = useState("");
  const [categoriaAtiva, setCategoriaAtiva] = useState<string>("Todas");
  const [openCategoria, setOpenCategoria] = useState(false);
  const [partner, setPartner] = useState<any>(null);

  useEffect(() => {
    const fetchProdutos = async () => {
      const { data } = await supabase.from('produtos').select('*').eq('status', 'Ativo');
      if (data) setProdutos(data);
      
      const params = new URLSearchParams(window.location.search);
      const p = params.get('p');
      if (p) {
        // Busca o parceiro pelo começo do ID
        const { data: parceiroData } = await supabase.from('vendedores').select('id, nome, telefone').ilike('id', `${p}%`).single();
        if (parceiroData) {
          setPartner(parceiroData);
        }
      }

      setLoading(false);
    };
    fetchProdutos();
  }, []);

  const categorias = Array.from(new Set(produtos.map(p => p.categoria))).filter(Boolean) as string[];

  const filtrados = produtos.filter(p => {
    const matchBusca = p.nome.toLowerCase().includes(busca.toLowerCase());
    const matchCategoria = categoriaAtiva === "Todas" || p.categoria === categoriaAtiva;
    return matchBusca && matchCategoria;
  });

  const getGradient = (index: number) => {
    const gradients = [
      "from-emerald-100 to-green-200",
      "from-lime-100 to-emerald-200",
      "from-amber-100 to-orange-200",
      "from-green-100 to-teal-200",
      "from-pink-100 to-rose-200",
      "from-stone-100 to-stone-200",
      "from-slate-100 to-zinc-200"
    ];
    return gradients[index % gradients.length];
  };

  const handleBuy = (produto: any) => {
    const valorFormatado = Number(produto.valor).toFixed(2).replace('.', ',');
    
    let mensagem = `Olá! Tenho interesse no produto: *${produto.nome}*\n\n`;
    
    if (produto.codigo) mensagem += `*Referência/Código:* ${produto.codigo}\n`;
    mensagem += `*Valor:* R$ ${valorFormatado}\n`;
    if (produto.categoria) mensagem += `*Categoria:* ${produto.categoria}\n`;
    if (produto.numero) mensagem += `*Número:* ${produto.numero}\n`;
    if (produto.dimensao) mensagem += `*Dimensões:* ${produto.dimensao}\n`;
    if (produto.volume) mensagem += `*Volume:* ${produto.volume} L\n`;
    if (produto.comprimento) mensagem += `*Comprimento:* ${produto.comprimento} cm\n`;
    if (produto.cores && produto.cores.length > 0) {
      mensagem += `*Cores:* ${produto.cores.join(', ')}\n`;
    }
    
    mensagem += `\nQual o procedimento para compra?`;

    let telefoneDestino = '5519997331112'; // Telefone padrão do dono
    if (partner && partner.telefone) {
      // Limpa caracteres especiais do telefone do parceiro
      const numLimpo = partner.telefone.replace(/\D/g, '');
      if (numLimpo.length >= 10) {
        telefoneDestino = `55${numLimpo}`;
      }
      
      // Adiciona o link mágico para o parceiro gerar o pedido rápido
      mensagem += `\n\n_Link do Pedido (Para o Vendedor):_\n${window.location.origin}/parceiro/pdv?produto=${produto.id}`;
    }
    
    const text = encodeURIComponent(mensagem);
    window.open(`https://wa.me/${telefoneDestino}?text=${text}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-white px-4 md:px-8 shadow-sm">
        <VivaverdeLogo size="small" />
      </header>

      <main className="mx-auto max-w-6xl p-4 py-8">
        {partner && (
          <div className="mb-6 bg-brand/10 border border-brand/20 text-brand p-3 rounded-xl flex items-center justify-center text-sm font-medium animate-in fade-in slide-in-from-top-4">
            Você está comprando com o parceiro: <strong className="ml-1">{partner.nome}</strong>
          </div>
        )}

        <div className="mb-8 text-center max-w-2xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-display font-bold text-slate-900">Catálogo de Produtos</h1>
          <p className="text-muted-foreground mt-3 text-lg">Confira nossos vasos, suportes e acessórios e faça seu pedido diretamente pelo WhatsApp.</p>
        </div>

        <div className="max-w-md mx-auto mb-6 relative">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <Input 
            placeholder="Buscar por vasos, cores, modelos..." 
            className="pl-10 h-12 bg-white shadow-sm text-base rounded-full" 
            value={busca}
            onChange={e => setBusca(e.target.value)}
          />
        </div>

        {categorias.length > 0 && (
          <div className="flex justify-center mb-10 px-4">
            <Popover open={openCategoria} onOpenChange={setOpenCategoria}>
              <PopoverTrigger asChild>
                <Button variant="outline" role="combobox" className="w-full max-w-sm justify-between rounded-full bg-white shadow-sm h-12 text-base font-medium">
                  {categoriaAtiva === "Todas" ? "Todas as Categorias" : categoriaAtiva}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[--radix-popover-trigger-width] max-w-[350px] p-0 rounded-xl" align="center">
                <Command>
                  <CommandInput placeholder="Buscar categoria..." />
                  <CommandList>
                    <CommandEmpty>Nenhuma categoria encontrada.</CommandEmpty>
                    <CommandGroup>
                      <CommandItem value="Todas as Categorias" onSelect={() => { setCategoriaAtiva("Todas"); setOpenCategoria(false); }}>
                        <Check className={cn("mr-2 h-4 w-4", categoriaAtiva === "Todas" ? "opacity-100" : "opacity-0")} />
                        Todas as Categorias
                      </CommandItem>
                      {categorias.map(c => (
                        <CommandItem key={c} value={c} onSelect={() => { setCategoriaAtiva(c); setOpenCategoria(false); }}>
                          <Check className={cn("mr-2 h-4 w-4", categoriaAtiva === c ? "opacity-100" : "opacity-0")} />
                          {c}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4 sm:gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {loading ? (
            <p className="col-span-full text-center text-muted-foreground py-8">Carregando catálogo...</p>
          ) : filtrados.length === 0 ? (
            <p className="col-span-full text-center text-muted-foreground py-8">Nenhum produto encontrado com essa busca.</p>
          ) : filtrados.map((p, index) => (
            <Card key={p.id} className="overflow-hidden shadow-card hover:shadow-elevated transition-all flex flex-col bg-white border-0 ring-1 ring-slate-900/5">
              <div className={`relative aspect-square overflow-hidden bg-gradient-to-br ${getGradient(index)} grid place-items-center text-7xl`}>
                {p.imagem ? <img src={p.imagem} alt={p.nome} className="w-full h-full object-cover" /> : (p.emoji || "🪴")}
                {p.estoque < 10 && <Badge className="absolute top-3 left-3 bg-warning text-warning-foreground border-0 shadow-sm">Últimas unidades</Badge>}
              </div>
              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-display text-lg font-bold text-slate-800 leading-tight">{p.nome}</h3>
                <p className="text-primary font-display text-2xl font-extrabold mt-2">R$ {Number(p.valor).toFixed(2).replace('.', ',')}</p>
                
                <div className="py-3 text-xs text-slate-500 space-y-1.5 border-b mb-4">
                  {p.numero && <p><span className="font-medium text-slate-700">Número:</span> {p.numero}</p>}
                  {p.dimensao && <p><span className="font-medium text-slate-700">Dimensões:</span> {p.dimensao}</p>}
                  {p.volume && <p><span className="font-medium text-slate-700">Volume:</span> {p.volume} L</p>}
                  {p.comprimento && <p><span className="font-medium text-slate-700">Comprimento:</span> {p.comprimento} cm</p>}
                  {p.cores && p.cores.length > 0 && (
                    <div className="mt-2">
                      <p className="font-medium text-slate-700 mb-1">Cores disponíveis:</p>
                      <ColorDock colors={p.cores} />
                    </div>
                  )}
                </div>
                
                <div className="mt-auto">
                  <Button onClick={() => handleBuy(p)} className="w-full bg-success text-success-foreground hover:bg-success/90 h-11 text-base font-semibold shadow-sm">
                    <WhatsAppIcon className="mr-2 h-5 w-5" /> 
                    Comprar
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}

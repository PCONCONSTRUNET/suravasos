import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Check, ChevronsUpDown, ShoppingCart, Plus, Minus, Trash2, Package, SendHorizonal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { VivaverdeLogo } from "@/components/vivaverde-logo";
import { ColorDock } from "@/components/color-dock";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/catalogo")({
  head: () => ({ meta: [{ title: "Catálogo — VivaVerde" }] }),
  component: PublicCatalogo,
});

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
  </svg>
);

type CartItem = {
  id: string;
  nome: string;
  codigo: string;
  valor: number;
  estoque: number;
  imagem?: string;
  emoji?: string;
  quantidade: number;
};

function PublicCatalogo() {
  const [produtos, setProdutos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [busca, setBusca] = useState("");
  const [categoriaAtiva, setCategoriaAtiva] = useState<string>("Todas");
  const [openCategoria, setOpenCategoria] = useState(false);

  // Carrinho
  const [cart, setCart] = useState<CartItem[]>([]);
  const [openCart, setOpenCart] = useState(false);

  // Modal de quantidade
  const [modalProduto, setModalProduto] = useState<any | null>(null);
  const [modalQtd, setModalQtd] = useState(1);

  // Afiliado
  const [partnerPhone, setPartnerPhone] = useState<string>("5519997331112"); // Default owner phone
  const [partnerId, setPartnerId] = useState<string | null>(null);

  useEffect(() => {
    const fetchProdutos = async () => {
      const { data } = await supabase.from('produtos').select('*').eq('status', 'Ativo');
      if (data) setProdutos(data);
      setLoading(false);
    };

    const fetchPartner = async () => {
      const params = new URLSearchParams(window.location.search);
      const ref = params.get('ref');
      if (ref) {
        const { data, error } = await supabase.from('vendedores').select('id, contato').eq('id', ref).maybeSingle();
        if (data && data.contato) {
          // Limpa o número para deixar só dígitos
          let fone = data.contato.replace(/\D/g, '');
          if (!fone.startsWith('55')) fone = '55' + fone;
          setPartnerPhone(fone);
          setPartnerId(data.id);
        }
      }
    };

    fetchProdutos();
    fetchPartner();
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

  // Abrir modal de quantidade
  const handleOpenModal = (produto: any) => {
    setModalProduto(produto);
    const jaNoCarrinho = cart.find(i => i.id === produto.id);
    setModalQtd(jaNoCarrinho ? jaNoCarrinho.quantidade : 1);
  };

  // Confirmar adição ao carrinho
  const handleConfirmAdd = () => {
    if (!modalProduto) return;
    setCart(prev => {
      const exists = prev.find(i => i.id === modalProduto.id);
      if (exists) {
        return prev.map(i => i.id === modalProduto.id ? { ...i, quantidade: modalQtd } : i);
      }
      return [...prev, {
        id: modalProduto.id,
        nome: modalProduto.nome,
        codigo: modalProduto.codigo || "",
        valor: Number(modalProduto.valor),
        estoque: Number(modalProduto.estoque),
        imagem: modalProduto.imagem,
        emoji: modalProduto.emoji,
        quantidade: modalQtd,
      }];
    });
    setModalProduto(null);
  };

  // Atualizar quantidade no carrinho
  const updateQtd = (id: string, delta: number) => {
    setCart(prev => prev
      .map(i => i.id === id ? { ...i, quantidade: Math.max(1, Math.min(i.estoque, i.quantidade + delta)) } : i)
    );
  };

  // Remover do carrinho
  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(i => i.id !== id));
  };

  const totalItens = cart.reduce((acc, i) => acc + i.quantidade, 0);
  const totalValor = cart.reduce((acc, i) => acc + i.quantidade * i.valor, 0);

  // Gerar link e abrir WhatsApp
  const handleEnviarPedido = () => {
    if (cart.length === 0) return;

    // Encodifica apenas [id, quantidade] — link muito mais curto
    // O DAV (dono) ou DAV Parceiro busca os detalhes do produto pelo Supabase
    const pedidoData = cart.map(item => [item.id, item.quantidade]);

    const base64 = btoa(unescape(encodeURIComponent(JSON.stringify(pedidoData))));
    
    // Se tem um parceiro (afiliado), o link aponta pro DAV do Parceiro, senão pro DAV principal
    const linkPath = partnerId ? '/parceiro/dav' : '/app/dav-novo';
    const link = `${window.location.origin}${linkPath}?pedido=${base64}`;

    const linhasProdutos = cart
      .map(i => `▪ *${i.nome}* — Qtd: ${i.quantidade} × R$ ${i.valor.toFixed(2).replace('.', ',')} = *R$ ${(i.quantidade * i.valor).toFixed(2).replace('.', ',')}*`)
      .join('\n');

    const saudacao = partnerId ? "Olá!" : "Olá Douglas!";
    const mensagem =
      `${saudacao} Tenho um pedido pronto pelo catálogo 🛒\n\n` +
      `${linhasProdutos}\n\n` +
      `*Total: R$ ${totalValor.toFixed(2).replace('.', ',')}*\n\n` +
      `👇 Clique no link abaixo para abrir o pedido no sistema:\n${link}`;

    const text = encodeURIComponent(mensagem);
    window.open(`https://wa.me/${partnerPhone}?text=${text}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-white px-4 md:px-8 shadow-sm">
        <VivaverdeLogo size="small" />
        <button
          onClick={() => setOpenCart(true)}
          className="relative flex items-center gap-2 rounded-full bg-emerald-50 border border-emerald-200 px-4 py-2 text-sm font-semibold text-emerald-700 hover:bg-emerald-100 transition-colors"
        >
          <ShoppingCart className="h-5 w-5" />
          Carrinho
          {totalItens > 0 && (
            <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-emerald-600 text-white text-xs font-bold grid place-items-center shadow">
              {totalItens}
            </span>
          )}
        </button>
      </header>

      <main className="mx-auto max-w-6xl p-4 py-8">
        <div className="mb-8 text-center max-w-2xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-display font-bold text-slate-900">Catálogo de Produtos</h1>
          <p className="text-muted-foreground mt-3 text-lg">Confira nossos vasos, suportes e acessórios e monte seu pedido direto pelo WhatsApp.</p>
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

        {/* Grid de Produtos */}
        <div className="grid grid-cols-2 gap-4 sm:gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {loading ? (
            <p className="col-span-full text-center text-muted-foreground py-8">Carregando catálogo...</p>
          ) : filtrados.length === 0 ? (
            <p className="col-span-full text-center text-muted-foreground py-8">Nenhum produto encontrado com essa busca.</p>
          ) : filtrados.map((p, index) => {
            const noCarrinho = cart.find(i => i.id === p.id);
            const estoqueNum = Number(p.estoque);
            const semEstoque = estoqueNum <= 0;

            return (
              <Card key={p.id} className="overflow-hidden shadow-card hover:shadow-elevated transition-all flex flex-col bg-white border-0 ring-1 ring-slate-900/5">
                <div className={`relative aspect-square overflow-hidden bg-gradient-to-br ${getGradient(index)} grid place-items-center text-7xl`}>
                  {p.imagem ? <img src={p.imagem} alt={p.nome} className="w-full h-full object-cover" /> : (p.emoji || "🪴")}
                  {estoqueNum < 10 && estoqueNum > 0 && (
                    <Badge className="absolute top-3 left-3 bg-warning text-warning-foreground border-0 shadow-sm">Últimas unidades</Badge>
                  )}
                  {semEstoque && (
                    <Badge className="absolute top-3 left-3 bg-destructive text-destructive-foreground border-0 shadow-sm">Esgotado</Badge>
                  )}
                </div>

                <div className="p-4 flex flex-col flex-1">
                  <h3 className="font-display text-base font-bold text-slate-800 leading-tight">{p.nome}</h3>
                  <p className="text-primary font-display text-xl font-extrabold mt-1">R$ {Number(p.valor).toFixed(2).replace('.', ',')}</p>

                  {/* Estoque */}
                  <div className="flex items-center gap-1.5 mt-1.5 mb-2">
                    <Package className="h-3.5 w-3.5 text-slate-400" />
                    <span className={`text-xs font-medium ${semEstoque ? 'text-destructive' : estoqueNum < 10 ? 'text-warning' : 'text-slate-500'}`}>
                      {semEstoque ? 'Sem estoque' : `${estoqueNum} em estoque`}
                    </span>
                  </div>

                  <div className="py-2 text-xs text-slate-500 space-y-1 border-b mb-3">
                    {p.numero && <p><span className="font-medium text-slate-700">Número:</span> {p.numero}</p>}
                    {p.dimensao && <p><span className="font-medium text-slate-700">Dimensões:</span> {p.dimensao}</p>}
                    {p.volume && <p><span className="font-medium text-slate-700">Volume:</span> {p.volume} L</p>}
                    {p.comprimento && <p><span className="font-medium text-slate-700">Comprimento:</span> {p.comprimento} cm</p>}
                    {p.cores && p.cores.length > 0 && (
                      <div className="mt-1.5">
                        <p className="font-medium text-slate-700 mb-1">Cores disponíveis:</p>
                        <ColorDock colors={p.cores} />
                      </div>
                    )}
                  </div>

                  <div className="mt-auto">
                    {noCarrinho ? (
                      <button
                        onClick={() => handleOpenModal(p)}
                        className="w-full h-10 rounded-lg bg-emerald-600 text-white text-sm font-semibold flex items-center justify-center gap-2 hover:bg-emerald-700 transition-colors shadow-sm"
                      >
                        <ShoppingCart className="h-4 w-4" />
                        No carrinho ({noCarrinho.quantidade})
                      </button>
                    ) : (
                      <button
                        disabled={semEstoque}
                        onClick={() => !semEstoque && handleOpenModal(p)}
                        className={`w-full h-10 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-colors shadow-sm
                          ${semEstoque
                            ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                            : 'bg-slate-900 text-white hover:bg-slate-800'
                          }`}
                      >
                        <Plus className="h-4 w-4" />
                        Adicionar ao Carrinho
                      </button>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </main>

      {/* Modal de Quantidade */}
      <Dialog open={!!modalProduto} onOpenChange={(open) => !open && setModalProduto(null)}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Escolher quantidade</DialogTitle>
          </DialogHeader>
          {modalProduto && (
            <div className="space-y-4 py-2">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-xl bg-gradient-to-br from-emerald-100 to-green-200 grid place-items-center text-3xl overflow-hidden shrink-0">
                  {modalProduto.imagem
                    ? <img src={modalProduto.imagem} alt={modalProduto.nome} className="w-full h-full object-cover" />
                    : (modalProduto.emoji || "🪴")}
                </div>
                <div>
                  <p className="font-bold text-slate-800">{modalProduto.nome}</p>
                  <p className="text-primary font-semibold">R$ {Number(modalProduto.valor).toFixed(2).replace('.', ',')}</p>
                  <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                    <Package className="h-3 w-3" /> {Number(modalProduto.estoque)} disponíveis
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-center gap-4 py-2">
                <button
                  onClick={() => setModalQtd(q => Math.max(1, q - 1))}
                  className="h-10 w-10 rounded-full border-2 border-slate-200 flex items-center justify-center hover:bg-slate-100 transition-colors"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="text-3xl font-bold w-12 text-center">{modalQtd}</span>
                <button
                  onClick={() => setModalQtd(q => Math.min(Number(modalProduto.estoque), q + 1))}
                  className="h-10 w-10 rounded-full border-2 border-emerald-500 bg-emerald-50 flex items-center justify-center hover:bg-emerald-100 transition-colors text-emerald-700"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              <p className="text-center text-sm text-slate-500">
                Subtotal: <span className="font-bold text-slate-800">R$ {(modalQtd * Number(modalProduto.valor)).toFixed(2).replace('.', ',')}</span>
              </p>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setModalProduto(null)}>Cancelar</Button>
            <Button onClick={handleConfirmAdd} className="bg-emerald-600 hover:bg-emerald-700 text-white">
              <ShoppingCart className="mr-2 h-4 w-4" />
              Confirmar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Drawer do Carrinho */}
      <Sheet open={openCart} onOpenChange={setOpenCart}>
        <SheetContent className="w-full sm:max-w-md flex flex-col p-0">
          <SheetHeader className="px-6 py-4 border-b">
            <SheetTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5 text-emerald-600" />
              Meu Carrinho
              {totalItens > 0 && (
                <Badge className="bg-emerald-600 text-white border-0 ml-1">{totalItens} {totalItens === 1 ? 'item' : 'itens'}</Badge>
              )}
            </SheetTitle>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center gap-4 py-12">
                <div className="h-20 w-20 rounded-2xl bg-slate-100 grid place-items-center text-4xl">🛒</div>
                <div>
                  <p className="font-semibold text-slate-700">Seu carrinho está vazio</p>
                  <p className="text-sm text-slate-400 mt-1">Adicione produtos do catálogo</p>
                </div>
              </div>
            ) : (
              cart.map(item => (
                <div key={item.id} className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 bg-white shadow-sm">
                  <div className="h-14 w-14 rounded-lg bg-gradient-to-br from-emerald-100 to-green-200 grid place-items-center text-2xl shrink-0 overflow-hidden">
                    {item.imagem ? <img src={item.imagem} alt={item.nome} className="w-full h-full object-cover" /> : (item.emoji || "🪴")}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-slate-800 truncate">{item.nome}</p>
                    <p className="text-xs text-slate-500">R$ {item.valor.toFixed(2).replace('.', ',')}/un</p>
                    <p className="text-sm font-bold text-emerald-700 mt-0.5">
                      R$ {(item.quantidade * item.valor).toFixed(2).replace('.', ',')}
                    </p>
                  </div>
                  <div className="flex flex-col items-center gap-1.5">
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => updateQtd(item.id, -1)}
                        className="h-7 w-7 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-100 text-slate-600 transition-colors"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-6 text-center font-bold text-sm">{item.quantidade}</span>
                      <button
                        onClick={() => updateQtd(item.id, 1)}
                        disabled={item.quantidade >= item.estoque}
                        className="h-7 w-7 rounded-full border border-emerald-400 bg-emerald-50 flex items-center justify-center hover:bg-emerald-100 text-emerald-700 transition-colors disabled:opacity-40"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-slate-300 hover:text-destructive transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {cart.length > 0 && (
            <div className="border-t px-6 py-4 space-y-3 bg-white">
              <div className="flex justify-between items-center">
                <span className="text-slate-600 font-medium">Total do pedido</span>
                <span className="text-2xl font-bold text-slate-900">
                  R$ {totalValor.toFixed(2).replace('.', ',')}
                </span>
              </div>
              <button
                onClick={handleEnviarPedido}
                className="w-full h-13 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold text-base flex items-center justify-center gap-2.5 transition-colors shadow-lg shadow-green-200"
              >
                <WhatsAppIcon className="h-5 w-5" />
                Enviar pedido via WhatsApp
                <SendHorizonal className="h-4 w-4" />
              </button>
              <p className="text-xs text-center text-slate-400">
                Um link será gerado e enviado no WhatsApp com o pedido completo
              </p>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}

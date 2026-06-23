import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { supabaseParceiro as supabase } from "@/lib/supabase";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Trash2, ShoppingCart, CheckCircle2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";

export const Route = createFileRoute("/parceiro/pdv")({
  head: () => ({ meta: [{ title: "Nova Venda — VIVAVERDE" }] }),
  component: ParceiroPDV,
});

function ParceiroPDV() {
  const navigate = useNavigate();
  const [produtos, setProdutos] = useState<any[]>([]);
  const [cart, setCart] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isClientModalOpen, setIsClientModalOpen] = useState(false);
  const [clientForm, setClientForm] = useState({ nome: '', documento: '', telefone: '' });
  const [vendedorId, setVendedorId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const init = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate({ to: "/parceiro/login" });
        return;
      }
      
      const { data: vData, error: vError } = await supabase
        .from('vendedores')
        .select('id, status')
        .eq('user_id', session.user.id)
        .limit(1)
        .maybeSingle();
        
      if (vError) {
        console.error("Erro ao buscar vendedor no PDV:", vError);
      }

      if (vData) {
        setVendedorId(vData.id);
        if (vData.status === 'Aguardando Aprovação') {
          navigate({ to: "/parceiro/dashboard" });
          return;
        }
      } else {
        navigate({ to: "/parceiro/dashboard" });
        return;
      }

      const { data } = await supabase.from('produtos').select('*').eq('status', 'Ativo');
      if (data) setProdutos(data);
    };
    init();
  }, []);

  const addToCart = (produto: any) => {
    setCart((prev) => {
      const existing = prev.find(i => i.id === produto.id);
      if (existing) {
        return prev.map(i => i.id === produto.id ? { ...i, q: i.q + 1, t: (i.q + 1) * i.u } : i);
      }
      return [...prev, { id: produto.id, p: produto.nome, q: 1, u: Number(produto.valor), t: Number(produto.valor), emoji: produto.emoji }];
    });
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(i => {
      if (i.id === id) {
        const newQ = i.q + delta;
        if (newQ <= 0) return i; 
        return { ...i, q: newQ, t: newQ * i.u };
      }
      return i;
    }));
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(i => i.id !== id));
  };

  const subtotal = cart.reduce((s, i) => s + i.t, 0);

  const handleOpenClientModal = () => {
    if (cart.length === 0 || !vendedorId) return;
    setIsClientModalOpen(true);
  };

  const submitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientForm.nome) {
      alert("Por favor, preencha o nome do cliente.");
      return;
    }

    setIsClientModalOpen(false);
    setLoading(true);

    try {
      // 1. Cria ou busca o cliente
      let finalClienteId = null;
      const { data: clienteData, error: clienteError } = await supabase.from('clientes').insert([{
        nome: clientForm.nome,
        cpf_cnpj: clientForm.documento,
        telefone: clientForm.telefone
      }]).select().single();

      if (!clienteError && clienteData) {
        finalClienteId = clienteData.id;
      }

      // 2. Cria a venda pendente
      const { data: vendaData, error: vendaError } = await supabase.from('vendas').insert([{
        tipo: 'PDV',
        status_aprovacao: 'Pendente',
        status: 'Pendente', 
        valor_total: subtotal,
        vendedor_id: vendedorId,
        cliente_id: finalClienteId
      }]).select().single();

      if (vendaError) throw vendaError;

      // Insere os itens
      const itensToInsert = cart.map(i => ({
        venda_id: vendaData.id,
        produto_id: i.id,
        quantidade: i.q,
        valor_unitario: i.u,
        subtotal: i.t
      }));

      const { error: itensError } = await supabase.from('vendas_itens').insert(itensToInsert);
      if (itensError) throw itensError;

      // 3. Dispara a notificação para o dono
      await supabase.from('notificacoes').insert([{
        tipo: 'venda',
        titulo: `Novo pedido pendente`,
        mensagem: `Um parceiro enviou um novo pedido (Cliente: ${clientForm.nome}) no valor de ${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(subtotal)} para aprovação.`
      }]);

      setIsSuccessModalOpen(true);
    } catch (err: any) {
      alert("Erro ao enviar venda: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const closeSuccessModal = () => {
    setIsSuccessModalOpen(false);
    navigate({ to: "/parceiro/dashboard" });
  };

  if (!vendedorId) return <div className="text-center py-10">Verificando perfil de vendedor...</div>;

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-2">
        <h1 className="text-2xl font-bold font-display text-slate-800">Nova Venda</h1>
        <p className="text-sm text-muted-foreground">Registre o pedido do seu cliente.</p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input 
          placeholder="Buscar produto…" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="h-12 pl-10 rounded-xl bg-white shadow-sm border-0 ring-1 ring-slate-900/5" 
        />
      </div>

      <div className="flex overflow-x-auto pb-2 gap-2 snap-x">
        {produtos.filter(p => p.nome.toLowerCase().includes(searchTerm.toLowerCase())).map((p) => (
          <button 
            key={p.id} 
            onClick={() => addToCart(p)} 
            className="flex-shrink-0 snap-center w-28 bg-white p-3 rounded-xl border border-slate-100 shadow-sm flex flex-col items-center gap-2 active:scale-95 transition-transform"
          >
            <div className="text-3xl">{p.emoji || "🪴"}</div>
            <div className="text-center">
              <p className="text-xs font-semibold text-slate-800 line-clamp-2 leading-tight">{p.nome}</p>
              <p className="text-[10px] font-bold text-brand mt-1">R$ {Number(p.valor).toFixed(2)}</p>
            </div>
          </button>
        ))}
      </div>

      <Card className="shadow-sm border-0 ring-1 ring-slate-900/5 overflow-hidden">
        <div className="bg-slate-50 border-b p-3 flex justify-between items-center">
          <h2 className="font-semibold text-sm flex items-center gap-2"><ShoppingCart className="h-4 w-4"/> Carrinho</h2>
          <span className="text-xs font-bold text-muted-foreground">{cart.length} itens</span>
        </div>
        <CardContent className="p-0">
          <div className="max-h-[40vh] overflow-y-auto divide-y">
            {cart.length === 0 ? (
              <div className="p-6 text-center text-sm text-muted-foreground">Selecione produtos acima.</div>
            ) : cart.map((i) => (
              <div key={i.id} className="flex items-center gap-3 p-3">
                <div className="text-2xl">{i.emoji}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-800 truncate">{i.p}</p>
                  <p className="text-xs text-brand font-bold">R$ {i.t.toFixed(2)}</p>
                </div>
                <div className="flex items-center gap-1.5 bg-slate-100 rounded-lg p-1">
                  <button onClick={() => updateQuantity(i.id, -1)} className="h-6 w-6 grid place-items-center bg-white rounded shadow-sm text-lg leading-none font-medium">−</button>
                  <span className="w-4 text-center text-xs font-bold">{i.q}</span>
                  <button onClick={() => updateQuantity(i.id, 1)} className="h-6 w-6 grid place-items-center bg-white rounded shadow-sm text-lg leading-none font-medium">+</button>
                </div>
                <button onClick={() => removeFromCart(i.id)} className="p-1.5 text-destructive bg-destructive/10 rounded-md">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {cart.length > 0 && (
        <div className="sticky bottom-24 pt-2">
          <Button 
            onClick={handleOpenClientModal} 
            disabled={loading} 
            className="w-full h-14 bg-gradient-brand text-primary-foreground text-lg font-bold shadow-lg shadow-brand/25 flex justify-between px-6"
          >
            <span>Enviar Pedido</span>
            <span>R$ {subtotal.toFixed(2).replace('.', ',')}</span>
          </Button>
        </div>
      )}

      {/* Modal de Sucesso */}
      <Dialog open={isSuccessModalOpen} onOpenChange={closeSuccessModal}>
        <DialogContent className="sm:max-w-[425px] text-center">
          <div className="flex flex-col items-center justify-center space-y-4 py-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <DialogTitle className="text-2xl">Pedido Enviado!</DialogTitle>
            <DialogDescription className="text-center text-base">
              A venda foi registrada com sucesso e está aguardando a aprovação da loja para liberar sua comissão.
            </DialogDescription>
          </div>
          <DialogFooter className="sm:justify-center">
            <Button className="w-full bg-gradient-brand text-white h-12 text-lg" onClick={closeSuccessModal}>
              Voltar ao Painel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal do Cliente */}
      <Dialog open={isClientModalOpen} onOpenChange={setIsClientModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={submitOrder}>
            <DialogHeader>
              <DialogTitle>Identificação do Cliente</DialogTitle>
              <DialogDescription>
                Para quem você está vendendo? Preencha os dados abaixo.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label className="text-sm font-medium">Nome / Empresa *</label>
                <Input required placeholder="Ex: João Silva ou Construtora X" value={clientForm.nome} onChange={e => setClientForm({...clientForm, nome: e.target.value})} />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium">CPF / CNPJ (Opcional)</label>
                <Input placeholder="Apenas números" value={clientForm.documento} onChange={e => setClientForm({...clientForm, documento: e.target.value})} />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium">Telefone (Opcional)</label>
                <Input placeholder="(00) 00000-0000" value={clientForm.telefone} onChange={e => setClientForm({...clientForm, telefone: e.target.value})} />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsClientModalOpen(false)}>Cancelar</Button>
              <Button type="submit" className="bg-gradient-brand text-white">Finalizar Pedido</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabaseParceiro as supabase } from "@/lib/supabase";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Wallet, Clock, CheckCircle2, TrendingUp, XCircle, Copy, ExternalLink, Link as LinkIcon } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/parceiro/dashboard")({
  head: () => ({ meta: [{ title: "Meu Painel — VIVAVERDE" }] }),
  component: ParceiroDashboard,
});

function ParceiroDashboard() {
  const navigate = useNavigate();
  const [vendedorId, setVendedorId] = useState<string | null>(null);
  const [nome, setNome] = useState("");
  const [status, setStatus] = useState("");
  const [vendas, setVendas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedSaleForDetails, setSelectedSaleForDetails] = useState<any>(null);
  const [saleItems, setSaleItems] = useState<any[]>([]);
  const [isSaleDetailsOpen, setIsSaleDetailsOpen] = useState(false);
  const [loadingSaleDetails, setLoadingSaleDetails] = useState(false);

  const openSaleDetails = async (venda: any) => {
    setSelectedSaleForDetails(venda);
    setIsSaleDetailsOpen(true);
    setLoadingSaleDetails(true);
    setSaleItems([]);
    
    try {
      const { data, error } = await supabase
        .from('vendas_itens')
        .select('*, produto:produtos(nome, emoji)')
        .eq('venda_id', venda.id);
        
      if (!error && data) {
        setSaleItems(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingSaleDetails(false);
    }
  };

  useEffect(() => {
    const carregarDados = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          navigate({ to: "/parceiro/login" });
          return;
        }

        // Tenta achar o vendedor atrelado a este usuário
        const { data: vData, error: vError } = await supabase
          .from('vendedores')
          .select('*')
          .eq('user_id', session.user.id)
          .limit(1)
          .maybeSingle();
        
        if (vError) {
          console.error("Erro ao buscar vendedor:", vError);
        }
        
        if (vData) {
          setVendedorId(vData.id);
          setNome(vData.nome);
          setStatus(vData.status || 'Ativo');

          // Busca as vendas dele
          const { data: vendasData, error: vDashError } = await supabase
            .from('vendas')
            .select('*, clientes(nome, cpf_cnpj, telefone)')
            .eq('vendedor_id', vData.id)
            .order('created_at', { ascending: false });
            
          if (vDashError) {
            console.error("Erro ao carregar vendas no dashboard:", vDashError);
            alert("Erro ao buscar suas vendas: " + vDashError.message);
          }
            
          if (vendasData) setVendas(vendasData);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    carregarDados();
  }, []);

  const totalComissoesAReceber = vendas
    .filter(v => v.status_aprovacao === 'Aprovada' && v.status_pagamento_comissao !== 'Paga')
    .reduce((acc, v) => acc + (Number(v.valor_comissao) || 0), 0);

  const totalComissoesPagas = vendas
    .filter(v => v.status_aprovacao === 'Aprovada' && v.status_pagamento_comissao === 'Paga')
    .reduce((acc, v) => acc + (Number(v.valor_comissao) || 0), 0);

  const aguardandoAprovacao = vendas.filter(v => v.status_aprovacao === 'Pendente').length;
  const aprovadas = vendas.filter(v => v.status_aprovacao === 'Aprovada').length;

  if (loading) return <div className="text-center py-10 text-muted-foreground">Carregando painel...</div>;

  const handleCompletarCadastro = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;
      
      const { error } = await supabase.from('vendedores').insert([{
        user_id: session.user.id,
        nome: nome,
        email: session.user.email,
        telefone: "", // Pede para ele atualizar depois se quiser
        status: 'Aguardando Aprovação',
        valor_comissao: 0
      }]);

      if (error) throw error;
      
      // Recarrega a página para puxar os dados atualizados
      window.location.reload();
    } catch (err: any) {
      alert("Erro ao concluir o cadastro: " + err.message);
      setLoading(false);
    }
  };

  if (!vendedorId) {
    return (
      <div className="flex justify-center py-10 px-4">
        <Card className="w-full max-w-md border-0 shadow-lg ring-1 ring-slate-900/5">
          <CardContent className="p-6 text-center space-y-4">
            <h2 className="text-xl font-bold font-display">Cadastro Incompleto</h2>
            <p className="text-sm text-muted-foreground">Detectamos que seu usuário foi criado, mas seu perfil de vendedor não foi gerado devido a um erro anterior.</p>
            
            <form onSubmit={handleCompletarCadastro} className="space-y-4 pt-4 text-left">
              <div>
                <label className="text-sm font-medium">Confirme seu Nome Completo</label>
                <Input 
                  required 
                  value={nome} 
                  onChange={(e) => setNome(e.target.value)} 
                  placeholder="Seu nome" 
                  className="mt-1 h-12"
                />
              </div>
              <Button type="submit" className="w-full h-12 font-bold bg-gradient-brand" disabled={loading}>
                {loading ? "Concluindo..." : "Concluir Meu Cadastro"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (status === 'Aguardando Aprovação') {
    return (
      <div className="text-center py-16 px-4 space-y-4 animate-in fade-in slide-in-from-bottom-4">
        <div className="mx-auto w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mb-6">
          <Clock className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold font-display text-slate-800">Conta em Análise</h2>
        <p className="text-slate-600">Olá, {nome.split(' ')[0]}! Sua conta foi criada com sucesso e no momento está aguardando a aprovação do administrador.</p>
        <p className="text-sm text-muted-foreground mt-4 border-t pt-4">Assim que seu acesso for liberado, você poderá acessar o caixa e registrar suas vendas por aqui.</p>
      </div>
    );
  }

  if (status === 'Rejeitado') {
    return (
      <div className="text-center py-16 px-4 space-y-4 animate-in fade-in slide-in-from-bottom-4">
        <div className="mx-auto w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-6">
          <XCircle className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold font-display text-slate-800">Conta Recusada</h2>
        <p className="text-slate-600">Olá, {nome.split(' ')[0]}. Infelizmente, sua solicitação de parceria não foi aprovada pelo administrador.</p>
        <p className="text-sm text-muted-foreground mt-4 border-t pt-4">Se achar que houve um engano, entre em contato diretamente com a loja.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
      <div>
        <h1 className="text-2xl font-bold font-display text-slate-800">Olá, {nome.split(' ')[0]}! 👋</h1>
        <p className="text-sm text-muted-foreground">Aqui está o resumo das suas vendas.</p>
      </div>

      {/* Affiliate Link Section */}
      {vendedorId && status === 'Ativo' && (
        <Card className="mb-6 border-emerald-200 bg-emerald-50/50 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
            <LinkIcon className="h-32 w-32" />
          </div>
          <CardContent className="p-6">
            <h2 className="text-lg font-bold text-emerald-900 flex items-center gap-2 mb-2">
              <LinkIcon className="h-5 w-5" /> Seu Catálogo Exclusivo
            </h2>
            <p className="text-emerald-700 text-sm mb-4">
              Compartilhe o link abaixo com seus clientes. Quando eles montarem o pedido e clicarem em "Enviar", 
              o pedido chegará no <strong>seu WhatsApp</strong> e você poderá finalizá-lo por aqui!
            </p>
            <div className="flex gap-2">
              <Input 
                readOnly 
                value={`${window.location.origin}/catalogo?ref=${vendedorId}`} 
                className="bg-white border-emerald-200 text-emerald-800 font-medium"
              />
              <Button 
                onClick={() => {
                  navigator.clipboard.writeText(`${window.location.origin}/catalogo?ref=${vendedorId}`);
                  toast.success("Link copiado!");
                }}
                className="bg-emerald-600 hover:bg-emerald-700 text-white shrink-0"
              >
                <Copy className="h-4 w-4 mr-2" /> Copiar
              </Button>
              <Button 
                variant="outline" 
                onClick={() => window.open(`/catalogo?ref=${vendedorId}`, '_blank')}
                className="border-emerald-200 text-emerald-700 hover:bg-emerald-100 shrink-0"
                title="Abrir catálogo"
              >
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-2 gap-4">
        <Card className="col-span-2 bg-gradient-brand text-primary-foreground border-0 shadow-lg shadow-primary/20">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2 mb-2 opacity-90">
                  <Wallet className="h-5 w-5" />
                  <h3 className="font-medium text-sm">Comissões a Receber</h3>
                </div>
                <p className="text-4xl font-extrabold font-display">
                  <span className="text-2xl font-bold mr-1 opacity-80">R$</span>
                  {totalComissoesAReceber.toFixed(2).replace('.', ',')}
                </p>
              </div>
              <div className="text-right">
                <div className="flex items-center justify-end gap-1 mb-1 opacity-80">
                  <CheckCircle2 className="h-4 w-4" />
                  <h3 className="font-medium text-xs">Já Pagas</h3>
                </div>
                <p className="text-xl font-bold">
                  <span className="text-sm font-bold mr-1 opacity-80">R$</span>
                  {totalComissoesPagas.toFixed(2).replace('.', ',')}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-0 ring-1 ring-slate-900/5">
          <CardContent className="p-4 flex flex-col items-center justify-center text-center">
            <div className="h-10 w-10 rounded-full bg-amber-100 text-amber-600 grid place-items-center mb-2">
              <Clock className="h-5 w-5" />
            </div>
            <p className="text-2xl font-bold text-slate-800">{aguardandoAprovacao}</p>
            <p className="text-xs text-muted-foreground font-medium">Aguardando</p>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-0 ring-1 ring-slate-900/5">
          <CardContent className="p-4 flex flex-col items-center justify-center text-center">
            <div className="h-10 w-10 rounded-full bg-success/20 text-success grid place-items-center mb-2">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <p className="text-2xl font-bold text-slate-800">{aprovadas}</p>
            <p className="text-xs text-muted-foreground font-medium">Aprovadas</p>
          </CardContent>
        </Card>
      </div>

      <div>
        <h2 className="font-semibold text-lg mb-3 flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-brand" /> Últimas Vendas
        </h2>
        
        <div className="space-y-3">
          {vendas.length === 0 ? (
            <p className="text-center text-muted-foreground text-sm py-4 bg-white rounded-xl shadow-sm border border-slate-100">Nenhuma venda registrada ainda.</p>
          ) : vendas.slice(0, 10).map(v => (
            <div key={v.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex justify-between items-center cursor-pointer active:scale-[0.98] transition-transform" onClick={() => openSaleDetails(v)}>
              <div>
                <p className="font-bold text-slate-800">R$ {Number(v.valor_total).toFixed(2).replace('.', ',')}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{new Date(v.created_at).toLocaleDateString()}</p>
              </div>
              <div className="text-right">
                {v.status_aprovacao === 'Aprovada' ? (
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-success bg-success/10 px-2 py-1 rounded-md">
                    <CheckCircle2 className="h-3 w-3" /> Aprovada
                  </span>
                ) : v.status_aprovacao === 'Rejeitada' ? (
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-destructive bg-destructive/10 px-2 py-1 rounded-md">
                    Rejeitada
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-600 bg-amber-100 px-2 py-1 rounded-md">
                    <Clock className="h-3 w-3" /> Pendente
                  </span>
                )}
                {v.status_aprovacao === 'Aprovada' && v.valor_comissao > 0 && (
                  <p className="text-[10px] text-muted-foreground mt-1">+ R$ {Number(v.valor_comissao).toFixed(2)} comissão</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <Dialog open={isSaleDetailsOpen} onOpenChange={setIsSaleDetailsOpen}>
        <DialogContent className="sm:max-w-[400px] w-[95vw] max-h-[90vh] overflow-y-auto p-5 sm:p-6 rounded-xl">
          <DialogHeader>
            <DialogTitle>Ficha do Pedido</DialogTitle>
            <DialogDescription asChild>
              <div>
                Pedido #{selectedSaleForDetails?.id.substring(0,6)} • {new Date(selectedSaleForDetails?.created_at).toLocaleDateString()}
                <div className="mt-3 text-sm text-slate-700 bg-slate-100 p-3 rounded-md border border-slate-200 text-left">
                  {selectedSaleForDetails?.clientes?.nome ? (
                    <>
                      <p className="font-semibold text-slate-900 flex items-center gap-2">👤 {selectedSaleForDetails.clientes.nome}</p>
                      {selectedSaleForDetails.clientes.cpf_cnpj && <p className="mt-1">📄 {selectedSaleForDetails.clientes.cpf_cnpj}</p>}
                      {selectedSaleForDetails.clientes.telefone && <p className="mt-1">📞 {selectedSaleForDetails.clientes.telefone}</p>}
                    </>
                  ) : (
                    <p className="text-muted-foreground italic">⚠️ Cliente não identificado ou ocorreu erro no cadastro (possível falha antes da correção do banco).</p>
                  )}
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          <div className="py-2">
            {loadingSaleDetails ? (
              <div className="text-center py-6 text-muted-foreground">Carregando itens...</div>
            ) : (
              <div className="space-y-4">
                <div className="max-h-[300px] overflow-y-auto divide-y border rounded-lg">
                  {saleItems.length === 0 ? (
                    <div className="p-4 text-center text-sm text-muted-foreground">Nenhum item encontrado.</div>
                  ) : saleItems.map(item => (
                    <div key={item.id} className="flex items-center justify-between p-3 bg-slate-50/50">
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">{item.produto?.emoji || "📦"}</div>
                        <div>
                          <p className="font-semibold text-sm text-slate-800">{item.produto?.nome || 'Produto Excluído'}</p>
                          <p className="text-xs text-muted-foreground">{item.quantidade}x R$ {Number(item.valor_unitario).toFixed(2)}</p>
                        </div>
                      </div>
                      <p className="font-bold text-brand">R$ {Number(item.subtotal).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between items-center p-4 bg-slate-100 rounded-lg">
                  <span className="font-semibold text-slate-700">Total do Pedido:</span>
                  <span className="text-xl font-bold font-display text-slate-900">R$ {Number(selectedSaleForDetails?.valor_total || 0).toFixed(2)}</span>
                </div>
              </div>
            )}
          </div>
          <DialogFooter className="sm:justify-center">
            <Button className="w-full" onClick={() => setIsSaleDetailsOpen(false)}>
              Fechar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

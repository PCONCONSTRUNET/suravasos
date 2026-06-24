import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Search,
  Trash2,
  CreditCard,
  Banknote,
  QrCode,
  Receipt,
  DownloadCloud,
  X,
} from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/app/pdv")({
  head: () => ({ meta: [{ title: "PDV — VIVAVERDE ERP" }] }),
  component: PDV,
});

function PDV() {
  const [produtos, setProdutos] = useState<any[]>([]);
  const [cart, setCart] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [metodoPagamento, setMetodoPagamento] = useState("Cartão");

  const [orcamentos, setOrcamentos] = useState<any[]>([]);
  const [isOrcamentoModalOpen, setIsOrcamentoModalOpen] = useState(false);
  const [orcamentoIdSelecionado, setOrcamentoIdSelecionado] = useState<string | null>(null);
  const [clienteSelecionado, setClienteSelecionado] = useState<{ id: string; nome: string } | null>(
    null,
  );

  const fetchOrcamentos = async () => {
    const { data } = await supabase
      .from("vendas")
      .select("*, cliente:clientes(nome)")
      .eq("tipo", "DAV")
      .in("status", ["Orçamento", "Aguardando Pagamento"])
      .order("created_at", { ascending: false });
    if (data) setOrcamentos(data);
  };

  useEffect(() => {
    const fetchProdutos = async () => {
      const { data } = await supabase.from("produtos").select("*").eq("status", "Ativo");
      if (data) {
        setProdutos(data);

        // Novo formato do Carrinho via Catálogo
        const params = new URLSearchParams(window.location.search);
        const cartMagic = params.get("c");
        if (cartMagic) {
          const parsedCart: any[] = [];
          const items = cartMagic.split(",");
          items.forEach((item) => {
            const [id, qStr] = item.split(":");
            const qty = parseInt(qStr) || 1;
            const prod = data.find((p) => p.id === id);
            if (prod) {
              parsedCart.push({
                id: prod.id,
                p: prod.nome,
                q: qty,
                u: Number(prod.valor),
                t: qty * Number(prod.valor),
                emoji: prod.emoji,
                max: prod.estoque,
              });
            }
          });
          if (parsedCart.length > 0) {
            setCart(parsedCart);
            window.history.replaceState({}, "", "/app/pdv");
          }
        }
      }
    };
    fetchProdutos();
    fetchOrcamentos();
  }, []);

  const puxarOrcamento = async (orcamento: any) => {
    try {
      const { data, error } = await supabase
        .from("vendas_itens")
        .select("*, produto:produtos(nome, estoque, valor, emoji)")
        .eq("venda_id", orcamento.id);

      if (error) {
        console.error(error);
        alert("Erro no banco de dados ao puxar os itens: " + error.message);
        return;
      }

      if (data && data.length > 0) {
        const novoCarrinho = data.map((item) => ({
          id: item.produto_id,
          p: item.produto?.nome || "Produto não encontrado",
          q: item.quantidade,
          u: Number(item.valor_unitario),
          t: Number(item.subtotal),
          emoji: item.produto?.emoji || "📦",
          max: item.produto?.estoque || 0,
        }));
        setCart(novoCarrinho);
        setOrcamentoIdSelecionado(orcamento.id);
        if (orcamento.cliente_id && orcamento.cliente) {
          setClienteSelecionado({ id: orcamento.cliente_id, nome: orcamento.cliente.nome });
        }
        setIsOrcamentoModalOpen(false);
      } else {
        alert("Nenhum item encontrado neste orçamento.");
      }
    } catch (e: any) {
      alert("Erro ao puxar itens do orçamento: " + e.message);
    }
  };

  const limparCaixa = () => {
    setCart([]);
    setOrcamentoIdSelecionado(null);
    setClienteSelecionado(null);
  };

  const addToCart = (produto: any) => {
    if (produto.estoque <= 0) {
      alert("Produto sem estoque!");
      return;
    }

    setCart((prev) => {
      const existing = prev.find((i) => i.id === produto.id);
      if (existing) {
        if (existing.q >= produto.estoque) {
          alert("Estoque insuficiente!");
          return prev;
        }
        return prev.map((i) =>
          i.id === produto.id ? { ...i, q: i.q + 1, t: (i.q + 1) * i.u } : i,
        );
      }
      return [
        ...prev,
        {
          id: produto.id,
          p: produto.nome,
          q: 1,
          u: Number(produto.valor),
          t: Number(produto.valor),
          emoji: produto.emoji,
          max: produto.estoque,
        },
      ];
    });
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev.map((i) => {
        if (i.id === id) {
          const newQ = i.q + delta;
          if (newQ <= 0) return i;
          if (newQ > i.max) {
            alert("Estoque insuficiente!");
            return i;
          }
          return { ...i, q: newQ, t: newQ * i.u };
        }
        return i;
      }),
    );
  };

  const setQuantity = (id: string, newQ: number) => {
    setCart((prev) =>
      prev.map((i) => {
        if (i.id === id) {
          if (newQ <= 0) return i;
          if (newQ > i.max) {
            alert("Estoque insuficiente!");
            return i;
          }
          return { ...i, q: newQ, t: newQ * i.u };
        }
        return i;
      }),
    );
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  const subtotal = cart.reduce((s, i) => s + i.t, 0);

  const handleFinalizar = async () => {
    if (cart.length === 0) return;
    setLoading(true);

    try {
      // Cria a venda
      const { data: vendaData, error: vendaError } = await supabase
        .from("vendas")
        .insert([
          {
            tipo: "PDV",
            status: "Pago",
            valor_total: subtotal,
            cliente_id: clienteSelecionado?.id || null,
            metodo_pagamento: metodoPagamento,
          },
        ])
        .select()
        .single();

      if (vendaError) throw vendaError;
      const vendaId = vendaData.id;

      // Itens
      const itensToInsert = cart.map((i) => ({
        venda_id: vendaId,
        produto_id: i.id,
        quantidade: i.q,
        valor_unitario: i.u,
        subtotal: i.t,
      }));

      const { error: itensError } = await supabase.from("vendas_itens").insert(itensToInsert);
      if (itensError) throw itensError;

      // Financeiro: Conta a Receber (Já paga)
      const dataAtual = new Date().toISOString().split("T")[0];
      await supabase.from("contas_receber").insert([
        {
          venda_id: vendaId,
          descricao: `Venda PDV #${vendaId.substring(0, 8).toUpperCase()}`,
          valor: subtotal,
          vencimento: dataAtual,
          status: "Recebido",
          data_pagamento: dataAtual,
        },
      ]);

      // Baixa no estoque
      for (const item of cart) {
        const prod = produtos.find((p) => p.id === item.id);
        if (prod) {
          const novoEstoque = prod.estoque - item.q;
          await supabase.from("produtos").update({ estoque: novoEstoque }).eq("id", item.id);
          prod.estoque = novoEstoque; // Atualiza local
        }
      }

      // Atualiza o orçamento anterior se foi puxado
      if (orcamentoIdSelecionado) {
        await supabase
          .from("vendas")
          .update({ status: "Faturado" })
          .eq("id", orcamentoIdSelecionado);
        fetchOrcamentos();
      }

      alert("Venda realizada com sucesso!");
      limparCaixa();
    } catch (err: any) {
      console.error(err);
      alert("Erro ao finalizar venda: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageHeader
        title="PDV — Frente de Caixa"
        subtitle="Operador: Douglas de Almeida · Caixa 01"
      />

      <div className="grid gap-6 lg:grid-cols-[1fr_400px]">
        <div className="space-y-4">
          <Card className="shadow-card">
            <CardContent className="p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Bipar código ou buscar produto…"
                  className="h-14 pl-11 text-base"
                />
              </div>
              <div className="mt-3 flex flex-wrap gap-2 max-h-40 overflow-y-auto">
                {produtos.map((p) => (
                  <Button
                    key={p.id}
                    onClick={() => addToCart(p)}
                    variant="outline"
                    size="sm"
                    className="rounded-full"
                  >
                    {p.emoji} {p.nome}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <CardTitle>Itens · {cart.length}</CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsOrcamentoModalOpen(true)}
                className="h-8 text-brand border-brand/20 hover:bg-brand/10"
              >
                <DownloadCloud className="w-4 h-4 mr-2" /> Puxar Orçamento
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y max-h-[50vh] overflow-y-auto">
                {cart.length === 0 ? (
                  <div className="p-8 text-center text-muted-foreground">
                    Nenhum produto no caixa.
                  </div>
                ) : (
                  cart.map((i) => (
                    <div
                      key={i.id}
                      className="grid grid-cols-[auto_1fr_auto_auto_auto] items-center gap-3 px-6 py-3"
                    >
                      <div className="grid h-12 w-12 place-items-center rounded-lg bg-accent text-2xl">
                        {i.emoji}
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold truncate">{i.p}</p>
                        <p className="text-xs text-muted-foreground">R$ {i.u.toFixed(2)} un</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button
                          onClick={() => updateQuantity(i.id, -1)}
                          size="icon"
                          variant="outline"
                          className="h-8 w-8"
                        >
                          −
                        </Button>
                        <input
                          type="number"
                          min="1"
                          value={i.q || ""}
                          onChange={(e) => setQuantity(i.id, parseInt(e.target.value) || 1)}
                          className="w-12 text-center font-semibold bg-transparent border-0 outline-none p-0 focus:ring-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                        <Button
                          onClick={() => updateQuantity(i.id, 1)}
                          size="icon"
                          variant="outline"
                          className="h-8 w-8"
                        >
                          +
                        </Button>
                      </div>
                      <p className="font-bold text-primary">R$ {i.t.toFixed(2)}</p>
                      <Button
                        onClick={() => removeFromCart(i.id)}
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-elevated bg-card sticky top-24 h-fit">
          <CardHeader>
            <CardTitle>Resumo da venda</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5 text-sm">
              {clienteSelecionado && (
                <div className="flex justify-between items-center text-brand font-semibold mb-3 bg-brand/10 p-2 rounded-md">
                  <span>👤 {clienteSelecionado.nome}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-5 w-5 hover:bg-transparent text-brand"
                    onClick={() => setClienteSelecionado(null)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>R$ {subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Desconto</span>
                <span>R$ 0,00</span>
              </div>
            </div>
            <div className="rounded-xl bg-gradient-brand p-5 text-primary-foreground">
              <p className="text-xs uppercase tracking-widest opacity-80">Total a pagar</p>
              <p className="font-display text-4xl font-extrabold mt-1">R$ {subtotal.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase text-muted-foreground tracking-wider mb-2">
                Pagamento
              </p>
              <div className="grid grid-cols-3 gap-2">
                <Button
                  onClick={() => setMetodoPagamento("Dinheiro")}
                  variant="outline"
                  className={`h-16 flex-col gap-1 ${metodoPagamento === "Dinheiro" ? "ring-2 ring-primary" : ""}`}
                >
                  <img
                    src="https://img.icons8.com/arcade/64/money.png"
                    alt="Dinheiro"
                    className="h-5 w-5 object-contain"
                  />
                  <span className="text-xs">Dinheiro</span>
                </Button>
                <Button
                  onClick={() => setMetodoPagamento("Cartão")}
                  variant="outline"
                  className={`h-16 flex-col gap-1 ${metodoPagamento === "Cartão" ? "ring-2 ring-primary" : ""}`}
                >
                  <img
                    src="https://img.icons8.com/fluency/48/bank-card-front-side.png"
                    alt="Cartão"
                    className="h-5 w-5 object-contain"
                  />
                  <span className="text-xs">Cartão</span>
                </Button>
                <Button
                  onClick={() => setMetodoPagamento("Pix")}
                  variant="outline"
                  className={`h-16 flex-col gap-1 ${metodoPagamento === "Pix" ? "ring-2 ring-primary" : ""}`}
                >
                  <img
                    src="https://img.icons8.com/fluency/48/pix.png"
                    alt="Pix"
                    className="h-5 w-5 object-contain"
                  />
                  <span className="text-xs">Pix</span>
                </Button>
              </div>
            </div>
            <Button
              onClick={handleFinalizar}
              disabled={cart.length === 0 || loading}
              size="lg"
              className="w-full bg-gradient-brand text-primary-foreground h-14 text-base font-bold"
            >
              <Receipt className="mr-2 h-5 w-5" /> {loading ? "Processando..." : "Finalizar Venda"}
            </Button>
          </CardContent>
        </Card>
      </div>

      <Dialog open={isOrcamentoModalOpen} onOpenChange={setIsOrcamentoModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Orçamentos Pendentes</DialogTitle>
            <DialogDescription>
              Selecione um orçamento (DAV) para carregar os produtos para o caixa.
            </DialogDescription>
          </DialogHeader>
          <div className="max-h-[350px] overflow-y-auto space-y-2 py-4">
            {orcamentos.length === 0 ? (
              <p className="text-center text-muted-foreground py-4">
                Nenhum orçamento em aberto encontrado.
              </p>
            ) : (
              orcamentos.map((orc) => (
                <div
                  key={orc.id}
                  onClick={() => puxarOrcamento(orc)}
                  className="bg-slate-50 p-4 rounded-xl border border-slate-200 cursor-pointer hover:bg-brand/5 hover:border-brand/30 transition-colors flex justify-between items-center"
                >
                  <div>
                    <p className="font-semibold text-slate-800">
                      #{orc.id.substring(0, 8).toUpperCase()}
                    </p>
                    <p className="text-sm text-slate-600 font-medium">
                      👤 {orc.cliente?.nome || "Cliente Desconhecido"}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {new Date(orc.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-brand">R$ {Number(orc.valor_total).toFixed(2)}</p>
                    <span className="inline-block mt-1 text-[10px] font-semibold bg-info/10 text-info px-2 py-0.5 rounded">
                      Puxar Venda
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { supabaseParceiro as supabase } from "@/lib/supabase";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Trash2, ShoppingCart, CheckCircle2, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

export const Route = createFileRoute("/parceiro/pdv")({
  head: () => ({ meta: [{ title: "Nova Venda — VIVAVERDE" }] }),
  component: ParceiroPDV,
});

function ParceiroPDV() {
  const navigate = useNavigate();
  const [produtos, setProdutos] = useState<any[]>([]);
  const [cart, setCart] = useState<any[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('pdv_cart_parceiro');
      if (saved) return JSON.parse(saved);
    }
    return [];
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('pdv_cart_parceiro', JSON.stringify(cart));
    }
  }, [cart]);

  const [loading, setLoading] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isClientModalOpen, setIsClientModalOpen] = useState(false);
  const [clientForm, setClientForm] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('pdv_client_parceiro');
      if (saved) return JSON.parse(saved);
    }
    return {
      nome: "",
      documento: "",
      telefone: "",
      cep: "",
      endereco: "",
      numero: "",
      bairro: "",
      cidade: "",
      uf: "",
      pagamento: "Dinheiro / Pix",
      condicaoBoleto: "",
      frete: "Retirada",
      observacoes: "",
    };
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('pdv_client_parceiro', JSON.stringify(clientForm));
    }
  }, [clientForm]);
  const [vendedorInfo, setVendedorInfo] = useState<{ id: string; nome: string } | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [davGeradoId, setDavGeradoId] = useState<string | null>(null);
  const [davGeradoNumero, setDavGeradoNumero] = useState<string | number | null>(null);
  const [cnpjLoading, setCnpjLoading] = useState(false);
  const [cnpjErro, setCnpjErro] = useState("");
  const [descontoPercentual, setDescontoPercentual] = useState<number>(0);

  useEffect(() => {
    const init = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      let aplicaAcrescimo = false;
      let acrescimoPercentual = 20;
      if (session) {
        const { data: vData } = await supabase
          .from("vendedores")
          .select("id, status, nome, acrescimo_catalogo, acrescimo_catalogo_percentual")
          .eq("user_id", session.user.id)
          .single();
        if (vData) {
          setVendedorInfo({ id: vData.id, nome: vData.nome });
          aplicaAcrescimo = vData.acrescimo_catalogo;
          if (vData.acrescimo_catalogo_percentual !== null && vData.acrescimo_catalogo_percentual !== undefined) {
            acrescimoPercentual = Number(vData.acrescimo_catalogo_percentual);
          }
          if (vData.status === "Aguardando Aprovação") {
            navigate({ to: "/parceiro/dashboard" });
            return;
          }
        }
      }

      const { data } = await supabase.from("produtos").select("*").eq("status", "Ativo").order("nome");
      if (data) {
        const multiplier = 1 + (acrescimoPercentual / 100);
        const produtosComPreco = data.map((p: any) => ({
          ...p,
          valor: aplicaAcrescimo ? p.valor * multiplier : p.valor
        }));
        setProdutos(produtosComPreco);
        
        // Verifica se veio um produto mágico pela URL (formato antigo)
        const dataForMagic = produtosComPreco;
        const params = new URLSearchParams(window.location.search);

        const eParam = params.get("e");
        const cnjParam = params.get("cnpj");
        const cepParam = params.get("cep");
        const endParam = params.get("end");
        const numParam = params.get("num");
        const bairroParam = params.get("bairro");
        const cidParam = params.get("cid");
        const ufParam = params.get("uf");
        const telParam = params.get("tel");

        if (eParam || cnjParam) {
          setClientForm((prev) => ({
            ...prev,
            nome: eParam || "",
            documento: cnjParam || "",
            cep: cepParam || "",
            endereco: endParam || "",
            numero: numParam || "",
            bairro: bairroParam || "",
            cidade: cidParam || "",
            uf: ufParam || "",
            telefone: telParam || "",
          }));
        }

        const produtoIdMagic = params.get("produto");
        if (produtoIdMagic) {
          const magicProduct = dataForMagic.find((p: any) => p.id === produtoIdMagic);
          if (magicProduct) {
            setCart([
              {
                id: magicProduct.id,
                p: magicProduct.nome,
                q: 1,
                u: Number(magicProduct.valor),
                t: Number(magicProduct.valor),
                emoji: magicProduct.emoji,
                imagem: magicProduct.imagem,
              },
            ]);
            // Limpa a URL para não adicionar de novo num refresh
            window.history.replaceState({}, "", "/parceiro/pdv");
          }
        }

        // Novo formato do Carrinho via Catálogo
        const cartMagic = params.get("c");
        if (cartMagic) {
          const parsedCart: any[] = [];
          const items = cartMagic.split(",");
          items.forEach((item) => {
            const [id, qStr] = item.split(":");
            const qty = parseInt(qStr) || 1;
            const prod = dataForMagic.find((p: any) => p.id === id);
            if (prod) {
              parsedCart.push({
                id: prod.id,
                p: prod.nome,
                q: qty,
                u: Number(prod.valor),
                t: qty * Number(prod.valor),
                emoji: prod.emoji,
                imagem: prod.imagem,
              });
            }
          });
          if (parsedCart.length > 0) {
            setCart(parsedCart);
            window.history.replaceState({}, "", "/parceiro/pdv");
          }
        }
      }
    };
    init();
  }, []);

  const addToCart = (produto: any) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === produto.id);
      if (existing) {
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
          imagem: produto.imagem,
        },
      ];
    });
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev.map((i) => {
        if (i.id === id) {
          const currentQ = typeof i.q === "number" ? i.q : 0;
          const newQ = currentQ + delta;
          if (newQ <= 0) return i;
          return { ...i, q: newQ, t: newQ * i.u };
        }
        return i;
      }),
    );
  };

  const setQuantity = (id: string, val: string) => {
    setCart((prev) =>
      prev.map((i) => {
        if (i.id === id) {
          if (val === "") {
            return { ...i, q: "", t: 0 };
          }
          const newQ = parseInt(val);
          if (isNaN(newQ) || newQ < 0) return i;
          return { ...i, q: newQ, t: newQ * i.u };
        }
        return i;
      }),
    );
  };

  const setUnitPrice = (id: string, newU: number) => {
    setCart((prev) =>
      prev.map((i) => {
        if (i.id === id) {
          if (newU < 0) return i;
          return { ...i, u: newU, t: i.q * newU };
        }
        return i;
      }),
    );
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  const rawSubtotal = cart.reduce((s, i) => s + i.t, 0);
  const subtotal = descontoPercentual > 0
    ? rawSubtotal * (1 - descontoPercentual / 100)
    : rawSubtotal;
  const descontoAplicado = rawSubtotal - subtotal;

  const buscarCnpj = async () => {
    const cnpjLimpo = clientForm.documento.replace(/\D/g, "");
    if (cnpjLimpo.length !== 14) {
      setCnpjErro("Digite um CNPJ válido com 14 dígitos.");
      return;
    }
    setCnpjErro("");
    setCnpjLoading(true);
    try {
      const res = await fetch(`https://brasilapi.com.br/api/cnpj/v1/${cnpjLimpo}`);
      if (!res.ok) {
        setCnpjErro("CNPJ não encontrado na Receita Federal.");
        return;
      }
      const data = await res.json();
      const tel = data.ddd_telefone_1
        ? data.ddd_telefone_1.replace(/(\d{2})(\d{4,5})(\d{4})/, "($1) $2-$3")
        : clientForm.telefone;
      const cepFmt = data.cep
        ? data.cep.replace(/\D/g, "").replace(/(\d{5})(\d{3})/, "$1-$2")
        : "";
      const tipoLogradouro = data.descricao_tipo_de_logradouro
        ? data.descricao_tipo_de_logradouro + " "
        : "";
      const cidade = data.municipio
        ? data.municipio.charAt(0) + data.municipio.slice(1).toLowerCase()
        : clientForm.cidade;
      setClientForm((prev) => ({
        ...prev,
        nome: data.razao_social || prev.nome,
        telefone: tel,
        cep: cepFmt,
        endereco: tipoLogradouro + (data.logradouro || ""),
        numero: data.numero || prev.numero,
        bairro: data.bairro || prev.bairro,
        cidade,
        uf: data.uf || prev.uf,
      }));
    } catch {
      setCnpjErro("Erro ao consultar o CNPJ. Tente novamente.");
    } finally {
      setCnpjLoading(false);
    }
  };

  const handleOpenClientModal = () => {
    if (cart.length === 0 || !vendedorInfo) return;
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

      // Se o cliente digitou um documento, tenta buscar primeiro para não duplicar
      if (clientForm.documento && clientForm.documento.trim() !== "") {
        const { data: existingClient } = await supabase
          .from("clientes")
          .select("id")
          .eq("cpf_cnpj", clientForm.documento.trim())
          .maybeSingle();

        if (existingClient) {
          finalClienteId = existingClient.id;
        }
      }

      // Se não encontrou o cliente, tenta criar um novo
      if (!finalClienteId) {
        const payload: any = { nome: clientForm.nome };
        if (clientForm.documento && clientForm.documento.trim() !== "") {
          payload.cpf_cnpj = clientForm.documento.trim();
        }
        if (clientForm.telefone && clientForm.telefone.trim() !== "") {
          payload.telefone = clientForm.telefone.trim();
        }
        if (clientForm.cep && clientForm.cep.trim() !== "") {
          payload.cep = clientForm.cep.trim();
        }
        if (clientForm.endereco && clientForm.endereco.trim() !== "") {
          payload.endereco = clientForm.endereco.trim();
        }
        if (clientForm.numero && clientForm.numero.trim() !== "") {
          payload.numero = clientForm.numero.trim();
        }
        if (clientForm.bairro && clientForm.bairro.trim() !== "") {
          payload.bairro = clientForm.bairro.trim();
        }
        if (clientForm.cidade && clientForm.cidade.trim() !== "") {
          payload.cidade = clientForm.cidade.trim();
        }
        if (clientForm.uf && clientForm.uf.trim() !== "") {
          payload.uf = clientForm.uf.trim();
        }
        payload.status = "Ativo";

        const { data: clienteData, error: clienteError } = await supabase
          .from("clientes")
          .insert([payload])
          .select()
          .maybeSingle();

        if (clienteData) {
          finalClienteId = clienteData.id;
        } else if (clienteError) {
          console.error("Erro ao criar cliente pelo parceiro:", clienteError);
          alert("Não foi possível salvar o cliente: " + clienteError.message);
          setLoading(false);
          return;
        }
      }

      // 2. Cria a venda pendente
      const { data: vendaData, error: vendaError } = await supabase
        .from("vendas")
        .insert([
          {
            tipo: "PDV",
            status_aprovacao: "Pendente",
            status: "Pendente",
            valor_total: subtotal,
            vendedor_id: vendedorInfo?.id,
            cliente_id: finalClienteId,
            desconto_valor: descontoAplicado,
            desconto_percentual: descontoPercentual,
            condicao_pagamento: clientForm.pagamento === "Boleto a Prazo" ? clientForm.condicaoBoleto || "Boleto a Prazo" : clientForm.pagamento,
          },
        ])
        .select()
        .single();

      if (vendaError) throw vendaError;

      // Insere os itens
      const itensToInsert = cart.map((i) => ({
        venda_id: vendaData.id,
        produto_id: i.id,
        quantidade: i.q,
        valor_unitario: i.u,
        subtotal: i.t,
      }));

      const { error: itensError } = await supabase.from("vendas_itens").insert(itensToInsert);
      if (itensError) throw itensError;

      // 3. Gera o DAV Oficial (Orçamento) na tabela VENDAS
      const { data: dav, error: davError } = await supabase
        .from("vendas")
        .insert([
          {
            tipo: "DAV",
            status: "Pendente",
            status_aprovacao: "Pendente",
            valor_total: subtotal,
            vendedor_id: vendedorInfo?.id,
            cliente_id: finalClienteId,
            desconto_valor: descontoAplicado,
            desconto_percentual: descontoPercentual,
            condicao_pagamento: clientForm.pagamento === "Boleto a Prazo" ? clientForm.condicaoBoleto || "Boleto a Prazo" : clientForm.pagamento,
          },
        ])
        .select()
        .single();

      if (!davError && dav) {
        setDavGeradoId(dav.id);
        setDavGeradoNumero(dav.numero_venda);

        // Salvar itens do DAV
        const davItensToInsert = cart.map((i) => ({
          venda_id: dav.id,
          produto_id: i.id,
          quantidade: i.q,
          valor_unitario: i.u,
          subtotal: i.t,
        }));
        await supabase.from("vendas_itens").insert(davItensToInsert);
      } else if (davError) {
        console.error("Erro ao gerar DAV:", davError);
        alert(
          "Aviso: O pedido foi enviado, mas o Orçamento (DAV) não pôde ser gerado: " +
            davError.message,
        );
      }

      // 4. Dispara a notificação para o dono
      await supabase.from("notificacoes").insert([
        {
          tipo: "venda",
          titulo: `Novo pedido pendente`,
          mensagem: `Um parceiro enviou um novo pedido (Cliente: ${clientForm.nome}) no valor de ${new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(subtotal)} para aprovação.`,
        },
      ]);

      setIsSuccessModalOpen(true);
    } catch (err: any) {
      alert("Erro ao enviar venda: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const closeSuccessModal = () => {
    setIsSuccessModalOpen(false);
    setCart([]);
    setClientForm({
      nome: "",
      documento: "",
      telefone: "",
      cep: "",
      endereco: "",
      numero: "",
      bairro: "",
      cidade: "",
      uf: "",
      pagamento: "Dinheiro / Pix",
      condicaoBoleto: "",
      frete: "Retirada",
      observacoes: "",
    });
    navigate({ to: "/parceiro/dashboard" });
  };

  const handleShareWhatsApp = () => {
    if (!davGeradoId) return;

    let msg = `*ORÇAMENTO - VIVAVERDE VASOS*\n`;
    msg += `Nº do Orçamento: ${davGeradoNumero || davGeradoId.substring(0, 8).toUpperCase()}\n\n`;
    msg += `Olá ${clientForm.nome}, aqui está o seu orçamento detalhado!\n\n`;

    msg += `*ITENS DO ORÇAMENTO:*\n`;
    cart.forEach((item) => {
      msg += `• ${item.q}x ${item.p} - R$ ${Number(item.t).toFixed(2).replace(".", ",")}\n`;
    });

    msg += `\n*TOTAL: R$ ${subtotal.toFixed(2).replace(".", ",")}*\n\n`;

    const linkPdf = `${window.location.origin}/orcamento/${davGeradoId}`;
    msg += `📄 *Acesse o orçamento completo em PDF aqui:*\n${linkPdf}`;

    const url = `https://wa.me/?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
  };

  if (!vendedorInfo)
    return <div className="text-center py-10">Verificando perfil de vendedor...</div>;

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
        {produtos
          .filter((p) => p.nome.toLowerCase().includes(searchTerm.toLowerCase()) || (p.codigo && p.codigo.toLowerCase().includes(searchTerm.toLowerCase())))
          .map((p) => (
            <button
              key={p.id}
              onClick={() => addToCart(p)}
              className="flex-shrink-0 snap-center w-28 bg-white p-3 rounded-xl border border-slate-100 shadow-sm flex flex-col items-center gap-2 active:scale-95 transition-transform"
            >
              <div className="grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-md bg-accent text-3xl">
                {p.imagem ? (
                  <img src={p.imagem} alt={p.nome} className="h-full w-full object-cover" />
                ) : (
                  <span className="opacity-50">{p.emoji || "🪴"}</span>
                )}
              </div>
              <div className="text-center">
                <p className="text-xs font-semibold text-slate-800 line-clamp-2 leading-tight">
                  {p.nome}
                </p>
                <p className="text-[10px] font-bold text-brand mt-1">
                  R$ {Number(p.valor).toFixed(2)}
                </p>
              </div>
            </button>
          ))}
      </div>

      <Card className="shadow-sm border-0 ring-1 ring-slate-900/5 overflow-hidden">
        <div className="bg-slate-50 border-b p-3 flex justify-between items-center">
          <h2 className="font-semibold text-sm flex items-center gap-2">
            <ShoppingCart className="h-4 w-4" /> Carrinho
          </h2>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-muted-foreground">{cart.length} itens</span>
            {cart.length > 0 && (
              <button
                onClick={() => setCart([])}
                className="p-1 text-destructive hover:bg-destructive/10 rounded-md transition-colors"
                title="Limpar Pedido"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
        <CardContent className="p-0">
          <div className="max-h-[40vh] overflow-y-auto divide-y">
            {cart.length === 0 ? (
              <div className="p-6 text-center text-sm text-muted-foreground">
                Selecione produtos acima.
              </div>
            ) : (
              cart.map((i) => (
                <div key={i.id} className="flex items-center gap-3 p-3">
                  <div className="grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-md bg-accent text-2xl">
                    {i.imagem ? (
                      <img src={i.imagem} alt={i.p} className="h-full w-full object-cover" />
                    ) : (
                      <span className="opacity-50">{i.emoji || "🪴"}</span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-800 truncate">{i.p}</p>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-x-2 gap-y-0.5 mt-0.5">
                      <div className="flex items-center gap-0.5 text-[11px] sm:text-xs text-muted-foreground">
                        R$ 
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          value={i.u}
                          onChange={(e) => setUnitPrice(i.id, parseFloat(e.target.value) || 0)}
                          className="w-10 sm:w-12 bg-transparent border-b border-dashed border-slate-300 outline-none focus:border-brand p-0 m-0 text-slate-600 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                        un
                      </div>
                      <p className="text-xs text-brand font-bold">R$ {i.t.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 bg-slate-100 rounded-lg p-1">
                    <button
                      onClick={() => updateQuantity(i.id, -1)}
                      className="h-6 w-6 grid place-items-center bg-white rounded shadow-sm text-lg leading-none font-medium"
                    >
                      −
                    </button>
                    <input
                      type="number"
                      min="1"
                      value={i.q === "" ? "" : i.q}
                      onChange={(e) => setQuantity(i.id, e.target.value)}
                      className="w-8 text-center text-xs font-bold bg-transparent border-0 outline-none p-0 focus:ring-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    <button
                      onClick={() => updateQuantity(i.id, 1)}
                      className="h-6 w-6 grid place-items-center bg-white rounded shadow-sm text-lg leading-none font-medium"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(i.id)}
                    className="p-1.5 text-destructive bg-destructive/10 rounded-md"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))
            )}
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
            <span>R$ {subtotal.toFixed(2).replace(".", ",")}</span>
          </Button>
        </div>
      )}

      {/* Modal de Sucesso */}
      <Dialog open={isSuccessModalOpen} onOpenChange={closeSuccessModal}>
        <DialogContent className="w-[90vw] sm:max-w-[425px] rounded-2xl text-center">
          <div className="flex flex-col items-center justify-center space-y-4 py-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <DialogTitle className="text-2xl">Pedido Enviado!</DialogTitle>
            <DialogDescription className="text-center text-base">
              A venda foi registrada com sucesso e está aguardando a aprovação da loja para liberar
              sua comissão.
            </DialogDescription>
          </div>
          <div className="pt-2 flex flex-col gap-3 w-full">
            {davGeradoId && (
              <Button
                className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white h-12 text-sm sm:text-base font-bold shadow-md"
                onClick={handleShareWhatsApp}
              >
                Enviar Orçamento no WhatsApp
              </Button>
            )}
            <Button
              variant="outline"
              className="w-full border-slate-300 text-slate-800 hover:bg-slate-100 h-12 text-sm sm:text-base font-bold"
              onClick={closeSuccessModal}
            >
              Voltar ao Painel
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal do Cliente */}
      <Dialog open={isClientModalOpen} onOpenChange={setIsClientModalOpen}>
        <DialogContent className="w-[95vw] max-w-[500px] max-h-[90vh] overflow-y-auto rounded-2xl p-5 sm:p-6">
          <form onSubmit={submitOrder}>
            <DialogHeader>
              <DialogTitle>Finalizar Geração de Orçamento / Pedido</DialogTitle>
              <DialogDescription>
                Preencha os dados abaixo. Eles sairão no PDF oficial e serão enviados à loja.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-3">
                <h3 className="font-semibold text-brand text-sm border-b pb-1">Dados do Cliente</h3>
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Nome / Empresa *</label>
                  <Input
                    required
                    placeholder="Ex: João Silva ou Construtora X"
                    value={clientForm.nome}
                    onChange={(e) => setClientForm({ ...clientForm, nome: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium">CPF / CNPJ</label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Apenas números"
                      value={clientForm.documento}
                      onChange={(e) => {
                        setCnpjErro("");
                        setClientForm({ ...clientForm, documento: e.target.value });
                      }}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={buscarCnpj}
                      disabled={cnpjLoading}
                      title="Buscar dados pelo CNPJ"
                      className="shrink-0"
                    >
                      {cnpjLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Search className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  {cnpjErro && (
                    <p className="text-xs text-destructive">{cnpjErro}</p>
                  )}
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Telefone / WhatsApp</label>
                  <Input
                    placeholder="(00) 00000-0000"
                    value={clientForm.telefone}
                    onChange={(e) => setClientForm({ ...clientForm, telefone: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <label className="text-sm font-medium">CEP</label>
                    <Input
                      placeholder="00000-000"
                      value={clientForm.cep}
                      onChange={(e) => setClientForm({ ...clientForm, cep: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <label className="text-sm font-medium">Endereço (Rua)</label>
                    <Input
                      placeholder="Rua Exemplo"
                      value={clientForm.endereco}
                      onChange={(e) => setClientForm({ ...clientForm, endereco: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <label className="text-sm font-medium">Número</label>
                    <Input
                      placeholder="123"
                      value={clientForm.numero}
                      onChange={(e) => setClientForm({ ...clientForm, numero: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <label className="text-sm font-medium">Bairro</label>
                    <Input
                      placeholder="Centro"
                      value={clientForm.bairro}
                      onChange={(e) => setClientForm({ ...clientForm, bairro: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <label className="text-sm font-medium">Cidade</label>
                    <Input
                      placeholder="Sua Cidade"
                      value={clientForm.cidade}
                      onChange={(e) => setClientForm({ ...clientForm, cidade: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <label className="text-sm font-medium">Estado (UF)</label>
                    <Input
                      placeholder="SP"
                      value={clientForm.uf}
                      onChange={(e) => setClientForm({ ...clientForm, uf: e.target.value })}
                      maxLength={2}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-3 mt-2">
                <h3 className="font-semibold text-brand text-sm border-b pb-1">Condições</h3>
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Forma de Pagamento</label>
                  <select
                    className="flex h-10 w-full items-center justify-between rounded-md border border-slate-200 bg-white px-3 py-2 text-sm"
                    value={clientForm.pagamento}
                    onChange={(e) => {
                      setClientForm({ ...clientForm, pagamento: e.target.value });
                    }}
                  >
                    <option>Dinheiro / Pix</option>
                    <option>Cartão de Crédito</option>
                    <option>Cartão de Débito</option>
                    <option>Boleto a Prazo</option>
                  </select>
                  {clientForm.pagamento === "Boleto a Prazo" && (
                    <Input 
                      placeholder="Ex: 30/60/90 Dias" 
                      value={clientForm.condicaoBoleto}
                      onChange={(e) => setClientForm({ ...clientForm, condicaoBoleto: e.target.value })}
                      className="mt-1"
                    />
                  )}
                  <div className="mt-2">
                    <label className="text-sm font-medium">Aplicar Desconto (%)</label>
                    <div className="flex items-center mt-1 border rounded-md px-3 bg-white focus-within:ring-1 focus-within:ring-brand">
                      <input 
                        type="number"
                        min="0"
                        max="100"
                        step="0.1"
                        value={descontoPercentual}
                        onChange={(e) => setDescontoPercentual(parseFloat(e.target.value) || 0)}
                        className="flex h-10 w-full outline-none bg-transparent text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        placeholder="Ex: 5"
                      />
                      <span className="text-muted-foreground font-semibold">%</span>
                    </div>
                  </div>
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Forma do Frete</label>
                  <select
                    className="flex h-10 w-full items-center justify-between rounded-md border border-slate-200 bg-white px-3 py-2 text-sm"
                    value={clientForm.frete}
                    onChange={(e) => setClientForm({ ...clientForm, frete: e.target.value })}
                  >
                    <option>Retirada</option>
                    <option>FOB (Por conta do cliente)</option>
                    <option>CIF (Por conta da loja)</option>
                  </select>
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Observações</label>
                  <Input
                    placeholder="Anotações extras..."
                    value={clientForm.observacoes}
                    onChange={(e) => setClientForm({ ...clientForm, observacoes: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <div className="bg-slate-50 border-t -mx-4 -mb-4 mt-4 p-4 flex items-center justify-between shadow-[0_-4px_10px_rgba(0,0,0,0.02)] rounded-b-2xl">
              <div>
                <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">
                  Total a Pagar
                </p>
                {descontoPercentual > 0 ? (
                  <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground line-through">
                      R$ {rawSubtotal.toFixed(2).replace(".", ",")}
                    </span>
                    <p className="text-2xl font-extrabold text-brand font-display">
                      R$ {subtotal.toFixed(2).replace(".", ",")}
                    </p>
                  </div>
                ) : (
                  <p className="text-2xl font-extrabold text-brand font-display">
                    R$ {subtotal.toFixed(2).replace(".", ",")}
                  </p>
                )}
              </div>
              <div className="flex gap-2">
                <Button type="button" variant="outline" onClick={() => setIsClientModalOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit" disabled={loading} className="bg-gradient-brand text-white">
                  {loading ? "Processando..." : "Gerar Pedido"}
                </Button>
              </div>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/app-shell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Save, ArrowLeft, Plus, Trash2, ShoppingCart, Check, ChevronsUpDown } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/venda-nova")({
  head: () => ({ meta: [{ title: "Nova Venda/DAV — VIVAVERDE ERP" }] }),
  component: NovaVenda,
});

function NovaVenda() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [clientes, setClientes] = useState<any[]>([]);
  const [produtos, setProdutos] = useState<any[]>([]);

  // Form State
  const [clienteId, setClienteId] = useState("");
  const [tipo, setTipo] = useState("DAV"); // 'DAV' ou 'VENDA'
  const [status, setStatus] = useState("Orçamento");
  
  // Cart State
  const [itens, setItens] = useState<any[]>([]);
  const [produtoSelecionado, setProdutoSelecionado] = useState("");
  const [quantidade, setQuantidade] = useState(1);
  const [openProduto, setOpenProduto] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const { data: c } = await supabase.from('clientes').select('*').order('nome');
      const { data: p } = await supabase.from('produtos').select('*').eq('status', 'Ativo').order('nome');
      if (c) setClientes(c);
      if (p) setProdutos(p);
    };
    fetchData();
  }, []);

  const handleAddItem = () => {
    if (!produtoSelecionado || quantidade <= 0) return;
    const prod = produtos.find(p => p.id === produtoSelecionado);
    if (!prod) return;

    if (tipo === "VENDA" && prod.estoque < quantidade) {
        alert(`Estoque insuficiente! Você tem apenas ${prod.estoque} unidades de ${prod.nome}.`);
        return;
    }

    const novoItem = {
      produto_id: prod.id,
      nome: prod.nome,
      valor_unitario: Number(prod.valor),
      quantidade: quantidade,
      subtotal: Number(prod.valor) * quantidade,
    };

    setItens([...itens, novoItem]);
    setProdutoSelecionado("");
    setQuantidade(1);
  };

  const handleRemoveItem = (index: number) => {
    const novosItens = [...itens];
    novosItens.splice(index, 1);
    setItens(novosItens);
  };

  const valorTotal = itens.reduce((acc, item) => acc + item.subtotal, 0);

  const handleSalvar = async () => {
    if (!clienteId) { alert("Selecione um cliente."); return; }
    if (itens.length === 0) { alert("Adicione pelo menos um produto."); return; }

    setLoading(true);
    try {
      // 1. Criar a Venda/DAV
      const { data: vendaData, error: vendaError } = await supabase.from('vendas').insert([{
        cliente_id: clienteId,
        tipo: tipo,
        status: status,
        valor_total: valorTotal
      }]).select().single();

      if (vendaError) throw vendaError;
      const vendaId = vendaData.id;

      // 2. Inserir os Itens
      const itensToInsert = itens.map(i => ({
        venda_id: vendaId,
        produto_id: i.produto_id,
        quantidade: i.quantidade,
        valor_unitario: i.valor_unitario,
        subtotal: i.subtotal
      }));

      const { error: itensError } = await supabase.from('vendas_itens').insert(itensToInsert);
      if (itensError) throw itensError;

      // 3. Dar baixa no estoque e gerar financeiro (Somente se for VENDA e não Orçamento)
      if (tipo === "VENDA") {
        for (const item of itens) {
           const prod = produtos.find(p => p.id === item.produto_id);
           const novoEstoque = prod.estoque - item.quantidade;
           await supabase.from('produtos').update({ estoque: novoEstoque }).eq('id', item.produto_id);
        }

        // Criar Conta a Receber
        const vencimento = new Date();
        vencimento.setDate(vencimento.getDate() + 30); // 30 dias de prazo
        await supabase.from('contas_receber').insert([{
           venda_id: vendaId,
           cliente_id: clienteId,
           descricao: `Venda #${vendaId.substring(0,8).toUpperCase()}`,
           valor: valorTotal,
           vencimento: vencimento.toISOString().split('T')[0],
           status: status === "Pago" ? "Recebido" : "Pendente",
           data_pagamento: status === "Pago" ? new Date().toISOString().split('T')[0] : null
        }]);
      }

      alert(tipo === "DAV" ? "Orçamento criado com sucesso!" : "Venda finalizada com sucesso!");
      navigate({ to: "/app/vendas" });

    } catch (err: any) {
      console.error(err);
      alert("Erro ao salvar: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Ajustar o status padrão ao mudar o tipo
  useEffect(() => {
     if (tipo === "DAV") setStatus("Orçamento");
     if (tipo === "VENDA") setStatus("Pago");
  }, [tipo]);

  return (
    <>
      <PageHeader title={tipo === "DAV" ? "Novo Orçamento (DAV)" : "Nova Venda"} subtitle="Preencha os dados e adicione os itens" actions={
        <>
          <Button variant="outline" asChild><Link to="/app/vendas"><ArrowLeft className="mr-2 h-4 w-4" /> Voltar</Link></Button>
          <Button className="bg-gradient-brand text-primary-foreground" onClick={handleSalvar} disabled={loading || itens.length === 0}>
            <Save className="mr-2 h-4 w-4" /> {loading ? "Processando..." : (tipo === "DAV" ? "Salvar Orçamento" : "Finalizar Venda")}
          </Button>
        </>
      } />

      <div className="grid gap-6 md:grid-cols-3">
        {/* Lado Esquerdo - Formulário Principal */}
        <div className="md:col-span-2 space-y-6">
          <Card className="shadow-card p-6 space-y-4">
            <h3 className="font-semibold text-lg flex items-center gap-2"><ShoppingCart className="h-5 w-5 text-brand" /> Dados da Operação</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Tipo de Operação</Label>
                <select 
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  value={tipo} onChange={e => setTipo(e.target.value)}
                >
                  <option value="DAV">Orçamento (DAV)</option>
                  <option value="VENDA">Venda Direta (Baixa Estoque)</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label>Status</Label>
                <select 
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  value={status} onChange={e => setStatus(e.target.value)}
                >
                  {tipo === "DAV" ? (
                    <><option value="Orçamento">Orçamento Aberto</option><option value="Aprovado">Aprovado pelo Cliente</option><option value="Rejeitado">Rejeitado</option></>
                  ) : (
                    <><option value="Pago">Pago / Finalizado</option><option value="Aguardando Pagamento">Aguardando Pagamento</option><option value="Em Separação">Em Separação</option></>
                  )}
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Cliente</Label>
              <select 
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                value={clienteId} onChange={e => setClienteId(e.target.value)}
              >
                <option value="">Selecione um cliente...</option>
                {clientes.map(c => <option key={c.id} value={c.id}>{c.nome} ({c.cidade || 'S/ Cidade'})</option>)}
              </select>
            </div>
          </Card>

          {/* Adicionar Itens */}
          <Card className="shadow-card p-6 space-y-4">
            <h3 className="font-semibold text-lg">Itens do Pedido</h3>
            <div className="flex gap-4 items-end">
              <div className="space-y-2 flex-1 flex flex-col justify-end">
                <Label>Produto</Label>
                <Popover open={openProduto} onOpenChange={setOpenProduto}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={openProduto}
                      className="w-full justify-between h-10 font-normal px-3"
                    >
                      {produtoSelecionado
                        ? (() => {
                            const p = produtos.find(p => p.id === produtoSelecionado);
                            return p ? `${p.nome} - R$ ${Number(p.valor).toFixed(2)} (Estoque: ${p.estoque})` : "Selecionar produto...";
                          })()
                        : "Selecionar ou buscar produto..."}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[450px] p-0" align="start">
                    <Command>
                      <CommandInput placeholder="Buscar produto por nome..." />
                      <CommandList>
                        <CommandEmpty>Nenhum produto encontrado.</CommandEmpty>
                        <CommandGroup>
                          {produtos.map((p) => (
                            <CommandItem
                              key={p.id}
                              value={p.nome + " " + p.id}
                              onSelect={() => {
                                setProdutoSelecionado(p.id === produtoSelecionado ? "" : p.id)
                                setOpenProduto(false)
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  produtoSelecionado === p.id ? "opacity-100" : "opacity-0"
                                )}
                              />
                              {p.nome} - R$ {Number(p.valor).toFixed(2)} (Estoque: {p.estoque})
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2 w-24">
                <Label>Qtd</Label>
                <Input type="number" min="1" value={quantidade} onChange={e => setQuantidade(Number(e.target.value))} />
              </div>
              <Button type="button" onClick={handleAddItem} variant="secondary"><Plus className="h-4 w-4 mr-2" /> Adicionar</Button>
            </div>

            <div className="border rounded-md mt-4">
              <Table>
                <TableHeader><TableRow><TableHead>Produto</TableHead><TableHead className="text-right">Qtd</TableHead><TableHead className="text-right">Unitário</TableHead><TableHead className="text-right">Subtotal</TableHead><TableHead></TableHead></TableRow></TableHeader>
                <TableBody>
                  {itens.length === 0 ? (
                    <TableRow><TableCell colSpan={5} className="text-center py-4 text-muted-foreground">Nenhum item adicionado ao carrinho.</TableCell></TableRow>
                  ) : (
                    itens.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-semibold">{item.nome}</TableCell>
                        <TableCell className="text-right">{item.quantidade}</TableCell>
                        <TableCell className="text-right">R$ {item.valor_unitario.toFixed(2)}</TableCell>
                        <TableCell className="text-right font-bold">R$ {item.subtotal.toFixed(2)}</TableCell>
                        <TableCell className="text-right"><Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => handleRemoveItem(index)}><Trash2 className="h-4 w-4" /></Button></TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </Card>
        </div>

        {/* Lado Direito - Resumo */}
        <div className="space-y-6">
          <Card className="shadow-card p-6 bg-accent/30 border-brand/20">
            <h3 className="font-semibold text-lg mb-4">Resumo</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Subtotal ({itens.length} itens)</span><span className="font-semibold">R$ {valorTotal.toFixed(2)}</span></div>
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Descontos</span><span className="font-semibold">R$ 0,00</span></div>
              <div className="h-px w-full bg-border my-2" />
              <div className="flex justify-between items-center"><span className="font-semibold text-lg">Total</span><span className="font-display text-2xl font-bold text-brand">R$ {valorTotal.toFixed(2)}</span></div>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}

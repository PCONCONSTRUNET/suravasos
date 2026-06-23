import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/app-shell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Save, ShoppingCart, ArrowLeft, Plus, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { supabaseParceiro as supabase } from "@/lib/supabase";

export const Route = createFileRoute("/parceiro/dav")({
  head: () => ({ meta: [{ title: "Novo Pedido (DAV) — Parceiro VIVAVERDE" }] }),
  validateSearch: (search: Record<string, unknown>): { pedido?: string } => ({
    pedido: search.pedido as string | undefined,
  }),
  component: ParceiroDAV,
});

function ParceiroDAV() {
  const navigate = useNavigate();
  const { pedido } = Route.useSearch();
  const [loading, setLoading] = useState(false);
  const [pedidoDosCatalogo, setPedidoDosCatalogo] = useState(false);
  const [vendedorId, setVendedorId] = useState<string | null>(null);
  const [vendedorNome, setVendedorNome] = useState<string>("");

  const [cliente, setCliente] = useState({ nome: "", cnpj: "", endereco: "", telefone: "" });
  const [condicoes, setCondicoes] = useState({ pagamento: "30/60/90 dias — Boleto", frete: "CIF", prazo: "3 dias úteis" });
  const [observacoes, setObservacoes] = useState("");

  const [itens, setItens] = useState([{ id: Date.now(), codigo: "", produto: "", qtd: 1, vlrUnit: 0, db_id: "" }]);
  const [descontoPerc, setDescontoPerc] = useState(0);
  const [freteValor, setFreteValor] = useState(0);

  useEffect(() => {
    const init = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate({ to: "/parceiro/login" });
        return;
      }
      
      const { data: vData, error: vError } = await supabase
        .from('vendedores')
        .select('id, status, nome')
        .eq('user_id', session.user.id)
        .limit(1)
        .maybeSingle();
        
      if (vData) {
        setVendedorId(vData.id);
        setVendedorNome(vData.nome);
        if (vData.status === 'Aguardando Aprovação') {
          navigate({ to: "/parceiro/dashboard" });
          return;
        }
      } else {
        navigate({ to: "/parceiro/dashboard" });
        return;
      }

      // Pré-preencher a partir do link do catálogo
      if (pedido) {
        try {
          const decoded = decodeURIComponent(escape(atob(pedido)));
          const pares: [string, number][] = JSON.parse(decoded);
          if (!Array.isArray(pares) || pares.length === 0) return;

          const ids = pares.map(p => p[0]);
          const { data: produtos } = await supabase
            .from('produtos')
            .select('id, codigo, nome, valor')
            .in('id', ids);

          if (!produtos) return;

          const mapa = Object.fromEntries(produtos.map(p => [p.id, p]));

          const itensPreenchidos = pares.map(([id, qtd], idx) => {
            const p = mapa[id];
            return {
              id: Date.now() + idx,
              db_id: p?.id || "",
              codigo: p?.codigo || "",
              produto: p?.nome || "",
              qtd: Number(qtd) || 1,
              vlrUnit: Number(p?.valor) || 0,
            };
          }).filter(i => i.produto);

          if (itensPreenchidos.length > 0) {
            setItens(itensPreenchidos);
            setPedidoDosCatalogo(true);
          }
        } catch (e) {
          console.error("Erro ao decodificar pedido:", e);
        }
      }
    };
    init();
  }, [pedido]);

  const addItem = () => setItens([...itens, { id: Date.now(), codigo: "", produto: "", qtd: 1, vlrUnit: 0, db_id: "" }]);
  const removeItem = (id: number) => setItens(itens.filter(i => i.id !== id));
  const updateItem = (id: number, field: string, value: string | number) => {
    setItens(itens.map(i => i.id === id ? { ...i, [field]: value } : i));
  };

  const subtotal = itens.reduce((acc, item) => acc + (item.qtd * item.vlrUnit), 0);
  const descontoValor = subtotal * (descontoPerc / 100);
  const total = subtotal - descontoValor + freteValor;

  const handleSalvar = async () => {
    if (!cliente.nome || !cliente.cnpj || !cliente.endereco || !cliente.telefone) {
      alert("Por favor, preencha todos os dados obrigatórios do cliente (Nome, CPF/CNPJ, Endereço e Telefone).");
      return;
    }
    if (itens.length === 0 || !itens[0].produto) {
      alert("Adicione pelo menos um produto.");
      return;
    }
    if (!vendedorId) return;

    setLoading(true);
    try {
      // 1. Salvar ou buscar cliente
      let finalClienteId = null;
      let existingCliente = null;
      
      if (cliente.cnpj) {
        const { data } = await supabase.from('clientes')
          .select('id')
          .eq('cpf_cnpj', cliente.cnpj)
          .limit(1)
          .maybeSingle();
        existingCliente = data;
      }
      
      if (!existingCliente && cliente.nome) {
        const { data } = await supabase.from('clientes')
          .select('id')
          .ilike('nome', cliente.nome)
          .limit(1)
          .maybeSingle();
        existingCliente = data;
      }

      if (existingCliente) {
        finalClienteId = existingCliente.id;
      } else {
        const { data: clienteData, error: clienteError } = await supabase.from('clientes').insert([{
          nome: cliente.nome,
          cpf_cnpj: cliente.cnpj,
          telefone: cliente.telefone,
          endereco: cliente.endereco
        }]).select().single();

        if (!clienteError && clienteData) {
          finalClienteId = clienteData.id;
        }
      }

      // 2. Criar a Venda Pendente para o Dono aprovar comissão/estoque
      const { data: vendaData, error: vendaError } = await supabase.from('vendas').insert([{
        tipo: 'PDV', // Trata como venda de PDV pendente
        status_aprovacao: 'Pendente',
        status: 'Pendente',
        valor_total: total,
        vendedor_id: vendedorId,
        cliente_id: finalClienteId
      }]).select().single();

      if (vendaError) throw vendaError;

      // Inserir itens da venda (apenas aqueles que vieram do banco ou tentar buscar para não quebrar a fk)
      // Como o parceiro pode digitar um produto livre, se não tiver db_id válido, evitamos inserir em vendas_itens (pois precisa de produto_id válido)
      // Mas para garantir o fluxo do catálogo, usamos o db_id
      const validVendaItems = itens.filter(i => i.db_id).map(i => ({
        venda_id: vendaData.id,
        produto_id: i.db_id,
        quantidade: i.qtd,
        valor_unitario: i.vlrUnit,
        subtotal: i.qtd * i.vlrUnit
      }));
      if (validVendaItems.length > 0) {
        await supabase.from('vendas_itens').insert(validVendaItems);
      }

      // 3. Gerar o DAV Visual (para registro de frete, prazo, etc)
      const { data: dav, error: davError } = await supabase.from('davs').insert({
        cliente_nome: cliente.nome,
        cliente_cnpj: cliente.cnpj,
        cliente_endereco: cliente.endereco,
        cliente_telefone: cliente.telefone,
        vendedor: vendedorNome,
        condicao_pagamento: condicoes.pagamento,
        frete_tipo: condicoes.frete,
        prazo_entrega: condicoes.prazo,
        subtotal: subtotal,
        desconto_percentual: descontoPerc,
        desconto_valor: descontoValor,
        frete_valor: freteValor,
        total: total,
        observacoes: observacoes,
        validade: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        created_at: new Date().toISOString(),
      }).select('id').single();

      if (davError) throw davError;

      const itensToInsertDav = itens.map(i => ({
        dav_id: dav.id,
        codigo: i.codigo,
        produto: i.produto,
        qtd: i.qtd,
        valor_unitario: i.vlrUnit,
        total: i.qtd * i.vlrUnit
      }));
      await supabase.from('dav_items').insert(itensToInsertDav);

      // 4. Notificar dono
      await supabase.from('notificacoes').insert([{
        tipo: 'venda',
        titulo: `Novo Orçamento (DAV) - ${vendedorNome}`,
        mensagem: `O parceiro enviou o pedido de ${cliente.nome} no valor de ${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(total)} para aprovação.`
      }]);

      alert("Pedido enviado para aprovação com sucesso!");
      navigate({ to: "/parceiro/dashboard" });

    } catch (err: any) {
      console.error(err);
      alert("Erro ao enviar pedido: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageHeader title="Finalizar Pedido (DAV)" subtitle="Preencha os dados do cliente e condições para enviar o pedido" actions={
        <>
          <Button variant="outline" asChild><Link to="/parceiro/dashboard"><ArrowLeft className="mr-2 h-4 w-4" /> Voltar</Link></Button>
          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white" onClick={handleSalvar} disabled={loading}>
            <Save className="mr-2 h-4 w-4" /> {loading ? "Enviando..." : "Enviar Pedido"}
          </Button>
        </>
      } />

      {pedidoDosCatalogo && (
        <div className="mb-6 flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-5 py-4">
          <div className="h-10 w-10 rounded-full bg-emerald-100 grid place-items-center shrink-0">
            <ShoppingCart className="h-5 w-5 text-emerald-600" />
          </div>
          <div>
            <p className="font-semibold text-emerald-800">Pedido do Catálogo Carregado!</p>
            <p className="text-sm text-emerald-600 mt-0.5">
              Os itens que o cliente escolheu já estão na lista. Complete os dados obrigatórios abaixo para enviar ao faturamento.
            </p>
          </div>
        </div>
      )}

      <Card className="shadow-card p-6 max-w-5xl mx-auto space-y-8">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="font-semibold border-b pb-2 text-emerald-800">Dados do Cliente (Obrigatório)</h3>
            <div className="space-y-2">
              <Label>Nome / Razão Social</Label>
              <Input value={cliente.nome} onChange={e => setCliente({...cliente, nome: e.target.value})} placeholder="Ex: Jardim Verde Ltda" />
            </div>
            <div className="space-y-2">
              <Label>CNPJ / CPF</Label>
              <Input value={cliente.cnpj} onChange={e => setCliente({...cliente, cnpj: e.target.value})} placeholder="00.000.000/0000-00" />
            </div>
            <div className="space-y-2">
              <Label>Endereço Completo</Label>
              <Input value={cliente.endereco} onChange={e => setCliente({...cliente, endereco: e.target.value})} placeholder="Rua, Número, Bairro, Cidade - UF" />
            </div>
            <div className="space-y-2">
              <Label>Telefone / WhatsApp</Label>
              <Input value={cliente.telefone} onChange={e => setCliente({...cliente, telefone: e.target.value})} placeholder="(00) 00000-0000" />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold border-b pb-2 text-emerald-800">Condições Comerciais (Obrigatório)</h3>
            <div className="space-y-2">
              <Label>Vendedor</Label>
              <Input value={vendedorNome} disabled className="bg-slate-50" />
            </div>
            <div className="space-y-2">
              <Label>Condição de Pagamento</Label>
              <Input value={condicoes.pagamento} onChange={e => setCondicoes({...condicoes, pagamento: e.target.value})} />
            </div>
            <div className="space-y-2">
              <Label>Tipo de Frete</Label>
              <Input value={condicoes.frete} onChange={e => setCondicoes({...condicoes, frete: e.target.value})} />
            </div>
            <div className="space-y-2">
              <Label>Prazo de Entrega</Label>
              <Input value={condicoes.prazo} onChange={e => setCondicoes({...condicoes, prazo: e.target.value})} />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between border-b pb-2">
            <h3 className="font-semibold text-emerald-800">Produtos do Pedido</h3>
            <Button variant="outline" size="sm" onClick={addItem}><Plus className="mr-2 h-4 w-4" /> Adicionar Linha Manual</Button>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-24">Código</TableHead>
                  <TableHead>Produto</TableHead>
                  <TableHead className="w-24 text-right">Qtd</TableHead>
                  <TableHead className="w-32 text-right">Vlr Unit. (R$)</TableHead>
                  <TableHead className="w-32 text-right">Total</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {itens.map((i) => (
                  <TableRow key={i.id}>
                    <TableCell><Input className="h-8" value={i.codigo} onChange={e => updateItem(i.id, 'codigo', e.target.value)} /></TableCell>
                    <TableCell><Input className="h-8" value={i.produto} onChange={e => updateItem(i.id, 'produto', e.target.value)} /></TableCell>
                    <TableCell><Input className="h-8 text-right" type="number" min="1" value={i.qtd} onChange={e => updateItem(i.id, 'qtd', Number(e.target.value))} /></TableCell>
                    <TableCell><Input className="h-8 text-right" type="number" step="0.01" min="0" value={i.vlrUnit} onChange={e => updateItem(i.id, 'vlrUnit', Number(e.target.value))} /></TableCell>
                    <TableCell className="text-right font-medium pt-3">{(i.qtd * i.vlrUnit).toFixed(2)}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => removeItem(i.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between gap-6 pt-4 border-t">
          <div className="flex-1 space-y-2">
            <Label>Observações do Pedido</Label>
            <Input value={observacoes} onChange={e => setObservacoes(e.target.value)} placeholder="Anotações para a fábrica, endereço alternativo de entrega..." />
          </div>

          <div className="w-full md:w-64 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Subtotal</span>
              <span className="font-medium">R$ {subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Desc. (%)</span>
              <Input className="w-20 h-8 text-right" type="number" min="0" max="100" value={descontoPerc} onChange={e => setDescontoPerc(Number(e.target.value))} />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Frete (R$)</span>
              <Input className="w-24 h-8 text-right" type="number" min="0" step="0.01" value={freteValor} onChange={e => setFreteValor(Number(e.target.value))} />
            </div>
            <div className="flex justify-between items-center border-t pt-3 text-lg font-bold">
              <span>Total Final</span>
              <span className="text-emerald-700">R$ {total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
}

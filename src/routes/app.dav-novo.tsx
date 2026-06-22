import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { PageHeader } from "@/components/app-shell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Save, Plus, Trash2, ShoppingCart } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/app/dav-novo")({
  head: () => ({ meta: [{ title: "Novo DAV — VIVAVERDE ERP" }] }),
  validateSearch: (search: Record<string, unknown>) => ({
    pedido: search.pedido as string | undefined,
  }),
  component: NovoDAV,
});

function NovoDAV() {
  const navigate = useNavigate();
  const { pedido } = Route.useSearch();
  const [loading, setLoading] = useState(false);
  const [pedidoDosCatalogo, setPedidoDosCatalogo] = useState(false);

  const [cliente, setCliente] = useState({ nome: "", cnpj: "", endereco: "", telefone: "" });
  const [condicoes, setCondicoes] = useState({ vendedor: "", pagamento: "30/60/90 dias — Boleto", frete: "CIF", prazo: "3 dias úteis" });
  const [observacoes, setObservacoes] = useState("");

  const [itens, setItens] = useState([{ id: Date.now(), codigo: "", produto: "", qtd: 1, vlrUnit: 0 }]);
  const [descontoPerc, setDescontoPerc] = useState(0);
  const [freteValor, setFreteValor] = useState(0);

  // Pré-preencher a partir do link do catálogo
  useEffect(() => {
    if (!pedido) return;
    try {
      const decoded = decodeURIComponent(escape(atob(pedido)));
      const itensPedido = JSON.parse(decoded);
      if (Array.isArray(itensPedido) && itensPedido.length > 0) {
        setItens(
          itensPedido.map((i: any, idx: number) => ({
            id: Date.now() + idx,
            codigo: i.codigo || "",
            produto: i.produto || "",
            qtd: Number(i.qtd) || 1,
            vlrUnit: Number(i.vlrUnit) || 0,
          }))
        );
        setPedidoDosCatalogo(true);
      }
    } catch (e) {
      console.error("Erro ao decodificar pedido do catálogo:", e);
    }
  }, [pedido]);

  const addItem = () => setItens([...itens, { id: Date.now(), codigo: "", produto: "", qtd: 1, vlrUnit: 0 }]);

  const removeItem = (id: number) => setItens(itens.filter(i => i.id !== id));

  const updateItem = (id: number, field: string, value: string | number) => {
    setItens(itens.map(i => i.id === id ? { ...i, [field]: value } : i));
  };

  const subtotal = itens.reduce((acc, item) => acc + (item.qtd * item.vlrUnit), 0);
  const descontoValor = subtotal * (descontoPerc / 100);
  const total = subtotal - descontoValor + freteValor;

  const handleSalvar = async () => {
    if (!cliente.nome) {
      alert("Preencha o nome do cliente.");
      return;
    }
    if (itens.length === 0 || !itens[0].produto) {
      alert("Adicione pelo menos um produto.");
      return;
    }

    setLoading(true);
    try {
      const { data: dav, error: davError } = await supabase.from('davs').insert({
        cliente_nome: cliente.nome,
        cliente_cnpj: cliente.cnpj,
        cliente_endereco: cliente.endereco,
        cliente_telefone: cliente.telefone,
        vendedor: condicoes.vendedor,
        condicao_pagamento: condicoes.pagamento,
        frete_tipo: condicoes.frete,
        prazo_entrega: condicoes.prazo,
        subtotal: subtotal,
        desconto_percentual: descontoPerc,
        desconto_valor: descontoValor,
        frete_valor: freteValor,
        total: total,
        observacoes: observacoes,
        validade: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
      }).select('id').single();

      if (davError) throw davError;

      const itensToInsert = itens.map(i => ({
        dav_id: dav.id,
        codigo: i.codigo,
        produto: i.produto,
        qtd: i.qtd,
        valor_unitario: i.vlrUnit,
        total: i.qtd * i.vlrUnit
      }));

      const { error: itemsError } = await supabase.from('dav_items').insert(itensToInsert);
      if (itemsError) throw itemsError;

      navigate({ to: "/app/dav", search: { id: dav.id } });

    } catch (err: any) {
      console.error(err);
      alert("Erro ao salvar o DAV: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageHeader title="Novo Orçamento (DAV)" subtitle="Preencha os dados para gerar um Documento Auxiliar de Venda" actions={
        <Button className="bg-gradient-brand text-primary-foreground" onClick={handleSalvar} disabled={loading}>
          <Save className="mr-2 h-4 w-4" /> {loading ? "Salvando..." : "Salvar DAV"}
        </Button>
      } />

      {/* Banner do pedido recebido do catálogo */}
      {pedidoDosCatalogo && (
        <div className="mb-6 flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-5 py-4">
          <div className="h-10 w-10 rounded-full bg-emerald-100 grid place-items-center shrink-0">
            <ShoppingCart className="h-5 w-5 text-emerald-600" />
          </div>
          <div>
            <p className="font-semibold text-emerald-800">Pedido recebido do catálogo público!</p>
            <p className="text-sm text-emerald-600 mt-0.5">
              Os itens abaixo foram preenchidos automaticamente. Complete os dados do cliente e salve.
            </p>
          </div>
        </div>
      )}

      <Card className="shadow-card p-6 max-w-5xl mx-auto space-y-8">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="font-semibold border-b pb-2">Dados do Cliente</h3>
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
              <Label>Telefone</Label>
              <Input value={cliente.telefone} onChange={e => setCliente({...cliente, telefone: e.target.value})} placeholder="(00) 00000-0000" />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold border-b pb-2">Condições Comerciais</h3>
            <div className="space-y-2">
              <Label>Vendedor</Label>
              <Input value={condicoes.vendedor} onChange={e => setCondicoes({...condicoes, vendedor: e.target.value})} placeholder="Nome do vendedor" />
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
            <h3 className="font-semibold">Produtos</h3>
            <Button variant="outline" size="sm" onClick={addItem}><Plus className="mr-2 h-4 w-4" /> Adicionar Produto</Button>
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
            <Input value={observacoes} onChange={e => setObservacoes(e.target.value)} placeholder="Anotações para o cliente ou para a entrega..." />
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
              <span>Total</span>
              <span className="text-primary">R$ {total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
}

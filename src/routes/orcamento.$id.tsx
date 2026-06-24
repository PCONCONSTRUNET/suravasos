import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { VivaverdeLogo } from "@/components/vivaverde-logo";

export const Route = createFileRoute("/orcamento/$id")({
  head: () => ({ meta: [{ title: "Orçamento (DAV) - Impressão" }] }),
  component: ImprimirDAV,
});

function ImprimirDAV() {
  const { id } = Route.useParams();
  const [venda, setVenda] = useState<any>(null);
  const [itens, setItens] = useState<any[]>([]);

  useEffect(() => {
    async function loadData() {
      const { data: v } = await supabase.from("vendas").select("*, clientes(*)").eq("id", id).single();
      if (v) setVenda(v);

      const { data: i } = await supabase.from("vendas_itens").select("*, produtos(nome)").eq("venda_id", id);
      if (i) setItens(i);
      
      if (v) {
        setTimeout(() => window.print(), 800);
      }
    }
    loadData();
  }, [id]);

  if (!venda) return <div className="p-8 text-center font-sans">Carregando Orçamento...</div>;

  const cliente = venda.clientes || {};
  const dataDAV = new Date(venda.created_at).toLocaleDateString();

  return (
    <div className="bg-white min-h-screen text-black p-8 font-sans" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <style>{`
        @media print {
          @page { margin: 10mm; size: A4; }
          body { background: white; -webkit-print-color-adjust: exact; }
          /* Esconder cabeçalhos padrão do navegador */
          header, footer, nav, aside { display: none; }
        }
      `}</style>

      {/* Cabeçalho */}
      <div className="flex justify-between items-start border-b-2 border-slate-900 pb-6 mb-6">
        <div>
          <VivaverdeLogo size="small" />
          <div className="mt-4 text-sm text-slate-600">
            <p className="font-bold text-slate-900">VIVAVERDE VASOS E SUPORTES</p>
            <p>CNPJ: 63.874.628/0001-36</p>
            <p>Rua Bom Jesus, 267 - Paraisolandia</p>
            <p>Charqueada - SP, 13.519-008</p>
          </div>
        </div>
        <div className="text-right">
          <h1 className="text-3xl font-bold text-slate-900 uppercase tracking-wider">Orçamento</h1>
          <p className="text-sm font-medium mt-1">DAV Nº: {venda.id.substring(0, 8).toUpperCase()}</p>
          <p className="text-sm">Data: {dataDAV}</p>
          <p className="text-sm font-medium mt-1 text-slate-600">Validade: 7 dias</p>
        </div>
      </div>

      {/* Dados do Cliente */}
      <div className="bg-slate-50 p-4 rounded-lg mb-6 border border-slate-200">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-3">Dados do Cliente</h2>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p><span className="font-semibold">Nome:</span> {cliente.nome || "Consumidor Final"}</p>
            {cliente.cpf_cnpj && <p><span className="font-semibold">CPF/CNPJ:</span> {cliente.cpf_cnpj}</p>}
            {cliente.telefone && <p><span className="font-semibold">Telefone:</span> {cliente.telefone}</p>}
          </div>
          <div>
            {cliente.endereco && <p><span className="font-semibold">Endereço:</span> {cliente.endereco}</p>}
            {cliente.cidade && <p><span className="font-semibold">Cidade/UF:</span> {cliente.cidade}{cliente.uf ? `/${cliente.uf}` : ''}</p>}
          </div>
        </div>
      </div>

      {/* Itens */}
      <div className="mb-6">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-3">Produtos</h2>
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-slate-900 text-white">
              <th className="py-2 px-3 text-left">Produto</th>
              <th className="py-2 px-3 text-center">Qtd</th>
              <th className="py-2 px-3 text-right">Vlr. Unit</th>
              <th className="py-2 px-3 text-right">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {itens.map((item, i) => (
              <tr key={i} className="border-b border-slate-200">
                <td className="py-2 px-3">{item.produtos?.nome || "Produto Desconhecido"}</td>
                <td className="py-2 px-3 text-center">{item.quantidade}</td>
                <td className="py-2 px-3 text-right">R$ {Number(item.valor_unitario).toFixed(2).replace('.', ',')}</td>
                <td className="py-2 px-3 text-right font-medium">R$ {Number(item.subtotal).toFixed(2).replace('.', ',')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Totais */}
      <div className="flex justify-end">
        <div className="w-64 bg-slate-50 p-4 rounded-lg border border-slate-200">
          <div className="flex justify-between items-center text-sm mb-2">
            <span className="text-slate-600">Subtotal:</span>
            <span>R$ {Number(venda.valor_total).toFixed(2).replace('.', ',')}</span>
          </div>
          <div className="flex justify-between items-center text-lg font-bold border-t border-slate-200 pt-2 mt-2">
            <span>Total:</span>
            <span>R$ {Number(venda.valor_total).toFixed(2).replace('.', ',')}</span>
          </div>
        </div>
      </div>

      {/* Assinatura */}
      <div className="mt-24 grid grid-cols-2 gap-12 text-center text-sm">
        <div>
          <div className="border-t border-slate-400 pt-2">Assinatura do Vendedor</div>
        </div>
        <div>
          <div className="border-t border-slate-400 pt-2">Assinatura do Cliente</div>
        </div>
      </div>
      
      <div className="mt-8 text-center text-xs text-slate-400">
        Este documento não possui valor fiscal. É apenas um Documento Auxiliar de Venda.
      </div>
    </div>
  );
}

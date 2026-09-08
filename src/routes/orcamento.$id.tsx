import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { GardenPrimeLogo } from "@/components/garden-prime-logo";
import { Printer, ArrowLeft, Loader2 } from "lucide-react";
import { WhatsAppIcon, shareOrderWhatsApp } from "@/lib/order-pdf";

export const Route = createFileRoute("/orcamento/$id")({
  head: () => ({ meta: [{ title: "Orçamento (DAV) - Impressão" }] }),
  component: ImprimirDAV,
});

function ImprimirDAV() {
  const { id } = Route.useParams();
  const [dav, setDav] = useState<any>(null);
  const [itens, setItens] = useState<any[]>([]);
  const [sharing, setSharing] = useState(false);

  useEffect(() => {
    async function loadData() {
      let { data: d } = await supabase
        .from("davs")
        .select("*")
        .eq("id", id)
        .single();

      let itemsData: any[] = [];

      if (d) {
        setDav(d);
        const { data: i } = await supabase
          .from("dav_items")
          .select("*")
          .eq("dav_id", id);
        if (i) itemsData = i;
      } else {
        // Tenta buscar na tabela de vendas (Vendas ou DAVs antigos)
        const { data: v } = await supabase
          .from("vendas")
          .select("*, cliente:clientes(*), vendedor:vendedores(nome)")
          .eq("id", id)
          .single();
        
        if (v) {
          const cli = v.cliente;
          const enderecoPartes = [
            cli?.endereco,
            cli?.numero ? `Nº ${cli.numero}` : null,
            cli?.bairro,
            cli?.cidade && cli?.uf ? `${cli.cidade}/${cli.uf}` : cli?.cidade || cli?.uf || null,
            cli?.cep ? `CEP: ${cli.cep}` : null,
          ].filter(Boolean).join(", ");

          d = {
             id: v.id,
             numero: v.numero_venda || v.numero,
             created_at: v.created_at,
             cliente_nome: cli?.nome,
             cliente_cnpj: cli?.cpf_cnpj,
             cliente_telefone: cli?.telefone,
             cliente_endereco: enderecoPartes || null,
             condicao_pagamento: v.metodo_pagamento,
             subtotal: v.subtotal || v.valor_total,
             desconto_valor: v.desconto_valor || 0,
             desconto_percentual: v.desconto_percentual || 0,
             frete_valor: v.frete_valor || 0,
             total: v.valor_total,
             vendedor: v.vendedor?.nome || "",
             emissor_nome: "GARDEN PRIME",
             isVenda: v.tipo !== "DAV",
             rawVenda: v,
          };
          setDav(d);
          
          const { data: vi } = await supabase
            .from("vendas_itens")
            .select("*, produto:produtos(nome, codigo)")
            .eq("venda_id", id);
          
          if (vi) {
             itemsData = vi.map(item => ({
               codigo: item.produto?.codigo,
               produto: item.produto?.nome || "Produto sem nome",
               qtd: item.quantidade,
               valor_unitario: item.valor_unitario,
               total: item.subtotal
             }));
          }
        }
      }

      setItens(itemsData);

      if (d) {
        setTimeout(() => window.print(), 800);
      }
    }
    loadData();
  }, [id]);

  if (!dav) return <div className="p-8 text-center font-sans">Carregando documento...</div>;

  const dataDAV = new Date(dav.created_at).toLocaleDateString("pt-BR");
  const horaDAV = new Date(dav.created_at).toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const validadeStr = dav.validade
    ? new Date(dav.validade).toLocaleDateString("pt-BR")
    : null;

  return (
    <div
      className="bg-white min-h-screen text-black p-8 font-sans"
      style={{ maxWidth: "800px", margin: "0 auto" }}
    >
      <style>{`
        @media print {
          @page { margin: 10mm; size: A4; }
          body { background: white; -webkit-print-color-adjust: exact; }
          header, footer, nav, aside, .print-hidden { display: none !important; }
        }
      `}</style>

      {/* Barra de Ações na Tela (oculta ao imprimir) */}
      <div className="print:hidden mb-6 flex flex-wrap items-center justify-between gap-3 bg-slate-50 p-3.5 rounded-2xl border border-slate-200 shadow-sm">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-white border border-slate-200 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={sharing}
            onClick={async () => {
              setSharing(true);
              try {
                const orderData = dav.rawVenda || {
                  id: dav.id,
                  numero: dav.numero,
                  tipo: dav.isVenda ? "PDV" : "DAV",
                  created_at: dav.created_at,
                  valor_total: dav.total,
                  subtotal: dav.subtotal,
                  desconto_valor: dav.desconto_valor,
                  frete_valor: dav.frete_valor,
                  condicao_pagamento: dav.condicao_pagamento,
                  cliente: {
                    nome: dav.cliente_nome,
                    cpf_cnpj: dav.cliente_cnpj,
                    telefone: dav.cliente_telefone,
                    endereco: dav.cliente_endereco,
                  },
                  vendedor_nome: dav.vendedor,
                };
                const itemsList = itens.map((it: any) => ({
                  produto_nome: it.produto,
                  codigo: it.codigo,
                  quantidade: it.qtd,
                  valor_unitario: it.valor_unitario,
                  subtotal: it.total,
                }));
                await shareOrderWhatsApp(orderData, itemsList);
              } finally {
                setSharing(false);
              }
            }}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-sm transition-colors cursor-pointer"
          >
            {sharing ? <Loader2 className="w-4 h-4 animate-spin" /> : <WhatsAppIcon className="w-4 h-4 shrink-0" />}
            <span>Enviar no WhatsApp</span>
          </button>

          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-slate-800 bg-white hover:bg-slate-100 border border-slate-200 shadow-sm transition-colors cursor-pointer"
          >
            <Printer className="w-4 h-4 text-slate-600 shrink-0" />
            <span>Imprimir / Salvar PDF</span>
          </button>
        </div>
      </div>

      {/* Cabeçalho */}
      <div className="flex justify-between items-start border-b-2 border-slate-900 pb-6 mb-6">
        <div className="flex items-start gap-8">
          {/* Garden Prime (com dados cadastrais e contatos completos) */}
          <div className="flex items-start gap-4">
            <div className="shrink-0 pt-0.5">
              <GardenPrimeLogo size="small" />
            </div>
            <div className="text-xs text-slate-700 leading-relaxed">
              <p className="text-base font-black text-slate-950 uppercase tracking-wide">
                GARDEN PRIME
              </p>
              <p className="font-semibold text-slate-800">
                CNPJ: 63.874.628/0001-36 &nbsp;•&nbsp; Insc. Estadual: 266.037.553.113
              </p>
              <p>
                Rua Santa Teresinha, 86 - Paraisolândia, Charqueada - SP
              </p>
              <p>
                Fone: (19) 99714-1112 &nbsp;•&nbsp; E-mail: contatogardenprime@gmail.com
              </p>
            </div>
          </div>

          {/* Garden Plus (canto direito do bloco: somente logo e nome, sem contatos) */}
          <div className="pl-6 border-l border-slate-200 flex flex-col items-start justify-center">
            <img src="/garden-plus.png" alt="Garden Plus" className="h-7 object-contain" />
            <p className="font-bold text-xs text-slate-800 mt-2">Garden Plus Ltda</p>
          </div>
        </div>

        {/* Dados do Pedido / Orçamento no canto direito */}
        <div className="text-right shrink-0">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 uppercase tracking-wider">
            {dav.isVenda ? "Comprovante de Venda" : "Orçamento"}
          </h1>
          <p className="text-sm font-semibold text-slate-800 mt-1">
            {dav.isVenda ? "Venda Nº: " : "DAV Nº: "} {dav.numero ? String(dav.numero).padStart(3, "0") : dav.id.substring(0, 8).toUpperCase()}
          </p>
          <p className="text-xs text-slate-600">
            Emissão: {dataDAV} às {horaDAV}
          </p>
          {dav.vendedor && (
            <p className="text-xs mt-1 text-slate-700">
              Vendedor: <span className="font-bold text-slate-900">{dav.vendedor}</span>
            </p>
          )}
          {validadeStr && (
            <p className="text-xs font-medium mt-1 text-slate-600">
              Validade: {validadeStr}
            </p>
          )}
        </div>
      </div>

      {/* Dados do Cliente e Condições */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-3">
            Dados do Cliente
          </h2>
          <div className="text-sm space-y-1">
            <p><span className="font-semibold">Nome:</span> {dav.cliente_nome || "—"}</p>
            {dav.cliente_cnpj && <p><span className="font-semibold">CNPJ/CPF:</span> {dav.cliente_cnpj}</p>}
            {dav.cliente_telefone && <p><span className="font-semibold">Telefone:</span> {dav.cliente_telefone}</p>}
            {dav.cliente_endereco && <p><span className="font-semibold">Endereço:</span> {dav.cliente_endereco}</p>}
          </div>
        </div>

        <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-3">
            Condições Comerciais
          </h2>
          <div className="text-sm space-y-1">
            {dav.condicao_pagamento && <p><span className="font-semibold">Pagamento:</span> {dav.condicao_pagamento}</p>}
            {dav.frete_tipo && <p><span className="font-semibold">Frete:</span> {dav.frete_tipo}</p>}
            {dav.prazo_entrega && <p><span className="font-semibold">Prazo:</span> {dav.prazo_entrega}</p>}
            {dav.vendedor && <p><span className="font-semibold">Vendedor:</span> {dav.vendedor}</p>}
          </div>
        </div>
      </div>

      {/* Itens */}
      <div className="mb-6">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-3">Produtos</h2>
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-slate-900 text-white">
              <th className="py-2 px-3 text-left">Código</th>
              <th className="py-2 px-3 text-left">Produto</th>
              <th className="py-2 px-3 text-center">Qtd</th>
              <th className="py-2 px-3 text-right">Vlr. Unit</th>
              <th className="py-2 px-3 text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            {itens.map((item, i) => (
              <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                <td className="py-2 px-3 text-slate-500 text-xs">{item.codigo || "—"}</td>
                <td className="py-2 px-3">{item.produto || "—"}</td>
                <td className="py-2 px-3 text-center">{item.qtd}</td>
                <td className="py-2 px-3 text-right">
                  R$ {Number(item.valor_unitario).toFixed(2).replace(".", ",")}
                </td>
                <td className="py-2 px-3 text-right font-medium">
                  R$ {Number(item.total).toFixed(2).replace(".", ",")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Totais */}
      <div className="flex justify-end">
        <div className="w-72 bg-slate-50 p-4 rounded-lg border border-slate-200 text-sm space-y-2">
          <div className="flex justify-between">
            <span className="text-slate-600">Subtotal:</span>
            <span>R$ {Number(dav.subtotal || 0).toFixed(2).replace(".", ",")}</span>
          </div>
          {Number(dav.desconto_valor) > 0 && (
            <div className="flex justify-between text-red-600 font-medium">
              <span>
                Desconto{Number(dav.desconto_percentual) > 0 ? ` (${Number(dav.desconto_percentual).toFixed(2).replace(".", ",")}%)` : ""}:
              </span>
              <span>- R$ {Number(dav.desconto_valor).toFixed(2).replace(".", ",")}</span>
            </div>
          )}
          {Number(dav.frete_valor) > 0 && (
            <div className="flex justify-between">
              <span className="text-slate-600">Frete:</span>
              <span>R$ {Number(dav.frete_valor).toFixed(2).replace(".", ",")}</span>
            </div>
          )}
          <div className="flex justify-between items-center text-lg font-bold border-t border-slate-200 pt-2 mt-2">
            <span>Total:</span>
            <span>R$ {Number(dav.total || 0).toFixed(2).replace(".", ",")}</span>
          </div>
        </div>
      </div>

      {/* Observações */}
      {dav.observacoes && (
        <div className="mt-6 bg-slate-50 p-4 rounded-lg border border-slate-200 text-sm">
          <h2 className="font-bold uppercase tracking-wider text-slate-500 mb-2 text-xs">Observações</h2>
          <p>{dav.observacoes}</p>
        </div>
      )}

      {/* Assinatura */}
      <div className="mt-16 grid grid-cols-2 gap-12 text-center text-sm">
        <div>
          <div className="border-t border-slate-400 pt-2">Assinatura do Vendedor</div>
        </div>
        <div>
          <div className="border-t border-slate-400 pt-2">Assinatura do Cliente</div>
        </div>
      </div>

      <div className="mt-8 text-center text-xs text-slate-400">
        {dav.isVenda
          ? "Este comprovante não possui valor fiscal."
          : "Este documento não possui valor fiscal. É apenas um Documento Auxiliar de Venda."}
      </div>
    </div>
  );
}

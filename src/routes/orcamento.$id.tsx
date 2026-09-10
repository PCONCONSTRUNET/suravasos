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
      let { data: d } = await supabase.from("davs").select("*").eq("id", id).single();

      let itemsData: any[] = [];

      if (d) {
        setDav(d);
        const { data: i } = await supabase.from("dav_items").select("*").eq("dav_id", id);
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
          ]
            .filter(Boolean)
            .join(", ");

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
            itemsData = vi.map((item) => ({
              codigo: item.produto?.codigo,
              produto: item.produto?.nome || "Produto sem nome",
              qtd: item.quantidade,
              valor_unitario: item.valor_unitario,
              total: item.subtotal,
            }));
            const sumItens = itemsData.reduce((acc, it) => acc + Number(it.total || 0), 0);
            if (sumItens > 0 && (!d.subtotal || Number(d.subtotal) === 0)) {
              d.subtotal = sumItens;
              setDav({ ...d });
            }
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

  const validadeStr = dav.validade ? new Date(dav.validade).toLocaleDateString("pt-BR") : null;

  const handleVoltar = () => {
    // 1. Se foi aberto em uma nova aba com window.open e possui opener
    try {
      if (window.opener && !window.opener.closed) {
        window.close();
        return;
      }
    } catch {}

    // 2. Se há histórico anterior nesta mesma aba
    if (typeof window !== "undefined" && window.history.length > 1) {
      window.history.back();
    }

    // 3. Tenta fechar a aba diretamente (funciona em abas criadas por script)
    try {
      window.close();
    } catch {}

    // 4. Fallback imediato garantido: se a janela não fechou e não navegou, redireciona
    setTimeout(() => {
      if (typeof window !== "undefined" && window.location.pathname.startsWith("/orcamento")) {
        const ref = document.referrer;
        if (ref && (ref.includes("/parceiro") || ref.includes("/app"))) {
          window.location.href = ref;
        } else {
          window.location.href = "/parceiro/vendas";
        }
      }
    }, 200);
  };

  return (
    <div
      className="bg-white min-h-screen text-black p-6 print:p-0 font-sans"
      style={{ maxWidth: "800px", margin: "0 auto" }}
    >
      <style>{`
        @media print {
          @page { margin: 8mm; size: A4; }
          body { background: white; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          header, footer, nav, aside, .print-hidden { display: none !important; }
          tr { break-inside: avoid; page-break-inside: avoid; }
        }
      `}</style>

      {/* Barra de Ações na Tela (oculta ao imprimir) */}
      <div className="print:hidden mb-4 flex flex-wrap items-center justify-between gap-3 bg-slate-50 p-3.5 rounded-2xl border border-slate-200 shadow-sm">
        <button
          type="button"
          onClick={handleVoltar}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-white border border-slate-200 transition-colors cursor-pointer active:scale-95"
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
            {sharing ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <WhatsAppIcon className="w-4 h-4 shrink-0" />
            )}
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
      <div className="flex justify-between items-center border-b-2 border-slate-900 pb-3 mb-3">
        <div className="flex items-center gap-6">
          {/* Garden Prime (com dados cadastrais e contatos completos) */}
          <div className="flex items-center gap-3">
            <div className="shrink-0">
              <GardenPrimeLogo imgClassName="h-14 sm:h-16 w-auto" />
            </div>
            <div className="text-[11px] text-slate-700 leading-tight">
              <p className="text-sm font-black text-slate-950 uppercase tracking-wide">
                GARDEN PRIME
              </p>
              <p className="font-semibold text-slate-800">
                CNPJ: 63.874.628/0001-36 &nbsp;•&nbsp; Insc. Estadual: 266.037.553.113
              </p>
              <p>Rua Santa Teresinha, 86 - Paraisolândia, Charqueada - SP</p>
              <p>Fone: (19) 99714-1112 &nbsp;•&nbsp; E-mail: contatogardenprime@gmail.com</p>
            </div>
          </div>

          {/* Garden Plus (canto direito do bloco empresarial: logo ampliada e nome) */}
          <div className="pl-5 border-l border-slate-300 flex flex-col items-center justify-center shrink-0">
            <img
              src="/garden-plus.png"
              alt="Garden Plus"
              className="h-11 sm:h-12 w-auto object-contain"
            />
            <p className="font-bold text-[11px] text-slate-800 mt-1">Garden Plus Ltda</p>
          </div>
        </div>

        {/* Dados do Pedido / Orçamento no canto direito */}
        <div className="text-right shrink-0">
          <h1 className="text-base sm:text-lg font-bold text-slate-900 uppercase tracking-tight">
            {dav.isVenda ? "Comprovante de Venda" : "Orçamento"}
          </h1>
          <p className="text-xs sm:text-sm font-semibold text-slate-800 mt-0.5">
            {dav.isVenda ? "Venda Nº: " : "DAV Nº: "}{" "}
            {dav.numero
              ? String(dav.numero).padStart(3, "0")
              : dav.id.substring(0, 8).toUpperCase()}
          </p>
          <p className="text-[11px] text-slate-600">
            Emissão: {dataDAV} às {horaDAV}
          </p>
          {dav.vendedor && (
            <p className="text-[11px] text-slate-700">
              Vendedor: <span className="font-bold text-slate-900">{dav.vendedor}</span>
            </p>
          )}
          {validadeStr && (
            <p className="text-[11px] font-medium text-slate-600">Validade: {validadeStr}</p>
          )}
        </div>
      </div>

      {/* Dados do Cliente e Condições */}
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
          <h2 className="text-[10px] font-bold uppercase tracking-wider text-slate-500 pb-1 mb-1.5 border-b border-slate-200">
            Dados do Cliente
          </h2>
          <div className="text-xs space-y-0.5 leading-snug">
            <p className="truncate">
              <span className="font-semibold text-slate-700">Nome:</span>{" "}
              <span className="font-medium text-slate-950">{dav.cliente_nome || "—"}</span>
            </p>
            {(dav.cliente_cnpj || dav.cliente_telefone) && (
              <p>
                {dav.cliente_cnpj && (
                  <span>
                    <span className="font-semibold text-slate-700">CNPJ/CPF:</span>{" "}
                    {dav.cliente_cnpj}
                  </span>
                )}
                {dav.cliente_cnpj && dav.cliente_telefone && (
                  <span className="text-slate-400"> &nbsp;•&nbsp; </span>
                )}
                {dav.cliente_telefone && (
                  <span>
                    <span className="font-semibold text-slate-700">Tel:</span>{" "}
                    {dav.cliente_telefone}
                  </span>
                )}
              </p>
            )}
            {dav.cliente_endereco && (
              <p className="line-clamp-2">
                <span className="font-semibold text-slate-700">Endereço:</span>{" "}
                {dav.cliente_endereco}
              </p>
            )}
          </div>
        </div>

        <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
          <h2 className="text-[10px] font-bold uppercase tracking-wider text-slate-500 pb-1 mb-1.5 border-b border-slate-200">
            Condições Comerciais
          </h2>
          <div className="text-xs space-y-0.5 leading-snug">
            <p>
              <span className="font-semibold text-slate-700">Pagamento:</span>{" "}
              <span className="text-slate-900">{dav.condicao_pagamento || "Não informado"}</span>
            </p>
            {dav.vendedor && (
              <p>
                <span className="font-semibold text-slate-700">Vendedor:</span>{" "}
                <span className="text-slate-900">{dav.vendedor}</span>
              </p>
            )}
            {(dav.frete_tipo || dav.prazo_entrega) && (
              <p>
                {dav.frete_tipo && (
                  <span>
                    <span className="font-semibold text-slate-700">Frete:</span> {dav.frete_tipo}
                  </span>
                )}
                {dav.frete_tipo && dav.prazo_entrega && (
                  <span className="text-slate-400"> &nbsp;•&nbsp; </span>
                )}
                {dav.prazo_entrega && (
                  <span>
                    <span className="font-semibold text-slate-700">Prazo:</span> {dav.prazo_entrega}
                  </span>
                )}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Itens */}
      <div className="mb-3">
        <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
          Produtos
        </h2>
        <table className="w-full text-xs border-collapse border border-slate-200">
          <thead>
            <tr className="bg-slate-900 text-white">
              <th className="py-1.5 px-2.5 text-left font-semibold">Código</th>
              <th className="py-1.5 px-2.5 text-left font-semibold">Produto</th>
              <th className="py-1.5 px-2.5 text-center font-semibold">Qtd</th>
              <th className="py-1.5 px-2.5 text-right font-semibold">Vlr. Unit</th>
              <th className="py-1.5 px-2.5 text-right font-semibold">Total</th>
            </tr>
          </thead>
          <tbody>
            {itens.map((item, i) => (
              <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                <td className="py-1 px-2.5 text-slate-500 text-[11px] border-b border-slate-100">
                  {item.codigo || "—"}
                </td>
                <td className="py-1 px-2.5 text-slate-900 border-b border-slate-100">
                  {item.produto || "—"}
                </td>
                <td className="py-1 px-2.5 text-center text-slate-900 border-b border-slate-100">
                  {item.qtd}
                </td>
                <td className="py-1 px-2.5 text-right text-slate-900 border-b border-slate-100">
                  R$ {Number(item.valor_unitario).toFixed(2).replace(".", ",")}
                </td>
                <td className="py-1 px-2.5 text-right font-semibold text-slate-950 border-b border-slate-100">
                  R$ {Number(item.total).toFixed(2).replace(".", ",")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Totais */}
      <div className="flex justify-end" style={{ breakInside: "avoid" }}>
        <div className="w-64 bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-xs space-y-1">
          <div className="flex justify-between text-slate-600">
            <span>Subtotal:</span>
            <span className="text-slate-900 font-medium">
              R${" "}
              {Number(dav.subtotal || 0)
                .toFixed(2)
                .replace(".", ",")}
            </span>
          </div>
          {Number(dav.desconto_valor) > 0 && (
            <div className="flex justify-between text-red-600 font-medium">
              <span>
                Desconto
                {Number(dav.desconto_percentual) > 0
                  ? ` (${Number(dav.desconto_percentual).toFixed(2).replace(".", ",")}%)`
                  : ""}
                :
              </span>
              <span>- R$ {Number(dav.desconto_valor).toFixed(2).replace(".", ",")}</span>
            </div>
          )}
          {Number(dav.frete_valor) > 0 && (
            <div className="flex justify-between text-slate-600">
              <span>Frete:</span>
              <span className="text-slate-900 font-medium">
                R$ {Number(dav.frete_valor).toFixed(2).replace(".", ",")}
              </span>
            </div>
          )}
          <div className="flex justify-between items-center text-sm font-bold border-t border-slate-200 pt-1.5 mt-1 text-slate-950">
            <span>Total:</span>
            <span>
              R${" "}
              {Number(dav.total || 0)
                .toFixed(2)
                .replace(".", ",")}
            </span>
          </div>
        </div>
      </div>

      {/* Observações */}
      {dav.observacoes && (
        <div
          className="mt-3 bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-xs"
          style={{ breakInside: "avoid" }}
        >
          <h2 className="font-bold uppercase tracking-wider text-slate-500 mb-1 text-[10px]">
            Observações
          </h2>
          <p className="text-slate-700 leading-snug">{dav.observacoes}</p>
        </div>
      )}

      {/* Assinatura */}
      <div
        className="mt-8 print:mt-6 grid grid-cols-2 gap-10 text-center text-xs text-slate-700"
        style={{ breakInside: "avoid" }}
      >
        <div>
          <div className="border-t border-slate-400 pt-1.5 font-medium">Assinatura do Vendedor</div>
        </div>
        <div>
          <div className="border-t border-slate-400 pt-1.5 font-medium">Assinatura do Cliente</div>
        </div>
      </div>

      <div
        className="mt-4 print:mt-3 text-center text-[10px] text-slate-400"
        style={{ breakInside: "avoid" }}
      >
        {dav.isVenda
          ? "Este comprovante não possui valor fiscal."
          : "Este documento não possui valor fiscal. É apenas um Documento Auxiliar de Venda."}
      </div>
    </div>
  );
}

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { supabaseParceiro as supabase } from "@/lib/supabase";
import React from "react";

export const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
  </svg>
);

export interface OrderItem {
  id?: string;
  produto?: {
    nome?: string;
    codigo?: string;
    emoji?: string;
  };
  produtos?: {
    nome?: string;
    codigo?: string;
  };
  produto_nome?: string;
  codigo?: string;
  quantidade?: number;
  qtd?: number;
  valor_unitario?: number;
  subtotal?: number;
  total?: number;
}

export interface OrderData {
  id: string;
  numero_venda?: number | string;
  numero?: number | string;
  tipo?: string;
  created_at: string;
  valor_total?: number;
  total?: number;
  subtotal?: number;
  desconto_valor?: number;
  desconto_percentual?: number;
  frete_valor?: number;
  condicao_pagamento?: string;
  metodo_pagamento?: string;
  observacoes?: string;
  cliente?: {
    nome?: string;
    cpf_cnpj?: string;
    telefone?: string;
    endereco?: string;
    numero?: string;
    bairro?: string;
    cidade?: string;
    uf?: string;
    cep?: string;
  } | null;
  clientes?: {
    nome?: string;
    cpf_cnpj?: string;
    telefone?: string;
  } | null;
  vendedor?:
    | {
        nome?: string;
      }
    | string
    | null;
  vendedor_nome?: string;
}

/**
 * Retorna o número legível do pedido/orçamento formatado
 */
export function getOrderNumber(order: OrderData): string {
  const num = order.numero_venda ?? order.numero;
  if (num !== undefined && num !== null) {
    return String(num).padStart(3, "0");
  }
  return order.id ? order.id.substring(0, 8).toUpperCase() : "000";
}

/**
 * Retorna o nome do cliente normalizado
 */
export function getClientName(order: OrderData): string {
  return order.cliente?.nome || order.clientes?.nome || "Cliente não informado";
}

/**
 * Retorna o tipo legível: Orçamento ou Pedido
 */
export function isOrderDav(order: OrderData): boolean {
  return order.tipo === "DAV";
}

/**
 * Busca os itens do pedido no Supabase caso não tenham sido passados
 */
export async function fetchOrderItems(orderId: string): Promise<OrderItem[]> {
  try {
    const { data, error } = await supabase
      .from("vendas_itens")
      .select("*, produto:produtos(nome, codigo, emoji)")
      .eq("venda_id", orderId);

    if (error) {
      console.warn("Erro ao buscar vendas_itens:", error);
      return [];
    }
    return data || [];
  } catch (e) {
    console.error("Falha ao buscar itens:", e);
    return [];
  }
}

let cachedLogos: { prime: string | null; plus: string | null } | null = null;

export async function preloadLogos(): Promise<{ prime: string | null; plus: string | null }> {
  if (cachedLogos) return cachedLogos;
  if (typeof window === "undefined") return { prime: null, plus: null };

  const toBase64 = (url: string): Promise<string | null> =>
    fetch(url)
      .then((r) => r.blob())
      .then(
        (blob) =>
          new Promise<string | null>((resolve) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = () => resolve(null);
            reader.readAsDataURL(blob);
          }),
      )
      .catch(() => null);

  try {
    const [prime, plus] = await Promise.all([
      toBase64("/garden-prime-logo.png"),
      toBase64("/garden-plus.png"),
    ]);
    cachedLogos = { prime, plus };
  } catch {
    cachedLogos = { prime: null, plus: null };
  }
  return cachedLogos;
}

/**
 * Gera um documento PDF estruturado e profissional com jsPDF e jspdf-autotable
 */
export function generateOrderPdfDoc(
  order: OrderData,
  items: OrderItem[],
  logos?: { prime?: string | null; plus?: string | null },
): { doc: jsPDF; blob: Blob; file: File; filename: string } {
  const isDAV = isOrderDav(order);
  const docType = isDAV ? "ORÇAMENTO" : "PEDIDO DE VENDA";
  const num = getOrderNumber(order);
  const filename = `${isDAV ? "orcamento" : "pedido"}_${num}.pdf`;

  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 14;
  let y = margin;

  // ── CABEÇALHO ──────────────────────────────────────────
  const headerHeight = 32;
  doc.setFillColor(248, 250, 252); // slate-50
  doc.roundedRect(margin, y, pageWidth - margin * 2, headerHeight, 2, 2, "F");
  doc.setDrawColor(226, 232, 240); // slate-200
  doc.roundedRect(margin, y, pageWidth - margin * 2, headerHeight, 2, 2, "S");

  const logoAssets = logos || cachedLogos;

  // 1. GARDEN PRIME (Lado Esquerdo - Completo com Contatos e CNPJ)
  const primeLogo = logoAssets?.prime;
  if (primeLogo) {
    try {
      doc.addImage(primeLogo, "PNG", margin + 4, y + 4, 16, 14);
    } catch {
      // fallback sem imagem
    }
  }

  const primeTextX = primeLogo ? margin + 22 : margin + 5;
  doc.setTextColor(15, 23, 42); // slate-900
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("GARDEN PRIME", primeTextX, y + 8);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(6.8);
  doc.setTextColor(51, 65, 85); // slate-700
  doc.text("CNPJ: 63.874.628/0001-36  •  Insc. Estadual: 266.037.553.113", primeTextX, y + 12.5);
  doc.text("Rua Santa Teresinha, 86 - Paraisolândia, Charqueada - SP", primeTextX, y + 16);
  doc.text("Fone: (19) 99714-1112  •  contatogardenprime@gmail.com", primeTextX, y + 19.5);

  // Divisória vertical 1
  const div1X = margin + 104;
  doc.setDrawColor(226, 232, 240);
  doc.line(div1X, y + 4, div1X, y + headerHeight - 4);

  // 2. GARDEN PLUS (Canto Direito do bloco empresarial: SOMENTE LOGO E NOME, SEM CONTATOS)
  const plusLogo = logoAssets?.plus;
  const plusX = div1X + 6;
  if (plusLogo) {
    try {
      doc.addImage(plusLogo, "PNG", plusX, y + 4, 20, 13.5);
    } catch {
      // fallback
    }
  }
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  doc.setTextColor(30, 41, 59); // slate-800
  doc.text("Garden Plus Ltda", plusX, plusLogo ? y + 21 : y + 12);

  // Divisória vertical 2
  const div2X = pageWidth - margin - 48;
  doc.setDrawColor(226, 232, 240);
  doc.line(div2X, y + 4, div2X, y + headerHeight - 4);

  // 3. DADOS DO DOCUMENTO (Canto Superior Direito)
  const rightX = pageWidth - margin - 5;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9.5);
  doc.setTextColor(15, 23, 42);
  doc.text(`${docType} #${num}`, rightX, y + 8, { align: "right" });

  const dataStr = new Date(order.created_at).toLocaleDateString("pt-BR");
  const horaStr = new Date(order.created_at).toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  doc.setTextColor(71, 85, 105);
  doc.text(`Emissão: ${dataStr} às ${horaStr}`, rightX, y + 13.5, { align: "right" });

  const vendNome =
    order.vendedor_nome ||
    (typeof order.vendedor === "object" && order.vendedor !== null
      ? order.vendedor.nome
      : typeof order.vendedor === "string"
        ? order.vendedor
        : "");
  if (vendNome) {
    doc.text(`Vendedor: ${vendNome}`, rightX, y + 17.5, { align: "right" });
  }
  doc.text("Página 1/1", rightX, y + (vendNome ? 21.5 : 17.5), { align: "right" });

  y += headerHeight + 4;

  // ── DADOS DO CLIENTE E CONDIÇÕES ───────────────────────
  const boxWidth = (pageWidth - margin * 2 - 4) / 2;
  const boxHeight = 22;

  // Caixa 1: Cliente
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(margin, y, boxWidth, boxHeight, 1.5, 1.5, "FD");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(51, 65, 85);
  doc.text("DADOS DO CLIENTE", margin + 4, y + 5);

  const clienteNome = getClientName(order);
  const clienteDoc = order.cliente?.cpf_cnpj || order.clientes?.cpf_cnpj || "";
  const clienteTel = order.cliente?.telefone || order.clientes?.telefone || "";

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.8);
  doc.setTextColor(30, 41, 59);

  // Truncar nome se for muito longo
  const clippedName = doc.splitTextToSize(clienteNome, boxWidth - 8);
  doc.text(clippedName[0] || "—", margin + 4, y + 10);

  const docAndTel = [
    clienteDoc ? `CPF/CNPJ: ${clienteDoc}` : "",
    clienteTel ? `Tel: ${clienteTel}` : "",
  ]
    .filter(Boolean)
    .join("  •  ");
  if (docAndTel) {
    doc.text(docAndTel, margin + 4, y + 14.5);
  }

  const clienteEnd = order.cliente?.endereco ? `End: ${order.cliente.endereco}` : "";
  if (clienteEnd) {
    const clippedEnd = doc.splitTextToSize(clienteEnd, boxWidth - 8);
    doc.text(clippedEnd[0] || "", margin + 4, y + 18.5);
  }

  // Caixa 2: Informações Comerciais
  const box2X = margin + boxWidth + 4;
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(box2X, y, boxWidth, boxHeight, 1.5, 1.5, "FD");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(51, 65, 85);
  doc.text("CONDIÇÕES COMERCIAIS", box2X + 4, y + 5);

  const pagamento = order.condicao_pagamento || order.metodo_pagamento || "Não informado";
  const vendedorNome =
    typeof order.vendedor === "string"
      ? order.vendedor
      : order.vendedor?.nome || order.vendedor_nome || "Parceiro Garden Prime";

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.8);
  doc.setTextColor(30, 41, 59);
  doc.text(`Pagamento: ${pagamento}`, box2X + 4, y + 10);
  doc.text(`Vendedor: ${vendedorNome}`, box2X + 4, y + 14.5);

  y += boxHeight + 4;

  // ── TABELA DE PRODUTOS ─────────────────────────────────
  const tableRows = items.map((item, idx) => {
    const cod =
      item.produto?.codigo ||
      item.produtos?.codigo ||
      item.codigo ||
      String(idx + 1).padStart(2, "0");
    const nome =
      item.produto?.nome || item.produtos?.nome || item.produto_nome || "Produto sem descrição";
    const qtd = item.quantidade ?? item.qtd ?? 1;
    const vlrUnit = Number(item.valor_unitario || 0);
    const sub = Number(item.subtotal ?? item.total ?? vlrUnit * qtd);

    return [
      cod,
      nome,
      String(qtd),
      `R$ ${vlrUnit.toFixed(2).replace(".", ",")}`,
      `R$ ${sub.toFixed(2).replace(".", ",")}`,
    ];
  });

  autoTable(doc, {
    startY: y,
    head: [["CÓD.", "PRODUTO", "QTD", "UNITÁRIO", "TOTAL"]],
    body: tableRows,
    theme: "grid",
    headStyles: {
      fillColor: [30, 41, 59],
      textColor: [255, 255, 255],
      fontSize: 8.5,
      fontStyle: "bold",
      halign: "left",
    },
    columnStyles: {
      0: { cellWidth: 20, halign: "center", fontStyle: "bold" },
      1: { cellWidth: "auto" },
      2: { cellWidth: 16, halign: "center" },
      3: { cellWidth: 26, halign: "right" },
      4: { cellWidth: 28, halign: "right", fontStyle: "bold" },
    },
    styles: {
      fontSize: 8.5,
      cellPadding: 2.5,
      textColor: [30, 41, 59],
      lineColor: [226, 232, 240],
      lineWidth: 0.2,
    },
    alternateRowStyles: {
      fillColor: [248, 250, 252],
    },
    margin: { left: margin, right: margin },
  });

  // Posição final após a tabela
  const finalY = (doc as any).lastAutoTable?.finalY || y + 60;
  let totalY = finalY + 6;

  // Se estiver muito perto do fim da página, adiciona página
  if (totalY + 40 > doc.internal.pageSize.getHeight()) {
    doc.addPage();
    totalY = margin;
  }

  // ── QUADRO DE TOTAIS ───────────────────────────────────
  const totalBoxW = 75;
  const totalBoxX = pageWidth - margin - totalBoxW;

  // Calcula a soma real dos itens da tabela
  const itemsSum = (items || []).reduce((acc, it) => {
    const itSub = Number(it.subtotal ?? it.total ?? 0);
    if (itSub > 0) return acc + itSub;
    const qtd = Number(it.quantidade ?? it.qtd ?? 1);
    const unit = Number(it.valor_unitario ?? 0);
    return acc + qtd * unit;
  }, 0);

  const desc = Number(order.desconto_valor || 0);
  const frete = Number(order.frete_valor || 0);

  const orderSub = Number(order.subtotal || 0);
  const orderTotal = Number(order.valor_total ?? order.total ?? 0);

  let subtotal = orderSub > 0 ? orderSub : itemsSum > 0 ? itemsSum : 0;
  if (subtotal === 0 && orderTotal > 0) {
    subtotal = orderTotal + desc - frete;
  }

  const totalFinal = orderTotal > 0 ? orderTotal : Math.max(0, subtotal - desc + frete);

  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(totalBoxX, totalY, totalBoxW, 26, 2, 2, "FD");

  doc.setFontSize(8.5);
  doc.setTextColor(100, 116, 139);
  doc.text("Subtotal:", totalBoxX + 4, totalY + 6);
  doc.setTextColor(30, 41, 59);
  doc.text(`R$ ${subtotal.toFixed(2).replace(".", ",")}`, totalBoxX + totalBoxW - 4, totalY + 6, {
    align: "right",
  });

  if (desc > 0) {
    doc.setTextColor(225, 29, 72);
    doc.text(`Desconto:`, totalBoxX + 4, totalY + 11);
    doc.text(`- R$ ${desc.toFixed(2).replace(".", ",")}`, totalBoxX + totalBoxW - 4, totalY + 11, {
      align: "right",
    });
  }

  // Linha divisória
  doc.setDrawColor(203, 213, 225);
  doc.line(totalBoxX + 4, totalY + 16, totalBoxX + totalBoxW - 4, totalY + 16);

  // Total Final
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(22, 101, 52); // Emerald-800
  doc.text("Total:", totalBoxX + 4, totalY + 22);
  doc.text(
    `R$ ${totalFinal.toFixed(2).replace(".", ",")}`,
    totalBoxX + totalBoxW - 4,
    totalY + 22,
    { align: "right" },
  );

  // ── RODAPÉ ─────────────────────────────────────────────
  const pageHeight = doc.internal.pageSize.getHeight();
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(148, 163, 184);
  doc.text(
    isDAV
      ? "Documento auxiliar de orçamento para simples conferência. Não possui valor fiscal."
      : "Comprovante de pedido emitido para conferência do cliente. Não possui valor fiscal.",
    pageWidth / 2,
    pageHeight - 8,
    { align: "center" },
  );

  const blob = doc.output("blob");
  const file = new File([blob], filename, { type: "application/pdf" });

  return { doc, blob, file, filename };
}

/**
 * Monta o texto resumido para a mensagem do WhatsApp
 */
export function buildWhatsAppMessage(order: OrderData, items: OrderItem[]): string {
  const isDAV = isOrderDav(order);
  const titulo = isDAV ? "ORÇAMENTO" : "PEDIDO";
  const num = getOrderNumber(order);
  const dataStr = new Date(order.created_at).toLocaleDateString("pt-BR");
  const clienteNome = getClientName(order);

  let msg = `*${titulo} #${num} - GARDEN PRIME*\n`;
  msg += `📅 Data: ${dataStr}\n`;
  msg += `👤 Cliente: ${clienteNome}\n\n`;

  msg += `*ITENS DO PEDIDO:*\n`;
  if (items && items.length > 0) {
    items.forEach((item) => {
      const nome = item.produto?.nome || item.produtos?.nome || item.produto_nome || "Produto";
      const qtd = item.quantidade ?? item.qtd ?? 1;
      const rawSub = Number(item.subtotal ?? item.total ?? 0);
      const unitVal = Number(item.valor_unitario ?? 0);
      const itVal = rawSub > 0 ? rawSub : qtd * unitVal;
      const sub = itVal.toFixed(2).replace(".", ",");
      msg += `• ${qtd}x ${nome} - R$ ${sub}\n`;
    });
  } else {
    msg += `(Consulte os itens no anexo em PDF)\n`;
  }

  const total = Number(order.valor_total ?? order.total ?? 0)
    .toFixed(2)
    .replace(".", ",");
  msg += `\n*TOTAL: R$ ${total}*\n\n`;

  const linkPdf = `${window.location.origin}/orcamento/${order.id}`;
  msg += `📄 *Acesse o PDF / Comprovante completo aqui:*\n${linkPdf}`;

  return msg;
}

/**
 * Compartilha o pedido no WhatsApp levando o arquivo PDF diretamente
 * Se navigator.canShare com arquivos estiver disponível (celular Android/iOS),
 * abre o compartilhamento nativo para o vendedor escolher o contato no WhatsApp já com o PDF anexado!
 * Se não for suportado (desktop/navegador simples), abre o WhatsApp (wa.me) com a mensagem e link direto.
 */
export async function shareOrderWhatsApp(order: OrderData, items?: OrderItem[]): Promise<boolean> {
  try {
    // Garante que temos os itens e logos carregados
    const [loadedItems, logos] = await Promise.all([
      items && items.length > 0 ? items : fetchOrderItems(order.id),
      preloadLogos(),
    ]);

    // 1. Gera o documento PDF e o arquivo .pdf com os logos
    const { file, filename } = generateOrderPdfDoc(order, loadedItems, logos);
    const msg = buildWhatsAppMessage(order, loadedItems);
    const isDAV = isOrderDav(order);
    const num = getOrderNumber(order);
    const title = `${isDAV ? "Orçamento" : "Pedido"} #${num} - Garden Prime`;

    // 2. Tenta compartilhar via Web Share API com o arquivo PDF anexado
    if (typeof navigator !== "undefined" && navigator.canShare) {
      const shareDataWithFile = {
        title,
        text: msg,
        files: [file],
      };

      if (navigator.canShare(shareDataWithFile)) {
        try {
          await navigator.share(shareDataWithFile);
          return true;
        } catch (shareErr: any) {
          // Se o usuário cancelou o menu de compartilhamento, não faz nada
          if (shareErr.name === "AbortError") {
            return false;
          }
          console.warn("Falha no navigator.share com arquivo, tentando texto:", shareErr);
        }
      }
    }

    // 3. Fallback: Abre o WhatsApp (wa.me) com a mensagem completa e link do PDF
    // O wa.me sem telefone abre a lista de contatos do WhatsApp para o vendedor escolher para quem enviar
    const url = `https://wa.me/?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
    return true;
  } catch (err: any) {
    console.error("Erro ao compartilhar pedido no WhatsApp:", err);
    alert("Não foi possível gerar o compartilhamento: " + (err.message || err));
    return false;
  }
}

/**
 * Abre a visualização / impressão oficial do PDF do pedido em uma nova aba
 */
export function openOrderPdf(orderId: string): void {
  const url = `/orcamento/${orderId}`;
  window.open(url, "_blank");
}

/**
 * Faz download direto do arquivo PDF gerado no dispositivo
 */
export async function downloadOrderPdf(order: OrderData, items?: OrderItem[]): Promise<void> {
  try {
    const [loadedItems, logos] = await Promise.all([
      items && items.length > 0 ? items : fetchOrderItems(order.id),
      preloadLogos(),
    ]);
    const { doc, filename } = generateOrderPdfDoc(order, loadedItems, logos);
    doc.save(filename);
  } catch (err: any) {
    console.error("Erro ao baixar PDF:", err);
    // Fallback: abre a rota de visualização
    openOrderPdf(order.id);
  }
}

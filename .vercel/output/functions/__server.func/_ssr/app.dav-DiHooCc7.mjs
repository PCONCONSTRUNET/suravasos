import { i as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./supabase-DyNMUxMx.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as Button } from "./button-DiE0A9q4.mjs";
import { r as Badge } from "./dist-Db34orMe.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { b as Printer, t as X, u as Trash2, x as Plus } from "../_libs/lucide-react.mjs";
import { r as PageHeader } from "./app-shell-BDw82Ml2.mjs";
import { t as Card } from "./card-CtX3ithx.mjs";
import { n as useConfirm } from "./ConfirmContext-vho0i-5n.mjs";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-C0WYWEQX.mjs";
import { a as SheetTitle, i as SheetHeader, n as SheetContent, t as Sheet } from "./sheet-D34QUmVZ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app.dav-DiHooCc7.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var WhatsAppIcon = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
	xmlns: "http://www.w3.org/2000/svg",
	viewBox: "0 0 24 24",
	fill: "currentColor",
	className: "h-4 w-4",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" })
});
function gerarHTMLOrcamento(dav, itens) {
	const linhasItens = itens.map((i, idx) => `
    <tr>
      <td>${idx + 1}</td>
      <td>${i.codigo || "—"}</td>
      <td>${i.produto || "—"}</td>
      <td style="text-align:center">${i.qtd}</td>
      <td style="text-align:right">R$ ${Number(i.valor_unitario || 0).toFixed(2).replace(".", ",")}</td>
      <td style="text-align:right"><strong>R$ ${Number(i.total || 0).toFixed(2).replace(".", ",")}</strong></td>
    </tr>
  `).join("");
	const total = Number(dav.total || 0);
	const subtotal = Number(dav.subtotal || 0);
	const desconto = Number(dav.desconto_valor || 0);
	const frete = Number(dav.frete_valor || 0);
	return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8"/>
  <title>Orçamento ${dav.id?.substring(0, 8).toUpperCase()}</title>
  <style>
    * { margin:0; padding:0; box-sizing:border-box; }
    body { font-family: Arial, sans-serif; font-size: 12px; color: #111; padding: 32px; }
    .header { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 3px solid #16a34a; padding-bottom: 16px; margin-bottom: 20px; }
    .logo { font-size: 22px; font-weight: 900; color: #16a34a; letter-spacing: -1px; }
    .logo span { color: #111; }
    .doc-title { text-align: right; }
    .doc-title h2 { font-size: 18px; font-weight: bold; color: #16a34a; }
    .doc-title p { color: #666; font-size: 11px; margin-top: 2px; }
    .section { margin-bottom: 16px; }
    .section-title { font-size: 11px; font-weight: bold; text-transform: uppercase; color: #16a34a; border-bottom: 1px solid #e5e7eb; padding-bottom: 4px; margin-bottom: 8px; letter-spacing: 0.5px; }
    .grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
    .info-row { margin-bottom: 4px; }
    .info-label { color: #666; font-size: 11px; }
    .info-value { font-weight: 600; font-size: 12px; }
    table { width: 100%; border-collapse: collapse; margin-bottom: 16px; }
    thead tr { background: #f0fdf4; }
    th { padding: 8px 6px; text-align: left; font-size: 11px; font-weight: bold; border-bottom: 2px solid #16a34a; }
    td { padding: 7px 6px; border-bottom: 1px solid #f3f4f6; font-size: 12px; }
    tbody tr:nth-child(even) { background: #fafafa; }
    .totals { float: right; width: 260px; }
    .total-row { display: flex; justify-content: space-between; padding: 4px 0; font-size: 12px; }
    .total-final { display: flex; justify-content: space-between; padding: 8px 0; font-size: 15px; font-weight: bold; border-top: 2px solid #16a34a; margin-top: 4px; color: #16a34a; }
    .clearfix::after { content: ""; display: table; clear: both; }
    .obs { background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 4px; padding: 10px; margin-top: 16px; font-size: 11px; }
    .footer { margin-top: 32px; text-align: center; font-size: 10px; color: #999; border-top: 1px solid #e5e7eb; padding-top: 12px; }
    .validade { font-size: 11px; color: #f59e0b; font-weight: 600; }
    @media print { body { padding: 16px; } }
  </style>
</head>
<body>
  <div class="header">
    <div>
      <div class="logo">VIVA<span>VERDE</span></div>
      <div style="font-size:11px; color:#666; margin-top:4px;">Distribuidora de Vasos e Acessórios</div>
      <div style="font-size:11px; color:#666;">Rod. Marechal Rondon, KM 342 — Bauru/SP</div>
    </div>
    <div class="doc-title">
      <h2>ORÇAMENTO (DAV)</h2>
      <p>Nº ${dav.id?.substring(0, 8).toUpperCase()}</p>
      <p>Data: ${new Date(dav.created_at || dav.validade || Date.now()).toLocaleDateString("pt-BR")}</p>
      ${dav.validade ? `<p class="validade">Válido até: ${new Date(dav.validade).toLocaleDateString("pt-BR")}</p>` : ""}
    </div>
  </div>

  <div class="grid2" style="margin-bottom:20px;">
    <div class="section">
      <div class="section-title">Dados do Cliente</div>
      <div class="info-row"><span class="info-label">Nome/Razão Social: </span><span class="info-value">${dav.cliente_nome || "—"}</span></div>
      ${dav.cliente_cnpj ? `<div class="info-row"><span class="info-label">CNPJ/CPF: </span><span class="info-value">${dav.cliente_cnpj}</span></div>` : ""}
      ${dav.cliente_endereco ? `<div class="info-row"><span class="info-label">Endereço: </span><span class="info-value">${dav.cliente_endereco}</span></div>` : ""}
      ${dav.cliente_telefone ? `<div class="info-row"><span class="info-label">Telefone: </span><span class="info-value">${dav.cliente_telefone}</span></div>` : ""}
    </div>
    <div class="section">
      <div class="section-title">Condições Comerciais</div>
      ${dav.vendedor ? `<div class="info-row"><span class="info-label">Vendedor: </span><span class="info-value">${dav.vendedor}</span></div>` : ""}
      ${dav.condicao_pagamento ? `<div class="info-row"><span class="info-label">Pagamento: </span><span class="info-value">${dav.condicao_pagamento}</span></div>` : ""}
      ${dav.frete_tipo ? `<div class="info-row"><span class="info-label">Frete: </span><span class="info-value">${dav.frete_tipo}</span></div>` : ""}
      ${dav.prazo_entrega ? `<div class="info-row"><span class="info-label">Prazo: </span><span class="info-value">${dav.prazo_entrega}</span></div>` : ""}
    </div>
  </div>

  <div class="section">
    <div class="section-title">Produtos</div>
    <table>
      <thead>
        <tr>
          <th style="width:30px">#</th>
          <th style="width:80px">Código</th>
          <th>Produto</th>
          <th style="width:50px; text-align:center">Qtd</th>
          <th style="width:100px; text-align:right">Vlr Unit.</th>
          <th style="width:110px; text-align:right">Total</th>
        </tr>
      </thead>
      <tbody>${linhasItens}</tbody>
    </table>
  </div>

  <div class="clearfix">
    <div class="totals">
      <div class="total-row"><span>Subtotal</span><span>R$ ${subtotal.toFixed(2).replace(".", ",")}</span></div>
      ${desconto > 0 ? `<div class="total-row"><span>Desconto</span><span style="color:#dc2626">- R$ ${desconto.toFixed(2).replace(".", ",")}</span></div>` : ""}
      ${frete > 0 ? `<div class="total-row"><span>Frete</span><span>R$ ${frete.toFixed(2).replace(".", ",")}</span></div>` : ""}
      <div class="total-final"><span>TOTAL</span><span>R$ ${total.toFixed(2).replace(".", ",")}</span></div>
    </div>
  </div>

  ${dav.observacoes ? `<div class="obs"><strong>Observações:</strong> ${dav.observacoes}</div>` : ""}

  <div class="footer">
    Este documento não tem validade fiscal. Orçamento sujeito a alteração sem aviso prévio.<br/>
    VIVAVERDE Distribuidora — contato@vivaverde.com.br
  </div>
</body>
</html>`;
}
function DAVList() {
	const confirm = useConfirm();
	const [davs, setDavs] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [selectedDav, setSelectedDav] = (0, import_react.useState)(null);
	const [selectedItens, setSelectedItens] = (0, import_react.useState)([]);
	const [loadingItens, setLoadingItens] = (0, import_react.useState)(false);
	const fetchDavs = async () => {
		try {
			const { data, error } = await supabase.from("davs").select("*");
			if (error) throw error;
			setDavs((data || []).sort((a, b) => {
				const dateA = a.created_at || a.validade || "";
				return (b.created_at || b.validade || "").localeCompare(dateA);
			}));
		} catch (err) {
			console.error(err);
			alert("Erro ao buscar orçamentos: " + err.message);
		} finally {
			setLoading(false);
		}
	};
	(0, import_react.useEffect)(() => {
		fetchDavs();
	}, []);
	const handleOpenDetail = async (d) => {
		setSelectedDav(d);
		setLoadingItens(true);
		try {
			const { data, error } = await supabase.from("dav_items").select("*").eq("dav_id", d.id);
			if (!error && data) setSelectedItens(data);
		} catch (e) {
			console.error(e);
		} finally {
			setLoadingItens(false);
		}
	};
	const handleDelete = async (id) => {
		if (!await confirm({
			description: "Tem certeza que deseja excluir este orçamento?",
			variant: "destructive"
		})) return;
		try {
			await supabase.from("dav_items").delete().eq("dav_id", id);
			const { error } = await supabase.from("davs").delete().eq("id", id);
			if (error) throw error;
			if (selectedDav?.id === id) setSelectedDav(null);
			fetchDavs();
		} catch (err) {
			alert("Erro ao deletar: " + err.message);
		}
	};
	const handleImprimir = async (d) => {
		setLoadingItens(true);
		let itens = selectedItens;
		if (!selectedDav || selectedDav.id !== d.id) {
			const { data } = await supabase.from("dav_items").select("*").eq("dav_id", d.id);
			itens = data || [];
		}
		setLoadingItens(false);
		const html = gerarHTMLOrcamento(d, itens);
		const win = window.open("", "_blank");
		if (win) {
			win.document.write(html);
			win.document.close();
			setTimeout(() => win.print(), 500);
		}
	};
	const handleWhatsApp = async (d) => {
		let itens = selectedItens;
		if (!selectedDav || selectedDav.id !== d.id) {
			const { data } = await supabase.from("dav_items").select("*").eq("dav_id", d.id);
			itens = data || [];
		}
		const linhas = itens.map((i) => `▪ *${i.produto}* — Qtd: ${i.qtd} × R$ ${Number(i.valor_unitario).toFixed(2).replace(".", ",")} = *R$ ${Number(i.total).toFixed(2).replace(".", ",")}*`).join("\n");
		const total = Number(d.total || 0);
		const desconto = Number(d.desconto_valor || 0);
		const frete = Number(d.frete_valor || 0);
		const mensagem = `Olá ${d.cliente_nome || ""}! Segue seu orçamento da *VIVAVERDE* 🌿\n\n*Orçamento Nº:* ${d.id?.substring(0, 8).toUpperCase()}\n` + (d.validade ? `*Válido até:* ${new Date(d.validade).toLocaleDateString("pt-BR")}\n` : "") + `\n*PRODUTOS:*\n${linhas}\n\n` + (desconto > 0 ? `*Desconto:* - R$ ${desconto.toFixed(2).replace(".", ",")}\n` : "") + (frete > 0 ? `*Frete:* R$ ${frete.toFixed(2).replace(".", ",")}\n` : "") + `\n💰 *TOTAL: R$ ${total.toFixed(2).replace(".", ",")}*\n\n` + (d.condicao_pagamento ? `*Pagamento:* ${d.condicao_pagamento}\n` : "") + (d.prazo_entrega ? `*Prazo de entrega:* ${d.prazo_entrega}\n` : "") + `\nQualquer dúvida estamos à disposição! 😊`;
		const tel = d.cliente_telefone?.replace(/\D/g, "");
		const base = tel ? `https://wa.me/55${tel}` : `https://wa.me/`;
		window.open(`${base}?text=${encodeURIComponent(mensagem)}`, "_blank");
	};
	const getStatusTone = (status) => {
		if (status === "Aprovado") return "bg-success/15 text-success border-0";
		if (status === "Rejeitado") return "bg-destructive/10 text-destructive border-0";
		return "bg-info/15 text-info border-0";
	};
	const fmtDate = (v) => {
		if (!v) return "—";
		try {
			return new Date(v).toLocaleDateString("pt-BR");
		} catch {
			return "—";
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Orçamentos (DAV)",
			subtitle: "Documentos Auxiliares de Venda",
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				className: "bg-gradient-brand text-primary-foreground",
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/app/dav-novo",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-2 h-4 w-4" }), "Novo DAV"]
				})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			className: "shadow-card overflow-x-auto",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Nº" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Cliente" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Data" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
					className: "text-right",
					children: "Valor"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Status" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
					className: "text-right",
					children: "Ações"
				})
			] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
				colSpan: 6,
				className: "text-center py-8",
				children: "Carregando DAVs..."
			}) }) : davs.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
				colSpan: 6,
				className: "text-center py-8 text-muted-foreground",
				children: "Nenhum orçamento encontrado."
			}) }) : davs.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
				className: "cursor-pointer hover:bg-muted/40 transition-colors",
				onClick: () => handleOpenDetail(d),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
						className: "font-mono text-xs",
						children: d.id.substring(0, 8).toUpperCase()
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
						className: "font-semibold",
						children: d.cliente_nome || "—"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: fmtDate(d.created_at || d.validade) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
						className: "text-right font-semibold",
						children: ["R$ ", Number(d.total || 0).toFixed(2).replace(".", ",")]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						className: getStatusTone(d.status || "Aberto"),
						children: d.status || "Aberto"
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
						className: "text-right",
						onClick: (e) => e.stopPropagation(),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-end gap-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ghost",
									size: "icon",
									className: "h-8 w-8 text-slate-500 hover:text-primary",
									title: "Imprimir / Salvar PDF",
									onClick: (e) => {
										e.stopPropagation();
										handleImprimir(d);
									},
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Printer, { className: "h-4 w-4" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ghost",
									size: "icon",
									className: "h-8 w-8 text-[#25D366] hover:text-[#1aab57] hover:bg-green-50",
									title: "Enviar orçamento via WhatsApp",
									onClick: (e) => {
										e.stopPropagation();
										handleWhatsApp(d);
									},
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WhatsAppIcon, {})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ghost",
									size: "icon",
									className: "h-8 w-8 text-destructive hover:bg-destructive/10",
									onClick: (e) => {
										e.stopPropagation();
										handleDelete(d.id);
									},
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
								})
							]
						})
					})
				]
			}, d.id)) })] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
			open: !!selectedDav,
			onOpenChange: (open) => !open && setSelectedDav(null),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetContent, {
				className: "w-full sm:max-w-2xl overflow-y-auto p-0",
				children: selectedDav && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetHeader, {
					className: "px-6 py-4 border-b bg-gradient-to-r from-emerald-50 to-white",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetTitle, {
							className: "text-lg",
							children: ["Orçamento Nº ", selectedDav.id?.substring(0, 8).toUpperCase()]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground mt-0.5",
							children: selectedDav.cliente_nome
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-2 items-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								className: getStatusTone(selectedDav.status || "Aberto"),
								children: selectedDav.status || "Aberto"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "icon",
								className: "h-8 w-8",
								onClick: () => setSelectedDav(null),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2 mt-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							size: "sm",
							variant: "outline",
							className: "gap-1.5",
							onClick: () => handleImprimir(selectedDav),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Printer, { className: "h-4 w-4" }), " Imprimir / PDF"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							size: "sm",
							className: "gap-1.5 bg-[#25D366] hover:bg-[#1aab57] text-white",
							onClick: () => handleWhatsApp(selectedDav),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WhatsAppIcon, {}), " Enviar via WhatsApp"]
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "px-6 py-4 space-y-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
							className: "text-xs font-bold uppercase tracking-wider text-emerald-600 mb-3",
							children: "Dados do Cliente"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-3 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground block text-xs",
									children: "Nome"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold",
									children: selectedDav.cliente_nome || "—"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground block text-xs",
									children: "CNPJ/CPF"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold",
									children: selectedDav.cliente_cnpj || "—"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground block text-xs",
									children: "Telefone"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold",
									children: selectedDav.cliente_telefone || "—"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground block text-xs",
									children: "Endereço"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold",
									children: selectedDav.cliente_endereco || "—"
								})] })
							]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
							className: "text-xs font-bold uppercase tracking-wider text-emerald-600 mb-3",
							children: "Condições Comerciais"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-3 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground block text-xs",
									children: "Vendedor"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold",
									children: selectedDav.vendedor || "—"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground block text-xs",
									children: "Pagamento"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold",
									children: selectedDav.condicao_pagamento || "—"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground block text-xs",
									children: "Frete"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold",
									children: selectedDav.frete_tipo || "—"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground block text-xs",
									children: "Prazo"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold",
									children: selectedDav.prazo_entrega || "—"
								})] }),
								selectedDav.validade && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground block text-xs",
									children: "Validade"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold text-amber-600",
									children: fmtDate(selectedDav.validade)
								})] })
							]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
							className: "text-xs font-bold uppercase tracking-wider text-emerald-600 mb-3",
							children: "Produtos"
						}), loadingItens ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: "Carregando itens..."
						}) : selectedItens.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: "Nenhum item encontrado."
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "rounded-lg border overflow-hidden",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
								className: "w-full text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
									className: "bg-muted/50",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "text-left px-3 py-2 text-xs font-semibold",
											children: "Produto"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "text-center px-3 py-2 text-xs font-semibold",
											children: "Qtd"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "text-right px-3 py-2 text-xs font-semibold",
											children: "Unit."
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "text-right px-3 py-2 text-xs font-semibold",
											children: "Total"
										})
									] })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: selectedItens.map((i, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: "border-t",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
											className: "px-3 py-2.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "font-semibold text-slate-800",
												children: i.produto
											}), i.codigo && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs text-muted-foreground font-mono",
												children: i.codigo
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-3 py-2.5 text-center font-medium",
											children: i.qtd
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
											className: "px-3 py-2.5 text-right text-muted-foreground",
											children: ["R$ ", Number(i.valor_unitario || 0).toFixed(2).replace(".", ",")]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
											className: "px-3 py-2.5 text-right font-bold",
											children: ["R$ ", Number(i.total || 0).toFixed(2).replace(".", ",")]
										})
									]
								}, idx)) })]
							})
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl bg-emerald-50 border border-emerald-100 p-4 space-y-2",
							children: [
								Number(selectedDav.desconto_valor) > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground",
										children: "Subtotal"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["R$ ", Number(selectedDav.subtotal || 0).toFixed(2).replace(".", ",")] })]
								}),
								Number(selectedDav.desconto_valor) > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground",
										children: "Desconto"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-destructive",
										children: ["- R$ ", Number(selectedDav.desconto_valor || 0).toFixed(2).replace(".", ",")]
									})]
								}),
								Number(selectedDav.frete_valor) > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground",
										children: "Frete"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["R$ ", Number(selectedDav.frete_valor || 0).toFixed(2).replace(".", ",")] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between font-bold text-lg border-t border-emerald-200 pt-2 mt-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Total" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-emerald-700",
										children: ["R$ ", Number(selectedDav.total || 0).toFixed(2).replace(".", ",")]
									})]
								})
							]
						}),
						selectedDav.observacoes && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								className: "text-xs font-bold uppercase tracking-wider text-emerald-600 mb-1",
								children: "Observações"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-muted-foreground bg-muted/50 rounded-lg p-3",
								children: selectedDav.observacoes
							})]
						})
					]
				})] })
			})
		})
	] });
}
//#endregion
export { DAVList as component };

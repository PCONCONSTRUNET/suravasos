import { i as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./supabase-Bvu1xBCC.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { F as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as Button } from "./button-BkEeRci-.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { t as Badge } from "./badge-D1Dupn2y.mjs";
import { _ as Search, _t as Banknote, f as Store, rt as CircleCheckBig } from "../_libs/lucide-react.mjs";
import { n as PageHeader } from "./app-shell-CIo6-35-.mjs";
import { a as CardTitle, i as CardHeader, n as CardContent, t as Card } from "./card-CtX3ithx.mjs";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-C0WYWEQX.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-Dg1urBTx.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app.vendas-parceiros-DFF5yeVF.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function VendasParceiros() {
	const [vendas, setVendas] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [filtro, setFiltro] = (0, import_react.useState)("");
	const [filtroStatusVenda, setFiltroStatusVenda] = (0, import_react.useState)("Todos");
	const [filtroStatusComissao, setFiltroStatusComissao] = (0, import_react.useState)("Todos");
	const fetchVendas = async () => {
		try {
			const { data, error } = await supabase.from("vendas").select(`
          *,
          cliente:clientes(nome),
          vendedor:vendedores(nome)
        `).not("vendedor_id", "is", null).order("created_at", { ascending: false });
			if (data) setVendas(data);
			if (error) console.error("Erro ao buscar vendas de parceiros:", error);
		} finally {
			setLoading(false);
		}
	};
	(0, import_react.useEffect)(() => {
		fetchVendas();
	}, []);
	const handlePagarComissao = async (id, vendedor_id, valorComissao) => {
		if (!confirm("Confirmar o pagamento desta comissão ao parceiro?")) return;
		try {
			const { error } = await supabase.from("vendas").update({ status_pagamento_comissao: "Paga" }).eq("id", id);
			if (error) throw error;
			const { data: vendedor } = await supabase.from("vendedores").select("comissoes_pendentes").eq("id", vendedor_id).single();
			if (vendedor) {
				const novaComissaoPendente = Math.max(0, (vendedor.comissoes_pendentes || 0) - valorComissao);
				await supabase.from("vendedores").update({ comissoes_pendentes: novaComissaoPendente }).eq("id", vendedor_id);
			}
			fetchVendas();
		} catch (err) {
			alert("Erro ao pagar comissão: " + err.message);
		}
	};
	const vendasFiltradas = vendas.filter((v) => {
		const matchBusca = v.id.toLowerCase().includes(filtro.toLowerCase()) || (v.vendedor?.nome || "").toLowerCase().includes(filtro.toLowerCase()) || (v.cliente?.nome || "").toLowerCase().includes(filtro.toLowerCase());
		const statusVendaStr = v.status || v.status_aprovacao || "Indefinido";
		const matchStatusVenda = filtroStatusVenda === "Todos" || statusVendaStr === filtroStatusVenda;
		const comissaoStatusStr = v.status_pagamento_comissao === "Paga" ? "Paga" : "Pendente";
		return matchBusca && matchStatusVenda && (filtroStatusComissao === "Todos" || comissaoStatusStr === filtroStatusComissao);
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Vendas dos Parceiros",
			subtitle: "Auditoria geral de todas as vendas e comissões dos vendedores."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			className: "shadow-card mb-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "p-4 flex flex-col sm:flex-row gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							placeholder: "Buscar por vendedor, cliente ou nº do pedido...",
							value: filtro,
							onChange: (e) => setFiltro(e.target.value),
							className: "pl-9"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: filtroStatusVenda,
						onValueChange: setFiltroStatusVenda,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
							className: "w-[180px]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Status Venda" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "Todos",
								children: "Todas as Vendas"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "Faturado",
								children: "Faturadas"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "Entregue",
								children: "Entregues"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "Pendente",
								children: "Pendentes"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "Aguardando Pagamento",
								children: "Aguard. Pagamento"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "Cancelado",
								children: "Canceladas"
							})
						] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: filtroStatusComissao,
						onValueChange: setFiltroStatusComissao,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
							className: "w-[180px]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Status Comissão" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "Todos",
								children: "Todas as Comissões"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "Pendente",
								children: "Pendentes"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "Paga",
								children: "Pagas"
							})
						] })]
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "shadow-card overflow-hidden",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Histórico de Vendas (Parceiros)" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Pedido Nº / Data" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Parceiro" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Cliente" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Status Venda" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
					className: "text-right",
					children: "Valor Venda"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
					className: "text-right",
					children: "Comissão"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
					className: "text-center",
					children: "Status Pagto."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
					className: "text-right",
					children: "Ação"
				})
			] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
				colSpan: 8,
				className: "text-center py-8",
				children: "Carregando histórico..."
			}) }) : vendasFiltradas.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
				colSpan: 8,
				className: "text-center py-8 text-muted-foreground",
				children: "Nenhuma venda de parceiro encontrada."
			}) }) : vendasFiltradas.map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "font-mono text-xs font-medium",
					children: ["#", v.id.substring(0, 8).toUpperCase()]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground",
					children: new Date(v.created_at).toLocaleDateString()
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Store, { className: "h-4 w-4 text-brand" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-semibold",
						children: v.vendedor?.nome || "Desconhecido"
					})]
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: v.cliente?.nome || "Consumidor Final" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					variant: "outline",
					className: v.status === "Faturado" || v.status === "Pago" || v.status === "Entregue" ? "border-success text-success bg-success/10" : v.status === "Pendente" || v.status === "Aguardando Pagamento" ? "border-warning text-warning bg-warning/10" : v.status === "Rejeitada" || v.status === "Cancelado" ? "border-destructive text-destructive bg-destructive/10" : "border-info text-info bg-info/10",
					children: v.status || v.status_aprovacao || "Indefinido"
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
					className: "text-right font-medium",
					children: ["R$ ", Number(v.valor_total).toFixed(2)]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
					className: "text-right text-brand font-bold",
					children: ["R$ ", Number(v.valor_comissao || 0).toFixed(2)]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					className: "text-center",
					children: v.status_pagamento_comissao === "Paga" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: "outline",
						className: "border-success text-success bg-success/10",
						children: "Paga"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: "outline",
						className: "border-warning text-warning bg-warning/10",
						children: "Pendente"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
					className: "text-right",
					children: [v.status_aprovacao === "Aprovada" && v.status_pagamento_comissao !== "Paga" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						variant: "outline",
						className: "text-success border-success/30 hover:bg-success/10",
						onClick: () => handlePagarComissao(v.id, v.vendedor_id, Number(v.valor_comissao)),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Banknote, { className: "h-4 w-4 mr-1" }), " Pagar"]
					}), v.status_pagamento_comissao === "Paga" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-xs text-muted-foreground font-medium flex items-center justify-end gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheckBig, { className: "h-3 w-3 text-success" }), " Quitado"]
					})]
				})
			] }, v.id)) })] })]
		})
	] });
}
//#endregion
export { VendasParceiros as component };

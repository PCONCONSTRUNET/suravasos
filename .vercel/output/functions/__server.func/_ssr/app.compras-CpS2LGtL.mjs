import { i as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./supabase-Bvu1xBCC.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { F as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as Button } from "./button-BkEeRci-.mjs";
import { t as Badge } from "./badge-D1Dupn2y.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { u as Trash2, x as Plus } from "../_libs/lucide-react.mjs";
import { n as PageHeader } from "./app-shell-CIo6-35-.mjs";
import { t as Card } from "./card-CtX3ithx.mjs";
import { n as useConfirm } from "./ConfirmContext-DprjPCem.mjs";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-C0WYWEQX.mjs";
import { a as SheetTitle, i as SheetHeader, n as SheetContent, r as SheetDescription, t as Sheet } from "./sheet-DxhNg4O2.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-Dg1urBTx.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app.compras-CpS2LGtL.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Compras() {
	const confirm = useConfirm();
	const [compras, setCompras] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [selectedCompra, setSelectedCompra] = (0, import_react.useState)(null);
	const [openSheet, setOpenSheet] = (0, import_react.useState)(false);
	const [compraItens, setCompraItens] = (0, import_react.useState)([]);
	const [loadingItens, setLoadingItens] = (0, import_react.useState)(false);
	const fetchCompras = async () => {
		try {
			const { data, error } = await supabase.from("compras").select(`*, fornecedores (empresa)`).order("created_at", { ascending: false });
			if (error) throw error;
			setCompras(data || []);
		} catch (err) {
			console.error(err);
			alert("Erro ao buscar compras.");
		} finally {
			setLoading(false);
		}
	};
	(0, import_react.useEffect)(() => {
		fetchCompras();
	}, []);
	const handleDelete = async (id) => {
		if (!await confirm({
			description: "Tem certeza que deseja excluir esta compra?",
			variant: "destructive"
		})) return;
		try {
			const { error } = await supabase.from("compras").delete().eq("id", id);
			if (error) throw error;
			fetchCompras();
		} catch (err) {
			alert("Erro ao deletar: " + err.message);
		}
	};
	const getTone = (status) => {
		if (status === "Recebido") return "bg-success/15 text-success border-0";
		if (status === "Em trânsito") return "bg-info/15 text-info border-0";
		if (status === "Aprovado") return "bg-primary/10 text-primary border-0 font-semibold";
		return "bg-warning/15 text-warning border-0 font-semibold";
	};
	const handleOpenDetails = async (compra) => {
		setSelectedCompra(compra);
		setOpenSheet(true);
		setLoadingItens(true);
		try {
			const { data, error } = await supabase.from("compras_itens").select("*, produtos(nome)").eq("compra_id", compra.id);
			if (!error && data) setCompraItens(data);
		} catch (err) {
			console.error(err);
		} finally {
			setLoadingItens(false);
		}
	};
	const handleStatusChange = async (id, newStatus) => {
		try {
			const { error } = await supabase.from("compras").update({ status: newStatus }).eq("id", id);
			if (error) throw error;
			setSelectedCompra((prev) => ({
				...prev,
				status: newStatus
			}));
			setCompras((prev) => prev.map((c) => c.id === id ? {
				...c,
				status: newStatus
			} : c));
		} catch (err) {
			alert("Erro ao atualizar status: " + err.message);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Compras",
			subtitle: "Pedidos de compra e recebimento de mercadorias",
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				className: "bg-gradient-brand text-primary-foreground",
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/app/compra-nova",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-2 h-4 w-4" }), "Nova Compra"]
				})
			}) })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			className: "shadow-card overflow-x-auto",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Nº" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Fornecedor" }),
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
				children: "Carregando compras..."
			}) }) : compras.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
				colSpan: 6,
				className: "text-center py-8 text-muted-foreground",
				children: "Nenhuma compra registrada."
			}) }) : compras.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
				className: "cursor-pointer hover:bg-muted/50",
				onClick: () => handleOpenDetails(o),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
						className: "font-mono text-xs",
						children: o.id.substring(0, 8).toUpperCase()
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
						className: "font-semibold",
						children: o.fornecedores?.empresa || (o.fornecedor_id ? "Fornecedor Removido" : "Sem Fornecedor")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: new Date(o.created_at).toLocaleDateString() }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
						className: "text-right font-semibold",
						children: ["R$ ", Number(o.valor_total).toFixed(2).replace(".", ",")]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						className: getTone(o.status),
						children: o.status
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
						className: "text-right",
						onClick: (e) => e.stopPropagation(),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "icon",
							className: "h-8 w-8 text-destructive",
							onClick: () => handleDelete(o.id),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
						})
					})
				]
			}, o.id)) })] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
			open: openSheet,
			onOpenChange: setOpenSheet,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
				className: "w-[400px] sm:w-[540px] sm:max-w-md overflow-y-auto",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTitle, { children: "Detalhes da Compra" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetDescription, { children: ["Compra Nº ", selectedCompra?.id?.substring(0, 8).toUpperCase()] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 space-y-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-4 text-sm bg-muted/30 p-4 rounded-lg",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground block text-xs uppercase tracking-wider",
								children: "Fornecedor"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium",
								children: selectedCompra?.fornecedores?.empresa || (selectedCompra?.fornecedor_id ? "Fornecedor Removido" : "Sem Fornecedor")
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground block text-xs uppercase tracking-wider",
								children: "Data"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium",
								children: selectedCompra ? new Date(selectedCompra.created_at).toLocaleDateString() : "-"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground block text-xs uppercase tracking-wider mb-1",
								children: "Status"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: selectedCompra?.status || "",
								onValueChange: (val) => handleStatusChange(selectedCompra.id, val),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
									className: `h-8 border-0 ${selectedCompra ? getTone(selectedCompra.status) : ""}`,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "Pendente",
										children: "Pendente"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "Aprovado",
										children: "Aprovado"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "Em trânsito",
										children: "Em trânsito"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "Recebido",
										children: "Recebido"
									})
								] })]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground block text-xs uppercase tracking-wider",
								children: "Total"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-bold text-base",
								children: ["R$ ", Number(selectedCompra?.valor_total || 0).toLocaleString("pt-BR", { minimumFractionDigits: 2 })]
							})] })
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "border-t pt-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
							className: "font-semibold mb-4 flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Produtos Comprados" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
								variant: "outline",
								children: [compraItens.length, " itens"]
							})]
						}), loadingItens ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: "Carregando itens..."
						}) : compraItens.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: "Nenhum item encontrado."
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-3",
							children: compraItens.map((item, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between p-3 rounded-md border bg-card",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "font-medium text-sm",
									children: [
										item.quantidade,
										"x ",
										item.produtos?.nome || "Produto Desconhecido"
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs text-muted-foreground mt-1",
									children: ["Custo unitário: R$ ", Number(item.valor_unitario).toFixed(2).replace(".", ",")]
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-semibold text-sm",
									children: ["R$ ", Number(item.subtotal).toFixed(2).replace(".", ",")]
								})]
							}, idx))
						})]
					})]
				})]
			})
		})
	] });
}
//#endregion
export { Compras as component };

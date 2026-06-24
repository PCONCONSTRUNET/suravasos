import { i as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./supabase-Bvu1xBCC.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { F as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as Button } from "./button-BkEeRci-.mjs";
import { t as Badge } from "./badge-D1Dupn2y.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { b as Printer, u as Trash2, x as Plus } from "../_libs/lucide-react.mjs";
import { n as PageHeader } from "./app-shell-CIo6-35-.mjs";
import { t as Card } from "./card-CtX3ithx.mjs";
import { n as useConfirm } from "./ConfirmContext-DprjPCem.mjs";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-C0WYWEQX.mjs";
import { a as SheetTitle, i as SheetHeader, n as SheetContent, r as SheetDescription, t as Sheet } from "./sheet-DxhNg4O2.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app.dav-C80TWBv0.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function DAVList() {
	const confirm = useConfirm();
	const [davs, setDavs] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [selectedDav, setSelectedDav] = (0, import_react.useState)(null);
	const [openSheet, setOpenSheet] = (0, import_react.useState)(false);
	const [davItens, setDavItens] = (0, import_react.useState)([]);
	const [loadingItens, setLoadingItens] = (0, import_react.useState)(false);
	const fetchDAVs = async () => {
		try {
			const { data, error } = await supabase.from("vendas").select(`*, clientes (nome)`).eq("tipo", "DAV").or("status_aprovacao.neq.Pendente,status_aprovacao.is.null").order("created_at", { ascending: false });
			if (error) throw error;
			setDavs(data || []);
		} catch (err) {
			console.error(err);
			alert("Erro ao buscar orçamentos.");
		} finally {
			setLoading(false);
		}
	};
	(0, import_react.useEffect)(() => {
		fetchDAVs();
	}, []);
	const handleOpenDetails = async (dav) => {
		setSelectedDav(dav);
		setOpenSheet(true);
		setLoadingItens(true);
		try {
			const { data, error } = await supabase.from("vendas_itens").select("*, produtos(nome)").eq("venda_id", dav.id);
			if (!error && data) setDavItens(data);
		} catch (err) {
			console.error(err);
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
			const { error } = await supabase.from("vendas").delete().eq("id", id);
			if (error) throw error;
			fetchDAVs();
		} catch (err) {
			alert("Erro ao deletar: " + err.message);
		}
	};
	const handleShareWhatsApp = async (venda) => {
		try {
			const { data: itens } = await supabase.from("vendas_itens").select("*, produtos(nome)").eq("venda_id", venda.id);
			let msg = `*ORÇAMENTO - VIVAVERDE VASOS*\n`;
			msg += `Nº: ${venda.id.substring(0, 8).toUpperCase()}\n`;
			msg += `Data: ${new Date(venda.created_at).toLocaleDateString()}\n\n`;
			msg += `*ITENS DO ORÇAMENTO:*\n`;
			if (itens) itens.forEach((item) => {
				msg += `• ${item.quantidade}x ${item.produtos?.nome || "Produto"} - R$ ${Number(item.subtotal).toFixed(2).replace(".", ",")}\n`;
			});
			msg += `\n*TOTAL: R$ ${Number(venda.valor_total).toFixed(2).replace(".", ",")}*\n\n`;
			const linkPdf = `${window.location.origin}/orcamento/${venda.id}`;
			msg += `📄 *Acesse o documento formal em PDF aqui:*\n${linkPdf}`;
			const url = `https://wa.me/?text=${encodeURIComponent(msg)}`;
			window.open(url, "_blank");
		} catch (err) {
			console.error(err);
			alert("Erro ao gerar mensagem do WhatsApp");
		}
	};
	const getTone = (status) => {
		if (status === "Aprovado") return "bg-success/15 text-success border-0";
		if (status === "Rejeitado") return "bg-destructive/10 text-destructive border-0";
		return "bg-info/15 text-info border-0";
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Orçamentos (DAV)",
			subtitle: "Documentos Auxiliares de Venda",
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				className: "bg-gradient-brand text-primary-foreground",
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/app/venda-nova",
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
			}) }) : davs.map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
				className: "cursor-pointer hover:bg-muted/50",
				onClick: () => handleOpenDetails(v),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
						className: "font-mono text-xs",
						children: v.id.substring(0, 8).toUpperCase()
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
						className: "font-semibold",
						children: v.clientes?.nome || "Cliente Removido"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: new Date(v.created_at).toLocaleDateString() }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
						className: "text-right font-semibold",
						children: ["R$ ", Number(v.valor_total).toFixed(2).replace(".", ",")]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						className: getTone(v.status),
						children: v.status
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
						className: "text-right space-x-2",
						onClick: (e) => e.stopPropagation(),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "icon",
								className: "h-8 w-8 text-primary",
								onClick: () => handleShareWhatsApp(v),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
									className: "h-5 w-5 text-green-500",
									viewBox: "0 0 24 24",
									fill: "currentColor",
									xmlns: "http://www.w3.org/2000/svg",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.489-1.761-1.663-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" })
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "icon",
								className: "h-8 w-8 text-primary",
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: `/app/imprimir-dav/${v.id}`,
									target: "_blank",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Printer, { className: "h-4 w-4" })
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "icon",
								className: "h-8 w-8 text-destructive",
								onClick: () => handleDelete(v.id),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
							})
						]
					})
				]
			}, v.id)) })] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
			open: openSheet,
			onOpenChange: setOpenSheet,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
				className: "w-[400px] sm:w-[540px] sm:max-w-md overflow-y-auto",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTitle, { children: "Detalhes do Orçamento" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetDescription, { children: ["DAV Nº ", selectedDav?.id?.substring(0, 8).toUpperCase()] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 space-y-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-4 text-sm bg-muted/30 p-4 rounded-lg",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground block text-xs uppercase tracking-wider",
									children: "Cliente"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-medium",
									children: selectedDav?.clientes?.nome || "Cliente Removido"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground block text-xs uppercase tracking-wider",
									children: "Data"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-medium",
									children: selectedDav ? new Date(selectedDav.created_at).toLocaleDateString() : "-"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground block text-xs uppercase tracking-wider",
									children: "Status"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									className: selectedDav ? getTone(selectedDav.status) : "",
									children: selectedDav?.status
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground block text-xs uppercase tracking-wider",
									children: "Total"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-bold text-base",
									children: ["R$ ", Number(selectedDav?.valor_total || 0).toLocaleString("pt-BR", { minimumFractionDigits: 2 })]
								})] })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "border-t pt-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
								className: "font-semibold mb-4 flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Produtos do Orçamento" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
									variant: "outline",
									children: [davItens.length, " itens"]
								})]
							}), loadingItens ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground",
								children: "Carregando itens..."
							}) : davItens.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground",
								children: "Nenhum item encontrado."
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "space-y-3",
								children: davItens.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between items-center p-3 rounded-lg border border-border/50 bg-background hover:bg-muted/20 transition-colors",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-semibold text-sm",
										children: item.produtos?.nome || "Produto Desconhecido"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-xs text-muted-foreground",
										children: [
											item.quantidade,
											"x R$ ",
											Number(item.valor_unitario).toLocaleString("pt-BR", { minimumFractionDigits: 2 })
										]
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-right font-medium text-sm",
										children: ["R$ ", Number(item.subtotal).toLocaleString("pt-BR", { minimumFractionDigits: 2 })]
									})]
								}, item.id))
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-3 pt-6 border-t",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								className: "flex-1",
								variant: "outline",
								onClick: () => handleShareWhatsApp(selectedDav),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
									className: "mr-2 h-4 w-4 text-green-500",
									viewBox: "0 0 24 24",
									fill: "currentColor",
									xmlns: "http://www.w3.org/2000/svg",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.489-1.761-1.663-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" })
								}), "Enviar WhatsApp"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								className: "flex-1 bg-slate-900",
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: `/orcamento/${selectedDav?.id}`,
									target: "_blank",
									children: "Imprimir PDF"
								})
							})]
						})
					]
				})]
			})
		})
	] });
}
//#endregion
export { DAVList as component };

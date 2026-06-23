import { a as require_jsx_runtime, i as __toESM, o as require_react } from "./react-dom-4oCbIcVr.mjs";
import { t as Link } from "./link-DcX1dWGt.mjs";
import { i as supabase } from "./supabase-e8TdIE0G.mjs";
import { t as Button } from "./button-DCabknOD.mjs";
import { r as Badge } from "./dist-De42YJC_.mjs";
import { t as Search } from "./shopping-cart-DC0Byx9m.mjs";
import { t as Input } from "./input-Bgkn3kJP.mjs";
import { u as PageHeader } from "./app-shell-DXEQSuIT.mjs";
import { n as CardContent, t as Card } from "./card-Xhfpy7_x.mjs";
import { n as useConfirm } from "./ConfirmContext-CPHq_Vwj.mjs";
import { t as Plus } from "./plus-Khe2j6_m.mjs";
import { t as Trash2 } from "./trash-2-Cy3vXvGo.mjs";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-BjSIm1Ay.mjs";
import { a as SheetTitle, i as SheetHeader, n as SheetContent, r as SheetDescription, t as Sheet } from "./sheet-BQW7_7i2.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app.clientes-B4vpnTkV.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Clientes() {
	const confirm = useConfirm();
	const [clientes, setClientes] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [selectedCliente, setSelectedCliente] = (0, import_react.useState)(null);
	const [openSheet, setOpenSheet] = (0, import_react.useState)(false);
	const [clientVendas, setClientVendas] = (0, import_react.useState)([]);
	const [loadingVendas, setLoadingVendas] = (0, import_react.useState)(false);
	const fetchClientes = async () => {
		try {
			const { data, error } = await supabase.from("clientes").select("*").order("created_at", { ascending: false });
			if (error) throw error;
			setClientes(data || []);
		} catch (err) {
			console.error(err);
			alert("Erro ao buscar clientes.");
		} finally {
			setLoading(false);
		}
	};
	(0, import_react.useEffect)(() => {
		fetchClientes();
	}, []);
	const handleOpenDetails = async (c) => {
		setSelectedCliente(c);
		setOpenSheet(true);
		setLoadingVendas(true);
		try {
			const { data, error } = await supabase.from("vendas").select("*").eq("cliente_id", c.id).order("created_at", { ascending: false });
			if (!error && data) setClientVendas(data);
		} catch (err) {
			console.error(err);
		} finally {
			setLoadingVendas(false);
		}
	};
	const handleDelete = async (id) => {
		if (!await confirm({
			description: "Tem certeza que deseja excluir este cliente?",
			variant: "destructive"
		})) return;
		try {
			const { error } = await supabase.from("clientes").delete().eq("id", id);
			if (error) throw error;
			fetchClientes();
		} catch (err) {
			alert("Erro ao deletar: " + err.message);
		}
	};
	const ativos = clientes.filter((c) => c.status === "Ativo" || c.status === "Premium").length;
	const inativos = clientes.filter((c) => c.status === "Inativo").length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Clientes",
			subtitle: `${clientes.length} clientes cadastrados`,
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				className: "bg-gradient-brand text-primary-foreground",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/app/cliente-novo",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-2 h-4 w-4" }), "Novo Cliente"]
				})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-4 sm:grid-cols-3 mb-6",
			children: [
				[
					"Total",
					clientes.length,
					"text-primary"
				],
				[
					"Ativos",
					ativos,
					"text-success"
				],
				[
					"Inativos",
					inativos,
					"text-destructive"
				]
			].map(([l, v, c]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "shadow-card",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "p-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: l
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: `mt-1 font-display text-2xl font-bold ${c}`,
						children: v
					})]
				})
			}, String(l)))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "shadow-card",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-3 border-b p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative flex-1 min-w-[200px]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							placeholder: "Buscar cliente…",
							className: "pl-9"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						size: "sm",
						children: "Cidade"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						size: "sm",
						children: "Status"
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-x-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Nome / Razão Social" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Documento" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Cidade / UF" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Telefone" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Última Compra" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Status" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
						className: "text-right",
						children: "Ações"
					})
				] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					colSpan: 7,
					className: "text-center py-8 text-muted-foreground",
					children: "Carregando clientes..."
				}) }) : clientes.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					colSpan: 7,
					className: "text-center py-8 text-muted-foreground",
					children: "Nenhum cliente cadastrado ainda."
				}) }) : clientes.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
					className: "cursor-pointer hover:bg-muted/50",
					onClick: () => handleOpenDetails(c),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-9 w-9 rounded-full bg-gradient-brand grid place-items-center text-xs font-bold text-primary-foreground",
								children: c.nome.split(" ").map((x) => x[0]).slice(0, 2).join("").toUpperCase()
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-semibold",
								children: c.nome
							})]
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							className: "font-mono text-sm text-muted-foreground",
							children: c.cpf_cnpj || "-"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							className: "text-muted-foreground",
							children: c.cidade ? `${c.cidade}${c.uf ? "/" + c.uf : ""}` : "-"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							className: "font-mono text-sm",
							children: c.telefone || "-"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							className: "text-muted-foreground text-sm",
							children: c.ultima_compra ? new Date(c.ultima_compra).toLocaleDateString() : "-"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							className: c.status === "Premium" ? "bg-info/15 text-info hover:bg-info/20 border-0" : c.status === "Ativo" ? "bg-success/15 text-success hover:bg-success/20 border-0" : "bg-muted text-muted-foreground border-0",
							children: c.status
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							className: "text-right",
							onClick: (e) => e.stopPropagation(),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "icon",
								variant: "ghost",
								className: "h-8 w-8 text-destructive",
								onClick: () => handleDelete(c.id),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
							})
						})
					]
				}, c.id)) })] })
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
			open: openSheet,
			onOpenChange: setOpenSheet,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
				className: "w-[400px] sm:w-[540px] sm:max-w-md overflow-y-auto",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTitle, { children: "Detalhes do Cliente" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetDescription, { children: [
					selectedCliente?.nome,
					" - ",
					selectedCliente?.cpf_cnpj || "Sem documento"
				] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 space-y-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-4 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground block",
								children: "Telefone"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium",
								children: selectedCliente?.telefone || "-"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground block",
								children: "Cidade/UF"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium",
								children: selectedCliente?.cidade ? `${selectedCliente.cidade}${selectedCliente.uf ? "/" + selectedCliente.uf : ""}` : "-"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "col-span-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground block",
									children: "Endereço"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-medium",
									children: selectedCliente?.endereco || "-"
								})]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "border-t pt-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
							className: "font-semibold mb-4",
							children: "Histórico de Compras"
						}), loadingVendas ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: "Carregando movimentações..."
						}) : clientVendas.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: "Nenhuma compra registrada para este cliente."
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-4",
							children: clientVendas.map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between items-center p-3 rounded-lg border border-border/50",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "font-semibold text-sm",
									children: ["Pedido #", v.id?.toString().slice(0, 5)]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs text-muted-foreground",
									children: new Date(v.created_at).toLocaleDateString()
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-right",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "font-bold text-sm",
										children: ["R$ ", Number(v.total || 0).toLocaleString("pt-BR", { minimumFractionDigits: 2 })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										variant: "outline",
										className: "text-[10px] mt-1",
										children: v.status
									})]
								})]
							}, v.id))
						})]
					})]
				})]
			})
		})
	] });
}
//#endregion
export { Clientes as component };

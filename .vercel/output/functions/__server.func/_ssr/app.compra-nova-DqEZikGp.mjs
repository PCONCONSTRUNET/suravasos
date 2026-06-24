import { i as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./supabase-Bvu1xBCC.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { F as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as Button } from "./button-BkEeRci-.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { E as PackagePlus, bt as ArrowLeft, u as Trash2, v as Save, x as Plus } from "../_libs/lucide-react.mjs";
import { n as PageHeader } from "./app-shell-CIo6-35-.mjs";
import { t as Card } from "./card-CtX3ithx.mjs";
import { t as Label } from "./label-DBD1bRRP.mjs";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-C0WYWEQX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app.compra-nova-DqEZikGp.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function NovaCompra() {
	const navigate = useNavigate();
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [fornecedores, setFornecedores] = (0, import_react.useState)([]);
	const [produtos, setProdutos] = (0, import_react.useState)([]);
	const [fornecedorId, setFornecedorId] = (0, import_react.useState)("");
	const [status, setStatus] = (0, import_react.useState)("Recebido");
	const [itens, setItens] = (0, import_react.useState)([]);
	const [produtoSelecionado, setProdutoSelecionado] = (0, import_react.useState)("");
	const [quantidade, setQuantidade] = (0, import_react.useState)(1);
	const [custoUnitario, setCustoUnitario] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		const fetchData = async () => {
			const { data: f } = await supabase.from("fornecedores").select("*").order("empresa");
			const { data: p } = await supabase.from("produtos").select("*").order("nome");
			if (f) setFornecedores(f);
			if (p) setProdutos(p);
		};
		fetchData();
	}, []);
	const handleProdutoChange = (id) => {
		setProdutoSelecionado(id);
		const prod = produtos.find((p) => p.id === id);
		if (prod) setCustoUnitario(Number((prod.valor * .5).toFixed(2)));
		else setCustoUnitario(0);
	};
	const handleAddItem = () => {
		if (!produtoSelecionado || quantidade <= 0 || custoUnitario < 0) return;
		const prod = produtos.find((p) => p.id === produtoSelecionado);
		if (!prod) return;
		const novoItem = {
			produto_id: prod.id,
			nome: prod.nome,
			valor_unitario: Number(custoUnitario),
			quantidade,
			subtotal: Number(custoUnitario) * quantidade
		};
		setItens([...itens, novoItem]);
		setProdutoSelecionado("");
		setQuantidade(1);
		setCustoUnitario(0);
	};
	const handleRemoveItem = (index) => {
		const novosItens = [...itens];
		novosItens.splice(index, 1);
		setItens(novosItens);
	};
	const valorTotal = itens.reduce((acc, item) => acc + item.subtotal, 0);
	const handleSalvar = async () => {
		if (!fornecedorId) {
			alert("Selecione um fornecedor.");
			return;
		}
		if (itens.length === 0) {
			alert("Adicione pelo menos um produto.");
			return;
		}
		setLoading(true);
		try {
			const { data: compraData, error: compraError } = await supabase.from("compras").insert([{
				fornecedor_id: fornecedorId,
				status,
				valor_total: valorTotal
			}]).select().single();
			if (compraError) throw compraError;
			const compraId = compraData.id;
			const itensToInsert = itens.map((i) => ({
				compra_id: compraId,
				produto_id: i.produto_id,
				quantidade: i.quantidade,
				valor_unitario: i.valor_unitario,
				subtotal: i.subtotal
			}));
			const { error: itensError } = await supabase.from("compras_itens").insert(itensToInsert);
			if (itensError) throw itensError;
			if (status === "Recebido") for (const item of itens) {
				const novoEstoque = produtos.find((p) => p.id === item.produto_id).estoque + item.quantidade;
				await supabase.from("produtos").update({ estoque: novoEstoque }).eq("id", item.produto_id);
			}
			const vencimento = /* @__PURE__ */ new Date();
			vencimento.setDate(vencimento.getDate() + 30);
			await supabase.from("contas_pagar").insert([{
				compra_id: compraId,
				fornecedor_id: fornecedorId,
				descricao: `Compra #${compraId.substring(0, 8).toUpperCase()}`,
				valor: valorTotal,
				vencimento: vencimento.toISOString().split("T")[0],
				status: status === "Recebido" ? "Pago" : "Pendente",
				data_pagamento: status === "Recebido" ? (/* @__PURE__ */ new Date()).toISOString().split("T")[0] : null
			}]);
			alert("Compra finalizada com sucesso!");
			navigate({ to: "/app/compras" });
		} catch (err) {
			console.error(err);
			alert("Erro ao salvar: " + err.message);
		} finally {
			setLoading(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "Nova Compra (Entrada)",
		subtitle: "Registre pedidos aos fornecedores e alimente o estoque",
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			variant: "outline",
			asChild: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/app/compras",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "mr-2 h-4 w-4" }), " Voltar"]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			className: "bg-gradient-brand text-primary-foreground",
			onClick: handleSalvar,
			disabled: loading || itens.length === 0,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "mr-2 h-4 w-4" }),
				" ",
				loading ? "Processando..." : "Salvar Compra"
			]
		})] })
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-6 md:grid-cols-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "md:col-span-2 space-y-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "shadow-card p-6 space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
					className: "font-semibold text-lg flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PackagePlus, { className: "h-5 w-5 text-brand" }), " Dados da Compra"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Fornecedor" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							className: "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
							value: fornecedorId,
							onChange: (e) => setFornecedorId(e.target.value),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								children: "Selecione um fornecedor..."
							}), fornecedores.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: f.id,
								children: f.empresa
							}, f.id))]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Status" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							className: "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
							value: status,
							onChange: (e) => setStatus(e.target.value),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "Recebido",
									children: "Recebido (Alimenta Estoque)"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "Pendente",
									children: "Pedido Pendente"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "Em trânsito",
									children: "Em trânsito"
								})
							]
						})]
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "shadow-card p-6 space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-semibold text-lg",
						children: "Itens Comprados"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-4 items-end flex-wrap",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2 flex-1 min-w-[200px]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Produto" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									className: "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
									value: produtoSelecionado,
									onChange: (e) => handleProdutoChange(e.target.value),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "",
										children: "Buscar produto..."
									}), produtos.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: p.id,
										children: p.nome
									}, p.id))]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2 w-24",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Custo Unt." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "number",
									step: "0.01",
									min: "0",
									value: custoUnitario,
									onChange: (e) => setCustoUnitario(Number(e.target.value))
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2 w-20",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Qtd" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "number",
									min: "1",
									value: quantidade,
									onChange: (e) => setQuantidade(Number(e.target.value))
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								type: "button",
								onClick: handleAddItem,
								variant: "secondary",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4 mr-2" }), " Adicionar"]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "border rounded-md mt-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Produto" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								className: "text-right",
								children: "Qtd"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								className: "text-right",
								children: "Custo"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								className: "text-right",
								children: "Subtotal"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {})
						] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: itens.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							colSpan: 5,
							className: "text-center py-4 text-muted-foreground",
							children: "Nenhum item adicionado."
						}) }) : itens.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								className: "font-semibold",
								children: item.nome
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								className: "text-right",
								children: item.quantidade
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
								className: "text-right",
								children: ["R$ ", item.valor_unitario.toFixed(2)]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
								className: "text-right font-bold",
								children: ["R$ ", item.subtotal.toFixed(2)]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								className: "text-right",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ghost",
									size: "icon",
									className: "h-8 w-8 text-destructive",
									onClick: () => handleRemoveItem(index),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
								})
							})
						] }, index)) })] })
					})
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "shadow-card p-6 bg-accent/30 border-brand/20",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-semibold text-lg mb-4",
					children: "Total da Compra"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between items-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-semibold text-lg",
							children: "Total"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-display text-2xl font-bold text-brand",
							children: ["R$ ", valorTotal.toFixed(2)]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: "O estoque dos produtos listados será incrementado automaticamente ao salvar a compra com status \"Recebido\"."
					})]
				})]
			})
		})]
	})] });
}
//#endregion
export { NovaCompra as component };

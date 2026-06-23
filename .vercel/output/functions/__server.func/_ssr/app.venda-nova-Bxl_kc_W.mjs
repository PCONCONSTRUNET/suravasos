import { i as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./supabase-DyNMUxMx.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as Button } from "./button-DiE0A9q4.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { dt as Check, f as ShoppingCart, ot as ChevronsUpDown, u as Trash2, v as Save, x as Plus, xt as ArrowLeft } from "../_libs/lucide-react.mjs";
import { r as PageHeader } from "./app-shell-BDw82Ml2.mjs";
import { t as Card } from "./card-CtX3ithx.mjs";
import { n as PopoverContent, r as PopoverTrigger, t as Popover } from "./popover-CIv7SO7u.mjs";
import { a as CommandItem, i as CommandInput, n as CommandEmpty, o as CommandList, r as CommandGroup, t as Command$1 } from "./command-BrmsamRj.mjs";
import { t as Label } from "./label-Bzg_1qon.mjs";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-C0WYWEQX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app.venda-nova-Bxl_kc_W.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function NovaVenda() {
	const navigate = useNavigate();
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [clientes, setClientes] = (0, import_react.useState)([]);
	const [produtos, setProdutos] = (0, import_react.useState)([]);
	const [clienteId, setClienteId] = (0, import_react.useState)("");
	const [tipo, setTipo] = (0, import_react.useState)("DAV");
	const [status, setStatus] = (0, import_react.useState)("Orçamento");
	const [itens, setItens] = (0, import_react.useState)([]);
	const [produtoSelecionado, setProdutoSelecionado] = (0, import_react.useState)("");
	const [quantidade, setQuantidade] = (0, import_react.useState)(1);
	const [openProduto, setOpenProduto] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const fetchData = async () => {
			const { data: c } = await supabase.from("clientes").select("*").order("nome");
			const { data: p } = await supabase.from("produtos").select("*").eq("status", "Ativo").order("nome");
			if (c) setClientes(c);
			if (p) setProdutos(p);
		};
		fetchData();
	}, []);
	const handleAddItem = () => {
		if (!produtoSelecionado || quantidade <= 0) return;
		const prod = produtos.find((p) => p.id === produtoSelecionado);
		if (!prod) return;
		if (tipo === "VENDA" && prod.estoque < quantidade) {
			alert(`Estoque insuficiente! Você tem apenas ${prod.estoque} unidades de ${prod.nome}.`);
			return;
		}
		const novoItem = {
			produto_id: prod.id,
			nome: prod.nome,
			valor_unitario: Number(prod.valor),
			quantidade,
			subtotal: Number(prod.valor) * quantidade
		};
		setItens([...itens, novoItem]);
		setProdutoSelecionado("");
		setQuantidade(1);
	};
	const handleRemoveItem = (index) => {
		const novosItens = [...itens];
		novosItens.splice(index, 1);
		setItens(novosItens);
	};
	const valorTotal = itens.reduce((acc, item) => acc + item.subtotal, 0);
	const handleSalvar = async () => {
		if (!clienteId) {
			alert("Selecione um cliente.");
			return;
		}
		if (itens.length === 0) {
			alert("Adicione pelo menos um produto.");
			return;
		}
		setLoading(true);
		try {
			const { data: vendaData, error: vendaError } = await supabase.from("vendas").insert([{
				cliente_id: clienteId,
				tipo,
				status,
				valor_total: valorTotal
			}]).select().single();
			if (vendaError) throw vendaError;
			const vendaId = vendaData.id;
			const itensToInsert = itens.map((i) => ({
				venda_id: vendaId,
				produto_id: i.produto_id,
				quantidade: i.quantidade,
				valor_unitario: i.valor_unitario,
				subtotal: i.subtotal
			}));
			const { error: itensError } = await supabase.from("vendas_itens").insert(itensToInsert);
			if (itensError) throw itensError;
			if (tipo === "VENDA") {
				for (const item of itens) {
					const novoEstoque = produtos.find((p) => p.id === item.produto_id).estoque - item.quantidade;
					await supabase.from("produtos").update({ estoque: novoEstoque }).eq("id", item.produto_id);
				}
				const vencimento = /* @__PURE__ */ new Date();
				vencimento.setDate(vencimento.getDate() + 30);
				await supabase.from("contas_receber").insert([{
					venda_id: vendaId,
					cliente_id: clienteId,
					descricao: `Venda #${vendaId.substring(0, 8).toUpperCase()}`,
					valor: valorTotal,
					vencimento: vencimento.toISOString().split("T")[0],
					status: status === "Pago" ? "Recebido" : "Pendente",
					data_pagamento: status === "Pago" ? (/* @__PURE__ */ new Date()).toISOString().split("T")[0] : null
				}]);
			}
			alert(tipo === "DAV" ? "Orçamento criado com sucesso!" : "Venda finalizada com sucesso!");
			navigate({ to: "/app/vendas" });
		} catch (err) {
			console.error(err);
			alert("Erro ao salvar: " + err.message);
		} finally {
			setLoading(false);
		}
	};
	(0, import_react.useEffect)(() => {
		if (tipo === "DAV") setStatus("Orçamento");
		if (tipo === "VENDA") setStatus("Pago");
	}, [tipo]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: tipo === "DAV" ? "Novo Orçamento (DAV)" : "Nova Venda",
		subtitle: "Preencha os dados e adicione os itens",
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			variant: "outline",
			asChild: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/app/vendas",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "mr-2 h-4 w-4" }), " Voltar"]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			className: "bg-gradient-brand text-primary-foreground",
			onClick: handleSalvar,
			disabled: loading || itens.length === 0,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "mr-2 h-4 w-4" }),
				" ",
				loading ? "Processando..." : tipo === "DAV" ? "Salvar Orçamento" : "Finalizar Venda"
			]
		})] })
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-6 md:grid-cols-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "md:col-span-2 space-y-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "shadow-card p-6 space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
						className: "font-semibold text-lg flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingCart, { className: "h-5 w-5 text-brand" }), " Dados da Operação"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Tipo de Operação" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								className: "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
								value: tipo,
								onChange: (e) => setTipo(e.target.value),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "DAV",
									children: "Orçamento (DAV)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "VENDA",
									children: "Venda Direta (Baixa Estoque)"
								})]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Status" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								className: "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
								value: status,
								onChange: (e) => setStatus(e.target.value),
								children: tipo === "DAV" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "Orçamento",
										children: "Orçamento Aberto"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "Aprovado",
										children: "Aprovado pelo Cliente"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "Rejeitado",
										children: "Rejeitado"
									})
								] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "Pago",
										children: "Pago / Finalizado"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "Aguardando Pagamento",
										children: "Aguardando Pagamento"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "Em Separação",
										children: "Em Separação"
									})
								] })
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Cliente" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							className: "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
							value: clienteId,
							onChange: (e) => setClienteId(e.target.value),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								children: "Selecione um cliente..."
							}), clientes.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
								value: c.id,
								children: [
									c.nome,
									" (",
									c.cidade || "S/ Cidade",
									")"
								]
							}, c.id))]
						})]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "shadow-card p-6 space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-semibold text-lg",
						children: "Itens do Pedido"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-4 items-end",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2 flex-1 flex flex-col justify-end",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Produto" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Popover, {
									open: openProduto,
									onOpenChange: setOpenProduto,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverTrigger, {
										asChild: true,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											variant: "outline",
											role: "combobox",
											"aria-expanded": openProduto,
											className: "w-full justify-between h-10 font-normal px-3",
											children: [produtoSelecionado ? (() => {
												const p = produtos.find((p) => p.id === produtoSelecionado);
												return p ? `${p.nome} - R$ ${Number(p.valor).toFixed(2)} (Estoque: ${p.estoque})` : "Selecionar produto...";
											})() : "Selecionar ou buscar produto...", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronsUpDown, { className: "ml-2 h-4 w-4 shrink-0 opacity-50" })]
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverContent, {
										className: "w-[450px] p-0",
										align: "start",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Command$1, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandInput, { placeholder: "Buscar produto por nome..." }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CommandList, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandEmpty, { children: "Nenhum produto encontrado." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandGroup, { children: produtos.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CommandItem, {
											value: p.nome + " " + p.id,
											onSelect: () => {
												setProdutoSelecionado(p.id === produtoSelecionado ? "" : p.id);
												setOpenProduto(false);
											},
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: cn("mr-2 h-4 w-4", produtoSelecionado === p.id ? "opacity-100" : "opacity-0") }),
												p.nome,
												" - R$ ",
												Number(p.valor).toFixed(2),
												" (Estoque: ",
												p.estoque,
												")"
											]
										}, p.id)) })] })] })
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2 w-24",
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
								children: "Unitário"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								className: "text-right",
								children: "Subtotal"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {})
						] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: itens.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							colSpan: 5,
							className: "text-center py-4 text-muted-foreground",
							children: "Nenhum item adicionado ao carrinho."
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
					children: "Resumo"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-muted-foreground",
								children: [
									"Subtotal (",
									itens.length,
									" itens)"
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-semibold",
								children: ["R$ ", valorTotal.toFixed(2)]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground",
								children: "Descontos"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-semibold",
								children: "R$ 0,00"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-px w-full bg-border my-2" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between items-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-semibold text-lg",
								children: "Total"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-display text-2xl font-bold text-brand",
								children: ["R$ ", valorTotal.toFixed(2)]
							})]
						})
					]
				})]
			})
		})]
	})] });
}
//#endregion
export { NovaVenda as component };

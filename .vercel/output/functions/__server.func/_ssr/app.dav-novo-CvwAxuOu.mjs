import { i as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./supabase-B8pFCf1w.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { F as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as Button } from "./button-BkEeRci-.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { _ as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { f as ShoppingCart, u as Trash2, v as Save, x as Plus } from "../_libs/lucide-react.mjs";
import { n as PageHeader } from "./app-shell-BDkgzrqS.mjs";
import { t as Card } from "./card-CtX3ithx.mjs";
import { t as Label } from "./label-DBD1bRRP.mjs";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-C0WYWEQX.mjs";
import { t as Route } from "./app.dav-novo-BMSVmknU.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app.dav-novo-CvwAxuOu.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function NovoDAV() {
	const navigate = useNavigate();
	const { pedido } = Route.useSearch();
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [pedidoDosCatalogo, setPedidoDosCatalogo] = (0, import_react.useState)(false);
	const [cliente, setCliente] = (0, import_react.useState)({
		nome: "",
		cnpj: "",
		endereco: "",
		telefone: ""
	});
	const [condicoes, setCondicoes] = (0, import_react.useState)({
		vendedor: "",
		pagamento: "30/60/90 dias — Boleto",
		frete: "CIF",
		prazo: "3 dias úteis"
	});
	const [observacoes, setObservacoes] = (0, import_react.useState)("");
	const [itens, setItens] = (0, import_react.useState)([{
		id: Date.now(),
		codigo: "",
		produto: "",
		qtd: 1,
		vlrUnit: 0
	}]);
	const [descontoPerc, setDescontoPerc] = (0, import_react.useState)(0);
	const [freteValor, setFreteValor] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		if (!pedido) return;
		const carregar = async () => {
			try {
				const decoded = decodeURIComponent(escape(atob(pedido)));
				const pares = JSON.parse(decoded);
				if (!Array.isArray(pares) || pares.length === 0) return;
				const ids = pares.map((p) => p[0]);
				const { data: produtos, error } = await supabase.from("produtos").select("id, codigo, nome, valor").in("id", ids);
				if (error || !produtos) return;
				const mapa = Object.fromEntries(produtos.map((p) => [p.id, p]));
				const itensPreenchidos = pares.map(([id, qtd], idx) => {
					const p = mapa[id];
					return {
						id: Date.now() + idx,
						codigo: p?.codigo || "",
						produto: p?.nome || "",
						qtd: Number(qtd) || 1,
						vlrUnit: Number(p?.valor) || 0
					};
				}).filter((i) => i.produto);
				if (itensPreenchidos.length > 0) {
					setItens(itensPreenchidos);
					setPedidoDosCatalogo(true);
				}
			} catch (e) {
				console.error("Erro ao decodificar pedido do catálogo:", e);
			}
		};
		carregar();
	}, [pedido]);
	const addItem = () => setItens([...itens, {
		id: Date.now(),
		codigo: "",
		produto: "",
		qtd: 1,
		vlrUnit: 0
	}]);
	const removeItem = (id) => setItens(itens.filter((i) => i.id !== id));
	const updateItem = (id, field, value) => {
		setItens(itens.map((i) => i.id === id ? {
			...i,
			[field]: value
		} : i));
	};
	const subtotal = itens.reduce((acc, item) => acc + item.qtd * item.vlrUnit, 0);
	const descontoValor = subtotal * (descontoPerc / 100);
	const total = subtotal - descontoValor + freteValor;
	const handleSalvar = async () => {
		if (!cliente.nome) {
			alert("Preencha o nome do cliente.");
			return;
		}
		if (itens.length === 0 || !itens[0].produto) {
			alert("Adicione pelo menos um produto.");
			return;
		}
		setLoading(true);
		try {
			const { data: dav, error: davError } = await supabase.from("davs").insert({
				cliente_nome: cliente.nome,
				cliente_cnpj: cliente.cnpj,
				cliente_endereco: cliente.endereco,
				cliente_telefone: cliente.telefone,
				vendedor: condicoes.vendedor,
				condicao_pagamento: condicoes.pagamento,
				frete_tipo: condicoes.frete,
				prazo_entrega: condicoes.prazo,
				subtotal,
				desconto_percentual: descontoPerc,
				desconto_valor: descontoValor,
				frete_valor: freteValor,
				total,
				observacoes,
				validade: new Date(Date.now() + 10080 * 60 * 1e3).toISOString(),
				created_at: (/* @__PURE__ */ new Date()).toISOString()
			}).select("id").single();
			if (davError) throw davError;
			const itensToInsert = itens.map((i) => ({
				dav_id: dav.id,
				codigo: i.codigo,
				produto: i.produto,
				qtd: i.qtd,
				valor_unitario: i.vlrUnit,
				total: i.qtd * i.vlrUnit
			}));
			const { error: itemsError } = await supabase.from("dav_items").insert(itensToInsert);
			if (itemsError) throw itemsError;
			navigate({
				to: "/app/dav",
				search: { id: dav.id }
			});
		} catch (err) {
			console.error(err);
			alert("Erro ao salvar o DAV: " + err.message);
		} finally {
			setLoading(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Novo Orçamento (DAV)",
			subtitle: "Preencha os dados para gerar um Documento Auxiliar de Venda",
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				className: "bg-gradient-brand text-primary-foreground",
				onClick: handleSalvar,
				disabled: loading,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "mr-2 h-4 w-4" }),
					" ",
					loading ? "Salvando..." : "Salvar DAV"
				]
			})
		}),
		pedidoDosCatalogo && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-6 flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-5 py-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "h-10 w-10 rounded-full bg-emerald-100 grid place-items-center shrink-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingCart, { className: "h-5 w-5 text-emerald-600" })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-semibold text-emerald-800",
				children: "Pedido recebido do catálogo público!"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-emerald-600 mt-0.5",
				children: "Os itens abaixo foram preenchidos automaticamente. Complete os dados do cliente e salve."
			})] })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "shadow-card p-6 max-w-5xl mx-auto space-y-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid md:grid-cols-2 gap-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-semibold border-b pb-2",
								children: "Dados do Cliente"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Nome / Razão Social" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: cliente.nome,
									onChange: (e) => setCliente({
										...cliente,
										nome: e.target.value
									}),
									placeholder: "Ex: Jardim Verde Ltda"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "CNPJ / CPF" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: cliente.cnpj,
									onChange: (e) => setCliente({
										...cliente,
										cnpj: e.target.value
									}),
									placeholder: "00.000.000/0000-00"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Endereço Completo" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: cliente.endereco,
									onChange: (e) => setCliente({
										...cliente,
										endereco: e.target.value
									}),
									placeholder: "Rua, Número, Bairro, Cidade - UF"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Telefone" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: cliente.telefone,
									onChange: (e) => setCliente({
										...cliente,
										telefone: e.target.value
									}),
									placeholder: "(00) 00000-0000"
								})]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-semibold border-b pb-2",
								children: "Condições Comerciais"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Vendedor" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: condicoes.vendedor,
									onChange: (e) => setCondicoes({
										...condicoes,
										vendedor: e.target.value
									}),
									placeholder: "Nome do vendedor"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Condição de Pagamento" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: condicoes.pagamento,
									onChange: (e) => setCondicoes({
										...condicoes,
										pagamento: e.target.value
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Tipo de Frete" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: condicoes.frete,
									onChange: (e) => setCondicoes({
										...condicoes,
										frete: e.target.value
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Prazo de Entrega" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: condicoes.prazo,
									onChange: (e) => setCondicoes({
										...condicoes,
										prazo: e.target.value
									})
								})]
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between border-b pb-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-semibold",
							children: "Produtos"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "outline",
							size: "sm",
							onClick: addItem,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-2 h-4 w-4" }), " Adicionar Produto"]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "overflow-x-auto",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								className: "w-24",
								children: "Código"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Produto" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								className: "w-24 text-right",
								children: "Qtd"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								className: "w-32 text-right",
								children: "Vlr Unit. (R$)"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								className: "w-32 text-right",
								children: "Total"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { className: "w-12" })
						] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: itens.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								className: "h-8",
								value: i.codigo,
								onChange: (e) => updateItem(i.id, "codigo", e.target.value)
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								className: "h-8",
								value: i.produto,
								onChange: (e) => updateItem(i.id, "produto", e.target.value)
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								className: "h-8 text-right",
								type: "number",
								min: "1",
								value: i.qtd,
								onChange: (e) => updateItem(i.id, "qtd", Number(e.target.value))
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								className: "h-8 text-right",
								type: "number",
								step: "0.01",
								min: "0",
								value: i.vlrUnit,
								onChange: (e) => updateItem(i.id, "vlrUnit", Number(e.target.value))
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								className: "text-right font-medium pt-3",
								children: (i.qtd * i.vlrUnit).toFixed(2)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "icon",
								className: "h-8 w-8 text-destructive",
								onClick: () => removeItem(i.id),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
							}) })
						] }, i.id)) })] })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col md:flex-row justify-between gap-6 pt-4 border-t",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex-1 space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Observações do Pedido" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: observacoes,
							onChange: (e) => setObservacoes(e.target.value),
							placeholder: "Anotações para o cliente ou para a entrega..."
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "w-full md:w-64 space-y-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between items-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm text-muted-foreground",
									children: "Subtotal"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-medium",
									children: ["R$ ", subtotal.toFixed(2)]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between items-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm text-muted-foreground",
									children: "Desc. (%)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									className: "w-20 h-8 text-right",
									type: "number",
									min: "0",
									max: "100",
									value: descontoPerc,
									onChange: (e) => setDescontoPerc(Number(e.target.value))
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between items-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm text-muted-foreground",
									children: "Frete (R$)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									className: "w-24 h-8 text-right",
									type: "number",
									min: "0",
									step: "0.01",
									value: freteValor,
									onChange: (e) => setFreteValor(Number(e.target.value))
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between items-center border-t pt-3 text-lg font-bold",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Total" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-primary",
									children: ["R$ ", total.toFixed(2)]
								})]
							})
						]
					})]
				})
			]
		})
	] });
}
//#endregion
export { NovoDAV as component };

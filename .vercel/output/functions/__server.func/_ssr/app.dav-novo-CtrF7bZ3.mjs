import { i as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./supabase-Bvu1xBCC.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { F as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as Button } from "./button-BkEeRci-.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { _ as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { u as Trash2, v as Save, x as Plus } from "../_libs/lucide-react.mjs";
import { n as PageHeader } from "./app-shell-CIo6-35-.mjs";
import { t as Card } from "./card-CtX3ithx.mjs";
import { t as Label } from "./label-DBD1bRRP.mjs";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-C0WYWEQX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app.dav-novo-CtrF7bZ3.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function NovoDAV() {
	const navigate = useNavigate();
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [cliente, setCliente] = (0, import_react.useState)({
		nome: "",
		cnpj: "",
		endereco: "",
		telefone: ""
	});
	const [emissor, setEmissor] = (0, import_react.useState)({
		nome: "VIVAVERDE",
		cnpj: "",
		endereco: "",
		telefone: ""
	});
	const [condicoes, setCondicoes] = (0, import_react.useState)({
		vendedor: "",
		pagamento: "Dinheiro / Pix",
		frete: "Retirada",
		prazo: "Imediato"
	});
	const [observacoes, setObservacoes] = (0, import_react.useState)("");
	const [itens, setItens] = (0, import_react.useState)([]);
	const [descontoPerc, setDescontoPerc] = (0, import_react.useState)(0);
	const [freteValor, setFreteValor] = (0, import_react.useState)(0);
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
	(0, import_react.useEffect)(() => {
		const loadCartFromURL = async () => {
			const cartMagic = new URLSearchParams(window.location.search).get("c");
			if (!cartMagic) {
				if (itens.length === 0) setItens([{
					id: Date.now(),
					codigo: "",
					produto: "",
					qtd: 1,
					vlrUnit: 0
				}]);
				return;
			}
			const { data: produtos } = await supabase.from("produtos").select("*").eq("status", "Ativo");
			if (produtos) {
				const parsedItens = [];
				cartMagic.split(",").forEach((item, index) => {
					const [id, qStr] = item.split(":");
					const qty = parseInt(qStr) || 1;
					const prod = produtos.find((p) => p.id === id);
					if (prod) parsedItens.push({
						id: Date.now() + index,
						codigo: prod.codigo || "",
						produto: prod.nome,
						qtd: qty,
						vlrUnit: Number(prod.valor)
					});
				});
				if (parsedItens.length > 0) {
					setItens(parsedItens);
					window.history.replaceState({}, "", "/app/dav-novo");
				} else if (itens.length === 0) setItens([{
					id: Date.now(),
					codigo: "",
					produto: "",
					qtd: 1,
					vlrUnit: 0
				}]);
			}
		};
		loadCartFromURL();
	}, []);
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
				emissor_nome: emissor.nome,
				emissor_cnpj: emissor.cnpj,
				emissor_endereco: emissor.endereco,
				emissor_telefone: emissor.telefone,
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
				validade: new Date(Date.now() + 10080 * 60 * 1e3).toISOString()
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
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
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "shadow-card p-6 max-w-5xl mx-auto space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid md:grid-cols-2 lg:grid-cols-3 gap-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-semibold border-b pb-2",
								children: "Dados do Cliente (Comprador)"
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
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-semibold border-b pb-2",
								children: "Dados do Emissor (Fornecedor)"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Nome / Razão Social" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: emissor.nome,
									onChange: (e) => setEmissor({
										...emissor,
										nome: e.target.value
									}),
									placeholder: "Ex: VivaVerde Vasos"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "CNPJ / CPF" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: emissor.cnpj,
									onChange: (e) => setEmissor({
										...emissor,
										cnpj: e.target.value
									}),
									placeholder: "00.000.000/0000-00"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Endereço Completo" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: emissor.endereco,
									onChange: (e) => setEmissor({
										...emissor,
										endereco: e.target.value
									}),
									placeholder: "Endereço da Empresa"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Telefone" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: emissor.telefone,
									onChange: (e) => setEmissor({
										...emissor,
										telefone: e.target.value
									}),
									placeholder: "(00) 00000-0000"
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
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
									}),
									placeholder: "Ex: Pix, Dinheiro, Cartão"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Tipo de Frete" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: condicoes.frete,
									onChange: (e) => setCondicoes({
										...condicoes,
										frete: e.target.value
									}),
									placeholder: "Ex: Retirada, Entrega"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Prazo de Entrega" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: condicoes.prazo,
									onChange: (e) => setCondicoes({
										...condicoes,
										prazo: e.target.value
									}),
									placeholder: "Ex: Imediato"
								})]
							})
						]
					})
				]
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
	})] });
}
//#endregion
export { NovoDAV as component };

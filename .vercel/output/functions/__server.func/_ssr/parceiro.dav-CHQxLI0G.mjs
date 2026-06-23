import { i as __toESM } from "../_runtime.mjs";
import { n as supabaseParceiro } from "./supabase-B8pFCf1w.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { F as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as Button } from "./button-BkEeRci-.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { bt as ArrowLeft, f as ShoppingCart, u as Trash2, v as Save, x as Plus } from "../_libs/lucide-react.mjs";
import { n as PageHeader } from "./app-shell-BDkgzrqS.mjs";
import { t as Card } from "./card-CtX3ithx.mjs";
import { t as Label } from "./label-DBD1bRRP.mjs";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-C0WYWEQX.mjs";
import { t as Route } from "./parceiro.dav-CxSARIw2.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/parceiro.dav-CHQxLI0G.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ParceiroDAV() {
	const navigate = useNavigate();
	const { pedido } = Route.useSearch();
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [pedidoDosCatalogo, setPedidoDosCatalogo] = (0, import_react.useState)(false);
	const [vendedorId, setVendedorId] = (0, import_react.useState)(null);
	const [vendedorNome, setVendedorNome] = (0, import_react.useState)("");
	const [cliente, setCliente] = (0, import_react.useState)({
		nome: "",
		cnpj: "",
		endereco: "",
		telefone: ""
	});
	const [condicoes, setCondicoes] = (0, import_react.useState)({
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
		vlrUnit: 0,
		db_id: ""
	}]);
	const [descontoPerc, setDescontoPerc] = (0, import_react.useState)(0);
	const [freteValor, setFreteValor] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		const init = async () => {
			const { data: { session } } = await supabaseParceiro.auth.getSession();
			if (!session) {
				navigate({ to: "/parceiro/login" });
				return;
			}
			const { data: vData, error: vError } = await supabaseParceiro.from("vendedores").select("id, status, nome").eq("user_id", session.user.id).limit(1).maybeSingle();
			if (vData) {
				setVendedorId(vData.id);
				setVendedorNome(vData.nome);
				if (vData.status === "Aguardando Aprovação") {
					navigate({ to: "/parceiro/dashboard" });
					return;
				}
			} else {
				navigate({ to: "/parceiro/dashboard" });
				return;
			}
			if (pedido) try {
				const decoded = decodeURIComponent(escape(atob(pedido)));
				const pares = JSON.parse(decoded);
				if (!Array.isArray(pares) || pares.length === 0) return;
				const ids = pares.map((p) => p[0]);
				const { data: produtos } = await supabaseParceiro.from("produtos").select("id, codigo, nome, valor").in("id", ids);
				if (!produtos) return;
				const mapa = Object.fromEntries(produtos.map((p) => [p.id, p]));
				const itensPreenchidos = pares.map(([id, qtd], idx) => {
					const p = mapa[id];
					return {
						id: Date.now() + idx,
						db_id: p?.id || "",
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
				console.error("Erro ao decodificar pedido:", e);
			}
		};
		init();
	}, [pedido]);
	const addItem = () => setItens([...itens, {
		id: Date.now(),
		codigo: "",
		produto: "",
		qtd: 1,
		vlrUnit: 0,
		db_id: ""
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
		if (!cliente.nome || !cliente.cnpj || !cliente.endereco || !cliente.telefone) {
			alert("Por favor, preencha todos os dados obrigatórios do cliente (Nome, CPF/CNPJ, Endereço e Telefone).");
			return;
		}
		if (itens.length === 0 || !itens[0].produto) {
			alert("Adicione pelo menos um produto.");
			return;
		}
		if (!vendedorId) return;
		setLoading(true);
		try {
			let finalClienteId = null;
			const { data: existingCliente } = await supabaseParceiro.from("clientes").select("id").or(`cpf_cnpj.eq."${cliente.cnpj}",nome.ilike."${cliente.nome}"`).limit(1).maybeSingle();
			if (existingCliente) finalClienteId = existingCliente.id;
			else {
				const { data: clienteData, error: clienteError } = await supabaseParceiro.from("clientes").insert([{
					nome: cliente.nome,
					cpf_cnpj: cliente.cnpj,
					telefone: cliente.telefone,
					endereco: cliente.endereco
				}]).select().single();
				if (!clienteError && clienteData) finalClienteId = clienteData.id;
			}
			const { data: vendaData, error: vendaError } = await supabaseParceiro.from("vendas").insert([{
				tipo: "PDV",
				status_aprovacao: "Pendente",
				status: "Pendente",
				valor_total: total,
				vendedor_id: vendedorId,
				cliente_id: finalClienteId
			}]).select().single();
			if (vendaError) throw vendaError;
			const validVendaItems = itens.filter((i) => i.db_id).map((i) => ({
				venda_id: vendaData.id,
				produto_id: i.db_id,
				quantidade: i.qtd,
				valor_unitario: i.vlrUnit,
				subtotal: i.qtd * i.vlrUnit
			}));
			if (validVendaItems.length > 0) await supabaseParceiro.from("vendas_itens").insert(validVendaItems);
			const { data: dav, error: davError } = await supabaseParceiro.from("davs").insert({
				cliente_nome: cliente.nome,
				cliente_cnpj: cliente.cnpj,
				cliente_endereco: cliente.endereco,
				cliente_telefone: cliente.telefone,
				vendedor: vendedorNome,
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
			const itensToInsertDav = itens.map((i) => ({
				dav_id: dav.id,
				codigo: i.codigo,
				produto: i.produto,
				qtd: i.qtd,
				valor_unitario: i.vlrUnit,
				total: i.qtd * i.vlrUnit
			}));
			await supabaseParceiro.from("dav_items").insert(itensToInsertDav);
			await supabaseParceiro.from("notificacoes").insert([{
				tipo: "venda",
				titulo: `Novo Orçamento (DAV) - ${vendedorNome}`,
				mensagem: `O parceiro enviou o pedido de ${cliente.nome} no valor de ${new Intl.NumberFormat("pt-BR", {
					style: "currency",
					currency: "BRL"
				}).format(total)} para aprovação.`
			}]);
			alert("Pedido enviado para aprovação com sucesso!");
			navigate({ to: "/parceiro/dashboard" });
		} catch (err) {
			console.error(err);
			alert("Erro ao enviar pedido: " + err.message);
		} finally {
			setLoading(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Finalizar Pedido (DAV)",
			subtitle: "Preencha os dados do cliente e condições para enviar o pedido",
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "outline",
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/parceiro/dashboard",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "mr-2 h-4 w-4" }), " Voltar"]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				className: "bg-emerald-600 hover:bg-emerald-700 text-white",
				onClick: handleSalvar,
				disabled: loading,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "mr-2 h-4 w-4" }),
					" ",
					loading ? "Enviando..." : "Enviar Pedido"
				]
			})] })
		}),
		pedidoDosCatalogo && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-6 flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-5 py-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "h-10 w-10 rounded-full bg-emerald-100 grid place-items-center shrink-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingCart, { className: "h-5 w-5 text-emerald-600" })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-semibold text-emerald-800",
				children: "Pedido do Catálogo Carregado!"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-emerald-600 mt-0.5",
				children: "Os itens que o cliente escolheu já estão na lista. Complete os dados obrigatórios abaixo para enviar ao faturamento."
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
								className: "font-semibold border-b pb-2 text-emerald-800",
								children: "Dados do Cliente (Obrigatório)"
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
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Telefone / WhatsApp" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
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
								className: "font-semibold border-b pb-2 text-emerald-800",
								children: "Condições Comerciais (Obrigatório)"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Vendedor" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: vendedorNome,
									disabled: true,
									className: "bg-slate-50"
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
							className: "font-semibold text-emerald-800",
							children: "Produtos do Pedido"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "outline",
							size: "sm",
							onClick: addItem,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-2 h-4 w-4" }), " Adicionar Linha Manual"]
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
							placeholder: "Anotações para a fábrica, endereço alternativo de entrega..."
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
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Total Final" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-emerald-700",
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
export { ParceiroDAV as component };

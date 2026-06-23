import { i as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./supabase-B8pFCf1w.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { F as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as Button } from "./button-BkEeRci-.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { _ as Search, u as Trash2, y as Receipt } from "../_libs/lucide-react.mjs";
import { n as PageHeader } from "./app-shell-BDkgzrqS.mjs";
import { a as CardTitle, i as CardHeader, n as CardContent, t as Card } from "./card-CtX3ithx.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app.pdv-fONZGXg0.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PDV() {
	const [produtos, setProdutos] = (0, import_react.useState)([]);
	const [cart, setCart] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [metodoPagamento, setMetodoPagamento] = (0, import_react.useState)("Cartão");
	(0, import_react.useEffect)(() => {
		const fetchProdutos = async () => {
			const { data } = await supabase.from("produtos").select("*").eq("status", "Ativo");
			if (data) setProdutos(data);
		};
		fetchProdutos();
	}, []);
	const addToCart = (produto) => {
		if (produto.estoque <= 0) {
			alert("Produto sem estoque!");
			return;
		}
		setCart((prev) => {
			const existing = prev.find((i) => i.id === produto.id);
			if (existing) {
				if (existing.q >= produto.estoque) {
					alert("Estoque insuficiente!");
					return prev;
				}
				return prev.map((i) => i.id === produto.id ? {
					...i,
					q: i.q + 1,
					t: (i.q + 1) * i.u
				} : i);
			}
			return [...prev, {
				id: produto.id,
				p: produto.nome,
				q: 1,
				u: Number(produto.valor),
				t: Number(produto.valor),
				emoji: produto.emoji,
				max: produto.estoque
			}];
		});
	};
	const updateQuantity = (id, delta) => {
		setCart((prev) => prev.map((i) => {
			if (i.id === id) {
				const newQ = i.q + delta;
				if (newQ <= 0) return i;
				if (newQ > i.max) {
					alert("Estoque insuficiente!");
					return i;
				}
				return {
					...i,
					q: newQ,
					t: newQ * i.u
				};
			}
			return i;
		}));
	};
	const removeFromCart = (id) => {
		setCart((prev) => prev.filter((i) => i.id !== id));
	};
	const subtotal = cart.reduce((s, i) => s + i.t, 0);
	const handleFinalizar = async () => {
		if (cart.length === 0) return;
		setLoading(true);
		try {
			const { data: vendaData, error: vendaError } = await supabase.from("vendas").insert([{
				tipo: "PDV",
				status: "Pago",
				valor_total: subtotal
			}]).select().single();
			if (vendaError) throw vendaError;
			const vendaId = vendaData.id;
			const itensToInsert = cart.map((i) => ({
				venda_id: vendaId,
				produto_id: i.id,
				quantidade: i.q,
				valor_unitario: i.u,
				subtotal: i.t
			}));
			const { error: itensError } = await supabase.from("vendas_itens").insert(itensToInsert);
			if (itensError) throw itensError;
			const dataAtual = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
			await supabase.from("contas_receber").insert([{
				venda_id: vendaId,
				descricao: `Venda PDV #${vendaId.substring(0, 8).toUpperCase()}`,
				valor: subtotal,
				vencimento: dataAtual,
				status: "Recebido",
				data_pagamento: dataAtual
			}]);
			for (const item of cart) {
				const prod = produtos.find((p) => p.id === item.id);
				if (prod) {
					const novoEstoque = prod.estoque - item.q;
					await supabase.from("produtos").update({ estoque: novoEstoque }).eq("id", item.id);
					prod.estoque = novoEstoque;
				}
			}
			alert("Venda realizada com sucesso!");
			setCart([]);
		} catch (err) {
			console.error(err);
			alert("Erro ao finalizar venda: " + err.message);
		} finally {
			setLoading(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "PDV — Frente de Caixa",
		subtitle: "Operador: Douglas de Almeida · Caixa 01"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-6 lg:grid-cols-[1fr_400px]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "shadow-card",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							placeholder: "Bipar código ou buscar produto…",
							className: "h-14 pl-11 text-base"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 flex flex-wrap gap-2 max-h-40 overflow-y-auto",
						children: produtos.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							onClick: () => addToCart(p),
							variant: "outline",
							size: "sm",
							className: "rounded-full",
							children: [
								p.emoji,
								" ",
								p.nome
							]
						}, p.id))
					})]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "shadow-card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, { children: ["Itens · ", cart.length] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
					className: "p-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "divide-y max-h-[50vh] overflow-y-auto",
						children: cart.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "p-8 text-center text-muted-foreground",
							children: "Nenhum produto no caixa."
						}) : cart.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-[auto_1fr_auto_auto_auto] items-center gap-3 px-6 py-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid h-12 w-12 place-items-center rounded-lg bg-accent text-2xl",
									children: i.emoji
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-semibold truncate",
										children: i.p
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs text-muted-foreground",
										children: [
											"R$ ",
											i.u.toFixed(2),
											" un"
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											onClick: () => updateQuantity(i.id, -1),
											size: "icon",
											variant: "outline",
											className: "h-8 w-8",
											children: "−"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "w-8 text-center font-semibold",
											children: i.q
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											onClick: () => updateQuantity(i.id, 1),
											size: "icon",
											variant: "outline",
											className: "h-8 w-8",
											children: "+"
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "font-bold text-primary",
									children: ["R$ ", i.t.toFixed(2)]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									onClick: () => removeFromCart(i.id),
									size: "icon",
									variant: "ghost",
									className: "h-8 w-8 text-destructive",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
								})
							]
						}, i.id))
					})
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "shadow-elevated bg-card sticky top-24 h-fit",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Resumo da venda" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground",
								children: "Subtotal"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["R$ ", subtotal.toFixed(2)] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground",
								children: "Desconto"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "R$ 0,00" })]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl bg-gradient-brand p-5 text-primary-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs uppercase tracking-widest opacity-80",
							children: "Total a pagar"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "font-display text-4xl font-extrabold mt-1",
							children: ["R$ ", subtotal.toFixed(2)]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-semibold uppercase text-muted-foreground tracking-wider mb-2",
						children: "Pagamento"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-3 gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								onClick: () => setMetodoPagamento("Dinheiro"),
								variant: "outline",
								className: `h-16 flex-col gap-1 ${metodoPagamento === "Dinheiro" ? "ring-2 ring-primary" : ""}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: "https://img.icons8.com/arcade/64/money.png",
									alt: "Dinheiro",
									className: "h-5 w-5 object-contain"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs",
									children: "Dinheiro"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								onClick: () => setMetodoPagamento("Cartão"),
								variant: "outline",
								className: `h-16 flex-col gap-1 ${metodoPagamento === "Cartão" ? "ring-2 ring-primary" : ""}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: "https://img.icons8.com/fluency/48/bank-card-front-side.png",
									alt: "Cartão",
									className: "h-5 w-5 object-contain"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs",
									children: "Cartão"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								onClick: () => setMetodoPagamento("Pix"),
								variant: "outline",
								className: `h-16 flex-col gap-1 ${metodoPagamento === "Pix" ? "ring-2 ring-primary" : ""}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: "https://img.icons8.com/fluency/48/pix.png",
									alt: "Pix",
									className: "h-5 w-5 object-contain"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs",
									children: "Pix"
								})]
							})
						]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						onClick: handleFinalizar,
						disabled: cart.length === 0 || loading,
						size: "lg",
						className: "w-full bg-gradient-brand text-primary-foreground h-14 text-base font-bold",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Receipt, { className: "mr-2 h-5 w-5" }),
							" ",
							loading ? "Processando..." : "Finalizar Venda"
						]
					})
				]
			})]
		})]
	})] });
}
//#endregion
export { PDV as component };

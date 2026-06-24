import { i as __toESM } from "../_runtime.mjs";
import { n as supabaseParceiro } from "./supabase-Bvu1xBCC.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { F as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as Button } from "./button-BkEeRci-.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { _ as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as Search, nt as CircleCheck, p as ShoppingCart, u as Trash2 } from "../_libs/lucide-react.mjs";
import { n as CardContent, t as Card } from "./card-CtX3ithx.mjs";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-DIo89e4g.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/parceiro.pdv-Z9gRTr3S.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ParceiroPDV() {
	const navigate = useNavigate();
	const [produtos, setProdutos] = (0, import_react.useState)([]);
	const [cart, setCart] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [isSuccessModalOpen, setIsSuccessModalOpen] = (0, import_react.useState)(false);
	const [isClientModalOpen, setIsClientModalOpen] = (0, import_react.useState)(false);
	const [clientForm, setClientForm] = (0, import_react.useState)({
		nome: "",
		documento: "",
		telefone: ""
	});
	const [vendedorId, setVendedorId] = (0, import_react.useState)(null);
	const [searchTerm, setSearchTerm] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		const init = async () => {
			const { data: { session } } = await supabaseParceiro.auth.getSession();
			if (session) {
				const { data: vData } = await supabaseParceiro.from("vendedores").select("id, status").eq("user_id", session.user.id).single();
				if (vData) {
					setVendedorId(vData.id);
					if (vData.status === "Aguardando Aprovação") {
						navigate({ to: "/parceiro/dashboard" });
						return;
					}
				}
			}
			const { data } = await supabaseParceiro.from("produtos").select("*").eq("status", "Ativo");
			if (data) {
				setProdutos(data);
				const params = new URLSearchParams(window.location.search);
				const produtoIdMagic = params.get("produto");
				if (produtoIdMagic) {
					const magicProduct = data.find((p) => p.id === produtoIdMagic);
					if (magicProduct) {
						setCart([{
							id: magicProduct.id,
							p: magicProduct.nome,
							q: 1,
							u: Number(magicProduct.valor),
							t: Number(magicProduct.valor),
							emoji: magicProduct.emoji
						}]);
						window.history.replaceState({}, "", "/parceiro/pdv");
					}
				}
				const cartMagic = params.get("c");
				if (cartMagic) {
					const parsedCart = [];
					cartMagic.split(",").forEach((item) => {
						const [id, qStr] = item.split(":");
						const qty = parseInt(qStr) || 1;
						const prod = data.find((p) => p.id === id);
						if (prod) parsedCart.push({
							id: prod.id,
							p: prod.nome,
							q: qty,
							u: Number(prod.valor),
							t: qty * Number(prod.valor),
							emoji: prod.emoji
						});
					});
					if (parsedCart.length > 0) {
						setCart(parsedCart);
						window.history.replaceState({}, "", "/parceiro/pdv");
					}
				}
			}
		};
		init();
	}, []);
	const addToCart = (produto) => {
		setCart((prev) => {
			if (prev.find((i) => i.id === produto.id)) return prev.map((i) => i.id === produto.id ? {
				...i,
				q: i.q + 1,
				t: (i.q + 1) * i.u
			} : i);
			return [...prev, {
				id: produto.id,
				p: produto.nome,
				q: 1,
				u: Number(produto.valor),
				t: Number(produto.valor),
				emoji: produto.emoji
			}];
		});
	};
	const updateQuantity = (id, delta) => {
		setCart((prev) => prev.map((i) => {
			if (i.id === id) {
				const newQ = i.q + delta;
				if (newQ <= 0) return i;
				return {
					...i,
					q: newQ,
					t: newQ * i.u
				};
			}
			return i;
		}));
	};
	const setQuantity = (id, newQ) => {
		setCart((prev) => prev.map((i) => {
			if (i.id === id) {
				if (newQ <= 0) return i;
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
	const handleOpenClientModal = () => {
		if (cart.length === 0 || !vendedorId) return;
		setIsClientModalOpen(true);
	};
	const submitOrder = async (e) => {
		e.preventDefault();
		if (!clientForm.nome) {
			alert("Por favor, preencha o nome do cliente.");
			return;
		}
		setIsClientModalOpen(false);
		setLoading(true);
		try {
			let finalClienteId = null;
			if (clientForm.documento && clientForm.documento.trim() !== "") {
				const { data: existingClient } = await supabaseParceiro.from("clientes").select("id").eq("cpf_cnpj", clientForm.documento.trim()).maybeSingle();
				if (existingClient) finalClienteId = existingClient.id;
			}
			if (!finalClienteId) {
				const payload = { nome: clientForm.nome };
				if (clientForm.documento && clientForm.documento.trim() !== "") payload.cpf_cnpj = clientForm.documento.trim();
				if (clientForm.telefone && clientForm.telefone.trim() !== "") payload.telefone = clientForm.telefone.trim();
				const { data: clienteData, error: clienteError } = await supabaseParceiro.from("clientes").insert([payload]).select().maybeSingle();
				if (clienteData) finalClienteId = clienteData.id;
				else if (clienteError) console.error("Erro ao criar cliente pelo parceiro:", clienteError);
			}
			const { data: vendaData, error: vendaError } = await supabaseParceiro.from("vendas").insert([{
				tipo: "PDV",
				status_aprovacao: "Pendente",
				status: "Pendente",
				valor_total: subtotal,
				vendedor_id: vendedorId,
				cliente_id: finalClienteId
			}]).select().single();
			if (vendaError) throw vendaError;
			const itensToInsert = cart.map((i) => ({
				venda_id: vendaData.id,
				produto_id: i.id,
				quantidade: i.q,
				valor_unitario: i.u,
				subtotal: i.t
			}));
			const { error: itensError } = await supabaseParceiro.from("vendas_itens").insert(itensToInsert);
			if (itensError) throw itensError;
			await supabaseParceiro.from("notificacoes").insert([{
				tipo: "venda",
				titulo: `Novo pedido pendente`,
				mensagem: `Um parceiro enviou um novo pedido (Cliente: ${clientForm.nome}) no valor de ${new Intl.NumberFormat("pt-BR", {
					style: "currency",
					currency: "BRL"
				}).format(subtotal)} para aprovação.`
			}]);
			setIsSuccessModalOpen(true);
		} catch (err) {
			alert("Erro ao enviar venda: " + err.message);
		} finally {
			setLoading(false);
		}
	};
	const closeSuccessModal = () => {
		setIsSuccessModalOpen(false);
		navigate({ to: "/parceiro/dashboard" });
	};
	if (!vendedorId) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "text-center py-10",
		children: "Verificando perfil de vendedor..."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-2xl font-bold font-display text-slate-800",
					children: "Nova Venda"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: "Registre o pedido do seu cliente."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					placeholder: "Buscar produto…",
					value: searchTerm,
					onChange: (e) => setSearchTerm(e.target.value),
					className: "h-12 pl-10 rounded-xl bg-white shadow-sm border-0 ring-1 ring-slate-900/5"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex overflow-x-auto pb-2 gap-2 snap-x",
				children: produtos.filter((p) => p.nome.toLowerCase().includes(searchTerm.toLowerCase())).map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => addToCart(p),
					className: "flex-shrink-0 snap-center w-28 bg-white p-3 rounded-xl border border-slate-100 shadow-sm flex flex-col items-center gap-2 active:scale-95 transition-transform",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-3xl",
						children: p.emoji || "🪴"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-semibold text-slate-800 line-clamp-2 leading-tight",
							children: p.nome
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-[10px] font-bold text-brand mt-1",
							children: ["R$ ", Number(p.valor).toFixed(2)]
						})]
					})]
				}, p.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "shadow-sm border-0 ring-1 ring-slate-900/5 overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-slate-50 border-b p-3 flex justify-between items-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "font-semibold text-sm flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingCart, { className: "h-4 w-4" }), " Carrinho"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-xs font-bold text-muted-foreground",
						children: [cart.length, " itens"]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
					className: "p-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "max-h-[40vh] overflow-y-auto divide-y",
						children: cart.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "p-6 text-center text-sm text-muted-foreground",
							children: "Selecione produtos acima."
						}) : cart.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3 p-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-2xl",
									children: i.emoji
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex-1 min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm font-semibold text-slate-800 truncate",
										children: i.p
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs text-brand font-bold",
										children: ["R$ ", i.t.toFixed(2)]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-1.5 bg-slate-100 rounded-lg p-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => updateQuantity(i.id, -1),
											className: "h-6 w-6 grid place-items-center bg-white rounded shadow-sm text-lg leading-none font-medium",
											children: "−"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "number",
											min: "1",
											value: i.q || "",
											onChange: (e) => setQuantity(i.id, parseInt(e.target.value) || 1),
											className: "w-8 text-center text-xs font-bold bg-transparent border-0 outline-none p-0 focus:ring-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => updateQuantity(i.id, 1),
											className: "h-6 w-6 grid place-items-center bg-white rounded shadow-sm text-lg leading-none font-medium",
											children: "+"
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => removeFromCart(i.id),
									className: "p-1.5 text-destructive bg-destructive/10 rounded-md",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
								})
							]
						}, i.id))
					})
				})]
			}),
			cart.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "sticky bottom-24 pt-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					onClick: handleOpenClientModal,
					disabled: loading,
					className: "w-full h-14 bg-gradient-brand text-primary-foreground text-lg font-bold shadow-lg shadow-brand/25 flex justify-between px-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Enviar Pedido" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["R$ ", subtotal.toFixed(2).replace(".", ",")] })]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: isSuccessModalOpen,
				onOpenChange: closeSuccessModal,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "sm:max-w-[425px] text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col items-center justify-center space-y-4 py-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "w-8 h-8" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
								className: "text-2xl",
								children: "Pedido Enviado!"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
								className: "text-center text-base",
								children: "A venda foi registrada com sucesso e está aguardando a aprovação da loja para liberar sua comissão."
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogFooter, {
						className: "sm:justify-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							className: "w-full bg-gradient-brand text-white h-12 text-lg",
							onClick: closeSuccessModal,
							children: "Voltar ao Painel"
						})
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: isClientModalOpen,
				onOpenChange: setIsClientModalOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContent, {
					className: "sm:max-w-[425px]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: submitOrder,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Identificação do Cliente" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Para quem você está vendendo? Preencha os dados abaixo." })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-4 py-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "text-sm font-medium",
											children: "Nome / Empresa *"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											required: true,
											placeholder: "Ex: João Silva ou Construtora X",
											value: clientForm.nome,
											onChange: (e) => setClientForm({
												...clientForm,
												nome: e.target.value
											})
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "text-sm font-medium",
											children: "CPF / CNPJ (Opcional)"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											placeholder: "Apenas números",
											value: clientForm.documento,
											onChange: (e) => setClientForm({
												...clientForm,
												documento: e.target.value
											})
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "text-sm font-medium",
											children: "Telefone (Opcional)"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											placeholder: "(00) 00000-0000",
											value: clientForm.telefone,
											onChange: (e) => setClientForm({
												...clientForm,
												telefone: e.target.value
											})
										})]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "outline",
								onClick: () => setIsClientModalOpen(false),
								children: "Cancelar"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "submit",
								className: "bg-gradient-brand text-white",
								children: "Finalizar Pedido"
							})] })
						]
					})
				})
			})
		]
	});
}
//#endregion
export { ParceiroPDV as component };

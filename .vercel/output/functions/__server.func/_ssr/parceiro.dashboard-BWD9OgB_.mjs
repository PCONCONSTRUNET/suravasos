import { i as __toESM } from "../_runtime.mjs";
import { n as supabaseParceiro } from "./supabase-B8pFCf1w.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { F as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as Button } from "./button-BkEeRci-.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { _ as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { $ as Clock, F as Link, G as ExternalLink, X as Copy, at as CircleCheck, c as TrendingUp, n as Wallet, nt as CircleX } from "../_libs/lucide-react.mjs";
import { n as CardContent, t as Card } from "./card-CtX3ithx.mjs";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-DIo89e4g.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/parceiro.dashboard-BWD9OgB_.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ParceiroDashboard() {
	const navigate = useNavigate();
	const [vendedorId, setVendedorId] = (0, import_react.useState)(null);
	const [nome, setNome] = (0, import_react.useState)("");
	const [status, setStatus] = (0, import_react.useState)("");
	const [vendas, setVendas] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [selectedSaleForDetails, setSelectedSaleForDetails] = (0, import_react.useState)(null);
	const [saleItems, setSaleItems] = (0, import_react.useState)([]);
	const [isSaleDetailsOpen, setIsSaleDetailsOpen] = (0, import_react.useState)(false);
	const [loadingSaleDetails, setLoadingSaleDetails] = (0, import_react.useState)(false);
	const openSaleDetails = async (venda) => {
		setSelectedSaleForDetails(venda);
		setIsSaleDetailsOpen(true);
		setLoadingSaleDetails(true);
		setSaleItems([]);
		try {
			const { data, error } = await supabaseParceiro.from("vendas_itens").select("*, produto:produtos(nome, emoji)").eq("venda_id", venda.id);
			if (!error && data) setSaleItems(data);
		} catch (e) {
			console.error(e);
		} finally {
			setLoadingSaleDetails(false);
		}
	};
	(0, import_react.useEffect)(() => {
		const carregarDados = async () => {
			try {
				const { data: { session } } = await supabaseParceiro.auth.getSession();
				if (!session) {
					navigate({ to: "/parceiro/login" });
					return;
				}
				const { data: vData, error: vError } = await supabaseParceiro.from("vendedores").select("*").eq("user_id", session.user.id).limit(1).maybeSingle();
				if (vError) console.error("Erro ao buscar vendedor:", vError);
				if (vData) {
					setVendedorId(vData.id);
					setNome(vData.nome);
					setStatus(vData.status || "Ativo");
					const { data: vendasData, error: vDashError } = await supabaseParceiro.from("vendas").select("*, clientes(nome, cpf_cnpj, telefone)").eq("vendedor_id", vData.id).order("created_at", { ascending: false });
					if (vDashError) {
						console.error("Erro ao carregar vendas no dashboard:", vDashError);
						alert("Erro ao buscar suas vendas: " + vDashError.message);
					}
					if (vendasData) setVendas(vendasData);
				}
			} catch (err) {
				console.error(err);
			} finally {
				setLoading(false);
			}
		};
		carregarDados();
	}, []);
	const totalComissoesAReceber = vendas.filter((v) => v.status_aprovacao === "Aprovada" && v.status_pagamento_comissao !== "Paga").reduce((acc, v) => acc + (Number(v.valor_comissao) || 0), 0);
	const totalComissoesPagas = vendas.filter((v) => v.status_aprovacao === "Aprovada" && v.status_pagamento_comissao === "Paga").reduce((acc, v) => acc + (Number(v.valor_comissao) || 0), 0);
	const aguardandoAprovacao = vendas.filter((v) => v.status_aprovacao === "Pendente").length;
	const aprovadas = vendas.filter((v) => v.status_aprovacao === "Aprovada").length;
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "text-center py-10 text-muted-foreground",
		children: "Carregando painel..."
	});
	const handleCompletarCadastro = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			const { data: { session } } = await supabaseParceiro.auth.getSession();
			if (!session) return;
			const { error } = await supabaseParceiro.from("vendedores").insert([{
				user_id: session.user.id,
				nome,
				email: session.user.email,
				telefone: "",
				status: "Aguardando Aprovação",
				valor_comissao: 0
			}]);
			if (error) throw error;
			window.location.reload();
		} catch (err) {
			alert("Erro ao concluir o cadastro: " + err.message);
			setLoading(false);
		}
	};
	if (!vendedorId) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex justify-center py-10 px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			className: "w-full max-w-md border-0 shadow-lg ring-1 ring-slate-900/5",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "p-6 text-center space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-xl font-bold font-display",
						children: "Cadastro Incompleto"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: "Detectamos que seu usuário foi criado, mas seu perfil de vendedor não foi gerado devido a um erro anterior."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: handleCompletarCadastro,
						className: "space-y-4 pt-4 text-left",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-sm font-medium",
							children: "Confirme seu Nome Completo"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							required: true,
							value: nome,
							onChange: (e) => setNome(e.target.value),
							placeholder: "Seu nome",
							className: "mt-1 h-12"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							className: "w-full h-12 font-bold bg-gradient-brand",
							disabled: loading,
							children: loading ? "Concluindo..." : "Concluir Meu Cadastro"
						})]
					})
				]
			})
		})
	});
	if (status === "Aguardando Aprovação") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "text-center py-16 px-4 space-y-4 animate-in fade-in slide-in-from-bottom-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mb-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "w-8 h-8" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-2xl font-bold font-display text-slate-800",
				children: "Conta em Análise"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-slate-600",
				children: [
					"Olá, ",
					nome.split(" ")[0],
					"! Sua conta foi criada com sucesso e no momento está aguardando a aprovação do administrador."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground mt-4 border-t pt-4",
				children: "Assim que seu acesso for liberado, você poderá acessar o caixa e registrar suas vendas por aqui."
			})
		]
	});
	if (status === "Rejeitado") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "text-center py-16 px-4 space-y-4 animate-in fade-in slide-in-from-bottom-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { className: "w-8 h-8" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-2xl font-bold font-display text-slate-800",
				children: "Conta Recusada"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-slate-600",
				children: [
					"Olá, ",
					nome.split(" ")[0],
					". Infelizmente, sua solicitação de parceria não foi aprovada pelo administrador."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground mt-4 border-t pt-4",
				children: "Se achar que houve um engano, entre em contato diretamente com a loja."
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
				className: "text-2xl font-bold font-display text-slate-800",
				children: [
					"Olá, ",
					nome.split(" ")[0],
					"! 👋"
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: "Aqui está o resumo das suas vendas."
			})] }),
			vendedorId && status === "Ativo" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "mb-6 border-emerald-200 bg-emerald-50/50 shadow-sm relative overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute top-0 right-0 p-8 opacity-5 pointer-events-none",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, { className: "h-32 w-32" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "text-lg font-bold text-emerald-900 flex items-center gap-2 mb-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, { className: "h-5 w-5" }), " Seu Catálogo Exclusivo"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-emerald-700 text-sm mb-4",
							children: [
								"Compartilhe o link abaixo com seus clientes. Quando eles montarem o pedido e clicarem em \"Enviar\", o pedido chegará no ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "seu WhatsApp" }),
								" e você poderá finalizá-lo por aqui!"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									readOnly: true,
									value: `${window.location.origin}/catalogo?ref=${nome.split(" ")[0].toLowerCase()}`,
									className: "bg-white border-emerald-200 text-emerald-800 font-medium"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									onClick: () => {
										navigator.clipboard.writeText(`${window.location.origin}/catalogo?ref=${nome.split(" ")[0].toLowerCase()}`);
										toast.success("Link copiado!");
									},
									className: "bg-emerald-600 hover:bg-emerald-700 text-white shrink-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "h-4 w-4 mr-2" }), " Copiar"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "outline",
									onClick: () => window.open(`/catalogo?ref=${nome.split(" ")[0].toLowerCase()}`, "_blank"),
									className: "border-emerald-200 text-emerald-700 hover:bg-emerald-100 shrink-0",
									title: "Abrir catálogo",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "h-4 w-4" })
								})
							]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
						className: "col-span-2 bg-gradient-brand text-primary-foreground border-0 shadow-lg shadow-primary/20",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
							className: "p-6",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between items-start",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2 mb-2 opacity-90",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wallet, { className: "h-5 w-5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-medium text-sm",
										children: "Comissões a Receber"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-4xl font-extrabold font-display",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-2xl font-bold mr-1 opacity-80",
										children: "R$"
									}), totalComissoesAReceber.toFixed(2).replace(".", ",")]
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-right",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-end gap-1 mb-1 opacity-80",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "font-medium text-xs",
											children: "Já Pagas"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xl font-bold",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-sm font-bold mr-1 opacity-80",
											children: "R$"
										}), totalComissoesPagas.toFixed(2).replace(".", ",")]
									})]
								})]
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
						className: "shadow-sm border-0 ring-1 ring-slate-900/5",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
							className: "p-4 flex flex-col items-center justify-center text-center",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-10 w-10 rounded-full bg-amber-100 text-amber-600 grid place-items-center mb-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-5 w-5" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-2xl font-bold text-slate-800",
									children: aguardandoAprovacao
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground font-medium",
									children: "Aguardando"
								})
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
						className: "shadow-sm border-0 ring-1 ring-slate-900/5",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
							className: "p-4 flex flex-col items-center justify-center text-center",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-10 w-10 rounded-full bg-success/20 text-success grid place-items-center mb-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-5 w-5" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-2xl font-bold text-slate-800",
									children: aprovadas
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground font-medium",
									children: "Aprovadas"
								})
							]
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
				className: "font-semibold text-lg mb-3 flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "h-5 w-5 text-brand" }), " Últimas Vendas"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-3",
				children: vendas.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-center text-muted-foreground text-sm py-4 bg-white rounded-xl shadow-sm border border-slate-100",
					children: "Nenhuma venda registrada ainda."
				}) : vendas.slice(0, 10).map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex justify-between items-center cursor-pointer active:scale-[0.98] transition-transform",
					onClick: () => openSaleDetails(v),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-bold text-slate-800",
						children: ["R$ ", Number(v.valor_total).toFixed(2).replace(".", ",")]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground mt-0.5",
						children: new Date(v.created_at).toLocaleDateString()
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-right",
						children: [v.status_aprovacao === "Aprovada" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-1 text-xs font-bold text-success bg-success/10 px-2 py-1 rounded-md",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-3 w-3" }), " Aprovada"]
						}) : v.status_aprovacao === "Rejeitada" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "inline-flex items-center gap-1 text-xs font-bold text-destructive bg-destructive/10 px-2 py-1 rounded-md",
							children: "Rejeitada"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-1 text-xs font-bold text-amber-600 bg-amber-100 px-2 py-1 rounded-md",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-3 w-3" }), " Pendente"]
						}), v.status_aprovacao === "Aprovada" && v.valor_comissao > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-[10px] text-muted-foreground mt-1",
							children: [
								"+ R$ ",
								Number(v.valor_comissao).toFixed(2),
								" comissão"
							]
						})]
					})]
				}, v.id))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: isSaleDetailsOpen,
				onOpenChange: setIsSaleDetailsOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "sm:max-w-[400px] w-[95vw] max-h-[90vh] overflow-y-auto p-5 sm:p-6 rounded-xl",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Ficha do Pedido" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								"Pedido #",
								selectedSaleForDetails?.id.substring(0, 6),
								" • ",
								new Date(selectedSaleForDetails?.created_at).toLocaleDateString(),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-3 text-sm text-slate-700 bg-slate-100 p-3 rounded-md border border-slate-200 text-left",
									children: selectedSaleForDetails?.clientes?.nome ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "font-semibold text-slate-900 flex items-center gap-2",
											children: ["👤 ", selectedSaleForDetails.clientes.nome]
										}),
										selectedSaleForDetails.clientes.cpf_cnpj && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "mt-1",
											children: ["📄 ", selectedSaleForDetails.clientes.cpf_cnpj]
										}),
										selectedSaleForDetails.clientes.telefone && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "mt-1",
											children: ["📞 ", selectedSaleForDetails.clientes.telefone]
										})
									] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-muted-foreground italic",
										children: "⚠️ Cliente não identificado ou ocorreu erro no cadastro (possível falha antes da correção do banco)."
									})
								})
							] })
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "py-2",
							children: loadingSaleDetails ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-center py-6 text-muted-foreground",
								children: "Carregando itens..."
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "max-h-[300px] overflow-y-auto divide-y border rounded-lg",
									children: saleItems.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "p-4 text-center text-sm text-muted-foreground",
										children: "Nenhum item encontrado."
									}) : saleItems.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between p-3 bg-slate-50/50",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-2xl",
												children: item.produto?.emoji || "📦"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "font-semibold text-sm text-slate-800",
												children: item.produto?.nome || "Produto Excluído"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "text-xs text-muted-foreground",
												children: [
													item.quantidade,
													"x R$ ",
													Number(item.valor_unitario).toFixed(2)
												]
											})] })]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "font-bold text-brand",
											children: ["R$ ", Number(item.subtotal).toFixed(2)]
										})]
									}, item.id))
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between items-center p-4 bg-slate-100 rounded-lg",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold text-slate-700",
										children: "Total do Pedido:"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-xl font-bold font-display text-slate-900",
										children: ["R$ ", Number(selectedSaleForDetails?.valor_total || 0).toFixed(2)]
									})]
								})]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogFooter, {
							className: "sm:justify-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								className: "w-full",
								onClick: () => setIsSaleDetailsOpen(false),
								children: "Fechar"
							})
						})
					]
				})
			})
		]
	});
}
//#endregion
export { ParceiroDashboard as component };

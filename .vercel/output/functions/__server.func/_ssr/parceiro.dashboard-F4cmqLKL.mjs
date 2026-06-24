import { i as __toESM } from "../_runtime.mjs";
import { n as supabaseParceiro } from "./supabase-Bvu1xBCC.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { F as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as Button } from "./button-BkEeRci-.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { $ as CircleX, X as Clock, c as TrendingUp, n as Wallet, nt as CircleCheck } from "../_libs/lucide-react.mjs";
import { n as CardContent, t as Card } from "./card-CtX3ithx.mjs";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-DIo89e4g.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/parceiro.dashboard-F4cmqLKL.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ParceiroDashboard() {
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
				if (!session) return;
				const { data: vData, error: fetchError } = await supabaseParceiro.from("vendedores").select("*").eq("user_id", session.user.id).single();
				if (vData) {
					setVendedorId(vData.id);
					setNome(vData.nome);
					setStatus(vData.status || "Ativo");
					const { data: vendasData } = await supabaseParceiro.from("vendas").select("*, cliente:clientes(nome, cpf_cnpj, telefone)").eq("vendedor_id", vData.id).order("created_at", { ascending: false });
					if (vendasData) setVendas(vendasData);
				} else {
					const meta = session.user.user_metadata || {};
					const newNome = meta.nome || "Parceiro";
					const newTelefone = meta.telefone || "";
					const { data: newVData, error: insertError } = await supabaseParceiro.from("vendedores").insert([{
						user_id: session.user.id,
						nome: newNome,
						email: session.user.email,
						telefone: newTelefone,
						status: "Aguardando Aprovação",
						valor_comissao: 0
					}]).select().single();
					if (newVData && !insertError) {
						setVendedorId(newVData.id);
						setNome(newVData.nome);
						setStatus(newVData.status);
						await supabaseParceiro.from("notificacoes").insert([{
							tipo: "parceiro",
							titulo: `Nova solicitação de parceria`,
							mensagem: `${newNome} (${session.user.email}) se cadastrou e está aguardando aprovação.`
						}]);
					} else if (insertError) {
						const { data: retryData } = await supabaseParceiro.from("vendedores").select("*").eq("email", session.user.email).maybeSingle();
						if (retryData) {
							await supabaseParceiro.from("vendedores").update({ user_id: session.user.id }).eq("id", retryData.id);
							setVendedorId(retryData.id);
							setNome(retryData.nome);
							setStatus(retryData.status || "Aguardando Aprovação");
						} else setNome(newNome);
					}
				}
			} catch (err) {
				console.error("Erro ao carregar dados do dashboard do parceiro:", err);
			} finally {
				setLoading(false);
			}
		};
		carregarDados();
	}, []);
	const comissoesAReceber = vendas.filter((v) => v.status_aprovacao === "Aprovada" && v.status_pagamento_comissao !== "Paga").reduce((acc, v) => acc + (Number(v.valor_comissao) || 0), 0);
	const comissoesPagas = vendas.filter((v) => v.status_pagamento_comissao === "Paga").reduce((acc, v) => acc + (Number(v.valor_comissao) || 0), 0);
	const aguardandoAprovacao = vendas.filter((v) => v.status_aprovacao === "Pendente").length;
	const aprovadas = vendas.filter((v) => v.status_aprovacao === "Aprovada").length;
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "text-center py-10 text-muted-foreground",
		children: "Carregando painel..."
	});
	if (vendedorId && status === "Aguardando Aprovação") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex justify-center py-10 px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			className: "w-full max-w-md border-0 shadow-lg ring-1 ring-slate-900/5",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "p-8 text-center space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "w-20 h-20 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "w-10 h-10" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-2xl font-bold font-display text-slate-800",
						children: "Conta em Análise"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-slate-600",
						children: [
							"Olá, ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: nome }),
							"! Seu cadastro foi recebido com sucesso. Nossa equipe está avaliando sua solicitação de parceria."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground pt-4 border-t",
						children: "Por favor, aguarde nosso contato ou retorne mais tarde para verificar se sua conta foi aprovada."
					})
				]
			})
		})
	});
	if (vendedorId && status === "Rejeitado") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex justify-center py-10 px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			className: "w-full max-w-md border-0 shadow-lg ring-1 ring-slate-900/5",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "p-8 text-center space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "w-20 h-20 bg-destructive/10 text-destructive rounded-full flex items-center justify-center mx-auto mb-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { className: "w-10 h-10" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-2xl font-bold font-display text-slate-800",
						children: "Solicitação Recusada"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-slate-600",
						children: [
							"Olá, ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: nome }),
							". Infelizmente sua solicitação de parceria não foi aprovada neste momento."
						]
					})
				]
			})
		})
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
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-brand/5 border border-brand/20 p-4 rounded-xl flex items-center justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-bold text-brand",
					children: "Seu Catálogo Digital"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground mt-0.5",
					children: "Envie este link para seus clientes comprarem com você."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					className: "border-brand/30 text-brand hover:bg-brand/10 shrink-0",
					onClick: () => {
						const primeiroNome = nome.split(" ")[0].replace(/[^a-zA-ZÀ-ÿ]/g, "");
						const link = `${window.location.origin}/catalogo?v=${primeiroNome}`;
						navigator.clipboard.writeText(link);
						alert("Link do catálogo copiado!\n\n" + link);
					},
					children: "Copiar Link"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
						className: "shadow-sm border-0 ring-1 ring-amber-500/20 bg-amber-50/50",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
							className: "p-4 flex flex-col justify-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 mb-2 opacity-90 text-amber-700",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wallet, { className: "h-5 w-5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-medium text-sm",
									children: "A Receber"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-3xl font-extrabold font-display text-amber-600",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-lg font-bold mr-1 opacity-80",
									children: "R$"
								}), comissoesAReceber.toFixed(2).replace(".", ",")]
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
						className: "shadow-sm border-0 ring-1 ring-emerald-500/20 bg-emerald-50/50",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
							className: "p-4 flex flex-col justify-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 mb-2 opacity-90 text-emerald-700",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-5 w-5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-medium text-sm",
									children: "Pagas"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-3xl font-extrabold font-display text-emerald-600",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-lg font-bold mr-1 opacity-80",
									children: "R$"
								}), comissoesPagas.toFixed(2).replace(".", ",")]
							})]
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
					className: "sm:max-w-[400px]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Ficha do Pedido" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								"Pedido #",
								selectedSaleForDetails?.id.substring(0, 6),
								" • ",
								new Date(selectedSaleForDetails?.created_at).toLocaleDateString(),
								selectedSaleForDetails?.cliente?.nome && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-3 text-sm text-slate-700 bg-slate-100 p-3 rounded-md border border-slate-200 text-left",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "font-semibold text-slate-900 flex items-center gap-2",
											children: ["👤 ", selectedSaleForDetails.cliente.nome]
										}),
										selectedSaleForDetails.cliente.cpf_cnpj && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "mt-1",
											children: ["📄 ", selectedSaleForDetails.cliente.cpf_cnpj]
										}),
										selectedSaleForDetails.cliente.telefone && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "mt-1",
											children: ["📞 ", selectedSaleForDetails.cliente.telefone]
										})
									]
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

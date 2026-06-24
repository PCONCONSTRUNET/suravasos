import { i as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./supabase-Bvu1xBCC.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { F as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as Button } from "./button-BkEeRci-.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { t as Badge } from "./badge-D1Dupn2y.mjs";
import { _ as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { N as LoaderCircle, St as ArrowDownLeft, T as Package, Z as ClipboardList, g as Settings2, it as ChevronsUpDown, lt as Check, s as TriangleAlert, vt as ArrowUpRight } from "../_libs/lucide-react.mjs";
import { n as PageHeader } from "./app-shell-CIo6-35-.mjs";
import { a as CardTitle, i as CardHeader, n as CardContent, t as Card } from "./card-CtX3ithx.mjs";
import { n as PopoverContent, r as PopoverTrigger, t as Popover } from "./popover-Cmlz_mk1.mjs";
import { a as CommandItem, i as CommandInput, n as CommandEmpty, o as CommandList, r as CommandGroup, t as Command$1 } from "./command-BrmsamRj.mjs";
import { t as Label } from "./label-DBD1bRRP.mjs";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, t as Dialog } from "./dialog-DIo89e4g.mjs";
import { n as Root, t as Indicator } from "../_libs/radix-ui__react-progress.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app.estoque-B_H4wRpq.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Progress = import_react.forwardRef(({ className, value, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
	ref,
	className: cn("relative h-2 w-full overflow-hidden rounded-full bg-primary/20", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Indicator, {
		className: "h-full w-full flex-1 bg-primary transition-all",
		style: { transform: `translateX(-${100 - (value || 0)}%)` }
	})
}));
Progress.displayName = Root.displayName;
function Estoque() {
	const navigate = useNavigate();
	const [produtos, setProdutos] = (0, import_react.useState)([]);
	const [movimentacoes, setMovimentacoes] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [openModal, setOpenModal] = (0, import_react.useState)(false);
	const [comboboxOpen, setComboboxOpen] = (0, import_react.useState)(false);
	const [tipoMovimentacao, setTipoMovimentacao] = (0, import_react.useState)("Entrada");
	const [selectedTransaction, setSelectedTransaction] = (0, import_react.useState)(null);
	const [produtoSelecionado, setProdutoSelecionado] = (0, import_react.useState)("");
	const [quantidade, setQuantidade] = (0, import_react.useState)(0);
	const [motivo, setMotivo] = (0, import_react.useState)("");
	const [salvando, setSalvando] = (0, import_react.useState)(false);
	const fetchData = async () => {
		try {
			const [prodRes, movRes] = await Promise.all([supabase.from("produtos").select("*").order("nome"), supabase.from("movimentacoes_estoque").select("*, produto:produtos(nome)").order("created_at", { ascending: false }).limit(20)]);
			if (prodRes.data) setProdutos(prodRes.data);
			if (movRes.data) setMovimentacoes(movRes.data);
		} catch (e) {
			console.error(e);
		} finally {
			setLoading(false);
		}
	};
	(0, import_react.useEffect)(() => {
		fetchData();
	}, []);
	const openDialog = (tipo) => {
		setTipoMovimentacao(tipo);
		setProdutoSelecionado("");
		setQuantidade(0);
		setMotivo("");
		setOpenModal(true);
	};
	const handleSalvarMovimentacao = async () => {
		if (!produtoSelecionado || quantidade === 0) {
			alert("Selecione um produto e informe uma quantidade (diferente de zero).");
			return;
		}
		setSalvando(true);
		try {
			const prod = produtos.find((p) => p.id === produtoSelecionado);
			if (!prod) throw new Error("Produto não encontrado");
			let finalQtd = Number(quantidade);
			if (tipoMovimentacao === "Saída" && finalQtd > 0) finalQtd = -finalQtd;
			if (tipoMovimentacao === "Entrada" && finalQtd < 0) finalQtd = Math.abs(finalQtd);
			const novoEstoque = Number(prod.estoque) + finalQtd;
			await supabase.from("produtos").update({ estoque: novoEstoque }).eq("id", produtoSelecionado);
			await supabase.from("movimentacoes_estoque").insert({
				produto_id: produtoSelecionado,
				tipo: tipoMovimentacao,
				quantidade: finalQtd,
				motivo: motivo || null
			});
			await fetchData();
			setOpenModal(false);
		} catch (err) {
			alert("Erro ao salvar: " + err.message);
		} finally {
			setSalvando(false);
		}
	};
	const handleGerarPedidoCompra = async () => {
		const criticos = produtos.filter((p) => Number(p.estoque) <= 10);
		if (criticos.length === 0) {
			alert("Não há produtos com estoque crítico para gerar pedido!");
			return;
		}
		try {
			const { data: compra, error } = await supabase.from("compras").insert({
				status: "Rascunho",
				valor_total: 0
			}).select().single();
			if (error) throw error;
			const itens = criticos.map((c) => {
				const valorCustoSugestao = Number((c.valor * .5).toFixed(2));
				return {
					compra_id: compra.id,
					produto_id: c.id,
					quantidade: 50,
					valor_unitario: valorCustoSugestao,
					subtotal: 50 * valorCustoSugestao
				};
			});
			await supabase.from("compras_itens").insert(itens);
			const totalCompra = itens.reduce((acc, curr) => acc + curr.subtotal, 0);
			await supabase.from("compras").update({ valor_total: totalCompra }).eq("id", compra.id);
			alert("Pedido de compra gerado com sucesso! Redirecionando...");
			navigate({ to: "/app/compras" });
		} catch (e) {
			alert("Erro ao gerar pedido: " + e.message);
		}
	};
	const getSomaCategoria = (categoria) => produtos.filter((p) => p.categoria === categoria).reduce((acc, p) => acc + Number(p.estoque || 0), 0);
	const cats = [
		{
			l: "Total de Vasos",
			v: getSomaCategoria("Vasos de Produção") + getSomaCategoria("Vasos Decorativos"),
			c: "bg-primary/10 text-primary",
			pct: 78
		},
		{
			l: "Total de Floreiras",
			v: getSomaCategoria("Floreiras"),
			c: "bg-success/15 text-success",
			pct: 62
		},
		{
			l: "Total de Cuias",
			v: getSomaCategoria("Cuias"),
			c: "bg-terra/10 text-terra",
			pct: 48
		},
		{
			l: "Total de Pratos",
			v: getSomaCategoria("Pratos"),
			c: "bg-info/10 text-info",
			pct: 55
		}
	];
	const critical = produtos.filter((p) => Number(p.estoque) <= 10).slice(0, 5);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Estoque",
			subtitle: "Movimentação consolidada — Centro de distribuição Bauru/SP",
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "outline",
					onClick: () => openDialog("Inventário"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClipboardList, { className: "mr-2 h-4 w-4" }), "Inventário"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "outline",
					onClick: () => openDialog("Ajuste"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings2, { className: "mr-2 h-4 w-4" }), "Ajuste"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					className: "bg-success text-success-foreground hover:bg-success/90",
					onClick: () => openDialog("Entrada"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowDownLeft, { className: "mr-2 h-4 w-4" }), "Entrada"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					className: "bg-gradient-brand text-primary-foreground",
					onClick: () => openDialog("Saída"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "mr-2 h-4 w-4" }), "Saída"]
				})
			] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6",
			children: cats.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "shadow-card",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: `grid h-10 w-10 place-items-center rounded-lg ${c.c}`,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, { className: "h-5 w-5" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
								variant: "secondary",
								children: [c.pct, "% capacidade"]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-sm text-muted-foreground",
							children: c.l
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 font-display text-2xl font-bold",
							children: c.v.toLocaleString("pt-BR")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
							value: c.pct,
							className: "mt-3 h-1.5"
						})
					]
				})
			}, c.l))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-6 lg:grid-cols-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "lg:col-span-2 shadow-card flex flex-col",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Últimas movimentações" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
					className: "p-0 flex-1 overflow-y-auto max-h-[400px]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "divide-y",
						children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-center py-8 text-muted-foreground",
							children: "Carregando..."
						}) : movimentacoes.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-center py-8 text-muted-foreground",
							children: "Nenhuma movimentação registrada."
						}) : movimentacoes.map((m) => {
							const neg = Number(m.quantidade) < 0;
							const d = new Date(m.created_at).toLocaleString("pt-BR", {
								day: "2-digit",
								month: "2-digit",
								hour: "2-digit",
								minute: "2-digit"
							});
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-[auto_1fr_auto] items-center gap-4 px-6 py-3 cursor-pointer hover:bg-muted/50 transition-colors",
								onClick: () => setSelectedTransaction(m),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: `grid h-9 w-9 place-items-center rounded-lg ${neg ? "bg-destructive/10 text-destructive" : "bg-success/15 text-success"}`,
										children: neg ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowDownLeft, { className: "h-4 w-4" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-semibold text-sm truncate",
											children: m.produto?.nome || "Produto excluído"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-xs text-muted-foreground truncate",
											children: [
												m.tipo,
												" · ",
												m.usuario,
												" ",
												m.motivo ? `· ${m.motivo}` : "",
												" · ",
												d
											]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: `font-mono text-sm font-bold ${neg ? "text-destructive" : "text-success"}`,
										children: neg ? m.quantidade : `+${m.quantidade}`
									})
								]
							}, m.id);
						})
					})
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "shadow-card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-4 w-4 text-warning" }), " Estoque crítico"]
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "space-y-4",
					children: [loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-center py-4 text-muted-foreground",
						children: "Carregando..."
					}) : critical.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-center py-4 text-muted-foreground",
						children: "Nenhum produto crítico."
					}) : critical.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-semibold truncate pr-2",
							children: c.nome
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-destructive font-medium whitespace-nowrap",
							children: [c.estoque, " unid."]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
						value: Number(c.estoque) / 10 * 100,
						className: "mt-1.5 h-2"
					})] }, c.id)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						className: "w-full mt-4",
						onClick: handleGerarPedidoCompra,
						children: "Gerar pedido de compra"
					})]
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
			open: openModal,
			onOpenChange: setOpenModal,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, { children: ["Nova ", tipoMovimentacao] }) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4 py-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Produto" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Popover, {
								open: comboboxOpen,
								onOpenChange: setComboboxOpen,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverTrigger, {
									asChild: true,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										variant: "outline",
										role: "combobox",
										"aria-expanded": comboboxOpen,
										className: "w-full justify-between",
										children: [produtoSelecionado ? produtos.find((p) => p.id === produtoSelecionado)?.nome : "Selecione ou pesquise um produto...", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronsUpDown, { className: "ml-2 h-4 w-4 shrink-0 opacity-50" })]
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverContent, {
									className: "w-[400px] p-0",
									align: "start",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Command$1, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandInput, { placeholder: "Pesquisar produto..." }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CommandList, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandEmpty, { children: "Nenhum produto encontrado." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandGroup, { children: produtos.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CommandItem, {
										value: p.nome,
										onSelect: () => {
											setProdutoSelecionado(p.id);
											setComboboxOpen(false);
										},
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: cn("mr-2 h-4 w-4", produtoSelecionado === p.id ? "opacity-100" : "opacity-0") }),
											p.nome,
											" (Estoque: ",
											p.estoque,
											")"
										]
									}, p.id)) })] })] })
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Quantidade" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "number",
								value: quantidade,
								onChange: (e) => setQuantidade(Number(e.target.value)),
								placeholder: tipoMovimentacao === "Saída" ? "Ex: 10 (será subtraído)" : "Ex: 50 (será adicionado)"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Motivo / Observação" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: motivo,
								onChange: (e) => setMotivo(e.target.value),
								placeholder: "Ex: Nota Fiscal 123, Ajuste de contagem..."
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					onClick: () => setOpenModal(false),
					children: "Cancelar"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "bg-gradient-brand text-primary-foreground",
					onClick: handleSalvarMovimentacao,
					disabled: salvando,
					children: salvando ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }) : "Confirmar Movimentação"
				})] })
			] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
			open: !!selectedTransaction,
			onOpenChange: (o) => !o && setSelectedTransaction(null),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Detalhes da Movimentação" }) }), selectedTransaction && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-4 py-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-semibold text-xs text-muted-foreground uppercase tracking-wider mb-1",
						children: "Produto"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-semibold",
						children: selectedTransaction.produto?.nome || "Produto excluído"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-semibold text-xs text-muted-foreground uppercase tracking-wider mb-1",
								children: "Tipo"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: "outline",
								children: selectedTransaction.tipo
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-semibold text-xs text-muted-foreground uppercase tracking-wider mb-1",
								children: "Quantidade"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: `font-mono font-bold ${Number(selectedTransaction.quantidade) < 0 ? "text-destructive" : "text-success"}`,
								children: Number(selectedTransaction.quantidade) > 0 ? `+${selectedTransaction.quantidade}` : selectedTransaction.quantidade
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-semibold text-xs text-muted-foreground uppercase tracking-wider mb-1",
								children: "Data / Hora"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm",
								children: new Date(selectedTransaction.created_at).toLocaleString("pt-BR")
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-semibold text-xs text-muted-foreground uppercase tracking-wider mb-1",
								children: "Usuário"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm",
								children: selectedTransaction.usuario
							})] })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-semibold text-xs text-muted-foreground uppercase tracking-wider mb-1",
						children: "Motivo / Observação"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm p-3 bg-muted rounded-md",
						children: selectedTransaction.motivo || "Não informado"
					})] })
				]
			})] })
		})
	] });
}
//#endregion
export { Estoque as component };

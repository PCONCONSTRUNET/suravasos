import { i as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./supabase-Bvu1xBCC.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { F as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as Button } from "./button-BkEeRci-.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { t as Badge } from "./badge-D1Dupn2y.mjs";
import { $ as CircleX, C as Phone, K as DollarSign, U as Eye, c as TrendingUp, h as Settings, j as Mail, n as Wallet, nt as CircleCheck, u as Trash2 } from "../_libs/lucide-react.mjs";
import { n as PageHeader } from "./app-shell-CIo6-35-.mjs";
import { n as CardContent, t as Card } from "./card-CtX3ithx.mjs";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-C0WYWEQX.mjs";
import { a as SheetTitle, i as SheetHeader, n as SheetContent, r as SheetDescription, t as Sheet } from "./sheet-DxhNg4O2.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-Dg1urBTx.mjs";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-DIo89e4g.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app.vendedores-C2IR88o5.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function VendedoresAdmin() {
	const [vendedores, setVendedores] = (0, import_react.useState)([]);
	const [todasVendas, setTodasVendas] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [selectedVendedor, setSelectedVendedor] = (0, import_react.useState)(null);
	const [isSheetOpen, setIsSheetOpen] = (0, import_react.useState)(false);
	const [isCommissionModalOpen, setIsCommissionModalOpen] = (0, import_react.useState)(false);
	const [commissionTarget, setCommissionTarget] = (0, import_react.useState)(null);
	const [commissionType, setCommissionType] = (0, import_react.useState)("porcentagem");
	const [commissionValue, setCommissionValue] = (0, import_react.useState)("");
	const [selectedSaleForDetails, setSelectedSaleForDetails] = (0, import_react.useState)(null);
	const [saleItems, setSaleItems] = (0, import_react.useState)([]);
	const [isSaleDetailsOpen, setIsSaleDetailsOpen] = (0, import_react.useState)(false);
	const [loadingSaleDetails, setLoadingSaleDetails] = (0, import_react.useState)(false);
	const [confirmModal, setConfirmModal] = (0, import_react.useState)({
		isOpen: false,
		title: "",
		desc: "",
		onConfirm: () => {}
	});
	const handleConfirmAction = () => {
		confirmModal.onConfirm();
		setConfirmModal({
			...confirmModal,
			isOpen: false
		});
	};
	const openSaleDetails = async (venda) => {
		setSelectedSaleForDetails(venda);
		setIsSaleDetailsOpen(true);
		setLoadingSaleDetails(true);
		setSaleItems([]);
		try {
			const { data, error } = await supabase.from("vendas_itens").select("*, produto:produtos(nome, emoji)").eq("venda_id", venda.id);
			if (!error && data) setSaleItems(data);
		} catch (e) {
			console.error(e);
		} finally {
			setLoadingSaleDetails(false);
		}
	};
	const fetchData = async () => {
		setLoading(true);
		try {
			const { data: vData } = await supabase.from("vendedores").select("*");
			if (vData) setVendedores(vData);
			const { data: vendasData, error } = await supabase.from("vendas").select("*, vendedor:vendedores(*), cliente:clientes(*)").not("vendedor_id", "is", null).order("created_at", { ascending: false });
			if (!error && vendasData) setTodasVendas(vendasData);
			else if (error) {
				console.error("Erro ao buscar vendas:", error);
				alert("Erro ao buscar vendas dos parceiros: " + error.message);
			}
		} catch (e) {
			console.warn("Erro:", e);
		} finally {
			setLoading(false);
		}
	};
	(0, import_react.useEffect)(() => {
		fetchData();
	}, []);
	const vendasPendentes = todasVendas.filter((v) => v.status_aprovacao === "Pendente" && v.tipo !== "DAV");
	const vendasAprovadas = todasVendas.filter((v) => v.status_aprovacao === "Aprovada" && v.tipo !== "DAV");
	const totalFaturadoParceiros = vendasAprovadas.reduce((acc, v) => acc + (Number(v.valor_total) || 0), 0);
	const totalComissoesDevidas = vendasAprovadas.filter((v) => v.status_pagamento_comissao !== "Paga").reduce((acc, v) => acc + (Number(v.valor_comissao) || 0), 0);
	const totalComissoesPagas = vendasAprovadas.filter((v) => v.status_pagamento_comissao === "Paga").reduce((acc, v) => acc + (Number(v.valor_comissao) || 0), 0);
	const aprovarVenda = async (venda) => {
		if (!confirm("Confirmar aprovação da venda e registro da comissão?")) return;
		try {
			const vendedor = venda.vendedor || vendedores.find((v) => v.id === venda.vendedor_id);
			const valorVenda = Number(venda.valor_total) || 0;
			let valorComissao = 0;
			if (vendedor) if (vendedor.tipo_comissao === "porcentagem") valorComissao = valorVenda * (Number(vendedor.valor_comissao || 0) / 100);
			else valorComissao = Number(vendedor.valor_comissao || 0);
			const { error } = await supabase.from("vendas").update({
				status_aprovacao: "Aprovada",
				status: "Faturado",
				valor_comissao: valorComissao,
				status_pagamento_comissao: "Pendente"
			}).eq("id", venda.id);
			if (error) throw error;
			const dataAtual = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
			await supabase.from("contas_receber").insert([{
				venda_id: venda.id,
				descricao: `Venda Parceiro #${venda.id.substring(0, 8).toUpperCase()} - ${vendedor?.nome || ""}`,
				valor: valorVenda,
				vencimento: dataAtual,
				status: "Pendente",
				data_pagamento: null
			}]);
			const { data: itens } = await supabase.from("vendas_itens").select("produto_id, quantidade").eq("venda_id", venda.id);
			if (itens) for (const item of itens) {
				const { data: prod } = await supabase.from("produtos").select("estoque").eq("id", item.produto_id).single();
				if (prod) await supabase.from("produtos").update({ estoque: prod.estoque - item.quantidade }).eq("id", item.produto_id);
			}
			alert("Venda aprovada com sucesso! Financeiro e Comissão gerados, e estoque atualizado.");
			fetchData();
		} catch (err) {
			alert("Erro ao aprovar: " + err.message);
		}
	};
	const rejeitarVenda = async (id) => {
		setConfirmModal({
			isOpen: true,
			title: "Rejeitar Venda",
			desc: "Tem certeza que deseja rejeitar esta venda? Ela será cancelada.",
			onConfirm: async () => {
				try {
					await supabase.from("vendas").update({
						status_aprovacao: "Rejeitada",
						status: "Cancelada"
					}).eq("id", id);
					fetchData();
				} catch (err) {
					alert("Erro ao rejeitar: " + err.message);
				}
			}
		});
	};
	const openCommissionModal = (vendedor) => {
		setCommissionTarget(vendedor);
		setCommissionType(vendedor.tipo_comissao || "porcentagem");
		setCommissionValue(vendedor.valor_comissao ? String(vendedor.valor_comissao) : "");
		setIsCommissionModalOpen(true);
	};
	const saveCommission = async (e) => {
		e.preventDefault();
		if (!commissionTarget) return;
		const v = parseFloat(commissionValue.replace(",", "."));
		if (isNaN(v) || v < 0) {
			alert("Valor numérico inválido.");
			return;
		}
		try {
			const { error } = await supabase.from("vendedores").update({
				status: "Ativo",
				tipo_comissao: commissionType,
				valor_comissao: v
			}).eq("id", commissionTarget.id);
			if (error) throw error;
			setIsCommissionModalOpen(false);
			fetchData();
		} catch (err) {
			alert("Erro ao salvar configuração: " + err.message);
		}
	};
	const pagarComissao = async (vendaId) => {
		setConfirmModal({
			isOpen: true,
			title: "Confirmar Pagamento",
			desc: "Você já transferiu esse valor para o parceiro? Confirmar baixa de pagamento da comissão.",
			onConfirm: async () => {
				try {
					await supabase.from("vendas").update({ status_pagamento_comissao: "Paga" }).eq("id", vendaId);
					fetchData();
				} catch (err) {
					alert("Erro ao pagar comissão: " + err.message);
				}
			}
		});
	};
	const excluirVendaAprovada = async (vendaId) => {
		setConfirmModal({
			isOpen: true,
			title: "Excluir Venda do Parceiro",
			desc: "Atenção: Deseja realmente excluir esta venda do parceiro? O valor será removido das comissões dele e os produtos retornarão ao estoque.",
			onConfirm: async () => {
				try {
					await supabase.from("vendas").update({
						status_aprovacao: "Rejeitada",
						valor_comissao: 0,
						status: "Cancelada"
					}).eq("id", vendaId);
					const { data: itens } = await supabase.from("vendas_itens").select("produto_id, quantidade").eq("venda_id", vendaId);
					if (itens) for (const item of itens) {
						const { data: prod } = await supabase.from("produtos").select("estoque").eq("id", item.produto_id).single();
						if (prod) await supabase.from("produtos").update({ estoque: prod.estoque + item.quantidade }).eq("id", item.produto_id);
					}
					fetchData();
				} catch (err) {
					alert("Erro ao excluir venda: " + err.message);
				}
			}
		});
	};
	const excluirVendedor = async (id) => {
		setConfirmModal({
			isOpen: true,
			title: "Excluir Parceiro",
			desc: "Tem certeza que deseja excluir esse parceiro? O cadastro e o acesso dele serão permanentemente apagados do banco de dados.",
			onConfirm: async () => {
				try {
					const { error } = await supabase.rpc("delete_vendedor_and_user", { p_vendedor_id: id });
					if (error) throw error;
					setIsSheetOpen(false);
					fetchData();
				} catch (err) {
					alert("Erro ao excluir parceiro: " + err.message + "\n\nVocê precisa rodar o script SQL de deleção no painel do Supabase primeiro!");
				}
			}
		});
	};
	const rejeitarVendedor = async (vendedorId) => {
		setConfirmModal({
			isOpen: true,
			title: "Recusar Solicitação",
			desc: "Tem certeza que deseja recusar e excluir a solicitação deste usuário? O cadastro dele será apagado do banco de dados para liberar o e-mail.",
			onConfirm: async () => {
				try {
					const { error } = await supabase.rpc("delete_vendedor_and_user", { p_vendedor_id: vendedorId });
					if (error) throw error;
					fetchData();
				} catch (err) {
					alert("Erro ao rejeitar parceiro: " + err.message + "\n\nVocê precisa rodar o script SQL de deleção no painel do Supabase primeiro!");
				}
			}
		});
	};
	const openVendedorDetails = (vendedor) => {
		setSelectedVendedor(vendedor);
		setIsSheetOpen(true);
	};
	const vendasDoVendedor = selectedVendedor ? vendasAprovadas.filter((v) => v.vendedor_id === selectedVendedor.id) : [];
	const vFaturado = vendasDoVendedor.reduce((acc, v) => acc + (Number(v.valor_total) || 0), 0);
	const vDevido = vendasDoVendedor.filter((v) => v.status_pagamento_comissao !== "Paga").reduce((acc, v) => acc + (Number(v.valor_comissao) || 0), 0);
	const vPago = vendasDoVendedor.filter((v) => v.status_pagamento_comissao === "Paga").reduce((acc, v) => acc + (Number(v.valor_comissao) || 0), 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Relatório de Parceiros",
			subtitle: "Gerencie as vendas, comissões e pagamentos dos seus afiliados."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-3 gap-4 mb-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					className: "border-0 shadow-sm ring-1 ring-slate-200",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						className: "p-4 flex items-center gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "p-3 bg-brand/10 text-brand rounded-xl",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "h-6 w-6" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-medium text-muted-foreground",
							children: "Total Faturado"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
							className: "text-2xl font-bold font-display text-slate-800",
							children: ["R$ ", totalFaturadoParceiros.toFixed(2).replace(".", ",")]
						})] })]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					className: "border-0 shadow-sm ring-1 ring-amber-500/20 bg-amber-50/30",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						className: "p-4 flex items-center gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "p-3 bg-amber-100 text-amber-600 rounded-xl",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DollarSign, { className: "h-6 w-6" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-medium text-amber-700",
							children: "Comissões Devidas"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
							className: "text-2xl font-bold font-display text-amber-600",
							children: ["R$ ", totalComissoesDevidas.toFixed(2).replace(".", ",")]
						})] })]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					className: "border-0 shadow-sm ring-1 ring-emerald-500/20 bg-emerald-50/30",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						className: "p-4 flex items-center gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "p-3 bg-emerald-100 text-emerald-600 rounded-xl",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wallet, { className: "h-6 w-6" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-medium text-emerald-700",
							children: "Comissões Pagas"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
							className: "text-2xl font-bold font-display text-emerald-600",
							children: ["R$ ", totalComissoesPagas.toFixed(2).replace(".", ",")]
						})] })]
					})
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid md:grid-cols-2 gap-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "shadow-card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border-b p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-semibold text-lg",
						children: "Parceiros Cadastrados"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: "Visualize o relatório de cada vendedor."
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Nome" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Comissão" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Ação" })
				] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: vendedores.filter((v) => v.status !== "Inativo").length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					colSpan: 3,
					className: "text-center py-4 text-muted-foreground",
					children: "Nenhum vendedor encontrado."
				}) }) : vendedores.filter((v) => v.status !== "Inativo").map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
						className: "cursor-pointer hover:bg-slate-50 transition-colors",
						onClick: () => openVendedorDetails(v),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-medium text-brand hover:underline",
							children: v.nome
						}), v.status === "Aguardando Aprovação" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: "outline",
							className: "text-amber-600 bg-amber-50 text-[10px] mt-1",
							children: "Pendente"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: v.tipo_comissao === "porcentagem" ? `${v.valor_comissao}%` : `R$ ${v.valor_comissao}` }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: v.status === "Aguardando Aprovação" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							onClick: () => openCommissionModal(v),
							className: "h-7 text-xs bg-success hover:bg-success/90",
							children: "Aprovar"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "destructive",
							onClick: () => rejeitarVendedor(v.id),
							className: "h-7 text-xs px-2",
							title: "Recusar Solicitação",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { className: "w-4 h-4" })
						})]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "outline",
							onClick: () => openCommissionModal(v),
							className: "h-8 w-8 p-0 text-muted-foreground hover:text-brand",
							title: "Editar Comissão",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, { className: "w-4 h-4" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							size: "sm",
							variant: "outline",
							onClick: () => openVendedorDetails(v),
							className: "h-8 text-xs flex items-center gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "w-3 h-3" }), " Relatório"]
						})]
					}) })
				] }, v.id)) })] })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "shadow-card border-brand/50",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border-b p-4 bg-brand/5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-semibold text-lg text-brand",
						children: "Vendas Pendentes de Aprovação"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: "Vendas aguardando sua autorização para baixar estoque e comissão."
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Vendedor" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Valor" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Ação" })
				] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: vendasPendentes.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					colSpan: 3,
					className: "text-center py-4 text-muted-foreground",
					children: "Nenhuma venda pendente."
				}) }) : vendasPendentes.map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
					className: "cursor-pointer hover:bg-slate-50 transition-colors",
					onClick: () => openSaleDetails(v),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-medium",
							children: v.vendedor?.nome || "Desconhecido"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted-foreground",
							children: ["#", v.id.substring(0, 6)]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
							className: "font-semibold",
							children: ["R$ ", Number(v.valor_total).toFixed(2)]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							onClick: (e) => e.stopPropagation(),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								onClick: () => aprovarVenda(v),
								className: "bg-success hover:bg-success/90 h-8 px-2",
								title: "Aprovar",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "destructive",
								onClick: () => rejeitarVenda(v.id),
								className: "h-8 px-2",
								title: "Rejeitar",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { className: "h-4 w-4" })
							})]
						}) })
					]
				}, v.id)) })] })]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
			open: isSheetOpen,
			onOpenChange: setIsSheetOpen,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetContent, {
				side: "right",
				className: "w-[400px] sm:w-[540px] overflow-y-auto bg-slate-50 p-0",
				children: selectedVendedor && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col h-full",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-6 bg-white border-b sticky top-0 z-10",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTitle, {
								className: "text-2xl font-bold font-display",
								children: selectedVendedor.nome
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetDescription, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col gap-1 mt-2 mb-4",
									children: [selectedVendedor.email && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2 text-sm text-slate-600",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "w-4 h-4" }),
											" ",
											selectedVendedor.email
										]
									}), selectedVendedor.telefone && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2 text-sm text-slate-600",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "w-4 h-4" }),
											" ",
											selectedVendedor.telefone
										]
									})]
								}),
								"Comissão base: ",
								selectedVendedor.tipo_comissao === "porcentagem" ? `${selectedVendedor.valor_comissao}%` : `R$ ${selectedVendedor.valor_comissao}`
							] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-3 gap-2 mt-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "bg-slate-50 p-3 rounded-lg border text-center",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-muted-foreground font-medium mb-1",
											children: "Vendeu Total"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "font-bold text-slate-800",
											children: ["R$ ", vFaturado.toFixed(2)]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "bg-amber-50 p-3 rounded-lg border border-amber-100 text-center",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-amber-700 font-medium mb-1",
											children: "Você Deve"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "font-bold text-amber-600",
											children: ["R$ ", vDevido.toFixed(2)]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "bg-emerald-50 p-3 rounded-lg border border-emerald-100 text-center",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-emerald-700 font-medium mb-1",
											children: "Já Pago"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "font-bold text-emerald-600",
											children: ["R$ ", vPago.toFixed(2)]
										})]
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-6 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-semibold text-lg mb-4 text-slate-800",
								children: "Histórico de Vendas Aprovadas"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "space-y-3",
								children: vendasDoVendedor.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-center text-muted-foreground text-sm py-8",
									children: "Nenhuma venda aprovada ainda."
								}) : vendasDoVendedor.map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "bg-white p-4 rounded-xl border shadow-sm flex flex-col gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between items-start",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-xs font-medium text-muted-foreground",
											children: ["Pedido #", v.id.substring(0, 8).toUpperCase()]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "font-bold text-sm",
											children: ["Venda: R$ ", Number(v.valor_total).toFixed(2)]
										})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "text-right",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs font-medium text-muted-foreground mb-0.5",
												children: "Comissão"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "font-bold text-brand",
												children: ["R$ ", Number(v.valor_comissao).toFixed(2)]
											})]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between items-center border-t pt-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
											variant: "outline",
											className: v.status_pagamento_comissao === "Paga" ? "bg-emerald-50 text-emerald-600 border-emerald-200" : "bg-amber-50 text-amber-600 border-amber-200",
											children: v.status_pagamento_comissao === "Paga" ? "Comissão Paga" : "Comissão Pendente"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2",
											children: [v.status_pagamento_comissao !== "Paga" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												size: "sm",
												variant: "outline",
												className: "h-7 text-xs border-amber-200 text-amber-700 hover:bg-amber-50",
												onClick: () => pagarComissao(v.id),
												children: "Marcar como Pago"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												size: "sm",
												variant: "ghost",
												className: "h-7 w-7 p-0 text-muted-foreground hover:text-destructive",
												onClick: () => excluirVendaAprovada(v.id),
												title: "Excluir Venda do Parceiro",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "w-4 h-4" })
											})]
										})]
									})]
								}, v.id))
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "p-6 border-t bg-white sticky bottom-0",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "destructive",
								className: "w-full",
								onClick: () => excluirVendedor(selectedVendedor.id),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "w-4 h-4 mr-2" }), " Excluir Parceiro"]
							})
						})
					]
				})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
			open: isCommissionModalOpen,
			onOpenChange: setIsCommissionModalOpen,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContent, {
				className: "sm:max-w-[425px]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: saveCommission,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Configurar Comissão" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: commissionTarget?.status === "Aguardando Aprovação" ? `Aprove o parceiro ${commissionTarget?.nome} definindo sua regra de comissão.` : `Edite a regra de comissão do parceiro ${commissionTarget?.nome}.` })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 py-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-sm font-medium",
									children: "Tipo de Comissão"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
									value: commissionType,
									onValueChange: setCommissionType,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Selecione o tipo" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "porcentagem",
										children: "% Porcentagem sobre a venda"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "fixo",
										children: "R$ Valor Fixo por venda"
									})] })]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-sm font-medium",
									children: "Valor da Comissão"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative",
									children: [
										commissionType === "fixo" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "absolute left-3 top-2.5 text-muted-foreground text-sm",
											children: "R$"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											type: "text",
											required: true,
											value: commissionValue,
											onChange: (e) => setCommissionValue(e.target.value),
											placeholder: commissionType === "porcentagem" ? "Ex: 10" : "Ex: 50,00",
											className: commissionType === "fixo" ? "pl-8" : "pr-8"
										}),
										commissionType === "porcentagem" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "absolute right-3 top-2.5 text-muted-foreground text-sm",
											children: "%"
										})
									]
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "outline",
							onClick: () => setIsCommissionModalOpen(false),
							children: "Cancelar"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							className: "bg-gradient-brand text-white",
							children: "Salvar Comissão"
						})] })
					]
				})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
			open: isSaleDetailsOpen,
			onOpenChange: setIsSaleDetailsOpen,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
				className: "sm:max-w-[500px]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Detalhes do Pedido" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
								"Pedido #",
								selectedSaleForDetails?.id?.substring(0, 6).toUpperCase(),
								" • Vendedor: ",
								selectedSaleForDetails?.vendedor?.nome || "Desconhecido"
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-muted-foreground mt-1",
								children: [
									"Enviado em: ",
									selectedSaleForDetails ? new Date(selectedSaleForDetails.created_at).toLocaleDateString("pt-BR") : "",
									" às ",
									selectedSaleForDetails ? new Date(selectedSaleForDetails.created_at).toLocaleTimeString("pt-BR", {
										hour: "2-digit",
										minute: "2-digit"
									}) : ""
								]
							}),
							selectedSaleForDetails?.cliente?.nome && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 text-sm text-slate-700 bg-slate-100 p-3 rounded-md border border-slate-200",
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
									}),
									selectedSaleForDetails.cliente.endereco && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-1",
										children: ["🏠 ", selectedSaleForDetails.cliente.endereco]
									})
								]
							})
						] })
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "py-4",
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
					selectedSaleForDetails?.status_aprovacao === "Pendente" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
						className: "flex items-center gap-2 sm:justify-end",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "destructive",
							onClick: () => {
								setIsSaleDetailsOpen(false);
								rejeitarVenda(selectedSaleForDetails.id);
							},
							children: "Recusar Pedido"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							className: "bg-success hover:bg-success/90",
							onClick: () => {
								setIsSaleDetailsOpen(false);
								aprovarVenda(selectedSaleForDetails);
							},
							children: "Aprovar Pedido"
						})]
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
			open: confirmModal.isOpen,
			onOpenChange: (open) => setConfirmModal({
				...confirmModal,
				isOpen: open
			}),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
				className: "sm:max-w-[425px]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: confirmModal.title }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
					className: "text-base text-slate-700 py-2",
					children: confirmModal.desc
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
					className: "flex gap-2 sm:justify-end mt-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						onClick: () => setConfirmModal({
							...confirmModal,
							isOpen: false
						}),
						children: "Cancelar"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "bg-success text-success-foreground hover:bg-success/90",
						onClick: handleConfirmAction,
						children: "Confirmar"
					})]
				})]
			})
		})
	] });
}
//#endregion
export { VendedoresAdmin as component };

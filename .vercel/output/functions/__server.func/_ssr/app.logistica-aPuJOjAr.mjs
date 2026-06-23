import { i as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./supabase-B8pFCf1w.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { F as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as Button } from "./button-BkEeRci-.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { t as Badge } from "./badge-D1Dupn2y.mjs";
import { $ as Clock, H as FileText, at as CircleCheck, j as MapPin, o as Truck, u as Trash2, x as Plus } from "../_libs/lucide-react.mjs";
import { n as PageHeader } from "./app-shell-BDkgzrqS.mjs";
import { a as CardTitle, i as CardHeader, n as CardContent, t as Card } from "./card-CtX3ithx.mjs";
import { n as PopoverContent, r as PopoverTrigger, t as Popover } from "./popover-Cmlz_mk1.mjs";
import { t as Label } from "./label-DBD1bRRP.mjs";
import { n as useConfirm } from "./ConfirmContext-CIaV5wVt.mjs";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-C0WYWEQX.mjs";
import { a as DialogHeader, n as DialogContent, o as DialogTitle, s as DialogTrigger, t as Dialog } from "./dialog-DIo89e4g.mjs";
import { t as Checkbox } from "./checkbox-kt6FvQcE.mjs";
import { a as Viewport, i as ScrollAreaThumb, n as Root, r as ScrollAreaScrollbar, t as Corner } from "../_libs/radix-ui__react-scroll-area.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app.logistica-aPuJOjAr.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var ScrollArea = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Root, {
	ref,
	className: cn("relative overflow-hidden", className),
	...props,
	children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Viewport, {
			className: "h-full w-full rounded-[inherit]",
			children
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollBar, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Corner, {})
	]
}));
ScrollArea.displayName = Root.displayName;
var ScrollBar = import_react.forwardRef(({ className, orientation = "vertical", ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollAreaScrollbar, {
	ref,
	orientation,
	className: cn("flex touch-none select-none transition-colors", orientation === "vertical" && "h-full w-2.5 border-l border-l-transparent p-[1px]", orientation === "horizontal" && "h-2.5 flex-col border-t border-t-transparent p-[1px]", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollAreaThumb, { className: "relative flex-1 rounded-full bg-border" })
}));
ScrollBar.displayName = ScrollAreaScrollbar.displayName;
function Logistica() {
	const confirm = useConfirm();
	const [vendas, setVendas] = (0, import_react.useState)([]);
	const [rotasReais, setRotasReais] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [openNovaRota, setOpenNovaRota] = (0, import_react.useState)(false);
	const [openRelatorio, setOpenRelatorio] = (0, import_react.useState)(false);
	const [motoristaRota, setMotoristaRota] = (0, import_react.useState)("");
	const [veiculoRota, setVeiculoRota] = (0, import_react.useState)("");
	const [pedidosSelecionados, setPedidosSelecionados] = (0, import_react.useState)([]);
	const fetchRotas = async () => {
		try {
			const { data } = await supabase.from("rotas").select("*").order("created_at", { ascending: false });
			if (data) setRotasReais(data);
		} catch (e) {}
	};
	const fetchVendas = async () => {
		try {
			const { data } = await supabase.from("vendas").select("*, clientes(nome, cidade)").eq("tipo", "VENDA").order("created_at", { ascending: false });
			if (data) setVendas(data);
		} catch (err) {
			console.error(err);
		} finally {
			setLoading(false);
		}
	};
	(0, import_react.useEffect)(() => {
		fetchVendas();
		fetchRotas();
	}, []);
	const handleNovaRota = async () => {
		if (!motoristaRota || !veiculoRota || pedidosSelecionados.length === 0) {
			alert("Preencha motorista, veículo e selecione pelo menos um pedido.");
			return;
		}
		const realIds = pedidosSelecionados.filter((id) => !id.startsWith("mock"));
		try {
			const { data: novaRota, error: erroRota } = await supabase.from("rotas").insert([{
				motorista: motoristaRota,
				veiculo: veiculoRota
			}]).select().single();
			if (realIds.length > 0) {
				const { error: errVendas } = await supabase.from("vendas").update({
					rota_id: novaRota.id,
					status: "Em Transporte"
				}).in("id", realIds);
				if (errVendas) {
					console.error("Erro Vendas:", errVendas);
					throw new Error("Erro ao vincular pedidos.");
				}
			}
			setOpenNovaRota(false);
			setMotoristaRota("");
			setVeiculoRota("");
			const mockIds = pedidosSelecionados.filter((id) => id.startsWith("mock"));
			if (mockIds.length > 0) setVendas((prev) => prev.map((v) => mockIds.includes(v.id) ? {
				...v,
				rota_id: novaRota.id,
				status: "Em Transporte"
			} : v));
			setPedidosSelecionados([]);
			if (realIds.length > 0) fetchVendas();
			fetchRotas();
		} catch (err) {
			console.error(err);
			alert("Atenção: Ocorreu um erro ao criar a rota. Se for o primeiro uso, verifique o console.");
		}
	};
	const handleExcluirRota = async (id) => {
		if (!await confirm("Tem certeza que deseja excluir esta rota? Os pedidos voltarão para pendentes.")) return;
		try {
			await supabase.from("vendas").update({
				rota_id: null,
				status: "PENDENTE"
			}).eq("rota_id", id);
			await supabase.from("rotas").delete().eq("id", id);
			fetchRotas();
			fetchVendas();
		} catch (err) {
			console.error(err);
		}
	};
	const handleEntregar = async (id) => {
		if (!await confirm("Confirmar entrega deste pedido?")) return;
		if (id.startsWith("mock")) {
			setVendas(vendas.map((v) => v.id === id ? {
				...v,
				status: "Entregue"
			} : v));
			return;
		}
		try {
			await supabase.from("vendas").update({ status: "Entregue" }).eq("id", id);
			fetchVendas();
		} catch (err) {
			alert("Erro ao atualizar status.");
		}
	};
	const handleEmRota = async (id) => {
		if (id.startsWith("mock")) {
			setVendas(vendas.map((v) => v.id === id ? {
				...v,
				status: "Em Transporte"
			} : v));
			return;
		}
		try {
			await supabase.from("vendas").update({ status: "Em Transporte" }).eq("id", id);
			fetchVendas();
		} catch (err) {
			alert("Erro ao atualizar status.");
		}
	};
	const handleExcluir = async (id) => {
		if (!await confirm({
			description: "Tem certeza que deseja excluir este pedido? Essa ação apagará a venda do sistema.",
			variant: "destructive"
		})) return;
		if (id.startsWith("mock")) {
			setVendas(vendas.filter((v) => v.id !== id));
			return;
		}
		try {
			await supabase.from("vendas").delete().eq("id", id);
			fetchVendas();
		} catch (err) {
			alert("Erro ao excluir pedido.");
		}
	};
	const pendingVendas = vendas.filter((v) => v.status !== "Entregue");
	const pending = pendingVendas.length;
	const delivered = vendas.filter((v) => v.status === "Entregue").length;
	const inTransit = vendas.filter((v) => v.status === "Em Transporte").length;
	const cityCounts = {};
	pendingVendas.forEach((v) => {
		const label = `${v.clientes?.cidade || "Sem Cidade"}${v.clientes?.uf ? `/${v.clientes.uf}` : ""}`;
		cityCounts[label] = (cityCounts[label] || 0) + 1;
	});
	const mapSlots = [
		{
			x: "30%",
			y: "55%"
		},
		{
			x: "60%",
			y: "40%"
		},
		{
			x: "40%",
			y: "25%"
		},
		{
			x: "75%",
			y: "65%"
		},
		{
			x: "20%",
			y: "35%"
		},
		{
			x: "85%",
			y: "30%"
		},
		{
			x: "50%",
			y: "75%"
		},
		{
			x: "15%",
			y: "70%"
		}
	];
	const dynamicCities = Object.entries(cityCounts).map(([cidade, count], index) => {
		const slot = mapSlots[index % mapSlots.length];
		return {
			c: cidade,
			q: count,
			x: slot.x,
			y: slot.y
		};
	});
	const cityRoutes = {};
	vendas.forEach((v) => {
		const cidade = v.clientes?.cidade || "Diversas";
		if (!cityRoutes[cidade]) cityRoutes[cidade] = {
			total: 0,
			delivered: 0
		};
		cityRoutes[cidade].total += 1;
		if (v.status === "Entregue") cityRoutes[cidade].delivered += 1;
	});
	const dynamicRoutes = Object.entries(cityRoutes).sort((a, b) => b[1].total - a[1].total).map(([cidade, counts], i) => ({
		v: `Veículo ${String(i + 1).padStart(2, "0")} — Rota ${cidade}`,
		m: "Motorista Parceiro",
		e: counts.total,
		ok: counts.delivered,
		st: counts.delivered === counts.total ? "Concluída" : "Em rota",
		cor: counts.delivered === counts.total ? "success" : "info"
	}));
	const displayRoutes = rotasReais.length > 0 ? rotasReais.map((r) => {
		const rVendas = vendas.filter((v) => v.rota_id === r.id);
		const total = rVendas.length || 1;
		const delivered = rVendas.filter((v) => v.status === "Entregue").length;
		return {
			v: `${r.veiculo}`,
			m: r.motorista,
			e: rVendas.length,
			ok: delivered,
			st: delivered > 0 && delivered === total ? "Concluída" : "Em rota",
			cor: delivered > 0 && delivered === total ? "success" : "info"
		};
	}) : dynamicRoutes;
	const tones = {
		info: "bg-info/15 text-info border-0",
		success: "bg-success/15 text-success border-0",
		warning: "bg-warning/15 text-warning border-0"
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Logística",
			subtitle: "Frota, rotas e entregas",
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
					open: openRelatorio,
					onOpenChange: setOpenRelatorio,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "outline",
							className: "bg-background text-foreground hover:bg-accent",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "mr-2 h-4 w-4" }), " Relatório"]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
						className: "sm:max-w-[700px] max-h-[85vh] flex flex-col",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Relatório de Rotas de Entrega" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-4 py-4 overflow-hidden",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-3 gap-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "border rounded-lg p-3 bg-card shadow-sm",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm text-muted-foreground font-medium",
											children: "Total de Rotas"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-2xl font-bold",
											children: rotasReais.length
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "border rounded-lg p-3 bg-info/10 border-info/20 shadow-sm",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm text-info font-medium",
											children: "Rotas Ativas"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-2xl font-bold text-info",
											children: rotasReais.filter((r) => vendas.some((v) => v.rota_id === r.id && v.status !== "Entregue")).length
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "border rounded-lg p-3 bg-success/10 border-success/20 shadow-sm",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm text-success font-medium",
											children: "Rotas Concluídas"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-2xl font-bold text-success",
											children: rotasReais.filter((r) => vendas.some((v) => v.rota_id === r.id) && vendas.every((v) => v.rota_id !== r.id || v.status === "Entregue")).length
										})]
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "border rounded-md flex-1 overflow-hidden",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollArea, {
									className: "h-[300px]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, {
										className: "bg-secondary/50 sticky top-0",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Motorista" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Veículo" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Data" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Progresso" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { className: "w-[50px]" })
										] })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: rotasReais.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
										colSpan: 5,
										className: "text-center text-muted-foreground py-8",
										children: "Nenhuma rota registrada."
									}) }) : rotasReais.map((rota) => {
										const pedidosDaRota = vendas.filter((v) => v.rota_id === rota.id);
										const totalPedidos = pedidosDaRota.length;
										const entregues = pedidosDaRota.filter((v) => v.status === "Entregue").length;
										const dataSaida = rota.created_at ? new Date(rota.created_at).toLocaleDateString("pt-BR") : "-";
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
												className: "font-medium",
												children: rota.motorista
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: rota.veiculo }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: dataSaida }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "flex-1 h-2 bg-secondary rounded-full overflow-hidden",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "h-full bg-success",
														style: { width: totalPedidos > 0 ? `${entregues / totalPedidos * 100}%` : "0%" }
													})
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "text-xs font-medium text-muted-foreground",
													children: [
														entregues,
														"/",
														totalPedidos
													]
												})]
											}) }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												variant: "ghost",
												size: "icon",
												onClick: () => handleExcluirRota(rota.id),
												className: "h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
											}) })
										] }, rota.id);
									}) })] })
								})
							})]
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
					open: openNovaRota,
					onOpenChange: setOpenNovaRota,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							className: "bg-gradient-brand text-primary-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-2 h-4 w-4" }), " Nova rota"]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
						className: "sm:max-w-[500px]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Montar Romaneio de Carga" }) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-4 py-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-2 gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Motorista responsável" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											value: motoristaRota,
											onChange: (e) => setMotoristaRota(e.target.value),
											placeholder: "Ex: João Souza"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Veículo" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											value: veiculoRota,
											onChange: (e) => setVeiculoRota(e.target.value),
											placeholder: "Ex: VW Delivery (ABC-1234)"
										})]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Pedidos Disponíveis para Rota" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "border rounded-md max-h-[200px] overflow-y-auto p-2 space-y-2",
										children: vendas.filter((v) => v.status !== "Entregue" && v.status !== "Em Transporte" && !v.rota_id).length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm text-muted-foreground p-2",
											children: "Nenhum pedido pendente sem rota atribuída."
										}) : vendas.filter((v) => v.status !== "Entregue" && v.status !== "Em Transporte" && !v.rota_id).map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center space-x-2 bg-secondary/50 p-2 rounded",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
												id: `chk-${v.id}`,
												checked: pedidosSelecionados.includes(v.id),
												onCheckedChange: (checked) => {
													if (checked) setPedidosSelecionados([...pedidosSelecionados, v.id]);
													else setPedidosSelecionados(pedidosSelecionados.filter((id) => id !== v.id));
												}
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
												htmlFor: `chk-${v.id}`,
												className: "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer",
												children: [
													v.clientes?.nome,
													" - ",
													v.clientes?.cidade
												]
											})]
										}, v.id))
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-end gap-2 mt-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "outline",
									onClick: () => setOpenNovaRota(false),
									children: "Cancelar"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									className: "bg-gradient-brand text-primary-foreground",
									onClick: handleNovaRota,
									children: "Criar Rota"
								})]
							})
						]
					})]
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-4 sm:grid-cols-4 mb-6",
			children: [
				{
					l: "Entregas do dia",
					v: String(vendas.length),
					i: Truck,
					c: "text-primary"
				},
				{
					l: "Concluídas",
					v: String(delivered),
					i: CircleCheck,
					c: "text-success"
				},
				{
					l: "Em rota",
					v: String(inTransit),
					i: Clock,
					c: "text-info"
				},
				{
					l: "Pendentes",
					v: String(pending),
					i: MapPin,
					c: "text-warning"
				}
			].map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "shadow-card",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "p-5 flex items-center gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(k.i, { className: `h-8 w-8 ${k.c}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: k.l
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: `font-display text-2xl font-bold ${k.c}`,
						children: k.v
					})] })]
				})
			}, k.l))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-6 lg:grid-cols-3 mb-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "lg:col-span-2 shadow-card overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Mapa de entregas (Visão Geral)" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative h-[250px] rounded-xl border bg-gradient-to-br from-accent/40 to-secondary overflow-hidden",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
						viewBox: "0 0 100 100",
						className: "absolute inset-0 h-full w-full opacity-30",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
								d: "M10 40 Q 25 30, 40 45 T 70 38 Q 85 30, 95 50",
								stroke: "#166534",
								strokeWidth: "0.3",
								fill: "none"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
								d: "M15 70 Q 35 55, 55 65 T 90 60",
								stroke: "#22C55E",
								strokeWidth: "0.3",
								fill: "none"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
								d: "M5 25 Q 30 15, 50 30 T 95 20",
								stroke: "#92400E",
								strokeWidth: "0.3",
								fill: "none"
							})
						]
					}), dynamicCities.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "absolute -translate-x-1/2 -translate-y-1/2",
						style: {
							left: c.x,
							top: c.y
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/30 animate-ping" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "relative h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-brand text-primary-foreground grid place-items-center text-xs font-bold shadow-elevated",
								children: c.q
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "absolute left-5 -top-2 whitespace-nowrap rounded-md bg-card border px-2 py-0.5 text-xs font-semibold shadow-card",
							children: c.c
						})]
					}, c.c))]
				}) })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "shadow-card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Rotas do dia" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
					className: "space-y-3 overflow-y-auto max-h-[250px] pr-2",
					children: displayRoutes.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-center text-muted-foreground text-sm py-4",
						children: "Nenhuma rota ativa no momento."
					}) : displayRoutes.map((r, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 pr-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-semibold text-sm truncate",
									children: r.v
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs text-muted-foreground",
									children: ["Motorista: ", r.m]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								className: tones[r.cor],
								children: r.st
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between text-xs mb-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground",
									children: "Progresso"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-semibold",
									children: [
										r.ok,
										"/",
										r.e
									]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-2 rounded-full bg-secondary overflow-hidden",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-full bg-gradient-brand transition-all duration-500",
									style: { width: `${r.ok / r.e * 100}%` }
								})
							})]
						})]
					}, r.v + i))
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "shadow-card overflow-x-auto",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Pedidos para Entrega" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Pedido Nº" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Cliente" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Local" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Status" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
					className: "text-right",
					children: "Ação"
				})
			] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
				colSpan: 5,
				className: "text-center py-4",
				children: "Carregando entregas..."
			}) }) : vendas.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
				colSpan: 5,
				className: "text-center py-4 text-muted-foreground",
				children: "Nenhum pedido de venda encontrado."
			}) }) : vendas.map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					className: "font-mono text-xs",
					children: v.id.substring(0, 8).toUpperCase()
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					className: "font-semibold",
					children: v.clientes?.nome || "Cliente não informado"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: v.clientes?.cidade || "Endereço não cadastrado" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: (() => {
					let badgeText = "Pendente";
					let badgeColor = "border-warning text-warning";
					if (v.status === "Entregue") {
						badgeText = "Concluída";
						badgeColor = "border-success text-success bg-success/10 hover:bg-success/20";
					} else if (v.status === "Em Transporte") {
						badgeText = v.rota_id ? "Em Rota (Veículo)" : "Em Rota";
						badgeColor = v.rota_id ? "border-indigo-500 text-indigo-600 bg-indigo-50 hover:bg-indigo-100" : "border-info text-info bg-info/10 hover:bg-info/20";
					}
					const badgeElement = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: "outline",
						className: `transition-colors ${v.status !== "Pendente" ? "cursor-pointer" : ""} ${badgeColor}`,
						children: badgeText
					});
					if (v.status === "Pendente") return badgeElement;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Popover, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverTrigger, {
						asChild: true,
						children: badgeElement
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverContent, {
						className: "w-64 p-3 shadow-elevated",
						side: "top",
						children: (() => {
							if (!v.rota_id) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
									className: "font-semibold text-sm border-b pb-1",
									children: "Despacho Simplificado"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-sm space-y-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground font-medium",
											children: "Motorista:"
										}), " Padrão (Sem Romaneio)"] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground font-medium",
											children: "Veículo:"
										}), " Frota Padrão"] }),
										v.status === "Entregue" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-success font-semibold mt-2 text-xs flex items-center gap-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "w-3 h-3" }), " Pacote entregue ao cliente."]
										})
									]
								})]
							});
							const rotaInfo = rotasReais.find((r) => r.id === v.rota_id);
							if (!rotaInfo) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground",
								children: "Buscando informações do veículo..."
							});
							const horarioSaida = rotaInfo.created_at ? new Date(rotaInfo.created_at).toLocaleTimeString("pt-BR", {
								hour: "2-digit",
								minute: "2-digit"
							}) : "Agora";
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
									className: "font-semibold text-sm border-b pb-1",
									children: "Detalhes do Romaneio"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-sm space-y-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-muted-foreground font-medium",
												children: "Motorista:"
											}),
											" ",
											rotaInfo.motorista
										] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-muted-foreground font-medium",
												children: "Veículo:"
											}),
											" ",
											rotaInfo.veiculo
										] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-muted-foreground font-medium",
												children: "Horário de Saída:"
											}),
											" ",
											horarioSaida
										] }),
										v.status === "Entregue" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-success font-semibold mt-2 text-xs flex items-center gap-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "w-3 h-3" }), " Pacote entregue ao cliente."]
										})
									]
								})]
							});
						})()
					})] });
				})() }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					className: "text-right",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-end items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								size: "sm",
								variant: "outline",
								className: "text-slate-600",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: `/declaracao/${v.id}`,
									target: "_blank",
									rel: "noopener noreferrer",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "h-4 w-4 mr-2" }), " Etiqueta"]
								})
							}),
							v.status !== "Entregue" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [v.status !== "Em Transporte" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								onClick: () => handleEmRota(v.id),
								size: "sm",
								variant: "outline",
								className: "text-info hover:bg-info/10",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Truck, { className: "h-4 w-4 mr-2" }), " Em Rota"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								onClick: () => handleEntregar(v.id),
								size: "sm",
								variant: "outline",
								className: "text-primary hover:bg-primary/10",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4 mr-2" }), " Entregue"]
							})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground text-sm font-semibold ml-2",
								children: "Realizada"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								onClick: () => handleExcluir(v.id),
								size: "icon",
								variant: "ghost",
								className: "h-8 w-8 ml-1 text-destructive",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
							})
						]
					})
				})
			] }, v.id)) })] })]
		})
	] });
}
//#endregion
export { Logistica as component };

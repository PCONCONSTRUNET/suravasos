import { i as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./supabase-B8pFCf1w.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { F as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { n as buttonVariants, t as Button } from "./button-BkEeRci-.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { t as Badge } from "./badge-D1Dupn2y.mjs";
import { S as PiggyBank, c as TrendingUp, ct as ChevronRight, dt as Check, l as TrendingDown, lt as ChevronLeft, mt as Calendar$1, n as Wallet, u as Trash2, ut as ChevronDown } from "../_libs/lucide-react.mjs";
import { n as PageHeader } from "./app-shell-BDkgzrqS.mjs";
import { a as CardTitle, i as CardHeader, n as CardContent, r as CardDescription, t as Card } from "./card-CtX3ithx.mjs";
import { n as PopoverContent, r as PopoverTrigger, t as Popover } from "./popover-Cmlz_mk1.mjs";
import { t as Label } from "./label-DBD1bRRP.mjs";
import { n as useConfirm } from "./ConfirmContext-CIaV5wVt.mjs";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-C0WYWEQX.mjs";
import { a as YAxis, f as ResponsiveContainer, l as CartesianGrid, o as XAxis, p as Tooltip, r as BarChart, s as Area, t as AreaChart, u as Bar } from "../_libs/recharts+[...].mjs";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, t as Dialog } from "./dialog-DIo89e4g.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-Dg1urBTx.mjs";
import { n as getDefaultClassNames, t as DayPicker } from "../_libs/react-day-picker.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app.financeiro-CcKcJ78B.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Calendar({ className, classNames, showOutsideDays = true, captionLayout = "label", buttonVariant = "ghost", formatters, components, ...props }) {
	const defaultClassNames = getDefaultClassNames();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DayPicker, {
		showOutsideDays,
		className: cn("bg-background group/calendar p-3 [--cell-size:2rem] [[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent", String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`, String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`, className),
		captionLayout,
		formatters: {
			formatMonthDropdown: (date) => date.toLocaleString("default", { month: "short" }),
			...formatters
		},
		classNames: {
			root: cn("w-fit", defaultClassNames.root),
			months: cn("relative flex flex-col gap-4 md:flex-row", defaultClassNames.months),
			month: cn("flex w-full flex-col gap-4", defaultClassNames.month),
			nav: cn("absolute inset-x-0 top-0 flex w-full items-center justify-between gap-1", defaultClassNames.nav),
			button_previous: cn(buttonVariants({ variant: buttonVariant }), "h-(--cell-size) w-(--cell-size) select-none p-0 aria-disabled:opacity-50", defaultClassNames.button_previous),
			button_next: cn(buttonVariants({ variant: buttonVariant }), "h-(--cell-size) w-(--cell-size) select-none p-0 aria-disabled:opacity-50", defaultClassNames.button_next),
			month_caption: cn("flex h-(--cell-size) w-full items-center justify-center px-(--cell-size)", defaultClassNames.month_caption),
			dropdowns: cn("flex h-(--cell-size) w-full items-center justify-center gap-1.5 text-sm font-medium", defaultClassNames.dropdowns),
			dropdown_root: cn("has-focus:border-ring border-input shadow-xs has-focus:ring-ring/50 has-focus:ring-[3px] relative rounded-md border", defaultClassNames.dropdown_root),
			dropdown: cn("bg-popover absolute inset-0 opacity-0", defaultClassNames.dropdown),
			caption_label: cn("select-none font-medium", captionLayout === "label" ? "text-sm" : "[&>svg]:text-muted-foreground flex h-8 items-center gap-1 rounded-md pl-2 pr-1 text-sm [&>svg]:size-3.5", defaultClassNames.caption_label),
			table: "w-full border-collapse",
			weekdays: cn("flex", defaultClassNames.weekdays),
			weekday: cn("text-muted-foreground flex-1 select-none rounded-md text-[0.8rem] font-normal", defaultClassNames.weekday),
			week: cn("mt-2 flex w-full", defaultClassNames.week),
			week_number_header: cn("w-(--cell-size) select-none", defaultClassNames.week_number_header),
			week_number: cn("text-muted-foreground select-none text-[0.8rem]", defaultClassNames.week_number),
			day: cn("group/day relative aspect-square h-full w-full select-none p-0 text-center [&:first-child[data-selected=true]_button]:rounded-l-md [&:last-child[data-selected=true]_button]:rounded-r-md", defaultClassNames.day),
			range_start: cn("bg-accent rounded-l-md", defaultClassNames.range_start),
			range_middle: cn("rounded-none", defaultClassNames.range_middle),
			range_end: cn("bg-accent rounded-r-md", defaultClassNames.range_end),
			today: cn("bg-accent text-accent-foreground rounded-md data-[selected=true]:rounded-none", defaultClassNames.today),
			outside: cn("text-muted-foreground aria-selected:text-muted-foreground", defaultClassNames.outside),
			disabled: cn("text-muted-foreground opacity-50", defaultClassNames.disabled),
			hidden: cn("invisible", defaultClassNames.hidden),
			...classNames
		},
		components: {
			Root: ({ className, rootRef, ...props }) => {
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"data-slot": "calendar",
					ref: rootRef,
					className: cn(className),
					...props
				});
			},
			Chevron: ({ className, orientation, ...props }) => {
				if (orientation === "left") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, {
					className: cn("size-4", className),
					...props
				});
				if (orientation === "right") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {
					className: cn("size-4", className),
					...props
				});
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, {
					className: cn("size-4", className),
					...props
				});
			},
			DayButton: CalendarDayButton,
			WeekNumber: ({ children, ...props }) => {
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
					...props,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex size-(--cell-size) items-center justify-center text-center",
						children
					})
				});
			},
			...components
		},
		...props
	});
}
function CalendarDayButton({ className, day, modifiers, ...props }) {
	const defaultClassNames = getDefaultClassNames();
	const ref = import_react.useRef(null);
	import_react.useEffect(() => {
		if (modifiers.focused) ref.current?.focus();
	}, [modifiers.focused]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		ref,
		variant: "ghost",
		size: "icon",
		"data-day": day.date.toLocaleDateString(),
		"data-selected-single": modifiers.selected && !modifiers.range_start && !modifiers.range_end && !modifiers.range_middle,
		"data-range-start": modifiers.range_start,
		"data-range-end": modifiers.range_end,
		"data-range-middle": modifiers.range_middle,
		className: cn("data-[selected-single=true]:bg-primary data-[selected-single=true]:text-primary-foreground data-[range-middle=true]:bg-accent data-[range-middle=true]:text-accent-foreground data-[range-start=true]:bg-primary data-[range-start=true]:text-primary-foreground data-[range-end=true]:bg-primary data-[range-end=true]:text-primary-foreground group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-ring/50 flex aspect-square h-auto w-full min-w-(--cell-size) flex-col gap-1 font-normal leading-none data-[range-end=true]:rounded-md data-[range-middle=true]:rounded-none data-[range-start=true]:rounded-md group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:ring-[3px] [&>span]:text-xs [&>span]:opacity-70", defaultClassNames.day, className),
		...props
	});
}
function Financeiro() {
	const confirm = useConfirm();
	const [receitas, setReceitas] = (0, import_react.useState)([]);
	const [despesas, setDespesas] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [openModal, setOpenModal] = (0, import_react.useState)(false);
	const [tipoLancamento, setTipoLancamento] = (0, import_react.useState)("receita");
	const [descricao, setDescricao] = (0, import_react.useState)("");
	const [valor, setValor] = (0, import_react.useState)("");
	const [vencimento, setVencimento] = (0, import_react.useState)("");
	const [statusLancamento, setStatusLancamento] = (0, import_react.useState)("Pendente");
	const [salvando, setSalvando] = (0, import_react.useState)(false);
	const [dateFilter, setDateFilter] = (0, import_react.useState)({
		from: /* @__PURE__ */ new Date(Date.now() - 720 * 60 * 60 * 1e3),
		to: /* @__PURE__ */ new Date()
	});
	const fetchFinanceiro = async () => {
		try {
			const { data: rec } = await supabase.from("contas_receber").select("*").order("created_at", { ascending: false });
			const { data: des } = await supabase.from("contas_pagar").select("*").order("created_at", { ascending: false });
			if (rec) setReceitas(rec);
			if (des) setDespesas(des);
		} catch (err) {
			console.error(err);
		} finally {
			setLoading(false);
		}
	};
	(0, import_react.useEffect)(() => {
		fetchFinanceiro();
	}, []);
	const handleBaixa = async (id, tipo) => {
		if (!await confirm({
			description: "Deseja confirmar o pagamento/recebimento deste título?",
			variant: "default"
		})) return;
		try {
			const tabela = tipo === "receber" ? "contas_receber" : "contas_pagar";
			const statusFinal = tipo === "receber" ? "Recebido" : "Pago";
			const dataHoje = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
			await supabase.from(tabela).update({
				status: statusFinal,
				data_pagamento: dataHoje
			}).eq("id", id);
			fetchFinanceiro();
		} catch (err) {
			alert("Erro ao dar baixa.");
		}
	};
	const handleExcluir = async (id, tipo) => {
		if (!await confirm({
			description: "Deseja excluir este lançamento permanentemente?",
			variant: "destructive"
		})) return;
		try {
			const tabela = tipo === "receber" ? "contas_receber" : "contas_pagar";
			await supabase.from(tabela).delete().eq("id", id);
			fetchFinanceiro();
		} catch (err) {
			alert("Erro ao excluir lançamento.");
		}
	};
	const handleSalvarLancamento = async () => {
		if (!descricao || !valor || !vencimento) return alert("Preencha todos os campos.");
		setSalvando(true);
		try {
			const tabela = tipoLancamento === "receita" ? "contas_receber" : "contas_pagar";
			await supabase.from(tabela).insert([{
				descricao,
				valor: Number(valor.replace(",", ".")),
				vencimento,
				status: statusLancamento,
				data_pagamento: statusLancamento !== "Pendente" ? (/* @__PURE__ */ new Date()).toISOString().split("T")[0] : null
			}]);
			setOpenModal(false);
			setDescricao("");
			setValor("");
			setVencimento("");
			setStatusLancamento("Pendente");
			fetchFinanceiro();
		} catch (error) {
			console.error(error);
			alert("Erro ao salvar lançamento.");
		} finally {
			setSalvando(false);
		}
	};
	const openLancamento = (tipo) => {
		setTipoLancamento(tipo);
		setStatusLancamento("Pendente");
		setOpenModal(true);
	};
	const lancamentos = [...receitas.map((r) => ({
		...r,
		tipo: "receber",
		neg: false,
		c: "Receita"
	})), ...despesas.map((d) => ({
		...d,
		tipo: "pagar",
		neg: true,
		c: "Despesa"
	}))].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).filter((r) => {
		if (!dateFilter?.from || !dateFilter?.to) return true;
		const d = new Date(r.created_at).getTime();
		const to = new Date(dateFilter.to);
		to.setHours(23, 59, 59, 999);
		return d >= dateFilter.from.getTime() && d <= to.getTime();
	});
	const receitasFiltradas = receitas.filter((r) => {
		if (!dateFilter?.from || !dateFilter?.to) return true;
		const d = new Date(r.created_at).getTime();
		const to = new Date(dateFilter.to);
		to.setHours(23, 59, 59, 999);
		return d >= dateFilter.from.getTime() && d <= to.getTime();
	});
	const despesasFiltradas = despesas.filter((d) => {
		if (!dateFilter?.from || !dateFilter?.to) return true;
		const data = new Date(d.created_at).getTime();
		const to = new Date(dateFilter.to);
		to.setHours(23, 59, 59, 999);
		return data >= dateFilter.from.getTime() && data <= to.getTime();
	});
	const totalReceitas = receitasFiltradas.filter((r) => r.status === "Recebido").reduce((acc, curr) => acc + Number(curr.valor), 0);
	const totalDespesas = despesasFiltradas.filter((d) => d.status === "Pago").reduce((acc, curr) => acc + Number(curr.valor), 0);
	const lucro = totalReceitas - totalDespesas;
	const caixa = receitas.filter((r) => r.status === "Recebido").reduce((acc, curr) => acc + Number(curr.valor), 0) - despesas.filter((d) => d.status === "Pago").reduce((acc, curr) => acc + Number(curr.valor), 0);
	const pendenteReceber = receitasFiltradas.filter((r) => r.status === "Pendente").reduce((acc, curr) => acc + Number(curr.valor), 0);
	const pendentePagar = despesasFiltradas.filter((d) => d.status === "Pendente").reduce((acc, curr) => acc + Number(curr.valor), 0);
	const rangeDiff = dateFilter?.to && dateFilter?.from ? dateFilter.to.getTime() - dateFilter.from.getTime() : 720 * 60 * 60 * 1e3;
	const segmentDuration = Math.max(rangeDiff / 4, 1440 * 60 * 1e3);
	const baseTime = dateFilter?.to ? dateFilter.to.getTime() : Date.now();
	const flow = Array.from({ length: 4 }).map((_, i) => {
		const end = /* @__PURE__ */ new Date(baseTime - (3 - i) * segmentDuration);
		const start = new Date(end.getTime() - segmentDuration);
		const recSeg = receitas.filter((r) => new Date(r.created_at) >= start && new Date(r.created_at) < end);
		const desSeg = despesas.filter((d) => new Date(d.created_at) >= start && new Date(d.created_at) < end);
		return {
			d: `Per. ${i + 1}`,
			e: recSeg.reduce((sum, r) => sum + Number(r.valor), 0),
			s: desSeg.reduce((sum, d) => sum + Number(d.valor), 0)
		};
	});
	const renderDatePicker = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Popover, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverTrigger, {
		asChild: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			variant: "outline",
			className: `justify-start text-left font-normal ${!dateFilter?.from ? "text-muted-foreground" : ""}`,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar$1, { className: "mr-2 h-4 w-4" }), dateFilter?.from ? dateFilter.to ? `${dateFilter.from.toLocaleDateString("pt-BR")} - ${dateFilter.to.toLocaleDateString("pt-BR")}` : dateFilter.from.toLocaleDateString("pt-BR") : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Selecione um período" })]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverContent, {
		className: "w-auto p-0",
		align: "end",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, {
			initialFocus: true,
			mode: "range",
			defaultMonth: dateFilter?.from,
			selected: {
				from: dateFilter?.from,
				to: dateFilter?.to
			},
			onSelect: (range) => setDateFilter(range || {
				from: void 0,
				to: void 0
			}),
			numberOfMonths: 2
		})
	})] });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Financeiro",
			subtitle: "Caixa, fluxo, contas a pagar e a receber",
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2 items-center flex-wrap",
				children: [
					renderDatePicker(),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						className: "text-success border-success/30 hover:bg-success/10",
						onClick: () => openLancamento("receita"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "mr-2 h-4 w-4" }), " Nova Receita"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						className: "text-destructive border-destructive/30 hover:bg-destructive/10",
						onClick: () => openLancamento("despesa"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingDown, { className: "mr-2 h-4 w-4" }), " Nova Despesa"]
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6",
			children: [
				{
					l: "Caixa atual",
					v: `R$ ${caixa.toLocaleString("pt-BR", {
						minimumFractionDigits: 2,
						maximumFractionDigits: 2
					})}`,
					c: "text-primary",
					bg: "bg-primary/10",
					i: Wallet
				},
				{
					l: "Total Recebido (Mês)",
					v: `R$ ${totalReceitas.toLocaleString("pt-BR", {
						minimumFractionDigits: 2,
						maximumFractionDigits: 2
					})}`,
					sub: `+ R$ ${pendenteReceber.toFixed(2)} previstos`,
					c: "text-success",
					bg: "bg-success/15",
					i: TrendingUp
				},
				{
					l: "Total Pago (Mês)",
					v: `R$ ${totalDespesas.toLocaleString("pt-BR", {
						minimumFractionDigits: 2,
						maximumFractionDigits: 2
					})}`,
					sub: `+ R$ ${pendentePagar.toFixed(2)} previstos`,
					c: "text-destructive",
					bg: "bg-destructive/10",
					i: TrendingDown
				},
				{
					l: "Lucro Líquido",
					v: `R$ ${lucro.toLocaleString("pt-BR", {
						minimumFractionDigits: 2,
						maximumFractionDigits: 2
					})}`,
					c: lucro >= 0 ? "text-info" : "text-destructive",
					bg: "bg-info/10",
					i: PiggyBank
				}
			].map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "shadow-card",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: `grid h-10 w-10 place-items-center rounded-lg ${k.bg}`,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(k.i, { className: `h-5 w-5 ${k.c}` })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-sm font-medium text-muted-foreground",
							children: k.l
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: `mt-1 font-display text-2xl font-bold ${k.c}`,
							children: k.v
						}),
						k.sub && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-muted-foreground",
							children: k.sub
						})
					]
				})
			}, k.l))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-6 lg:grid-cols-2 mb-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "shadow-card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Fluxo de caixa" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Últimas 4 semanas" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
					width: "100%",
					height: 260,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AreaChart, {
						data: flow,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
								id: "fe",
								x1: "0",
								y1: "0",
								x2: "0",
								y2: "1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
									offset: "0%",
									stopColor: "#22C55E",
									stopOpacity: .4
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
									offset: "100%",
									stopColor: "#22C55E",
									stopOpacity: 0
								})]
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
								strokeDasharray: "3 3",
								stroke: "#e2e8f0",
								vertical: false
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
								dataKey: "d",
								stroke: "#64748b",
								fontSize: 12,
								tickLine: false,
								axisLine: false
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
								stroke: "#64748b",
								fontSize: 12,
								tickLine: false,
								axisLine: false,
								tickFormatter: (v) => `R$ ${v / 1e3}k`
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
								contentStyle: { borderRadius: 12 },
								formatter: (value) => `R$ ${value.toFixed(2)}`
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
								type: "monotone",
								dataKey: "e",
								stroke: "#22C55E",
								strokeWidth: 2.5,
								fill: "url(#fe)"
							})
						]
					})
				}) })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "shadow-card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Receitas × Despesas" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Evolução por semana" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
					width: "100%",
					height: 260,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
						data: flow,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
								strokeDasharray: "3 3",
								stroke: "#e2e8f0",
								vertical: false
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
								dataKey: "d",
								stroke: "#64748b",
								fontSize: 12,
								tickLine: false,
								axisLine: false
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
								stroke: "#64748b",
								fontSize: 12,
								tickLine: false,
								axisLine: false,
								tickFormatter: (v) => `R$ ${v / 1e3}k`
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
								contentStyle: { borderRadius: 12 },
								formatter: (value) => `R$ ${value.toFixed(2)}`
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
								dataKey: "e",
								name: "Receitas",
								fill: "#22C55E",
								radius: [
									6,
									6,
									0,
									0
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
								dataKey: "s",
								name: "Despesas",
								fill: "#EF4444",
								radius: [
									6,
									6,
									0,
									0
								]
							})
						]
					})
				}) })]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "shadow-card overflow-x-auto",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
				className: "flex flex-row items-center justify-between space-y-0 pb-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Lançamentos" }), renderDatePicker()]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Emissão" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Descrição" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Vencimento" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Status" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
					className: "text-right",
					children: "Valor"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
					className: "text-center",
					children: "Ações"
				})
			] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
				colSpan: 6,
				className: "text-center py-4",
				children: "Carregando..."
			}) }) : lancamentos.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
				colSpan: 6,
				className: "text-center py-4 text-muted-foreground",
				children: "Nenhum lançamento encontrado."
			}) }) : lancamentos.map((r, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: new Date(r.created_at).toLocaleDateString("pt-BR") }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					className: "font-medium",
					children: r.descricao
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: new Date(r.vencimento).toLocaleDateString("pt-BR") }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					variant: "outline",
					className: r.status === "Recebido" || r.status === "Pago" ? "border-success text-success bg-success/10" : "border-warning text-warning bg-warning/10",
					children: r.status
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
					className: `text-right font-bold ${r.neg ? "text-destructive" : "text-success"}`,
					children: [
						r.neg ? "-" : "+",
						" R$ ",
						Number(r.valor).toLocaleString("pt-BR", {
							minimumFractionDigits: 2,
							maximumFractionDigits: 2
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					className: "text-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-center gap-2",
						children: [r.status === "Pendente" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: () => handleBaixa(r.id, r.tipo),
							size: "icon",
							variant: "outline",
							className: "h-8 w-8 text-primary",
							title: "Dar baixa",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: () => handleExcluir(r.id, r.tipo),
							size: "icon",
							variant: "outline",
							className: "h-8 w-8 text-destructive border-destructive/20 hover:bg-destructive/10 hover:text-destructive",
							title: "Excluir",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
						})]
					})
				})
			] }, i)) })] })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
			open: openModal,
			onOpenChange: setOpenModal,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: tipoLancamento === "receita" ? "Nova Receita" : "Nova Despesa" }) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4 py-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Descrição" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								placeholder: "Ex: Conta de Luz, Aluguel...",
								value: descricao,
								onChange: (e) => setDescricao(e.target.value)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Status" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: statusLancamento,
								onValueChange: setStatusLancamento,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Selecione o status" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "Pendente",
									children: "Pendente"
								}), tipoLancamento === "receita" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "Recebido",
									children: "Recebido (Pago ao sistema)"
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "Pago",
									children: "Pago (Despesa quitada)"
								})] })]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Valor (R$)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "number",
									placeholder: "0.00",
									value: valor,
									onChange: (e) => setValor(e.target.value)
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Data de Vencimento" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "date",
									value: vencimento,
									onChange: (e) => setVencimento(e.target.value)
								})]
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					onClick: () => setOpenModal(false),
					children: "Cancelar"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: handleSalvarLancamento,
					disabled: salvando,
					className: tipoLancamento === "receita" ? "bg-success hover:bg-success/90 text-white" : "bg-destructive hover:bg-destructive/90 text-white",
					children: salvando ? "Salvando..." : "Salvar Lançamento"
				})] })
			] })
		})
	] });
}
//#endregion
export { Financeiro as component };

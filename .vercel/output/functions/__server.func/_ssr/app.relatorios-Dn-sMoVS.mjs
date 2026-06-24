import { i as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./supabase-Bvu1xBCC.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { F as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as Button } from "./button-BkEeRci-.mjs";
import { G as Download, H as FileSpreadsheet, K as DollarSign, T as Package, V as FileText, dt as ChartColumn, r as Users } from "../_libs/lucide-react.mjs";
import { n as PageHeader } from "./app-shell-CIo6-35-.mjs";
import { a as CardTitle, i as CardHeader, n as CardContent, r as CardDescription, t as Card } from "./card-CtX3ithx.mjs";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-C0WYWEQX.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-Dg1urBTx.mjs";
import { a as YAxis, c as Line, f as ResponsiveContainer, i as LineChart, l as CartesianGrid, o as XAxis, p as Tooltip, r as BarChart, u as Bar } from "../_libs/recharts+[...].mjs";
import { a as DialogHeader, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-DIo89e4g.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app.relatorios-Dn-sMoVS.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Relatorios() {
	const [vendas, setVendas] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [selectedReport, setSelectedReport] = (0, import_react.useState)(null);
	const [periodo, setPeriodo] = (0, import_react.useState)("6m");
	(0, import_react.useEffect)(() => {
		async function fetchVendas() {
			const { data } = await supabase.from("vendas").select("*, clientes(nome)").in("tipo", ["VENDA", "PDV"]);
			if (data) setVendas(data);
			setLoading(false);
		}
		fetchVendas();
	}, []);
	const totalFaturamento = vendas.reduce((acc, v) => acc + Number(v.valor_total), 0);
	const totalPedidos = vendas.length;
	const ticketMedio = totalPedidos > 0 ? totalFaturamento / totalPedidos : 0;
	const getChartData = () => {
		if (vendas.length === 0) return [];
		const sorted = [...vendas].sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
		if (periodo === "7d" || periodo === "30d") {
			const days = periodo === "7d" ? 7 : 30;
			const dataMap = /* @__PURE__ */ new Map();
			const now = /* @__PURE__ */ new Date();
			for (let i = days - 1; i >= 0; i--) {
				const d = new Date(now);
				d.setDate(d.getDate() - i);
				const dateStr = d.toLocaleDateString("pt-BR", {
					day: "2-digit",
					month: "2-digit"
				});
				dataMap.set(dateStr, {
					v: 0,
					c: 0
				});
			}
			sorted.forEach((v) => {
				const dateStr = new Date(v.created_at).toLocaleDateString("pt-BR", {
					day: "2-digit",
					month: "2-digit"
				});
				if (dataMap.has(dateStr)) {
					const curr = dataMap.get(dateStr);
					dataMap.set(dateStr, {
						v: curr.v + Number(v.valor_total),
						c: curr.c + 1
					});
				}
			});
			return Array.from(dataMap.entries()).map(([m, data]) => ({
				m,
				v: data.v,
				c: data.c
			}));
		} else {
			const months = periodo === "6m" ? 6 : 12;
			const dataMap = /* @__PURE__ */ new Map();
			const now = /* @__PURE__ */ new Date();
			for (let i = months - 1; i >= 0; i--) {
				const monthStr = new Date(now.getFullYear(), now.getMonth() - i, 1).toLocaleDateString("pt-BR", { month: "short" }).replace(".", "");
				const formattedMonth = monthStr.charAt(0).toUpperCase() + monthStr.slice(1);
				dataMap.set(formattedMonth, {
					v: 0,
					c: 0
				});
			}
			sorted.forEach((v) => {
				const monthStr = new Date(v.created_at).toLocaleDateString("pt-BR", { month: "short" }).replace(".", "");
				const formattedMonth = monthStr.charAt(0).toUpperCase() + monthStr.slice(1);
				if (dataMap.has(formattedMonth)) {
					const curr = dataMap.get(formattedMonth);
					dataMap.set(formattedMonth, {
						v: curr.v + Number(v.valor_total),
						c: curr.c + 1
					});
				}
			});
			return Array.from(dataMap.entries()).map(([m, data]) => ({
				m,
				v: data.v,
				c: data.c
			}));
		}
	};
	const chartData = getChartData();
	const getChartDescription = () => {
		switch (periodo) {
			case "7d": return "Últimos 7 dias";
			case "30d": return "Últimos 30 dias";
			case "1y": return "Acumulado do ano";
			default: return "Último semestre";
		}
	};
	const reports = [
		{
			i: DollarSign,
			t: "Relatório de Vendas",
			d: "Faturamento, ticket médio, comissões"
		},
		{
			i: ChartColumn,
			t: "Relatório Financeiro",
			d: "DRE, fluxo de caixa, inadimplência"
		},
		{
			i: Package,
			t: "Relatório de Estoque",
			d: "Posição, giro, curva ABC"
		},
		{
			i: Users,
			t: "Relatório de Clientes",
			d: "Ativação, recompra, ranking"
		},
		{
			i: FileSpreadsheet,
			t: "Relatório de Produtos",
			d: "Mais vendidos, rentabilidade"
		},
		{
			i: FileText,
			t: "Relatório Fiscal",
			d: "Apuração ICMS, PIS, COFINS"
		}
	];
	const handleVisualizar = (titulo) => {
		setSelectedReport(titulo);
	};
	const handlePDF = (titulo) => {
		toast.success(`PDF Gerado!`, { description: `O ${titulo} está pronto para impressão/salvamento.` });
		setTimeout(() => {
			window.print();
		}, 800);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Relatórios",
			subtitle: "Visões executivas e operacionais em tempo real",
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "w-[180px]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
					value: periodo,
					onValueChange: setPeriodo,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
						className: "bg-white",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Período" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "7d",
							children: "Últimos 7 dias"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "30d",
							children: "Últimos 30 dias"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "6m",
							children: "Últimos 6 meses"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "1y",
							children: "Este ano"
						})
					] })]
				})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 sm:grid-cols-3 mb-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					className: "shadow-card",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						className: "p-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground font-semibold uppercase tracking-wider",
							children: "Faturamento (Hoje)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 font-display text-3xl font-bold text-success",
							children: ["R$ ", totalFaturamento.toFixed(2)]
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					className: "shadow-card",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						className: "p-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground font-semibold uppercase tracking-wider",
							children: "Total de Pedidos"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 font-display text-3xl font-bold text-primary",
							children: totalPedidos
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					className: "shadow-card",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						className: "p-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground font-semibold uppercase tracking-wider",
							children: "Ticket Médio"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 font-display text-3xl font-bold text-info",
							children: ["R$ ", ticketMedio.toFixed(2)]
						})]
					})
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-6 lg:grid-cols-2 mb-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "shadow-card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Faturamento" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: getChartDescription() })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
					width: "100%",
					height: 240,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LineChart, {
						data: chartData,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
								strokeDasharray: "3 3",
								stroke: "#e2e8f0",
								vertical: false
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
								dataKey: "m",
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
								tickFormatter: (v) => `R$${v >= 1e3 ? (v / 1e3).toFixed(1) + "k" : v}`
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
								contentStyle: { borderRadius: 12 },
								formatter: (value) => [`R$ ${Number(value).toFixed(2).replace(".", ",")}`, "Faturamento"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
								type: "monotone",
								dataKey: "v",
								stroke: "#166534",
								strokeWidth: 3,
								dot: {
									fill: "#166534",
									r: 5
								}
							})
						]
					})
				}) })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "shadow-card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Volume de Pedidos" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Tendência de crescimento" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
					width: "100%",
					height: 240,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
						data: chartData,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
								strokeDasharray: "3 3",
								stroke: "#e2e8f0",
								vertical: false
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
								dataKey: "m",
								stroke: "#64748b",
								fontSize: 12,
								tickLine: false,
								axisLine: false
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
								stroke: "#64748b",
								fontSize: 12,
								tickLine: false,
								axisLine: false
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
								cursor: false,
								contentStyle: { borderRadius: 12 },
								formatter: (value) => [`${value} pedidos`, "Volume"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
								dataKey: "c",
								fill: "#22C55E",
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
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-4 md:grid-cols-2 lg:grid-cols-3",
			children: reports.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "shadow-card hover:shadow-elevated transition-shadow cursor-pointer group",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid h-12 w-12 place-items-center rounded-xl bg-gradient-brand text-primary-foreground group-hover:scale-110 transition-transform",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(r.i, { className: "h-6 w-6" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-4 font-display text-lg font-bold",
							children: r.t
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: r.d
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								onClick: () => handleVisualizar(r.t),
								variant: "outline",
								size: "sm",
								children: "Visualizar"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								onClick: () => handlePDF(r.t),
								variant: "ghost",
								size: "sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "mr-1.5 h-3.5 w-3.5" }), "PDF"]
							})]
						})
					]
				})
			}, r.t))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
			open: !!selectedReport,
			onOpenChange: (open) => !open && setSelectedReport(null),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
				className: "max-w-4xl max-h-[85vh] overflow-y-auto",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: selectedReport }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Demonstrativo detalhado gerado em tempo real com dados consolidados." })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 border rounded-md",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Data" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Operação" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Cliente/Info" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								className: "text-right",
								children: "Valor"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								className: "text-right",
								children: "Status"
							})
						] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							colSpan: 5,
							className: "text-center py-4",
							children: "Carregando..."
						}) }) : vendas.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							colSpan: 5,
							className: "text-center py-4 text-muted-foreground",
							children: "Nenhuma venda registrada."
						}) }) : vendas.map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: new Date(v.created_at).toLocaleDateString() }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
								className: "font-medium",
								children: [
									v.tipo,
									" #",
									v.id.substring(0, 8).toUpperCase()
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: v.clientes?.nome || "Consumidor Final" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
								className: "text-right font-medium",
								children: ["R$ ", Number(v.valor_total).toFixed(2).replace(".", ",")]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								className: "text-right",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: `px-2 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-wider ${v.status === "Pago" || v.status === "Faturado" ? "bg-success/10 text-success" : "bg-warning/10 text-warning"}`,
									children: v.status
								})
							})
						] }, v.id)) })] })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 flex justify-end",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							onClick: () => handlePDF(selectedReport || ""),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "mr-2 h-4 w-4" }), " Baixar PDF Completo"]
						})
					})
				]
			})
		})
	] });
}
//#endregion
export { Relatorios as component };

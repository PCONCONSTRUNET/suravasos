import { i as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./supabase-B8pFCf1w.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as Button } from "./button-DiE0A9q4.mjs";
import { r as Badge } from "./dist-Db34orMe.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { J as DollarSign, K as Ellipsis, St as ArrowDownRight, T as Package, c as TrendingUp, f as ShoppingCart, o as Truck, r as Users, s as TriangleAlert, yt as ArrowUpRight } from "../_libs/lucide-react.mjs";
import { r as PageHeader } from "./app-shell-jjiopLig.mjs";
import { a as CardTitle, i as CardHeader, n as CardContent, r as CardDescription, t as Card } from "./card-CtX3ithx.mjs";
import { a as YAxis, d as Pie, f as ResponsiveContainer, l as CartesianGrid, n as PieChart, o as XAxis, p as Tooltip, r as BarChart, s as Area, t as AreaChart, u as Bar } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app.dashboard-CNIipIRZ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function KPI({ icon: Icon, label, value, delta, up = true, tone = "primary" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
		className: "shadow-card",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
			className: "p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: `grid h-10 w-10 place-items-center rounded-lg ${{
							primary: "bg-primary/10 text-primary",
							info: "bg-info/10 text-info",
							success: "bg-success/15 text-success",
							warning: "bg-warning/15 text-warning",
							terra: "bg-terra/10 text-terra",
							destructive: "bg-destructive/10 text-destructive"
						}[tone]}`,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-5 w-5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "icon",
						variant: "ghost",
						className: "h-7 w-7",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ellipsis, { className: "h-4 w-4" })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-sm text-muted-foreground",
					children: label
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 font-display text-2xl font-bold tracking-tight",
					children: value
				}),
				delta && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: `mt-2 flex items-center gap-1 text-xs font-medium ${up ? "text-success" : "text-destructive"}`,
					children: [
						up ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "h-3.5 w-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowDownRight, { className: "h-3.5 w-3.5" }),
						delta,
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted-foreground font-normal",
							children: "vs mês anterior"
						})
					]
				})
			]
		})
	});
}
function Dashboard() {
	const [stats, setStats] = (0, import_react.useState)({
		faturamento: 0,
		pedidosHoje: 0,
		produtosEstoque: 0,
		clientesAtivos: 0,
		entregasPendentes: 0,
		recent: []
	});
	(0, import_react.useEffect)(() => {
		const loadData = async () => {
			const { data: vendasData } = await supabase.from("vendas").select("*").in("tipo", [
				"VENDA",
				"PDV",
				"Afiliado"
			]);
			const { data: produtos } = await supabase.from("produtos").select("*");
			const { count: clientesCount } = await supabase.from("clientes").select("*", {
				count: "exact",
				head: true
			});
			const { data: vendasRecentes } = await supabase.from("vendas").select("*, clientes(nome)").in("tipo", [
				"VENDA",
				"PDV",
				"Afiliado"
			]).order("created_at", { ascending: false }).limit(5);
			const { data: receitas } = await supabase.from("contas_receber").select("valor, status");
			const { data: despesas } = await supabase.from("contas_pagar").select("valor, status");
			const { data: compras } = await supabase.from("compras").select("valor_total, created_at, status");
			let fat = 0;
			let pedHoje = 0;
			let entPend = 0;
			let delivered = 0;
			const hoje = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
			const monthlyVendas = {};
			const monthlyCompras = {};
			vendasData?.forEach((v) => {
				if (v.status !== "Cancelada" && v.status !== "Rejeitada" && v.status_aprovacao !== "Rejeitada") {
					fat += Number(v.valor_total || v.total || 0);
					const month = v.created_at ? v.created_at.substring(0, 7) : "2026-06";
					monthlyVendas[month] = (monthlyVendas[month] || 0) + Number(v.valor_total || v.total || 0);
				}
				if (v.created_at?.startsWith(hoje)) pedHoje++;
				if (v.status === "PENDENTE" || v.status === "Pendente" || v.status === "EM_ROTA" || v.status === "Em Transporte") entPend++;
				if (v.status === "Entregue" || v.status === "Concluída") delivered++;
			});
			compras?.forEach((c) => {
				if (c.status !== "Cancelado") {
					const month = c.created_at ? c.created_at.substring(0, 7) : "2026-06";
					monthlyCompras[month] = (monthlyCompras[month] || 0) + Number(c.valor_total || 0);
				}
			});
			const totalReceitas = receitas?.filter((r) => r.status === "Recebido").reduce((acc, r) => acc + Number(r.valor), 0) || 0;
			const totalDespesas = despesas?.filter((d) => d.status === "Pago").reduce((acc, d) => acc + Number(d.valor), 0) || 0;
			const margin = totalReceitas > 0 ? (totalReceitas - totalDespesas) / totalReceitas * 100 : 0;
			const totalVendasConcluidas = (vendasData?.length || 0) - entPend;
			const otif = totalVendasConcluidas > 0 ? delivered / totalVendasConcluidas * 100 : 100;
			const ticketMedio = (vendasData?.length || 0) > 0 ? fat / vendasData.length : 0;
			const categoryMix = {};
			produtos?.forEach((p) => {
				if (p.categoria) categoryMix[p.categoria] = (categoryMix[p.categoria] || 0) + Number(p.estoque || 0) * Number(p.valor || 0);
			});
			const pieData = Object.entries(categoryMix).filter(([_, v]) => v > 0).map(([k, v]) => ({
				name: k,
				value: v
			}));
			const COLORS = [
				"#22C55E",
				"#166534",
				"#84CC16",
				"#EAB308",
				"#F97316"
			];
			pieData.forEach((d, i) => {
				d.fill = COLORS[i % COLORS.length];
			});
			const topProducts = produtos?.sort((a, b) => Number(b.valor || 0) * Number(b.estoque || 0) - Number(a.valor || 0) * Number(a.estoque || 0)).slice(0, 5).map((p) => ({
				name: p.nome.substring(0, 15) + "...",
				v: Number(p.estoque || 0)
			})) || [];
			const chartData = [];
			for (let i = 5; i >= 0; i--) {
				const d = /* @__PURE__ */ new Date();
				d.setMonth(d.getMonth() - i);
				const mStr = d.toISOString().substring(0, 7);
				chartData.push({
					m: d.toLocaleDateString("pt-BR", { month: "short" }),
					v: monthlyVendas[mStr] || 0,
					c: monthlyCompras[mStr] || 0
				});
			}
			setStats({
				faturamento: fat,
				pedidosHoje: pedHoje,
				produtosEstoque: produtos?.length || 0,
				clientesAtivos: clientesCount || 0,
				entregasPendentes: entPend,
				recent: vendasRecentes || [],
				critical: produtos?.filter((p) => Number(p.estoque || 0) <= 10).length || 0,
				ticketMedio,
				margin,
				otif,
				chartData,
				pieData,
				topProducts
			});
		};
		loadData();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Visão Geral",
			subtitle: `${new Intl.DateTimeFormat("pt-BR", {
				weekday: "long",
				day: "numeric",
				month: "long",
				year: "numeric"
			}).format(/* @__PURE__ */ new Date())} — bom dia, Douglas 👋`,
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "outline",
				onClick: async () => {
					const { data } = await supabase.from("vendas").select("*, clientes(nome)").order("created_at", { ascending: false }).limit(100);
					if (!data || data.length === 0) {
						alert("Nenhuma venda encontrada para exportar.");
						return;
					}
					const csv = [[
						"ID",
						"Cliente",
						"Tipo",
						"Status",
						"Valor Total",
						"Data"
					], ...data.map((v) => [
						v.id.slice(0, 8).toUpperCase(),
						v.clientes?.nome || "Consumidor Final",
						v.tipo || "",
						v.status || "",
						`R$ ${Number(v.valor_total || 0).toFixed(2)}`,
						new Date(v.created_at).toLocaleDateString("pt-BR")
					])].map((r) => r.map((c) => `"${c}"`).join(";")).join("\n");
					const blob = new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8;" });
					const url = URL.createObjectURL(blob);
					const a = document.createElement("a");
					a.href = url;
					a.download = `relatorio_vendas_${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.csv`;
					document.body.appendChild(a);
					a.click();
					document.body.removeChild(a);
					URL.revokeObjectURL(url);
				},
				children: "Exportar CSV"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				className: "bg-gradient-brand text-primary-foreground",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/app/vendas",
					children: "Novo Pedido"
				})
			})] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KPI, {
					icon: DollarSign,
					label: "Faturamento",
					value: `R$ ${stats.faturamento.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`,
					delta: "",
					tone: "primary"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KPI, {
					icon: ShoppingCart,
					label: "Pedidos do dia",
					value: stats.pedidosHoje.toString(),
					delta: "",
					tone: "info"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KPI, {
					icon: Package,
					label: "Produtos ativos",
					value: stats.produtosEstoque.toString(),
					delta: "",
					tone: "success"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KPI, {
					icon: TriangleAlert,
					label: "Produtos críticos",
					value: stats.critical?.toString() || "0",
					delta: "",
					tone: "warning"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KPI, {
					icon: Users,
					label: "Clientes ativos",
					value: stats.clientesAtivos.toString(),
					delta: "",
					tone: "terra"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KPI, {
					icon: Truck,
					label: "Entregas pendentes",
					value: stats.entregasPendentes.toString(),
					delta: "",
					up: false,
					tone: "destructive"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 grid gap-6 lg:grid-cols-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "lg:col-span-2 shadow-card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
					className: "flex flex-row items-start justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Vendas vs Compras" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Últimos 6 meses — em reais (R$)" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2 text-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2 w-2 rounded-full bg-primary" }), "Vendas"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2 w-2 rounded-full bg-terra" }), "Compras"]
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
					width: "100%",
					height: 280,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AreaChart, {
						data: stats.chartData || [],
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("defs", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
								id: "gv",
								x1: "0",
								y1: "0",
								x2: "0",
								y2: "1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
									offset: "0%",
									stopColor: "#166534",
									stopOpacity: .4
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
									offset: "100%",
									stopColor: "#166534",
									stopOpacity: 0
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
								id: "gc",
								x1: "0",
								y1: "0",
								x2: "0",
								y2: "1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
									offset: "0%",
									stopColor: "#92400E",
									stopOpacity: .3
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
									offset: "100%",
									stopColor: "#92400E",
									stopOpacity: 0
								})]
							})] }),
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
								tickFormatter: (v) => `${v / 1e3}k`
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
								contentStyle: {
									borderRadius: 12,
									border: "1px solid #e2e8f0"
								},
								formatter: (value) => `R$ ${value.toFixed(2)}`
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
								type: "monotone",
								dataKey: "v",
								name: "Vendas",
								stroke: "#166534",
								strokeWidth: 2.5,
								fill: "url(#gv)"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
								type: "monotone",
								dataKey: "c",
								name: "Compras",
								stroke: "#92400E",
								strokeWidth: 2,
								fill: "url(#gc)"
							})
						]
					})
				}) })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "shadow-card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Mix de Categorias" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Participação em estoque (R$)" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
					width: "100%",
					height: 220,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PieChart, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pie, {
						data: stats.pieData || [],
						dataKey: "value",
						nameKey: "name",
						innerRadius: 55,
						outerRadius: 85,
						paddingAngle: 2
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { formatter: (value) => `R$ ${value.toFixed(2)}` })] })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-2 space-y-1.5 text-sm text-center text-muted-foreground",
					children: !stats.pieData?.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Sem dados suficientes." })
				})] })]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 grid gap-6 lg:grid-cols-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "lg:col-span-2 shadow-card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
					className: "flex flex-row items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Últimos pedidos" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "5 mais recentes" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "sm",
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/app/vendas",
							children: "Ver tudo"
						})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
					className: "p-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "divide-y",
						children: stats.recent.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "p-6 text-center text-sm text-muted-foreground",
							children: "Nenhum pedido recente."
						}) : stats.recent.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between px-6 py-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "font-semibold text-sm",
									children: ["#", r.id?.toString().slice(0, 5)]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground truncate",
									children: r.clientes?.nome || "Consumidor Final"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-right",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-sm font-semibold",
									children: ["R$ ", Number(r.total || r.valor_total || 0).toLocaleString("pt-BR", { minimumFractionDigits: 2 })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									variant: "secondary",
									className: "mt-0.5 text-[10px]",
									children: r.status
								})]
							})]
						}, r.id))
					})
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "shadow-card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Maior Valor de Estoque" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Top 5 — Unidades Atuais" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
					width: "100%",
					height: 230,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
						data: stats.topProducts || [],
						layout: "vertical",
						margin: { left: 10 },
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
								horizontal: false,
								stroke: "#e2e8f0"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
								type: "number",
								stroke: "#64748b",
								fontSize: 11,
								tickLine: false,
								axisLine: false
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
								dataKey: "name",
								type: "category",
								stroke: "#64748b",
								fontSize: 11,
								tickLine: false,
								axisLine: false,
								width: 110
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: { borderRadius: 12 } }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
								dataKey: "v",
								name: "Unidades",
								fill: "#22C55E",
								radius: [
									0,
									6,
									6,
									0
								]
							})
						]
					})
				}) })]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6 grid gap-6 md:grid-cols-3",
			children: [
				{
					title: "Margem líquida",
					value: `${(stats.margin || 0).toFixed(1)}%`,
					icon: TrendingUp,
					tone: "text-success"
				},
				{
					title: "Ticket médio",
					value: `R$ ${(stats.ticketMedio || 0).toFixed(2)}`,
					icon: DollarSign,
					tone: "text-primary"
				},
				{
					title: "Taxa de Entrega",
					value: `${(stats.otif || 0).toFixed(1)}%`,
					icon: Truck,
					tone: "text-info"
				}
			].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "shadow-card",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "flex items-center justify-between p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: s.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 font-display text-2xl font-bold",
						children: s.value
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(s.icon, { className: `h-8 w-8 ${s.tone}` })]
				})
			}, s.title))
		})
	] });
}
//#endregion
export { Dashboard as component };

import { i as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./supabase-B8pFCf1w.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as Button } from "./button-DiE0A9q4.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { r as Badge } from "./dist-Db34orMe.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { V as Funnel, _ as Search, u as Trash2, w as Pencil, x as Plus } from "../_libs/lucide-react.mjs";
import { r as PageHeader } from "./app-shell-jjiopLig.mjs";
import { n as CardContent, t as Card } from "./card-CtX3ithx.mjs";
import { n as useConfirm } from "./ConfirmContext-vho0i-5n.mjs";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-C0WYWEQX.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-PgwG16CQ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app.produtos-C9TuuaN3.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Produtos() {
	const confirm = useConfirm();
	const [products, setProducts] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [busca, setBusca] = (0, import_react.useState)("");
	const [categoriaFilter, setCategoriaFilter] = (0, import_react.useState)("Todas");
	const [statusFilter, setStatusFilter] = (0, import_react.useState)("Todos");
	const [showFilters, setShowFilters] = (0, import_react.useState)(true);
	const fetchProducts = async () => {
		try {
			const { data, error } = await supabase.from("produtos").select("*").order("created_at", { ascending: false });
			if (error) throw error;
			setProducts(data || []);
		} catch (err) {
			console.error(err);
			alert("Erro ao buscar produtos.");
		} finally {
			setLoading(false);
		}
	};
	(0, import_react.useEffect)(() => {
		fetchProducts();
	}, []);
	const handleDelete = async (id) => {
		if (!await confirm({
			description: "Tem certeza que deseja excluir este produto?",
			variant: "destructive"
		})) return;
		try {
			const { error } = await supabase.from("produtos").delete().eq("id", id);
			if (error) throw error;
			fetchProducts();
		} catch (err) {
			alert("Erro ao deletar: " + err.message);
		}
	};
	const ativos = products.filter((p) => p.status === "Ativo").length;
	const criticos = products.filter((p) => p.status === "Crítico").length;
	const inativos = products.filter((p) => p.status === "Inativo").length;
	const filteredProducts = products.filter((p) => {
		const matchBusca = p.nome.toLowerCase().includes(busca.toLowerCase()) || p.codigo && p.codigo.toLowerCase().includes(busca.toLowerCase());
		const matchCat = categoriaFilter === "Todas" || p.categoria === categoriaFilter;
		const matchStatus = statusFilter === "Todos" || p.status === statusFilter;
		return matchBusca && matchCat && matchStatus;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Produtos",
			subtitle: `${products.length} SKUs cadastrados — atualizado agora`,
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				variant: showFilters ? "secondary" : "outline",
				onClick: () => setShowFilters(!showFilters),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Funnel, { className: "mr-2 h-4 w-4" }), "Filtros"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				className: "bg-gradient-brand text-primary-foreground",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/app/produto-novo",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-2 h-4 w-4" }), "Novo Produto"]
				})
			})] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-4 sm:grid-cols-4 mb-6",
			children: [
				{
					l: "Total de itens",
					v: products.length,
					c: "text-primary"
				},
				{
					l: "Ativos",
					v: ativos,
					c: "text-success"
				},
				{
					l: "Estoque crítico",
					v: criticos,
					c: "text-warning"
				},
				{
					l: "Inativos",
					v: inativos,
					c: "text-muted-foreground"
				}
			].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "shadow-card",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "p-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: s.l
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: `mt-1 font-display text-2xl font-bold ${s.c}`,
						children: s.v
					})]
				})
			}, s.l))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "shadow-card",
			children: [showFilters && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-3 border-b p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative flex-1 min-w-[200px]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							placeholder: "Buscar por código ou nome…",
							className: "pl-9",
							value: busca,
							onChange: (e) => setBusca(e.target.value)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: categoriaFilter,
						onValueChange: setCategoriaFilter,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
							className: "w-[180px] h-9",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Categoria" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "Todas",
							children: "Todas categorias"
						}), Array.from(new Set(products.map((p) => p.categoria).filter(Boolean))).sort().map((cat) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: cat,
							children: cat
						}, cat))] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: statusFilter,
						onValueChange: setStatusFilter,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
							className: "w-[150px] h-9",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Status" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "Todos",
								children: "Todos os status"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "Ativo",
								children: "Ativos"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "Crítico",
								children: "Críticos"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "Inativo",
								children: "Inativos"
							})
						] })]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-x-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Código" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Produto" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Categoria" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
						className: "text-right",
						children: "Estoque"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
						className: "text-right",
						children: "Valor"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Status" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
						className: "text-right",
						children: "Ações"
					})
				] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					colSpan: 7,
					className: "text-center py-8 text-muted-foreground",
					children: "Carregando produtos..."
				}) }) : filteredProducts.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					colSpan: 7,
					className: "text-center py-8 text-muted-foreground",
					children: "Nenhum produto encontrado na busca."
				}) }) : filteredProducts.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
						className: "font-mono text-xs",
						children: p.codigo
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid h-10 w-10 overflow-hidden place-items-center rounded-lg bg-accent text-lg border",
							children: p.imagem ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: p.imagem,
								alt: p.nome,
								className: "w-full h-full object-cover"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "opacity-50",
								children: p.emoji || "📦"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-semibold",
							children: p.nome
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: "SKU interno"
						})] })]
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: "secondary",
						children: p.categoria
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
						className: "text-right font-semibold",
						children: Number(p.estoque).toLocaleString("pt-BR")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
						className: "text-right font-semibold",
						children: ["R$ ", Number(p.valor).toFixed(2).replace(".", ",")]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: p.status === "Ativo" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						className: "bg-success/15 text-success hover:bg-success/20 border-0",
						children: "Ativo"
					}) : p.status === "Crítico" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						className: "bg-warning/15 text-warning hover:bg-warning/20 border-0",
						children: "Crítico"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						className: "bg-muted text-muted-foreground hover:bg-muted/80 border-0",
						children: "Inativo"
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
						className: "text-right",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "icon",
							variant: "ghost",
							className: "h-8 w-8",
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/app/produto-novo",
								search: { id: p.id },
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "h-4 w-4" })
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "icon",
							variant: "ghost",
							className: "h-8 w-8 text-destructive",
							onClick: () => handleDelete(p.id),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
						})]
					})
				] }, p.id)) })] })
			})]
		})
	] });
}
//#endregion
export { Produtos as component };

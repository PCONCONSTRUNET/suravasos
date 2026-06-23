import { i as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./supabase-B8pFCf1w.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { F as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as Button } from "./button-BkEeRci-.mjs";
import { t as Badge } from "./badge-D1Dupn2y.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { mt as Calculator, u as Trash2, x as Plus } from "../_libs/lucide-react.mjs";
import { n as PageHeader } from "./app-shell-BDkgzrqS.mjs";
import { t as Card } from "./card-CtX3ithx.mjs";
import { n as useConfirm } from "./ConfirmContext-CIaV5wVt.mjs";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-C0WYWEQX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app.vendas-aFJzjnlo.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Vendas() {
	const confirm = useConfirm();
	const [vendas, setVendas] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const fetchVendas = async () => {
		try {
			const { data, error } = await supabase.from("vendas").select(`*, clientes (nome)`).order("created_at", { ascending: false });
			if (error) throw error;
			setVendas(data || []);
		} catch (err) {
			console.error(err);
			alert("Erro ao buscar vendas.");
		} finally {
			setLoading(false);
		}
	};
	(0, import_react.useEffect)(() => {
		fetchVendas();
	}, []);
	const handleDelete = async (id, tipo) => {
		if (!await confirm({
			description: `Tem certeza que deseja excluir est${tipo === "DAV" ? "e orçamento" : "a venda"}?`,
			variant: "destructive"
		})) return;
		try {
			const { error } = await supabase.from("vendas").delete().eq("id", id);
			if (error) throw error;
			fetchVendas();
		} catch (err) {
			alert("Erro ao deletar: " + err.message);
		}
	};
	const getTone = (status) => {
		if (status === "Pago" || status === "Faturado") return "bg-success/15 text-success border-0";
		if (status === "Aguardando Pagamento" || status === "Aprovado") return "bg-warning/15 text-warning border-0";
		if (status === "Rejeitado" || status === "Cancelado") return "bg-destructive/10 text-destructive border-0";
		return "bg-info/15 text-info border-0";
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "Vendas",
		subtitle: "Pedidos, orçamentos e faturamento",
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			variant: "outline",
			asChild: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/app/venda-nova",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calculator, { className: "mr-2 h-4 w-4" }), "Novo Orçamento (DAV)"]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			className: "bg-gradient-brand text-primary-foreground",
			asChild: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/app/venda-nova",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-2 h-4 w-4" }), "Nova Venda"]
			})
		})] })
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
		className: "shadow-card overflow-x-auto",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Nº" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Tipo" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Cliente" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Data" }),
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
			className: "text-center py-8",
			children: "Carregando operações..."
		}) }) : vendas.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
			colSpan: 7,
			className: "text-center py-8 text-muted-foreground",
			children: "Nenhuma venda ou orçamento encontrado."
		}) }) : vendas.map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
				className: "font-mono text-xs",
				children: v.id.substring(0, 8).toUpperCase()
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
				variant: "outline",
				children: v.tipo
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
				className: "font-semibold",
				children: v.clientes?.nome || "Cliente Removido"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: new Date(v.created_at).toLocaleDateString() }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
				className: "text-right font-semibold",
				children: ["R$ ", Number(v.valor_total).toFixed(2).replace(".", ",")]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
				className: getTone(v.status),
				children: v.status
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
				className: "text-right",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					size: "icon",
					className: "h-8 w-8 text-destructive",
					onClick: () => handleDelete(v.id, v.tipo),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
				})
			})
		] }, v.id)) })] })
	})] });
}
//#endregion
export { Vendas as component };

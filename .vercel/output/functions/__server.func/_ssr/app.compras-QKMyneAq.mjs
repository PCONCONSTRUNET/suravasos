import { a as require_jsx_runtime, i as __toESM, o as require_react } from "./react-dom-4oCbIcVr.mjs";
import { t as Link } from "./link-DcX1dWGt.mjs";
import { i as supabase } from "./supabase-e8TdIE0G.mjs";
import { t as Button } from "./button-DCabknOD.mjs";
import { r as Badge } from "./dist-De42YJC_.mjs";
import { u as PageHeader } from "./app-shell-DXEQSuIT.mjs";
import { t as Card } from "./card-Xhfpy7_x.mjs";
import { n as useConfirm } from "./ConfirmContext-CPHq_Vwj.mjs";
import { t as Plus } from "./plus-Khe2j6_m.mjs";
import { t as Trash2 } from "./trash-2-Cy3vXvGo.mjs";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-BjSIm1Ay.mjs";
import { t as CircleCheck } from "./circle-check-Cav-B9zg.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app.compras-QKMyneAq.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Compras() {
	const confirm = useConfirm();
	const [compras, setCompras] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const fetchCompras = async () => {
		try {
			const { data, error } = await supabase.from("compras").select(`*, fornecedores (empresa)`).order("created_at", { ascending: false });
			if (error) throw error;
			setCompras(data || []);
		} catch (err) {
			console.error(err);
			alert("Erro ao buscar compras.");
		} finally {
			setLoading(false);
		}
	};
	(0, import_react.useEffect)(() => {
		fetchCompras();
	}, []);
	const handleDelete = async (id) => {
		if (!await confirm({
			description: "Tem certeza que deseja excluir esta compra?",
			variant: "destructive"
		})) return;
		try {
			const { error } = await supabase.from("compras").delete().eq("id", id);
			if (error) throw error;
			fetchCompras();
		} catch (err) {
			alert("Erro ao deletar: " + err.message);
		}
	};
	const getTone = (status) => {
		if (status === "Recebido") return "bg-success/15 text-success border-0";
		if (status === "Em trânsito") return "bg-info/15 text-info border-0";
		if (status === "Aprovado") return "bg-primary/10 text-primary border-0";
		return "bg-warning/15 text-warning border-0";
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "Compras",
		subtitle: "Pedidos de compra e recebimento de mercadorias",
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			variant: "outline",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "mr-2 h-4 w-4" }), "Aprovar"]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			className: "bg-gradient-brand text-primary-foreground",
			asChild: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/app/compra-nova",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-2 h-4 w-4" }), "Nova Compra"]
			})
		})] })
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
		className: "shadow-card overflow-x-auto",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Nº" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Fornecedor" }),
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
			colSpan: 6,
			className: "text-center py-8",
			children: "Carregando compras..."
		}) }) : compras.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
			colSpan: 6,
			className: "text-center py-8 text-muted-foreground",
			children: "Nenhuma compra registrada."
		}) }) : compras.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
				className: "font-mono text-xs",
				children: o.id.substring(0, 8).toUpperCase()
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
				className: "font-semibold",
				children: o.fornecedores?.empresa || "Fornecedor Removido"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: new Date(o.created_at).toLocaleDateString() }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
				className: "text-right font-semibold",
				children: ["R$ ", Number(o.valor_total).toFixed(2).replace(".", ",")]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
				className: getTone(o.status),
				children: o.status
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
				className: "text-right",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					size: "icon",
					className: "h-8 w-8 text-destructive",
					onClick: () => handleDelete(o.id),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
				})
			})
		] }, o.id)) })] })
	})] });
}
//#endregion
export { Compras as component };

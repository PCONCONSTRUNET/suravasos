import { i as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./supabase-B8pFCf1w.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as Button } from "./button-DiE0A9q4.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { u as Trash2, x as Plus } from "../_libs/lucide-react.mjs";
import { r as PageHeader } from "./app-shell-jjiopLig.mjs";
import { t as Card } from "./card-CtX3ithx.mjs";
import { n as useConfirm } from "./ConfirmContext-vho0i-5n.mjs";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-C0WYWEQX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app.fornecedores-ByQATNaf.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Fornecedores() {
	const confirm = useConfirm();
	const [fornecedores, setFornecedores] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const fetchFornecedores = async () => {
		try {
			const { data, error } = await supabase.from("fornecedores").select("*").order("created_at", { ascending: false });
			if (error) throw error;
			setFornecedores(data || []);
		} catch (err) {
			console.error(err);
			alert("Erro ao buscar fornecedores.");
		} finally {
			setLoading(false);
		}
	};
	(0, import_react.useEffect)(() => {
		fetchFornecedores();
	}, []);
	const handleDelete = async (id) => {
		if (!await confirm({
			description: "Tem certeza que deseja excluir este fornecedor?",
			variant: "destructive"
		})) return;
		try {
			const { error } = await supabase.from("fornecedores").delete().eq("id", id);
			if (error) throw error;
			fetchFornecedores();
		} catch (err) {
			alert("Erro ao deletar: " + err.message);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "Fornecedores",
		subtitle: `${fornecedores.length} parceiros homologados`,
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			asChild: true,
			className: "bg-gradient-brand text-primary-foreground",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/app/fornecedor-novo",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-2 h-4 w-4" }), "Novo Fornecedor"]
			})
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
		className: "shadow-card overflow-x-auto",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Empresa" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Contato" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Cidade" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Última Compra" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
				className: "text-right",
				children: "Valor Movimentado"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
				className: "text-right",
				children: "Ações"
			})
		] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
			colSpan: 6,
			className: "text-center py-8 text-muted-foreground",
			children: "Carregando fornecedores..."
		}) }) : fornecedores.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
			colSpan: 6,
			className: "text-center py-8 text-muted-foreground",
			children: "Nenhum fornecedor cadastrado ainda."
		}) }) : fornecedores.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
				className: "font-semibold",
				children: d.empresa
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: d.contato || "-" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
				className: "text-muted-foreground",
				children: d.cidade || "-"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: d.ultima_compra ? new Date(d.ultima_compra).toLocaleDateString() : "-" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
				className: "text-right font-semibold",
				children: ["R$ ", Number(d.valor_total).toFixed(2).replace(".", ",")]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
				className: "text-right",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "icon",
					variant: "ghost",
					className: "h-8 w-8 text-destructive",
					onClick: () => handleDelete(d.id),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
				})
			})
		] }, d.id)) })] })
	})] });
}
//#endregion
export { Fornecedores as component };

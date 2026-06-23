import { i as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./supabase-B8pFCf1w.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { F as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as Button } from "./button-BkEeRci-.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { t as Badge } from "./badge-D1Dupn2y.mjs";
import { _ as Search, _t as BellOff, dt as CheckCheck, u as Trash2 } from "../_libs/lucide-react.mjs";
import { n as PageHeader } from "./app-shell-BDkgzrqS.mjs";
import { n as CardContent, t as Card } from "./card-CtX3ithx.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app.notificacoes-B1jh1hek.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function NotificacoesPage() {
	const [notifications, setNotifications] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [searchTerm, setSearchTerm] = (0, import_react.useState)("");
	const fetchNotifications = async () => {
		setLoading(true);
		try {
			const { data } = await supabase.from("notificacoes").select("*").order("created_at", { ascending: false });
			if (data) setNotifications(data);
		} catch (e) {
			console.error(e);
		} finally {
			setLoading(false);
		}
	};
	(0, import_react.useEffect)(() => {
		fetchNotifications();
	}, []);
	const markAllAsRead = async () => {
		await supabase.from("notificacoes").update({ lida: true }).eq("lida", false);
		fetchNotifications();
	};
	const markAsRead = async (id) => {
		await supabase.from("notificacoes").update({ lida: true }).eq("id", id);
		fetchNotifications();
	};
	const deleteNotification = async (id) => {
		await supabase.from("notificacoes").delete().eq("id", id);
		fetchNotifications();
	};
	const clearAll = async () => {
		if (confirm("Tem certeza que deseja excluir TODAS as notificações?")) {
			await supabase.from("notificacoes").delete().neq("id", "00000000-0000-0000-0000-000000000000");
			fetchNotifications();
		}
	};
	const filtered = notifications.filter((n) => n.titulo.toLowerCase().includes(searchTerm.toLowerCase()) || n.mensagem.toLowerCase().includes(searchTerm.toLowerCase()));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Central de Notificações",
			subtitle: "Gerencie todos os avisos e alertas do sistema.",
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "outline",
					onClick: markAllAsRead,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckCheck, { className: "mr-2 h-4 w-4" }), " Marcar todas como lidas"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "destructive",
					onClick: clearAll,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "mr-2 h-4 w-4" }), " Limpar tudo"]
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			className: "shadow-card mb-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
				className: "p-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						placeholder: "Buscar notificações...",
						className: "pl-9",
						value: searchTerm,
						onChange: (e) => setSearchTerm(e.target.value)
					})]
				})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-3",
			children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-center p-8 text-muted-foreground",
				children: "Carregando notificações..."
			}) : filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "border-dashed bg-transparent shadow-none",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "flex flex-col items-center justify-center p-12 text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "p-4 rounded-full bg-muted/50 mb-4 text-muted-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BellOff, { className: "h-8 w-8" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-lg font-bold",
							children: "Nenhuma notificação encontrada"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-muted-foreground",
							children: "Você não possui novos avisos ou alertas."
						})
					]
				})
			}) : filtered.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: cn("transition-colors overflow-hidden", n.lida ? "opacity-75 bg-muted/20" : "border-brand/30 shadow-md ring-1 ring-brand/10"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "p-4 sm:p-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 mb-1",
							children: [
								!n.lida && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									className: "bg-brand text-primary-foreground border-0 text-[10px] px-1.5 py-0",
									children: "NOVA"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
									className: cn("font-bold", !n.lida ? "text-foreground" : "text-muted-foreground"),
									children: n.titulo
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs text-muted-foreground ml-auto sm:ml-2",
									children: new Date(n.created_at).toLocaleString()
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-slate-600",
							children: n.mensagem
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 w-full sm:w-auto justify-end mt-2 sm:mt-0",
						children: [!n.lida && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "ghost",
							size: "sm",
							onClick: () => markAsRead(n.id),
							className: "text-brand hover:text-brand hover:bg-brand/10",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckCheck, { className: "h-4 w-4 mr-1.5" }), " Lida"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "ghost",
							size: "sm",
							onClick: () => deleteNotification(n.id),
							className: "text-destructive hover:bg-destructive/10",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4 mr-1.5" }), " Excluir"]
						})]
					})]
				})
			}, n.id))
		})
	] });
}
//#endregion
export { NotificacoesPage as component };

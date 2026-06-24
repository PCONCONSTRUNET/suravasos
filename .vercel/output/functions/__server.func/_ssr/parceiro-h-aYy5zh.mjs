import { n as supabaseParceiro } from "./supabase-Bvu1xBCC.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { F as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as VivaverdeLogo } from "./vivaverde-logo-DWXAFaeL.mjs";
import { f as Outlet, g as Link, l as useRouterState } from "../_libs/@tanstack/react-router+[...].mjs";
import { L as House, M as LogOut, pt as Calculator } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/parceiro-h-aYy5zh.js
var import_jsx_runtime = require_jsx_runtime();
function ParceiroLayout() {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	if (pathname === "/parceiro/login" || pathname === "/parceiro/cadastro") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {});
	const handleLogout = async () => {
		await supabaseParceiro.auth.signOut();
		window.location.href = "/parceiro/login";
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col min-h-screen bg-slate-50 pb-20",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "sticky top-0 z-30 flex h-16 items-center justify-center border-b bg-white shadow-sm px-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VivaverdeLogo, { size: "small" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "flex-1 p-4 max-w-md w-full mx-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				className: "fixed bottom-0 w-full border-t bg-white px-6 py-3 flex justify-around items-center max-w-md left-1/2 -translate-x-1/2 z-40 rounded-t-2xl shadow-[0_-4px_20px_rgba(0,0,0,0.05)]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/parceiro/dashboard",
						className: cn("flex flex-col items-center gap-1 p-2 rounded-xl transition-all", pathname.includes("dashboard") ? "text-primary" : "text-muted-foreground hover:text-slate-900"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(House, { className: "h-6 w-6" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[10px] font-medium",
							children: "Início"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/parceiro/pdv",
						className: cn("flex flex-col items-center gap-1 p-2 rounded-xl transition-all", pathname.includes("pdv") ? "text-primary" : "text-muted-foreground hover:text-slate-900"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-12 w-12 rounded-full bg-gradient-brand text-primary-foreground grid place-items-center -mt-8 shadow-lg ring-4 ring-slate-50",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calculator, { className: "h-6 w-6" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[10px] font-medium",
							children: "Vender"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: handleLogout,
						className: "flex flex-col items-center gap-1 p-2 rounded-xl transition-all text-muted-foreground hover:text-destructive",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-6 w-6" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[10px] font-medium",
							children: "Sair"
						})]
					})
				]
			})
		]
	});
}
//#endregion
export { ParceiroLayout as component };

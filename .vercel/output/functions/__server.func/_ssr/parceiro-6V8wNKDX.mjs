import { a as require_jsx_runtime } from "./react-dom-4oCbIcVr.mjs";
import { i as Outlet } from "./Match-BW1smEm3.mjs";
import { t as Link } from "./link-DcX1dWGt.mjs";
import { t as createLucideIcon } from "./createLucideIcon-DpFEVfIr.mjs";
import { n as LogOut, r as useRouterState, t as Calculator } from "./log-out-BT-IDR7I.mjs";
import { a as supabaseParceiro } from "./supabase-e8TdIE0G.mjs";
import { n as cn } from "./utils-BgyBagvU.mjs";
import { t as VivaverdeLogo } from "./vivaverde-logo-DKTV0wIQ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/parceiro-6V8wNKDX.js
/**
* @license lucide-react v0.575.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var House = createLucideIcon("house", [["path", {
	d: "M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8",
	key: "5wwlr5"
}], ["path", {
	d: "M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
	key: "r6nss1"
}]]);
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

import { t as cn } from "./utils-C_uf36nf.mjs";
import { F as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as vivaverde_logo_default } from "./vivaverde-logo-DI6iBV0x.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/vivaverde-logo-DWXAFaeL.js
var import_jsx_runtime = require_jsx_runtime();
function VivaverdeLogo({ className, size = "default" }) {
	const height = size === "small" ? "h-8" : size === "large" ? "h-20" : "h-10";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("flex items-center gap-2.5", className),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: vivaverde_logo_default,
			alt: "VIVAVERDE",
			className: cn("w-auto object-contain", height)
		})
	});
}
//#endregion
export { VivaverdeLogo as t };

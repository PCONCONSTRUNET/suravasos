import { F as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/color-dock-Dm_4chJg.js
var import_jsx_runtime = require_jsx_runtime();
var colorMap = {
	"preto": "#27272a",
	"preta": "#27272a",
	"branco": "#ffffff",
	"branca": "#ffffff",
	"marrom": "#78350f",
	"marron": "#78350f",
	"ceramica": "#b45309",
	"cerâmica": "#b45309",
	"azul": "#3b82f6",
	"verde": "#22c55e",
	"amarelo": "#eab308",
	"vermelho": "#ef4444",
	"rosa": "#ec4899",
	"roxo": "#a855f7",
	"cinza": "#9ca3af",
	"bege": "#fef3c7",
	"areia": "#f5f5f4",
	"terracota": "#c2410c"
};
var getHex = (colorName) => {
	return colorMap[colorName.toLowerCase().trim()] || "#cbd5e1";
};
function ColorDock({ colors }) {
	if (!colors || colors.length === 0) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "color-dock-wrapper",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "container-items",
			children: colors.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "item-color",
				style: { "--color": getHex(c) },
				"aria-label": c,
				title: c
			}, c))
		})
	});
}
//#endregion
export { ColorDock as t };

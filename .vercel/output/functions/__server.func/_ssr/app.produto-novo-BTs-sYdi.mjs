import { m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app.produto-novo-BTs-sYdi.js
var $$splitComponentImporter = () => import("./app.produto-novo-uMuCX9X1.mjs");
var Route = createFileRoute("/app/produto-novo")({
	validateSearch: (search) => {
		return { id: search.id };
	},
	head: () => ({ meta: [{ title: "Produto — VIVAVERDE ERP" }] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };

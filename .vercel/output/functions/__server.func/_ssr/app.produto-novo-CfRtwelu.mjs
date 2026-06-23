import { r as lazyRouteComponent, t as createFileRoute } from "./lazyRouteComponent-CFotKzaz.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app.produto-novo-CfRtwelu.js
var $$splitComponentImporter = () => import("./app.produto-novo-Nn_kYlcl.mjs");
var Route = createFileRoute("/app/produto-novo")({
	validateSearch: (search) => {
		return { id: search.id };
	},
	head: () => ({ meta: [{ title: "Produto — VIVAVERDE ERP" }] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };

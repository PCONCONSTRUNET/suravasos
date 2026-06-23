import { m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/parceiro.dav-CxSARIw2.js
var $$splitComponentImporter = () => import("./parceiro.dav-CHQxLI0G.mjs");
var Route = createFileRoute("/parceiro/dav")({
	head: () => ({ meta: [{ title: "Novo Pedido (DAV) — Parceiro VIVAVERDE" }] }),
	validateSearch: (search) => ({ pedido: search.pedido }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };

import { m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app.dav-novo-Bu_AETwD.js
var $$splitComponentImporter = () => import("./app.dav-novo-BmAsryRp.mjs");
var Route = createFileRoute("/app/dav-novo")({
	head: () => ({ meta: [{ title: "Novo DAV — VIVAVERDE ERP" }] }),
	validateSearch: (search) => ({ pedido: search.pedido }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };

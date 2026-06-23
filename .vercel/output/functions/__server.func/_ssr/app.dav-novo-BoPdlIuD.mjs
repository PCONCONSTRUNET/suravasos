import { r as lazyRouteComponent, t as createFileRoute } from "./lazyRouteComponent-CFotKzaz.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app.dav-novo-BoPdlIuD.js
var $$splitComponentImporter = () => import("./app.dav-novo-DEnCk7-c.mjs");
var Route = createFileRoute("/app/dav-novo")({
	head: () => ({ meta: [{ title: "Novo DAV — VIVAVERDE ERP" }] }),
	validateSearch: (search) => ({ pedido: search.pedido }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };

import { m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app.dav-novo-DVSpUYFK.js
var $$splitComponentImporter = () => import("./app.dav-novo-DrLVVdmy.mjs");
var Route = createFileRoute("/app/dav-novo")({
	head: () => ({ meta: [{ title: "Novo DAV — VIVAVERDE ERP" }] }),
	validateSearch: (search) => ({ pedido: search.pedido }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };

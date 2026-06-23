import { r as lazyRouteComponent, t as createFileRoute } from "./lazyRouteComponent-CFotKzaz.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/parceiro.dav-DYN4lwJU.js
var $$splitComponentImporter = () => import("./parceiro.dav-D6boyZKu.mjs");
var Route = createFileRoute("/parceiro/dav")({
	head: () => ({ meta: [{ title: "Novo Pedido (DAV) — Parceiro VIVAVERDE" }] }),
	validateSearch: (search) => ({ pedido: search.pedido }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };

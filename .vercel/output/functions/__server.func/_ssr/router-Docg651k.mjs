import { i as __toESM } from "../_runtime.mjs";
import { n as supabaseParceiro, t as supabase } from "./supabase-Bvu1xBCC.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { F as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { A as redirect, c as HeadContent, d as createRouter, f as Outlet, g as Link, h as createRootRouteWithContext, m as createFileRoute, p as lazyRouteComponent, s as Scripts, v as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as ConfirmProvider } from "./ConfirmContext-DprjPCem.mjs";
import { t as Route$34 } from "./app.produto-novo-BTs-sYdi.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { t as Route$35 } from "./declaracao._id-B-x_ckuh.mjs";
import { t as Route$36 } from "./orcamento._id-PvqvWN-v.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { t as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { n as stringType, t as objectType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-Docg651k.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-DyKy08lH.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
}
var Toaster$1 = ({ ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	});
};
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$33 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "VIVAVERDE ERP — Sistema Interno" },
			{
				name: "description",
				content: "Sistema ERP interno da VIVAVERDE para gestão de estoque, vendas, financeiro e logística."
			},
			{
				property: "og:title",
				content: "VIVAVERDE ERP — Sistema Interno"
			},
			{
				property: "og:description",
				content: "Sistema ERP interno da VIVAVERDE para gestão de estoque, vendas, financeiro e logística."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary"
			},
			{
				name: "twitter:title",
				content: "VIVAVERDE ERP — Sistema Interno"
			},
			{
				name: "twitter:description",
				content: "Sistema ERP interno da VIVAVERDE para gestão de estoque, vendas, financeiro e logística."
			},
			{
				property: "og:image",
				content: "https://storage.googleapis.com/gpt-engineer-file-uploads/b1puNI2cwJQSkSR9bqtGJNLTTeo2/social-images/social-1781777493114-VIVAVERDE.webp"
			},
			{
				name: "twitter:image",
				content: "https://storage.googleapis.com/gpt-engineer-file-uploads/b1puNI2cwJQSkSR9bqtGJNLTTeo2/social-images/social-1781777493114-VIVAVERDE.webp"
			}
		],
		links: [
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/manifest.json"
			},
			{
				rel: "apple-touch-icon",
				href: "/vivaverdelogo.png"
			},
			{
				rel: "icon",
				href: "/vivaverdelogo.png"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$33.useRouteContext();
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
			if (event === "SIGNED_OUT") router.navigate({ to: "/" });
		});
		return () => {
			subscription.unsubscribe();
		};
	}, [router]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ConfirmProvider, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, {})] })
	});
}
var $$splitComponentImporter$31 = () => import("./parceiro-h-aYy5zh.mjs");
var Route$32 = createFileRoute("/parceiro")({
	beforeLoad: async ({ location }) => {
		if (typeof window === "undefined") return;
		if (location.pathname === "/parceiro/login" || location.pathname === "/parceiro/cadastro") return;
		try {
			const { data: { session } } = await supabaseParceiro.auth.getSession();
			if (!session) throw redirect({ to: "/parceiro/login" });
			const ADMIN_EMAILS = "douglasalmeida156@hotmail.com".split(",").map((e) => e.trim().toLowerCase()).filter(Boolean);
			if (session.user.email && ADMIN_EMAILS.includes(session.user.email.toLowerCase())) {
				await supabaseParceiro.auth.signOut();
				throw redirect({ to: "/app/dashboard" });
			}
			const { data: vendedor } = await supabaseParceiro.from("vendedores").select("status").eq("user_id", session.user.id).maybeSingle();
			if (!vendedor) {
				const { data: { user }, error: userError } = await supabaseParceiro.auth.getUser();
				if (userError || !user) {
					await supabaseParceiro.auth.signOut();
					throw redirect({ to: "/parceiro/login" });
				}
			}
		} catch (err) {
			if (err?.isRedirect || err?.message === "redirect") throw err;
			console.warn("[parceiro beforeLoad] erro ao verificar status:", err);
		}
	},
	component: lazyRouteComponent($$splitComponentImporter$31, "component")
});
var $$splitComponentImporter$30 = () => import("./catalogo-CWGFplxe.mjs");
var Route$31 = createFileRoute("/catalogo")({
	head: () => ({ meta: [{ title: "Catálogo — VivaVerde" }] }),
	component: lazyRouteComponent($$splitComponentImporter$30, "component")
});
var $$splitComponentImporter$29 = () => import("./app-CG9A315G.mjs");
var Route$30 = createFileRoute("/app")({
	beforeLoad: async () => {
		if (typeof window === "undefined") return;
		const { data: { session } } = await supabase.auth.getSession();
		if (!session) throw redirect({ to: "/" });
		const ADMIN_EMAILS = "douglasalmeida156@hotmail.com".split(",").map((e) => e.trim().toLowerCase()).filter(Boolean);
		if (!session.user.email || !ADMIN_EMAILS.includes(session.user.email.toLowerCase())) throw redirect({ to: "/parceiro/dashboard" });
	},
	component: lazyRouteComponent($$splitComponentImporter$29, "component")
});
var $$splitComponentImporter$28 = () => import("./routes-B3Srssxp.mjs");
objectType({
	email: stringType().email({ message: "Insira um e-mail válido." }),
	password: stringType().min(6, { message: "A senha deve ter no mínimo 6 caracteres." })
});
var Route$29 = createFileRoute("/")({
	beforeLoad: async () => {
		if (typeof window === "undefined") return;
		const { data: { session } } = await supabase.auth.getSession();
		if (session) throw redirect({ to: "/app/dashboard" });
	},
	head: () => ({ meta: [{ title: "Entrar — VIVAVERDE ERP" }] }),
	component: lazyRouteComponent($$splitComponentImporter$28, "component")
});
var Route$28 = createFileRoute("/app/")({ beforeLoad: () => {
	throw redirect({ to: "/app/dashboard" });
} });
var $$splitComponentImporter$27 = () => import("./parceiro.pdv-Z9gRTr3S.mjs");
var Route$27 = createFileRoute("/parceiro/pdv")({
	head: () => ({ meta: [{ title: "Nova Venda — VIVAVERDE" }] }),
	component: lazyRouteComponent($$splitComponentImporter$27, "component")
});
var $$splitComponentImporter$26 = () => import("./parceiro.login-DlBq8SwL.mjs");
var Route$26 = createFileRoute("/parceiro/login")({
	head: () => ({ meta: [{ title: "Login Parceiro — VIVAVERDE" }] }),
	component: lazyRouteComponent($$splitComponentImporter$26, "component")
});
var $$splitComponentImporter$25 = () => import("./parceiro.dashboard-F4cmqLKL.mjs");
var Route$25 = createFileRoute("/parceiro/dashboard")({
	head: () => ({ meta: [{ title: "Meu Painel — VIVAVERDE" }] }),
	component: lazyRouteComponent($$splitComponentImporter$25, "component")
});
var $$splitComponentImporter$24 = () => import("./parceiro.cadastro-DRR37ZGj.mjs");
var Route$24 = createFileRoute("/parceiro/cadastro")({
	head: () => ({ meta: [{ title: "Cadastro de Parceiro — VIVAVERDE" }] }),
	component: lazyRouteComponent($$splitComponentImporter$24, "component")
});
var $$splitComponentImporter$23 = () => import("./app.vendedores-BXQvOZKL.mjs");
var Route$23 = createFileRoute("/app/vendedores")({
	head: () => ({ meta: [{ title: "Vendedores Parceiros — VIVAVERDE ERP" }] }),
	component: lazyRouteComponent($$splitComponentImporter$23, "component")
});
var $$splitComponentImporter$22 = () => import("./app.vendas-parceiros-DFF5yeVF.mjs");
var Route$22 = createFileRoute("/app/vendas-parceiros")({
	head: () => ({ meta: [{ title: "Vendas Parceiros — VIVAVERDE ERP" }] }),
	component: lazyRouteComponent($$splitComponentImporter$22, "component")
});
var $$splitComponentImporter$21 = () => import("./app.vendas-DbYYzNtv.mjs");
var Route$21 = createFileRoute("/app/vendas")({
	head: () => ({ meta: [{ title: "Vendas — VIVAVERDE ERP" }] }),
	component: lazyRouteComponent($$splitComponentImporter$21, "component")
});
var $$splitComponentImporter$20 = () => import("./app.venda-nova-C6rG_6S5.mjs");
var Route$20 = createFileRoute("/app/venda-nova")({
	head: () => ({ meta: [{ title: "Nova Venda/DAV — VIVAVERDE ERP" }] }),
	component: lazyRouteComponent($$splitComponentImporter$20, "component")
});
var $$splitComponentImporter$19 = () => import("./app.relatorios-Dn-sMoVS.mjs");
var Route$19 = createFileRoute("/app/relatorios")({
	head: () => ({ meta: [{ title: "Relatórios — VIVAVERDE ERP" }] }),
	component: lazyRouteComponent($$splitComponentImporter$19, "component")
});
var $$splitComponentImporter$18 = () => import("./app.registro-DewXY_kn.mjs");
var Route$18 = createFileRoute("/app/registro")({
	head: () => ({ meta: [{ title: "Registro Rapido - VIVAVERDE ERP" }] }),
	component: lazyRouteComponent($$splitComponentImporter$18, "component")
});
var $$splitComponentImporter$17 = () => import("./app.produtos-BtguUp9x.mjs");
var Route$17 = createFileRoute("/app/produtos")({
	head: () => ({ meta: [{ title: "Produtos — VIVAVERDE ERP" }] }),
	component: lazyRouteComponent($$splitComponentImporter$17, "component")
});
var $$splitComponentImporter$16 = () => import("./app.pdv-BSW8DJVv.mjs");
var Route$16 = createFileRoute("/app/pdv")({
	head: () => ({ meta: [{ title: "PDV — VIVAVERDE ERP" }] }),
	component: lazyRouteComponent($$splitComponentImporter$16, "component")
});
var $$splitComponentImporter$15 = () => import("./app.notificacoes-csCxmR28.mjs");
var Route$15 = createFileRoute("/app/notificacoes")({ component: lazyRouteComponent($$splitComponentImporter$15, "component") });
var $$splitComponentImporter$14 = () => import("./app.logistica-D-pMeuSF.mjs");
var Route$14 = createFileRoute("/app/logistica")({
	head: () => ({ meta: [{ title: "Logística — VIVAVERDE ERP" }] }),
	component: lazyRouteComponent($$splitComponentImporter$14, "component")
});
var $$splitComponentImporter$13 = () => import("./app.fornecedores-E6v3L6bg.mjs");
var Route$13 = createFileRoute("/app/fornecedores")({
	head: () => ({ meta: [{ title: "Fornecedores — VIVAVERDE ERP" }] }),
	component: lazyRouteComponent($$splitComponentImporter$13, "component")
});
var $$splitComponentImporter$12 = () => import("./app.fornecedor-novo-D-2XBSmg.mjs");
var Route$12 = createFileRoute("/app/fornecedor-novo")({
	head: () => ({ meta: [{ title: "Novo Fornecedor — VIVAVERDE ERP" }] }),
	component: lazyRouteComponent($$splitComponentImporter$12, "component")
});
var $$splitComponentImporter$11 = () => import("./app.fiscal-CgDQDinx.mjs");
var Route$11 = createFileRoute("/app/fiscal")({
	head: () => ({ meta: [{ title: "Fiscal — VIVAVERDE ERP" }] }),
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
var $$splitComponentImporter$10 = () => import("./app.financeiro-CTzB_nnn.mjs");
var Route$10 = createFileRoute("/app/financeiro")({
	head: () => ({ meta: [{ title: "Financeiro — VIVAVERDE ERP" }] }),
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
var $$splitComponentImporter$9 = () => import("./app.estoque-BlbtZdXs.mjs");
var Route$9 = createFileRoute("/app/estoque")({
	head: () => ({ meta: [{ title: "Estoque — VIVAVERDE ERP" }] }),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var $$splitComponentImporter$8 = () => import("./app.dav-novo-CtrF7bZ3.mjs");
var Route$8 = createFileRoute("/app/dav-novo")({
	head: () => ({ meta: [{ title: "Novo DAV — VIVAVERDE ERP" }] }),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./app.dav--de2gln-.mjs");
var Route$7 = createFileRoute("/app/dav")({
	head: () => ({ meta: [{ title: "Orçamentos (DAV) — VIVAVERDE ERP" }] }),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./app.dashboard-BmlvXuH-.mjs");
var Route$6 = createFileRoute("/app/dashboard")({
	head: () => ({ meta: [{ title: "Dashboard — VIVAVERDE ERP" }] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./app.configuracoes-C3VJwyii.mjs");
var Route$5 = createFileRoute("/app/configuracoes")({
	head: () => ({ meta: [{ title: "Configurações — VIVAVERDE ERP" }] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./app.compras-BSFmDRX7.mjs");
var Route$4 = createFileRoute("/app/compras")({
	head: () => ({ meta: [{ title: "Compras — VIVAVERDE ERP" }] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./app.compra-nova-DqEZikGp.mjs");
var Route$3 = createFileRoute("/app/compra-nova")({
	head: () => ({ meta: [{ title: "Nova Compra — VIVAVERDE ERP" }] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./app.clientes-DxkapXAd.mjs");
var Route$2 = createFileRoute("/app/clientes")({
	head: () => ({ meta: [{ title: "Clientes — VIVAVERDE ERP" }] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./app.cliente-novo-C8ej24MY.mjs");
var Route$1 = createFileRoute("/app/cliente-novo")({
	head: () => ({ meta: [{ title: "Novo Cliente — VIVAVERDE ERP" }] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./app.catalogo-ITbD-lvV.mjs");
var Route = createFileRoute("/app/catalogo")({
	head: () => ({ meta: [{ title: "Catálogo Digital — VIVAVERDE ERP" }] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var ParceiroRoute = Route$32.update({
	id: "/parceiro",
	path: "/parceiro",
	getParentRoute: () => Route$33
});
var CatalogoRoute = Route$31.update({
	id: "/catalogo",
	path: "/catalogo",
	getParentRoute: () => Route$33
});
var AppRoute = Route$30.update({
	id: "/app",
	path: "/app",
	getParentRoute: () => Route$33
});
var IndexRoute = Route$29.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$33
});
var AppIndexRoute = Route$28.update({
	id: "/",
	path: "/",
	getParentRoute: () => AppRoute
});
var ParceiroPdvRoute = Route$27.update({
	id: "/pdv",
	path: "/pdv",
	getParentRoute: () => ParceiroRoute
});
var ParceiroLoginRoute = Route$26.update({
	id: "/login",
	path: "/login",
	getParentRoute: () => ParceiroRoute
});
var ParceiroDashboardRoute = Route$25.update({
	id: "/dashboard",
	path: "/dashboard",
	getParentRoute: () => ParceiroRoute
});
var ParceiroCadastroRoute = Route$24.update({
	id: "/cadastro",
	path: "/cadastro",
	getParentRoute: () => ParceiroRoute
});
var OrcamentoIdRoute = Route$36.update({
	id: "/orcamento/$id",
	path: "/orcamento/$id",
	getParentRoute: () => Route$33
});
var DeclaracaoIdRoute = Route$35.update({
	id: "/declaracao/$id",
	path: "/declaracao/$id",
	getParentRoute: () => Route$33
});
var AppVendedoresRoute = Route$23.update({
	id: "/vendedores",
	path: "/vendedores",
	getParentRoute: () => AppRoute
});
var AppVendasParceirosRoute = Route$22.update({
	id: "/vendas-parceiros",
	path: "/vendas-parceiros",
	getParentRoute: () => AppRoute
});
var AppVendasRoute = Route$21.update({
	id: "/vendas",
	path: "/vendas",
	getParentRoute: () => AppRoute
});
var AppVendaNovaRoute = Route$20.update({
	id: "/venda-nova",
	path: "/venda-nova",
	getParentRoute: () => AppRoute
});
var AppRelatoriosRoute = Route$19.update({
	id: "/relatorios",
	path: "/relatorios",
	getParentRoute: () => AppRoute
});
var AppRegistroRoute = Route$18.update({
	id: "/registro",
	path: "/registro",
	getParentRoute: () => AppRoute
});
var AppProdutosRoute = Route$17.update({
	id: "/produtos",
	path: "/produtos",
	getParentRoute: () => AppRoute
});
var AppProdutoNovoRoute = Route$34.update({
	id: "/produto-novo",
	path: "/produto-novo",
	getParentRoute: () => AppRoute
});
var AppPdvRoute = Route$16.update({
	id: "/pdv",
	path: "/pdv",
	getParentRoute: () => AppRoute
});
var AppNotificacoesRoute = Route$15.update({
	id: "/notificacoes",
	path: "/notificacoes",
	getParentRoute: () => AppRoute
});
var AppLogisticaRoute = Route$14.update({
	id: "/logistica",
	path: "/logistica",
	getParentRoute: () => AppRoute
});
var AppFornecedoresRoute = Route$13.update({
	id: "/fornecedores",
	path: "/fornecedores",
	getParentRoute: () => AppRoute
});
var AppFornecedorNovoRoute = Route$12.update({
	id: "/fornecedor-novo",
	path: "/fornecedor-novo",
	getParentRoute: () => AppRoute
});
var AppFiscalRoute = Route$11.update({
	id: "/fiscal",
	path: "/fiscal",
	getParentRoute: () => AppRoute
});
var AppFinanceiroRoute = Route$10.update({
	id: "/financeiro",
	path: "/financeiro",
	getParentRoute: () => AppRoute
});
var AppEstoqueRoute = Route$9.update({
	id: "/estoque",
	path: "/estoque",
	getParentRoute: () => AppRoute
});
var AppDavNovoRoute = Route$8.update({
	id: "/dav-novo",
	path: "/dav-novo",
	getParentRoute: () => AppRoute
});
var AppDavRoute = Route$7.update({
	id: "/dav",
	path: "/dav",
	getParentRoute: () => AppRoute
});
var AppDashboardRoute = Route$6.update({
	id: "/dashboard",
	path: "/dashboard",
	getParentRoute: () => AppRoute
});
var AppConfiguracoesRoute = Route$5.update({
	id: "/configuracoes",
	path: "/configuracoes",
	getParentRoute: () => AppRoute
});
var AppComprasRoute = Route$4.update({
	id: "/compras",
	path: "/compras",
	getParentRoute: () => AppRoute
});
var AppCompraNovaRoute = Route$3.update({
	id: "/compra-nova",
	path: "/compra-nova",
	getParentRoute: () => AppRoute
});
var AppClientesRoute = Route$2.update({
	id: "/clientes",
	path: "/clientes",
	getParentRoute: () => AppRoute
});
var AppClienteNovoRoute = Route$1.update({
	id: "/cliente-novo",
	path: "/cliente-novo",
	getParentRoute: () => AppRoute
});
var AppRouteChildren = {
	AppCatalogoRoute: Route.update({
		id: "/catalogo",
		path: "/catalogo",
		getParentRoute: () => AppRoute
	}),
	AppClienteNovoRoute,
	AppClientesRoute,
	AppCompraNovaRoute,
	AppComprasRoute,
	AppConfiguracoesRoute,
	AppDashboardRoute,
	AppDavRoute,
	AppDavNovoRoute,
	AppEstoqueRoute,
	AppFinanceiroRoute,
	AppFiscalRoute,
	AppFornecedorNovoRoute,
	AppFornecedoresRoute,
	AppLogisticaRoute,
	AppNotificacoesRoute,
	AppPdvRoute,
	AppProdutoNovoRoute,
	AppProdutosRoute,
	AppRegistroRoute,
	AppRelatoriosRoute,
	AppVendaNovaRoute,
	AppVendasRoute,
	AppVendasParceirosRoute,
	AppVendedoresRoute,
	AppIndexRoute
};
var AppRouteWithChildren = AppRoute._addFileChildren(AppRouteChildren);
var ParceiroRouteChildren = {
	ParceiroCadastroRoute,
	ParceiroDashboardRoute,
	ParceiroLoginRoute,
	ParceiroPdvRoute
};
var rootRouteChildren = {
	IndexRoute,
	AppRoute: AppRouteWithChildren,
	CatalogoRoute,
	ParceiroRoute: ParceiroRoute._addFileChildren(ParceiroRouteChildren),
	DeclaracaoIdRoute,
	OrcamentoIdRoute
};
var routeTree = Route$33._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };

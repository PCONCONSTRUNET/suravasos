import { i as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./supabase-B8pFCf1w.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as Button } from "./button-DiE0A9q4.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { r as Badge } from "./dist-Db34orMe.mjs";
import { _ as Search, dt as Check, f as ShoppingCart, ot as ChevronsUpDown, z as Heart } from "../_libs/lucide-react.mjs";
import { r as PageHeader } from "./app-shell-jjiopLig.mjs";
import { t as Card } from "./card-CtX3ithx.mjs";
import { n as PopoverContent, r as PopoverTrigger, t as Popover } from "./popover-CIv7SO7u.mjs";
import { a as CommandItem, i as CommandInput, n as CommandEmpty, o as CommandList, r as CommandGroup, t as Command$1 } from "./command-BrmsamRj.mjs";
import { t as ColorDock } from "./color-dock-Dm_4chJg.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app.catalogo-BUwnmbRE.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var WhatsAppIcon = ({ className }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
	xmlns: "http://www.w3.org/2000/svg",
	viewBox: "0 0 24 24",
	fill: "currentColor",
	className,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" })
});
function Catalogo() {
	const [produtos, setProdutos] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [busca, setBusca] = (0, import_react.useState)("");
	const [categoria, setCategoria] = (0, import_react.useState)("Todos");
	const [openCategoria, setOpenCategoria] = (0, import_react.useState)(false);
	const fetchProdutos = async () => {
		try {
			const { data } = await supabase.from("produtos").select("*").eq("status", "Ativo");
			if (data) setProdutos(data);
		} finally {
			setLoading(false);
		}
	};
	(0, import_react.useEffect)(() => {
		fetchProdutos();
	}, []);
	const handleShare = (nome) => {
		const text = encodeURIComponent(`Confira nosso produto: *${nome}* na VivaVerde!\nAcesse nosso catálogo: ${window.location.origin}/catalogo`);
		window.open(`https://wa.me/?text=${text}`, "_blank");
	};
	const handleShareCatalog = () => {
		const text = encodeURIComponent(`Veja nosso catálogo completo de produtos VivaVerde: ${window.location.origin}/catalogo`);
		window.open(`https://wa.me/?text=${text}`, "_blank");
	};
	const filtrados = produtos.filter((p) => {
		const matchBusca = p.nome.toLowerCase().includes(busca.toLowerCase());
		const matchCategoria = categoria === "Todos" || p.categoria === categoria;
		return matchBusca && matchCategoria;
	});
	const categoriasUnicas = ["Todos", ...Array.from(new Set(produtos.map((p) => p.categoria))).filter(Boolean)];
	const getGradient = (index) => {
		const gradients = [
			"from-emerald-100 to-green-200",
			"from-lime-100 to-emerald-200",
			"from-amber-100 to-orange-200",
			"from-green-100 to-teal-200",
			"from-pink-100 to-rose-200",
			"from-stone-100 to-stone-200",
			"from-slate-100 to-zinc-200"
		];
		return gradients[index % gradients.length];
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Catálogo Digital",
			subtitle: "Compartilhe seus produtos pelo WhatsApp, link público ou QR Code",
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				onClick: handleShareCatalog,
				className: "bg-success text-success-foreground hover:bg-success/90",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WhatsAppIcon, { className: "mr-2 h-4 w-4" }), "Compartilhar catálogo"]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			className: "shadow-card p-4 mb-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col sm:flex-row gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						placeholder: "Buscar no catálogo…",
						className: "pl-9 w-full",
						value: busca,
						onChange: (e) => setBusca(e.target.value)
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Popover, {
					open: openCategoria,
					onOpenChange: setOpenCategoria,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverTrigger, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "outline",
							role: "combobox",
							"aria-expanded": openCategoria,
							className: "w-full sm:w-[240px] justify-between",
							children: [categoria, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronsUpDown, { className: "ml-2 h-4 w-4 shrink-0 opacity-50" })]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverContent, {
						className: "w-full sm:w-[240px] p-0",
						align: "end",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Command$1, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandInput, { placeholder: "Buscar categoria..." }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CommandList, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandEmpty, { children: "Nenhuma categoria encontrada." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandGroup, { children: categoriasUnicas.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CommandItem, {
							value: c,
							onSelect: () => {
								setCategoria(c);
								setOpenCategoria(false);
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: cn("mr-2 h-4 w-4", categoria === c ? "opacity-100" : "opacity-0") }), c]
						}, c)) })] })] })
					})]
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-2 gap-3 sm:gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6",
			children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "col-span-full text-center text-muted-foreground py-8",
				children: "Carregando catálogo..."
			}) : filtrados.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "col-span-full text-center text-muted-foreground py-8",
				children: "Nenhum produto encontrado na busca."
			}) : filtrados.map((p, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "overflow-hidden shadow-card hover:shadow-elevated transition-all group",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: `relative aspect-square overflow-hidden bg-gradient-to-br ${getGradient(index)} grid place-items-center text-7xl`,
					children: [
						p.imagem ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: p.imagem,
							alt: p.nome,
							className: "w-full h-full object-cover"
						}) : p.emoji || "🪴",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "absolute top-3 right-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-white/80 backdrop-blur hover:bg-white",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "h-4 w-4 text-destructive" })
						}),
						p.estoque < 10 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							className: "absolute top-3 left-3 bg-warning text-warning-foreground border-0",
							children: "Últimas unidades"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-base font-bold mt-0.5 truncate",
							children: p.nome
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-2 flex items-baseline justify-between border-b pb-2 mb-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-primary font-display text-xl font-extrabold",
								children: ["R$ ", Number(p.valor).toFixed(2)]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-xs text-muted-foreground",
								children: [p.estoque, " disp."]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "py-1 text-xs text-muted-foreground space-y-1 border-b pb-3 mb-3",
							children: [
								p.numero && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold text-foreground",
										children: "Número:"
									}),
									" ",
									p.numero
								] }),
								p.dimensao && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold text-foreground",
										children: "Dimensões:"
									}),
									" ",
									p.dimensao
								] }),
								p.volume && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold text-foreground",
										children: "Volume:"
									}),
									" ",
									p.volume,
									" L"
								] }),
								p.comprimento && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold text-foreground",
										children: "Comprimento:"
									}),
									" ",
									p.comprimento,
									" cm"
								] }),
								p.cores && p.cores.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "pt-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-semibold text-foreground mb-1",
										children: "Cores:"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ColorDock, { colors: p.cores })]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 grid grid-cols-[1fr_auto] gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								onClick: () => handleShare(p.nome),
								size: "sm",
								className: "bg-success text-success-foreground hover:bg-success/90",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WhatsAppIcon, { className: "mr-1.5 h-3.5 w-3.5" }), "WhatsApp"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "outline",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingCart, { className: "h-3.5 w-3.5" })
							})]
						})
					]
				})]
			}, p.id))
		})
	] });
}
//#endregion
export { Catalogo as component };

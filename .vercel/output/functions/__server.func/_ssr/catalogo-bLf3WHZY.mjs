import { i as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./supabase-DyNMUxMx.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as Button } from "./button-DiE0A9q4.mjs";
import { t as VivaverdeLogo } from "./vivaverde-logo-DWXAFaeL.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { r as Badge } from "./dist-Db34orMe.mjs";
import { O as Minus, T as Package, _ as Search, dt as Check, f as ShoppingCart, g as SendHorizontal, ot as ChevronsUpDown, u as Trash2, x as Plus } from "../_libs/lucide-react.mjs";
import { t as Card } from "./card-CtX3ithx.mjs";
import { n as PopoverContent, r as PopoverTrigger, t as Popover } from "./popover-CIv7SO7u.mjs";
import { a as CommandItem, i as CommandInput, n as CommandEmpty, o as CommandList, r as CommandGroup, t as Command$1 } from "./command-BrmsamRj.mjs";
import { t as ColorDock } from "./color-dock-Dm_4chJg.mjs";
import { a as SheetTitle, i as SheetHeader, n as SheetContent, t as Sheet } from "./sheet-D34QUmVZ.mjs";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, t as Dialog } from "./dialog-Cs_KNTrv.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/catalogo-bLf3WHZY.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var WhatsAppIcon = ({ className }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
	xmlns: "http://www.w3.org/2000/svg",
	viewBox: "0 0 24 24",
	fill: "currentColor",
	className,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" })
});
function PublicCatalogo() {
	const [produtos, setProdutos] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [busca, setBusca] = (0, import_react.useState)("");
	const [categoriaAtiva, setCategoriaAtiva] = (0, import_react.useState)("Todas");
	const [openCategoria, setOpenCategoria] = (0, import_react.useState)(false);
	const [cart, setCart] = (0, import_react.useState)([]);
	const [openCart, setOpenCart] = (0, import_react.useState)(false);
	const [modalProduto, setModalProduto] = (0, import_react.useState)(null);
	const [modalQtd, setModalQtd] = (0, import_react.useState)(1);
	const [partnerPhone, setPartnerPhone] = (0, import_react.useState)("5519997331112");
	const [partnerId, setPartnerId] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		const fetchProdutos = async () => {
			const { data } = await supabase.from("produtos").select("*").eq("status", "Ativo");
			if (data) setProdutos(data);
			setLoading(false);
		};
		const fetchPartner = async () => {
			const ref = new URLSearchParams(window.location.search).get("ref");
			if (ref) {
				let query = supabase.from("vendedores").select("id, telefone, status").eq("status", "Ativo");
				if (ref.length > 20) query = query.eq("id", ref);
				else query = query.ilike("nome", `${ref}%`);
				const { data } = await query.limit(1).maybeSingle();
				if (data && data.telefone) {
					let fone = data.telefone.replace(/\D/g, "");
					if (!fone.startsWith("55")) fone = "55" + fone;
					setPartnerPhone(fone);
					setPartnerId(data.id);
				}
			}
		};
		fetchProdutos();
		fetchPartner();
	}, []);
	const categorias = Array.from(new Set(produtos.map((p) => p.categoria))).filter(Boolean);
	const filtrados = produtos.filter((p) => {
		const matchBusca = p.nome.toLowerCase().includes(busca.toLowerCase());
		const matchCategoria = categoriaAtiva === "Todas" || p.categoria === categoriaAtiva;
		return matchBusca && matchCategoria;
	});
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
	const handleOpenModal = (produto) => {
		setModalProduto(produto);
		const jaNoCarrinho = cart.find((i) => i.id === produto.id);
		setModalQtd(jaNoCarrinho ? jaNoCarrinho.quantidade : 1);
	};
	const handleConfirmAdd = () => {
		if (!modalProduto) return;
		setCart((prev) => {
			if (prev.find((i) => i.id === modalProduto.id)) return prev.map((i) => i.id === modalProduto.id ? {
				...i,
				quantidade: modalQtd
			} : i);
			return [...prev, {
				id: modalProduto.id,
				nome: modalProduto.nome,
				codigo: modalProduto.codigo || "",
				valor: Number(modalProduto.valor),
				estoque: Number(modalProduto.estoque),
				imagem: modalProduto.imagem,
				emoji: modalProduto.emoji,
				quantidade: modalQtd
			}];
		});
		setModalProduto(null);
	};
	const updateQtd = (id, delta) => {
		setCart((prev) => prev.map((i) => i.id === id ? {
			...i,
			quantidade: Math.max(1, Math.min(i.estoque, i.quantidade + delta))
		} : i));
	};
	const removeFromCart = (id) => {
		setCart((prev) => prev.filter((i) => i.id !== id));
	};
	const totalItens = cart.reduce((acc, i) => acc + i.quantidade, 0);
	const totalValor = cart.reduce((acc, i) => acc + i.quantidade * i.valor, 0);
	const handleEnviarPedido = () => {
		if (cart.length === 0) return;
		const pedidoData = cart.map((item) => [item.id, item.quantidade]);
		const base64 = btoa(unescape(encodeURIComponent(JSON.stringify(pedidoData))));
		const linkPath = partnerId ? "/parceiro/dav" : "/app/dav-novo";
		const link = `${window.location.origin}${linkPath}?pedido=${base64}`;
		const linhasProdutos = cart.map((i) => `▪ *${i.nome}* — Qtd: ${i.quantidade} × R$ ${i.valor.toFixed(2).replace(".", ",")} = *R$ ${(i.quantidade * i.valor).toFixed(2).replace(".", ",")}*`).join("\n");
		const mensagem = `${partnerId ? "Olá!" : "Olá Douglas!"} Tenho um pedido pronto pelo catálogo 🛒\n\n${linhasProdutos}\n\n*Total: R$ ${totalValor.toFixed(2).replace(".", ",")}*\n\n👇 Clique no link abaixo para abrir o pedido no sistema:\n${link}`;
		const text = encodeURIComponent(mensagem);
		window.open(`https://wa.me/${partnerPhone}?text=${text}`, "_blank");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-slate-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-white px-4 md:px-8 shadow-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VivaverdeLogo, { size: "small" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => setOpenCart(true),
					className: "relative flex items-center gap-2 rounded-full bg-emerald-50 border border-emerald-200 px-4 py-2 text-sm font-semibold text-emerald-700 hover:bg-emerald-100 transition-colors",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingCart, { className: "h-5 w-5" }),
						"Carrinho",
						totalItens > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "absolute -top-2 -right-2 h-5 w-5 rounded-full bg-emerald-600 text-white text-xs font-bold grid place-items-center shadow",
							children: totalItens
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "mx-auto max-w-6xl p-4 py-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-8 text-center max-w-2xl mx-auto",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-3xl md:text-4xl font-display font-bold text-slate-900",
							children: "Catálogo de Produtos"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-muted-foreground mt-3 text-lg",
							children: "Confira nossos vasos, suportes e acessórios e monte seu pedido direto pelo WhatsApp."
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "max-w-md mx-auto mb-6 relative",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							placeholder: "Buscar por vasos, cores, modelos...",
							className: "pl-10 h-12 bg-white shadow-sm text-base rounded-full",
							value: busca,
							onChange: (e) => setBusca(e.target.value)
						})]
					}),
					categorias.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex justify-center mb-10 px-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Popover, {
							open: openCategoria,
							onOpenChange: setOpenCategoria,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverTrigger, {
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									variant: "outline",
									role: "combobox",
									className: "w-full max-w-sm justify-between rounded-full bg-white shadow-sm h-12 text-base font-medium",
									children: [categoriaAtiva === "Todas" ? "Todas as Categorias" : categoriaAtiva, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronsUpDown, { className: "ml-2 h-4 w-4 shrink-0 opacity-50" })]
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverContent, {
								className: "w-[--radix-popover-trigger-width] max-w-[350px] p-0 rounded-xl",
								align: "center",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Command$1, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandInput, { placeholder: "Buscar categoria..." }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CommandList, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandEmpty, { children: "Nenhuma categoria encontrada." }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CommandGroup, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CommandItem, {
									value: "Todas as Categorias",
									onSelect: () => {
										setCategoriaAtiva("Todas");
										setOpenCategoria(false);
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: cn("mr-2 h-4 w-4", categoriaAtiva === "Todas" ? "opacity-100" : "opacity-0") }), "Todas as Categorias"]
								}), categorias.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CommandItem, {
									value: c,
									onSelect: () => {
										setCategoriaAtiva(c);
										setOpenCategoria(false);
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: cn("mr-2 h-4 w-4", categoriaAtiva === c ? "opacity-100" : "opacity-0") }), c]
								}, c))] })] })] })
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-2 gap-4 sm:gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5",
						children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "col-span-full text-center text-muted-foreground py-8",
							children: "Carregando catálogo..."
						}) : filtrados.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "col-span-full text-center text-muted-foreground py-8",
							children: "Nenhum produto encontrado com essa busca."
						}) : filtrados.map((p, index) => {
							const noCarrinho = cart.find((i) => i.id === p.id);
							const estoqueNum = Number(p.estoque);
							const semEstoque = estoqueNum <= 0;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
								className: "overflow-hidden shadow-card hover:shadow-elevated transition-all flex flex-col bg-white border-0 ring-1 ring-slate-900/5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: `relative aspect-square overflow-hidden bg-gradient-to-br ${getGradient(index)} grid place-items-center text-7xl`,
									children: [
										p.imagem ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: p.imagem,
											alt: p.nome,
											className: "w-full h-full object-cover"
										}) : p.emoji || "🪴",
										estoqueNum < 10 && estoqueNum > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
											className: "absolute top-3 left-3 bg-warning text-warning-foreground border-0 shadow-sm",
											children: "Últimas unidades"
										}),
										semEstoque && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
											className: "absolute top-3 left-3 bg-destructive text-destructive-foreground border-0 shadow-sm",
											children: "Esgotado"
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "p-4 flex flex-col flex-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "font-display text-base font-bold text-slate-800 leading-tight",
											children: p.nome
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-primary font-display text-xl font-extrabold mt-1",
											children: ["R$ ", Number(p.valor).toFixed(2).replace(".", ",")]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-1.5 mt-1.5 mb-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, { className: "h-3.5 w-3.5 text-slate-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: `text-xs font-medium ${semEstoque ? "text-destructive" : estoqueNum < 10 ? "text-warning" : "text-slate-500"}`,
												children: semEstoque ? "Sem estoque" : `${estoqueNum} em estoque`
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "py-2 text-xs text-slate-500 space-y-1 border-b mb-3",
											children: [
												p.numero && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "font-medium text-slate-700",
														children: "Número:"
													}),
													" ",
													p.numero
												] }),
												p.dimensao && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "font-medium text-slate-700",
														children: "Dimensões:"
													}),
													" ",
													p.dimensao
												] }),
												p.volume && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "font-medium text-slate-700",
														children: "Volume:"
													}),
													" ",
													p.volume,
													" L"
												] }),
												p.comprimento && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "font-medium text-slate-700",
														children: "Comprimento:"
													}),
													" ",
													p.comprimento,
													" cm"
												] }),
												p.cores && p.cores.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "mt-1.5",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "font-medium text-slate-700 mb-1",
														children: "Cores disponíveis:"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ColorDock, { colors: p.cores })]
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "mt-auto",
											children: noCarrinho ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												onClick: () => handleOpenModal(p),
												className: "w-full h-10 rounded-lg bg-emerald-600 text-white text-sm font-semibold flex items-center justify-center gap-2 hover:bg-emerald-700 transition-colors shadow-sm",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingCart, { className: "h-4 w-4" }),
													"No carrinho (",
													noCarrinho.quantidade,
													")"
												]
											}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												disabled: semEstoque,
												onClick: () => !semEstoque && handleOpenModal(p),
												className: `w-full h-10 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-colors shadow-sm
                          ${semEstoque ? "bg-slate-100 text-slate-400 cursor-not-allowed" : "bg-slate-900 text-white hover:bg-slate-800"}`,
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), "Adicionar ao Carrinho"]
											})
										})
									]
								})]
							}, p.id);
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: !!modalProduto,
				onOpenChange: (open) => !open && setModalProduto(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "max-w-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Escolher quantidade" }) }),
						modalProduto && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-4 py-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-16 w-16 rounded-xl bg-gradient-to-br from-emerald-100 to-green-200 grid place-items-center text-3xl overflow-hidden shrink-0",
										children: modalProduto.imagem ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: modalProduto.imagem,
											alt: modalProduto.nome,
											className: "w-full h-full object-cover"
										}) : modalProduto.emoji || "🪴"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-bold text-slate-800",
											children: modalProduto.nome
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-primary font-semibold",
											children: ["R$ ", Number(modalProduto.valor).toFixed(2).replace(".", ",")]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-xs text-slate-500 flex items-center gap-1 mt-0.5",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, { className: "h-3 w-3" }),
												" ",
												Number(modalProduto.estoque),
												" disponíveis"
											]
										})
									] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-center gap-4 py-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => setModalQtd((q) => Math.max(1, q - 1)),
											className: "h-10 w-10 rounded-full border-2 border-slate-200 flex items-center justify-center hover:bg-slate-100 transition-colors",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "h-4 w-4" })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-3xl font-bold w-12 text-center",
											children: modalQtd
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => setModalQtd((q) => Math.min(Number(modalProduto.estoque), q + 1)),
											className: "h-10 w-10 rounded-full border-2 border-emerald-500 bg-emerald-50 flex items-center justify-center hover:bg-emerald-100 transition-colors text-emerald-700",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" })
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-center text-sm text-slate-500",
									children: ["Subtotal: ", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "font-bold text-slate-800",
										children: ["R$ ", (modalQtd * Number(modalProduto.valor)).toFixed(2).replace(".", ",")]
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							onClick: () => setModalProduto(null),
							children: "Cancelar"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							onClick: handleConfirmAdd,
							className: "bg-emerald-600 hover:bg-emerald-700 text-white",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingCart, { className: "mr-2 h-4 w-4" }), "Confirmar"]
						})] })
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
				open: openCart,
				onOpenChange: setOpenCart,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
					className: "w-full sm:max-w-md flex flex-col p-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetHeader, {
							className: "px-6 py-4 border-b",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetTitle, {
								className: "flex items-center gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingCart, { className: "h-5 w-5 text-emerald-600" }),
									"Meu Carrinho",
									totalItens > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
										className: "bg-emerald-600 text-white border-0 ml-1",
										children: [
											totalItens,
											" ",
											totalItens === 1 ? "item" : "itens"
										]
									})
								]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex-1 overflow-y-auto px-6 py-4 space-y-3",
							children: cart.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col items-center justify-center h-full text-center gap-4 py-12",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-20 w-20 rounded-2xl bg-slate-100 grid place-items-center text-4xl",
									children: "🛒"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-semibold text-slate-700",
									children: "Seu carrinho está vazio"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-slate-400 mt-1",
									children: "Adicione produtos do catálogo"
								})] })]
							}) : cart.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3 p-3 rounded-xl border border-slate-100 bg-white shadow-sm",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-14 w-14 rounded-lg bg-gradient-to-br from-emerald-100 to-green-200 grid place-items-center text-2xl shrink-0 overflow-hidden",
										children: item.imagem ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: item.imagem,
											alt: item.nome,
											className: "w-full h-full object-cover"
										}) : item.emoji || "🪴"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex-1 min-w-0",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "font-semibold text-sm text-slate-800 truncate",
												children: item.nome
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "text-xs text-slate-500",
												children: [
													"R$ ",
													item.valor.toFixed(2).replace(".", ","),
													"/un"
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "text-sm font-bold text-emerald-700 mt-0.5",
												children: ["R$ ", (item.quantidade * item.valor).toFixed(2).replace(".", ",")]
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-col items-center gap-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-1.5",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													onClick: () => updateQtd(item.id, -1),
													className: "h-7 w-7 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-100 text-slate-600 transition-colors",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "h-3 w-3" })
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "w-6 text-center font-bold text-sm",
													children: item.quantidade
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													onClick: () => updateQtd(item.id, 1),
													disabled: item.quantidade >= item.estoque,
													className: "h-7 w-7 rounded-full border border-emerald-400 bg-emerald-50 flex items-center justify-center hover:bg-emerald-100 text-emerald-700 transition-colors disabled:opacity-40",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-3 w-3" })
												})
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => removeFromCart(item.id),
											className: "text-slate-300 hover:text-destructive transition-colors",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
										})]
									})
								]
							}, item.id))
						}),
						cart.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "border-t px-6 py-4 space-y-3 bg-white",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between items-center",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-slate-600 font-medium",
										children: "Total do pedido"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-2xl font-bold text-slate-900",
										children: ["R$ ", totalValor.toFixed(2).replace(".", ",")]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: handleEnviarPedido,
									className: "w-full h-13 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold text-base flex items-center justify-center gap-2.5 transition-colors shadow-lg shadow-green-200",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WhatsAppIcon, { className: "h-5 w-5" }),
										"Enviar pedido via WhatsApp",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SendHorizontal, { className: "h-4 w-4" })
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-center text-slate-400",
									children: "Um link será gerado e enviado no WhatsApp com o pedido completo"
								})
							]
						})
					]
				})
			})
		]
	});
}
//#endregion
export { PublicCatalogo as component };

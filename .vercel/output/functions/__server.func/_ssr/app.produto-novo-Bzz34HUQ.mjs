import { i as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./supabase-B8pFCf1w.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { F as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as Button } from "./button-BkEeRci-.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { t as Badge } from "./badge-D1Dupn2y.mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { F as Link$1, L as Image$1, Z as CloudUpload, bt as ArrowLeft, t as X, v as Save, x as Plus } from "../_libs/lucide-react.mjs";
import { n as PageHeader } from "./app-shell-BDkgzrqS.mjs";
import { t as Card } from "./card-CtX3ithx.mjs";
import { t as Label } from "./label-DBD1bRRP.mjs";
import { t as Route } from "./app.produto-novo-C4xu2P37.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app.produto-novo-Bzz34HUQ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function NovoProduto() {
	const navigate = useNavigate();
	const search = Route.useSearch();
	const isEditing = !!search.id;
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [isFetchingInfo, setIsFetchingInfo] = (0, import_react.useState)(isEditing);
	const [produto, setProduto] = (0, import_react.useState)({
		codigo: "",
		nome: "",
		categoria: "Vasos Plásticos",
		estoque: 0,
		valor: 0,
		status: "Ativo",
		imagem: "",
		numero: "",
		dimensao: "",
		volume: "",
		comprimento: "",
		cores: []
	});
	const [categoriasDB, setCategoriasDB] = (0, import_react.useState)([
		"Vasos Plásticos",
		"Vasos Decorativos",
		"Vasos de Produção",
		"Floreiras",
		"Cuias",
		"Pratos",
		"Suportes",
		"Acessórios"
	]);
	const [isNovaCategoria, setIsNovaCategoria] = (0, import_react.useState)(false);
	const [novaCategoria, setNovaCategoria] = (0, import_react.useState)("");
	const [corInput, setCorInput] = (0, import_react.useState)("");
	const fetchCategorias = async () => {
		try {
			const { data } = await supabase.from("produtos").select("categoria");
			if (data) {
				const unicas = Array.from(new Set(data.map((p) => p.categoria))).filter(Boolean);
				setCategoriasDB(Array.from(new Set([...categoriasDB, ...unicas])));
			}
		} catch (err) {
			console.error(err);
		}
	};
	(0, import_react.useEffect)(() => {
		fetchCategorias();
		if (isEditing) {
			const fetchProduto = async () => {
				try {
					const { data, error } = await supabase.from("produtos").select("*").eq("id", search.id).single();
					if (error) throw error;
					if (data) setProduto({
						codigo: data.codigo || "",
						nome: data.nome || "",
						categoria: data.categoria || "Vasos Plásticos",
						estoque: data.estoque || 0,
						valor: data.valor || 0,
						status: data.status || "Ativo",
						imagem: data.imagem || "",
						numero: data.numero || "",
						dimensao: data.dimensao || "",
						volume: data.volume || "",
						comprimento: data.comprimento || "",
						cores: data.cores || []
					});
				} catch (err) {
					console.error(err);
					alert("Erro ao carregar os dados do produto.");
				} finally {
					setIsFetchingInfo(false);
				}
			};
			fetchProduto();
		}
	}, [isEditing, search.id]);
	const [imageUrlInput, setImageUrlInput] = (0, import_react.useState)("");
	const fileInputRef = (0, import_react.useRef)(null);
	const compressImage = (file) => {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = (event) => {
				const img = new Image();
				img.src = event.target?.result;
				img.onload = () => {
					const canvas = document.createElement("canvas");
					const MAX_WIDTH = 800;
					const MAX_HEIGHT = 800;
					let width = img.width;
					let height = img.height;
					if (width > height) {
						if (width > MAX_WIDTH) {
							height *= MAX_WIDTH / width;
							width = MAX_WIDTH;
						}
					} else if (height > MAX_HEIGHT) {
						width *= MAX_HEIGHT / height;
						height = MAX_HEIGHT;
					}
					canvas.width = width;
					canvas.height = height;
					const ctx = canvas.getContext("2d");
					if (!ctx) return reject("Canvas not supported");
					ctx.drawImage(img, 0, 0, width, height);
					resolve(canvas.toDataURL("image/webp", .8));
				};
				img.onerror = (err) => reject(err);
			};
			reader.onerror = (err) => reject(err);
		});
	};
	const handleFileChange = async (e) => {
		const file = e.target.files?.[0];
		if (file) {
			if (!file.type.startsWith("image/")) return alert("Por favor, selecione uma imagem.");
			try {
				const compressed = await compressImage(file);
				setProduto((prev) => ({
					...prev,
					imagem: compressed
				}));
			} catch (err) {
				alert("Erro ao processar imagem.");
			}
		}
	};
	(0, import_react.useEffect)(() => {
		const handlePaste = async (e) => {
			const items = e.clipboardData?.items;
			if (!items) return;
			for (const item of Array.from(items)) if (item.type.indexOf("image") !== -1) {
				const file = item.getAsFile();
				if (file) try {
					const compressed = await compressImage(file);
					setProduto((prev) => ({
						...prev,
						imagem: compressed
					}));
				} catch (err) {
					alert("Erro ao processar imagem colada.");
				}
			}
		};
		document.addEventListener("paste", handlePaste);
		return () => document.removeEventListener("paste", handlePaste);
	}, []);
	const handleAddUrl = () => {
		if (imageUrlInput.trim().startsWith("http")) {
			setProduto((prev) => ({
				...prev,
				imagem: imageUrlInput.trim()
			}));
			setImageUrlInput("");
		} else alert("Insira uma URL válida começando com http:// ou https://");
	};
	const removeImage = () => setProduto((prev) => ({
		...prev,
		imagem: ""
	}));
	const handleAddCor = (e) => {
		if (e.type === "keydown" && e.key === "Enter" || e.type === "click") {
			e.preventDefault();
			const cor = corInput.trim();
			if (cor && !produto.cores.includes(cor)) {
				setProduto((prev) => ({
					...prev,
					cores: [...prev.cores, cor]
				}));
				setCorInput("");
			}
		}
	};
	const removeCor = (corToRemove) => {
		setProduto((prev) => ({
			...prev,
			cores: prev.cores.filter((c) => c !== corToRemove)
		}));
	};
	const handleSalvar = async () => {
		if (!produto.nome || !produto.codigo) {
			alert("Preencha o código e o nome do produto.");
			return;
		}
		const categoriaFinal = isNovaCategoria ? novaCategoria.trim() : produto.categoria;
		if (isNovaCategoria && !categoriaFinal) {
			alert("Digite o nome da nova categoria.");
			return;
		}
		setLoading(true);
		try {
			const payload = {
				codigo: produto.codigo,
				nome: produto.nome,
				categoria: categoriaFinal,
				estoque: produto.estoque,
				valor: produto.valor,
				status: produto.status,
				imagem: produto.imagem,
				numero: produto.numero || null,
				dimensao: produto.dimensao || null,
				volume: produto.volume || null,
				comprimento: produto.comprimento || null,
				cores: produto.cores
			};
			if (isEditing) {
				const { error } = await supabase.from("produtos").update(payload).eq("id", search.id);
				if (error) {
					if (error.code === "23505") throw new Error("Já existe um produto com este código!");
					throw error;
				}
			} else {
				const { error } = await supabase.from("produtos").insert([payload]);
				if (error) {
					if (error.code === "23505") throw new Error("Já existe um produto com este código!");
					throw error;
				}
			}
			navigate({ to: "/app/produtos" });
		} catch (err) {
			console.error(err);
			alert("Erro ao salvar produto: " + err.message);
		} finally {
			setLoading(false);
		}
	};
	if (isFetchingInfo) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "p-8 text-center text-muted-foreground",
		children: "Carregando produto..."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: isEditing ? "Editar Produto" : "Novo Produto",
		subtitle: isEditing ? "Atualize as informações do item" : "Cadastre um novo item no sistema",
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			variant: "outline",
			asChild: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/app/produtos",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "mr-2 h-4 w-4" }), " Voltar"]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			className: "bg-gradient-brand text-primary-foreground",
			onClick: handleSalvar,
			disabled: loading,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "mr-2 h-4 w-4" }),
				" ",
				loading ? "Salvando..." : "Salvar Produto"
			]
		})] })
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "shadow-card p-6 max-w-5xl mx-auto grid gap-8 md:grid-cols-[1fr_320px]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-semibold text-lg border-b pb-2",
						children: "Informações Básicas"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Código (SKU)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: produto.codigo,
								onChange: (e) => setProduto({
									...produto,
									codigo: e.target.value
								}),
								placeholder: "Ex: VPL017"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Status" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								className: "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
								value: produto.status,
								onChange: (e) => setProduto({
									...produto,
									status: e.target.value
								}),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Ativo" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Crítico" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Inativo" })
								]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Nome do Produto / Modelo" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: produto.nome,
							onChange: (e) => setProduto({
								...produto,
								nome: e.target.value
							}),
							placeholder: "Ex: Cuia C 13"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Categoria" }), !isNovaCategoria ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							className: "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
							value: produto.categoria,
							onChange: (e) => {
								if (e.target.value === "NOVA_CATEGORIA") setIsNovaCategoria(true);
								else setProduto({
									...produto,
									categoria: e.target.value
								});
							},
							children: [categoriasDB.map((cat) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: cat,
								children: cat
							}, cat)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "NOVA_CATEGORIA",
								className: "font-bold text-primary",
								children: "+ Adicionar Nova Categoria..."
							})]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								autoFocus: true,
								placeholder: "Nome da nova categoria",
								value: novaCategoria,
								onChange: (e) => setNovaCategoria(e.target.value)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								onClick: () => {
									setIsNovaCategoria(false);
									setNovaCategoria("");
								},
								children: "Cancelar"
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Estoque Inicial" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "number",
								min: "0",
								value: produto.estoque,
								onChange: (e) => setProduto({
									...produto,
									estoque: Number(e.target.value)
								})
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Valor Unitário (R$)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "number",
								min: "0",
								step: "0.01",
								value: produto.valor,
								onChange: (e) => setProduto({
									...produto,
									valor: Number(e.target.value)
								})
							})]
						})]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-4 bg-muted/30 p-4 rounded-xl border",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-semibold text-lg border-b pb-2 flex items-center gap-2",
						children: "🪴 Especificações do Catálogo Sura Vasos"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Número / Referência" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: produto.numero,
									onChange: (e) => setProduto({
										...produto,
										numero: e.target.value
									}),
									placeholder: "Ex: 0, 1, Violeta, Mini"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Dimensões (cm) D x h x d" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: produto.dimensao,
									onChange: (e) => setProduto({
										...produto,
										dimensao: e.target.value
									}),
									placeholder: "Ex: 12,5 x 6,5 x 7,5"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Volume (L)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: produto.volume,
									onChange: (e) => setProduto({
										...produto,
										volume: e.target.value
									}),
									placeholder: "Ex: 0,5"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Comprimento (Alças)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: produto.comprimento,
									onChange: (e) => setProduto({
										...produto,
										comprimento: e.target.value
									}),
									placeholder: "Ex: 39 cm"
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-3 pt-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Cores Disponíveis" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: corInput,
									onChange: (e) => setCorInput(e.target.value),
									onKeyDown: handleAddCor,
									placeholder: "Ex: Preto, Cerâmica (Pressione Enter para adicionar)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "secondary",
									onClick: handleAddCor,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" })
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap gap-2 mt-2",
								children: [produto.cores.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs text-muted-foreground italic",
									children: "Nenhuma cor informada"
								}), produto.cores.map((cor) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
									variant: "secondary",
									className: "pl-3 pr-1 py-1 flex items-center gap-1 bg-white border shadow-sm",
									children: [cor, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => removeCor(cor),
										className: "hover:bg-muted rounded-full p-0.5",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-3 w-3" })
									})]
								}, cor))]
							})
						]
					})
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-4 border-l pl-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image$1, { className: "h-4 w-4" }), " Foto do Produto"]
				}),
				produto.imagem ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative group rounded-xl overflow-hidden border border-border bg-muted aspect-square",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: produto.imagem,
						alt: "Preview",
						className: "w-full h-full object-cover"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity grid place-items-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "destructive",
							size: "sm",
							onClick: removeImage,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4 mr-1.5" }), " Remover Foto"]
						})
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col items-center justify-center p-6 border-2 border-dashed border-border rounded-xl bg-muted/30 aspect-square text-center hover:bg-muted/50 transition-colors",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloudUpload, { className: "h-10 w-10 text-muted-foreground mb-3" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-semibold",
							children: "Clique ou Cole a foto"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground mt-1 mb-4",
							children: "Suporta Ctrl+V (Área de transferência)"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "secondary",
							onClick: () => fileInputRef.current?.click(),
							children: "Escolher Arquivo"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "file",
							ref: fileInputRef,
							className: "hidden",
							accept: "image/*",
							onChange: handleFileChange
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute inset-0 flex items-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-full border-t" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "relative flex justify-center text-xs uppercase",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "bg-card px-2 text-muted-foreground",
							children: "Ou por link"
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, { className: "absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: imageUrlInput,
							onChange: (e) => setImageUrlInput(e.target.value),
							placeholder: "https://exemplo.com/vaso.jpg",
							className: "pl-8 text-xs"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "outline",
						onClick: handleAddUrl,
						children: "Add"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[10px] text-muted-foreground text-center",
					children: "As imagens adicionadas por arquivo/colar são comprimidas automaticamente para economizar espaço."
				})
			]
		})]
	})] });
}
//#endregion
export { NovoProduto as component };

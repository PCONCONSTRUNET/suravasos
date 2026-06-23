import { i as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./supabase-B8pFCf1w.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { F as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as Button } from "./button-BkEeRci-.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { _ as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as Map, a as UserPlus, bt as ArrowRight, dt as Check, f as ShoppingCart, gt as Boxes, n as Wallet, ot as ChevronsUpDown, y as Receipt } from "../_libs/lucide-react.mjs";
import { n as PageHeader } from "./app-shell-BDkgzrqS.mjs";
import { n as CardContent, t as Card } from "./card-CtX3ithx.mjs";
import { n as PopoverContent, r as PopoverTrigger, t as Popover } from "./popover-Cmlz_mk1.mjs";
import { a as CommandItem, i as CommandInput, n as CommandEmpty, o as CommandList, r as CommandGroup, t as Command$1 } from "./command-BrmsamRj.mjs";
import { t as Label } from "./label-DBD1bRRP.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-Dg1urBTx.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Drawer } from "../_libs/vaul.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app.registro-CMEtGUhs.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Drawer$1 = ({ shouldScaleBackground = true, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer.Root, {
	shouldScaleBackground,
	...props
});
Drawer$1.displayName = "Drawer";
var DrawerTrigger = Drawer.Trigger;
var DrawerPortal = Drawer.Portal;
var DrawerClose = Drawer.Close;
var DrawerOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer.Overlay, {
	ref,
	className: cn("fixed inset-0 z-50 bg-black/80", className),
	...props
}));
DrawerOverlay.displayName = Drawer.Overlay.displayName;
var DrawerContent = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DrawerPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrawerOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Drawer.Content, {
	ref,
	className: cn("fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-[10px] border bg-background", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted" }), children]
})] }));
DrawerContent.displayName = "DrawerContent";
var DrawerHeader = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("grid gap-1.5 p-4 text-center sm:text-left", className),
	...props
});
DrawerHeader.displayName = "DrawerHeader";
var DrawerFooter = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("mt-auto flex flex-col gap-2 p-4", className),
	...props
});
DrawerFooter.displayName = "DrawerFooter";
var DrawerTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer.Title, {
	ref,
	className: cn("text-lg font-semibold leading-none tracking-tight", className),
	...props
}));
DrawerTitle.displayName = Drawer.Title.displayName;
var DrawerDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer.Description, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
DrawerDescription.displayName = Drawer.Description.displayName;
function RegistroRapido() {
	const navigate = useNavigate();
	const [produtos, setProdutos] = (0, import_react.useState)([]);
	const [openProduto, setOpenProduto] = (0, import_react.useState)(false);
	const [produtoSelecionado, setProdutoSelecionado] = (0, import_react.useState)(null);
	const [rotas, setRotas] = (0, import_react.useState)([]);
	const [openRota, setOpenRota] = (0, import_react.useState)(false);
	const [rotaSelecionada, setRotaSelecionada] = (0, import_react.useState)(null);
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [clienteNome, setClienteNome] = (0, import_react.useState)("");
	const [qtd, setQtd] = (0, import_react.useState)("1");
	const [valorVenda, setValorVenda] = (0, import_react.useState)("");
	const [descFinanca, setDescFinanca] = (0, import_react.useState)("");
	const [valorFinanca, setValorFinanca] = (0, import_react.useState)("");
	const [tipoFinanca, setTipoFinanca] = (0, import_react.useState)("receita");
	const [statusFinanca, setStatusFinanca] = (0, import_react.useState)("paga");
	const [clienteNomeCad, setClienteNomeCad] = (0, import_react.useState)("");
	const [clienteTelCad, setClienteTelCad] = (0, import_react.useState)("");
	const [clienteCpfCad, setClienteCpfCad] = (0, import_react.useState)("");
	const [qtdEstoque, setQtdEstoque] = (0, import_react.useState)("");
	const [acaoEstoque, setAcaoEstoque] = (0, import_react.useState)("entrada");
	const [motorista, setMotorista] = (0, import_react.useState)("");
	const [pedidoRef, setPedidoRef] = (0, import_react.useState)("");
	const [statusEntrega, setStatusEntrega] = (0, import_react.useState)("pendente");
	const [fornecedor, setFornecedor] = (0, import_react.useState)("");
	const [qtdCompra, setQtdCompra] = (0, import_react.useState)("1");
	const [custoCompra, setCustoCompra] = (0, import_react.useState)("");
	const drawerCloseRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		supabase.from("produtos").select("*").eq("status", "Ativo").then(({ data }) => {
			if (data) setProdutos(data);
		});
		supabase.from("rotas").select("*").order("created_at", { ascending: false }).then(({ data }) => {
			if (data) setRotas(data);
		});
	}, []);
	const handleSalvar = async (actionId) => {
		setSaving(true);
		try {
			if (actionId === "venda") {
				if (!produtoSelecionado) throw new Error("Selecione um produto.");
				const { data: venda } = await supabase.from("vendas").insert([{
					tipo: "PDV",
					status: "Pago",
					valor_total: Number(valorVenda) || produtoSelecionado.preco_venda * Number(qtd)
				}]).select().single();
				if (venda) {
					await supabase.from("vendas_itens").insert([{
						venda_id: venda.id,
						produto_id: produtoSelecionado.id,
						quantidade: Number(qtd),
						valor_unitario: produtoSelecionado.preco_venda,
						subtotal: produtoSelecionado.preco_venda * Number(qtd)
					}]);
					await supabase.from("produtos").update({ estoque: Math.max(0, (produtoSelecionado.estoque || 0) - Number(qtd)) }).eq("id", produtoSelecionado.id);
				}
				toast.success("Venda registrada com sucesso!");
			} else if (actionId === "financas") {
				if (!descFinanca || !valorFinanca) throw new Error("Preencha descricao e valor.");
				const table = tipoFinanca === "receita" ? "contas_receber" : "contas_pagar";
				await supabase.from(table).insert([{
					descricao: descFinanca,
					valor: Number(valorFinanca),
					status: statusFinanca === "paga" ? "Pago" : "Pendente",
					vencimento: (/* @__PURE__ */ new Date()).toISOString().split("T")[0]
				}]);
				toast.success("Lancamento financeiro salvo!");
			} else if (actionId === "cliente") {
				if (!clienteNomeCad) throw new Error("Preencha o nome do cliente.");
				await supabase.from("clientes").insert([{
					nome: clienteNomeCad,
					telefone: clienteTelCad,
					cpf_cnpj: clienteCpfCad
				}]);
				toast.success("Cliente cadastrado com sucesso!");
			} else if (actionId === "estoque") {
				if (!produtoSelecionado || !qtdEstoque) throw new Error("Selecione produto e quantidade.");
				const delta = acaoEstoque === "entrada" ? Number(qtdEstoque) : -Number(qtdEstoque);
				await supabase.from("movimentacoes_estoque").insert([{
					produto_id: produtoSelecionado.id,
					tipo: acaoEstoque === "entrada" ? "Entrada" : "Saida",
					quantidade: Number(qtdEstoque),
					motivo: "Registro Rapido"
				}]);
				await supabase.from("produtos").update({ estoque: Math.max(0, (produtoSelecionado.estoque || 0) + delta) }).eq("id", produtoSelecionado.id);
				toast.success("Estoque atualizado com sucesso!");
			} else if (actionId === "entregas") {
				if (!motorista) throw new Error("Preencha o motorista/entregador.");
				await supabase.from("rotas").insert([{
					motorista,
					status: statusEntrega,
					pedidos: pedidoRef ? [pedidoRef] : []
				}]);
				toast.success("Entrega registrada com sucesso!");
			} else if (actionId === "compra") {
				if (!fornecedor || !produtoSelecionado) throw new Error("Preencha fornecedor e produto.");
				await supabase.from("contas_pagar").insert([{
					descricao: `Compra: ${produtoSelecionado.nome} de ${fornecedor}`,
					valor: Number(custoCompra),
					status: "Pendente",
					vencimento: (/* @__PURE__ */ new Date()).toISOString().split("T")[0]
				}]);
				await supabase.from("movimentacoes_estoque").insert([{
					produto_id: produtoSelecionado.id,
					tipo: "Entrada",
					quantidade: Number(qtdCompra),
					motivo: `Compra de ${fornecedor}`
				}]);
				await supabase.from("produtos").update({ estoque: (produtoSelecionado.estoque || 0) + Number(qtdCompra) }).eq("id", produtoSelecionado.id);
				toast.success("Compra registrada com sucesso!");
			}
			drawerCloseRef.current?.click();
		} catch (err) {
			toast.error("Erro: " + err.message);
		} finally {
			setSaving(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pb-24",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Registro Rapido",
			subtitle: "Acoes frequentes otimizadas para uso rapido pelo celular."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4",
			children: [
				{
					id: "venda",
					title: "Nova Venda",
					description: "Ir para o PDV ou criar um pedido",
					icon: ShoppingCart,
					to: "/app/pdv",
					color: "bg-blue-500",
					lightColor: "bg-blue-500/10 text-blue-500"
				},
				{
					id: "financas",
					title: "Financas",
					description: "Lancar receitas ou despesas",
					icon: Wallet,
					to: "/app/financeiro",
					color: "bg-emerald-500",
					lightColor: "bg-emerald-500/10 text-emerald-500"
				},
				{
					id: "cliente",
					title: "Novo Cliente",
					description: "Cadastrar cliente no sistema",
					icon: UserPlus,
					to: "/app/cliente-novo",
					color: "bg-purple-500",
					lightColor: "bg-purple-500/10 text-purple-500"
				},
				{
					id: "estoque",
					title: "Estoque",
					description: "Registrar entradas ou saidas",
					icon: Boxes,
					to: "/app/estoque",
					color: "bg-amber-500",
					lightColor: "bg-amber-500/10 text-amber-500"
				},
				{
					id: "entregas",
					title: "Entregas",
					description: "Gerenciar rotas e status",
					icon: Map,
					to: "/app/logistica",
					color: "bg-rose-500",
					lightColor: "bg-rose-500/10 text-rose-500"
				},
				{
					id: "compra",
					title: "Nova Compra",
					description: "Registrar compra com fornecedor",
					icon: Receipt,
					to: "/app/compra-nova",
					color: "bg-cyan-500",
					lightColor: "bg-cyan-500/10 text-cyan-500"
				}
			].map((action, idx) => {
				const Icon = action.icon;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Drawer$1, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrawerTrigger, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "block group outline-none cursor-pointer",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
							className: "shadow-sm hover:shadow-md transition-all active:scale-[0.98] border-transparent hover:border-primary/20",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
								className: "p-6 flex items-center gap-5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: `p-4 rounded-2xl flex-shrink-0 ${action.lightColor} group-hover:scale-110 transition-transform`,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
										className: "w-8 h-8",
										strokeWidth: 1.5
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-semibold text-lg text-foreground mb-1",
										children: action.title
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-muted-foreground leading-tight",
										children: action.description
									})]
								})]
							})
						})
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrawerContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto w-full max-w-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DrawerHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrawerTitle, { children: action.title }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrawerDescription, { children: "Registro rapido simplificado para celular." })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-4 pb-0 flex flex-col gap-4 overflow-y-auto max-h-[60vh]",
							children: [
								action.id === "venda" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Cliente (opcional)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											placeholder: "Nome do cliente ou Consumidor Final",
											value: clienteNome,
											onChange: (e) => setClienteNome(e.target.value)
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Produto" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Popover, {
											open: openProduto,
											onOpenChange: setOpenProduto,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverTrigger, {
												asChild: true,
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
													variant: "outline",
													role: "combobox",
													className: "w-full justify-between font-normal",
													children: [produtoSelecionado ? produtoSelecionado.nome : "Selecione um produto...", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronsUpDown, { className: "ml-2 h-4 w-4 shrink-0 opacity-50" })]
												})
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverContent, {
												className: "w-[--radix-popover-trigger-width] p-0",
												align: "start",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Command$1, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandInput, { placeholder: "Buscar produto..." }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CommandList, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandEmpty, { children: "Nenhum produto encontrado." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandGroup, { children: produtos.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CommandItem, {
													value: p.nome,
													onSelect: () => {
														setProdutoSelecionado(p);
														setOpenProduto(false);
														setValorVenda((p.preco_venda * 1).toFixed(2));
													},
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: cn("mr-2 h-4 w-4", produtoSelecionado?.id === p.id ? "opacity-100" : "opacity-0") }),
														p.nome,
														" - R$ ",
														Number(p.preco_venda).toFixed(2)
													]
												}, p.id)) })] })] })
											})]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid grid-cols-2 gap-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "grid gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Quantidade" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												type: "number",
												placeholder: "1",
												value: qtd,
												onChange: (e) => setQtd(e.target.value)
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "grid gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Valor Total (R$)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												type: "number",
												placeholder: "0.00",
												value: valorVenda,
												onChange: (e) => setValorVenda(e.target.value)
											})]
										})]
									})
								] }),
								action.id === "financas" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Descricao" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											placeholder: "Ex: Venda balcao, Conta de luz...",
											value: descFinanca,
											onChange: (e) => setDescFinanca(e.target.value)
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid grid-cols-2 gap-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "grid gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Valor (R$)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												type: "number",
												placeholder: "0.00",
												value: valorFinanca,
												onChange: (e) => setValorFinanca(e.target.value)
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "grid gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Tipo" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
												value: tipoFinanca,
												onValueChange: setTipoFinanca,
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Selecione..." }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
													value: "receita",
													children: "Receita (+)"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
													value: "despesa",
													children: "Despesa (-)"
												})] })]
											})]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Status" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
											value: statusFinanca,
											onValueChange: setStatusFinanca,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Selecione..." }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												value: "paga",
												children: "Pago / Recebido"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												value: "pendente",
												children: "Pendente"
											})] })]
										})]
									})
								] }),
								action.id === "cliente" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Nome do Cliente" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											placeholder: "Nome completo",
											value: clienteNomeCad,
											onChange: (e) => setClienteNomeCad(e.target.value)
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "WhatsApp / Telefone" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											placeholder: "(00) 00000-0000",
											value: clienteTelCad,
											onChange: (e) => setClienteTelCad(e.target.value)
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "CPF / CNPJ" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											placeholder: "000.000.000-00",
											value: clienteCpfCad,
											onChange: (e) => setClienteCpfCad(e.target.value)
										})]
									})
								] }),
								action.id === "estoque" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Produto" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Popover, {
										open: openProduto,
										onOpenChange: setOpenProduto,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverTrigger, {
											asChild: true,
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
												variant: "outline",
												role: "combobox",
												className: "w-full justify-between font-normal",
												children: [produtoSelecionado ? produtoSelecionado.nome : "Selecione um produto...", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronsUpDown, { className: "ml-2 h-4 w-4 shrink-0 opacity-50" })]
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverContent, {
											className: "w-[--radix-popover-trigger-width] p-0",
											align: "start",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Command$1, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandInput, { placeholder: "Buscar produto..." }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CommandList, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandEmpty, { children: "Nenhum produto encontrado." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandGroup, { children: produtos.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CommandItem, {
												value: p.nome,
												onSelect: () => {
													setProdutoSelecionado(p);
													setOpenProduto(false);
												},
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: cn("mr-2 h-4 w-4", produtoSelecionado?.id === p.id ? "opacity-100" : "opacity-0") }),
													p.nome,
													" - Estoque: ",
													p.estoque
												]
											}, p.id)) })] })] })
										})]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-2 gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Quantidade" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											type: "number",
											placeholder: "0",
											value: qtdEstoque,
											onChange: (e) => setQtdEstoque(e.target.value)
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Acao" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
											value: acaoEstoque,
											onValueChange: setAcaoEstoque,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Selecione..." }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												value: "entrada",
												children: "Entrada (+)"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												value: "saida",
												children: "Baixa (-)"
											})] })]
										})]
									})]
								})] }),
								action.id === "entregas" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Rota (Opcional)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Popover, {
											open: openRota,
											onOpenChange: setOpenRota,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverTrigger, {
												asChild: true,
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
													variant: "outline",
													role: "combobox",
													className: "w-full justify-between font-normal",
													children: [rotaSelecionada ? rotaSelecionada.motorista || `Rota #${rotaSelecionada.id?.toString().slice(0, 4)}` : "Selecione uma rota...", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronsUpDown, { className: "ml-2 h-4 w-4 shrink-0 opacity-50" })]
												})
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverContent, {
												className: "w-[--radix-popover-trigger-width] p-0",
												align: "start",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Command$1, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandInput, { placeholder: "Buscar rota..." }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CommandList, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandEmpty, { children: "Nenhuma rota encontrada." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandGroup, { children: rotas.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CommandItem, {
													value: r.motorista || r.id,
													onSelect: () => {
														setRotaSelecionada(r);
														setOpenRota(false);
													},
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: cn("mr-2 h-4 w-4", rotaSelecionada?.id === r.id ? "opacity-100" : "opacity-0") }), r.motorista ? `Motorista: ${r.motorista}` : `Rota #${r.id?.toString().slice(0, 4)}`]
												}, r.id)) })] })] })
											})]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Pedido / Cliente" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											placeholder: "Referencia da venda...",
											value: pedidoRef,
											onChange: (e) => setPedidoRef(e.target.value)
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Motorista / Entregador" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											placeholder: "Nome do responsavel",
											value: motorista,
											onChange: (e) => setMotorista(e.target.value)
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Status da Entrega" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
											value: statusEntrega,
											onValueChange: setStatusEntrega,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Selecione..." }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
													value: "pendente",
													children: "Pendente"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
													value: "em_rota",
													children: "Em Rota"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
													value: "entregue",
													children: "Entregue"
												})
											] })]
										})]
									})
								] }),
								action.id === "compra" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Fornecedor" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											placeholder: "Nome da empresa...",
											value: fornecedor,
											onChange: (e) => setFornecedor(e.target.value)
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Produto" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Popover, {
											open: openProduto,
											onOpenChange: setOpenProduto,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverTrigger, {
												asChild: true,
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
													variant: "outline",
													role: "combobox",
													className: "w-full justify-between font-normal",
													children: [produtoSelecionado ? produtoSelecionado.nome : "Selecione um produto...", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronsUpDown, { className: "ml-2 h-4 w-4 shrink-0 opacity-50" })]
												})
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverContent, {
												className: "w-[--radix-popover-trigger-width] p-0",
												align: "start",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Command$1, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandInput, { placeholder: "Buscar produto..." }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CommandList, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandEmpty, { children: "Nenhum produto encontrado." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandGroup, { children: produtos.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CommandItem, {
													value: p.nome,
													onSelect: () => {
														setProdutoSelecionado(p);
														setOpenProduto(false);
													},
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: cn("mr-2 h-4 w-4", produtoSelecionado?.id === p.id ? "opacity-100" : "opacity-0") }), p.nome]
												}, p.id)) })] })] })
											})]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid grid-cols-2 gap-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "grid gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Quantidade" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												type: "number",
												placeholder: "1",
												value: qtdCompra,
												onChange: (e) => setQtdCompra(e.target.value)
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "grid gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Custo Total (R$)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												type: "number",
												placeholder: "0.00",
												value: custoCompra,
												onChange: (e) => setCustoCompra(e.target.value)
											})]
										})]
									})
								] })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DrawerFooter, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								className: "w-full bg-gradient-brand",
								onClick: () => handleSalvar(action.id),
								disabled: saving,
								children: saving ? "Salvando..." : "Salvar Registro"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "outline",
								className: "w-full",
								onClick: () => navigate({ to: action.to }),
								children: ["Abrir Tela Completa ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "ml-2 h-4 w-4" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrawerClose, {
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									ref: drawerCloseRef,
									variant: "ghost",
									children: "Cancelar"
								})
							})
						] })
					]
				}) })] }, idx);
			})
		})]
	});
}
//#endregion
export { RegistroRapido as component };

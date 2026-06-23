import { i as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./supabase-B8pFCf1w.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { F as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as Button } from "./button-BkEeRci-.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { v as Save, xt as ArrowLeft } from "../_libs/lucide-react.mjs";
import { n as PageHeader } from "./app-shell-BDkgzrqS.mjs";
import { t as Card } from "./card-CtX3ithx.mjs";
import { t as Label } from "./label-DBD1bRRP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app.cliente-novo-DEHERdHg.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function NovoCliente() {
	const navigate = useNavigate();
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [cliente, setCliente] = (0, import_react.useState)({
		nome: "",
		cpf_cnpj: "",
		telefone: "",
		cep: "",
		endereco: "",
		numero: "",
		bairro: "",
		cidade: "",
		uf: "",
		status: "Ativo"
	});
	const handleSalvar = async () => {
		if (!cliente.nome) {
			alert("Preencha o nome do cliente.");
			return;
		}
		setLoading(true);
		try {
			const { error } = await supabase.from("clientes").insert([cliente]);
			if (error) throw error;
			navigate({ to: "/app/clientes" });
		} catch (err) {
			console.error(err);
			alert("Erro ao salvar cliente: " + err.message);
		} finally {
			setLoading(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "Novo Cliente",
		subtitle: "Cadastre um novo cliente no sistema",
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			variant: "outline",
			asChild: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/app/clientes",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "mr-2 h-4 w-4" }), " Voltar"]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			className: "bg-gradient-brand text-primary-foreground",
			onClick: handleSalvar,
			disabled: loading,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "mr-2 h-4 w-4" }),
				" ",
				loading ? "Salvando..." : "Salvar Cliente"
			]
		})] })
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
		className: "shadow-card p-6 max-w-2xl mx-auto space-y-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Nome / Razão Social" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: cliente.nome,
							onChange: (e) => setCliente({
								...cliente,
								nome: e.target.value
							}),
							placeholder: "Ex: Jardim Verde Ltda"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "CPF / CNPJ (Opcional)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: cliente.cpf_cnpj,
							onChange: (e) => setCliente({
								...cliente,
								cpf_cnpj: e.target.value
							}),
							placeholder: "000.000.000-00"
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Telefone" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: cliente.telefone,
							onChange: (e) => setCliente({
								...cliente,
								telefone: e.target.value
							}),
							placeholder: "(11) 90000-0000"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Status" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							className: "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
							value: cliente.status,
							onChange: (e) => setCliente({
								...cliente,
								status: e.target.value
							}),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Ativo" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Premium" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Inativo" })
							]
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border-t pt-4 space-y-4 mt-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
							className: "font-semibold text-sm text-muted-foreground",
							children: "Endereço (Opcional)"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-4 gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2 col-span-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "CEP" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: cliente.cep,
									onChange: (e) => setCliente({
										...cliente,
										cep: e.target.value
									}),
									placeholder: "00000-000"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2 col-span-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Logradouro / Endereço" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: cliente.endereco,
									onChange: (e) => setCliente({
										...cliente,
										endereco: e.target.value
									}),
									placeholder: "Ex: Rua das Flores"
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-4 gap-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2 col-span-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Número" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										value: cliente.numero,
										onChange: (e) => setCliente({
											...cliente,
											numero: e.target.value
										}),
										placeholder: "123"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2 col-span-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Bairro" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										value: cliente.bairro,
										onChange: (e) => setCliente({
											...cliente,
											bairro: e.target.value
										}),
										placeholder: "Centro"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2 col-span-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Cidade" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										value: cliente.cidade,
										onChange: (e) => setCliente({
											...cliente,
											cidade: e.target.value
										}),
										placeholder: "Ex: São Paulo"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2 col-span-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "UF" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										value: cliente.uf,
										onChange: (e) => setCliente({
											...cliente,
											uf: e.target.value
										}),
										placeholder: "Ex: SP",
										maxLength: 2
									})]
								})
							]
						})
					]
				})
			]
		})
	})] });
}
//#endregion
export { NovoCliente as component };

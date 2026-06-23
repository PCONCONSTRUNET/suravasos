import { i as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./supabase-B8pFCf1w.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { F as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as Button } from "./button-BkEeRci-.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { bt as ArrowLeft, v as Save } from "../_libs/lucide-react.mjs";
import { n as PageHeader } from "./app-shell-BDkgzrqS.mjs";
import { t as Card } from "./card-CtX3ithx.mjs";
import { t as Label } from "./label-DBD1bRRP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app.fornecedor-novo-BBCaXqnG.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function NovoFornecedor() {
	const navigate = useNavigate();
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [fornecedor, setFornecedor] = (0, import_react.useState)({
		empresa: "",
		contato: "",
		telefone: "",
		cpf_cnpj: "",
		endereco: "",
		cidade: "",
		valor_total: 0
	});
	const handleSalvar = async () => {
		if (!fornecedor.empresa) {
			alert("Preencha o nome da empresa.");
			return;
		}
		setLoading(true);
		try {
			const { error } = await supabase.from("fornecedores").insert([fornecedor]);
			if (error) throw error;
			navigate({ to: "/app/fornecedores" });
		} catch (err) {
			console.error(err);
			alert("Erro ao salvar fornecedor: " + err.message);
		} finally {
			setLoading(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "Novo Fornecedor",
		subtitle: "Cadastre um novo fornecedor no sistema",
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			variant: "outline",
			asChild: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/app/fornecedores",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "mr-2 h-4 w-4" }), " Voltar"]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			className: "bg-gradient-brand text-primary-foreground",
			onClick: handleSalvar,
			disabled: loading,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "mr-2 h-4 w-4" }),
				" ",
				loading ? "Salvando..." : "Salvar Fornecedor"
			]
		})] })
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
		className: "shadow-card p-6 max-w-2xl mx-auto space-y-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-1 md:grid-cols-2 gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Nome da Empresa *" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: fornecedor.empresa,
							onChange: (e) => setFornecedor({
								...fornecedor,
								empresa: e.target.value
							}),
							placeholder: "Ex: Plasvale Indústria"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "CPF ou CNPJ (Opcional)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: fornecedor.cpf_cnpj,
							onChange: (e) => setFornecedor({
								...fornecedor,
								cpf_cnpj: e.target.value
							}),
							placeholder: "00.000.000/0001-00"
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-1 md:grid-cols-2 gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Nome do Contato" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: fornecedor.contato,
							onChange: (e) => setFornecedor({
								...fornecedor,
								contato: e.target.value
							}),
							placeholder: "Ex: Roberto Almeida"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Telefone (Opcional)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: fornecedor.telefone,
							onChange: (e) => setFornecedor({
								...fornecedor,
								telefone: e.target.value
							}),
							placeholder: "(00) 00000-0000"
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-1 md:grid-cols-2 gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Endereço Completo (Opcional)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: fornecedor.endereco,
							onChange: (e) => setFornecedor({
								...fornecedor,
								endereco: e.target.value
							}),
							placeholder: "Rua, Número, Bairro"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Cidade / Estado" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: fornecedor.cidade,
							onChange: (e) => setFornecedor({
								...fornecedor,
								cidade: e.target.value
							}),
							placeholder: "Ex: Joinville/SC"
						})]
					})]
				})
			]
		})
	})] });
}
//#endregion
export { NovoFornecedor as component };

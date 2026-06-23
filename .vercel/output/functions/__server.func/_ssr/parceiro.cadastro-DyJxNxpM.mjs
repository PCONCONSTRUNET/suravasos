import { i as __toESM } from "../_runtime.mjs";
import { n as supabaseParceiro } from "./supabase-DyNMUxMx.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as Button } from "./button-DiE0A9q4.mjs";
import { t as VivaverdeLogo } from "./vivaverde-logo-DWXAFaeL.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as CardContent, t as Card } from "./card-CtX3ithx.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/parceiro.cadastro-DyJxNxpM.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CadastroParceiro() {
	const navigate = useNavigate();
	const [nome, setNome] = (0, import_react.useState)("");
	const [telefone, setTelefone] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	const handleCadastro = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError("");
		try {
			const { data: authData, error: authError } = await supabaseParceiro.auth.signUp({
				email,
				password
			});
			if (authError) throw authError;
			if (authData.user) {
				const { error: dbError } = await supabaseParceiro.from("vendedores").insert([{
					user_id: authData.user.id,
					nome,
					email,
					telefone,
					status: "Aguardando Aprovação",
					valor_comissao: 0
				}]);
				if (dbError) throw dbError;
				await supabaseParceiro.from("notificacoes").insert([{
					tipo: "parceiro",
					titulo: `Nova solicitação de parceria`,
					mensagem: `${nome} (${email}) se cadastrou e está aguardando aprovação.`
				}]);
			}
			navigate({ to: "/parceiro/dashboard" });
		} catch (err) {
			setError(err.message || "Erro ao criar conta. Verifique os dados e tente novamente.");
		} finally {
			setLoading(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-[80vh] items-center justify-center py-8",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "w-full max-w-sm shadow-xl border-0 ring-1 ring-slate-900/5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pt-8 pb-4 flex justify-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VivaverdeLogo, { size: "small" })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-center mb-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-2xl font-bold font-display text-slate-800",
							children: "Criar Conta"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground mt-1",
							children: "Seja um vendedor parceiro e fature com a VivaVerde."
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: handleCadastro,
						className: "space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-sm font-medium",
									children: "Nome Completo"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "text",
									placeholder: "Seu nome",
									value: nome,
									onChange: (e) => setNome(e.target.value),
									required: true,
									className: "h-12"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-sm font-medium",
									children: "Telefone / WhatsApp"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "text",
									placeholder: "(00) 00000-0000",
									value: telefone,
									onChange: (e) => setTelefone(e.target.value),
									required: true,
									className: "h-12"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-sm font-medium",
									children: "E-mail"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "email",
									placeholder: "seuemail@exemplo.com",
									value: email,
									onChange: (e) => setEmail(e.target.value),
									required: true,
									className: "h-12"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-sm font-medium",
									children: "Senha"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "password",
									placeholder: "Mínimo 6 caracteres",
									value: password,
									onChange: (e) => setPassword(e.target.value),
									required: true,
									minLength: 6,
									className: "h-12"
								})]
							}),
							error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-destructive text-center font-medium bg-destructive/10 py-2 rounded-md",
								children: error
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "submit",
								className: "w-full h-12 text-base font-bold bg-gradient-brand text-primary-foreground",
								disabled: loading,
								children: loading ? "Criando Conta..." : "Cadastrar Agora"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 text-center text-sm",
						children: [
							"Já tem uma conta?",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/parceiro/login",
								className: "font-semibold text-brand hover:underline",
								children: "Fazer Login"
							})
						]
					})
				]
			})]
		})
	});
}
//#endregion
export { CadastroParceiro as component };

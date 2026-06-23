import { i as __toESM } from "../_runtime.mjs";
import { n as supabaseParceiro } from "./supabase-DyNMUxMx.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as Button } from "./button-DiE0A9q4.mjs";
import { t as VivaverdeLogo } from "./vivaverde-logo-DWXAFaeL.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as CardContent, t as Card } from "./card-CtX3ithx.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/parceiro.login-BCO6-2Fv.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function LoginParceiro() {
	const navigate = useNavigate();
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	const [resetSent, setResetSent] = (0, import_react.useState)(false);
	const [resetLoading, setResetLoading] = (0, import_react.useState)(false);
	const handleLogin = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError("");
		try {
			const { error: signInError } = await supabaseParceiro.auth.signInWithPassword({
				email,
				password
			});
			if (signInError) throw signInError;
			navigate({ to: "/parceiro/dashboard" });
		} catch (err) {
			setError("Credenciais inválidas. Tente novamente.");
		} finally {
			setLoading(false);
		}
	};
	const handleForgotPassword = async () => {
		if (!email) {
			setError("Digite seu e-mail acima para receber o link de redefinição.");
			return;
		}
		setResetLoading(true);
		try {
			await supabaseParceiro.auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/parceiro/login` });
			setResetSent(true);
		} finally {
			setResetLoading(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-[80vh] items-center justify-center",
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
							children: "Portal do Parceiro"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground mt-1",
							children: "Faça login para registrar suas vendas e acompanhar suas comissões."
						})]
					}),
					resetSent ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-center p-4 rounded-lg bg-green-50 border border-green-200",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-green-700 font-medium",
							children: [
								"✅ Link de redefinição enviado para ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: email }),
								". Verifique sua caixa de entrada."
							]
						})
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: handleLogin,
						className: "space-y-4",
						children: [
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
									placeholder: "••••••••",
									value: password,
									onChange: (e) => setPassword(e.target.value),
									required: true,
									className: "h-12"
								})]
							}),
							error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: `text-sm text-center font-medium py-2 px-3 rounded-md ${error.startsWith("⚠") ? "bg-amber-50 text-amber-700 border border-amber-200" : "bg-destructive/10 text-destructive"}`,
								children: error
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "submit",
								className: "w-full h-12 text-base font-bold bg-gradient-brand text-primary-foreground",
								disabled: loading,
								children: loading ? "Entrando..." : "Acessar Portal"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: handleForgotPassword,
								disabled: resetLoading,
								className: "w-full text-center text-xs text-muted-foreground hover:text-brand transition-colors pt-1",
								children: resetLoading ? "Enviando..." : "Esqueceu sua senha? Clique aqui"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 text-center text-sm",
						children: [
							"Ainda não é parceiro?",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/parceiro/cadastro",
								className: "font-semibold text-brand hover:underline",
								children: "Crie sua conta"
							})
						]
					})
				]
			})]
		})
	});
}
//#endregion
export { LoginParceiro as component };
